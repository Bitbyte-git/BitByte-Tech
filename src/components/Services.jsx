import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from '../i18n'
import { services } from '../constants'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function Services({ activeServiceId }) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const motionProps = useMemo(() => {
    if (reduceMotion) {
      return {}
    }

    return {
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, amount: 0.18 },
      variants: containerVariants,
    }
  }, [reduceMotion])

  return (
    <section id="services" className="section wrap center services-section">
      <div className="services-shell">
        <div className="eyebrow reveal" data-magnify="true">{t('services.eyebrow')}</div>
        <h2 className="sec-title reveal reveal-delay-1" data-magnify="true">
          {t('services.titleA')} <span className="c">{t('services.titleB')}</span>
        </h2>
        <p className="sec-sub reveal reveal-delay-2" data-magnify="true" style={{ margin: '12px auto 0' }}>
          {t('services.body')}
        </p>

        <motion.div className="services-grid" {...motionProps}>
          {services.map((service) => {
            const isFocused = activeServiceId === service.id || activeServiceId === 'all'

            return (
              <motion.a
                aria-label={t(`services.cards.${service.id}.title`, service.title)}
                className={`svc-card premium-service-card ${isFocused ? 'is-focused' : ''}`}
                data-service-id={service.id}
                href={service.route}
                key={service.id}
                variants={reduceMotion ? undefined : cardVariants}
              >
                <span className="svc-orbit" aria-hidden="true" />
                <span className="svc-icon-wrap">
                  <i className={service.icon} aria-hidden="true" />
                </span>
                <span className="svc-stat">{t(`services.cards.${service.id}.stat`, service.stat)}</span>
                <div className="svc-title" data-magnify="true">{t(`services.cards.${service.id}.title`, service.title)}</div>
                <p className="svc-desc" data-magnify="true">{t(`services.cards.${service.id}.desc`, service.desc)}</p>
                <span className="svc-link">
                  {t('services.learnMore')} <span aria-hidden="true">→</span>
                </span>
                {isFocused && <span className="sr-only">{t('services.active')}</span>}
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Services)
