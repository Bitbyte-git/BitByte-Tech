import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function Hero({ planetRef }) {
  const { t } = useTranslation()
  const [typedText, setTypedText] = useState('')
  const fullText = t('hero.badge')
  const stats = t('hero.stats', { returnObjects: true })
  const floatCards = t('hero.floatCards', { returnObjects: true })

  const [gifKey, setGifKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGifKey(k => k + 1)
    }, 20000) // Restart GIF every 20s
    return () => clearInterval(interval)
  }, [])

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
  }, [fullText])

  return (
    <section id="hero" className="wrap">
      <div className="neb neb-1" />
      <div className="neb neb-2" />
      <div className="neb neb-3" />

      <div 
        className="planet-sys" 
        ref={planetRef}
      >
        <img 
          key={gifKey}
          src={`/assets/Hero-bg.gif?v=${gifKey}`}
          alt="" 
          className="hero-gif" 
          width="600"
          height="600"
          loading="eager"
          decoding="async"
          fetchPriority="high"
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
          fetchPriority="high"
        />
      </div>

      <div className="hero-content">
        <div className="hero-badge" data-magnify="true">
          <div className="badge-dot" />
          <span className="badge-txt">{typedText}<span className="cursor-blink">|</span></span>
        </div>
        <h1 className="hero-h1" data-magnify="true">
          <span className="grad">{t('hero.title1')}</span> 
          <br />
          {t('hero.title2')}
          <br />
          <span className="grad">{t('hero.title3')}</span>
        </h1>
        <p className="hero-p" data-magnify="true">
          {t('hero.body')}
        </p>
        <div className="hero-btns">
          <a href="#services" className="btn-primary">
            {t('hero.primary')} <span className="arr">→</span>
          </a>
          <a href="#contact" className="btn-ghost">
            {t('hero.secondary')} <span className="arr">→</span>
          </a>
        </div>
        <div className="hero-stats">
          {stats.map(([num, label], index) => (
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
