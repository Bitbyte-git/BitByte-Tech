import { useMemo, useRef, useState } from "react";
import { openPositions } from "./CareersPage.jsx";

const ABOUT_MAX_LENGTH = 250;
const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
const initialValues = {
  name: "",
  email: "",
  phone: "",
  about: "",
};

function getCareerApplyApiUrl() {
  return (import.meta.env.VITE_CAREER_APPLY_API_URL || "/api/career-apply").trim();
}

function getInitialPosition() {
  const params = new URLSearchParams(window.location.search);
  const requestedPosition = params.get("position") || "";
  const validPosition = openPositions.find((role) => role.title === requestedPosition);
  return validPosition?.title || openPositions[0]?.title || "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone) {
  return /^\+?[0-9\s()-]{7,18}$/.test(phone.trim());
}

function isAllowedResume(file) {
  const fileName = file.name.toLowerCase();
  return (
    ALLOWED_RESUME_TYPES.includes(file.type) &&
    ALLOWED_RESUME_EXTENSIONS.some((extension) => fileName.endsWith(extension))
  );
}

export default function CareerApplyPage() {
  const fileInputRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [position, setPosition] = useState(getInitialPosition);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const selectedRole = useMemo(
    () => openPositions.find((role) => role.title === position),
    [position],
  );

  const validate = () => {
    const nextErrors = {};

    if (!values.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!isValidPhone(values.phone)) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!position) nextErrors.position = "Please select the position.";
    if (!resume) {
      nextErrors.resume = "Please upload your resume.";
    } else if (!isAllowedResume(resume)) {
      nextErrors.resume = "Resume must be PDF, DOC, or DOCX.";
    } else if (resume.size > MAX_RESUME_SIZE) {
      nextErrors.resume = "Resume must be less than 5 MB.";
    }

    if (!values.about.trim()) {
      nextErrors.about = "Please tell us briefly about yourself.";
    } else if (values.about.length > ABOUT_MAX_LENGTH) {
      nextErrors.about = `About Yourself must be under ${ABOUT_MAX_LENGTH} characters.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: name === "about" ? value.slice(0, ABOUT_MAX_LENGTH) : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null;
    setResume(file);
    setErrors((current) => ({ ...current, resume: "" }));
  };

  const removeResume = () => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");

    if (status === "submitting" || !validate()) return;

    const formData = new FormData();
    formData.append("name", values.name.trim());
    formData.append("email", values.email.trim());
    formData.append("phone", values.phone.trim());
    formData.append("position", position);
    formData.append("about", values.about.trim());
    formData.append("resume", resume);

    setStatus("submitting");

    try {
      const response = await fetch(getCareerApplyApiUrl(), {
        method: "POST",
        body: formData,
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || payload.success !== true) {
        throw new Error(payload.message || "Unable to submit application.");
      }

      setValues(initialValues);
      removeResume();
      setErrors({});
      setStatus("success");
      setStatusMessage("Application submitted successfully.");
      setTrackingId(payload.trackingId || "");
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong. We couldn't submit your application right now. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <main className="career-apply-page wrap">
        <section className="career-apply-success reveal">
          <div className="career-resume-icon">
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
          </div>
          <h1>Application Submitted</h1>
          <p>
            Thank you for applying to Bit Byte Technologies. Your application has
            been successfully received. Our team will review your profile and
            contact you if your application is shortlisted.
          </p>
          <div className="career-apply-success-actions">
            {trackingId && (
              <div className="career-tracking-success" aria-label="Application tracking ID">
                <span>Tracking ID</span>
                <strong>{trackingId}</strong>
              </div>
            )}
            <a href="/careers" className="career-resume-button" title="Back to careers">
              Back to Careers
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="career-apply-page wrap">
      <section className="career-apply-panel reveal">
        <div className="career-apply-copy">
          <span className="career-pill">Career Application</span>
          <h1>Apply to Bit Byte Technologies</h1>
          <p>
            Share your details and resume. We will review your profile carefully
            and reach out if your application matches an open opportunity.
          </p>
          {selectedRole && (
            <div className="career-apply-role-card">
              <i className={selectedRole.icon} aria-hidden="true" />
              <div>
                <strong>{selectedRole.title}</strong>
                <span>
                  {selectedRole.type} | {selectedRole.mode}
                </span>
              </div>
            </div>
          )}
        </div>

        <form className="contact-form whatsapp-contact-form career-apply-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <CareerField id="careerName" label="Full Name" error={errors.name}>
              <input
                id="careerName"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter full name"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
              />
            </CareerField>

            <CareerField id="careerEmail" label="Email" error={errors.email}>
              <input
                id="careerEmail"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter email address"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
              />
            </CareerField>
          </div>

          <div className="form-row">
            <CareerField id="careerPhone" label="Phone Number" error={errors.phone}>
              <input
                id="careerPhone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                required
                aria-invalid={Boolean(errors.phone)}
              />
            </CareerField>

            <CareerField id="careerPosition" label="Position Applying For" error={errors.position}>
              <select
                id="careerPosition"
                value={position}
                onChange={(event) => {
                  setPosition(event.target.value);
                  setErrors((current) => ({ ...current, position: "" }));
                }}
                required
                aria-invalid={Boolean(errors.position)}
              >
                {openPositions.map((role) => (
                  <option value={role.title} key={role.title}>
                    {role.title}
                  </option>
                ))}
              </select>
            </CareerField>
          </div>

          <CareerField id="careerResume" label="Resume" error={errors.resume}>
            <div className="career-file-field">
              <input
                id="careerResume"
                ref={fileInputRef}
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleResumeChange}
                required={!resume}
                aria-invalid={Boolean(errors.resume)}
              />
              <span>{resume ? resume.name : "Upload PDF, DOC, or DOCX under 5 MB"}</span>
              {resume && (
                <button type="button" onClick={removeResume}>
                  Remove
                </button>
              )}
            </div>
          </CareerField>

          <CareerField id="careerAbout" label="About Yourself" error={errors.about}>
            <textarea
              id="careerAbout"
              name="about"
              value={values.about}
              onChange={handleChange}
              placeholder="Tell us briefly about yourself, your skills, experience, and why you would like to join Bit Byte Technologies..."
              maxLength={ABOUT_MAX_LENGTH}
              required
              aria-invalid={Boolean(errors.about)}
            />
            <div className="career-char-count">
              {values.about.length}/{ABOUT_MAX_LENGTH} characters
            </div>
          </CareerField>

          <p className="career-privacy-note">
            By submitting this application, you agree that Bit Byte Technologies
            may use the information provided to evaluate your application and
            contact you regarding employment opportunities.
          </p>

          <button
            className={`btn-submit whatsapp-submit is-${status}`}
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
          >
            <span className="btn-submit-state">
              {status === "submitting" ? (
                <span className="signal-loader" aria-hidden="true" />
              ) : (
                <i className="fa-solid fa-paper-plane" aria-hidden="true" />
              )}
              <span>{status === "submitting" ? "Submitting..." : "Submit Application"}</span>
            </span>
          </button>

          {statusMessage && (
            <div className={`form-status is-${status === "error" ? "blocked" : "success"}`} role="status">
              <i
                className={
                  status === "error"
                    ? "fa-solid fa-triangle-exclamation"
                    : "fa-solid fa-circle-check"
                }
                aria-hidden="true"
              />
              <span>{statusMessage}</span>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

function CareerField({ id, label, error, children }) {
  return (
    <div className="fgroup">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="field-error" id={`${id}Error`}>
          {error}
        </span>
      )}
    </div>
  );
}
