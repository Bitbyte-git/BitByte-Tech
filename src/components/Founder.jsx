import { useTranslation } from 'react-i18next'
import BitByteHero from './BitByteHero'

export default function Founder() {
  const { t } = useTranslation()
  const pills = t('founder.pills', { returnObjects: true })

  return (
    <section id="founder" className="section wrap bg-tint-1">
      <div className="founder-visual inner-content reveal">
        <div className="founder-planet">
          <div className="founder-globe-frame">
            <BitByteHero />
          </div>
        </div>
        <div className="founder-quote reveal reveal-delay-2">
          <p data-magnify="true">Change is the only constant. Growth begins when we learn to adapt.</p>
          <cite>Founder, Bit Byte Technologies</cite>
        </div>
      </div>
      <div className="founder-content inner-content">
        <div className="eyebrow reveal" data-magnify="true">{t('founder.eyebrow')}</div>
        <h2 className="sec-title reveal reveal-delay-1" data-magnify="true">
          {t('founder.titleA')}
          <br />
          <span className="c">{t('founder.titleB')}</span>
        </h2>
        <p className="sec-sub reveal reveal-delay-2" data-magnify="true">
          {t('founder.bodyA')}
        </p>
        <p className="sec-sub reveal reveal-delay-3" data-magnify="true" style={{ marginTop: 16 }}>
          {t('founder.bodyB')}
        </p>
        <div className="founder-pills reveal reveal-delay-4">
          {[
            "14+ Years Experience",
            "Global Clients",
            "Award-Winning",
            "Innovation-First",
            "Cosmos-Inspired",
          ].map((pill) => (
            <span className="pill" key={pill}>
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
