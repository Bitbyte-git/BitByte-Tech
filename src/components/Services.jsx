import { services } from '../constants'

export default function Services() {
  return (
    <section id="services" className="section wrap center">
      <div className="eyebrow reveal">What We Offer</div>
      <h2 className="sec-title reveal reveal-delay-1">
        Our Core <span className="c">Services</span>
      </h2>
      <p className="sec-sub reveal reveal-delay-2" style={{ margin: '12px auto 0' }}>
        From concept to deployment, we deliver end-to-end digital solutions that transform businesses.
      </p>
      <div className="grid-5">
        {services.map((service, index) => (
          <div className={`svc-card reveal reveal-delay-${Math.min(index + 1, 5)}`} key={service.title}>
            <span className="svc-icon">{service.icon}</span>
            <div className="svc-title">{service.title}</div>
            <p className="svc-desc">{service.desc}</p>
            <a href="#contact" className="svc-link">
              Learn More →
            </a>
            <div className="svc-bar" />
          </div>
        ))}
      </div>
    </section>
  )
}
