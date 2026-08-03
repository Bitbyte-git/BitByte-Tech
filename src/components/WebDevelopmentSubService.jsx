import { useState } from 'react'
import ServiceFaq from './ServiceFaq'

const pages = {
  ecommerce: {
    label: 'E-Commerce Solutions',
    eyebrow: 'Web App Development',
    title: 'E-Commerce',
    highlight: 'Solutions',
    subtitle: 'Secure Online Stores Built to Sell More',
    description:
      'We build powerful e-commerce platforms with fast product Requirement Gathering, smooth checkout experiences, secure payments, inventory workflows, and scalable architecture designed to grow with your business.',
    icon: 'fa-solid fa-cart-shopping',
    color: '#f59e0b',
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
      ['Can you help improve conversions?', 'Yes. We focus on fast loading, clear navigation, product Requirement Gathering, trust signals, checkout optimization, and analytics to improve conversion performance.'],
    ],
  },
  portals: {
    label: 'Web Portals & Dashboards',
    eyebrow: 'Web App Development',
    title: 'Web Portals &',
    highlight: 'Dashboards',
    subtitle: 'Centralized Platforms for Teams, Clients, and Data',
    description:
      'We design and develop secure portals and interactive dashboards that simplify workflows, centralize information, visualize business data, and help teams make faster decisions.',
    icon: 'fa-solid fa-chart-simple',
    color: '#8b5cf6',
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

function EcommerceFloatingMockup() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 20
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -20
    setTilt({ x, y })
  }

  return (
    <div 
      className="ecom-mockup-stage reveal reveal-delay-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        '--tilt-x': `${tilt.x}deg`,
        '--tilt-y': `${tilt.y}deg`,
      }}
    >
      <style>{`
        .ecom-mockup-stage {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          width: 100%;
        }
        .ecom-cart-bg {
          position: absolute;
          font-size: 340px;
          color: rgba(0, 180, 216, 0.04);
          z-index: 0;
          transform: translateX(20px) translateY(-20px);
          pointer-events: none;
        }
        .ecom-center-phone {
          position: relative;
          width: 240px;
          height: 480px;
          background: linear-gradient(180deg, #0f172a, #020617);
          border: 12px solid #1e293b;
          border-radius: 36px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255,255,255,0.08);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          transform: rotateX(calc(var(--tilt-y, 0) * 0.8)) rotateY(calc(var(--tilt-x, 0) * 0.8));
          transition: transform 0.2s ease-out;
          transform-style: preserve-3d;
        }
        .ecom-phone-headphone {
          font-size: 72px;
          color: #0ea5e9;
          margin-bottom: 32px;
          filter: drop-shadow(0 0 24px rgba(14, 165, 233, 0.5));
          transform: translateZ(30px);
        }
        .ecom-phone-title {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          text-align: center;
          margin-bottom: 12px;
          transform: translateZ(20px);
        }
        .ecom-phone-price {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 20px;
          transform: translateZ(20px);
        }
        .ecom-phone-stars {
          display: flex;
          gap: 6px;
          color: #22c55e;
          font-size: 13px;
          transform: translateZ(20px);
        }
        
        .wrapper-1 { position: absolute; top: 12%; left: 0%; animation: float1 6s ease-in-out infinite; z-index: 3; }
        .wrapper-2 { position: absolute; top: 5%; right: -10%; animation: float2 7s ease-in-out infinite; z-index: 3; }
        .wrapper-3 { position: absolute; top: 48%; left: -15%; animation: float3 8s ease-in-out infinite; z-index: 3; }
        .wrapper-4 { position: absolute; top: 55%; right: -15%; animation: float1 7s ease-in-out infinite reverse; z-index: 3; }
        .wrapper-5 { position: absolute; bottom: 8%; right: 10%; animation: float2 6s ease-in-out infinite reverse; z-index: 3; }
        
        .ecom-floating-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          padding: 14px 20px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease-out;
        }
        .ecom-floating-card i {
          font-size: 18px;
          color: #fff;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .ecom-floating-card span {
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          max-width: 100px;
          line-height: 1.35;
        }

        .card-1 { transform: rotateX(calc(var(--tilt-y) * 1.5)) rotateY(calc(var(--tilt-x) * 1.5)) translateZ(40px); }
        .card-2 { transform: rotateX(calc(var(--tilt-y) * 1.2)) rotateY(calc(var(--tilt-x) * 1.2)) translateZ(50px); }
        .card-3 { transform: rotateX(calc(var(--tilt-y) * 1.8)) rotateY(calc(var(--tilt-x) * 1.8)) translateZ(60px); }
        .card-4 { transform: rotateX(calc(var(--tilt-y) * 1.3)) rotateY(calc(var(--tilt-x) * 1.3)) translateZ(30px); }
        .card-5 { transform: rotateX(calc(var(--tilt-y) * 1.6)) rotateY(calc(var(--tilt-x) * 1.6)) translateZ(45px); }

        .ecom-pulse-dot {
          position: absolute;
          top: 49%;
          left: 22%;
          width: 12px;
          height: 12px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          animation: pulse-green 2s infinite;
          z-index: 1;
        }
        .ecom-pulse-dot::before {
          content: "";
          position: absolute;
          inset: -8px;
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 50%;
        }

        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        
        @media (max-width: 1180px) {
          .wrapper-2 { right: -5%; }
          .wrapper-4 { right: -5%; }
        }
        
        @media (max-width: 820px) {
          .ecom-mockup-stage { min-height: 400px; transform: scale(0.85); }
          .wrapper-1 { left: -10%; }
          .wrapper-3 { left: -25%; }
        }
      `}</style>
      
      <i className="fa-solid fa-cart-shopping ecom-cart-bg" />

      <div className="ecom-center-phone">
        <i className="fa-solid fa-headphones ecom-phone-headphone" />
        <div className="ecom-phone-title">Wireless<br />Headphones</div>
        <div className="ecom-phone-price">$129.99</div>
        <div className="ecom-phone-stars">
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
        </div>
      </div>

      <div className="ecom-float-wrapper wrapper-1">
        <div className="ecom-floating-card card-1">
          <i className="fa-solid fa-shield-halved" />
          <span>Secure<br/>Payments</span>
        </div>
      </div>
      
      <div className="ecom-float-wrapper wrapper-2">
        <div className="ecom-floating-card card-2">
          <i className="fa-solid fa-credit-card" />
          <span>Multiple<br/>Payment Options</span>
        </div>
      </div>

      <div className="ecom-float-wrapper wrapper-3">
        <div className="ecom-floating-card card-3">
          <i className="fa-solid fa-boxes-stacked" />
          <span>Inventory<br/>Management</span>
        </div>
      </div>

      <div className="ecom-float-wrapper wrapper-4">
        <div className="ecom-floating-card card-4">
          <i className="fa-solid fa-truck-fast" />
          <span>Fast & Reliable<br/>Shipping</span>
        </div>
      </div>

      <div className="ecom-float-wrapper wrapper-5">
        <div className="ecom-floating-card card-5">
          <i className="fa-solid fa-chart-line" />
          <span>Sales<br/>Analytics</span>
        </div>
      </div>

      <div className="ecom-pulse-dot" />
    </div>
  )
}

