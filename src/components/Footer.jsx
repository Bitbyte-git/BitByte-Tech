import { socialIcons } from '../constants'
import Logo from './Logo'

export default function Footer({ rootLinks = false }) {
  const footerColumns = [
    ['Services', ['Web App Development', 'Digital Marketing', "Business Analytics"]],
    ['Company', ['About Us', 'Portfolio', 'Careers', 'Testimonials', 'Contact']],
    ['Contact', ['reacus@bitbytetech.org', '+91 99437 43136', 'BitByte Technologies 2nd Floor, Raja Complex West Wing, Opp: Sago Serve, Omalur Main Road, Salem-636302, Tamil Nadu, India.', 'Privacy Policy', 'Terms of Service']],
  ]

  const hrefs = {
    'LinkedIn': 'https://www.linkedin.com/in/bit-byte-technologies-4aa820406/',
    'Twitter': 'https://x.com/BitbyteReachus',
    'Instagram': 'https://www.instagram.com/bit_byte.technologies/',
  }

  const hrefFor = (item) => {
    const map = {
      'About Us': '#founder',
      Portfolio: '#portfolio',
      Careers: '/careers',
      Testimonials: '#testimonials',
      Contact: '#contact',
      'Web App Development': '/services/web-development',
      'Digital Marketing': '/services/digital-marketing/ai-powered-digital-marketing-solutions',
      'Business Analytics': '/services/business-analytics/data-driven-business-analytics-solutions',
    }
    const href = map[item] || '#contact'
    if (href.startsWith('/')) return href
    return rootLinks ? `/${href}` : href
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
              <a href={hrefs[label] || '#'} className="soc-btn" aria-label={label} key={label}>
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
          © {new Date().getFullYear()} <span>Bit Byte Technologies</span>. All rights reserved. Desinged,Developed and Maintained  by Web development Team at Bit Byte Technologies <a style={{ color: '#a4ec70' }} href="https://www.linkedin.com/in/selvaperumal-g-9656b32a1?utm_source=share_via&utm_content=profile&utm_medium=member_android">Selvaperumal G & </a>
          <a style={{ color: '#a4ec70' }} href="https://www.linkedin.com/in/roshini-govindaraj-233941331/">Roshini G</a>
        </div>
        <div className="footer-socials">
          {socialIcons.slice(0, 3).map(([label, icon]) => (
            <a href={hrefs[label] || '#'} className="soc-btn" aria-label={label} key={label}>
              <i className={icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
