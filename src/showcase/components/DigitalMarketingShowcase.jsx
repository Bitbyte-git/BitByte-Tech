import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Sparkles, X, Lock, ShieldAlert, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const CANVA_SHOWCASE_URL = 'https://www.canva.com/design/DAHMKgej5XA/87Dvn3r-OGEWya7Uw8iiHg/view/';

export default function DigitalMarketingShowcase() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [stage, setStage] = useState(() => {
    if (typeof window === 'undefined') return 'blocked';
    const params = new URLSearchParams(window.location.search);
    return params.get('from') === 'navbar' ? 'login' : 'blocked';
  });
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const syncStageFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('from') === 'navbar') {
        setAccessKey('');
        setErrorMsg('');
        setStage('login');
      }
    };

    syncStageFromUrl();
    window.addEventListener('locationchange', syncStageFromUrl);
    window.addEventListener('popstate', syncStageFromUrl);

    return () => {
      window.removeEventListener('locationchange', syncStageFromUrl);
      window.removeEventListener('popstate', syncStageFromUrl);
    };
  }, []);

  useEffect(() => {
    const preventDefaultAction = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleKeyboardShortcuts = (event) => {
      const blockedKeys = ['c', 's', 'p', 'u', 'a', 'i', 'j'];
      const key = event.key.toLowerCase();
      const isModifierPressed = event.ctrlKey || event.metaKey || event.altKey;

      if (event.code === 'PrintScreen' || event.key === 'PrintScreen') {
        preventDefaultAction(event);
        return;
      }

      if (event.key === 'F12') {
        preventDefaultAction(event);
        return;
      }

      if (isModifierPressed && blockedKeys.includes(key)) {
        preventDefaultAction(event);
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.shiftKey && ['c', 'i', 'j'].includes(key)) {
        preventDefaultAction(event);
      }
    };

    const handleVisibility = () => {
      setIsProtected(document.visibilityState !== 'visible' || !document.hasFocus());
    };

    const handleWindowBlur = () => setIsProtected(true);
    const handleWindowFocus = () => setIsProtected(false);

    document.documentElement.style.userSelect = 'none';
    document.documentElement.style.webkitUserSelect = 'none';
    document.documentElement.style.msUserSelect = 'none';
    document.documentElement.style.webkitTouchCallout = 'none';
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    document.body.style.webkitTouchCallout = 'none';

    document.addEventListener('contextmenu', preventDefaultAction);
    document.addEventListener('selectstart', preventDefaultAction);
    document.addEventListener('dragstart', preventDefaultAction);
    document.addEventListener('keydown', handleKeyboardShortcuts);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    handleVisibility();

    if (!viewerOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setViewerOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('contextmenu', preventDefaultAction);
      document.removeEventListener('selectstart', preventDefaultAction);
      document.removeEventListener('dragstart', preventDefaultAction);
      document.removeEventListener('keydown', handleKeyboardShortcuts);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.documentElement.style.userSelect = '';
      document.documentElement.style.webkitUserSelect = '';
      document.documentElement.style.msUserSelect = '';
      document.documentElement.style.webkitTouchCallout = '';
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.msUserSelect = '';
      document.body.style.webkitTouchCallout = '';
    };
  }, [viewerOpen]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!accessKey.trim()) {
      setErrorMsg('Please enter your access key.');
      return;
    }

    if (accessKey === 'BITBYTE123') {
      setStage('verifying');
      setTimeout(() => setStage('dashboard'), 1500);
    } else if (accessKey === 'UNKNOWN123') {
      setStage('verifying');
      setTimeout(() => setStage('access_denied'), 1500);
    } else {
      setErrorMsg('Invalid Access Key! Please try again.');
    }
  };

  const handleLogout = () => {
    setAccessKey('');
    setErrorMsg('');
    setStage('login');
  };

  const handleGoHome = () => {
    window.location.href = '/showcase';
  };

  const handleOpenShowcase = () => {
    window.open(CANVA_SHOWCASE_URL, '_blank', 'noopener,noreferrer');
    setViewerOpen(false);
  };

  return (
    <div className="showcase-container relative">
      {isProtected && (
        <div className="pointer-events-none fixed inset-0 z-[3200] flex items-center justify-center bg-slate-950/90 px-6 text-center backdrop-blur-sm">
          <div className="max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-slate-200 shadow-2xl">
            <ShieldAlert className="mx-auto mb-3 text-red-400" size={32} />
            <h3 className="text-lg font-semibold text-white">Privacy Protected</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              This presentation is protected. Content is hidden while the tab is inactive to reduce unauthorized capture.
            </p>
          </div>
        </div>
      )}
      <div className="showcase-stage-glow showcase-stage-glow-a" />
      <div className="showcase-stage-glow showcase-stage-glow-b" />
      <div className="showcase-stage-grid" />

      <AnimatePresence mode="wait">
        {stage === 'blocked' && (
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
              onClick={() => setStage('login')}
              className="showcase-btn-primary w-full py-4 text-sm font-bold uppercase tracking-wider"
            >
              Go to Login Page
            </button>
          </motion.div>
        )}

        {stage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="showcase-access-card relative z-10 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white mb-2">Secure Employee Access</h2>
              <p className="text-sm" style={{ color: 'rgba(232,248,255,0.5)' }}>Authorized Employees Only</p>
            </div>

            <form onSubmit={handleLoginSubmit}>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg text-center text-xs font-semibold"
                  style={{
                    background: 'rgba(230,57,70,0.1)',
                    border: '1px solid rgba(230,57,70,0.3)',
                    color: '#e63946',
                  }}
                >
                  {errorMsg}
                </motion.div>
              )}

              <p className="text-center text-sm font-medium mb-6" style={{ color: '#fff', lineHeight: 1.6 }}>
                Please enter your access key<br />to continue
              </p>

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

              <button type="submit" className="showcase-access-btn-verify">
                Verify Access
              </button>
            </form>

            <div className="mt-6 text-center text-xs font-medium" style={{ color: '#e63946', opacity: 0.85 }}>
              Unauthorized access is<br />strictly prohibited.
            </div>
          </motion.div>
        )}

        {stage === 'verifying' && (
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

        {stage === 'access_denied' && (
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

        {stage === 'dashboard' && (
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
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="showcase-button-ring showcase-button-ring-2"
                animate={{ scale: [1.05, 1.2, 1.05], opacity: [0.35, 0.08, 0.35] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
              />
              <motion.span
                className="showcase-button-shimmer"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              <motion.button
                type="button"
                onClick={handleOpenShowcase}
                className="showcase-cta-button group relative z-10 inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-black text-white shadow-glow animate-pulse"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="showcase-cta-button-bg" />
                <Sparkles className="relative z-10 shrink-0" size={16} />
                <span className="relative z-10">Digital Marketing</span>
                <FileText className="relative z-10 shrink-0 opacity-80 transition group-hover:opacity-100" size={16} />
              </motion.button>
            </div>
            <span className="text-xs font-semibold text-slate-500 mt-4 text-center">
              Tap to open full service portfolio presentation
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-red-500/30 bg-red-600 text-white shadow-lg hover:bg-red-700 hover:scale-110 active:scale-90 transition-all duration-200 cursor-none"
              aria-label="Close showcase"
            >
              <X size={20} />
            </button>

            <div className="canva-embed-frame h-full w-full">
              <div className="absolute left-4 top-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 backdrop-blur">
                <FileText size={14} />
                Portfolio Preview
                <a
                  href={CANVA_SHOWCASE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                 title="Open link">
                  Open Canva presentation <ExternalLink size={12} />
                </a>
              </div>
              <div className="flex h-full w-full items-center justify-center bg-slate-950 px-6 text-center text-slate-300">
                <div className="max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <FileText className="mx-auto mb-4 text-cyan-400" size={38} />
                  <h3 className="mb-2 text-xl font-semibold text-white">Opening Canva showcase...</h3>
                  <p className="text-sm leading-6 text-slate-400">
                    The presentation will open in a new tab. If it does not appear, please allow pop-ups or use the button above.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


