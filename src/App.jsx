import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import BackgroundCanvas from './components/BackgroundCanvas'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MobileMenu from './components/MobileMenu'
import Navbar from './components/Navbar'
import useLandingEffects from './components/useLandingEffects'

const Services = lazy(() => import('./components/Services'))
const Founder = lazy(() => import('./components/Founder'))
const WhyUs = lazy(() => import('./components/WhyUs'))


const Contact = lazy(() => import('./components/Contact'))
const CTA = lazy(() => import('./components/CTA'))
const CustomWebApplications = lazy(() => import('./components/CustomWebApplications'))
const PersonalBranding = lazy(() => import('./components/PersonalBranding'))

const DigitalMarketingSolutions = lazy(() => import('./components/DigitalMarketingSolutions'))
const BusinessAnalyticsSolutions = lazy(() => import('./components/BusinessAnalyticsSolutions'))
const WebDevelopmentOverview = lazy(() => import('./components/WebDevelopmentOverview'))
const WebDevelopmentSubService = lazy(() => import('./components/WebDevelopmentSubService'))
const CareersPage = lazy(() => import('./components/CareersPage'))
const ImaginationToReality = lazy(() => import('./components/ImaginationToReality'))
const RealTimeSales = lazy(() => import('./components/RealTimeSales'))

const SectionFallback = () => null

export default function App() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const planetRef = useRef(null)
  const serviceHighlightTimeoutRef = useRef(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navStuck, setNavStuck] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [activeServiceId, setActiveServiceId] = useState(null)
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
  const isImaginationToRealityPage = pathname === '/services/imagination-to-reality'
  const isRealTimeSalesPage = pathname === '/services/real-time-sales-data'
  const isPersonalBrandingPage = pathname === '/services/personal-branding'
  const isServiceDetailPage =
    isWebDevelopmentPage || isCustomWebAppPage || isEcommercePage || isPortalsPage || isDigitalMarketingPage || isBusinessAnalyticsPage || isCareersPage || isImaginationToRealityPage || isRealTimeSalesPage || isPersonalBrandingPage
  const navActiveSection = isCareersPage ? 'careers' : isServiceDetailPage ? 'services' : activeSection

  useLandingEffects({ canvasRef, cursorRef, ringRef, planetRef, setNavStuck })

  const focusService = useCallback((serviceId = 'all') => {
    window.clearTimeout(serviceHighlightTimeoutRef.current)
    setActiveServiceId(serviceId)
    serviceHighlightTimeoutRef.current = window.setTimeout(() => {
      setActiveServiceId(null)
    }, serviceId === 'all' ? 2200 : 4200)
  }, [])

  const scrollToHash = useCallback((hash) => {
    const target = document.getElementById(hash.replace('#', ''))
    if (!target) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  const handleNavClick = useCallback((event, href, key) => {
    if (!href.startsWith('#') || isServiceDetailPage) return

    event.preventDefault()
    setActiveSection(key)
    scrollToHash(href)

    if (key === 'services') {
      focusService('all')
    }
  }, [focusService, isServiceDetailPage, scrollToHash])

  const handleServiceSelect = useCallback((event, serviceId) => {
    if (isServiceDetailPage) return

    event.preventDefault()
    setActiveSection('services')
    focusService(serviceId)
    scrollToHash('#services')

    if (window.history?.replaceState) {
      window.history.replaceState(null, '', '#services')
    }
  }, [focusService, isServiceDetailPage, scrollToHash])

  useEffect(() => () => window.clearTimeout(serviceHighlightTimeoutRef.current), [])

  useEffect(() => {
    if (isServiceDetailPage) return undefined

    const sectionIds = ['hero', 'services', 'founder', 'contact']
    const keyById = {
      hero: 'home',
      services: 'services',
      founder: 'about',
      contact: 'contact',
    }

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (visible?.target?.id) {
        setActiveSection(keyById[visible.target.id] || 'home')
      }
    }, {
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0.02, 0.18, 0.4, 0.65],
    })

    const observed = new Set()
    const observeSections = () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && !observed.has(section)) {
          observed.add(section)
          observer.observe(section)
        }
      })
    }

    observeSections()
    const mutationObserver = new MutationObserver(observeSections)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [isServiceDetailPage])

  return (
    <>
      <Cursor
        cursorRef={cursorRef}
        ringRef={ringRef}
      />
      <BackgroundCanvas canvasRef={canvasRef} />
      <MobileMenu
        activeSection={navActiveSection}
        onClose={closeMobileMenu}
        onNavClick={handleNavClick}
        onServiceSelect={handleServiceSelect}
        open={mobileOpen}
        rootLinks={isServiceDetailPage}
      />
      <Navbar
        activeSection={navActiveSection}
        activeServiceId={activeServiceId}
        onMenuOpen={openMobileMenu}
        onNavClick={handleNavClick}
        onServiceSelect={handleServiceSelect}
        rootLinks={isServiceDetailPage}
        stuck={navStuck}
      />
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
      ) : isImaginationToRealityPage ? (
        <Suspense fallback={<SectionFallback />}>
          <ImaginationToReality />
        </Suspense>
      ) : isRealTimeSalesPage ? (
        <Suspense fallback={<SectionFallback />}>
          <RealTimeSales />
        </Suspense>
      ) : isPersonalBrandingPage ? (
        <Suspense fallback={<SectionFallback />}>
          <PersonalBranding />
        </Suspense>
      ) : (
        <>
          <Hero planetRef={planetRef} />
          <Suspense fallback={<SectionFallback />}>
            <Services activeServiceId={activeServiceId} />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Founder />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <WhyUs />
          </Suspense>


          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <CTA />
          </Suspense>
        </>
      )}
      <Footer rootLinks={isServiceDetailPage} />
    </>
  )
}
