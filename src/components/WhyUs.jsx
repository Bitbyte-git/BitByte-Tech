import { useTranslation } from '../i18n'
import { whyItems } from '../constants'

export default function WhyUs() {
  const { t } = useTranslation()

  return (
    <section id="why" className="section wrap center">
      <div className="eyebrow reveal" data-magnify="true">{t('why.eyebrow')}</div>
      <h2 className="sec-title reveal reveal-delay-1" data-magnify="true">
        Why Choose <span className="c"><b>Bit Byte Technologies</b></span>
      </h2>
      <p className="sec-sub reveal reveal-delay-2" data-magnify="true" style={{ margin: '12px auto 0' }}>
        {t('why.body')}
      </p>
      <div className="grid-3">
        {whyItems.map(([num, icon, title, desc], index) => (
          <div className={`why-card reveal reveal-delay-${(index % 3) + 1}`} key={num}>
            <div className="why-num">{num}</div>
            <span className="why-icon">{icon}</span>
            <div className="why-title">{title}</div>
            <p className="why-desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
