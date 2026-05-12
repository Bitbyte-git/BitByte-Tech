import { useEffect, useRef } from 'react'

const STARS = Array.from({ length: 200 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.3 + 0.2,
  cyan: Math.random() > 0.6,
  sp: 0.3 + Math.random() * 0.6,
  ph: Math.random() * Math.PI * 2,
}))

const LAND_REGIONS = [
  [54, 71, -168, -141, 2.5, 3.0],
  [49, 70, -140, -95, 2.2, 2.8],
  [45, 67, -95, -55, 2.2, 2.8],
  [60, 83, -55, -18, 2.5, 3.2],
  [25, 49, -125, -67, 2.0, 2.5],
  [14, 30, -118, -87, 2.0, 2.5],
  [7, 18, -92, -77, 1.8, 2.2],
  [0, 12, -79, -59, 2.0, 2.5],
  [-5, 5, -75, -35, 2.0, 2.5],
  [-30, -5, -65, -35, 2.2, 2.8],
  [-55, -18, -75, -63, 2.2, 2.8],
  [36, 44, -10, 4, 2.0, 2.5],
  [43, 55, -5, 15, 1.8, 2.2],
  [50, 59, -8, 2, 1.8, 2.0],
  [55, 71, 4, 32, 2.0, 2.5],
  [37, 47, 7, 18, 1.8, 2.0],
  [36, 47, 13, 28, 1.8, 2.0],
  [48, 55, 14, 30, 1.8, 2.2],
  [20, 38, -18, 36, 2.2, 2.8],
  [4, 20, -18, 16, 2.0, 2.5],
  [3, 22, 28, 52, 2.0, 2.5],
  [-5, 5, 12, 32, 1.8, 2.2],
  [-35, -5, 10, 40, 2.2, 2.8],
  [50, 75, 30, 70, 2.5, 3.2],
  [50, 75, 65, 110, 2.5, 3.2],
  [50, 72, 105, 145, 2.5, 3.2],
  [12, 38, 35, 60, 2.0, 2.5],
  [8, 30, 65, 90, 2.0, 2.5],
  [20, 50, 95, 135, 2.2, 2.8],
  [30, 55, 100, 125, 2.0, 2.5],
  [0, 24, 95, 110, 2.0, 2.5],
  [-8, 8, 95, 141, 1.8, 2.2],
  [-38, -15, 114, 154, 2.2, 2.8],
]

const DOTS = LAND_REGIONS.flatMap(([latStart, latEnd, lonStart, lonEnd, latStep, lonStep]) => {
  const points = []
  for (let lat = latStart; lat <= latEnd; lat += latStep) {
    for (let lon = lonStart; lon <= lonEnd; lon += lonStep) {
      const jitterLat = lat + (Math.random() - 0.5) * 0.65
      const jitterLon = lon + (Math.random() - 0.5) * 0.85
      const index = Math.floor(lat / 5) + Math.floor(lon / 7)
      points.push({ lat: jitterLat, lon: jitterLon, accent: index % 5 === 0 })
    }
  }
  return points
})

const LINE_COUNT = 10
const TRAVEL_DOTS = Array.from({ length: 24 }, (_, index) => ({
  lineIndex: index % LINE_COUNT,
  t: Math.random(),
  speed: 0.003 + Math.random() * 0.0025,
  size: 1.8 + Math.random() * 2,
  bright: 0.7 + Math.random() * 0.3,
}))

const EXPLODE_PARTICLES = Array.from({ length: 32 }, () => {
  const angle = Math.random() * Math.PI * 2
  const speed = 1.8 + Math.random() * 3.2
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 1.5 + Math.random() * 2.5,
    color: Math.random() > 0.5 ? '0,220,255' : Math.random() > 0.5 ? '0,255,130' : '255,220,60',
  }
})

function project(lat, lon, rotation) {
  const phi = (lat * Math.PI) / 180
  const lambda = (lon * Math.PI) / 180 + rotation
  const cosLat = Math.cos(phi)
  return {
    x: cosLat * Math.cos(lambda),
    y: Math.sin(phi),
    z: cosLat * Math.sin(lambda),
  }
}

