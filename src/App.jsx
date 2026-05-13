import { Suspense, lazy, useCallback, useRef, useState } from 'react'
import Cursor from './components/Cursor'
import BackgroundCanvas from './components/BackgroundCanvas'
import MobileMenu from './components/MobileMenu'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import useLandingEffects from './components/useLandingEffects'

const Services = lazy(() => import('./components/Services'))
const Founder = lazy(() => import('./components/Founder'))
const WhyUs = lazy(() => import('./components/WhyUs'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))
const CTA = lazy(() => import('./components/CTA'))
const CustomWebApplications = lazy(() => import('./components/CustomWebApplications'))
const DigitalMarketingSolutions = lazy(() => import('./components/DigitalMarketingSolutions'))
const BusinessAnalyticsSolutions = lazy(() => import('./components/BusinessAnalyticsSolutions'))
const WebDevelopmentOverview = lazy(() => import('./components/WebDevelopmentOverview'))
const WebDevelopmentSubService = lazy(() => import('./components/WebDevelopmentSubService'))
const CareersPage = lazy(() => import('./components/CareersPage'))

const SectionFallback = () => null

export default function App() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const planetRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navStuck, setNavStuck] = useState(false)
  const openMobileMenu = useCallback(() => setMobileOpen(true), [])
  const closeMobileMenu = useCallback(() => setMobileOpen(false), [])
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
      <MobileMenu open={mobileOpen} onClose={closeMobileMenu} rootLinks={isServiceDetailPage} />
      <Navbar stuck={navStuck} onMenuOpen={openMobileMenu} rootLinks={isServiceDetailPage} />
      {isWebDevelopmentPage ? (
        <Suspense fallback={<SectionFallback />}>
          <WebDevelopmentOverview />
        </Suspense>
      ) : isCustomWebAppPage ? (
        <Suspense fallback={<SectionFallback />}>
          <CustomWebApplications />
        </Suspense>
      ) : isEcommercePage ? (
        <Suspense fallback={<SectionFallback />}>
          <WebDevelopmentSubService type="ecommerce" />
        </Suspense>
      ) : isPortalsPage ? (
        <Suspense fallback={<SectionFallback />}>
          <WebDevelopmentSubService type="portals" />
        </Suspense>
      ) : isDigitalMarketingPage ? (
        <Suspense fallback={<SectionFallback />}>
          <DigitalMarketingSolutions />
        </Suspense>
      ) : isBusinessAnalyticsPage ? (
        <Suspense fallback={<SectionFallback />}>
          <BusinessAnalyticsSolutions />
        </Suspense>
      ) : isCareersPage ? (
        <Suspense fallback={<SectionFallback />}>
          <CareersPage />
        </Suspense>
      ) : (
        <>
          <Hero planetRef={planetRef} />
          <Suspense fallback={<SectionFallback />}>
            <Services />
            <Founder />
            <WhyUs />
            <Portfolio />
            <Testimonials />
            <Contact />
            <CTA />
          </Suspense>
        </>
      )}
      <Footer rootLinks={isServiceDetailPage} />
    </>
  )
}
