import { useEffect, useState } from 'react'

const heroPillars = [
  ['fa-solid fa-chart-line', 'Live Monitoring', 'Track sales as they happen'],
  ['fa-solid fa-chart-pie', 'Smart Analytics', 'Get insights that matter'],
  ['fa-solid fa-bullseye', 'Better Decisions', 'Make confident, data-driven choices'],
  ['fa-solid fa-arrow-trend-up', 'Higher Growth', 'Optimize strategies and boost profits'],
]

const matters = [
  ['fa-regular fa-eye', 'Monitor revenue as it happens'],
  ['fa-solid fa-arrow-trend-up', 'Track performance in real time'],
  ['fa-solid fa-cart-shopping', 'Spot top-selling products'],
  ['fa-regular fa-user', 'Analyze customer behavior'],
  ['fa-regular fa-building', 'Compare branch & team performance'],
  ['fa-solid fa-arrow-trend-up', 'Forecast trends with accuracy'],
  ['fa-solid fa-rocket', 'Act faster & stay ahead of competitors'],
]

const services = [
  ['fa-solid fa-display', 'Live Sales Dashboards', 'Interactive dashboards with live KPIs, charts & reports.'],
  ['fa-solid fa-gear', 'ERP & CRM Integration', 'Seamlessly connect with your existing business systems.'],
  ['fa-solid fa-envelope-open-text', 'Automated Reporting', 'Schedule and deliver reports automatically.'],
  ['fa-solid fa-chart-line', 'Predictive Analytics', 'Forecast future trends using live and historical data.'],
  ['fa-solid fa-clock-rotate-left', 'Inventory Tracking', 'Monitor stock movement in real time.'],
  ['fa-solid fa-users', 'Customer Insights', 'Understand customer behavior, loyalty & lifetime value.'],
  ['fa-solid fa-people-roof', 'Branch & Team Comparison', 'Compare performance across locations & teams.'],
  ['fa-solid fa-gear', 'Executive KPI Monitoring', 'Track critical KPIs and business health in one place.'],
]

const industries = [
  ['fa-solid fa-store', 'Retail Chains'],
  ['fa-solid fa-briefcase', 'FMCG Brands'],
  ['fa-solid fa-gem', 'Jewellery Businesses'],
  ['fa-solid fa-car', 'Automotive Dealers'],
  ['fa-solid fa-bag-shopping', 'E-Commerce Stores'],
  ['fa-solid fa-shield-heart', 'Healthcare Suppliers'],
  ['fa-solid fa-boxes-stacked', 'Wholesale Distributors'],
  ['fa-solid fa-microchip', 'Consumer Electronics'],
  ['fa-solid fa-industry', 'Manufacturing Companies'],
  ['fa-solid fa-building-user', 'Franchise Networks'],
]

const metrics = [
  'Total Revenue',
  'Top Customers',
  'Net Profit',
  'Sales by Region',
  'Orders & Invoices',
  'Sales by Channel',
  'Average Order Value (AOV)',
  'Return Rate',
  'Gross Margin',
  'Conversion Rate',
  'Top Products',
  'Inventory Turnover',
]

const useCases = [
  ['fa-solid fa-gem', 'Bharathi Jewellers', 'Live Gold & Jewellery Sales Dashboard'],
  ['fa-solid fa-award', 'Vasanth & Co', 'Retail Sales Analytics Across Showrooms'],
  ['fa-solid fa-cart-shopping', 'E-Commerce Brand', 'Real-Time Conversion Tracking'],
  ['fa-solid fa-people-carry-box', 'Distribution Company', 'Territory Sales Performance Monitoring'],
]

const process = [
  ['fa-solid fa-magnifying-glass-chart', '01', 'Discovery', 'Understand your business & goals'],
  ['fa-solid fa-database', '02', 'Data Integration', 'Connect & consolidate your data'],
  ['fa-solid fa-chart-line', '03', 'Dashboard Design', 'Create intuitive & powerful visuals'],
  ['fa-solid fa-gear', '04', 'Automation Setup', 'Configure alerts & scheduled reports'],
  ['fa-solid fa-shield-halved', '05', 'Testing & Validation', 'Ensure accuracy & reliability'],
  ['fa-solid fa-rocket', '06', 'Deployment & Training', 'Launch solution & train your team'],
  ['fa-solid fa-chart-column', '07', 'Ongoing Optimization', 'Improve & scale as your business grows'],
]

