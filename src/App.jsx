import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import useLandingEffects from "./components/useLandingEffects";
import Seo from "./seo";
import { SEO_BY_PATH } from "./seo";
import ServiceFaq from "./components/ServiceFaq";
import {
  destinationForPath,
  getProtectedDestination,
  grantAccess,
  hasAccess,
  revokeAccess,
  revokeAllAccess,
} from "./accessControl";

const Services = lazy(() => import("./components/Services"));
const MobileMenu = lazy(() => import("./components/MobileMenu"));
const Founder = lazy(() => import("./components/Founder"));
const WhyUs = lazy(() => import("./components/WhyUs"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const CTA = lazy(() => import("./components/CTA"));
const Footer = lazy(() => import("./components/Footer"));
const HRMSAccessPopup = lazy(() => import("./components/HRMSAccessPopup"));
const CustomWebApplications = lazy(
  () => import("./components/CustomWebApplications"),
);
const PersonalBranding = lazy(() => import("./components/PersonalBranding"));

const DigitalMarketingSolutions = lazy(
  () => import("./components/DigitalMarketingSolutions"),
);
const BusinessAnalyticsSolutions = lazy(
  () => import("./components/BusinessAnalyticsSolutions"),
);
const WebDevelopmentOverview = lazy(
  () => import("./components/WebDevelopmentOverview"),
);
const WebDevelopmentSubService = lazy(
  () => import("./components/WebDevelopmentSubService"),
);
const CareersPage = lazy(() => import("./components/CareersPage"));
const CareerAdminPage = lazy(() => import("./components/CareerAdminPage"));
const CareerApplyPage = lazy(() => import("./components/CareerApplyPage"));
const ImaginationToReality = lazy(
  () => import("./components/ImaginationToReality"),
);
const RealTimeSales = lazy(() => import("./components/RealTimeSales"));
const LegalPage = lazy(() => import("./components/LegalPage"));
const ShowcaseApp = lazy(() => import("./showcase/App"));
const ChatBot = lazy(() => import("./components/chatbot/ChatBot"));

const SectionFallback = () => null;

function useDelayedReady(delay = 12000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return undefined;

    let timeoutId = 0;
    let idleId = 0;
    const markReady = () => setReady(true);

    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(markReady, { timeout: 2500 });
        } else {
          markReady();
        }
      }, delay);
    };

    const runSoonAfterIntent = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(markReady, 1200);
    };

    schedule();
    window.addEventListener("pointerdown", runSoonAfterIntent, { once: true, passive: true });
    window.addEventListener("keydown", runSoonAfterIntent, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      window.removeEventListener("pointerdown", runSoonAfterIntent);
      window.removeEventListener("keydown", runSoonAfterIntent);
    };
  }, [delay, ready]);

  return ready;
}

function DeferredSection({
  anchorIds = [],
  children,
  className = "section wrap",
  minHeight = 360,
  rootMargin = "320px 0px",
  sectionId,
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return undefined;

    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ready]);

  if (ready) return children;

  return (
    <section
      ref={ref}
      id={sectionId}
      className={className}
      style={{ minHeight }}
      aria-hidden="true"
    >
      {anchorIds.map((id) => (
        <span
          id={id}
          key={id}
          style={{ position: "relative", top: "-90px", display: "block" }}
        />
      ))}
    </section>
  );
}

const redirectToWorkspaceDestination = (destination) => {
  const config = getProtectedDestination(destination);
  if (!config) return;
  window.location.href = config.redirectUrl || config.route;
};

