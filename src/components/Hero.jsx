import { memo, useEffect, useState } from 'react'
import { useTranslation } from '../i18n'

const HERO_GIF_SRC = '/assets/optimized/hero-bg-480.gif'

function Hero({ planetRef }) {
  const { t } = useTranslation()
  const fullText = t('hero.badge')
  const floatCards = t('hero.floatCards', { returnObjects: true })
  const serviceCards = Array.isArray(floatCards)
    ? floatCards.map((card) => (
        Array.isArray(card)
          ? { icon: card[0], name: card[1], tag: card[2], items: [] }
          : { items: [], ...card }
      ))
    : []
  const [badgeText, setBadgeText] = useState('')

  useEffect(() => {
    let timeoutId
    let index = 0
    let deleting = false

    const tick = () => {
      setBadgeText(fullText.slice(0, index))

      if (!deleting && index < fullText.length) {
        index += 1
        timeoutId = window.setTimeout(tick, 75)
        return
      }

      if (!deleting && index === fullText.length) {
        deleting = true
        timeoutId = window.setTimeout(tick, 1800)
        return
      }

      if (deleting && index > 0) {
        index -= 1
        timeoutId = window.setTimeout(tick, 35)
        return
      }

      deleting = false
      timeoutId = window.setTimeout(tick, 450)
    }

    tick()
    return () => window.clearTimeout(timeoutId)
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
        <div className="hero-gif-wrap" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img 
            src={HERO_GIF_SRC}
            alt="" 
            className="hero-gif" 
            width="480"
            height="480"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{ 
              position: 'absolute',
              inset: 0,
            }}
          />
        </div>
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
          <div className="badge-txt">
            <span className="grad">{badgeText}</span>
            <span className="badge-cursor" aria-hidden="true" />
          </div>
        </div>
        <h1 className="hero-h1" data-magnify="true">
          <span className="grad">{t('hero.title1')}</span> 
          <br />
          {t('hero.title2')}
          <br />
          <span className="grad">{t('hero.title3')}</span>
          
        </h1>
        <p className="hero-p" data-magnify="true">
          We engineer cutting-edge Web App Development and data-driven digital marketing solutions, crafted for brands that dare to reach
          beyond the horizon.
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
          {[
            ['200+', 'Projects'],
            ['98%', 'Satisfaction'],
            ['1+', 'Years'],
            ['6000+', 'Clients'],
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
        {serviceCards.map(({ icon, name, tag, items }) => (
          <div className="fcrd" key={name}>
            <span className="fcrd-icon">{icon}</span>
            <div className="fcrd-name">{name}</div>
            <div className="fcrd-tag">{tag}</div>
            {items.length > 0 && (
              <ul className="fcrd-list" aria-label={`${name} capabilities`}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default memo(Hero)
