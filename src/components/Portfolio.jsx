import { useTranslation } from 'react-i18next'
import { projects } from '../constants'

export default function Portfolio() {
  const { t } = useTranslation()

  return (
    <section id="portfolio" className="section wrap center">
      <div className="eyebrow reveal" data-magnify="true">{t('portfolio.eyebrow')}</div>
      <h2 className="sec-title reveal reveal-delay-1" data-magnify="true">
        {t('portfolio.titleA')} <span className="c">{t('portfolio.titleB')}</span>
      </h2>
      <p className="sec-sub reveal reveal-delay-2" data-magnify="true" style={{ margin: '12px auto 0' }}>
        {t('portfolio.body')}
      </p>
      <div className="grid-3">
        {projects.map(([thumbClass, icon, tag, name, desc], index) => (
          <div className={`port-card reveal reveal-delay-${index + 1}`} key={name}>
            <div className={`port-thumb ${thumbClass}`}>{icon}</div>
            <div className="port-body">
              <div className="port-tag">{tag}</div>
              <div className="port-name">{name}</div>
              <p className="port-desc" data-magnify="true">{desc}</p>
              <a href="#contact" className="port-link">
                {t('portfolio.view')} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
