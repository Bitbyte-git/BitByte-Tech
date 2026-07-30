import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import WebsiteShowcasePage from './pages/WebsiteShowcasePage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import ProposalGeneratorPage from './pages/ProposalGeneratorPage';

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

  const showcasePath = path.replace(/^\/showcase/, '') || '/';

  useEffect(() => {
    if (showcasePath === '/') {
      document.title = 'Bit Byte Technologies - Premium Website Designs';
    }
  }, [showcasePath]);

  if (showcasePath === '/website-showcase') return <WebsiteShowcasePage />;
  if (showcasePath === '/digital-market-showcase') return <DigitalMarketingPage />;
  if (showcasePath.startsWith('/proposal-generator') || showcasePath.startsWith('/quotation-generator')) {
    return <ProposalGeneratorPage path={showcasePath} />;
  }

  return <HomePage />;
}



