import { useRef, useState } from 'react'
import Cursor from './components/Cursor'
import BackgroundCanvas from './components/BackgroundCanvas'
import MobileMenu from './components/MobileMenu'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Founder from './components/Founder'
import WhyUs from './components/WhyUs'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Careers from './components/Careers'
import Contact from './components/Contact'
import CTA from './components/CTA'
import Footer from './components/Footer'
import useLandingEffects from './components/useLandingEffects'

export default function App() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const planetRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navStuck, setNavStuck] = useState(false)

  useLandingEffects({ canvasRef, cursorRef, ringRef, planetRef, setNavStuck })

  return (
    <>
      <Cursor cursorRef={cursorRef} ringRef={ringRef} />
      <BackgroundCanvas canvasRef={canvasRef} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Navbar stuck={navStuck} onMenuOpen={() => setMobileOpen(true)} />
      <Hero planetRef={planetRef} />
      <Services />
      <Founder />
      <WhyUs />
      <Portfolio />
      <Testimonials />
      <Careers />
      <Contact />
      <CTA />
      <Footer />
    </>
  )
}
