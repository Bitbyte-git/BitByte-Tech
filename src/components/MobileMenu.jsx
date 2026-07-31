import { memo, useState } from "react";
import { navLinks, services } from "../constants";
import { useTranslation } from "../i18n";

function MobileMenu({
  activeSection = "home",
  open,
  onClose,
  onNavClick,
  onServiceSelect,
  rootLinks = false,
  onHRMSClick,
  onBillingClick,
  onShowcaseClick,
}) {
  const { t } = useTranslation();
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

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

  const handleHRMSClick = () => {
    onHRMSClick?.();
    onClose();
  };

  const handleBillingClick = () => {
    onBillingClick?.();
    onClose();
  };

  const handleShowcaseClick = () => {
    onShowcaseClick?.();
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
      {navLinks.filter((link) => link.key !== "showcase").map(({ href, key, label }) => (
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
      <div className="mob-workspace-container" style={{ marginTop: 20, width: "100%" }}>
        <button
          type="button"
          className="btn-glow"
          style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          onClick={() => setWorkspaceOpen(!workspaceOpen)}
        >
          <span>BB Workspace</span>
          <i className={`fa-solid fa-chevron-${workspaceOpen ? "up" : "down"}`} aria-hidden="true" />
        </button>
        {workspaceOpen && (
          <div className="mob-workspace-dropdown" style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "12px 16px",
            background: "rgba(3, 15, 31, 0.6)",
            borderRadius: 8,
            border: "1px solid rgba(0, 180, 216, 0.1)"
          }}>
            <button
              type="button"
              onClick={handleShowcaseClick}
              style={{
                background: "transparent",
                border: "none",
                fontFamily: "var(--f-body)",
                fontSize: "15px",
                color: "var(--white80)",
                textAlign: "left",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer"
              }}
            >
              <i className="fa-solid fa-briefcase" style={{ color: "var(--teal)" }} aria-hidden="true" />
              Showcase
            </button>
            <button
              type="button"
              onClick={handleHRMSClick}
              style={{
                background: "transparent",
                border: "none",
                fontFamily: "var(--f-body)",
                fontSize: "15px",
                color: "var(--white80)",
                textAlign: "left",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer"
              }}
            >
              <i className="fa-solid fa-lock" style={{ color: "var(--teal)" }} aria-hidden="true" />
              HRMS Login
            </button>
            <button
              type="button"
              onClick={handleBillingClick}
              style={{
                background: "transparent",
                border: "none",
                fontFamily: "var(--f-body)",
                fontSize: "15px",
                color: "var(--white80)",
                textAlign: "left",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer"
              }}
            >
              <i className="fa-solid fa-file-invoice-dollar" style={{ color: "var(--teal)" }} aria-hidden="true" />
              Billing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(MobileMenu);
