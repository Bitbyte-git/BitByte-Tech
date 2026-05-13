import { memo } from 'react'
import { navLinks } from '../constants'

function MobileMenu({ open, onClose, rootLinks = false }) {
  const hrefFor = (href) => {
    if (href.startsWith('/')) return href
    return rootLinks ? `/${href}` : href
  }

  return (
    <div className={`mob-menu ${open ? 'open' : ''}`} id="mobMenu">
      <button className="mob-close" type="button" aria-label="Close menu" onClick={onClose}>
        <i className="fas fa-times" aria-hidden="true" />
      </button>
      {navLinks.map(([href, label]) => (
        <a key={href} href={hrefFor(href)} onClick={onClose}>
          {label}
        </a>
      ))}
      <a href={hrefFor('#contact')} className="btn-glow" style={{ marginTop: 10 }} onClick={onClose}>
        Get Started
      </a>
    </div>
  )
}

export default memo(MobileMenu)
