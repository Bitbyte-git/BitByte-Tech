import { memo, useEffect, useState } from 'react'
import { useTranslation } from '../i18n'

const HERO_POSTER_SRC = '/assets/optimized/hero-bg-poster.png'
const HERO_GIF_SRC = '/assets/optimized/hero-bg-480.gif'
const HERO_GIF_DELAY = 5000
const STATS_REPLAY_INTERVAL = 5000
const STATS_COUNT_DURATION = 1200
const PAGE_LANGUAGE = 'en'
const LANGUAGE_STORAGE_KEY = 'bitbyte.googleTranslateLanguage'
const SUPPORTED_LANGUAGE_CODES = new Set(['en', 'ta', 'hi', 'te', 'kn'])

function getSavedLanguage() {
  const params = new URLSearchParams(window.location.search)
  const requestedLanguage = params.get('lng') || params.get('lang')

  if (SUPPORTED_LANGUAGE_CODES.has(requestedLanguage)) return requestedLanguage

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return SUPPORTED_LANGUAGE_CODES.has(storedLanguage) ? storedLanguage : PAGE_LANGUAGE
}

const parseStatValue = (value) => {
  const match = String(value).trim().match(/^(\d+)(.*)$/)
  if (!match) return null

  return {
    target: Number(match[1]),
    suffix: match[2] || '',
  }
}

function AnimatedStatNumber({ value, cycle }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const parsedValue = parseStatValue(value)

    if (!parsedValue || Number.isNaN(parsedValue.target)) {
      setDisplayValue(value)
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      setDisplayValue(value)
      return undefined
    }

    let frameId = 0
    const startedAt = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / STATS_COUNT_DURATION, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(parsedValue.target * easedProgress)
      setDisplayValue(`${currentValue}${parsedValue.suffix}`)

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    setDisplayValue(`0${parsedValue.suffix}`)
    frameId = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(frameId)
  }, [cycle, value])

  return <span className="snum">{displayValue}</span>
}

function Hero({ planetRef }) {
  const { t } = useTranslation()
  const fullText = t('hero.badge')
  const [heroGifReady, setHeroGifReady] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [statsCycle, setStatsCycle] = useState(0)
  const [currentLang, setCurrentLang] = useState(getSavedLanguage)

  useEffect(() => {
    const handleLangChange = (e) => {
      if (e.detail?.code) {
        setCurrentLang(e.detail.code)
      }
    }
    window.addEventListener('bitbyte:languagechange', handleLangChange)
    return () => window.removeEventListener('bitbyte:languagechange', handleLangChange)
  }, [])

  useEffect(() => {
    if (currentLang !== 'en') {
      setDisplayText(fullText)
      return
    }

    let isMounted = true
    let index = 0
    let isDeleting = false
    let timer

    const tick = () => {
      if (!isMounted) return

      if (!isDeleting) {
        setDisplayText(fullText.substring(0, index + 1))
        index++

        if (index === fullText.length) {
          isDeleting = true
          timer = setTimeout(tick, 2500) // Pause when text is fully typed
        } else {
          timer = setTimeout(tick, 80) // Typing speed (80ms per character)
        }
      } else {
        setDisplayText(fullText.substring(0, index - 1))
        index--

        if (index === 0) {
          isDeleting = false
          timer = setTimeout(tick, 800) // Pause when text is completely deleted
        } else {
          timer = setTimeout(tick, 45) // Backspacing speed (45ms per character)
        }
      }
    }

    tick()

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [fullText, currentLang])
  const floatCards = t('hero.floatCards', { returnObjects: true })
  const serviceCards = Array.isArray(floatCards)
    ? floatCards.map((card) => (
        Array.isArray(card)
          ? { icon: card[0], name: card[1], tag: card[2], items: [] }
          : { items: [], ...card }
      ))
    : []
  const heroStats = t('hero.stats', { returnObjects: true })
  const stats = Array.isArray(heroStats)
    ? heroStats
    : [
        ['50+', 'Projects'],
        ['98%', 'Satisfaction'],
        ['1+', 'Years'],
        ['200+', 'Clients'],
      ]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const saveData = Boolean(navigator.connection?.saveData)

    if (prefersReducedMotion || saveData) return undefined

    let timerId = 0
    let loaded = false

    const loadGif = () => {
      if (loaded) return
      loaded = true
      window.clearTimeout(timerId)
      setHeroGifReady(true)
    }

    const schedule = () => {
      timerId = window.setTimeout(loadGif, HERO_GIF_DELAY)
    }

    if (document.readyState === 'complete') {
      schedule()
    } else {
      window.addEventListener('load', schedule, { once: true })
    }

    return () => {
      window.removeEventListener('load', schedule)
      window.clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setStatsCycle((cycle) => cycle + 1)
    }, STATS_REPLAY_INTERVAL)

    return () => window.clearInterval(timerId)
  }, [])


  return (
    <section id="hero" className="wrap">
      <div className="neb neb-1" />
      <div className="neb neb-2" />
      <div className="neb neb-3" />

      <div 
        className="planet-sys" 
        ref={planetRef}
      >
        <div className="hero-gif-wrap" style={{ position: 'relative', width: 'calc(100% + 150px)', height: 'calc(100% + 150px)' }}>
          <img
            src={HERO_POSTER_SRC}
            alt=""
            className={`hero-gif hero-gif-poster ${heroGifReady ? 'is-dimmed' : ''}`}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%'
            }}
          />
          {heroGifReady && (
            <div
              className="hero-gif-anim"
              style={{ backgroundImage: `url(${HERO_GIF_SRC})` }}
              aria-hidden="true"
            />
          )}
        </div>
        <img
          src="/assets/optimized/planet-246.png"
          srcSet="/assets/optimized/planet-160.png 160w, /assets/optimized/planet-240.png 240w, /assets/optimized/planet-246.png 246w"
          sizes="(max-width: 560px) 160px, (max-width: 900px) 240px, 246px"
          alt=""
          className="hero-planet"
          width="246"
          height="246"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </div>

      <div className="hero-content">
        <div className="hero-badge" data-magnify="true">
          <div className="badge-dot" />
          <div className="badge-txt">
            <span className="badge-measure grad" aria-hidden="true">{fullText}</span>
            <span className="badge-live">
              <span className="grad">{displayText}</span>
              <span className="badge-cursor" aria-hidden="true" />
            </span>
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
          <button 
            type="button"
            className="btn-primary"
            onClick={(e) => {
              const navigate = () => {
                const target = document.getElementById('services');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.hash = 'services';
                }
              };
              if (typeof window.gtag_report_conversion === 'function') {
                e.preventDefault();
                let navigated = false;
                const doNavigate = () => {
                  if (!navigated) {
                    navigated = true;
                    navigate();
                  }
                };
                // Safety timeout fallback (500ms) to guarantee navigation if GTag callback is blocked
                setTimeout(doNavigate, 500);
                window.gtag_report_conversion('#services');
              } else {
                navigate();
              }
            }}
          >
            {t('hero.primary')} <span className="arr">→</span>
          </button>
          <a href="#contact" className="btn-ghost" title="Go to contact">
            {t('hero.secondary')} <span className="arr">→</span>
          </a>
        </div>
        <div className="hero-stats">
          {stats.map(([num, label], index) => (
            <div className={index > 0 ? 'stat-group' : ''} key={label}>
              {index > 0 && <div className="stat-sep" />}
              <AnimatedStatNumber value={num} cycle={statsCycle} />
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
