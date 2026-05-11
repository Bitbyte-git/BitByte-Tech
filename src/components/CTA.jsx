export default function CTA() {
  return (
    <section id="cta" className="wrap">
      <div className="cta-glow" />
      <div className="cta-box reveal">
        <div className="eyebrow center" style={{ marginBottom: 16 }}>
          Ready for Launch?
        </div>
        <h2 className="sec-title center" style={{ maxWidth: 540, margin: '0 auto 14px' }}>
          Your Digital Journey
          <br />
          <span className="c">Starts Now</span>
        </h2>
        <p className="sec-sub center" style={{ margin: '0 auto 40px' }}>
          Join 200+ forward-thinking businesses that trusted Bit Byte Technologies to build their digital universe.
        </p>
        <div className="cta-btns">
          <a href="#services" className="btn-primary">
            Explore Services <span className="arr">→</span>
          </a>
          <a href="#contact" className="btn-ghost">
            Contact Us <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
