import { services, socialIcons } from "../constants";
import { useTranslation } from "../i18n";
import Logo from "./Logo";
import VisitorCounter from "./VisitorCounter";

export default function Footer({ rootLinks = false }) {
  const { t } = useTranslation();
  const footerColumns = [
    [
      "Services",
      [
        "web-app-development",
        "personal-branding",
        "digital-marketing",
        "business-analytics",
        "imagination-to-reality",
        "real-time-sales-data",
      ],
    ],
    ["Company", ["About Us", "Careers", "Contact Us"]],
    [
      "Contact",
      [
        "BitByte Technologies 2nd Floor, Raja Complex West Wing, Opp: Sago Serve, Omalur Main Road, Salem-636302, Tamil Nadu, India.",
        "GST No: 33BLNPN5359J1ZL",
        "Udyam No: UDYAM-TN-20-0234773",
        "reachus@bitbytetech.org",
        "+91 99437 43136 (Only Whatsapp) ",
        "Privacy Policy",
        "Terms & Conditions",
      ],
    ],
  ];

  const hrefs = {
    LinkedIn: "https://www.linkedin.com/in/bit-byte-technologies-4aa820406/",
    X: "https://x.com/BitbyteReachus",
    Instagram: "https://www.instagram.com/bit_byte.technologies/",
    Facebook: "https://www.facebook.com/profile.php?id=61588964114749",
    YouTube: "https://www.youtube.com/@BitByteTechnologies",
  };

  const hrefFor = (item) => {
    const map = {
      "About Us": "#founder",

      Careers: "/careers",

      Contact: "#contact",
      "web-app-development": "/services/web-development",
      "personal-branding": "/services/personal-branding",
      "digital-marketing":
        "/services/digital-marketing/ai-powered-digital-marketing-solutions",
      "business-analytics":
        "/services/business-analytics/data-driven-business-analytics-solutions",
      "imagination-to-reality": "/services/imagination-to-reality",
      "real-time-sales-data": "/services/real-time-sales-data",
      "Privacy Policy": "/privacy-policy",
      "Terms & Conditions": "/terms-and-conditions",
    };
    const href = map[item] || "#contact";
    if (href.startsWith("/")) return href;
    return rootLinks ? `/${href}` : href;
  };

  return (
    <footer className="wrap">
      <div className="footer-top">
        <div className="footer-brand">
          <a
            href={hrefFor("#hero")}
            className="logo-wrap"
            style={{ display: "inline-flex" }}
            aria-label="Bit Byte Technologies home"
          >
            <Logo height={64} loading="lazy" fetchPriority="low" />
            <div className="footer-logo-txt">
              <em>Bit Byte</em>
              <p>Technologies</p>
            </div>
          </a>
          <p data-magnify="true">{t("footer.brand")}</p>
          <div className="social-row" style={{ marginTop: 20 }}>
            {socialIcons.map(([label, icon]) => (
              <a
                href={hrefs[label] || "#"}
                className="soc-btn"
                aria-label={label}
                key={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={icon} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <VisitorCounter />
          </div>
        </div>
        {footerColumns.map(([title, links]) => (
          <div key={title}>
            <div className="footer-col-title">{title}</div>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={link}>
                  <a href={hrefFor(link)} title="Open link">
                    {services.some((service) => service.id === link)
                      ? t(`services.cards.${link}.title`)
                      : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} <span> Bit Byte Technologies </span>All
          rights reserved. Designed, Developed and Maintained by Bit Byte
          Technologies. Core Developers : {" "}
            <a
            style={{ color: "#a4ec70" }}
            href="https://www.linkedin.com/in/roshini-govindaraj-233941331?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
           title="Open linkedin.com">
            Roshini G & {" "}
          </a>

          <a
            style={{ color: "#a4ec70" }}
            href="https://www.linkedin.com/in/selvaperumal-g-9656b32a1?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
           title="Open linkedin.com">
              Selvaperumal G 
           
          </a>
        </div>
      </div>
    </footer>
  );
}
