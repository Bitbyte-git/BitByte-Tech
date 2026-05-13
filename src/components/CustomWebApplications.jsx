import ServiceFaq from './ServiceFaq'

const buildItems = [
  ['fa-solid fa-diagram-project', 'Business Management Systems', 'CRM, HRM, inventory, project management'],
  ['fa-solid fa-user-lock', 'Customer Portals', 'Client portals, dashboards, and self-service systems'],
  ['fa-solid fa-store', 'Marketplace & Booking Platforms', 'Multi-vendor, booking, and reservation systems'],
  ['fa-solid fa-cubes', 'SaaS Applications', 'Scalable SaaS products for startups and enterprises'],
  ['fa-solid fa-gears', 'Workflow Automation Tools', 'Custom tools to automate and simplify operations'],
  ['fa-solid fa-code-branch', 'API Integrations', 'Third-party API integrations and custom APIs'],
]

const processSteps = [
  ['fa-solid fa-magnifying-glass', '01', 'Discovery', 'We understand your requirements and goals.'],
  ['fa-regular fa-calendar-days', '02', 'Planning', 'We create a roadmap and project plan.'],
  ['fa-solid fa-pen-nib', '03', 'Design', 'UI/UX design focused on user experience.'],
  ['fa-solid fa-code', '04', 'Development', 'We build with clean, scalable code.'],
  ['fa-solid fa-bug-slash', '05', 'Testing', 'Rigorous testing for bug-free performance.'],
  ['fa-solid fa-shield-halved', '06', 'Deployment', 'We deploy and ensure smooth launch.'],
  ['fa-solid fa-headset', '07', 'Support', 'Ongoing support and continuous improvement.'],
]

const pythonTech = [
  ['fab fa-python', 'Python'],
  ['dev-text', 'dj', 'Django'],
  ['dev-text', 'Fl', 'Flask'],
  ['fa-solid fa-database', 'PostgreSQL'],
  ['fa-solid fa-server', 'Redis'],
  ['fab fa-docker', 'Docker'],
]

const mernTech = [
  ['fa-solid fa-leaf', 'MongoDB'],
  ['dev-text', 'ex', 'Express.js'],
  ['fa-brands fa-react', 'React'],
  ['fa-brands fa-node-js', 'Node.js'],
  ['fa-solid fa-wind', 'Tailwind CSS'],
  ['fab fa-docker', 'Docker'],
]

const features = [
  ['fa-solid fa-window-restore', 'Custom & Unique Solutions', 'Built specifically for your business needs.'],
  ['fa-solid fa-tablet-screen-button', 'Responsive Design', 'Works seamlessly on all devices and screen sizes.'],
  ['fa-solid fa-shield-halved', 'Secure & Compliant', 'Industry-standard security and data protection.'],
  ['fa-solid fa-expand', 'Scalable & Future-Ready', 'Designed to grow and adapt with your business.'],
  ['fa-solid fa-gauge-high', 'Performance Optimized', 'Fast loading, optimized code, and better UX.'],
  ['fa-solid fa-network-wired', 'Integration Ready', 'Easy integration with APIs and third-party services.'],
]

