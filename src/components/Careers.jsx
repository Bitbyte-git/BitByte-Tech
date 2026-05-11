import { jobs } from '../constants'

export default function Careers() {
  return (
    <section id="careers" className="section wrap center">
      <div className="eyebrow reveal">Join the Crew</div>
      <h2 className="sec-title reveal reveal-delay-1">
        Open <span className="c">Positions</span>
      </h2>
      <p className="sec-sub reveal reveal-delay-2" style={{ margin: '12px auto 0' }}>
        We are on a mission to reshape the digital universe. Come build it with us.
      </p>
      <div className="careers-grid">
        {jobs.map(([icon, title, tags], index) => (
          <div className={`job-card reveal reveal-delay-${index + 1}`} key={title}>
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
            <a href="#contact" className="btn-apply">
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
