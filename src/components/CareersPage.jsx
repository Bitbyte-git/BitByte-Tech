const careerValues = [
  [
    "fa-solid fa-rocket",
    "Innovate",
    "Work on exciting projects and solve real-world problems.",
  ],
  [
    "fa-solid fa-people-group",
    "Collaborate",
    "Great teamwork builds extraordinary results.",
  ],
  [
    "fa-solid fa-graduation-cap",
    "Learn",
    "Continuous learning and growth are at our core.",
  ],
  [
    "fa-solid fa-globe",
    "Impact",
    "Your work creates meaningful impact for businesses.",
  ],
];

const heroOrbitItems = [
  ["fa-solid fa-people-group", "Great People", "orb-people"],
  ["fa-solid fa-chart-column", "Growth Opportunities", "orb-growth"],
  ["fa-regular fa-heart", "Supportive Culture", "orb-culture"],
  ["fa-regular fa-star", "Make an Impact", "orb-impact"],
];

const openPositions = [
  [
    "fa-solid fa-code",
    "Frontend Developer",
    "Full Time",
    "Remote",
    "Build responsive and interactive user interfaces.",
  ],
  [
    "fa-solid fa-server",
    "Backend Developer",
    "Full Time",
    "Remote",
    "Develop scalable and secure server-side applications.",
  ],
  [
    "fa-solid fa-pen-nib",
    "Full Stack Developer",
    "Full Time",
    "Hybrid",
    "Design intuitive and engaging experiences for our products.",
  ],
  [
    "fa-solid fa-chart-simple",
    "Digital Marketing Specialist",
    "Full Time",
    "Remote",
    "Plan and execute marketing strategies that drive growth.",
  ],
];

const benefits = [
  [
    "fa-solid fa-wallet",
    "Competitive Salary",
    "We offer industry-leading compensation.",
  ],
  [
    "fa-solid fa-heart-pulse",
    "Health & Wellness",
    "Medical, dental, and mental wellness support.",
  ],
  [
    "fa-solid fa-graduation-cap",
    "Learning & Growth",
    "Access to courses, workshops and more.",
  ],
  [
    "fa-regular fa-clock",
    "Flexible Work",
    "Flexible hours and remote work options.",
  ],
  [
    "fa-solid fa-umbrella-beach",
    "Paid Time Off",
    "Take time off to rest and recharge.",
  ],
];

export default function CareersPage() {
  return (
    <main className="careers-showcase wrap">
      <section className="career-hero-panel">
        <div className="career-hero-copy reveal">
          <div className="career-pill">Careers</div>
          <h1>
            Build Your Career.
            <span>Build the Future.</span>
          </h1>
          <p>
            We are always looking for passionate, curious, and driven people who
            love building digital experiences that make an impact.
          </p>
          <a href="#open-positions" className="career-action" title="Go to open positions">
            Explore Open Positions
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </a>
        </div>

        <div
          className="career-hero-art reveal reveal-delay-2"
          aria-hidden="true"
        >
          <div className="career-orbit" />
          <div className="career-chair">
            <div className="chair-back" />
            <div className="chair-seat" />
            <div className="chair-arm chair-arm-left" />
            <div className="chair-arm chair-arm-right" />
            <div className="chair-stem" />
            <div className="chair-base" />
          </div>
          {heroOrbitItems.map(([icon, label, className]) => (
            <div className={`career-orb ${className}`} key={label}>
              <i className={icon} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        className="career-values reveal reveal-delay-3"
        aria-label="Career values"
      >
        {careerValues.map(([icon, title, text]) => (
          <article className="career-value" key={title}>
            <i className={icon} aria-hidden="true" />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="career-section" id="open-positions">
        <div className="career-section-head reveal">
          <div>
            <span>Open Positions</span>
            <h2>Find the Right Opportunity for You</h2>
          </div>
          <a href="#open-positions" className="career-outline-link" title="Go to open positions">
            View All Positions
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </a>
        </div>

        <div className="career-job-list reveal reveal-delay-1">
          {openPositions.map(([icon, title, type, mode, description]) => (
            <article className="career-job-row" key={title}>
              <div className="career-job-main">
                <span className="career-job-icon">
                  <i className={icon} aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>
                    {type} <span>•</span> {mode}
                  </p>
                </div>
              </div>
              <p className="career-job-desc">{description}</p>
              <a href="/#contact" className="career-apply" title="Go to home">
                Apply Now
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="career-section career-benefits-section">
        <div className="career-section-head reveal">
          <div>
            <span>Why Join Bit Byte?</span>
            <h2>More Than Just a Job</h2>
          </div>
        </div>

        <div className="career-benefits reveal reveal-delay-1">
          {benefits.map(([icon, title, text]) => (
            <article className="career-benefit" key={title}>
              <i className={icon} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="career-resume-cta reveal">
        <div className="career-resume-icon">
          <i className="fa-regular fa-envelope" aria-hidden="true" />
        </div>
        <div>
          <h2>Don&apos;t see the right role?</h2>
          <p>We are always open to connecting with great talent.</p>
        </div>
        <a href="/#contact" className="career-resume-button" title="Go to home">
          Send Us Your Resume
        </a>
      </section>
    </main>
  );
}
