const developmentServices = [
  [
    'fa-solid fa-globe',
    'Custom Web Applications',
    'We build custom web applications tailored to your unique business requirements with scalable and secure architecture.',
    '/services/web-development/custom-web-applications',
  ],
  [
    'fa-solid fa-cart-shopping',
    'E-Commerce Solutions',
    'Powerful and secure e-commerce platforms that help you sell more, manage easily, and deliver great user experiences.',
    '/services/web-development/e-commerce-solutions',
  ],
  [
    'fa-solid fa-chart-simple',
    'Web Portals & Dashboards',
    'Interactive dashboards and portals that simplify operations, visualize data, and improve decision-making.',
    '/services/web-development/web-portals-dashboards',
  ],
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

const workItems = [
  [
    'Analytics Dashboard',
    'A comprehensive analytics platform that helps businesses track performance and make data-driven decisions.',
    'dashboard',
  ],
  [
    'ShopSwift',
    'A feature-rich e-commerce platform with advanced search, secure payments, and seamless checkout.',
    'shop',
  ],
  [
    'TaskFlow Pro',
    'A project management application that streamlines tasks, collaboration, and team productivity.',
    'tasks',
  ],
]

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

function WebsiteMockup() {
  return (
    <div className="wd-hero-visual reveal reveal-delay-2" aria-label="Responsive website mockup">
      <div className="wd-laptop">
        <div className="wd-screen">
          <div className="wd-screen-nav">
            <span>BitByte</span>
            <i />
            <i />
            <i />
          </div>
          <h3>We Build Digital Products That Drive <em>Real Growth</em></h3>
          <p>Strategic design, powerful development, and conversion-focused experiences for forward-thinking businesses.</p>
          <button type="button">Get Started</button>
        </div>
        <div className="wd-base" />
      </div>
      <div className="wd-phone">
        <div className="wd-phone-speaker" />
        <span>BitByte</span>
        <h3>We Build Digital Products That Drive Real Growth</h3>
        <p>Fast, responsive, and business-focused websites.</p>
        <button type="button">Get Quote</button>
        <div className="wd-phone-card">Our Services<br /><b>Web App Development</b></div>
      </div>
    </div>
  )
}

function WorkPreview({ type }) {
  return (
    <div className={`wd-work-preview ${type}`}>
      <div className="preview-sidebar" />
      <div className="preview-main">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export default function WebDevelopmentOverview() {
  return (
    <main className="webapp-page wd-page wrap">
      <section className="wd-hero">
        <div className="webapp-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>›</span>
          <a href="/#services">Services</a>
          <span>›</span>
          <strong>Web App Development</strong>
        </div>
        <div className="wd-hero-grid">
          <div className="wd-hero-copy">
            <div className="webapp-pill reveal">Our Service</div>
            <h1 className="webapp-title wd-title reveal reveal-delay-1">
              Web <span>Development</span>
            </h1>
            <h2 className="webapp-kicker reveal reveal-delay-2">Conversion-Focused Websites</h2>
            <p className="webapp-lead reveal reveal-delay-3">
              We build modern, responsive websites that combine exceptional design with powerful functionality. Every website
              is optimized for speed, security, and user experience to help your business attract visitors and convert them
              into customers.
            </p>
            <div className="webapp-benefits reveal reveal-delay-4">
              <div>
                <i className="fa-solid fa-rocket" aria-hidden="true" />
                <strong>High Performance</strong>
                <span>Lightning-fast websites for better engagement</span>
              </div>
              <div>
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                <strong>Secure & Reliable</strong>
                <span>Built with security best practices in mind</span>
              </div>
              <div>
                <i className="fa-solid fa-mobile-screen" aria-hidden="true" />
                <strong>Fully Responsive</strong>
                <span>Perfect experience on all devices</span>
              </div>
            </div>
            <div className="webapp-actions reveal reveal-delay-5">
              <a href="/#contact" className="btn-primary">
                Let&apos;s Build Your Website <span className="arr">→</span>
              </a>
              <a href="#wd-work" className="btn-ghost">
                View Our Work
              </a>
            </div>
          </div>
          <WebsiteMockup />
        </div>
      </section>

      <section className="wd-services-section" id="wd-services">
        <div className="service-section-eyebrow center reveal">What We Do</div>
        <h2 className="dm-section-title reveal reveal-delay-1">
          Our Web App Development <span>Services</span>
        </h2>
        <p className="wd-section-sub reveal reveal-delay-2">End-to-end web solutions tailored to your business goals.</p>
        <div className="wd-service-grid">
          {developmentServices.map(([icon, title, text, href], index) => (
            <a className={`wd-service-card reveal reveal-delay-${index + 1}`} href={href} key={title}>
              <i className={icon} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span>Learn more →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="webapp-tech-panel wd-tech-panel reveal">
        <div className="tech-panel-title">
          <div className="service-section-eyebrow center">Tech Stacks We Use</div>
          <h2>
            <span>Modern</span> Technologies, Powerful <span>Solutions</span>
          </h2>
          <p>We use the best technologies to build fast, scalable and future-ready applications.</p>
        </div>
        <div className="tech-columns">
          <div className="tech-stack">
            <div className="tech-stack-head">
              <i className="fab fa-python" aria-hidden="true" />
              <div>
                <h3>Python Stack</h3>
                <p>Robust, scalable, and secure web applications using the power of Python.</p>
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
                <p>Modern JavaScript-based solutions for dynamic and high-performance web applications.</p>
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

      <section className="wd-work-section" id="wd-work">
        <div className="service-section-eyebrow center reveal">Some of Our Work</div>
        <h2 className="dm-section-title reveal reveal-delay-1">
          <span>Web Applications</span> We&apos;ve <span>Built</span>
        </h2>
        <p className="wd-section-sub reveal reveal-delay-2">Real solutions for real businesses.</p>
        <div className="wd-work-grid">
          {workItems.map(([title, text, type], index) => (
            <article className={`wd-work-card reveal reveal-delay-${index + 1}`} key={title}>
              <WorkPreview type={type} />
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="/#contact">View Case Study →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="webapp-cta wd-final-cta reveal">
        <div className="webapp-cta-icon">
          <i className="fa-solid fa-rocket" aria-hidden="true" />
        </div>
        <div>
          <h2>Ready to Build Your Next Web Application?</h2>
          <p>Let&apos;s turn your ideas into powerful digital solutions that drive growth and deliver measurable results.</p>
        </div>
        <a href="/#contact" className="btn-primary">
          Get a Free Consultation <span className="arr">→</span>
        </a>
      </section>
    </main>
  )
}
