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

export default function useLandingEffects({ canvasRef, cursorRef, ringRef, planetRef, setNavStuck }) {
  // 1. Canvas Animation Layer
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    let width = 0
    let height = 0
    let frame = 0
    
    // Mouse tracking for interactivity
    let mouse = { x: -1000, y: -1000 }
    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    // Entities
    let planets = []
    let plexusNodes = []
    let comets = []

    const initEntities = () => {
      const maxDim = Math.max(width, height)
      const cx = width / 2
      const cy = height / 2

      // 10 Unique Planets
      planets = []
      for (let i = 0; i < 10; i++) {
        const orbitRadius = (maxDim / 2) * (0.1 + (i * 0.1)) // Scales to fill viewport
        const radius = Math.random() * 12 + 4 // 4px to 16px
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`
        // Outer planets move slower
        const speed = (Math.random() * 0.001 + 0.0005) / (i + 1)
        planets.push(new Planet(orbitRadius, radius, color, speed))
      }

      // Astro-Plexus Nodes (55 nodes)
      plexusNodes = Array.from({ length: 55 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4, // ultra-low velocity (max 0.2 each direction)
        vy: (Math.random() - 0.5) * 0.4,
        r: 2.5, // fixed size
      }))

      // Comets (3 active)
      comets = [
        new Comet(width, height, '#4cc9f0'),
        new Comet(width, height, '#4cc9f0'),
        new Comet(width, height, '#4cc9f0')
      ]
    }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initEntities()
    }
    resize()

    // We can read smoothScrollY from window if needed, or track it locally again
    let canvasSmoothScrollY = window.scrollY

    const drawBg = () => {
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
          node.vx -= (dx / dist) * force * 0.02
          node.vy -= (dy / dist) * force * 0.02
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
    drawBg()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(frame)
    }
  }, [canvasRef])

  // 2. Custom Cursor & Scroll Animation Layer
  useEffect(() => {
    let smoothScrollY = 0
    let targetScrollY = window.scrollY
    let pointerX = 0
    let pointerY = 0
    let frame = 0

    // Intersection Observer for .reveal sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    const onScroll = () => {
      targetScrollY = window.scrollY
      if (targetScrollY > 50) setNavStuck(true)
      else setNavStuck(false)
    }

    const onMouseMove = (event) => {
      pointerX = event.clientX / window.innerWidth - 0.5
      pointerY = event.clientY / window.innerHeight - 0.5

      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
        ringRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      }
    }

    const loop = () => {
      smoothScrollY += (targetScrollY - smoothScrollY) * 0.08
      if (planetRef.current) {
        const isPaused = planetRef.current.getAttribute('data-paused') === 'true'
        if (!isPaused) {
          planetRef.current.style.transform = 'translate(-50%, -50%)'
        }
      }
      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    loop()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [cursorRef, ringRef, planetRef, setNavStuck])
}