function InteractiveMockup({ type }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [activeView, setActiveView] = useState('one')

  const viewsData = {
    ecommerce: {
      one: {
        title: 'Recent Orders',
        icon: 'fa-solid fa-box-open',
        stats: [['New Orders', '124', '+12%'], ['Revenue', '$12k', '+8%'], ['Avg Value', '$95', '+5%'], ['Returns', '2', '-1%']],
        list: ['Order #4092 - MacPro', 'Order #4091 - AirPods', 'Order #4090 - iPad']
      },
      two: {
        title: 'Inventory Sync',
        icon: 'fa-solid fa-boxes-stacked',
        stats: [['In Stock', '4,230', '+2%'], ['Low Stock', '12', '-4%'], ['Out of Stock', '3', '-1%'], ['Categories', '24', '0%']],
        list: ['MacBook Pro 14" - 24 left', 'iPhone 15 Case - 5 left', 'USB-C Cable - 120 left']
      },
      three: {
        title: 'Customer Data',
        icon: 'fa-solid fa-users',
        stats: [['Total Users', '12k', '+18%'], ['Active Now', '342', '+5%'], ['Returning', '48%', '+2%'], ['New Signups', '84', '+10%']],
        list: ['Alex Morgan - $1,200', 'Sam Smith - $450', 'Jordan Lee - $3,400']
      }
    },
    portals: {
      one: {
        title: 'Main Dashboard',
        icon: 'fa-solid fa-chart-pie',
        stats: [['Active Users', '1,204', '+12%'], ['Sessions', '8,402', '+24%'], ['Bounce Rate', '22%', '-5%'], ['Tasks', '84', '+8%']],
        list: ['Quarterly Report.pdf', 'Team Workflow Sync', 'Project Alpha Setup']
      },
      two: {
        title: 'Data Reports',
        icon: 'fa-solid fa-file-invoice',
        stats: [['Generated', '342', '+18%'], ['Downloads', '1,204', '+14%'], ['Scheduled', '12', '+0%'], ['Errors', '0', '-2%']],
        list: ['Financial_Q3.csv', 'User_Metrics_Oct.pdf', 'Sales_Pipeline.xlsx']
      },
      three: {
        title: 'Access Control',
        icon: 'fa-solid fa-shield-halved',
        stats: [['Admins', '4', '0%'], ['Editors', '24', '+2%'], ['Viewers', '142', '+12%'], ['Pending', '3', '-1%']],
        list: ['Role: Admin Assigned', 'Role: Viewer Updated', 'New Policy Enforced']
      }
    }
  }

  const currentTypeViews = viewsData[type] || viewsData.ecommerce
  const currentView = currentTypeViews[activeView] || currentTypeViews.one

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10
    setTilt({ x, y })
  }

  return (
    <div 
      className="webapp-device-stage" 
      aria-label="Interactive application mockup"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        '--tilt-x': `${tilt.x}deg`,
        '--tilt-y': `${tilt.y}deg`,
      }}
    >
      <div className="webapp-laptop">
        <div className="webapp-laptop-screen">
          <div className="dash-sidebar">
            {Object.entries(currentTypeViews).map(([key, view]) => (
              <span 
                key={key} 
                onClick={() => setActiveView(key)}
                title={view.title}
                style={{ 
                  cursor: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: activeView === key ? 'rgba(0, 180, 216, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                  color: activeView === key ? '#00b4d8' : 'rgba(255, 255, 255, 0.4)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeView === key ? 'scale(1.15)' : 'scale(1)'
                }}
              >
                <i className={view.icon} style={{ fontSize: '13px' }} aria-hidden="true" />
              </span>
            ))}
          </div>
          <div className="dash-main">
            <div className="dash-topline">
              <strong>{currentView.title}</strong>
              <span />
            </div>
            <div className="dash-stats">
              {currentView.stats.map(([label, value, gain], index) => (
                <div className="dash-stat" key={`${label}-${activeView}`} style={{ animation: `hReveal 0.4s ${index * 0.1}s ease forwards`, opacity: 0 }}>
                  <small>{label}</small>
                  <b>{value}</b>
                  <em style={{ color: gain.startsWith('-') ? '#ff4d4d' : '#9af75a' }}>{gain}</em>
                </div>
              ))}
            </div>
            <div className="dash-body">
              <div className="dash-chart" key={`chart-${activeView}`}>
                <span className="chart-line line-a" style={{ animation: 'hReveal 0.4s 0.2s ease forwards', opacity: 0 }} />
                <span className="chart-line line-b" style={{ animation: 'hReveal 0.4s 0.3s ease forwards', opacity: 0 }} />
                <span className="chart-line line-c" style={{ animation: 'hReveal 0.4s 0.4s ease forwards', opacity: 0 }} />
                <span className="chart-line line-d" style={{ animation: 'hReveal 0.4s 0.5s ease forwards', opacity: 0 }} />
                <span className="chart-line line-e" style={{ animation: 'hReveal 0.4s 0.6s ease forwards', opacity: 0 }} />
              </div>
              <div className="dash-list">
                {currentView.list.map((name, index) => (
                  <div className="dash-row" key={`${name}-${activeView}`} style={{ animation: `hReveal 0.4s ${index * 0.1}s ease forwards`, opacity: 0 }}>
                    <i />
                    <span>{name}</span>
                    <b>{type === 'ecommerce' ? '$' + (Math.random() * 100 + 50).toFixed(2) : 'Active'}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="webapp-laptop-base" />
      </div>

      <div className="webapp-phone">
        <div className="phone-speaker" />
        <div className="phone-title" key={`title-${activeView}`} style={{ animation: 'hReveal 0.3s ease forwards', opacity: 0 }}>{currentView.title}</div>
        <div className="phone-card" key={`card-${activeView}`} style={{ animation: 'hReveal 0.4s 0.1s ease forwards', opacity: 0 }}>
          <small>{currentView.stats[1][0]}</small>
          <b>{currentView.stats[1][1]}</b>
          <div className="phone-chart">
            <span style={{ animation: 'hReveal 0.4s 0.2s ease forwards', opacity: 0 }} />
            <span style={{ animation: 'hReveal 0.4s 0.3s ease forwards', opacity: 0 }} />
            <span style={{ animation: 'hReveal 0.4s 0.4s ease forwards', opacity: 0 }} />
            <span style={{ animation: 'hReveal 0.4s 0.5s ease forwards', opacity: 0 }} />
            <span style={{ animation: 'hReveal 0.4s 0.6s ease forwards', opacity: 0 }} />
          </div>
        </div>
        <div className="phone-products" key={`prods-${activeView}`} style={{ animation: 'hReveal 0.4s 0.2s ease forwards', opacity: 0 }}>
          <small>Recent Activity</small>
          <div />
          <div />
        </div>
      </div>
      
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-12px',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          borderRadius: '28px',
          border: '1px solid rgba(0, 212, 255, 0.16)',
          background: 'rgba(8, 22, 42, 0.86)',
          padding: '12px 22px',
          color: '#fff',
          zIndex: 9,
          boxShadow: '0 18px 46px rgba(0, 0, 0, 0.34)',
          backdropFilter: 'blur(12px)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          fontWeight: 600,
          pointerEvents: 'none',
          animation: 'hReveal 0.8s 1s both'
        }}
      >
        <i className="fa-solid fa-hand-pointer" style={{ color: '#00d4ff', fontSize: '18px' }} />
        <span>Click sidebar icons to switch apps</span>
      </div>
    </div>
  )
}

