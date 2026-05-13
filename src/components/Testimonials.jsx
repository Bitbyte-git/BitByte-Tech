import { useTranslation } from 'react-i18next'
import { testimonials } from '../constants'

export default function Testimonials() {
  const { t } = useTranslation()

  return (
    <section id="testimonials" className="section wrap center">
      <div className="eyebrow reveal" data-magnify="true">{t('testimonials.eyebrow')}</div>
      <h2 className="sec-title reveal reveal-delay-1" data-magnify="true">
        {t('testimonials.titleA')} <span className="c">{t('testimonials.titleB')}</span>
      </h2>
      <div className="tgrid">
        {testimonials.map(([avatar, name, role, text], index) => (
          <div className={`tcard reveal reveal-delay-${index + 1}`} key={name}>
            <div className="stars">★★★★★</div>
            <p className="ttext" data-magnify="true">{text}</p>
            <div className="tauthor">
              <div className="tavatar">{avatar}</div>
              <div>
                <div className="tname">{name}</div>
                <div className="trole">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
