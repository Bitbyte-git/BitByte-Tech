import { useCallback, useEffect, useMemo, useState } from "react";

const ADMIN_SESSION_KEY = "careerAdminToken";

function getCareerAdminApiUrl() {
  return (
    import.meta.env.VITE_CAREER_ADMIN_API_URL || "/api/career-applications"
  ).trim();
}

function getCareerResumeApiUrl() {
  return (
    import.meta.env.VITE_CAREER_RESUME_API_URL || "/api/career-resume"
  ).trim();
}

function formatDate(value) {
  if (!value) return "Not available";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return "Not available";
  }
}

function safeDownloadName(fileName) {
  return String(fileName || "resume")
    .replace(/[^\w.\- ]+/g, "")
    .trim() || "resume";
}

export default function CareerAdminPage() {
  const [token, setToken] = useState(
    () => window.sessionStorage.getItem(ADMIN_SESSION_KEY) || "",
  );
  const [secretInput, setSecretInput] = useState("");
  const [applications, setApplications] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [status, setStatus] = useState(token ? "loading" : "idle");
  const [message, setMessage] = useState("");
  const [downloadingId, setDownloadingId] = useState("");

  const applicationCountLabel = useMemo(() => {
    if (applications.length === 1) return "1 application";
    return `${applications.length} applications`;
  }, [applications.length]);

  const loadApplications = useCallback(async (accessToken) => {
    setStatus("loading");
    setMessage("");

    const response = await fetch(getCareerAdminApiUrl(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok || payload.success !== true) {
      throw new Error(payload.message || "Unable to verify admin access.");
    }

    setApplications(Array.isArray(payload.applications) ? payload.applications : []);
    setAuthorized(true);
    setStatus("idle");
  }, []);

  useEffect(() => {
    if (!token) return;

    loadApplications(token).catch((error) => {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
      setToken("");
      setAuthorized(false);
      setApplications([]);
      setStatus("error");
      setMessage(error.message || "Admin session expired. Please enter the secret key again.");
    });
  }, [loadApplications, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextToken = secretInput.trim();

    if (!nextToken) {
      setStatus("error");
      setMessage("Please enter the admin secret key.");
      return;
    }

    try {
      await loadApplications(nextToken);
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, nextToken);
      setToken(nextToken);
      setSecretInput("");
    } catch (error) {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
      setToken("");
      setAuthorized(false);
      setApplications([]);
      setStatus("error");
      setMessage(error.message || "Invalid admin secret key.");
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setToken("");
    setSecretInput("");
    setApplications([]);
    setAuthorized(false);
    setStatus("idle");
    setMessage("");
  };

  const handleRefresh = () => {
    loadApplications(token).catch((error) => {
      setStatus("error");
      setMessage(error.message || "Unable to refresh applications.");
    });
  };

  const handleDownload = async (application) => {
    if (!application.resumeFileId || !token) return;

    setDownloadingId(application.id);
    setMessage("");

    try {
      const apiUrl = new URL(getCareerResumeApiUrl(), window.location.origin);
      apiUrl.searchParams.set("id", application.resumeFileId);

      const response = await fetch(apiUrl.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || "Unable to download resume.");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = safeDownloadName(application.resumeFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Unable to download resume.");
    } finally {
      setDownloadingId("");
    }
  };

  if (!authorized) {
    return (
      <main className="career-admin-page wrap">
        <section className="career-admin-login reveal">
          <div className="career-admin-badge">
            <i className="fa-solid fa-user-shield" aria-hidden="true" />
          </div>
          <span className="career-pill">BB Workspace</span>
          <h1>Career Admin</h1>
          <p>Enter the admin secret key to view career applications and resumes.</p>

          <form className="career-admin-form" onSubmit={handleSubmit}>
            <div className="fgroup">
              <label htmlFor="careerAdminSecret">Admin Secret Key</label>
              <input
                id="careerAdminSecret"
                type="password"
                value={secretInput}
                onChange={(event) => {
                  setSecretInput(event.target.value);
                  setMessage("");
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter secret key"
                autoComplete="current-password"
                aria-invalid={status === "error"}
              />
            </div>

            <button
              className={`btn-submit whatsapp-submit is-${status}`}
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
            >
              <span className="btn-submit-state">
                {status === "loading" ? (
                  <span className="signal-loader" aria-hidden="true" />
                ) : (
                  <i className="fa-solid fa-unlock-keyhole" aria-hidden="true" />
                )}
                <span>{status === "loading" ? "Verifying..." : "Verify Access"}</span>
              </span>
            </button>
          </form>

          {message && (
            <div className="form-status is-blocked" role="status">
              <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
              <span>{message}</span>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="career-admin-page wrap">
      <section className="career-admin-panel reveal">
        <div className="career-admin-toolbar">
          <div>
            <span className="career-pill">Career Admin</span>
            <h1>Applications</h1>
            <p>{applicationCountLabel} stored in MongoDB.</p>
          </div>
          <div className="career-admin-toolbar-actions">
            <button type="button" className="career-outline-link" onClick={handleRefresh}>
              <i className="fa-solid fa-rotate-right" aria-hidden="true" />
              Refresh
            </button>
            <button type="button" className="career-outline-link" onClick={handleLogout}>
              <i className="fa-solid fa-lock" aria-hidden="true" />
              Lock Admin
            </button>
          </div>
        </div>

        {message && (
          <div className="form-status is-blocked" role="status">
            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
            <span>{message}</span>
          </div>
        )}

        {status === "loading" ? (
          <div className="career-admin-empty">
            <span className="signal-loader" aria-hidden="true" />
            <p>Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="career-admin-empty">
            <i className="fa-solid fa-inbox" aria-hidden="true" />
            <p>No career applications found yet.</p>
          </div>
        ) : (
          <div className="career-admin-list">
            {applications.map((application) => (
              <article className="career-admin-card" key={application.id}>
                <div className="career-admin-card-head">
                  <div>
                    <h2>{application.name}</h2>
                    <span>{application.position}</span>
                  </div>
                  <time dateTime={application.submittedAt || undefined}>
                    {formatDate(application.submittedAt)}
                  </time>
                </div>

                <div className="career-admin-meta">
                  <a href={`mailto:${application.email}`} title={`Email ${application.name}`}>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    {application.email}
                  </a>
                  <a href={`tel:${application.phone}`} title={`Call ${application.name}`}>
                    <i className="fa-solid fa-phone" aria-hidden="true" />
                    {application.phone}
                  </a>
                </div>

                <p className="career-admin-about">{application.about}</p>

                <div className="career-admin-actions">
                  <span>
                    <i className="fa-solid fa-file-lines" aria-hidden="true" />
                    {application.resumeFileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownload(application)}
                    disabled={downloadingId === application.id || !application.resumeFileId}
                  >
                    {downloadingId === application.id ? "Downloading..." : "Download Resume"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
