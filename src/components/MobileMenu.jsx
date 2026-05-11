import { navLinks } from '../constants'

export default function MobileMenu({ open, onClose }) {
  return (
    <div className={`mob-menu ${open ? 'open' : ''}`} id="mobMenu">
      <button className="mob-close" type="button" aria-label="Close menu" onClick={onClose}>
        <i className="fas fa-times" aria-hidden="true" />
      </button>
      {navLinks.map(([href, label]) => (
        <a key={href} href={href} onClick={onClose}>
          {label}
        </a>
      ))}
      <a href="#contact" className="btn-glow" style={{ marginTop: 10 }} onClick={onClose}>
        Get Started
      </a>
    </div>
  )
}
