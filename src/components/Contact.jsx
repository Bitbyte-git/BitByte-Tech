import { useState } from 'react'
import { services, socialIcons } from '../constants'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
    window.setTimeout(() => setSent(false), 4000)
  }

  const hrefs = {
    'LinkedIn': 'https://www.linkedin.com/in/bit-byte-technologies-4aa820406/',
    'Twitter': 'https://x.com/BitbyteReachus',
    'Instagram': 'https://www.instagram.com/bit_byte.technologies/',
  }

  return (
    <section id="contact" className="wrap">
      <div className="contact-info">
        <div className="eyebrow reveal">Get in Touch</div>
        <h2 className="sec-title reveal reveal-delay-1">
          Let&apos;s Build Your
          <br />
          <span className="c">Digital Universe</span>
        </h2>
        <p className="sec-sub reveal reveal-delay-2">Ready to launch? Drop us a message and our team will respond within 24 hours.</p>
        {[
          ['📧', 'Email', 'reacus@bitbytetech.org'],
          ['📞', 'Phone', '+91 99437 43136'],
          ['📍', 'Address', 'BitByte Technologies 2nd Floor, Raja Complex West Wing, Opp: Sago Serve, Omalur Main Road, Salem-636302, Tamil Nadu, India.'],
        ].map(([icon, label, value]) => (
          <div className="cinfo-item reveal reveal-delay-3" key={label}>
            <div className="cinfo-icon">{icon}</div>
            <div>
              <div className="cinfo-lbl">{label}</div>
              <div className="cinfo-val">{value}</div>
            </div>
          </div>
        ))}
        <div className="social-row reveal reveal-delay-4">
          {socialIcons.map(([label, icon]) => (
            <a href={hrefs[label] || '#'} className="soc-btn" title={label} aria-label={label} key={label}>
              <i className={icon} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="map-box reveal reveal-delay-5">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.1146247014385!2d78.11783517586751!3d11.68628818852331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf08788359539%3A0xd17936017c8a724d!2sRajaa%20Bakery!5e0!3m2!1sen!2sin!4v1778570292968!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          Send a Message
        </div>
        <div className="form-row">
          <div className="fgroup">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" placeholder="John" />
          </div>
          <div className="fgroup">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" placeholder="Doe" />
          </div>
        </div>
        <div className="fgroup">
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" placeholder="john@company.com" />
        </div>
        <div className="fgroup">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="tel" placeholder="+91 9943* *****" />
        </div>
        <div className="fgroup">
          <label htmlFor="service">Service Interested In</label>
          <select id="service" defaultValue="">
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service.title}>{service.title}</option>
            ))}
            <option>Other</option>
          </select>
        </div>
        <div className="fgroup">
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Tell us about your project..." />
        </div>
        <button className="btn-submit" type="submit">
          {sent ? (
            "✓ Message Sent! We'll be in touch."
          ) : (
            <>
              <i className="fas fa-paper-plane" style={{ marginRight: 8 }} aria-hidden="true" />
              Launch My Project
            </>
          )}
        </button>
      </form>
    </section>
  )
}
