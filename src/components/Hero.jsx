import { useRef, useState, useEffect } from 'react'
import { floatCards } from '../constants'

export default function Hero({ planetRef }) {
  const videoRef = useRef(null)
  const [gifKey, setGifKey] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return; // Don't restart GIF if hovered

    const interval = setInterval(() => {
      setGifKey(prev => prev + 1)
    }, 8000)
    return () => clearInterval(interval)
  }, [isHovered])
  return (
    <section id="hero" className="wrap">
      {/* Removed static hero-bg-layer divs to allow the dynamic background canvas to shine through */}

      <div className="neb neb-1" />
      <div className="neb neb-2" />
      <div className="neb neb-3" />

      <div className="planet-sys" ref={planetRef}>
        <div 
          className="hero-gif-circle"
          onMouseEnter={() => {
            setIsHovered(true);
            videoRef.current?.pause();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            videoRef.current?.play();
          }}
        >
          <img key={gifKey} src={`/assets/Hero-bg.gif?v=${gifKey}`} alt="" aria-hidden="true" />
        </div>
        <video 
          ref={videoRef}
          className="planet-real saturn-hero" 
          src="/assets/hero-section-video.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          onMouseEnter={() => {
            setIsHovered(true);
            videoRef.current?.pause();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            videoRef.current?.play();
          }}
          onEnded={(e) => {
            e.target.currentTime = 0;
            e.target.play();
          }}
        />
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
          We engineer cutting-edge web development and data-driven digital marketing solutions, crafted for brands that dare to reach
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
            ['8+', 'Years'],
            ['50+', 'Clients'],
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
