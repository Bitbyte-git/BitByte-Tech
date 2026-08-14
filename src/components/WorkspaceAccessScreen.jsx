import { useEffect, useRef, useState } from "react";
import {
  getProtectedDestination,
  grantAccess,
  hasAccess,
} from "./workspaceAccess";

export default function WorkspaceAccessScreen({
  destination,
  onAuthorized,
}) {
  const config = getProtectedDestination(destination);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const inputRef = useRef(null);

  useEffect(() => {
    setAccessCode("");
    setError("");
    setStatus("idle");
    if (hasAccess(destination)) {
      onAuthorized?.(destination);
      return;
    }
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [destination, onAuthorized]);

  if (!config) {
    return (
      <main className="workspace-access-page wrap">
        <section className="workspace-access-card">
          <p className="workspace-access-kicker">Secure Access</p>
          <h1>Unknown Destination</h1>
          <p className="workspace-access-copy">
            The requested workspace destination is not available.
          </p>
        </section>
      </main>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredCode = accessCode.trim();

    if (!enteredCode) {
      setError("Please enter the secret code.");
      return;
    }

    setStatus("verifying");
    setError("");

    window.setTimeout(() => {
      if (enteredCode === config.code) {
        grantAccess(destination);
        setStatus("success");
        window.setTimeout(() => onAuthorized?.(destination), 450);
        return;
      }

      setStatus("idle");
      setError(`Incorrect code for ${config.label}.`);
      setAccessCode("");
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }, 450);
  };

  return (
    <main className="workspace-access-page wrap">
      <section
        className={`workspace-access-card workspace-access-card-${status}`}
        aria-labelledby="workspace-access-title"
      >
        <span className="workspace-access-scanline" aria-hidden="true" />
        <div className="workspace-access-lock" aria-hidden="true">
          <span />
          <span />
          <i className="fa-solid fa-lock" />
        </div>
        <p className="workspace-access-kicker">Secure Workspace</p>
        <h1 id="workspace-access-title">{config.label}</h1>
        <p className="workspace-access-copy">
          Enter the secret code to continue to {config.label}.
        </p>

        <form className="workspace-access-form" onSubmit={handleSubmit}>
          <label htmlFor="workspace-access-code">Secret Code</label>
          <div className="workspace-access-input-shell">
            <i className="fa-solid fa-key" aria-hidden="true" />
            <input
              ref={inputRef}
              id="workspace-access-code"
              type="password"
              value={accessCode}
              onChange={(event) => {
                setAccessCode(event.target.value);
                if (error) setError("");
              }}
              placeholder="Enter secret code"
              disabled={status === "verifying" || status === "success"}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "workspace-access-error" : undefined}
              autoComplete="off"
            />
            <span className="workspace-access-input-pulse" aria-hidden="true" />
          </div>
          {error ? (
            <p className="workspace-access-error" id="workspace-access-error">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="workspace-access-submit"
            disabled={status === "verifying" || status === "success"}
          >
            {status === "verifying"
              ? "Verifying..."
              : status === "success"
                ? "Access Granted"
                : "Verify Access"}
          </button>
        </form>

        <p className="workspace-access-note">
          Frontend-only access prevents accidental entry, but production
          protection needs backend or serverless validation.
        </p>
      </section>
    </main>
  );
}
