import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../i18n'
import { services, socialIcons } from '../constants'

export default function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const sentTimeoutRef = useRef(0)

  function handleSubmit(event) {
    event.preventDefault()
    window.clearTimeout(sentTimeoutRef.current)
    setSent(true)
    sentTimeoutRef.current = window.setTimeout(() => setSent(false), 4000)
  }

  useEffect(() => () => window.clearTimeout(sentTimeoutRef.current), [])

  const hrefs = {
    'LinkedIn': 'https://www.linkedin.com/in/bit-byte-technologies-4aa820406/',
    'Twitter': 'https://x.com/BitbyteReachus',
    'Instagram': 'https://www.instagram.com/bit_byte.technologies/',
  }
  const contactDetails = [
    ['📧', 'Email', 'reachus@bitbytetech.org'],
    ['📞', 'Phone', '+91 99437 43136'],
    ['📍', 'Address', 'BitByte Technologies 2nd Floor, Raja Complex West Wing, Opp: Sago Serve, Omalur Main Road, Salem-636302, Tamil Nadu, India.'],
  ]

  return (
    <section id="contact" className="section wrap">
      <div className="contact-info">
        <div className="eyebrow reveal" data-magnify="true">{t('contact.eyebrow')}</div>
        <h2 className="sec-title reveal reveal-delay-1" data-magnify="true">
          {t('contact.titleA')}
          <br />
          <span className="c">{t('contact.titleB')}</span>
        </h2>
        <p className="sec-sub reveal reveal-delay-2" data-magnify="true">{t('contact.body')}</p>
        {contactDetails.map(([cIcon, label, value]) => (
          <div className="cinfo-item reveal reveal-delay-3" key={label}>
            <div className="cinfo-icon">{cIcon}</div>
            <div>
              <div className="cinfo-lbl">{label}</div>
              <div className="cinfo-val">{value}</div>
            </div>
          </div>
        ))}
        <div className="social-row reveal reveal-delay-4">
          {socialIcons.map(([label, sIcon]) => (
            <a href={hrefs[label] || '#'} className="soc-btn" title={label} aria-label={label} key={label}>
              <i className={sIcon} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="map-box reveal reveal-delay-5">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.1146247014385!2d78.11783517586751!3d11.68628818852331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf08788359539%3A0xd17936017c8a724d!2sRajaa%20Bakery!5e0!3m2!1sen!2sin!4v1778570292968!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          {t('contact.formTitle')}
        </div>
        <div className="form-row">
          <div className="fgroup">
            <label htmlFor="firstName">{t('contact.firstName')}</label>
            <input id="firstName" type="text" placeholder="John" />
          </div>
          <div className="fgroup">
            <label htmlFor="lastName">{t('contact.lastName')}</label>
            <input id="lastName" type="text" placeholder="Doe" />
          </div>
        </div>
        <div className="fgroup">
          <label htmlFor="email">{t('contact.email')}</label>
          <input id="email" type="email" placeholder="john@company.com" />
        </div>
        <div className="fgroup">
          <label htmlFor="phone">{t('contact.phone')}</label>
          <input id="phone" type="tel" placeholder="+91 9943* *****" />
        </div>
        <div className="fgroup">
          <label htmlFor="service">{t('contact.service')}</label>
          <select id="service" defaultValue="">
            <option value="">{t('contact.select')}</option>
            {services.map((service) => (
              <option key={service.id}>{t(`services.cards.${service.id}.title`, service.title)}</option>
            ))}
            <option>{t('contact.other')}</option>
          </select>
        </div>
        <div className="fgroup">
          <label htmlFor="message">{t('contact.message')}</label>
          <textarea id="message" placeholder={t('contact.messagePlaceholder')} />
        </div>
        <button className="btn-submit" type="submit" aria-label={sent ? t('contact.sent') : t('contact.submit')}>
          <span className={`btn-submit-state ${sent ? 'is-hidden' : ''}`} aria-hidden={sent}>
            <i className="fas fa-paper-plane" aria-hidden="true" />
            <span>{t('contact.submit')}</span>
          </span>
          <span className={`btn-submit-state ${sent ? '' : 'is-hidden'}`} aria-hidden={!sent}>
            {t('contact.sent')}
          </span>
        </button>
      </form>
    </section>
  )
}
