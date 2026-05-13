import BitByteHero from './BitByteHero'

export default function Founder() {
  return (
    <section id="founder" className="section wrap bg-tint-1">
      <div className="founder-visual inner-content reveal">
        <div className="founder-planet">
          <div className="founder-globe-frame">
            <BitByteHero />
          </div>
        </div>
        <div className="founder-quote reveal reveal-delay-2">
          <p>
            Change is the only constant. Growth begins when we learn to adapt.
          </p>
          <cite>Founder, Bit Byte Technologies</cite>
        </div>
      </div>
      <div className="founder-content inner-content">
        <div className="eyebrow reveal">Our Story</div>
        <h2 className="sec-title reveal reveal-delay-1">
          One Vision,
          <br />
          <span className="c">Infinite Possibilities</span>
        </h2>
        <p className="sec-sub reveal reveal-delay-2">
          Bit Byte Technologies was born from the imagination of a passionate
          entrepreneur who looked at the stars and saw not distance, but
          possibility. Starting as a solo developer with a laptop and a
          limitless dream, our founder built a company that now serves clients
          across the globe.
        </p>
        <p className="sec-sub reveal reveal-delay-3" style={{ marginTop: 16 }}>
          Just as the cosmos operates on elegant, interconnected systems, so
          does our approach to Technologies: methodical, purposeful, and built to
          last.
        </p>
        <div className="founder-pills reveal reveal-delay-4">
          {[
            "14+ Years Experience",
            "Global Clients",
            "Award-Winning",
            "Innovation-First",
            "Cosmos-Inspired",
          ].map((pill) => (
            <span className="pill" key={pill}>
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
