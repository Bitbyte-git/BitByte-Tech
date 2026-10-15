import { SEO_BY_PATH } from '../seo'

export default function ServiceFaq({ items, eyebrow = 'Frequently Asked Questions' }) {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const seoItems = SEO_BY_PATH[pathname]?.faqs || items

  return (
    <section className="service-faq reveal">
      <div className="service-section-eyebrow">{eyebrow}</div>
      <div className="service-faq-grid">
        {seoItems.map(([question, answer], index) => (
          <details className="service-faq-item" key={index} name="faq">
            <summary>
              <span>{question}</span>
              <i className="fa-solid fa-plus" aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
