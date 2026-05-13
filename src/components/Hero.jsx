import { memo, useEffect, useState } from 'react'
import { floatCards } from '../constants'

function Hero({ planetRef }) {
  const [gifSrc, setGifSrc] = useState('/assets/optimized/hero-bg-480.gif')
  const [typedText, setTypedText] = useState('')
  const fullText = 'Welcome to Bit Byte Technologies'

  useEffect(() => {
    let index = 0
    let isDeleting = false
    let timeoutId
    let isMounted = true

    const type = () => {
      if (!isMounted) return
      setTypedText(fullText.slice(0, index))
      
      if (!isDeleting && index <= fullText.length) {
        index++
        timeoutId = setTimeout(type, 80)
      } else if (isDeleting && index >= 0) {
        index--
        timeoutId = setTimeout(type, 40)
      } else {
        isDeleting = !isDeleting
        timeoutId = setTimeout(type, isDeleting ? 1500 : 500)
      }
    }
    type()
    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const loadAnimatedGif = () => setGifSrc('/assets/Hero-bg.gif')
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(loadAnimatedGif, { timeout: 1800 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(loadAnimatedGif, 900)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <section id="hero" className="wrap">
      <div className="neb neb-1" />
      <div className="neb neb-2" />
      <div className="neb neb-3" />

      <div 
        className="planet-sys" 
        ref={planetRef}
        onMouseEnter={(e) => e.currentTarget.setAttribute('data-paused', 'true')}
        onMouseLeave={(e) => e.currentTarget.removeAttribute('data-paused')}
      >
        <img 
          src={gifSrc}
          alt="" 
          className="hero-gif" 
          width="600"
          height="600"
          loading="eager"
          decoding="async"
          fetchpriority="low"
        />
        <img
          src="/assets/optimized/planet-640.png"
          srcSet="/assets/optimized/planet-320.png 320w, /assets/optimized/planet-640.png 640w"
          sizes="(max-width: 900px) 0px, 280px"
          alt=""
          className="hero-planet"
          width="640"
          height="640"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <div className="badge-dot" />
          <span className="badge-txt">{typedText}<span className="cursor-blink">|</span></span>
        </div>
        <h1 className="hero-h1">
          Transforming
          <br />
          <span className="grad">Ideas into</span>
          <br />
          Digital Reality
        </h1>
        <p className="hero-p">
          We engineer cutting-edge web development and data-driven digital marketing solutions, crafted for brands that dare to reach
          beyond the horizon.
        </p>
        <div className="hero-btns">
          <a href="#services" className="btn-primary">
            Explore Services <span className="arr">→</span>
          </a>
          <a href="#contact" className="btn-ghost">
            Contact Us <span className="arr">→</span>
          </a>
        </div>
        <div className="hero-stats">
          {[
            ['200+', 'Projects'],
            ['98%', 'Satisfaction'],
            ['8+', 'Years'],
            ['50+', 'Clients'],
          ].map(([num, label], index) => (
            <div className={index > 0 ? 'stat-group' : ''} key={label}>
              {index > 0 && <div className="stat-sep" />}
              <span className="snum">{num}</span>
              <span className="slbl">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="float-cards">
        {floatCards.map(([icon, name, tag]) => (
          <div className="fcrd" key={name}>
            <span className="fcrd-icon">{icon}</span>
            <div className="fcrd-name">{name}</div>
            <div className="fcrd-tag">{tag}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default memo(Hero)
