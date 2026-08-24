import { memo, useState } from "react";
import { navLinks, services } from "../constants";
import { useTranslation } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

function Navbar({
  activeSection = "home",
  activeServiceId,
  stuck,
  onMenuOpen,
  onNavClick,
  onServiceSelect,
  rootLinks = false,
  onHRMSClick,
  onBillingClick,
  onShowcaseClick,
  onCareerAdminClick,
}) {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hrefFor = (href) => {
    if (href.startsWith("/")) return href;
    return rootLinks ? `/${href}` : href;
  };

  return (
    <>
      <nav id="navbar" className={stuck ? "stuck" : ""}>
        <a
          href={hrefFor("#hero")}
          className="logo-wrap"
          aria-label="Bit Byte Technologies home"
        >
          <Logo fetchPriority="high" height={80} />
          <div className="logo-txt">
            <em>Bit Byte</em>
            <p>Technologies</p>
          </div>
        </a>
        <ul className="nav-links">
          {navLinks.filter((link) => link.key !== "showcase").map(({ href, key, label }) => (
            <li key={href}>
              <a
                href={hrefFor(href)}
                className={`${activeSection === key ? "active" : ""} ${key === "services" && activeServiceId ? "service-pulsing" : ""}`}
                title={label}
                onClick={(event) => onNavClick?.(event, href, key)}
              >
                {t(`nav.${key}`, label)}
              </a>
              {key === "services" && (
                <div className="service-nav-menu" aria-label={t("nav.services")}>
                  {services.map((service) => (
                    <a
                      href={hrefFor(service.route)}
                      className={activeServiceId === service.id ? "active" : ""}
                      key={service.id}
                      title={service.title}
                  onClick={(event) => {
                        if (service.route.startsWith("#")) {
                          onServiceSelect?.(event, service.id);
                        }
                      }}
                    >
                      <i className={service.icon} aria-hidden="true" />
                      <span>
                        {t(`services.cards.${service.id}.title`, service.title)}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <LanguageSwitcher />
          <div 
            className={`workspace-dropdown ${dropdownOpen ? "open" : ""}`}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              type="button" 
              className="btn-workspace-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>BB Workspace</span>
              <span className="dropdown-arrow" aria-hidden="true">⌄</span>
            </button>
            <div className="workspace-dropdown-menu">
              <button
                type="button"
                onClick={(e) => {
                  setDropdownOpen(false);
                  onShowcaseClick?.(e);
                }}
              >
                <span className="workspace-menu-icon" aria-hidden="true">SC</span>
                <span>Showcase</span>
              </button>
              <button 
                type="button" 
                onClick={(e) => {
                  setDropdownOpen(false);
                  onHRMSClick?.(e);
                }}
              >
                <span className="workspace-menu-icon" aria-hidden="true">LK</span>
                <span>HRMS Login</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setDropdownOpen(false);
                  onBillingClick?.(e);
                }}
              >
                <span className="workspace-menu-icon" aria-hidden="true">IN</span>
                <span>Billing</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setDropdownOpen(false);
                  onCareerAdminClick?.(e);
                }}
              >
                <span className="workspace-menu-icon" aria-hidden="true">AD</span>
                <span>Career Admin</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mobile-nav-actions">
          <LanguageSwitcher compact />
        </div>
        <button
          className="ham"
          type="button"
          id="hamBtn"
          aria-label={t("nav.openMenu")}
          onClick={onMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}

export default memo(Navbar);
