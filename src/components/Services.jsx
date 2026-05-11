import { services } from '../constants'

const serviceRoutes = {
  'Web Development': '/services/web-development',
  'Digital Marketing': '/services/digital-marketing/ai-powered-digital-marketing-solutions',
  'Business Analytics': '/services/business-analytics/data-driven-business-analytics-solutions',
}

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
          <a
            className="svc-card"
            href={serviceRoutes[service.title] || '#contact'}
            key={service.title}
          >
            <span className="svc-icon">{service.icon}</span>
            <div className="svc-title">{service.title}</div>
            <p className="svc-desc">{service.desc}</p>
            <span className="svc-link">
              Learn More →
            </span>
            <div className="svc-bar" />
          </a>
        ))}
      </div>
    </section>
  )
}
