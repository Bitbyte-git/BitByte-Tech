import { memo } from "react";
import { navLinks, services } from "../constants";
import { useTranslation } from "../i18n";

function MobileMenu({
  activeSection = "home",
  open,
  onClose,
  onNavClick,
  onServiceSelect,
  rootLinks = false,
}) {
  const { t } = useTranslation();

  const hrefFor = (href) => {
    if (href.startsWith("/")) return href;
    return rootLinks ? `/${href}` : href;
  };

  const handleLinkClick = (event, href, key) => {
    onNavClick?.(event, href, key);
    onClose();
  };

  const handleServiceClick = (event, serviceId) => {
    onServiceSelect?.(event, serviceId);
    onClose();
  };

  return (
    <div className={`mob-menu ${open ? "open" : ""}`} id="mobMenu">
      <button
        className="mob-close"
        type="button"
        aria-label={t("nav.closeMenu")}
        onClick={onClose}
      >
        <i className="fas fa-times" aria-hidden="true" />
      </button>
      {navLinks.map(({ href, key, label }) => (
        <div className="mob-link-group" key={href}>
          <a
            href={hrefFor(href)}
            className={activeSection === key ? "active" : ""}
            onClick={(event) => handleLinkClick(event, href, key)}
          >
            {t(`nav.${key}`, label)}
          </a>
          {key === "services" && (
            <div className="mob-service-links">
              {services.map((service) => (
                <a
                  href={hrefFor(service.route)}
                  key={service.id}
                  onClick={(event) => {
                    if (!service.route.startsWith("/")) {
                      handleServiceClick(event, service.id);
                    } else {
                      onClose();
                    }
                  }}
                >
                  {t(`services.cards.${service.id}.title`, service.title)}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
      <a
        href={hrefFor("#contact")}
        className="btn-glow"
        style={{ marginTop: 10 }}
        onClick={(event) => handleLinkClick(event, "#contact", "contact")}
      >
        {t("nav.getStarted")}
      </a>
    </div>
  );
}

export default memo(MobileMenu);
