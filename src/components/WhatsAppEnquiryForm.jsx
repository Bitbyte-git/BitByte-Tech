import { useEffect, useRef, useState } from "react";
import { services } from "../constants";
import { useTranslation } from "../i18n";

const BITBYTE_WHATSAPP_NUMBER = "919943743136";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  reference: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function normalizePhone(phone) {
  return phone.replace(/\D/g, "");
}

function buildWhatsAppMessage(values) {
  return `🚀 New Project Enquiry

👤 Name:
${values.name.trim()}

📧 Email:
${values.email.trim()}

📱 Phone:
${normalizePhone(values.phone)}

💼 Service:
${values.service}

🔗 Reference:
${values.reference.trim()}

📝 Message:
${values.message.trim()}`;
}

function validateForm(values) {
  const nextErrors = {};
  const phoneDigits = normalizePhone(values.phone);
  const hasInvalidPhoneCharacters = /[^\d\s()+-]/.test(values.phone);

  if (!values.name.trim()) {
    nextErrors.name = "Name is required";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Email is required";
  } else if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = "Enter a valid email address";
  }

  if (!values.phone.trim()) {
    nextErrors.phone = "Phone number is required";
  } else if (
    hasInvalidPhoneCharacters ||
    phoneDigits.length < 10 ||
    phoneDigits.length > 15
  ) {
    nextErrors.phone = "Enter a valid phone number";
  }

  if (!values.service) {
    nextErrors.service = "Choose a service";
  }

  if (!values.reference.trim()) {
    nextErrors.reference = "Reference is required";
  }

  if (!values.message.trim()) {
    nextErrors.message = "Message is required";
  }

  return nextErrors;
}

