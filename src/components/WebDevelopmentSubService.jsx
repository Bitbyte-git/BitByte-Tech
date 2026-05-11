import ServiceFaq from './ServiceFaq'

const pages = {
  ecommerce: {
    label: 'E-Commerce Solutions',
    eyebrow: 'Web Development',
    title: 'E-Commerce',
    highlight: 'Solutions',
    subtitle: 'Secure Online Stores Built to Sell More',
    description:
      'We build powerful e-commerce platforms with fast product discovery, smooth checkout experiences, secure payments, inventory workflows, and scalable architecture designed to grow with your business.',
    icon: 'fa-solid fa-cart-shopping',
    features: [
      ['fa-solid fa-credit-card', 'Secure Payment Integration'],
      ['fa-solid fa-boxes-stacked', 'Product & Inventory Management'],
      ['fa-solid fa-mobile-screen', 'Mobile-First Shopping Experience'],
      ['fa-solid fa-chart-line', 'Sales & Conversion Tracking'],
      ['fa-solid fa-truck-fast', 'Shipping & Order Workflows'],
      ['fa-solid fa-shield-halved', 'Secure Customer Data'],
    ],
    faqs: [
      ['What e-commerce platforms do you build?', 'We build custom e-commerce websites, product catalogs, checkout systems, multi-vendor stores, subscription stores, and scalable online selling platforms.'],
      ['Can you integrate payment gateways?', 'Yes. We can integrate payment gateways, shipping tools, tax systems, inventory software, CRM tools, and analytics platforms.'],
      ['Will the store work on mobile?', 'Yes. Every e-commerce solution is designed mobile-first so customers can browse, add products, and check out smoothly on any device.'],
      ['Can you help improve conversions?', 'Yes. We focus on fast loading, clear navigation, product discovery, trust signals, checkout optimization, and analytics to improve conversion performance.'],
    ],
  },
  portals: {
    label: 'Web Portals & Dashboards',
    eyebrow: 'Web Development',
    title: 'Web Portals &',
    highlight: 'Dashboards',
    subtitle: 'Centralized Platforms for Teams, Clients, and Data',
    description:
      'We design and develop secure portals and interactive dashboards that simplify workflows, centralize information, visualize business data, and help teams make faster decisions.',
    icon: 'fa-solid fa-chart-simple',
    features: [
      ['fa-solid fa-users-gear', 'Role-Based User Access'],
      ['fa-solid fa-gauge-high', 'Interactive Dashboards'],
      ['fa-solid fa-database', 'Connected Data Sources'],
      ['fa-solid fa-file-lines', 'Automated Reports'],
      ['fa-solid fa-bell', 'Notifications & Alerts'],
      ['fa-solid fa-lock', 'Secure Portal Architecture'],
    ],
    faqs: [
      ['What is a web portal?', 'A web portal is a secure online platform where users, teams, or clients can access information, tools, reports, documents, workflows, and business services in one place.'],
      ['Can dashboards show real-time data?', 'Yes. We can build dashboards with real-time, scheduled, or manually updated data depending on your systems and reporting needs.'],
      ['Can different users see different information?', 'Yes. We can build role-based access so admins, managers, clients, and team members only see the information relevant to them.'],
      ['Can portals integrate with existing software?', 'Yes. We can integrate portals with CRMs, ERPs, analytics tools, databases, payment systems, and custom APIs.'],
    ],
  },
}

export default function WebDevelopmentSubService({ type }) {
  const page = pages[type] || pages.ecommerce

  return (
    <main className="webapp-page wd-sub-page wrap">
      <section className="webapp-hero">
        <div className="webapp-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>›</span>
          <a href="/#services">Services</a>
          <span>›</span>
          <a href="/services/web-development">Web Development</a>
          <span>›</span>
          <strong>{page.label}</strong>
        </div>
        <div className="wd-sub-hero">
          <div>
            <div className="webapp-pill reveal">{page.eyebrow}</div>
            <h1 className="webapp-title reveal reveal-delay-1">
              {page.title} <span>{page.highlight}</span>
            </h1>
            <h2 className="webapp-kicker reveal reveal-delay-2">{page.subtitle}</h2>
            <p className="webapp-lead reveal reveal-delay-3">{page.description}</p>
            <div className="webapp-actions reveal reveal-delay-4">
              <a href="/#contact" className="btn-primary">
                Start a Project <span className="arr">→</span>
              </a>
              <a href="/services/web-development" className="btn-ghost">
                Back to Web Development
              </a>
            </div>
          </div>
          <div className="wd-sub-icon reveal reveal-delay-2">
            <i className={page.icon} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="webapp-features reveal">
        <h2>
          <span>Key</span> Capabilities
        </h2>
        <div className="feature-grid">
          {page.features.map(([icon, title]) => (
            <div className="feature-item" key={title}>
              <i className={icon} aria-hidden="true" />
              <strong>{title}</strong>
              <p>Built around your workflow, users, integrations, performance needs, and long-term business growth.</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceFaq items={page.faqs} />

      <section className="webapp-cta wd-final-cta reveal">
        <div className="webapp-cta-icon">
          <i className={page.icon} aria-hidden="true" />
        </div>
        <div>
          <h2>Ready to Build {page.label}?</h2>
          <p>Share your requirements with us and we will shape them into a fast, secure, scalable digital solution.</p>
        </div>
        <a href="/#contact" className="btn-primary">
          Get a Free Consultation <span className="arr">→</span>
        </a>
      </section>
    </main>
  )
}
