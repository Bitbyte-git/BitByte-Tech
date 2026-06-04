import { AnimatePresence, motion } from "framer-motion";
import { FileText, Sparkles, X, Lock, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

const CANVA_EMBED_URL = (() => {
  const base =
    "https://www.canva.com/design/DAHKXndWpBA/kHHf-YXFc7gfFcxmtbbpUQ/view";
  const url = new URL(base);
  url.searchParams.set("embed", "");
  return url.toString();
})();

export default function ShowcasePage() {
  const [viewerOpen, setViewerOpen] = useState(false);

  // Stages: blocked, login, verifying, access_denied, dashboard
  const [stage, setStage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("from") === "navbar" ? "login" : "blocked";
  });

  const [accessKey, setAccessKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!viewerOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setViewerOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [viewerOpen]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!accessKey.trim()) {
      setErrorMsg("Please enter your access key.");
      return;
    }

    if (accessKey === "BITBYTE123") {
      setStage("verifying");
      setTimeout(() => setStage("dashboard"), 1500);
    } else if (accessKey === "UNKNOWN123") {
      setStage("verifying");
      setTimeout(() => setStage("access_denied"), 1500);
    } else {
      setErrorMsg("Invalid Access Key! Please try again.");
    }
  };

  const handleLogout = () => {
    setAccessKey("");
    setErrorMsg("");
    setStage("login");
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="showcase-container relative">
      {/* Background glow meshes */}
      <div className="showcase-stage-glow showcase-stage-glow-a" />
      <div className="showcase-stage-glow showcase-stage-glow-b" />
      <div className="showcase-stage-grid" />

      <AnimatePresence mode="wait">
        {/* 1. BLOCKED STAGE */}
        {stage === "blocked" && (
          <motion.div
            key="blocked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="showcase-card relative z-10 w-full max-w-md p-8 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <Lock size={36} className="animate-pulse" />
            </div>
            <h2 className="mb-3 text-2xl font-black text-white tracking-wide">You need to login first</h2>
            <p className="mb-8 text-slate-400">Please login to access the Showcase</p>
            <button
              type="button"
              onClick={() => setStage("login")}
              className="showcase-btn-primary w-full py-4 text-sm font-bold uppercase tracking-wider"
            >
              Go to Login Page
            </button>
          </motion.div>
        )}

        {/* 2. LOGIN STAGE */}
        {stage === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="showcase-access-card relative z-10 w-full max-w-md"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white mb-2">Secure Employee Access</h2>
              <p className="text-sm" style={{ color: 'rgba(232,248,255,0.5)' }}>Authorized Employees Only</p>
            </div>

            <form onSubmit={handleLoginSubmit}>
              {/* Error block */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg text-center text-xs font-semibold"
                  style={{
                    background: 'rgba(230,57,70,0.1)',
                    border: '1px solid rgba(230,57,70,0.3)',
                    color: '#e63946'
                  }}
                >
                  {errorMsg}
                </motion.div>
              )}

              {/* Instruction */}
              <p className="text-center text-sm font-medium mb-6" style={{ color: '#fff', lineHeight: 1.6 }}>
                Please enter your access key<br />to continue
              </p>

              {/* Access Key Input */}
              <div className="showcase-access-input-wrap mb-4">
                <input
                  type="password"
                  placeholder="Enter Access Key"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="showcase-access-input"
                  autoComplete="off"
                />
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="showcase-access-btn-verify"
              >
                Verify Access
              </button>
            </form>

            {/* Footer Warning */}
            <div className="mt-6 text-center text-xs font-medium" style={{ color: '#e63946', opacity: 0.85 }}>
              Unauthorized access is<br />strictly prohibited.
            </div>
          </motion.div>
        )}

        {/* 3. VERIFYING STAGE */}
        {stage === "verifying" && (
          <motion.div
            key="verifying"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="showcase-card relative z-10 w-full max-w-md p-8 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center">
              <div className="showcase-spinner" />
            </div>
            <h2 className="mb-2 text-2xl font-black text-white tracking-wide">Verifying...</h2>
            <p className="text-slate-400 text-sm">Please wait while we authenticate your credentials</p>
          </motion.div>
        )}

        {/* 4. ACCESS DENIED STAGE */}
        {stage === "access_denied" && (
          <motion.div
            key="access_denied"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="showcase-card relative z-10 w-full max-w-md p-8 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <ShieldAlert size={36} />
            </div>
            <h2 className="mb-2 text-2xl font-black text-white tracking-wide">Access Denied</h2>
            <p className="mb-8 text-slate-400 text-sm leading-relaxed">
              You are not authorized to access this page. <br />
              Please contact your administrator.
            </p>
            <button
              type="button"
              onClick={handleGoHome}
              className="showcase-btn-primary w-full py-4 text-sm font-bold uppercase tracking-wider"
            >
              Go to Home Page
            </button>
          </motion.div>
        )}

        {/* 5. DASHBOARD STAGE */}
        {stage === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative z-10 flex flex-col items-center justify-center w-full"
          >
            <div className="showcase-button-wrap relative">
              <motion.span
                className="showcase-button-ring showcase-button-ring-1"
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="showcase-button-ring showcase-button-ring-2"
                animate={{ scale: [1.05, 1.2, 1.05], opacity: [0.35, 0.08, 0.35] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
              <motion.span
                className="showcase-button-shimmer"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <motion.button
                type="button"
                onClick={() => setViewerOpen(true)}
                className="showcase-cta-button group relative z-10 inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-black text-white shadow-glow animate-pulse"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="showcase-cta-button-bg" />
                <Sparkles className="relative z-10 shrink-0" size={16} />
                <span className="relative z-10">See the showcase</span>
                <FileText
                  className="relative z-10 shrink-0 opacity-80 transition group-hover:opacity-100"
                  size={16}
                />
              </motion.button>
            </div>
            <span className="text-xs font-semibold text-slate-500 mt-4 text-center">
              Tap to open full service portfolio presentation
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canva Embed Presentation Iframe Modal Overlay */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-slate-950"
          >
            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-navy/90 text-white shadow-lg backdrop-blur hover:bg-navy cursor-none"
              aria-label="Close showcase"
            >
              <X size={20} />
            </button>

            <div className="canva-embed-frame h-full w-full">
              <iframe
                title="Bit Byte Service Showcase"
                src={CANVA_EMBED_URL}
                className="canva-embed-iframe h-full w-full border-0 bg-white"
                scrolling="yes"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div
                className="canva-chrome-mask canva-chrome-mask-corner"
                aria-hidden
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
