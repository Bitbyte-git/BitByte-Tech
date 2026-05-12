import { navLinks } from '../constants'
import Logo from './Logo'

export default function Navbar({ stuck, onMenuOpen, rootLinks = false }) {
  const hrefFor = (href) => {
    if (href.startsWith('/')) return href
    return rootLinks ? `/${href}` : href
  }

  return (
    <nav id="navbar" className={stuck ? 'stuck' : ''}>
      <a href={hrefFor('#hero')} className="logo-wrap" aria-label="Bit Byte Technologies home">
        <Logo idPrefix="nav-logo" />
        <div className="logo-txt">
         <em>Bit Byte</em>
        </div>
      </a>
      <ul className="nav-links">
        {navLinks.map(([href, label]) => (
          <li key={href}>
            <a href={hrefFor(href)} className={rootLinks && label === 'Services' ? 'active' : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a href={hrefFor('#contact')} className="btn-glow">
        Get Started
      </a>
      <button className="ham" type="button" id="hamBtn" aria-label="Open menu" onClick={onMenuOpen}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
