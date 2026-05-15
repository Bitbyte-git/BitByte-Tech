import { useEffect, useState } from "react";
import ServiceFaq from "./ServiceFaq";

const analyticsServices = [
  [
    "fa-solid fa-gauge-high",
    "Business Intelligence Dashboards",
    "Custom BI dashboards that bring your most important KPIs, revenue metrics, operational data, and team performance into one clear, interactive, real-time reporting experience.",
  ],
  [
    "fa-solid fa-chart-column",
    "Data Analytics & Reporting",
    "Structured analytics reports that turn raw business data into meaningful insights, helping you understand trends, performance gaps, growth opportunities, and decision-making priorities.",
  ],
  [
    "fa-solid fa-sack-dollar",
    "Sales & Revenue Analytics",
    "Revenue-focused analytics that help you track sales performance, conversion rates, customer value, revenue channels, product demand, and business growth patterns.",
  ],
  [
    "fa-solid fa-users-viewfinder",
    "Customer & Marketing Analytics",
    "Customer behavior analytics, audience insights, campaign performance tracking, and engagement reports designed to improve marketing decisions and customer retention.",
  ],
  [
    "fa-solid fa-gears",
    "Operations & Workflow Analytics",
    "Operational analytics that identify process bottlenecks, productivity gaps, workflow inefficiencies, and automation opportunities across your business systems.",
  ],
  [
    "fa-solid fa-brain",
    "Predictive Analytics & Forecasting",
    "AI-assisted forecasting models that help estimate future sales, demand, customer behavior, inventory needs, and growth opportunities using historical and real-time data.",
  ],
  [
    "fa-solid fa-bullseye",
    "KPI Tracking & Performance Measurement",
    "Goal-focused KPI systems that help leadership teams monitor progress, measure performance, compare results, and stay aligned with strategic business targets.",
  ],
  [
    "fa-solid fa-diagram-project",
    "Data Integration & Automation",
    "Connected data pipelines and automated reporting systems that integrate CRM, sales, marketing, finance, website, and operational tools into a reliable analytics ecosystem.",
  ],
];

const analyticsFeatures = [
  ["fa-solid fa-chart-pie", "Custom Analytics Dashboards"],
  ["fa-solid fa-clock", "Real-Time Performance Tracking"],
  ["fa-solid fa-database", "Data Integration & Automation"],
  ["fa-solid fa-brain", "Predictive Business Insights"],
  ["fa-solid fa-bullseye", "KPI-Focused Growth Strategy"],
  ["fa-solid fa-filter-circle-dollar", "Revenue & Sales Intelligence"],
  ["fa-solid fa-shield-halved", "Secure Data Handling"],
  ["fa-solid fa-arrow-trend-up", "Smarter Decision-Making"],
];

const analyticsIndustries = [
  ["fa-solid fa-cart-shopping", "Ecommerce"],
  ["fa-solid fa-building", "Real Estate"],
  ["fa-solid fa-hospital", "Healthcare"],
  ["fa-solid fa-graduation-cap", "Education"],
  ["fa-solid fa-sack-dollar", "Finance"],
  ["fa-solid fa-boxes-stacked", "Retail"],
  ["fa-solid fa-industry", "Manufacturing"],
  ["fa-solid fa-plane-departure", "Travel"],
  ["fa-solid fa-laptop-code", "SaaS"],
  ["fa-solid fa-briefcase", "Enterprise"],
];

