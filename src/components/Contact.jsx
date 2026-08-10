import { socialIcons } from "../constants";
import { useTranslation } from "../i18n";
import WhatsAppEnquiryForm from "./WhatsAppEnquiryForm.jsx";

export default function Contact() {
  const { t } = useTranslation();
  const hrefs = {
    LinkedIn: "https://www.linkedin.com/in/bit-byte-technologies-4aa820406/",
    X: "https://x.com/BitbyteReachus",
    Instagram: "https://www.instagram.com/bit_byte.technologies/",
    Facebook: "https://www.facebook.com/",
    YouTube: "https://www.youtube.com/",
  };
  const contactDetails = [
    ["📧", "Email", "reachus@bitbytetech.org"],
    ["📞", "Phone", "+91 99437 43136 (Only Whatsapp)"],
    [
      "📍",
      "Address",
      "BitByte Technologies 2nd Floor, Raja Complex West Wing, Opp: Sago Serve, Omalur Main Road, Salem-636302, Tamil Nadu, India.",
    ],
  ];

  return (
    <section id="contact" className="section wrap">
      <div className="contact-info">
        <div className="eyebrow reveal" data-magnify="true">
          {t("contact.eyebrow")}
        </div>
        <h2 className="sec-title reveal reveal-delay-1" data-magnify="true">
          {t("contact.titleA")}
          <br />
          <span className="c">{t("contact.titleB")}</span>
        </h2>
        <p className="sec-sub reveal reveal-delay-2" data-magnify="true">
          {t("contact.body")}
        </p>
        {contactDetails.map(([cIcon, label, value]) => (
          <div className="cinfo-item reveal reveal-delay-3" key={label}>
            <div className="cinfo-icon">{cIcon}</div>
            <div>
              <div className="cinfo-lbl">{label}</div>
              <div className="cinfo-val">{value}</div>
            </div>
          </div>
        ))}
        <div className="social-row reveal reveal-delay-4">
          {socialIcons.map(([label, sIcon]) => (
            <a
              href={hrefs[label] || "#"}
              className="soc-btn"
              title={label}
              aria-label={label}
              key={label}
            >
              <i className={sIcon} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="map-box reveal reveal-delay-5">
          <iframe
            title="Bit Byte Technologies location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.1139518978525!2d78.1178335758675!3d11.686335888523226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1fe74e97585%3A0x2f223655340fd0b7!2sBit%20Byte%20Technologies!5e0!3m2!1sen!2sin!4v1782970071985!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <WhatsAppEnquiryForm />
    </section>
  );
}