function ProtectedRoute({ destination, children }) {
  const config = getProtectedDestination(destination);
  const [authorized, setAuthorized] = useState(() => hasAccess(destination));

  useEffect(() => {
    const currentAuthorized = hasAccess(destination);
    setAuthorized(currentAuthorized);

    if (currentAuthorized && (destination === "hrms" || destination === "billing")) {
      redirectToWorkspaceDestination(destination);
    }
  }, [destination]);

  if (!config) return null;

  if (!authorized) {
    return (
      <Suspense fallback={<SectionFallback />}>
        <HRMSAccessPopup
          destination={destination}
          embedded
          isOpen
          onSuccess={() => {
            grantAccess(destination);
            setAuthorized(true);
          }}
        />
      </Suspense>
    );
  }

  if (destination === "hrms" || destination === "billing") {
    return (
      <div className="hrms-access-page">
        <div className="hrms-popup-content">
          <div className="hrms-popup-state hrms-popup-success">
            <div className="hrms-status-icon success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>Access Verified</h3>
            <h2 className="success-text">Redirecting...</h2>
            <p>Opening {config.name} destination...</p>
            <div className="hrms-spinner" />
          </div>
        </div>
      </div>
    );
  }

  if (destination === "showcase") {
    return children;
  }

  return (
    <>
      {children}
      <div className="protected-route-controls" aria-label={`${config.name} access controls`}>
        <button
          type="button"
          onClick={() => {
            revokeAccess(destination);
            window.location.href = config.route;
          }}
        >
          Lock {config.name}
        </button>
        <button
          type="button"
          onClick={() => {
            revokeAllAccess();
            window.location.href = config.route;
          }}
        >
          Lock All
        </button>
      </div>
    </>
  );
}

