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
import Contact from './components/Contact'
import CTA from './components/CTA'
import Footer from './components/Footer'
import useLandingEffects from './components/useLandingEffects'
import CustomWebApplications from './components/CustomWebApplications'
import DigitalMarketingSolutions from './components/DigitalMarketingSolutions'
import BusinessAnalyticsSolutions from './components/BusinessAnalyticsSolutions'
import WebDevelopmentOverview from './components/WebDevelopmentOverview'
import WebDevelopmentSubService from './components/WebDevelopmentSubService'

import CareersPage from './components/CareersPage'

export default function App() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const planetRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navStuck, setNavStuck] = useState(false)
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const isWebDevelopmentPage = pathname === '/services/web-development'
  const isCustomWebAppPage = pathname === '/services/web-development/custom-web-applications'
  const isEcommercePage = pathname === '/services/web-development/e-commerce-solutions'
  const isPortalsPage = pathname === '/services/web-development/web-portals-dashboards'
  const isDigitalMarketingPage = pathname === '/services/digital-marketing/ai-powered-digital-marketing-solutions'
  const isBusinessAnalyticsPage = pathname === '/services/business-analytics/data-driven-business-analytics-solutions'
  const isCareersPage = pathname === '/careers'
  const isServiceDetailPage =
    isWebDevelopmentPage || isCustomWebAppPage || isEcommercePage || isPortalsPage || isDigitalMarketingPage || isBusinessAnalyticsPage || isCareersPage

  useLandingEffects({ canvasRef, cursorRef, ringRef, planetRef, setNavStuck })

  return (
    <>
      <Cursor cursorRef={cursorRef} ringRef={ringRef} />
      <BackgroundCanvas canvasRef={canvasRef} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} rootLinks={isServiceDetailPage} />
      <Navbar stuck={navStuck} onMenuOpen={() => setMobileOpen(true)} rootLinks={isServiceDetailPage} />
      {isWebDevelopmentPage ? (
        <WebDevelopmentOverview />
      ) : isCustomWebAppPage ? (
        <CustomWebApplications />
      ) : isEcommercePage ? (
        <WebDevelopmentSubService type="ecommerce" />
      ) : isPortalsPage ? (
        <WebDevelopmentSubService type="portals" />
      ) : isDigitalMarketingPage ? (
        <DigitalMarketingSolutions />
      ) : isBusinessAnalyticsPage ? (
        <BusinessAnalyticsSolutions />
      ) : isCareersPage ? (
        <CareersPage />
      ) : (
        <>
          <Hero planetRef={planetRef} />
          <Services />
          <Founder />
          <WhyUs />
          <Portfolio />
          <Testimonials />
          <Contact />
          <CTA />
        </>
      )}
      <Footer rootLinks={isServiceDetailPage} />
    </>
  )
}
