import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import DigitalMarketingShowcase from '../components/DigitalMarketingShowcase';
import Footer from '../components/Footer';

export default function DigitalMarketingPage() {
  useEffect(() => {
    document.title = 'Digital Market Showcase - Bit Byte Technologies';
  }, []);

  return (
    <div className="min-h-screen bg-[#070b18]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#070b18_0%,#111943_45%,#0f766e_100%)] py-28 sm:py-32 lg:py-36">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_36%,rgba(4,8,18,0.45)_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 text-center sm:mb-14">
              <span className="mb-4 inline-block rounded-full border border-emerald-200/20 bg-emerald-300/10 px-4 py-1.5 text-sm font-semibold text-emerald-100 backdrop-blur">
                Digital Market Showcase
              </span>
              <h1 className="mb-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Premium digital commerce and marketplace concepts
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-200">
                Explore modern storefronts designed for growth, trust, and a smooth shopping experience.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-md sm:p-6">
              <DigitalMarketingShowcase />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


