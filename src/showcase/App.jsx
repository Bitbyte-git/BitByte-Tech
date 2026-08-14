import { Suspense, lazy, useEffect, useState } from 'react';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const WebsiteShowcasePage = lazy(() => import('./pages/WebsiteShowcasePage'));
const DigitalMarketingPage = lazy(() => import('./pages/DigitalMarketingPage'));
const ProposalGeneratorPage = lazy(() => import('./pages/ProposalGeneratorPage'));

const PageFallback = () => null;

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);

    window.addEventListener('popstate', syncPath);
    window.addEventListener('locationchange', syncPath);

    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener('locationchange', syncPath);
    };
  }, []);

  const showcasePath = path.replace(/^\/showcase/, '').split('?')[0] || '/';

  useEffect(() => {
    if (showcasePath === '/') {
      document.title = 'Bit Byte Technologies - Premium Website Designs';
    }
  }, [showcasePath]);

  return (
    <Suspense fallback={<PageFallback />}>
      {showcasePath === '/website-showcase' ? (
        <WebsiteShowcasePage />
      ) : showcasePath === '/digital-market-showcase' ? (
        <DigitalMarketingPage />
      ) : showcasePath.startsWith('/proposal-generator') ||
        showcasePath.startsWith('/quotation-generator') ? (
        <ProposalGeneratorPage path={showcasePath} />
      ) : (
        <HomePage />
      )}
    </Suspense>
  );
}



