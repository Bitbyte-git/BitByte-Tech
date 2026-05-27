import { memo, useEffect, useState } from 'react'
import { useTranslation } from '../i18n'

const HERO_POSTER_SRC = '/assets/optimized/hero-bg-poster.png'
const HERO_GIF_SRC = '/assets/optimized/hero-bg-480.gif'
const HERO_GIF_DELAY = 5000

const runWhenIdle = (task) => {
  if ('requestIdleCallback' in window) {
    const idleId = window.requestIdleCallback(task, { timeout: 1600 })
    return () => window.cancelIdleCallback?.(idleId)
  }

  const fallbackId = window.setTimeout(task, 120)
  return () => window.clearTimeout(fallbackId)
}

function Hero({ planetRef }) {
  const { t } = useTranslation()
  const [heroMediaSrc, setHeroMediaSrc] = useState(HERO_POSTER_SRC)
  const fullText = t('hero.badge')
  const [displayText, setDisplayText] = useState('')
  const floatCards = t('hero.floatCards', { returnObjects: true })
  const serviceCards = Array.isArray(floatCards)
    ? floatCards.map((card) => (
        Array.isArray(card)
          ? { icon: card[0], name: card[1], tag: card[2], items: [] }
          : { items: [], ...card }
      ))
    : []

  useEffect(() => {
    let cancelIdle
    let cancelled = false
    const timerId = window.setTimeout(() => {
      cancelIdle = runWhenIdle(() => {
        if (!cancelled) setHeroMediaSrc(HERO_GIF_SRC)
      })
    }, HERO_GIF_DELAY)

    return () => {
      cancelled = true
      window.clearTimeout(timerId)
      cancelIdle?.()
    }
  }, [])

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timeout;

    const loop = () => {
      setDisplayText(fullText.substring(0, i));

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && i === fullText.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && i === 0) {
        delay = 500;
        isDeleting = false;
      }

      if (isDeleting) {
        i--;
      } else {
        i++;
      }

      timeout = setTimeout(loop, delay);
    };

    timeout = setTimeout(loop, 100);
    return () => clearTimeout(timeout);
  }, [fullText]);

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
            src={heroMediaSrc}
            alt="" 
            className="hero-gif" 
            width="580"
            height="580"
            loading="eager"
            decoding="async"
            fetchPriority={heroMediaSrc === HERO_POSTER_SRC ? 'high' : 'low'}
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
            <span className="grad">{displayText}</span>
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