const webDevelopmentFaqs = [
  [
    'What is a custom web application?',
    'A custom web application is a web-based software solution built around your exact business workflow, user needs, integrations, and growth goals instead of relying on generic templates or off-the-shelf platforms.',
  ],
  [
    'Why should I choose a custom web application over a ready-made platform?',
    'Custom web applications give you better flexibility, stronger performance, unique features, seamless integrations, and long-term scalability because the product is designed specifically for your business operations.',
  ],
  [
    'What types of custom web applications do you build?',
    'We build business management systems, customer portals, marketplaces, booking platforms, SaaS applications, workflow automation tools, dashboards, API-driven platforms, and custom internal business tools.',
  ],
  [
    'Which technologies do you use for web application development?',
    'We use modern and reliable technologies such as React, Node.js, Express.js, MongoDB, Python, Django, Flask, PostgreSQL, Redis, Docker, and Tailwind CSS based on the project requirements.',
  ],
  [
    'Are your web applications secure and scalable?',
    'Yes. Our applications are built with secure architecture, clean code, optimized performance, reliable databases, best-practice authentication, and scalable infrastructure to support long-term business growth.',
  ],
  [
    'Can you integrate third-party APIs and existing business tools?',
    'Yes. We integrate payment gateways, CRM systems, analytics tools, marketing platforms, communication tools, inventory systems, and custom APIs to create connected digital workflows.',
  ],
  [
    'How long does it take to build a custom web application?',
    'Timeline depends on project complexity, features, integrations, and design requirements. Simple applications can be completed faster, while larger business platforms require structured planning, development, testing, and deployment phases.',
  ],
  [
    'Do you provide support after the application is launched?',
    'Yes. We provide post-launch support, bug fixes, performance monitoring, feature improvements, security updates, and continuous optimization to keep your web application stable and future-ready.',
  ],
]

