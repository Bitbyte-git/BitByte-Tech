import { jobs } from '../constants'
import ServiceFaq from './ServiceFaq'

const benefits = [
  ['fa-solid fa-house-laptop', 'Flexible & Remote', 'Work from anywhere: we value results over office attendance.'],
  ['fa-solid fa-graduation-cap', 'Learning & Growth', 'Continuous learning budget and mentorship programs.'],
  ['fa-solid fa-briefcase-medical', 'Health & Wellness', 'Comprehensive health coverage and wellness initiatives.'],
  ['fa-solid fa-rocket', 'Exciting Projects', 'Build cutting-edge tech that impacts the real world.'],
  ['fa-solid fa-umbrella-beach', 'Generous Time Off', 'We believe in work-life balance and recharge time.'],
  ['fa-solid fa-people-group', 'Collaborative Culture', 'A supportive, transparent, and inclusive work environment.'],
]

const careerFaqs = [
  [
    'What is the hiring process at BitByte?',
    'Our process typically includes an initial screening, a technical assessment or portfolio review, and a final interview with the team to ensure a great cultural and technical fit.',
  ],
  [
    'Does BitByte offer remote work?',
    'Yes! Many of our roles are fully remote, and for others, we offer a hybrid model that provides the best of both worlds.',
  ],
  [
    'What technologies does the development team use?',
    'We primarily use the MERN stack (React, Node.js) and the Python stack (Django, Flask), along with modern tools like Docker, Tailwind CSS, and various cloud services.',
  ],
  [
    'Is there room for growth within the company?',
    'Absolutely. We are a fast-growing tech company, and we prioritize internal promotion and professional development for all our team members.',
  ],
]

export default function CareersPage() {
  return (
    <main className="webapp-page careers-page wrap">
      <section className="webapp-hero">
        <div className="webapp-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>›</span>
          <strong>Careers</strong>
        </div>

        <div className="webapp-hero-grid">
          <div className="webapp-hero-copy">
            <div className="webapp-pill reveal">Join Our Team</div>
            <h1 className="webapp-title reveal reveal-delay-1">
              Build the Future
              <span>With Us</span>
            </h1>
            <h2 className="webapp-kicker reveal reveal-delay-2">Where Innovation Meets Opportunity</h2>
            <p className="webapp-lead reveal reveal-delay-3">
              We are on a mission to reshape the digital universe. We are looking for passionate, innovative, and driven
              individuals to join our elite squad and build the next generation of digital solutions.
            </p>
            <div className="webapp-benefits reveal reveal-delay-4">
              <div>
                <i className="fa-solid fa-earth-americas" aria-hidden="true" />
                <strong>Remote-First</strong>
                <span>Work from anywhere in the world</span>
              </div>
              <div>
                <i className="fa-solid fa-bolt" aria-hidden="true" />
                <strong>Fast Paced</strong>
                <span>Agile environment for rapid growth</span>
              </div>
              <div>
                <i className="fa-solid fa-gem" aria-hidden="true" />
                <strong>Impactful Work</strong>
                <span>Build tech that makes a difference</span>
              </div>
            </div>
            <div className="webapp-actions reveal reveal-delay-5">
              <a href="#open-positions" className="btn-primary">
                View Openings <span className="arr">↓</span>
              </a>
              <a href="/#contact" className="btn-ghost">
                General Application
              </a>
            </div>
          </div>
          
          <div className="wd-hero-visual career-visual-card reveal reveal-delay-2" style={{ perspective: '1000px' }}>
            <div className="fcrd" style={{ transform: 'rotateY(-15deg) rotateX(10deg)', maxWidth: '400px' }}>
              <span className="fcrd-icon">🚀</span>
              <div className="fcrd-name">Join BitByte</div>
              <div className="fcrd-tag">Innovating the Digital Galaxy</div>
              <p style={{ fontSize: '12px', color: 'var(--white60)', marginTop: '10px' }}>
                We don't just build websites; we build the future of digital interaction. Join us on this cosmic journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="webapp-features reveal" id="open-positions">
        <div className="service-section-eyebrow center">Opportunities</div>
        <h2>
          <span>Open</span> Positions
        </h2>
        <div className="careers-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', textAlign: 'left' }}>
          {jobs.map(([icon, title, tags], index) => (
            <div className={`job-card reveal reveal-delay-${index + 1}`} key={title} style={{ width: '100%' }}>
              <div className="job-left">
                <span className="job-icon">{icon}</span>
                <div className="job-title">{title}</div>
                <div className="job-meta">
                  {tags.map((tag) => (
                    <span className="job-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a href="/#contact" className="btn-apply">
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="webapp-features reveal">
        <div className="service-section-eyebrow center">Benefits</div>
        <h2>
          <span>Why</span> Join BitByte?
        </h2>
        <div className="feature-grid">
          {benefits.map(([icon, title, text]) => (
            <div className="feature-item" key={title}>
              <i className={icon} aria-hidden="true" />
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceFaq items={careerFaqs} />

      <section className="webapp-cta reveal">
        <div className="webapp-cta-icon">
          <i className="fa-solid fa-paper-plane" aria-hidden="true" />
        </div>
        <div>
          <h2>Don&apos;t See a Perfect Fit?</h2>
          <p>We are always looking for exceptional talent. Send us your resume and tell us how you can contribute to the BitByte mission.</p>
        </div>
        <a href="/#contact" className="btn-primary">
          Send General Application <span className="arr">→</span>
        </a>
      </section>
    </main>
  )
}