const analyticsFaqs = [
  [
    "What is business analytics?",
    "Business analytics is the process of collecting, organizing, analyzing, and visualizing business data to understand performance, identify opportunities, reduce risk, and make smarter strategic decisions.",
  ],
  [
    "Why is business analytics important for growing companies?",
    "Business analytics helps companies track what is working, Requirement Gathering what needs improvement, forecast future performance, optimize operations, and make decisions based on data instead of guesswork.",
  ],
  [
    "What types of dashboards can you build?",
    "We build sales dashboards, marketing dashboards, finance dashboards, executive dashboards, operations dashboards, customer analytics dashboards, inventory dashboards, and custom KPI dashboards based on your workflow.",
  ],
  [
    "Can you connect data from different tools and platforms?",
    "Yes. We can connect data from CRM systems, spreadsheets, websites, ecommerce platforms, ad accounts, accounting tools, databases, APIs, and business management systems into one analytics experience.",
  ],
  [
    "Do you provide real-time reporting?",
    "Yes. We can create real-time or scheduled reporting dashboards depending on your data sources, business needs, and reporting frequency requirements.",
  ],
  [
    "How does predictive analytics help a business?",
    "Predictive analytics uses historical and current data to forecast outcomes such as sales trends, customer demand, revenue growth, inventory needs, and campaign performance so teams can plan ahead.",
  ],
  [
    "Can business analytics improve sales and marketing performance?",
    "Yes. Analytics helps identify high-performing channels, customer segments, conversion bottlenecks, campaign ROI, sales trends, and growth opportunities that can improve leads, revenue, and profitability.",
  ],
  [
    "Is business analytics useful for small businesses?",
    "Yes. Small businesses can use analytics to track revenue, customers, campaigns, expenses, inventory, team performance, and growth opportunities without relying on complex enterprise systems.",
  ],
  [
    "Do you customize analytics solutions for each business?",
    "Yes. Every analytics solution is customized around your industry, goals, data sources, KPIs, team workflow, reporting needs, and decision-making process.",
  ],
  [
    "Why choose BitByte Technologies for business analytics?",
    "BitByte Technologies combines data strategy, dashboard design, automation, AI-powered insights, and business growth thinking to help companies turn data into clear decisions and measurable outcomes.",
  ],
];

