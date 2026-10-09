import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Customization from '../components/Customization';
import Process from '../components/Process';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    const handleSectionHash = () => {
      const sectionId = window.location.hash.slice(1);
      if (!sectionId) return;

      window.requestAnimationFrame(() => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        section.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState({}, '', '/showcase');
      });
    };

    handleSectionHash();
    window.addEventListener('hashchange', handleSectionHash);
    return () => window.removeEventListener('hashchange', handleSectionHash);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Customization />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}