export default function WhatsAppEnquiryForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState("idle");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const loadingTimeoutRef = useRef(0);
  const statusTimeoutRef = useRef(0);

  const hasErrors = Object.keys(errors).length > 0;
  const isLoading = submitState === "loading";

  function handleChange(event) {
    const { name, value } = event.target;

    if (!Object.prototype.hasOwnProperty.call(values, name)) return;

    const nextValues = {
      ...values,
      [name]: value,
    };

    setValues(nextValues);

    if (errors[name]) {
      setErrors(validateForm(nextValues));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    window.clearTimeout(loadingTimeoutRef.current);
    window.clearTimeout(statusTimeoutRef.current);

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setFallbackUrl("");

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      return;
    }

    const message = buildWhatsAppMessage(values);
    const whatsappUrl = `https://wa.me/${BITBYTE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setSubmitState("loading");

    loadingTimeoutRef.current = window.setTimeout(() => {
      const whatsappWindow = window.open(whatsappUrl, "_blank");

      if (whatsappWindow) {
        try {
          whatsappWindow.opener = null;
        } catch {
          // Some browsers lock the opened WhatsApp window before this assignment.
        }

        setSubmitState("success");
      } else {
        setFallbackUrl(whatsappUrl);
        setSubmitState("blocked");
      }

      statusTimeoutRef.current = window.setTimeout(() => {
        setSubmitState("idle");
        setFallbackUrl("");
      }, 5200);
    }, 780);
  }

  useEffect(
    () => () => {
      window.clearTimeout(loadingTimeoutRef.current);
      window.clearTimeout(statusTimeoutRef.current);
    },
    [],
  );

  const statusMessage = {
    idle: hasErrors
      ? "Complete the highlighted fields to launch the connection."
      : "",
    loading: "Preparing your WhatsApp handoff...",
    success: "Connection launched. WhatsApp is ready in a new tab.",
    blocked: "Pop-up blocked. Use the direct WhatsApp launch below.",
  }[submitState];

  const buttonText = {
    idle: "Connect With BitByte",
    loading: "Initiating Signal",
    success: "Connection Launched",
    blocked: "Launch Again",
  }[submitState];

  return (
    <form
      id="contact-form"
      className="contact-form whatsapp-contact-form reveal reveal-delay-2"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="contact-form-header">
        <div className="eyebrow">
          {t("contact.formTitle", "Project Enquiry")}
        </div>
        <div className="connection-orbit" aria-hidden="true">
          <span />
          <i className="fab fa-whatsapp" />
        </div>
      </div>

      <div className="fgroup">
        <label htmlFor="enquiryName">{t("contact.name", "Name")}</label>
        <input
          id="enquiryName"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "enquiryNameError" : undefined}
        />
        {errors.name && (
          <span className="field-error" id="enquiryNameError">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="fgroup">
          <label htmlFor="enquiryEmail">{t("contact.email", "Email")}</label>
          <input
            id="enquiryEmail"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@company.com"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enquiryEmailError" : undefined}
          />
          {errors.email && (
            <span className="field-error" id="enquiryEmailError">
              {errors.email}
            </span>
          )}
        </div>

        <div className="fgroup">
          <label htmlFor="enquiryPhone">{t("contact.phone", "Phone")}</label>
          <input
            id="enquiryPhone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="919876543210"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "enquiryPhoneError" : undefined}
          />
          {errors.phone && (
            <span className="field-error" id="enquiryPhoneError">
              {errors.phone}
            </span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="fgroup">
          <label htmlFor="enquiryService">
            {t("contact.service", "Service")}
          </label>
          <select
            id="enquiryService"
            name="service"
            value={values.service}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? "enquiryServiceError" : undefined
            }
          >
            <option value="">
              {t("contact.select", "Select a service...")}
            </option>
            {services.map((service) => {
              const serviceTitle = t(
                `services.cards.${service.id}.title`,
                service.title,
              );

              return (
                <option value={serviceTitle} key={service.id}>
                  {serviceTitle}
                </option>
              );
            })}
            <option value={t("contact.other", "Other")}>
              {t("contact.other", "Other")}
            </option>
          </select>
          {errors.service && (
            <span className="field-error" id="enquiryServiceError">
              {errors.service}
            </span>
          )}
        </div>

        <div className="fgroup">
          <label htmlFor="enquiryReference">
            {t("contact.reference", "Reference")}
          </label>
          <input
            id="enquiryReference"
            name="reference"
            type="text"
            value={values.reference}
            onChange={handleChange}
            placeholder={t(
              "contact.referencePlaceholder",
              "Google, Instagram, friend...",
            )}
            autoComplete="off"
            required
            aria-invalid={Boolean(errors.reference)}
            aria-describedby={
              errors.reference ? "enquiryReferenceError" : undefined
            }
          />
          {errors.reference && (
            <span className="field-error" id="enquiryReferenceError">
              {errors.reference}
            </span>
          )}
        </div>
      </div>

      <div className="fgroup">
        <label htmlFor="enquiryMessage">
          {t("contact.message", "Message")}
        </label>
        <textarea
          id="enquiryMessage"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder={t(
            "contact.messagePlaceholder",
            "Tell us about your project...",
          )}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "enquiryMessageError" : undefined}
        />
        {errors.message && (
          <span className="field-error" id="enquiryMessageError">
            {errors.message}
          </span>
        )}
      </div>

      <button
        className={`btn-submit whatsapp-submit is-${submitState}`}
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        <span className="btn-submit-state">
          {isLoading ? (
            <span className="signal-loader" aria-hidden="true" />
          ) : (
            <i
              className={
                submitState === "success"
                  ? "fa-solid fa-circle-check"
                  : "fab fa-whatsapp"
              }
              aria-hidden="true"
            />
          )}
          <span>{buttonText}</span>
        </span>
      </button>

      {statusMessage && (
        <div
          className={`form-status is-${submitState}`}
          role="status"
          aria-live="polite"
        >
          <i
            className={
              submitState === "success"
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-satellite-dish"
            }
            aria-hidden="true"
          />
          <span>{statusMessage}</span>
        </div>
      )}

      {fallbackUrl && (
        <a
          className="whatsapp-fallback-link"
          href={fallbackUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open WhatsApp Directly
        </a>
      )}
    </form>
  );
}