function AnalyticsDashboard() {
  const [activePeriod, setActivePeriod] = useState('This Month');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', icon: 'fa-solid fa-globe', label: 'Overview', color: '#00b4d8' },
    { id: 'Sales', icon: 'fa-solid fa-sack-dollar', label: 'Sales', color: '#9af75a' },
    { id: 'Marketing', icon: 'fa-solid fa-bullhorn', label: 'Marketing', color: '#ffb22d' },
    { id: 'Operations', icon: 'fa-solid fa-gears', label: 'Operations', color: '#8c3cff' },
    { id: 'Customers', icon: 'fa-solid fa-users', label: 'Customers', color: '#ff6b3d' },
  ];

  const periodMultipliers = { 'This Month': 1, 'Last Month': 0.85, 'This Year': 9.5 };

  const baseData = {
    'All': { rev: 284.6, conv: 8.72, forecast: 356, eff: 92, bars: [46, 72, 54, 88, 64, 96, 78], score: 86, insights: ["Top product demand up 24%", "Customer retention improved 18%", "Ad spend efficiency increased 31%"] },
    'Sales': { rev: 195.4, conv: 12.4, forecast: 245, eff: 88, bars: [60, 80, 40, 90, 75, 100, 85], score: 92, insights: ["B2B sales cycle shortened by 12%", "Average order value up 15%", "Q3 targets already at 85%"] },
    'Marketing': { rev: 89.2, conv: 4.8, forecast: 111, eff: 76, bars: [30, 45, 60, 50, 70, 85, 65], score: 78, insights: ["CPA decreased by 22%", "Organic traffic grew 35%", "Email open rates reached 28%"] },
    'Operations': { rev: 0, conv: 0, forecast: 0, eff: 96, bars: [80, 82, 85, 88, 90, 92, 95], score: 94, insights: ["Fulfillment time down by 2 hrs", "Supply chain costs reduced 8%", "Server uptime at 99.99%"] },
    'Customers': { rev: 0, conv: 0, forecast: 0, eff: 85, bars: [50, 55, 65, 60, 75, 80, 90], score: 88, insights: ["NPS score increased to 72", "Support ticket resolution faster", "Churn rate dropped by 2%"] },
  };

  const currentBase = baseData[activeCategory] || baseData['All'];
  const mult = periodMultipliers[activePeriod];

  const formatMoney = (num) => (num >= 1000 ? '$' + (num / 1000).toFixed(1) + 'M' : '$' + num.toFixed(1) + 'K');

  const currentStats = [
    ["Revenue", currentBase.rev > 0 ? formatMoney(currentBase.rev * mult) : "N/A", currentBase.rev > 0 ? "+21.4%" : "-"],
    ["Conversion", currentBase.conv > 0 ? (currentBase.conv * (mult === 1 ? 1 : 1.1)).toFixed(2) + "%" : "N/A", currentBase.conv > 0 ? "+12.8%" : "-"],
    ["Forecast", currentBase.forecast > 0 ? formatMoney(currentBase.forecast * mult) : "N/A", currentBase.forecast > 0 ? "+18.2%" : "-"],
    ["Efficiency", Math.min(100, Math.round(currentBase.eff * (mult === 0.85 ? 0.95 : 1))) + "%", "+9.6%"],
  ];

  return (
    <div
      className="ba-dashboard reveal reveal-delay-2"
      aria-label="Business analytics dashboard mockup"
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <div className="ba-dashboard-head" style={{ marginBottom: 0 }}>
        <div>
          <span>Business Intelligence</span>
          <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeCategory !== 'All' && <i className={categories.find(c => c.id === activeCategory)?.icon} style={{ color: categories.find(c => c.id === activeCategory)?.color }}></i>}
            {activeCategory === 'All' ? 'Executive' : activeCategory} Analytics
          </strong>
        </div>
        <select 
          value={activePeriod} 
          onChange={(e) => setActivePeriod(e.target.value)}
          style={{
            background: 'rgba(3, 15, 35, 0.55)',
            border: '1px solid rgba(0, 180, 216, 0.12)',
            borderRadius: '18px',
            color: '#fff',
            padding: '6px 12px',
            fontFamily: 'var(--f-label)',
            fontSize: '12px',
            fontWeight: '700',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>
      <div className="ba-stat-grid" style={{ marginBottom: 0 }}>
        {currentStats.map(([label, value, gain]) => (
          <div className="ba-stat-card" key={label} style={{ animation: 'hReveal 0.4s ease forwards' }}>
            <small>{label}</small>
            <b>{value}</b>
            <em style={{ color: gain === '-' ? 'var(--white60)' : '#9af75a' }}>{gain !== '-' ? '▲ ' : ''}{gain}</em>
          </div>
        ))}
      </div>
      <div className="ba-visual-grid" style={{ marginBottom: 0 }}>
        <div className="ba-bar-panel">
          <strong>Performance by Segment</strong>
          <div className="ba-bars">
            {currentBase.bars.map((height, index) => (
              <span style={{ height: `${Math.max(10, height * (mult === 0.85 ? 0.8 : 1))}%`, transition: 'height 0.4s ease' }} key={index} />
            ))}
          </div>
        </div>
        <div className="ba-score-panel">
          <strong>Growth Score</strong>
          <div className="ba-score-ring">
            <span style={{ animation: 'hReveal 0.4s ease forwards' }}>{Math.min(99, Math.round(currentBase.score * (mult === 0.85 ? 0.9 : 1)))}%</span>
          </div>
          <p>High growth readiness</p>
        </div>
      </div>
      <div className="ba-insight-list" style={{ marginBottom: '8px' }}>
        {currentBase.insights.map((item) => (
          <div key={item} style={{ animation: 'hReveal 0.4s ease forwards' }}>
            <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ color: categories.find(c => c.id === activeCategory)?.color || '#9af75a' }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--white60)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
        Filter by Department:
      </div>
      <div className="dm-channel-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px', padding: '12px 16px', background: 'rgba(5, 20, 39, 0.68)', border: '1px solid rgba(0, 180, 216, 0.12)', borderRadius: '12px' }}>
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.id)}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: activeCategory === cat.id ? 'rgba(0, 180, 216, 0.15)' : 'transparent',
              border: `1px solid ${activeCategory === cat.id ? 'rgba(0, 180, 216, 0.4)' : 'transparent'}`,
              transform: activeCategory === cat.id ? 'scale(1.05)' : 'scale(1)'
            }} 
            onMouseEnter={(e) => { if(activeCategory !== cat.id) e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }} 
            onMouseLeave={(e) => { if(activeCategory !== cat.id) e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent' }}
          >
            <i className={cat.icon} style={{ color: cat.color, fontSize: '18px', filter: activeCategory === cat.id ? `drop-shadow(0 0 8px ${cat.color})` : 'none' }} aria-hidden="true" />
            <span style={{ fontSize: '10px', color: activeCategory === cat.id ? '#fff' : 'var(--white60)', fontFamily: 'var(--f-label)', fontWeight: 700 }}>{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataVisual() {
  return (
    <div className="ba-data-visual" aria-hidden="true">
      <div className="ba-data-core">
        <i className="fa-solid fa-chart-simple" />
      </div>
      <span className="ba-node node-a">
        <i className="fa-solid fa-database" />
      </span>
      <span className="ba-node node-b">
        <i className="fa-solid fa-filter" />
      </span>
      <span className="ba-node node-c">
        <i className="fa-solid fa-brain" />
      </span>
      <span className="ba-node node-d">
        <i className="fa-solid fa-arrow-trend-up" />
      </span>
    </div>
  );
}

export default function BusinessAnalyticsSolutions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="webapp-page ba-page wrap">
      <section className="dm-hero ba-hero">
        <div className="webapp-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>›</span>
          <a href="/#services">Services</a>
          <span>›</span>
          <strong>Business Analytics</strong>
        </div>
        <div className="dm-hero-grid">
          <div className="dm-hero-copy">
            <div className="webapp-pill reveal">Business Analytics</div>
            <h1 className="webapp-title dm-title reveal reveal-delay-1">
              Data-Driven<br />
              <span>Business Analytics</span>
            </h1>
            <h2 className="webapp-kicker reveal reveal-delay-2">
              Clear Insights. Better Decisions. Faster Business Performance.
            </h2>
            <p className="webapp-lead reveal reveal-delay-3">
              We help businesses transform scattered data into clear, actionable
              insights through custom dashboards, automated reports, predictive
              analytics, KPI tracking, and growth intelligence designed to
              improve decisions, performance, and long-term business success.
            </p>
            <div className="webapp-actions reveal reveal-delay-4">
              <a href="/#contact" className="btn-primary">
                Get Free Consultation <span className="arr">→</span>
              </a>
              <a href="#ba-services" className="btn-ghost">
                Explore Analytics Services
              </a>
            </div>
          </div>
          <AnalyticsDashboard />
        </div>
      </section>

      <section className="dm-about ba-about reveal">
        <DataVisual />
        <div>
          <div className="service-section-eyebrow">
            About Business Analytics
          </div>
          <h2>Turn Business Data into Actionable Intelligence</h2>
          <p>
            Our business analytics solutions combine data visualization,
            automation, AI-assisted insights, performance reporting, and
            strategic analysis to help businesses understand what is happening,
            why it is happening, and what to do next. From executive dashboards
            and revenue analytics to customer behavior insights and operational
            reporting, we build analytics systems that make decision-making
            faster, clearer, and more reliable.
          </p>
        </div>
      </section>

      <section className="dm-services-section" id="ba-services">
        <div className="service-section-eyebrow center reveal">
          Our Analytics Solutions
        </div>
        <h2 className="dm-section-title reveal reveal-delay-1">
          Business Analytics Services
        </h2>
        <div className="dm-service-grid ba-service-grid">
          {analyticsServices.map(([icon, title, text], index) => (
            <article
              className={`dm-service-card ba-service-card reveal reveal-delay-${(index % 4) + 1}`}
              key={title}
            >
              <i className={icon} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dm-why reveal">
        <div className="service-section-eyebrow center">Why Choose</div>
        <h2 className="dm-section-title">Why Choose BitByte Technologies?</h2>
        <div className="dm-why-grid">
          {analyticsFeatures.map(([icon, title]) => (
            <div className="dm-why-card ba-why-card" key={title}>
              <i className={icon} aria-hidden="true" />
              <strong>{title}</strong>
            </div>
          ))}
        </div>
        <p>
          We combine data engineering, analytics strategy, automation, dashboard
          design, and business growth thinking to help companies turn complex
          data into simple decisions. Our analytics solutions are built to
          improve visibility, reduce guesswork, measure performance, and uncover
          opportunities across every part of your business.
        </p>
      </section>

      <section className="dm-industries reveal">
        <div className="service-section-eyebrow center">
          Industries We Serve
        </div>
        <p>
          We provide customized business analytics solutions for ecommerce
          companies, real estate teams, healthcare providers, educational
          institutions, finance teams, retail businesses, manufacturing
          operations, travel companies, SaaS platforms, and enterprise
          organizations.
        </p>
        <div className="dm-industry-grid">
          {analyticsIndustries.map(([icon, title]) => (
            <div className="dm-industry-card" key={title}>
              <i className={icon} aria-hidden="true" />
              <strong>{title}</strong>
            </div>
          ))}
        </div>
      </section>

      <ServiceFaq items={analyticsFaqs} />

      <section className="webapp-cta ba-final-cta reveal">
        <div className="webapp-cta-icon">
          <i className="fa-solid fa-chart-line" aria-hidden="true" />
        </div>
        <div>
          <h2>Ready to Turn Your Business Data into Growth Intelligence?</h2>
          <p>
            Build smarter dashboards, automate reporting, track performance,
            uncover opportunities, and make better business decisions with
            custom analytics solutions designed for modern growth-focused
            companies.
          </p>
        </div>
        <a href="/#contact" className="btn-primary">
          Start Your Analytics Journey <span className="arr">→</span>
        </a>
      </section>
    </main>
  );
}
