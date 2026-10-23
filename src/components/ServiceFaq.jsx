import { SEO_BY_PATH } from '../seo'

export default function ServiceFaq({
  items,
  eyebrow = 'Frequently Asked Questions',
  title,
  intro,
}) {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const seoItems = SEO_BY_PATH[pathname]?.faqs || items
  const columnBreak = Math.ceil(seoItems.length / 2)
  const columns = [seoItems.slice(0, columnBreak), seoItems.slice(columnBreak)]

  return (
    <section className="service-faq">
      <div className="service-section-eyebrow">{eyebrow}</div>
      {title ? <h2 className="service-faq-title">{title}</h2> : null}
      {intro ? <p className="service-faq-intro">{intro}</p> : null}
      <div className="service-faq-grid">
        {columns.map((column, columnIndex) => (
          <div className="service-faq-column" key={columnIndex}>
            {column.map(([question, answer]) => (
              <details
                className="service-faq-item"
                key={question}
                name="faq"
              >
                <summary>
                  <span>{question}</span>
                  <i className="fa-solid fa-plus" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