export default function App() {
  const planetRef = useRef(null);
  const serviceHighlightTimeoutRef = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workspaceAccessApp, setWorkspaceAccessApp] = useState(null);
  const [navStuck, setNavStuck] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeServiceId, setActiveServiceId] = useState(null);
  const delayedReady = useDelayedReady(12000);

  const openMobileMenu = useCallback(() => setMobileOpen(true), []);
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);
  const openWorkspaceAccess = useCallback((appKey) => {
    const config = getProtectedDestination(appKey);
    if (!config) return;

    if (hasAccess(appKey)) {
      redirectToWorkspaceDestination(appKey);
      return;
    }

    setWorkspaceAccessApp(appKey);
  }, []);
  const SECTION_BY_PATH = {
    "/": "home",
    "/services": "services",
    "/about": "about",
    "/contact": "contact",
  };

  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const protectedDestination = destinationForPath(pathname);
  const isWebDevelopmentPage = pathname === "/services/web-development";
  const isCustomWebAppPage =
    pathname === "/services/web-development/custom-web-applications";
  const isEcommercePage =
    pathname === "/services/web-development/ecommerce-solutions";
  const isPortalsPage =
    pathname === "/services/web-development/web-portals-dashboards";
  const isDigitalMarketingPage =
    pathname ===
    "/services/digital-marketing/ai-powered-digital-marketing-solutions";
  const isBusinessAnalyticsPage =
    pathname ===
    "/services/business-analytics/data-driven-business-analytics-solutions";
  const isCareersPage = pathname === "/careers";
  const isCareerAdminPage = pathname === "/careers/admin";
  const isCareerApplyPage = pathname === "/careers/apply";
  const isPrivacyPolicyPage = pathname === "/privacy-policy";
  const isTermsConditionsPage = pathname === "/terms-and-conditions";
  const isShowcasePage =
    pathname === "/showcase" || pathname.startsWith("/showcase/");
  const isHRMSPage = pathname === "/hrms";
  const isBillingPage = pathname === "/billing";
  const isImaginationToRealityPage =
    pathname === "/services/imagination-to-reality";
  const isRealTimeSalesPage = pathname === "/services/real-time-sales-data";
  const isPersonalBrandingPage = pathname === "/services/personal-branding";
  const needsSeoFaq = pathname === "/" || isWebDevelopmentPage;
  const isServiceDetailPage =
    isWebDevelopmentPage ||
    isCustomWebAppPage ||
    isEcommercePage ||
    isPortalsPage ||
    isDigitalMarketingPage ||
    isBusinessAnalyticsPage ||
    isCareersPage ||
    isCareerAdminPage ||
    isCareerApplyPage ||
    isImaginationToRealityPage ||
    isRealTimeSalesPage ||
    isPersonalBrandingPage;
  const isLegalPage = isPrivacyPolicyPage || isTermsConditionsPage;
  const isRoutedPage =
    isServiceDetailPage || isLegalPage || isShowcasePage || isHRMSPage || isBillingPage;
  const navActiveSection = isCareersPage || isCareerApplyPage
    || isCareerAdminPage
    ? "careers"
    : isShowcasePage
      ? "showcase"
    : isServiceDetailPage
      ? "services"
      : SECTION_BY_PATH[pathname] || activeSection;

  useLandingEffects({ setNavStuck });

  // Strip trailing slashes on all completed routes (e.g., /contact/ -> /contact)
  useEffect(() => {
    if (window.location.pathname.length > 1 && window.location.pathname.endsWith("/")) {
      const cleanPath = window.location.pathname.replace(/\/+$/, "");
      window.history.replaceState(null, "", cleanPath + window.location.search);
    }
  }, []);

  // Strip and disable ?lng= and ?lang= URL parameters, and clean lingering auto-translation
  useEffect(() => {
    const hasLangParam = window.location.search.includes("lng=") || window.location.search.includes("lang=");
    const storedLang = window.localStorage.getItem("bitbyte.googleTranslateLanguage");

    if (hasLangParam || storedLang === "kn") {
      window.localStorage.removeItem("bitbyte.googleTranslateLanguage");
      window.localStorage.setItem("bitbyte.googleTranslateLanguage", "en");

      [null, window.location.hostname, `.${window.location.hostname}`].forEach((domain) => {
        const domainPart = domain ? `; domain=${domain}` : "";
        document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}`;
      });

      document.documentElement.lang = "en";
      window.dispatchEvent(new CustomEvent("bitbyte:languagechange", { detail: { code: "en" } }));

      if (hasLangParam) {
        const url = new URL(window.location.href);
        url.searchParams.delete("lng");
        url.searchParams.delete("lang");
        const cleanSearch = url.searchParams.toString() ? `?${url.searchParams.toString()}` : "";
        window.history.replaceState(null, "", url.pathname + cleanSearch);
      }

      if (document.documentElement.classList.contains("translated-ltr")) {
        window.location.reload();
      }
    }
  }, []);

  // Disable legacy/invalid routes like /fds-html, /fsd.html and redirect immediately to home
  useEffect(() => {
    const disabledRoutes = new Set([
      "/fds-html",
      "/fsd-html",
      "/fsd.html",
      "/fds.html",
      "/fsd",
      "/fds",
    ]);
    const rawPath = window.location.pathname.replace(/\/+$/, "") || "/";
    if (disabledRoutes.has(rawPath)) {
      window.history.replaceState(null, "", "/");
      window.location.replace("/");
    }
  }, []);

  // Prevent the browser from reopening routed pages at a scroll position
  // retained from the previously visited page.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash || SECTION_BY_PATH[pathname]) return undefined;

    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    resetScroll();

    const frameId = window.requestAnimationFrame(resetScroll);
    const timeoutId = window.setTimeout(resetScroll, 100);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  const focusService = useCallback((serviceId = "all") => {
    window.clearTimeout(serviceHighlightTimeoutRef.current);
    setActiveServiceId(serviceId);
    serviceHighlightTimeoutRef.current = window.setTimeout(
      () => {
        setActiveServiceId(null);
      },
      serviceId === "all" ? 2200 : 4200,
    );
  }, []);

  const scrollToHash = useCallback((hash) => {
    const rawId = hash.replace("#", "");
    const target =
      document.getElementById(rawId) ||
      (rawId === "about" ? document.getElementById("founder") : null) ||
      (rawId === "founder" ? document.getElementById("about") : null);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const handleNavClick = useCallback(
    (event, href, key) => {
      if (key === "showcase") {
        event.preventDefault();
        openWorkspaceAccess("showcase");
        return;
      }

      const cleanHref = href.replace(/\/+$/, "") || "/";
      const targetSection = SECTION_BY_PATH[cleanHref];

      if (targetSection && !isRoutedPage) {
        event.preventDefault();
        setActiveSection(targetSection);

        if (window.location.pathname !== cleanHref) {
          window.history.pushState(null, "", cleanHref);
        }

        if (targetSection === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const target =
            document.getElementById(targetSection) ||
            (targetSection === "about" ? document.getElementById("founder") : null);
          if (target) {
            const prefersReducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            target.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "start",
            });
          }
          if (targetSection === "services") {
            focusService("all");
          }
        }
        return;
      }

      if (href.startsWith("#") && !isRoutedPage) {
        event.preventDefault();
        setActiveSection(key);
        scrollToHash(href);
        return;
      }
    },
    [focusService, isRoutedPage, openWorkspaceAccess, scrollToHash],
  );

  const handleServiceSelect = useCallback(
    (event, serviceId) => {
      if (isRoutedPage) return;

      event.preventDefault();
      setActiveSection("services");
      focusService(serviceId);
      scrollToHash("#services");

      if (window.history?.replaceState) {
        window.history.replaceState(null, "", "#services");
      }
    },
    [focusService, isRoutedPage, scrollToHash],
  );

  useEffect(
    () => () => window.clearTimeout(serviceHighlightTimeoutRef.current),
    [],
  );

  // When arriving at the home page or directly visiting /services, /about, /contact,
  // scroll to the target section once it appears in the DOM.
  useEffect(() => {
    if (isRoutedPage) return undefined;

    const hash = window.location.hash;
    const targetKey = SECTION_BY_PATH[pathname] || (hash ? hash.replace("#", "") : null);
    if (!targetKey || targetKey === "home") return undefined;

    let attempts = 0;
    const interval = setInterval(() => {
      const el =
        document.getElementById(targetKey) ||
        (targetKey === "about" ? document.getElementById("founder") : null) ||
        (targetKey === "founder" ? document.getElementById("about") : null);
      if (el) {
        clearInterval(interval);
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
      if (++attempts > 25) clearInterval(interval); // give up after ~3 s
    }, 120);

    return () => clearInterval(interval);
  }, [pathname, isRoutedPage]);

  // Support browser Back/Forward buttons across section routes (/ , /services, /about, /contact)
  useEffect(() => {
    if (isRoutedPage) return undefined;

    const handlePopState = () => {
      const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
      const targetKey = SECTION_BY_PATH[currentPath];
      if (targetKey) {
        setActiveSection(targetKey);
        if (targetKey === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const target =
            document.getElementById(targetKey) ||
            (targetKey === "about" ? document.getElementById("founder") : null);
          if (target) {
            const prefersReducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            target.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "start",
            });
          }
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isRoutedPage]);

  useEffect(() => {
    if (isRoutedPage) return undefined;

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest(
        'a[href^="/contact"], a[href^="/about"], a[href^="/services"], a[href^="#"]',
      );
      if (!anchor) return;
      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      const cleanHref = rawHref.replace(/\/+$/, "") || "/";
      const targetSection =
        SECTION_BY_PATH[cleanHref] ||
        (cleanHref.startsWith("#") ? cleanHref.replace("#", "") : null);

      if (targetSection) {
        const dest = targetSection === "founder" ? "about" : targetSection;
        const target =
          document.getElementById(dest) ||
          (dest === "about" ? document.getElementById("founder") : null);

        if (target) {
          e.preventDefault();
          setActiveSection(dest);

          const newPath = SECTION_BY_PATH[cleanHref] ? cleanHref : `/${dest}`;
          if (window.location.pathname !== newPath) {
            window.history.pushState(null, "", newPath);
          }

          const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [isRoutedPage]);

  useEffect(() => {
    if (isRoutedPage) return undefined;

    const sectionIds = ["hero", "services", "about", "founder", "contact"];
    const keyById = {
      hero: "home",
      services: "services",
      about: "about",
      founder: "about",
      contact: "contact",
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(keyById[visible.target.id] || "home");
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.02, 0.18, 0.4, 0.65],
      },
    );

    const observed = new Set();
    const observeSections = () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && !observed.has(section)) {
          observed.add(section);
          observer.observe(section);
        }
      });
    };

    observeSections();
    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [isRoutedPage]);

  return (
    <>
      <Seo pathname={pathname} />
      {!isShowcasePage && (
        <>
          {mobileOpen && (
            <Suspense fallback={null}>
              <MobileMenu
                activeSection={navActiveSection}
                onClose={closeMobileMenu}
                onNavClick={handleNavClick}
                onServiceSelect={handleServiceSelect}
                open
                rootLinks={isRoutedPage}
                onHRMSClick={() => openWorkspaceAccess("hrms")}
                onBillingClick={() => openWorkspaceAccess("billing")}
                onShowcaseClick={() => openWorkspaceAccess("showcase")}
                onCareerAdminClick={() => {
                  window.location.href = "/careers/admin";
                }}
              />
            </Suspense>
          )}
          <Navbar
            activeSection={navActiveSection}
            activeServiceId={activeServiceId}
            onMenuOpen={openMobileMenu}
            onNavClick={handleNavClick}
            onServiceSelect={handleServiceSelect}
            rootLinks={isRoutedPage}
            stuck={navStuck}
            onHRMSClick={() => openWorkspaceAccess("hrms")}
            onBillingClick={() => openWorkspaceAccess("billing")}
            onShowcaseClick={() => openWorkspaceAccess("showcase")}
            onCareerAdminClick={() => {
              window.location.href = "/careers/admin";
            }}
          />
          {workspaceAccessApp && (
            <Suspense fallback={null}>
              <HRMSAccessPopup
                isOpen
                onClose={() => setWorkspaceAccessApp(null)}
                destination={workspaceAccessApp}
                onSuccess={(destination) => {
                  grantAccess(destination);
                }}
              />
            </Suspense>
          )}
        </>
      )}
      {isHRMSPage ? (
        <ProtectedRoute destination="hrms" />
      ) : isBillingPage ? (
        <ProtectedRoute destination="billing" />
      ) : isWebDevelopmentPage ? (
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
      ) : isCareerAdminPage ? (
        <Suspense fallback={<SectionFallback />}>
          <CareerAdminPage />
        </Suspense>
      ) : isCareerApplyPage ? (
        <Suspense fallback={<SectionFallback />}>
          <CareerApplyPage />
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
      ) : isLegalPage ? (
        <Suspense fallback={<SectionFallback />}>
          <LegalPage type={isPrivacyPolicyPage ? "privacy" : "terms"} />
        </Suspense>
      ) : isShowcasePage ? (
        <ProtectedRoute destination={protectedDestination || "showcase"}>
          <Suspense fallback={<SectionFallback />}>
            <ShowcaseApp />
          </Suspense>
        </ProtectedRoute>
      ) : (
        <>
          <Hero planetRef={planetRef} />
          <DeferredSection
            sectionId="services"
            className="section wrap center services-section"
            minHeight={560}
            rootMargin="-1px 0px"
          >
            <Suspense fallback={<SectionFallback />}>
              <Services activeServiceId={activeServiceId} />
            </Suspense>
          </DeferredSection>
          <DeferredSection sectionId="founder" className="section wrap bg-tint-1" minHeight={720}>
            <Suspense fallback={<SectionFallback />}>
              <Founder />
            </Suspense>
          </DeferredSection>
          <DeferredSection
            sectionId="why"
            anchorIds={["showcase", "pricing"]}
            className="section wrap center"
            minHeight={620}
          >
            <Suspense fallback={<SectionFallback />}>
              <WhyUs />
            </Suspense>
          </DeferredSection>
          <DeferredSection sectionId="testimonials" className="section wrap" minHeight={500}>
            <Suspense fallback={<SectionFallback />}>
              <Testimonials />
            </Suspense>
          </DeferredSection>
          <DeferredSection sectionId="faq" className="section wrap home-faq-section" minHeight={500}>
            <ServiceFaq
              items={SEO_BY_PATH["/"].faqs}
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              intro="Quick answers about our web development, custom applications, SEO, and project collaboration services."
            />
          </DeferredSection>
          <DeferredSection sectionId="contact" className="section wrap" minHeight={820}>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </DeferredSection>
          <DeferredSection sectionId="cta" className="wrap" minHeight={420}>
            <Suspense fallback={<SectionFallback />}>
              <CTA />
            </Suspense>
          </DeferredSection>
          
        </>
      )}
      {pathname !== "/" && needsSeoFaq && SEO_BY_PATH[pathname]?.faqs?.length ? (
        <div className="wrap">
          <ServiceFaq
            items={SEO_BY_PATH[pathname].faqs}
            eyebrow={isWebDevelopmentPage || isPersonalBrandingPage ? "FAQ" : undefined}
            title={isWebDevelopmentPage
              ? "Web Development FAQs"
              : isPersonalBrandingPage
                ? "Personal Branding FAQs"
                : undefined}
            intro={isWebDevelopmentPage
              ? "Answers about our website development process, pricing, timelines, custom applications, eCommerce, redesigns, and ongoing support."
              : isPersonalBrandingPage
                ? "Answers about personal brand strategy, professional positioning, LinkedIn optimization, content creation, industry authority, and expected timelines."
                : undefined}
          />
        </div>
      ) : null}
      {!isShowcasePage && (
        <>
          {delayedReady && (
            <Suspense fallback={null}>
              <ChatBot />
            </Suspense>
          )}
          <DeferredSection className="wrap" minHeight={360}>
            <Suspense fallback={null}>
              <Footer rootLinks={isRoutedPage} />
            </Suspense>
          </DeferredSection>
        </>
      )}
    </>
  );
}
