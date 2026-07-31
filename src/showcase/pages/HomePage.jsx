import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Customization from '../components/Customization';
import Process from '../components/Process';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function HomePage() {
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


