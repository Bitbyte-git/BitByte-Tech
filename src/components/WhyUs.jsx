import { whyItems } from '../constants'

export default function WhyUs() {
  return (
    <section id="why" className="section wrap center">
      <div className="eyebrow reveal">Why Us</div>
      <h2 className="sec-title reveal reveal-delay-1">
        Why Choose <span className="c">Bit Byte Technologies</span>
      </h2>
      <p className="sec-sub reveal reveal-delay-2" style={{ margin: '12px auto 0' }}>
        We do not just build digital products: we architect galaxies of opportunity for your brand.
      </p>
      <div className="grid-3">
        {whyItems.map(([num, icon, title, desc], index) => (
          <div className={`why-card reveal reveal-delay-${(index % 3) + 1}`} key={num}>
            <div className="why-num">{num}</div>
            <span className="why-icon">{icon}</span>
            <div className="why-title">{title}</div>
            <p className="why-desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