function MiniTrendChart() {
  return (
    <div className="sales-chart">
      <svg viewBox="0 0 420 190" role="img" aria-label="Sales trend chart">
        <defs>
          <linearGradient id="salesLine" x1="0" x2="1" y1="0" y2="0">
            <stop stopColor="#74f06b" />
            <stop offset="0.5" stopColor="#00c7ff" />
            <stop offset="1" stopColor="#286dff" />
          </linearGradient>
          <linearGradient id="salesArea" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#76f16d" stopOpacity="0.42" />
            <stop offset="0.62" stopColor="#00b8ff" stopOpacity="0.2" />
            <stop offset="1" stopColor="#061a35" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M12 158 C35 148 43 105 70 114 C91 122 98 154 126 137 C151 120 152 96 181 101 C210 106 219 62 244 66 C270 69 270 152 300 145 C323 139 328 110 353 119 C383 132 391 80 412 76 L412 184 L12 184 Z"
          fill="url(#salesArea)"
        />
        <path
          d="M12 158 C35 148 43 105 70 114 C91 122 98 154 126 137 C151 120 152 96 181 101 C210 106 219 62 244 66 C270 69 270 152 300 145 C323 139 328 110 353 119 C383 132 391 80 412 76"
          fill="none"
          stroke="url(#salesLine)"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <g className="sales-chart-grid">
          {[44, 80, 116, 152].map((y) => <line x1="12" x2="412" y1={y} y2={y} key={y} />)}
          {[70, 126, 181, 244, 300, 353].map((x) => <line x1={x} x2={x} y1="32" y2="184" key={x} />)}
        </g>
      </svg>
      <div className="sales-tooltip">
        <strong>18 May</strong>
        <span>20,45,000</span>
      </div>
    </div>
  )
}

