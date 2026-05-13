import { projects } from '../constants'

export default function Portfolio() {
  return (
    <section id="portfolio" className="section wrap center">
      <div className="eyebrow reveal">Our Work</div>
      <h2 className="sec-title reveal reveal-delay-1">
        Recent <span className="c">Projects</span>
      </h2>
      <p className="sec-sub reveal reveal-delay-2" style={{ margin: '12px auto 0' }}>
        A glimpse into the digital universes we have helped build for our clients.
      </p>
      <div className="grid-3">
        {projects.map(([thumbClass, icon, tag, name, desc], index) => (
          <div className={`port-card reveal reveal-delay-${index + 1}`} key={name}>
            <div className={`port-thumb ${thumbClass}`}>
              <img src={icon} alt={name} className="port-img" />
            </div>
            <div className="port-body">
              <div className="port-tag">{tag}</div>
              <div className="port-name">{name}</div>
              <p className="port-desc">{desc}</p>
              <a href="#contact" className="port-link">
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
