import { useTranslation } from '../i18n'

export default function CTA() {
  const { t } = useTranslation()

  return (
    <section id="cta" className="wrap">
      <div className="cta-glow" />
      <div className="cta-box reveal">
        <div className="eyebrow center" style={{ marginBottom: 16 }}>
          {t('cta.eyebrow')}
        </div>
        <h2 className="sec-title center" data-magnify="true" style={{ maxWidth: 540, margin: '0 auto 14px' }}>
             {t('cta.title1')} <br />
          <span className="c">{t('cta.titleA')}</span>
          <br />
          {t('cta.titleB')} <br />
           <span className="c">{t('cta.titleC')}</span>
        </h2>
        <p className="sec-sub center" data-magnify="true" style={{ margin: '0 auto 40px' }}>
          {t('cta.body')}
        </p>
        <div className="cta-btns">
          <a href="#services" className="btn-primary" title="Go to services">
            {t('cta.primary')} <span className="arr">→</span>
          </a>
          <a href="#contact" className="btn-ghost" title="Go to contact">
            {t('cta.secondary')} <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