function SalesDashboard() {
  const [activePeriod, setActivePeriod] = useState('This Month');
  const [activeRegion, setActiveRegion] = useState('All');

  const periodMult = { 'Today': 0.04, 'This Week': 0.25, 'This Month': 1, 'This Year': 11.5 };
  
  const regions = [
    { id: 'All', label: 'Global Sales' },
    { id: 'South', label: 'South Region' },
    { id: 'West', label: 'West Region' },
    { id: 'North', label: 'North Region' },
    { id: 'East', label: 'East Region' },
  ];

  const regionData = {
    'All': { rev: 245880000, orders: 24568, cust: 8456, products: [['Gold Necklace', 34520000], ['Diamond Ring', 21540000], ['Gold Bracelet', 18530000], ['Silver Coin', 12560000]], channels: [45, 30, 15, 10] },
    'South': { rev: 98352000, orders: 9820, cust: 3380, products: [['Gold Necklace', 15200000], ['Diamond Ring', 9500000], ['Temple Jewellery', 8500000], ['Gold Bangle', 5500000]], channels: [55, 20, 15, 10] },
    'North': { rev: 49176000, orders: 4910, cust: 1690, products: [['Diamond Ring', 7500000], ['Gold Set', 6200000], ['Platinum Band', 4500000], ['Gold Chain', 3200000]], channels: [35, 40, 15, 10] },
    'East': { rev: 36882000, orders: 3680, cust: 1260, products: [['Gold Bracelet', 5800000], ['Diamond Pendant', 4200000], ['Gold Ring', 3500000], ['Silver Utensils', 2100000]], channels: [40, 35, 20, 5] },
    'West': { rev: 61470000, orders: 6150, cust: 2120, products: [['Diamond Ring', 10500000], ['Platinum Chain', 8500000], ['Gold Coin', 6200000], ['Bridal Set', 5100000]], channels: [30, 45, 20, 5] }
  };

  const curr = regionData[activeRegion];
  const mult = periodMult[activePeriod];

  const fmt = (num) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);

  const statCards = [
    ['Total Revenue', fmt(curr.rev * mult), '+12.5%'],
    ['Total Orders', fmt(curr.orders * mult), '+8.3%'],
    ['New Customers', fmt(curr.cust * mult), '+15.2%'],
  ]

  return (
    <div className="sales-dashboard" aria-label="Sales overview dashboard">
      
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5, 20, 39, 0.8)', padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(0, 180, 216, 0.15)', zIndex: 10, position: 'relative' }}>
        <strong style={{ color: '#fff', fontSize: '13px' }}>Live Analytics View</strong>
        <select 
          value={activePeriod} 
          onChange={(e) => setActivePeriod(e.target.value)}
          style={{
            background: 'rgba(0, 180, 216, 0.1)',
            border: '1px solid rgba(0, 180, 216, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            padding: '6px 12px',
            fontFamily: 'var(--f-label)',
            fontSize: '12px',
            fontWeight: '700',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="Today">Today (Live)</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      <div className="sales-stat-row">
        {statCards.map(([label, value, gain]) => (
          <article className="sales-stat-card" key={label} style={{ animation: 'hReveal 0.4s ease forwards' }}>
            <span>{label}</span>
            <strong><small>&#8377;</small> {value}</strong>
            <em>{gain} <small>vs past {activePeriod.split(' ')[1] || 'period'}</small></em>
          </article>
        ))}
      </div>

      <div className="sales-panel sales-trend-panel">
        <div className="sales-panel-title">Sales Trend ({activePeriod})</div>
        <div style={{ animation: 'hReveal 0.5s ease forwards' }}>
          <MiniTrendChart />
        </div>
      </div>

      <div className="sales-panel sales-channel-panel">
        <div className="sales-panel-title">Sales by Channel</div>
        <div className="sales-donut" aria-hidden="true" style={{
            animation: 'spinWheel 20s linear infinite',
            background: `conic-gradient(
              #286dff 0 ${curr.channels[0]}%,
              #00b8ff ${curr.channels[0]}% ${curr.channels[0] + curr.channels[1]}%,
              #74f06b ${curr.channels[0] + curr.channels[1]}% ${curr.channels[0] + curr.channels[1] + curr.channels[2]}%,
              #ffb22d ${curr.channels[0] + curr.channels[1] + curr.channels[2]}% 100%
            )`
        }} />
        <ul>
          <li style={{ animation: 'hReveal 0.4s ease forwards', animationDelay: '0.1s' }}>Retail Store <b>{curr.channels[0]}%</b></li>
          <li style={{ animation: 'hReveal 0.4s ease forwards', animationDelay: '0.2s' }}>Online Store <b>{curr.channels[1]}%</b></li>
          <li style={{ animation: 'hReveal 0.4s ease forwards', animationDelay: '0.3s' }}>Wholesale <b>{curr.channels[2]}%</b></li>
          <li style={{ animation: 'hReveal 0.4s ease forwards', animationDelay: '0.4s' }}>Others <b>{curr.channels[3]}%</b></li>
        </ul>
      </div>

      <div className="sales-panel sales-products-panel">
        <div className="sales-panel-title">Top Products</div>
        {curr.products.map(([name, amount], index) => (
          <div className="sales-product-row" key={name} style={{ animation: 'hReveal 0.4s ease forwards', animationDelay: `${index * 0.1}s` }}>
            <span>{index + 1}</span>
            <b>{name}</b>
            <em>&#8377; {fmt(amount * mult)}</em>
          </div>
        ))}
      </div>

      <div className="sales-panel sales-region-panel" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
        <div className="sales-panel-title" style={{ marginBottom: '16px' }}>Filter by Region</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegion(reg.id)}
              style={{
                background: activeRegion === reg.id ? 'rgba(0, 180, 216, 0.2)' : 'rgba(5, 20, 39, 0.6)',
                border: `1px solid ${activeRegion === reg.id ? '#00b8ff' : 'rgba(0, 180, 216, 0.1)'}`,
                color: activeRegion === reg.id ? '#fff' : 'var(--white60)',
                padding: '10px 16px',
                borderRadius: '8px',
                fontFamily: 'var(--f-label)',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: activeRegion === reg.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeRegion === reg.id ? '0 0 15px rgba(0, 184, 255, 0.2)' : 'none'
              }}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function RealTimeSales() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="sales-page wrap">
      <section className="sales-hero">
        <div className="sales-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>&gt;</span>
          <a href="/#services">Services</a>
          <span>&gt;</span>
          <strong>Real Time Sales Data Driven Solution</strong>
        </div>

        <div className="sales-hero-grid">
          <div className="sales-hero-copy">
            <div className="sales-pill reveal">Our Service</div>
            <h1 className="sales-title reveal reveal-delay-1">
              Real-Time Sales
              <span>Data Driven Solution</span>
            </h1>
            <h2 className="sales-subtitle reveal reveal-delay-2">
              Live Data. Smarter Decisions. Higher Growth.
            </h2>
            <p className="sales-lead reveal reveal-delay-3">
              We help businesses turn real-time sales data into actionable insights. Monitor performance, track trends,
              and make data-backed decisions that drive revenue and growth.
            </p>

            <div className="sales-pillar-grid reveal reveal-delay-4">
              {heroPillars.map(([icon, title, text]) => (
                <article className="sales-pillar" key={title}>
                  <i className={icon} aria-hidden="true" />
                  <strong>{title}</strong>
                  <span>{text}</span>
                </article>
              ))}
            </div>

            <div className="sales-actions reveal reveal-delay-4">
              <a className="btn-primary" href="#sales-dashboard-demo">
                Explore Dashboard Demo <span className="arr">&rarr;</span>
              </a>
              <a className="btn-ghost" href="/#contact">Talk to Our Experts</a>
            </div>
          </div>

          <div className="sales-hero-visual reveal reveal-delay-2" id="sales-dashboard-demo">
            <SalesDashboard />
          </div>
        </div>
      </section>

      <section className="sales-band sales-matters reveal">
        <div className="sales-section-eyebrow">Why It Matters</div>
        <h2>Why <span>Real-Time Sales Analytics Matters</span></h2>
        <div className="sales-matter-row">
          {matters.map(([icon, title]) => (
            <article className="sales-matter" key={title}>
              <i className={icon} aria-hidden="true" />
              <p>{title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-band sales-services">
        <div className="sales-section-eyebrow">Our <span>Real-Time Sales Data Services</span></div>
        <div className="sales-service-grid">
          {services.map(([icon, title, text]) => (
            <article className="sales-service-card reveal" key={title}>
              <i className={icon} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="/#contact">Learn more <span>&rarr;</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-info-grid">
        <article className="sales-info-panel reveal">
          <h2>Industries <span>We Serve</span></h2>
          <div className="sales-two-col-list">
            {industries.map(([icon, title]) => (
              <div key={title}><i className={icon} aria-hidden="true" /> {title}</div>
            ))}
          </div>
        </article>

        <article className="sales-info-panel reveal reveal-delay-1">
          <h2>Key Metrics <span>We Track</span></h2>
          <div className="sales-two-col-list">
            {metrics.map((item) => (
              <div key={item}><i className="fa-regular fa-circle-check" aria-hidden="true" /> {item}</div>
            ))}
          </div>
        </article>

        <article className="sales-info-panel reveal reveal-delay-2">
          <h2>Example <span>Use Cases</span></h2>
          <div className="sales-use-list">
            {useCases.map(([icon, title, text]) => (
              <div key={title}>
                <i className={icon} aria-hidden="true" />
                <p><strong>{title}</strong><span>{text}</span></p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="sales-band sales-process reveal">
        <div className="sales-section-eyebrow">Our <span>Implementation Process</span></div>
        <div className="sales-process-row">
          {process.map(([icon, step, title, text]) => (
            <article className="sales-process-step" key={title}>
              <i className={icon} aria-hidden="true" />
              <strong><span>{step}</span> {title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-bottom-grid reveal">
        <article className="sales-growth-card">
          <div className="sales-target-art" aria-hidden="true">
            <i className="fa-solid fa-bullseye" />
            <span />
          </div>
          <div>
            <h2>Turn Your <span>Sales Data</span><br />Into Business Growth</h2>
            <p>Get a custom real-time analytics solution tailored to your business needs.</p>
          </div>
          <div className="sales-result-stats">
            <strong>500+ <span>Dashboards Delivered</span></strong>
            <strong>50+ <span>Happy Clients</span></strong>
            <strong>99% <span>Data Accuracy Assured</span></strong>
            <strong>24/7 <span>Dedicated Support</span></strong>
          </div>
        </article>

        <article className="sales-consult-card">
          <h2>Ready to Get Real-Time Business Insights?</h2>
          <a className="btn-primary" href="/#contact">Book a Free Consultation <span className="arr">&rarr;</span></a>
          <p><i className="fa-regular fa-circle-check" aria-hidden="true" /> No obligation. Just better insights.</p>
        </article>
      </section>
    </main>
  )
}