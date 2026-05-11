export default function Founder() {
  return (
    <section id="founder" className="wrap bg-tint-1">
      <div className="founder-visual inner-content reveal">
        <div className="founder-planet">
          <div className="founder-ring" />
          <div className="founder-ring2" />
          <div className="founder-saturn-wrap">
            <img
              src="/assets/planet.png"
              alt="Floating Planet"
              className="saturn-img"
            />
          </div>
        </div>
        <div className="founder-quote reveal reveal-delay-2">
          <p>
            The universe has no limits, and neither does human imagination.
            Every line of code I write is a star in the galaxy I am building:
            one digital dream at a time.
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
          does our approach to technology: methodical, purposeful, and built to
          last.
        </p>
        <div className="founder-pills reveal reveal-delay-4">
          {[
            "8+ Years Experience",
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