function DeviceMockup() {
  const stats = [
    ['Total Users', '2,458', '+12%'],
    ['Total Orders', '1,845', '+8%'],
    ['Revenue', '$48,930', '+24%'],
    ['Conversion Rate', '3.68%', '+5%'],
  ]

  return (
    <div className="webapp-device-stage" aria-label="Dashboard application mockup">
      <div className="webapp-laptop">
        <div className="webapp-laptop-screen">
          <div className="dash-sidebar">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="dash-main">
            <div className="dash-topline">
              <strong>Dashboard</strong>
              <span />
            </div>
            <div className="dash-stats">
              {stats.map(([label, value, gain]) => (
                <div className="dash-stat" key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                  <em>{gain}</em>
                </div>
              ))}
            </div>
            <div className="dash-body">
              <div className="dash-chart">
                <span className="chart-line line-a" />
                <span className="chart-line line-b" />
                <span className="chart-line line-c" />
                <span className="chart-line line-d" />
                <span className="chart-line line-e" />
              </div>
              <div className="dash-list">
                {['Anita Rao', 'Jesse Smith', 'Aditya Boss', 'Emily Diaz'].map((name) => (
                  <div className="dash-row" key={name}>
                    <i />
                    <span>{name}</span>
                    <b>$230</b>
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
        <div className="phone-title">Dashboard</div>
        <div className="phone-card">
          <small>Revenue Overview</small>
          <b>$48,930</b>
          <div className="phone-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="phone-products">
          <small>Top Products</small>
          <div />
          <div />
        </div>
      </div>
    </div>
  )
}

function TechTile({ item }) {
  const [icon, label, altLabel] = item
  const isText = icon === 'dev-text'

  return (
    <div className="tech-tile">
      {isText ? <span>{label}</span> : <i className={icon} aria-hidden="true" />}
      <small>{isText ? altLabel : label}</small>
    </div>
  )
}

export default function CustomWebApplications() {
  return (
    <main className="webapp-page wrap">
      <section className="webapp-hero">
        <div className="webapp-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>›</span>
          <a href="/#services">Services</a>
          <span>›</span>
          <a href="/#services">Web App Development</a>
          <span>›</span>
          <strong>Custom Web Applications</strong>
        </div>

        <div className="webapp-hero-grid">
          <div className="webapp-hero-copy">
            <div className="webapp-pill reveal">Web App Development</div>
            <h1 className="webapp-title reveal reveal-delay-1">
              Custom Web
              <span>Applications</span>
            </h1>
            <h2 className="webapp-kicker reveal reveal-delay-2">Tailored Web Solutions Built for Your Business</h2>
            <p className="webapp-lead reveal reveal-delay-3">
              We build custom web applications that are fast, secure, scalable, and designed to streamline your operations
              and accelerate growth.
            </p>
            <div className="webapp-benefits reveal reveal-delay-4">
              <div>
                <i className="fa-solid fa-rocket" aria-hidden="true" />
                <strong>High Performance</strong>
                <span>Optimized for speed and efficiency</span>
              </div>
              <div>
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                <strong>Secure & Reliable</strong>
                <span>Built with best security practices</span>
              </div>
              <div>
                <i className="fa-solid fa-arrow-trend-up" aria-hidden="true" />
                <strong>Scalable Solutions</strong>
                <span>Grows with your business needs</span>
              </div>
            </div>
            <div className="webapp-actions reveal reveal-delay-5">
              <a href="/#contact" className="btn-primary">
                Start a Project <span className="arr">→</span>
              </a>
              <a href="/#portfolio" className="btn-ghost">
                View Our Work
              </a>
            </div>
          </div>
          <DeviceMockup />
        </div>
      </section>

      <section className="webapp-info-panel reveal">
        <div className="webapp-info-copy">
          <h2>What is a Custom Web Application?</h2>
          <p>
            A custom web application is a tailored software solution built specifically for your business needs. Unlike
            templates or off-the-shelf platforms, custom applications offer unique features, better performance, seamless
            integrations, and the flexibility to scale as your business evolves.
          </p>
          <ul>
            {['Tailored to Your Workflow', 'Advanced Features', 'Seamless Integrations', 'Better Performance & Security'].map((item) => (
              <li key={item}>
                <i className="fa-solid fa-code-branch" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="webapp-build-list">
          <h2>What We Build</h2>
          {buildItems.map(([icon, title, text]) => (
            <div className="webapp-build-item" key={title}>
              <i className={icon} aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="webapp-process reveal">
        <h2>
          Our <span>Development</span> Process
        </h2>
        <div className="process-track">
          {processSteps.map(([icon, number, title, text], index) => (
            <div className="process-step" key={title}>
              <div className="process-icon">
                <i className={icon} aria-hidden="true" />
              </div>
              <strong>{number}</strong>
              <b>{title}</b>
              <p>{text}</p>
              {index < processSteps.length - 1 && <span className="process-arrow">›</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="webapp-tech-panel reveal">
        <div className="tech-panel-title">
          <h2>
            <span>Technologies</span> We Use
          </h2>
          <p>We use modern and reliable technologies to build powerful web applications.</p>
        </div>
        <div className="tech-columns">
          <div className="tech-stack">
            <div className="tech-stack-head">
              <i className="fab fa-python" aria-hidden="true" />
              <div>
                <h3>Python Stack</h3>
                <p>Robust, secure, and scalable web applications using the power of Python.</p>
              </div>
            </div>
            <div className="tech-grid">
              {pythonTech.map((item) => (
                <TechTile item={item} key={item.join('-')} />
              ))}
            </div>
            <div className="tech-tags">
              <span>High Security</span>
              <span>Scalable Architecture</span>
              <span>Rapid Development</span>
            </div>
          </div>
          <div className="tech-stack">
            <div className="tech-stack-head">
              <i className="fa-brands fa-react" aria-hidden="true" />
              <div>
                <h3>MERN Stack</h3>
                <p>Modern JavaScript stack for dynamic and high-performance web applications.</p>
              </div>
            </div>
            <div className="tech-grid">
              {mernTech.map((item) => (
                <TechTile item={item} key={item.join('-')} />
              ))}
            </div>
            <div className="tech-tags">
              <span>High Performance</span>
              <span>Full-Stack JavaScript</span>
              <span>Great User Experience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="webapp-features reveal">
        <h2>
          <span>Key</span> Features
        </h2>
        <div className="feature-grid">
          {features.map(([icon, title, text]) => (
            <div className="feature-item" key={title}>
              <i className={icon} aria-hidden="true" />
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceFaq items={webDevelopmentFaqs} />

      <section className="webapp-cta reveal">
        <div className="webapp-cta-icon">
          <i className="fa-solid fa-rocket" aria-hidden="true" />
        </div>
        <div>
          <h2>Ready to Build Your Custom Web Application?</h2>
          <p>Share your idea with us and we will turn it into a powerful web application that drives results and grows your business.</p>
        </div>
        <a href="/#contact" className="btn-primary">
          Get a Free Consultation <span className="arr">→</span>
        </a>
      </section>
    </main>
  )
}