export default function WebDevelopmentSubService({ type }) {
  const page = pages[type] || pages.ecommerce

  return (
    <main className="webapp-page wd-sub-page wrap">
      <section className="webapp-hero">
        <div className="webapp-breadcrumb reveal">
          <a href="/#hero" title="Go to home">Home</a>
          <span>›</span>
          <a href="/#services" title="Go to home">Services</a>
          <span>›</span>
          <a href="/services/web-development" title="Go to services web development">Web App Development</a>
          <span>›</span>
          <strong>{page.label}</strong>
        </div>
        <div className="webapp-hero-grid">
          <div className="webapp-hero-copy">
            <div className="webapp-pill reveal">{page.eyebrow}</div>
            <h1 className="webapp-title reveal reveal-delay-1">
              {page.title} <span>{page.highlight}</span>
            </h1>
            <h2 className="webapp-kicker reveal reveal-delay-2">{page.subtitle}</h2>
            <p className="webapp-lead reveal reveal-delay-3">{page.description}</p>
            <div className="webapp-actions reveal reveal-delay-4">
              <a href="/#contact" className="btn-primary" title="Go to home">
                Start a Project <span className="arr">→</span>
              </a>
              <a href="/services/web-development" className="btn-ghost" title="Go to services web development">
                Back to Web App Development
              </a>
            </div>
          </div>
          {type === 'ecommerce' ? <EcommerceFloatingMockup /> : <InteractiveMockup type={type} />}
        </div>
      </section>

      <section className="webapp-features reveal">
        <h2>
          <span>Key</span> Capabilities
        </h2>
        <div className="feature-grid">
          {page.features.map(([icon, title]) => (
            <div className="feature-item" key={title}>
              <i className={icon} style={{ color: page.color }} aria-hidden="true" />
              <strong>{title}</strong>
              <p>Built around your workflow, users, integrations, performance needs, and long-term business growth.</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceFaq items={page.faqs} />

      <section className="webapp-cta wd-final-cta reveal">
        <div className="webapp-cta-icon" style={{ background: `${page.color}15`, border: `1px solid ${page.color}30` }}>
          <i className={page.icon} style={{ color: page.color }} aria-hidden="true" />
        </div>
        <div>
          <h2>Ready to Build {page.label}?</h2>
          <p>Share your requirements with us and we will shape them into a fast, secure, scalable digital solution.</p>
        </div>
        <a href="/#contact" className="btn-primary" title="Go to home">
          Get a Free Consultation <span className="arr">→</span>
        </a>
      </section>
    </main>
  )
}
