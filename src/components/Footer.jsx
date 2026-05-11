import { socialIcons } from '../constants'
import Logo from './Logo'

export default function Footer() {
  const footerColumns = [
    ['Services', ['Web Development', 'Digital Marketing', 'SEO Optimization', 'UI/UX Design', 'Branding']],
    ['Company', ['About Us', 'Portfolio', 'Careers', 'Testimonials', 'Contact']],
    ['Contact', ['hello@bitbytetech.com', '+91 98765 43210', 'Tiruchirappalli, TN', 'Privacy Policy', 'Terms of Service']],
  ]

  const hrefFor = (item) => {
    const map = {
      'About Us': '#founder',
      Portfolio: '#portfolio',
      Careers: '#careers',
      Testimonials: '#testimonials',
      Contact: '#contact',
    }
    return map[item] || '#contact'
  }

  return (
    <footer className="wrap">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#hero" className="logo-wrap" style={{ display: 'inline-flex' }} aria-label="Bit Byte Technologies home">
            <Logo idPrefix="footer-logo" height={40} />
          </a>
          <p>Transforming ideas into digital reality: one line of code, one campaign, one galaxy at a time.</p>
          <div className="social-row" style={{ marginTop: 20 }}>
            {socialIcons.slice(0, 4).map(([label, icon]) => (
              <a href="#" className="soc-btn" aria-label={label} key={label}>
                <i className={icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        {footerColumns.map(([title, links]) => (
          <div key={title}>
            <div className="footer-col-title">{title}</div>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={link}>
                  <a href={hrefFor(link)}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} <span>Bit Byte Technologies</span>. All rights reserved. Built with React, Vite, and Tailwind.
        </div>
        <div className="footer-socials">
          {socialIcons.slice(0, 3).map(([label, icon]) => (
            <a href="#" className="soc-btn" aria-label={label} key={label}>
              <i className={icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
