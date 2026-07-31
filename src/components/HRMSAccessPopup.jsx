import { useState, useEffect } from 'react';
import './hrms-popup.css';

const CORRECT_KEY = 'BITBYTE123';
const MAX_ATTEMPTS = 3;
const DEFAULT_REDIRECT_URL = 'https://bitbyte-lemon.vercel.app/login';
const normalizeRedirectUrl = (url) => {
  const trimmedUrl = String(url || '').trim();
  if (!trimmedUrl) return DEFAULT_REDIRECT_URL;
  if (trimmedUrl.startsWith('/')) return trimmedUrl;
  if (/^[a-z][a-z\d+\-.]*:\/\//i.test(trimmedUrl)) return trimmedUrl;
  return `https://${trimmedUrl.replace(/^\/+/, '')}`;
};

export default function HRMSAccessPopup({
  isOpen,
  onClose,
  appName = 'HRMS',
  redirectUrl = DEFAULT_REDIRECT_URL,
  title = 'Secure Employee Access',
  subtitle = 'Authorized Employees Only',
  correctKey = CORRECT_KEY,
  openInNewTab = true,
}) {
  const [accessKey, setAccessKey] = useState('');
  const [status, setStatus] = useState('idle'); // idle, verifying, success, denied, blocked
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setAccessKey('');
      setStatus('idle');
      setAttempts(0);
    }
  }, [isOpen, appName]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'verifying' || status === 'success' || status === 'blocked') return;
    if (!accessKey.trim()) return;

    setStatus('verifying');

    setTimeout(() => {
      if (accessKey === correctKey) {
        setStatus('success');
        setTimeout(() => {
          const destination = normalizeRedirectUrl(redirectUrl);

          if (openInNewTab) {
            window.open(destination, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = destination;
          }

          onClose();
        }, 2000);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= MAX_ATTEMPTS) {
          setStatus('blocked');
        } else {
          setStatus('denied');
        }
      }
    }, 1200);
  };

  const handleTryAgain = () => {
    setAccessKey('');
    setStatus('idle');
  };

  const handleClose = () => {
    if (status !== 'verifying' && status !== 'success') {
      onClose();
    }
  };

  return (
    <div className="hrms-popup-overlay" onClick={handleClose}>
      <div className="hrms-popup-content" onClick={(e) => e.stopPropagation()}>
        {status === 'idle' || status === 'verifying' ? (
          <div className="hrms-popup-state hrms-popup-idle">
            <div className="hrms-popup-header">
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="hrms-popup-body">
              <p className="hrms-instruction">Please enter your secret key<br />to continue</p>
              
              <div className="hrms-input-group">
                <input
                  type="password"
                  placeholder="Enter Secret Key"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  disabled={status === 'verifying'}
                />
              </div>

              <button 
                type="submit" 
                className={`btn-hrms-submit ${status === 'verifying' ? 'verifying' : ''}`}
                disabled={status === 'verifying'}
              >
                {status === 'verifying' ? 'Verifying...' : 'Verify Access'}
              </button>
            </form>

            <div className="hrms-popup-footer">
              <p>Unauthorized access is<br />strictly prohibited.</p>
            </div>
          </div>
        ) : status === 'success' ? (
          <div className="hrms-popup-state hrms-popup-success">
            <div className="hrms-status-icon success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3>Verifying...</h3>
            <h2 className="success-text">Access Granted!</h2>
            <p>Redirecting to {appName}<br />application...</p>
            <div className="hrms-spinner"></div>
          </div>
        ) : status === 'denied' ? (
          <div className="hrms-popup-state hrms-popup-denied">
            <div className="hrms-status-icon error-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <h2 className="error-text">Access Denied</h2>
            <h3>Invalid Access Key!</h3>
            <p>Unauthorized access attempt<br />has been logged.</p>
            <button type="button" className="btn-hrms-action" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        ) : (
          <div className="hrms-popup-state hrms-popup-blocked">
            <div className="hrms-status-icon error-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h2 className="error-text">Access Blocked</h2>
            <h3>Too many failed attempts!</h3>
            <p>Your access is temporarily blocked.<br />Please contact administrator.</p>
            <button type="button" className="btn-hrms-action" onClick={handleClose}>
              Go to Home Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
