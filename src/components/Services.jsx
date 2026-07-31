import { memo } from 'react'
import { useTranslation } from '../i18n'
import { services } from '../constants'

function Services({ activeServiceId }) {
  const { t } = useTranslation()

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

        <div className="services-grid">
          {services.map((service) => {
            const isFocused = activeServiceId === service.id || activeServiceId === 'all'

            return (
              <a
                aria-label={t(`services.cards.${service.id}.title`, service.title)}
                className={`svc-card premium-service-card reveal ${isFocused ? 'is-focused' : ''}`}
                data-service-id={service.id}
                href={service.route}
                key={service.id}
              >
                <span className="svc-orbit" aria-hidden="true" />
                <span className="svc-icon-wrap">
                  {service.icon ? (
                    <i className={`${service.icon} svc-icon-fa`} aria-hidden="true" />
                  ) : (
                    <span className="svc-icon-glyph" aria-hidden="true">{service.glyph}</span>
                  )}
                </span>
                <span className="svc-stat">{t(`services.cards.${service.id}.stat`, service.stat)}</span>
                <div className="svc-title" data-magnify="true">{t(`services.cards.${service.id}.title`, service.title)}</div>
                <p className="svc-desc" data-magnify="true">{t(`services.cards.${service.id}.desc`, service.desc)}</p>
                <span className="svc-link">
                  {t('services.learnMore')} <span aria-hidden="true">→</span>
                </span>
                {isFocused && <span className="sr-only">{t('services.active')}</span>}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default memo(Services)
