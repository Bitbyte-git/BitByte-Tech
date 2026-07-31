import { useEffect, useRef, useState } from 'react'
import { SplineScene } from './ui/SplineScene'

export default function Hero() {
  const glowRef = useRef(null)
  const sectionRef = useRef(null)
  const robotRef = useRef(null)
  const [typedText, setTypedText] = useState('')

  const phrases = [
    'Premium Web Design Agency',
    'Welcome to Bit Byte Technologies',
    'Modern UI/UX Developers'
  ]

  useEffect(() => {
    let currentPhraseIdx = 0
    let currentLetterIdx = 0
    let isDeleting = false
    let typingSpeed = 100
    let timer

    const handleType = () => {
      const currentPhrase = phrases[currentPhraseIdx]
      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, currentLetterIdx + 1))
        currentLetterIdx++

        if (currentLetterIdx === currentPhrase.length) {
          isDeleting = true
          typingSpeed = 1500 // Wait before starting to delete
        } else {
          typingSpeed = 70 // Speed when typing
        }
      } else {
        setTypedText(currentPhrase.substring(0, currentLetterIdx - 1))
        currentLetterIdx--

        if (currentLetterIdx === 0) {
          isDeleting = false
          currentPhraseIdx = (currentPhraseIdx + 1) % phrases.length
          typingSpeed = 500 // Wait before starting to type next word
        } else {
          typingSpeed = 35 // Speed when deleting
        }
      }

      timer = setTimeout(handleType, typingSpeed)
    }

    handleType()

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const glow = glowRef.current
    const robot = robotRef.current
    if (!section || !glow || !robot) return

    let rafId
    const getStartPoint = () => ({
      x: window.innerWidth >= 1024 ? window.innerWidth * 0.72 : window.innerWidth * 0.5,
      y: window.innerWidth >= 1024 ? window.innerHeight * 0.42 : window.innerHeight * 0.62,
    })
    const startPoint = getStartPoint()
    let targetX = startPoint.x
    let targetY = startPoint.y
    let currentX = targetX
    let currentY = targetY
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    glow.style.opacity = hasHover ? '1' : '0'

    // Smooth lerp loop
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.08)
      currentY = lerp(currentY, targetY, 0.08)
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
      // Update CSS variables for moving background effect
      section.style.setProperty('--bg-x', `${targetX}px`);
      section.style.setProperty('--bg-y', `${targetY}px`);
    }

    const onRobotPointerMove = (e) => {
      if (e.pointerType === 'mouse') return
      onMouseMove(e)
      glow.style.opacity = '1'
    }
    const hideTouchGlow = (e) => {
      if (e.pointerType !== 'mouse') glow.style.opacity = '0'
    }

    const onResize = () => {
      const nextPoint = getStartPoint()
      targetX = nextPoint.x
      targetY = nextPoint.y
    }

    section.addEventListener('mousemove', onMouseMove)
    robot.addEventListener('pointerdown', onRobotPointerMove, true)
    robot.addEventListener('pointermove', onRobotPointerMove, true)
    robot.addEventListener('pointerup', hideTouchGlow, true)
    robot.addEventListener('pointercancel', hideTouchGlow, true)
    window.addEventListener('resize', onResize)
    rafId = requestAnimationFrame(animate)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      robot.removeEventListener('pointerdown', onRobotPointerMove, true)
      robot.removeEventListener('pointermove', onRobotPointerMove, true)
      robot.removeEventListener('pointerup', hideTouchGlow, true)
      robot.removeEventListener('pointercancel', hideTouchGlow, true)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center pt-20 pb-0 sm:pt-24 sm:pb-0 lg:py-0"
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute top-24 -right-32 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px] pointer-events-none animate-float-slow z-0 sm:h-[450px] sm:w-[450px] sm:right-[15%] sm:blur-[120px]" />
      <div className="absolute bottom-10 -left-32 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none animate-float-delay z-0 sm:h-[500px] sm:w-[500px] sm:left-[10%] sm:bottom-1/4 sm:blur-[140px]" />

      {/* ── Mouse-following radial glow ── */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 z-0"
        style={{
          width: 'clamp(72px, 15vw, 200px)',
          height: 'clamp(72px, 15vw, 200px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.05) 70%, transparent 100%)',
          willChange: 'transform',
          mixBlendMode: 'screen',
          transition: 'opacity 180ms ease',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated pointer overlay */}
      <div className="bg-hero-pointer"></div>

      {/* ── Content grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-0 lg:pt-24 pb-0 flex min-h-[calc(100vh-5rem)] lg:h-screen lg:min-h-[600px] items-center">
        <div className="flex w-full flex-col lg:h-full lg:flex-row lg:gap-0">

          {/* ── Left — copy ── */}
          <div className="w-full lg:w-[45%] flex-shrink-0 flex flex-col justify-center py-6 sm:py-8 lg:pr-6 text-center lg:text-left items-center lg:items-start">
            {/* Badge — fixed-size pill, only inner text loops */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-medium mb-4 animate-fade-in overflow-hidden"
              style={{ width: 'min(260px, 100%)', minHeight: '34px' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-bold ml-1 whitespace-nowrap">
                {typedText}
              </span>
              <span className="inline-block w-[1.5px] h-3 bg-blue-400 ml-0.5 animate-pulse flex-shrink-0" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-3 animate-fade-in-up max-w-xl">
              Professional
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">Website Designs</span>
              <br />
              for Your Business
            </h1>


            <p className="text-sm sm:text-base lg:text-sm text-neutral-400 leading-relaxed max-w-xl lg:max-w-sm mb-6 animate-fade-in-up animation-delay-100">
              Bring your business ideas to life with modern, high-performance website designs.
              Explore premium website templates, preview live demos instantly, and customize every detail to match your brand identity.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 mb-6 animate-fade-in-up animation-delay-200">
              {[
                { value: '150+', label: 'Projects' },
                { value: '98%', label: 'Satisfaction' },
                { value: '7+', label: 'Templates' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-lg font-black text-white">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex w-full max-w-sm flex-col sm:flex-row gap-3 animate-fade-in-up animation-delay-300 lg:max-w-none">
              <a
                href="/showcase/website-showcase"
                className="group px-5 py-3 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 text-center"
                onClick={(e) => { e.preventDefault(); import('../utils/navigate').then(m => m.navigate('/showcase/website-showcase')); }}
              >
                View Designs
                <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
              <a
                href="/showcase/#contact"
                className="px-5 py-3 text-sm bg-white/5 border border-white/15 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-center backdrop-blur-sm"
              >
                Get Free Quote
              </a>
            </div>
          </div>

          {/* ── Right — Interactive 3D Robot ── */}
          <div
            ref={robotRef}
            className="relative mx-auto mt-6 h-[clamp(220px,38vh,320px)] w-full max-w-[520px] overflow-visible sm:h-[clamp(320px,42vh,460px)] sm:max-w-[680px] lg:mx-0 lg:mt-0 lg:h-[min(78vh,720px)] lg:max-w-none lg:flex-1 lg:-ml-40 xl:-ml-56 2xl:-ml-72"
            style={{ transform: 'translateY(clamp(0px, 2vh, 18px))' }}
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full origin-center scale-100 sm:scale-105 lg:origin-left lg:scale-[1.15] xl:scale-[1.25]"
            />
          </div>

        </div>
      </div>
{/* 
      Scroll indicator
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce z-10">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </div> */}
    </section>
  )
}


