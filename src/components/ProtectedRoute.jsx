import { useEffect, useMemo, useRef, useState } from "react";
import {
  getProtectedDestination,
  hasAccess,
  revokeAccess,
  revokeAllAccess,
} from "./workspaceAccess";

const normalizeRedirectUrl = (url) => {
  const trimmedUrl = String(url || "").trim();
  if (!trimmedUrl) return "/";
  if (/^[a-z][a-z\d+\-.]*:\/\//i.test(trimmedUrl)) return trimmedUrl;
  return `https://${trimmedUrl.replace(/^\/+/, "")}`;
};

export default function ProtectedRoute({
  destination,
  onRequireAccess,
  onNavigateHome,
  children,
}) {
  const config = getProtectedDestination(destination);
  const [authorized, setAuthorized] = useState(null);
  const openedRef = useRef(false);
  const redirectUrl = useMemo(
    () => normalizeRedirectUrl(config?.redirectUrl),
    [config?.redirectUrl],
  );

  useEffect(() => {
    openedRef.current = false;
    setAuthorized(null);
  }, [destination]);

  useEffect(() => {
    if (!config) {
      setAuthorized(false);
      return;
    }

    if (!hasAccess(destination)) {
      setAuthorized(false);
      onRequireAccess?.(destination);
      return;
    }

    setAuthorized(true);
  }, [config, destination, onRequireAccess]);

  useEffect(() => {
    if (!authorized || !config || config.internalRoute || openedRef.current) {
      return undefined;
    }

    openedRef.current = true;
    const timeout = window.setTimeout(() => {
      if (config.openInNewTab) {
        window.open(redirectUrl, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = redirectUrl;
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [authorized, config, redirectUrl]);

  if (authorized !== true || !config) {
    return (
      <main className="workspace-access-page wrap">
        <section className="workspace-access-card">
          <div className="workspace-access-spinner" aria-hidden="true" />
          <p className="workspace-access-kicker">Checking Access</p>
          <h1>Secure Workspace</h1>
        </section>
      </main>
    );
  }

  const lockCurrent = () => {
    revokeAccess(destination);
    onRequireAccess?.(destination);
  };

  const lockAll = () => {
    revokeAllAccess();
    onRequireAccess?.(destination);
  };

  if (config.internalRoute) {
    return children;
  }

  return (
    <main className="workspace-access-page wrap">
      <section className="workspace-access-card" aria-labelledby="workspace-launch-title">
        <div className="workspace-access-lock workspace-access-lock-success" aria-hidden="true">
          <i className="fa-solid fa-unlock-keyhole" />
        </div>
        <p className="workspace-access-kicker">Access Granted</p>
        <h1 id="workspace-launch-title">{config.label}</h1>
        <p className="workspace-access-copy">
          {config.openInNewTab
            ? `${config.label} is opening in a fresh tab.`
            : `Redirecting to ${config.label}.`}
        </p>
        <div className="workspace-access-actions workspace-access-actions-grid">
          <button
            type="button"
            className="workspace-access-primary"
            onClick={() => window.open(redirectUrl, "_blank", "noopener,noreferrer")}
          >
            Open Again
          </button>
          <button type="button" onClick={lockCurrent}>
            Lock {config.label}
          </button>
          <button type="button" onClick={lockAll}>
            Lock All
          </button>
          <button type="button" onClick={onNavigateHome}>
            Back Home
          </button>
        </div>
        <p className="workspace-access-note">
          This frontend-only gate is not real security. Use backend or
          serverless validation before exposing private production content.
        </p>
      </section>
    </main>
  );
}
