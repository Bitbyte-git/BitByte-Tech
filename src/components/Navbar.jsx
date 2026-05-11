import { navLinks } from '../constants'
import Logo from './Logo'

export default function Navbar({ stuck, onMenuOpen }) {
  return (
    <nav id="navbar" className={stuck ? 'stuck' : ''}>
      <a href="#hero" className="logo-wrap" aria-label="Bit Byte Technologies home">
        <Logo idPrefix="nav-logo" />
      </a>
      <ul className="nav-links">
        {navLinks.map(([href, label]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="btn-glow">
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
