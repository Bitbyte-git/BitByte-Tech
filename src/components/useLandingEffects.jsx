import { useEffect } from 'react'

class Planet {
  constructor(orbitRadius, radius, color, speed) {
    this.orbitRadius = orbitRadius
    this.radius = radius
    this.color = color
    this.speed = speed
    this.angle = Math.random() * Math.PI * 2
  }

  update() {
    this.angle += this.speed
  }

  draw(ctx, cx, cy, isDark) {
    const x = cx + Math.cos(this.angle) * this.orbitRadius
    const y = cy + Math.sin(this.angle) * this.orbitRadius
    
    // Draw orbit path
    ctx.beginPath()
    ctx.arc(cx, cy, this.orbitRadius, 0, Math.PI * 2)
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw planet
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.shadowBlur = this.radius * 2
    ctx.shadowColor = this.color
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

class Comet {
  constructor(width, height, color) {
    this.width = width
    this.height = height
    this.color = color
    this.history = []
    this.maxHistory = 130
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.width * 1.5
    this.y = -50
    this.vx = -(Math.random() * 4 + 2)
    this.vy = Math.random() * 3 + 1
    this.history = []
    this.active = false
  }

  spawn() {
    if (!this.active) {
      this.reset()
      this.active = true
    }
  }

  update() {
    if (!this.active) return

    this.x += this.vx
    this.y += this.vy

    this.history.unshift({ x: this.x, y: this.y })
    if (this.history.length > this.maxHistory) {
      this.history.pop()
    }

    if (this.x < -100 || this.y > this.height + 100) {
      this.active = false
    }
  }

  draw(ctx) {
    if (!this.active || this.history.length === 0) return

    ctx.beginPath()
    for (let i = 0; i < this.history.length; i++) {
      const point = this.history[i]
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    }

    // Tapering tail effect using linear gradient along the tail length doesn't easily work for curves,
    // so we draw segments or use a global composite. Here we draw the path with a gradient.
    // Instead, to taper size and opacity, we draw connected segments:
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    for (let i = 0; i < this.history.length - 1; i++) {
      const p1 = this.history[i]
      const p2 = this.history[i + 1]
      const progress = 1 - (i / this.history.length)
      
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.strokeStyle = this.color
      ctx.lineWidth = progress * 3
      ctx.globalAlpha = progress * 0.5
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }
}

export default function useLandingEffects({
  canvasRef,
  cursorRef,
  ringRef,
  planetRef,
  setNavStuck,
}) {
  // 1. Canvas Animation Layer
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const saveData = Boolean(navigator.connection?.saveData)
    const lowPowerDevice = Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    const disableCanvas = prefersReducedMotion || coarsePointer || saveData || lowPowerDevice

    if (disableCanvas) {
      canvas.hidden = true
      return () => {
        canvas.hidden = false
      }
    }

    let width = 0
    let height = 0
    let frame = 0
    let lastFrameTime = 0
    let isVisible = !document.hidden
    const frameInterval = 1000 / 30
    
    // Mouse tracking for interactivity
    let mouse = { x: -1000, y: -1000 }
    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Entities
    let planets = []
    let plexusNodes = []
    let comets = []

    const initEntities = () => {
      const maxDim = Math.max(width, height)
      const cx = width / 2
      const cy = height / 2

      // Keep this cinematic layer light enough to preserve INP on laptops.
      planets = []
      for (let i = 0; i < 6; i++) {
        const orbitRadius = (maxDim / 2) * (0.1 + (i * 0.1)) // Scales to fill viewport
        const radius = Math.random() * 12 + 4 // 4px to 16px
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`
        // Outer planets move slower
        const speed = (Math.random() * 0.001 + 0.0005) / (i + 1)
        planets.push(new Planet(orbitRadius, radius, color, speed))
      }

      // Astro-Plexus Nodes
      plexusNodes = Array.from({ length: 34 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4, // ultra-low velocity (max 0.2 each direction)
        vy: (Math.random() - 0.5) * 0.4,
        r: 2.5, // fixed size
      }))

      comets = [new Comet(width, height, '#4cc9f0')]
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initEntities()
    }
    resize()

    // We can read smoothScrollY from window if needed, or track it locally again
    let canvasSmoothScrollY = window.scrollY

    const drawBg = (now = 0) => {
      frame = 0
      if (!isVisible) return
      if (now - lastFrameTime < frameInterval) {
        frame = requestAnimationFrame(drawBg)
        return
      }
      lastFrameTime = now

      const accent = '#4cc9f0'
      
      // Calculate smooth scroll for parallax
      canvasSmoothScrollY += (window.scrollY - canvasSmoothScrollY) * 0.08

      // Base Space Clear
      ctx.fillStyle = '#0a0e14'
      ctx.fillRect(0, 0, width, height)
      
      const cx = width / 2
      const cy = height / 2

      // Central Star
      ctx.beginPath()
      ctx.arc(cx, cy, 30, 0, Math.PI * 2)
      ctx.fillStyle = accent
      ctx.shadowBlur = 50
      ctx.shadowColor = accent
      ctx.fill()
      ctx.shadowBlur = 0

      // Apply parallax translation for the background
      ctx.save()
      ctx.translate(0, -canvasSmoothScrollY * 0.3)

      // Draw Planets
      planets.forEach(p => {
        p.update()
        p.draw(ctx, cx, cy, true)
      })

      // Draw Astro-Plexus
      plexusNodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        // Interactivity: Cursor Repel
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          if (dist > 0.001) {
            node.vx -= (dx / dist) * force * 0.02
            node.vy -= (dy / dist) * force * 0.02
          }
        }

        // Friction & Velocity Limit (max 0.2)
        node.vx *= 0.99
        node.vy *= 0.99
        if (node.vx > 0.2) node.vx = 0.2
        if (node.vx < -0.2) node.vx = -0.2
        if (node.vy > 0.2) node.vy = 0.2
        if (node.vy < -0.2) node.vy = -0.2

        // Wrap around screen
        if (node.x < 0) node.x = width
        if (node.x > width) node.x = 0
        if (node.y < 0) node.y = height
        if (node.y > height) node.y = 0

        // Render Node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = accent
        ctx.fill()

        // Render Connections < 220px
        for (let j = i + 1; j < plexusNodes.length; j++) {
          const other = plexusNodes[j]
          const pdx = other.x - node.x
          const pdy = other.y - node.y
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy)

          if (pDist < 220) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            const alpha = 1 - (pDist / 220)
            ctx.strokeStyle = `rgba(76, 201, 240, ${alpha * 0.5})`
            ctx.lineWidth = 1.2
            ctx.stroke()
          }
        }
      })

      // Draw Comets
      comets.forEach(c => {
        if (!c.active && Math.random() < 0.005) {
          c.spawn()
        }
        c.update()
        c.draw(ctx)
      })

      ctx.restore() // Restore from parallax translation

      frame = requestAnimationFrame(drawBg)
    }

    window.addEventListener('resize', resize)
    const onVisibilityChange = () => {
      isVisible = !document.hidden
      if (isVisible && !frame) frame = requestAnimationFrame(drawBg)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    frame = requestAnimationFrame(drawBg)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      cancelAnimationFrame(frame)
    }
  }, [canvasRef])

  // 2. Custom Cursor & Scroll Animation Layer
  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    let navIsStuck = window.scrollY > 50
    let scrollFrame = 0
    let cursorFrame = 0
    let hasCursorPosition = false
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let activeCursorTarget = null
    let ringX = 0
    let ringY = 0
    setNavStuck(navIsStuck)

    // Intersection Observer for .reveal sections
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' })

    const observeNewReveals = () => {
      document.querySelectorAll('.reveal:not(.observed)').forEach(el => {
        el.classList.add('observed')
        revealObserver.observe(el)
      })
    }

    observeNewReveals()
    const mutationObserver = new MutationObserver(observeNewReveals)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        const nextStuck = window.scrollY > 50
        if (nextStuck !== navIsStuck) {
          navIsStuck = nextStuck
          setNavStuck(nextStuck)
        }
      })
    }

    const interactiveSelector = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'iframe',
      '[role="button"]',
      '[tabindex]:not([tabindex="-1"])',
      '.svc-card',
      '.why-card',
      '.fcrd',
      '.job-card',
      '.dm-channel-row > div',
      '.ba-insight-list div',
      '.sales-service-card',
      '.career-job-row',
      '.career-benefit',
      '.dm-service-card',
      '.dm-why-card',
      '.dm-industry-card',
      '.webapp-info-card',
      '.wd-grid-item',
      '.process-step',
      '.tech-card',
      '.webapp-cta',
      '.pb-service-card',
      '.pb-impact-card',
      '.pb-story-card',
      '.pb-cta',
      '.ba-stat-card',
      '.ba-insight-card',
      '.ba-feature-card',
    ].join(',')

    const setCursorMode = (target) => {
      if (activeCursorTarget === target) return

      activeCursorTarget = target
      const isInteractive = Boolean(target)
      const isInput = target?.matches?.('input, textarea, select')

      cursorRef.current?.classList.toggle('is-interactive', isInteractive)
      ringRef.current?.classList.toggle('is-interactive', isInteractive)
      cursorRef.current?.classList.toggle('is-input', Boolean(isInput))
      ringRef.current?.classList.toggle('is-input', Boolean(isInput))
    }

    const RING_RADIUS = 16 // half of 32px ring
    const DOT_ANGLE_RAD = 60 * Math.PI / 180 // 60° = bottom-right of circle
    const DOT_OFFSET_X = RING_RADIUS * Math.cos(DOT_ANGLE_RAD) // +8px
    const DOT_OFFSET_Y = RING_RADIUS * Math.sin(DOT_ANGLE_RAD) // +13.86px (bottom)

    const animateCursor = () => {
      cursorFrame = 0

      // Ring follows cursor with smooth lag (magnifier-style)
      ringX += (targetX - ringX) * 0.08
      ringY += (targetY - ringY) * 0.08

      // Dot is placed at 300° on the ring's circumference
      const dotX = ringX + DOT_OFFSET_X
      const dotY = ringY + DOT_OFFSET_Y

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      if (Math.abs(targetX - ringX) > 0.2 || Math.abs(targetY - ringY) > 0.2) {
        cursorFrame = requestAnimationFrame(animateCursor)
      }
    }

    const scheduleCursor = () => {
      if (!cursorFrame) cursorFrame = requestAnimationFrame(animateCursor)
    }

    const onMouseMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY

      if (!hasCursorPosition) {
        currentX = targetX
        currentY = targetY
        ringX = targetX
        ringY = targetY
        hasCursorPosition = true
      }

      const targetElement = event.target instanceof Element ? event.target : null
      const interactive = targetElement?.closest(interactiveSelector)
      
      // Prevent flickering by ensuring we don't toggle states too rapidly on same element
      if (interactive !== activeCursorTarget) {
        setCursorMode(interactive)
      }
      
      scheduleCursor()
    }

    const onMouseLeave = () => {
      setCursorMode(null)
    }

    const setCursorPressed = (isPressed) => {
      cursorRef.current?.classList.toggle('is-pressed', isPressed)
      ringRef.current?.classList.toggle('is-pressed', isPressed)
    }
    const onMouseDown = () => setCursorPressed(true)
    const onMouseUp = () => setCursorPressed(false)

    if (planetRef.current) {
      planetRef.current.style.transform = 'translate(-50%, -50%)'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    if (!coarsePointer) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      window.addEventListener('mouseleave', onMouseLeave)
      window.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mouseup', onMouseUp)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(scrollFrame)
      cancelAnimationFrame(cursorFrame)
      setCursorMode(null)
      setCursorPressed(false)
      revealObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [cursorRef, ringRef, planetRef, setNavStuck])
}
