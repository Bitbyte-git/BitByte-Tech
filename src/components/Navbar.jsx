import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { navLinks } from '../constants'
import { services } from '../constants'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

function Navbar({
  activeSection = 'home',
  activeServiceId,
  stuck,
  onMenuOpen,
  onNavClick,
  onServiceSelect,
  rootLinks = false,
}) {
  const { t } = useTranslation()

  const hrefFor = (href) => {
    if (href.startsWith('/')) return href
    return rootLinks ? `/${href}` : href
  }

  return (
    <nav id="navbar" className={stuck ? 'stuck' : ''}>
      <a href={hrefFor('#hero')} className="logo-wrap" aria-label="Bit Byte Technologies home">
        <Logo fetchPriority="high" />
        <div className="logo-txt">
         <em>Bit Byte</em>
        </div>
      </a>
      <ul className="nav-links">
        {navLinks.map(({ href, key, label }) => (
          <li key={href}>
            <a
              href={hrefFor(href)}
              className={`${activeSection === key ? 'active' : ''} ${key === 'services' && activeServiceId ? 'service-pulsing' : ''}`}
              onClick={(event) => onNavClick?.(event, href, key)}
            >
              {t(`nav.${key}`, label)}
            </a>
            {key === 'services' && (
              <div className="service-nav-menu" aria-label={t('nav.services')}>
                {services.map((service) => (
                  <a
                    href={hrefFor(service.route)}
                    className={activeServiceId === service.id ? 'active' : ''}
                    key={service.id}
                    onClick={(event) => {
                      if (service.route.startsWith('#')) {
                        onServiceSelect?.(event, service.id)
                      }
                    }}
                  >
                    <i className={service.icon} aria-hidden="true" />
                    <span>{t(`services.cards.${service.id}.title`, service.title)}</span>
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        <LanguageSwitcher />
        <a href={hrefFor('#contact')} className="btn-glow">
          {t('nav.getStarted')}
        </a>
      </div>
      <button className="ham" type="button" id="hamBtn" aria-label={t('nav.openMenu')} onClick={onMenuOpen}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}

export default memo(Navbar)
