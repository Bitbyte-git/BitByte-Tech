import { useEffect, useState } from "react";
import {
  getProtectedDestination,
  grantAccess,
  revokeAccess,
  revokeAllAccess,
} from "../accessControl";
import "./hrms-popup.css";

const MAX_ATTEMPTS = 3;

const normalizeRedirectUrl = (url) => {
  const trimmedUrl = String(url || "").trim();
  if (!trimmedUrl) return "/";
  if (trimmedUrl.startsWith("/")) return trimmedUrl;
  if (/^[a-z][a-z\d+\-.]*:\/\//i.test(trimmedUrl)) return trimmedUrl;
  return `https://${trimmedUrl.replace(/^\/+/, "")}`;
};

export default function HRMSAccessPopup({
  destination = "hrms",
  isOpen,
  onClose,
  onSuccess,
  embedded = false,
}) {
  const config = getProtectedDestination(destination);
  const [accessKey, setAccessKey] = useState("");
  const [status, setStatus] = useState("idle");
  const [attempts, setAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAccessKey("");
      setStatus("idle");
      setAttempts(0);
      setErrorMessage("");
    }
  }, [isOpen, destination]);

  if (!isOpen || !config) return null;

  const redirectToDestination = () => {
    const destinationUrl = normalizeRedirectUrl(config.redirectUrl || config.route);

    if (destinationUrl.startsWith("/")) {
      window.location.href = destinationUrl;
    } else {
      window.location.href = destinationUrl;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === "verifying" || status === "success" || status === "blocked") {
      return;
    }

    const submittedCode = accessKey.trim();
    if (!submittedCode) {
      setErrorMessage("Please enter the secret code.");
      return;
    }

    setErrorMessage("");
    setStatus("verifying");

    window.setTimeout(() => {
      if (submittedCode === config.code) {
        grantAccess(destination);
        setStatus("success");
        window.setTimeout(() => {
          onSuccess?.(destination);
          redirectToDestination();
          onClose?.();
        }, 700);
        return;
      }

      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setErrorMessage("Incorrect code for this destination.");
      setStatus(nextAttempts >= MAX_ATTEMPTS ? "blocked" : "denied");
    }, 500);
  };

  const handleTryAgain = () => {
    setAccessKey("");
    setStatus("idle");
    setErrorMessage("");
  };

  const handleClose = () => {
    if (embedded) return;
    if (status !== "verifying" && status !== "success") {
      onClose?.();
    }
  };

  const handleRevokeCurrent = () => {
    revokeAccess(destination);
    setAccessKey("");
    setStatus("idle");
    setErrorMessage(`${config.name} access has been locked.`);
  };

  const handleRevokeAll = () => {
    revokeAllAccess();
    setAccessKey("");
    setStatus("idle");
    setErrorMessage("All workspace access has been locked.");
  };

  const content = (
    <div className="hrms-popup-content" onClick={(event) => event.stopPropagation()}>
      {status === "idle" || status === "verifying" ? (
        <div className="hrms-popup-state hrms-popup-idle">
          <div className="hrms-popup-header">
            <h3>{config.title}</h3>
            <p>{config.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="hrms-popup-body">
            <p className="hrms-instruction">
              Enter the secret code for
              <br />
              <strong>{config.name}</strong>
            </p>

            <div className="hrms-input-group">
              <input
                type="password"
                placeholder="Enter Secret Code"
                value={accessKey}
                onChange={(event) => {
                  setAccessKey(event.target.value);
                  setErrorMessage("");
                }}
                disabled={status === "verifying"}
                autoFocus
              />
            </div>

            {errorMessage && <p className="hrms-error-message">{errorMessage}</p>}

            <button
              type="submit"
              className={`btn-hrms-submit ${status === "verifying" ? "verifying" : ""}`}
              disabled={status === "verifying"}
            >
              {status === "verifying" ? "Verifying..." : "Verify Access"}
            </button>
          </form>

          <div className="hrms-popup-footer">
            <p>
              Frontend-only access prevents accidental access, but it is not
              real security.
            </p>
          </div>
        </div>
      ) : status === "success" ? (
        <div className="hrms-popup-state hrms-popup-success">
          <div className="hrms-status-icon success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3>Verified</h3>
          <h2 className="success-text">Access Granted!</h2>
          <p>
            Redirecting to {config.name}
            <br />
            destination...
          </p>
          <div className="hrms-spinner" />
        </div>
      ) : status === "denied" ? (
        <div className="hrms-popup-state hrms-popup-denied">
          <div className="hrms-status-icon error-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <h2 className="error-text">Access Denied</h2>
          <h3>Invalid {config.name} Code</h3>
          <p>{errorMessage}</p>
          <button type="button" className="btn-hrms-action" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      ) : (
        <div className="hrms-popup-state hrms-popup-blocked">
          <div className="hrms-status-icon error-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="error-text">Access Blocked</h2>
          <h3>Too many failed attempts.</h3>
          <p>Refresh the page and enter the correct {config.name} code.</p>
          <button type="button" className="btn-hrms-action" onClick={handleClose}>
            Go Back
          </button>
        </div>
      )}

      <div className="hrms-revoke-row">
        <button type="button" onClick={handleRevokeCurrent}>
          Lock {config.name}
        </button>
        <button type="button" onClick={handleRevokeAll}>
          Lock All
        </button>
      </div>
    </div>
  );

  if (embedded) {
    return <div className="hrms-access-page">{content}</div>;
  }

  return (
    <div className="hrms-popup-overlay" onClick={handleClose}>
      {content}
    </div>
  );
}
