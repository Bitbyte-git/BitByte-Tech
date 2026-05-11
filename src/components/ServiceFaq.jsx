export default function ServiceFaq({ items, eyebrow = 'Frequently Asked Questions' }) {
  return (
    <section className="service-faq reveal">
      <div className="service-section-eyebrow">{eyebrow}</div>
      <div className="service-faq-grid">
        {items.map(([question, answer]) => (
          <details className="service-faq-item" key={question}>
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