export default function BitByteGlobe({ className = '' }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const ripplesRef = useRef([])
  const stateRef = useRef({
    rotation: 0,
    floatTime: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    hovered: false,
    explodeActive: false,
    explodeTime: 0,
    explodeX: 0,
    explodeY: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !container || !ctx) return undefined

    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0
    let radius = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, container.clientWidth)
      height = Math.max(1, container.clientHeight)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      centerX = width * 0.5
      centerY = height * 0.5
      radius = Math.min(width, height) * 0.33
    }

    const observer = new ResizeObserver(resize)
    resize()
    observer.observe(container)

    const updatePointer = (clientX, clientY) => {
      const rect = container.getBoundingClientRect()
      const state = stateRef.current
      state.targetMouseX = (clientX - rect.left - rect.width / 2) / rect.width
      state.targetMouseY = (clientY - rect.top - rect.height / 2) / rect.height
      state.hovered = true
    }

    const triggerBurst = (clientX, clientY) => {
      const rect = container.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const state = stateRef.current
      state.explodeActive = true
      state.explodeTime = 0
      state.explodeX = x
      state.explodeY = y
      ripplesRef.current.push(
        { x, y, t: 0, max: 110, color: '0,220,255' },
        { x, y, t: 0, max: 75, color: '80,255,120' },
        { x, y, t: 0, max: 45, color: '255,200,0' },
      )
    }

    const onMouseMove = (event) => updatePointer(event.clientX, event.clientY)
    const onMouseLeave = () => {
      const state = stateRef.current
      state.targetMouseX = 0
      state.targetMouseY = 0
      state.hovered = false
    }
    const onClick = (event) => triggerBurst(event.clientX, event.clientY)
    const onTouchStart = (event) => {
      const touch = event.touches[0]
      if (!touch) return
      updatePointer(touch.clientX, touch.clientY)
      triggerBurst(touch.clientX, touch.clientY)
    }
    const onTouchEnd = () => {
      const state = stateRef.current
      state.targetMouseX = 0
      state.targetMouseY = 0
      state.hovered = false
    }

    container.addEventListener('mousemove', onClick)
    container.addEventListener('mouseleave', onMouseLeave)
    // container.addEventListener('click', onClick)
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd)

    const drawDataLine = (startX, startY, lineIndex, globeX, globeY, globeRadius, state) => {
      const dx = globeX - startX
      const dy = globeY - startY
      const distance = Math.hypot(dx, dy)
      const endT = (distance - globeRadius) / distance
      const endX = startX + endT * dx
      const endY = startY + endT * dy
      const midX = (startX + endX) / 2
      const bow = (lineIndex < LINE_COUNT / 2 ? -5 : 5) * (1 - Math.abs(lineIndex - LINE_COUNT / 2) / (LINE_COUNT / 2))
      const midY = (startY + endY) / 2 + bow
      const isMiddle = Math.abs(lineIndex - LINE_COUNT / 2) < LINE_COUNT * 0.4
      const isGreen = lineIndex % 3 === 1
      const alpha = (isMiddle ? 0.55 : 0.25) * (state.hovered ? 1.8 : 1.0)

      ctx.save()
      ctx.shadowColor = isGreen ? '#00ff88' : '#00ccff'
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.quadraticCurveTo(midX, midY, endX, endY)
      ctx.strokeStyle = isGreen ? `rgba(0,255,140,${alpha * 0.25})` : `rgba(0,200,255,${alpha * 0.25})`
      ctx.lineWidth = isMiddle ? 6 : 3
      ctx.stroke()
      ctx.restore()

      const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
      const color = isGreen ? '0,255,140' : '0,210,255'
      gradient.addColorStop(0, `rgba(${color},0)`)
      gradient.addColorStop(0.3, `rgba(${color},${alpha * 0.9})`)
      gradient.addColorStop(0.75, `rgba(${color},${alpha * 0.5})`)
      gradient.addColorStop(1, `rgba(${color},0.04)`)
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.quadraticCurveTo(midX, midY, endX, endY)
      ctx.strokeStyle = gradient
      ctx.lineWidth = isMiddle ? 1.5 : 0.8
      ctx.stroke()

      return { startX, startY, endX, endY, midX, midY }
    }

    const frame = () => {
      const state = stateRef.current
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.06
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.06
      state.floatTime += 0.012
      state.rotation += state.hovered ? 0.0005 : 0.0016

      if (state.explodeActive) {
        state.explodeTime += 0.04
        if (state.explodeTime >= 1) {
          state.explodeActive = false
          state.explodeTime = 0
        }
      }

      ctx.clearRect(0, 0, width, height)

      const offsetX = state.mouseX * 18
      const offsetY = state.mouseY * 12 + Math.sin(state.floatTime) * 7
      const globeX = centerX + offsetX
      const globeY = centerY + offsetY

      let gradient = ctx.createRadialGradient(globeX, globeY, 0, globeX, globeY, radius * 2.8)
      gradient.addColorStop(0, '#04162e')
      gradient.addColorStop(0.4, '#020d1c')
      gradient.addColorStop(1, '#020b12')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = 'rgba(0,150,220,0.015)'
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += 52) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += 52) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      STARS.forEach((star) => {
        const opacity = 0.08 + 0.6 * Math.abs(Math.sin(state.floatTime * star.sp + star.ph))
        ctx.fillStyle = star.cyan ? `rgba(80,220,255,${opacity})` : `rgba(255,255,255,${opacity * 0.45})`
        ctx.beginPath()
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2)
        ctx.fill()
      })

      const lineSpacing = (radius * 1.5) / LINE_COUNT
      const lineTop = globeY - radius * 0.73
      const lineStartX = -width * 0.6
      const lineGeometry = []
      for (let index = 0; index < LINE_COUNT; index += 1) {
        lineGeometry[index] = drawDataLine(lineStartX, lineTop + index * lineSpacing, index, globeX, globeY, radius, state)
      }

      TRAVEL_DOTS.forEach((dot) => {
        dot.t += dot.speed * (state.hovered ? 2.0 : 1.0)
        if (dot.t > 1) dot.t = 0
        const line = lineGeometry[dot.lineIndex]
        if (!line) return
        const t = dot.t
        const x = line.startX * (1 - t) * (1 - t) + 2 * line.midX * t * (1 - t) + line.endX * t * t
        const y = line.startY * (1 - t) * (1 - t) + 2 * line.midY * t * (1 - t) + line.endY * t * t
        const alpha = Math.sin(t * Math.PI) * dot.bright
        const isGreen = dot.lineIndex % 3 === 1

        ctx.save()
        ctx.shadowColor = isGreen ? '#00ff88' : '#00d8ff'
        ctx.shadowBlur = 14
        ctx.fillStyle = isGreen ? `rgba(0,255,140,${alpha})` : `rgba(80,225,255,${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, dot.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      gradient = ctx.createRadialGradient(globeX, globeY, radius * 0.75, globeX, globeY, radius * 1.6)
      gradient.addColorStop(0, 'rgba(0,100,220,0)')
      gradient.addColorStop(0.35, `rgba(0,130,255,${state.hovered ? 0.28 : 0.18})`)
      gradient.addColorStop(0.65, `rgba(0,220,120,${state.hovered ? 0.18 : 0.12})`)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(globeX, globeY, radius * 1.6, 0, Math.PI * 2)
      ctx.fill()

      gradient = ctx.createRadialGradient(globeX - radius * 0.2, globeY - radius * 0.2, radius * 0.02, globeX, globeY, radius)
      gradient.addColorStop(0, 'rgba(0,30,80,1)')
      gradient.addColorStop(0.5, 'rgba(0,14,52,1)')
      gradient.addColorStop(1, 'rgba(0,5,20,1)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(globeX, globeY, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.beginPath()
      ctx.arc(globeX, globeY, radius - 1, 0, Math.PI * 2)
      ctx.clip()
      DOTS.forEach(({ lat, lon, accent }) => {
        const { x, y, z } = project(lat, lon, state.rotation)
        if (z < -0.05) return
        const screenX = globeX + x * radius
        const screenY = globeY - y * radius
        const depth = (z + 1) / 2
        const dotRadius = 0.5 + depth * 0.7

        if (accent) {
          ctx.save()
          ctx.shadowColor = '#00ff88'
          ctx.shadowBlur = state.hovered ? 7 : 4
          ctx.fillStyle = `rgba(0,255,130,${0.5 + depth * 0.5})`
          ctx.beginPath()
          ctx.arc(screenX, screenY, dotRadius + 0.4, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
          return
        }

        const alpha = depth > 0.5 ? 0.45 + depth * 0.55 : 0.2 + depth * 0.3
        ctx.fillStyle = depth > 0.4 ? `rgba(55,210,255,${alpha})` : `rgba(0,150,225,${alpha * 0.7})`
        ctx.beginPath()
        ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      // Wireframe lines removed for a cleaner look


      gradient = ctx.createRadialGradient(globeX, globeY, radius * 0.78, globeX, globeY, radius)
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(0.72, 'rgba(0,140,255,0)')
      gradient.addColorStop(0.86, `rgba(0,170,255,${state.hovered ? 0.35 : 0.22})`)
      gradient.addColorStop(1, `rgba(0,220,255,${state.hovered ? 0.75 : 0.55})`)
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(globeX, globeY, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.shadowColor = '#00ff80'
      ctx.shadowBlur = state.hovered ? 32 : 20
      ctx.restore()


      gradient = ctx.createRadialGradient(globeX - radius * 0.3, globeY - radius * 0.3, 0, globeX - radius * 0.22, globeY - radius * 0.22, radius * 0.55)
      gradient.addColorStop(0, 'rgba(160,230,255,0.22)')
      gradient.addColorStop(0.55, 'rgba(100,200,255,0.07)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(globeX, globeY, radius, 0, Math.PI * 2)
      ctx.fill()

      if (state.explodeActive) {
        const t = state.explodeTime
        EXPLODE_PARTICLES.forEach((particle) => {
          const magnitude = Math.hypot(particle.vx, particle.vy)
          const distance = t * radius * 0.85
          const x = state.explodeX + (particle.vx / magnitude) * distance
          const y = state.explodeY + (particle.vy / magnitude) * distance
          const alpha = Math.pow(1 - t, 1.2) * 0.9
          const size = particle.size * (1 + t * 0.8)

          ctx.save()
          ctx.shadowColor = `rgba(${particle.color},1)`
          ctx.shadowBlur = 10
          ctx.fillStyle = `rgba(${particle.color},${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })
      }

      if (state.hovered) {
        ;[radius * 0.52, radius * 0.7, radius * 0.88].forEach((orbitRadius, index) => {
          const t = state.floatTime * (0.7 - index * 0.15) + index * 1.2
          const colors = ['rgba(0,255,150,0.9)', 'rgba(0,200,255,0.9)', 'rgba(120,255,80,0.9)']
          ctx.save()
          ctx.strokeStyle = `rgba(0,210,255,${0.1 - index * 0.025})`
          ctx.lineWidth = 0.7
          ctx.setLineDash([5, 10])
          ctx.beginPath()
          ctx.arc(globeX, globeY, orbitRadius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.setLineDash([])
          ctx.fillStyle = colors[index]
          ctx.shadowColor = colors[index]
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(globeX + Math.cos(t) * orbitRadius, globeY + Math.sin(t) * orbitRadius * 0.32, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })
      }

      ripplesRef.current = ripplesRef.current.filter((ripple) => ripple.t < ripple.max)
      ripplesRef.current.forEach((ripple) => {
        ripple.t += 2.5
        const alpha = Math.pow(1 - ripple.t / ripple.max, 1.5)
        ctx.strokeStyle = `rgba(${ripple.color},${alpha * 0.75})`
        ctx.lineWidth = 1.8
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.t, 0, Math.PI * 2)
        ctx.stroke()
      })

      frameRef.current = requestAnimationFrame(frame)
    }

    frame()

    return () => {
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
      container.removeEventListener('click', onClick)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div ref={containerRef} className={`bitbyte-globe ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className="bitbyte-globe-canvas" />
    </div>
  )
}
