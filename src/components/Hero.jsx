import { floatCards } from '../constants'
import BitByteHero from './BitByteHero'

export default function Hero({ planetRef }) {
  return (
    <section id="hero" className="wrap">
      <div className="neb neb-1" />
      <div className="neb neb-2" />
      <div className="neb neb-3" />

      <div className="planet-sys" ref={planetRef}>
        <BitByteHero />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <div className="badge-dot" />
          <span className="badge-txt">Welcome to Bit Byte Technologies</span>
        </div>
        <h1 className="hero-h1">
          Transforming
          <br />
          <span className="grad">Ideas into</span>
          <br />
          Digital Reality
        </h1>
        <p className="hero-p">
          We engineer cutting-edge Web App Development and data-driven digital marketing solutions, crafted for brands that dare to reach
          beyond the horizon.
        </p>
        <div className="hero-btns">
          <a href="#services" className="btn-primary">
            Explore Services <span className="arr">→</span>
          </a>
          <a href="#contact" className="btn-ghost">
            Contact Us <span className="arr">→</span>
          </a>
        </div>
        <div className="hero-stats">
          {[
            ['200+', 'Projects'],
            ['98%', 'Satisfaction'],
            ['1+', 'Years'],
            ['6000+', 'Clients'],
          ].map(([num, label], index) => (
            <div className={index > 0 ? 'stat-group' : ''} key={label}>
              {index > 0 && <div className="stat-sep" />}
              <span className="snum">{num}</span>
              <span className="slbl">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="float-cards">
        {floatCards.map(([icon, name, tag]) => (
          <div className="fcrd" key={name}>
            <span className="fcrd-icon">{icon}</span>
            <div className="fcrd-name">{name}</div>
            <div className="fcrd-tag">{tag}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
