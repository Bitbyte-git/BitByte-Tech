import { memo, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../i18n'

const HERO_GIF_SRC = '/assets/optimized/Hero-bg.gif'

function Hero({ planetRef }) {
  const { t } = useTranslation()
  const fullText = t('hero.badge')
  const floatCards = t('hero.floatCards', { returnObjects: true })
  const [activeBuffer, setActiveBuffer] = useState(0)
  const [keys, setKeys] = useState([0, 1])
  const [loopKey, setLoopKey] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveBuffer(prev => (prev === 0 ? 1 : 0))
    }, 8000) 
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const loopInterval = setInterval(() => {
      setLoopKey(prev => prev + 1)
    }, 6000)
    return () => clearInterval(loopInterval)
  }, [])

  useEffect(() => {
    setKeys(prev => {
      const next = [...prev]
      const hiddenIndex = activeBuffer === 0 ? 1 : 0
      next[hiddenIndex] += 2
      return next
    })
  }, [activeBuffer])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      rotateY: 0, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.34, 1.56, 0.64, 1] // Bouncy entry
      }
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      scale: 0.8,
      transition: { duration: 0.4 }
    }
  }

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
            key={keys[0]}
            src={`${HERO_GIF_SRC}?v=${keys[0]}`}
            alt="" 
            className="hero-gif" 
            width="480"
            height="480"
            style={{ 
              position: 'absolute', 
              inset: 0, 
              opacity: activeBuffer === 0 ? 1 : 0, 
              transition: 'opacity 0.8s ease-in-out' 
            }}
          />
          <img 
            key={keys[1]}
            src={`${HERO_GIF_SRC}?v=${keys[1]}`}
            alt="" 
            className="hero-gif" 
            width="480"
            height="480"
            style={{ 
              opacity: activeBuffer === 1 ? 1 : 0, 
              transition: 'opacity 0.8s ease-in-out' 
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
          <AnimatePresence mode="wait">
            <motion.div 
              key={loopKey}
              className="badge-txt"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
            >
              {fullText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="grad"
                  style={{ 
                    display: 'inline-block', 
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                    transformOrigin: 'center'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
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
