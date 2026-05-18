"use client";
import { useEffect, useRef, useState } from 'react';

const developmentServices = [
  [
    'fa-solid fa-globe',
    'Custom Web Applications',
    'We build custom web applications tailored to your unique business requirements with scalable and secure architecture.',
    '/services/web-development/custom-web-applications',
    '#00d4ff'
  ],
  [
    'fa-solid fa-cart-shopping',
    'E-Commerce Solutions',
    'Powerful and secure e-commerce platforms that help you sell more, manage easily, and deliver great user experiences.',
    '/services/web-development/e-commerce-solutions',
    '#f59e0b'
  ],
  [
    'fa-solid fa-chart-simple',
    'Web Portals & Dashboards',
    'Interactive dashboards and portals that simplify operations, visualize data, and improve decision-making.',
    '/services/web-development/web-portals-dashboards',
    '#8b5cf6'
  ],
]

const pythonTech = [
  ['fab fa-python', 'Python', null, 'python-gradient'],
  ['dev-text', 'dj', 'Django', '#44B78B'],
  ['dev-text', 'Fl', 'Flask', '#FFFFFF'],
  ['fa-solid fa-database', 'PostgreSQL', null, '#336791'],
  ['fab fa-docker', 'Docker', null, '#2496ED'],
]

const mernTech = [
  ['fa-solid fa-leaf', 'MongoDB', null, '#47A248'],
  ['dev-text', 'ex', 'Express.js', '#FFFFFF'],
  ['fa-brands fa-react', 'React', null, '#61DAFB'],
  ['fa-brands fa-node-js', 'Node.js', null, '#339933'],
  ['fa-solid fa-wind', 'Tailwind CSS', null, '#06B6D4'],
  ['fab fa-docker', 'Docker', null, '#2496ED'],
]

const showcaseSections = [
  ['Home', 'fa-solid fa-house'],
  ['Services', 'fa-solid fa-code'],
  ['About', 'fa-solid fa-user'],
  ['Contact', 'fa-solid fa-envelope'],
]

const showcaseContent = {
  Home: {
    label: 'What Us',
    title: 'Ideas. Built.',
    highlight: ' Delivered.',
    text: `Transforming your vision into high-performing digital experiences.

Designed to engage users, build trust,
 and drive measurable business growth.`,
    primary: 'Explore Home',
    secondary: 'See Hero',
    stats: [
      ['2.1s', 'Load Target'],
      ['100%', 'Responsive'],
      ['A+', 'Visual Polish'],
      ['24/7', 'Availability'],
    ],
  },
  Services: {
    label: 'WE CREATE',
    title: 'Digital Experiences which ',
    highlight: ' Drive Results',
    text: `Strategic digital solutions tailored to solve real business challenges.

Designed to attract customers, streamline operations, and accelerate growth.`,
    primary: 'Explore Services',
    secondary: 'View Solutions',
    stats: [
      ['150+', 'Projects Completed'],
      ['98%', 'Client Satisfaction'],
      ['5+', 'Years Experience'],
      ['24/7', 'Support'],
    ],
  },
  About: {
    label: 'WE BUILD',
    title: 'Trust-Focused Stories That',
    highlight: 'Show Expertise',
    text: 'Company sections that explain your process, credibility, values, and technical strengths with clarity.',
    primary: 'Meet BitByte',
    secondary: 'Our Process',
    stats: [
      ['10+', 'Core Skills'],
      ['3x', 'Faster Delivery'],
      ['100%', 'Clear Scope'],
      ['0', 'Guesswork'],
    ],
  },
  Contact: {
    label: 'WE CONNECT',
    title: 'Lead Extravaganzas That',
    highlight: 'Convert Faster',
    text: 'Contact flows designed for quick inquiries, qualified leads, smooth handoffs, and measurable response.',
    primary: 'Start Project',
    secondary: 'Book Call',
    stats: [
      ['1 Day', 'Reply Window'],
      ['Free', 'Consultation'],
      ['4 Step', 'Onboarding'],
      ['100%', 'Secure Form'],
    ],
  },
}

function TechTile({ item }) {
  const [icon, label, altLabel, color] = item
  const isText = icon === 'dev-text'
  const isPython = color === 'python-gradient'

  return (
    <div className="tech-tile">
      {isText ? (
        <span style={{ color }}>{label}</span>
      ) : (
        <i
          className={`${icon} ${isPython ? 'python-gradient' : ''}`}
          aria-hidden="true"
          style={isPython ? {} : { color }}
        />
      )}
      <small>{isText ? altLabel : label}</small>
    </div>
  )
}

function WebsiteMockup() {
  const [activeSection, setActiveSection] = useState('Services')
  const [cubeClicks, setCubeClicks] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const activePanel = showcaseContent[activeSection] || showcaseContent.Services

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10
    setTilt({ x, y })
  }

  const resetTilt = () => setTilt({ x: 0, y: 0 })
  const handleCubeClick = () => setCubeClicks((value) => value + 1)

  return (
    <div
      className="wd-hero-visual reveal reveal-delay-2"
      aria-label="Interactive web app development showcase"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        '--tilt-x': `${tilt.x}deg`,
        '--tilt-y': `${tilt.y}deg`,
        '--cube-spin': `${cubeClicks * 90}deg`,
      }}
    >
      <div className="wd-network-lines" aria-hidden="true" />
      <div className="wd-laptop">
        <div className="wd-screen">
          <div className="wd-screen-glass" />
          <div className="wd-screen-nav">
            <span aria-hidden="true">BitByte</span>
            <div>
              {showcaseSections.map(([label]) => (
                <button
                  className={activeSection === label ? 'active' : ''}
                  key={label}
                  onClick={() => setActiveSection(label)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="wd-dashboard-copy" key={activeSection}>
            <small>{activePanel.label}</small>
            <h3>
              {activePanel.title} <em>{activePanel.highlight}</em>
            </h3>
            <p>{activePanel.text}</p>
          </div>

          <button
            className={`wd-holo-cube ${cubeClicks % 2 ? 'is-clicked' : ''}`}
            onClick={handleCubeClick}
            type="button"
            aria-label="Rotate holographic cube"
          >
            <span className="wd-cube-rings" />
            <span className="wd-cube">
              <div className="front" />
              <div className="back" />
              <div className="right" />
              <div className="left" />
              <div className="top" />
              <div className="bottom" />
            </span>
            <span className="wd-cube-pulse" />
            <span className="wd-cube-particles" />
          </button>

          <div className="wd-screen-stats">
            {activePanel.stats.map(([value, label], index) => (
              <span key={label} style={{ '--stat-delay': `${index * 0.08}s` }}>
                <strong>{value}</strong>
                <small>{label}</small>
              </span>
            ))}
          </div>
        </div>
        <div className="wd-base" />
      </div>

      <div className="wd-side-nav">
        {showcaseSections.map(([label, icon]) => (
          <button
            className={activeSection === label ? 'active' : ''}
            key={label}
            onClick={() => setActiveSection(label)}
            type="button"
          >
            <i className={icon} aria-hidden="true" />
            <span>{label}</span>
            {label === 'Services' && <b aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="wd-hand-cursor" aria-hidden="true">
        <i className="fa-solid fa-hand-pointer" />
      </div>

      <div className="wd-click-tooltip">
        <i className="fa-solid fa-hand-pointer" aria-hidden="true" />
        <strong>Try clicking to explore</strong>
      </div>
    </div>
  )
}

export default function WebDevelopmentOverview() {
  const containerRef = useRef(null)

  useEffect(() => {
    // 1. Inject FontAwesome for icons if not present in the new project
    if (!document.querySelector('#fa-stylesheet')) {
      const link = document.createElement('link')
      link.id = 'fa-stylesheet'
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
      document.head.appendChild(link)
    }

    // 2. Handle scroll reveal animations that were missing in the standalone file
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target) // Only animate once
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    const reveals = containerRef.current?.querySelectorAll('.reveal') || []
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      <style>{`
        /* ══════════════════════════════════════════════
           WEB APP DEVELOPMENT PAGE STYLES
        ══════════════════════════════════════════════ */

        .webapp-page {
          min-height: 100vh;
          padding: 112px 64px 70px;
          background:
            radial-gradient(circle at 72% 14%, rgba(0, 119, 182, 0.2), transparent 38%),
            radial-gradient(circle at 16% 34%, rgba(6, 214, 160, 0.1), transparent 30%),
            linear-gradient(180deg, rgba(2, 8, 18, 0.1), rgba(2, 11, 18, 0.72));
        }

        .webapp-page::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            linear-gradient(rgba(0, 180, 216, 0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 180, 216, 0.018) 1px, transparent 1px);
          background-size: 46px 46px;
        }

        .webapp-hero {
          max-width: 1280px;
          margin: 0 auto 56px;
        }

        .webapp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(232, 248, 255, 0.6);
          margin-bottom: 42px;
        }

        .webapp-breadcrumb a {
          color: rgba(232, 248, 255, 0.6);
          text-decoration: none;
          cursor: none;
        }

        .webapp-breadcrumb a:hover,
        .webapp-breadcrumb strong {
          color: #9ef35d;
        }

        .webapp-breadcrumb span {
          color: rgba(232, 248, 255, 0.32);
        }

        .webapp-hero-grid {
          display: grid;
          grid-template-columns: minmax(430px, 0.82fr) minmax(520px, 1.18fr);
          align-items: center;
          gap: 32px;
          min-height: 500px;
        }

        .webapp-pill {
          display: inline-flex;
          align-items: center;
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
          text-transform: uppercase;
          color: #9ef35d;
          border: 1px solid rgba(158, 243, 93, 0.28);
          border-radius: 18px;
          padding: 8px 18px;
          background: rgba(158, 243, 93, 0.06);
          box-shadow: 0 0 18px rgba(158, 243, 93, 0.08);
          margin-bottom: 18px;
        }

        .webapp-title {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: clamp(42px, 5.25vw, 76px);
          font-weight: 900;
          line-height: 0.98;
          color: #fff;
          margin-bottom: 22px;
          letter-spacing: 0;
        }

        .webapp-title span {
          display: block;
          background: linear-gradient(90deg, #9af75a, #00ccf5, #0077ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .webapp-kicker {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 21px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 18px;
        }

        .webapp-lead {
          max-width: 570px;
          font-size: 15.5px;
          line-height: 1.82;
          color: rgba(232, 248, 255, 0.6);
          font-weight: 300;
          margin-bottom: 28px;
        }

        .webapp-benefits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin: 0 0 34px;
          max-width: 640px;
        }

        .webapp-benefits div {
          display: grid;
          grid-template-columns: 44px 1fr;
          column-gap: 12px;
          align-items: center;
        }

        .webapp-benefits i {
          grid-row: 1 / span 2;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9d7cff;
          border: 1px solid rgba(157, 124, 255, 0.36);
          background: rgba(15, 35, 72, 0.46);
          font-size: 20px;
        }

        .webapp-benefits strong {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 11px;
          color: #fff;
          line-height: 1.25;
        }

        .webapp-benefits span {
          font-size: 12px;
          color: rgba(232, 248, 255, 0.6);
          line-height: 1.45;
          margin-top: 4px;
        }

        .webapp-actions {
          display: flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #000;
          text-decoration: none;
          cursor: none;
          background: linear-gradient(135deg, #a4ec70 0%, #00a4ec 45%, #294d9d 100%);
          padding: 13.5px 27px;
          border-radius: 40px;
          border: none;
          box-shadow: 0 0 28px rgba(164, 236, 112, 0.5), 0 8px 28px rgba(0, 100, 180, 0.3);
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.4s;
        }

        .btn-primary:hover::before {
          transform: translateX(100%);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 45px rgba(0, 164, 236, 1), 0 12px 36px rgba(0, 119, 182, 0.4);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #00a4ec;
          text-decoration: none;
          cursor: none;
          border: 1.5px solid rgba(0, 180, 216, 0.38);
          padding: 12.5px 25px;
          border-radius: 40px;
          backdrop-filter: blur(8px);
          transition: all 0.35s;
          background: transparent;
        }

        .btn-ghost:hover {
          border-color: #00a4ec;
          background: rgba(0, 180, 216, 0.08);
          transform: translateY(-3px);
          box-shadow: 0 0 22px rgba(0, 180, 216, 0.25);
        }

        .arr {
          transition: transform 0.3s;
        }

        .btn-primary:hover .arr,
        .btn-ghost:hover .arr {
          transform: translateX(4px);
        }

        /* ── WEB DEVELOPMENT VISUAL ── */
        .wd-hero-visual {
          position: relative;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
          perspective: 1100px;
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --cube-spin: 0deg;
        }

        .wd-hero-visual::before {
          content: "";
          position: absolute;
          inset: 2% -4% 4% 0;
          background:
            radial-gradient(circle at 70% 22%, rgba(0, 212, 255, 0.2), transparent 30%),
            radial-gradient(ellipse at 52% 82%, rgba(124, 255, 107, 0.12), transparent 44%),
            linear-gradient(135deg, rgba(5, 11, 26, 0.82), rgba(5, 11, 26, 0));
          z-index: -1;
          filter: blur(6px);
        }

        .wd-hero-visual::after {
          content: "";
          position: absolute;
          left: 12%;
          right: 15%;
          bottom: 70px;
          height: 82px;
          background: radial-gradient(ellipse, rgba(0, 212, 255, 0.24), transparent 68%);
          filter: blur(10px);
          z-index: -1;
        }

        .wd-network-lines {
          position: absolute;
          inset: 5% 7% 22% 6%;
          opacity: 0.28;
          background:
            linear-gradient(31deg, transparent 0 47%, rgba(0, 212, 255, 0.22) 48% 49%, transparent 50%),
            linear-gradient(138deg, transparent 0 56%, rgba(124, 255, 107, 0.16) 57% 58%, transparent 59%),
            radial-gradient(circle at 22% 26%, #00d4ff 0 4px, transparent 5px),
            radial-gradient(circle at 76% 42%, #7cff6b 0 4px, transparent 5px),
            radial-gradient(circle at 64% 76%, #00d4ff 0 3px, transparent 4px);
          pointer-events: none;
        }

        .wd-laptop {
          width: 700px;
          height: 382px;
          position: relative;
          transform: rotateX(calc(3deg + var(--tilt-y, 0deg))) rotateY(calc(-7deg + var(--tilt-x, 0deg))) rotateZ(-0.6deg);
          transform-style: preserve-3d;
          transition: transform 0.18s ease-out;
          z-index: 3;
        }

        .wd-screen {
          position: absolute;
          left: 36px;
          right: 36px;
          top: 0;
          height: 338px;
          border: 10px solid #05080d;
          border-radius: 22px;
          background:
            linear-gradient(135deg, rgba(124, 255, 107, 0.1), transparent 32%),
            radial-gradient(circle at 72% 44%, rgba(0, 212, 255, 0.22), transparent 34%),
            linear-gradient(180deg, rgba(9, 24, 43, 0.96), rgba(4, 10, 22, 0.99));
          overflow: hidden;
          padding: 26px 34px 24px;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.62), 0 0 0 1px rgba(0, 212, 255, 0.42), 0 0 60px rgba(0, 212, 255, 0.13);
        }

        .wd-screen::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.72), transparent);
          pointer-events: none;
        }

        .wd-screen-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(112deg, rgba(255, 255, 255, 0.16), transparent 21% 70%, rgba(255, 255, 255, 0.08)), linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 35%);
          opacity: 0.55;
          pointer-events: none;
          z-index: 8;
        }

        .wd-screen-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 42px;
          position: relative;
          z-index: 10;
        }

        .wd-screen-nav span {
          position: absolute;
          left: 0;
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 800;
          color: #9af75a;
        }

        .wd-screen-nav div {
          display: flex;
          justify-content: center;
          gap: 34px;
        }

        .wd-screen-nav button {
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          cursor: none;
          font: 700 11px 'Plus Jakarta Sans', system-ui, sans-serif;
          padding: 0 0 6px;
          transition: color 0.25s, text-shadow 0.25s;
        }

        .wd-screen-nav button.active,
        .wd-screen-nav button:hover {
          color: #7cff6b;
          text-shadow: 0 0 14px rgba(124, 255, 107, 0.72);
          box-shadow: inset 0 -2px 0 #7cff6b;
        }

        .wd-dashboard-copy {
          max-width: 295px;
          position: relative;
          z-index: 5;
          animation: wdPanelIn 0.46s ease both;
        }

        .wd-dashboard-copy small {
          display: block;
          color: rgba(0, 212, 255, 0.72);
          font-size: 10px;
          letter-spacing: 0;
          margin-bottom: 8px;
        }

        .wd-dashboard-copy h3 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 25px;
          line-height: 1.14;
          color: #fff;
          margin-bottom: 16px;
        }

        .wd-dashboard-copy h3 em {
          font-style: normal;
          background: linear-gradient(90deg, #1687ff, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .wd-dashboard-copy p {
          font-size: 10px;
          line-height: 1.6;
          color: rgba(232, 248, 255, 0.6);
          margin-bottom: 20px;
        }

        .wd-holo-cube {
          position: absolute;
          right: 58px;
          top: 82px;
          width: 206px;
          height: 164px;
          border: 0;
          background: transparent;
          cursor: none;
          z-index: 6;
          transform-style: preserve-3d;
        }

        .wd-cube {
          position: absolute;
          left: 90px;
          top: 35px;
          width: 74px;
          height: 74px;
          transform-style: preserve-3d;
          transform: rotateX(-24deg) rotateY(calc(43deg + var(--cube-spin, 0deg)));
          animation: wdCubeSpin 8s linear infinite;
          transition: transform 0.35s ease;
        }

        .wd-holo-cube.is-clicked .wd-cube {
          animation-duration: 2.8s;
        }

        .wd-cube div {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: block;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, rgba(124, 255, 107, 0.74), rgba(0, 212, 255, 0.64));
          box-shadow: inset 0 0 28px rgba(255, 255, 255, 0.13), 0 0 22px rgba(0, 212, 255, 0.34);
        }

        .wd-cube .front { transform: translateZ(37px); }
        .wd-cube .back { transform: rotateY(180deg) translateZ(37px); }
        .wd-cube .right { transform: rotateY(90deg) translateZ(37px); }
        .wd-cube .left { transform: rotateY(-90deg) translateZ(37px); }
        .wd-cube .top { transform: rotateX(90deg) translateZ(37px); }
        .wd-cube .bottom { transform: rotateX(-90deg) translateZ(37px); }

        .wd-cube-rings,
        .wd-cube-pulse {
          position: absolute;
          top: 20px;
          bottom: 15px;
          left: 4px;
          right: 4px;
          border: 1px solid rgba(0, 212, 255, 0.4);
          border-radius: 50%;
          transform: rotateX(68deg);
          box-shadow: 0 0 28px rgba(0, 212, 255, 0.22);
          animation: wdRingPulse 2.8s ease-in-out infinite;
        }

        .wd-cube-pulse {
          top: 40px;
          bottom: 31px;
          left: 34px;
          right: 34px;
          border-color: rgba(124, 255, 107, 0.38);
          animation-delay: -1.2s;
        }

        .wd-cube-particles {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background:
            radial-gradient(circle at 23% 36%, #00d4ff 0 3px, transparent 4px),
            radial-gradient(circle at 75% 28%, #7cff6b 0 3px, transparent 4px),
            radial-gradient(circle at 82% 72%, #1687ff 0 2px, transparent 3px),
            radial-gradient(circle at 34% 82%, #00d4ff 0 2px, transparent 3px);
          animation: wdParticlesDrift 4s ease-in-out infinite;
        }

        .wd-screen-stats {
          position: absolute;
          left: 34px;
          right: 34px;
          bottom: 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 9px;
          z-index: 7;
        }

        .wd-screen-stats span {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 62px;
          border-radius: 10px;
          border: 1px solid rgba(0, 212, 255, 0.12);
          background: rgba(255, 255, 255, 0.052);
          color: #00d4ff;
          padding: 11px 12px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 24px rgba(0, 212, 255, 0.06);
          animation: wdStatsFade 0.55s ease both;
          animation-delay: var(--stat-delay);
        }

        .wd-screen-stats strong {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 17px;
          font-weight: 800;
          line-height: 1;
        }

        .wd-screen-stats small {
          color: rgba(255, 255, 255, 0.58);
          font-size: 9px;
          line-height: 1.25;
          margin-top: 2px;
        }

        .wd-base {
          position: absolute;
          left: 34px;
          right: 34px;
          bottom: 8px;
          height: 48px;
          background: linear-gradient(180deg, rgba(37, 51, 68, 0.96), rgba(7, 12, 20, 0.98)), linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.22), transparent);
          clip-path: polygon(10% 0, 90% 0, 100% 74%, 0 74%);
          border-radius: 0 0 26px 26px;
          box-shadow: 0 22px 42px rgba(0, 0, 0, 0.52), inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        .wd-base::after {
          content: "";
          position: absolute;
          left: 42%;
          right: 42%;
          top: 10px;
          height: 4px;
          border-radius: 99px;
          background: rgba(0, 0, 0, 0.36);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .wd-side-nav {
          position: absolute;
          right: -50px;
          top: 104px;
          display: grid;
          gap: 24px;
          z-index: 7;
        }

        .wd-side-nav::before {
          content: "";
          position: absolute;
          left: 23px;
          top: 42px;
          bottom: 42px;
          width: 1px;
          background: linear-gradient(#7cff6b, #00d4ff, #7cff6b);
          opacity: 0.58;
        }

        .wd-side-nav button {
          position: relative;
          display: grid;
          grid-template-columns: 48px 76px;
          align-items: center;
          gap: 12px;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.88);
          cursor: none;
          font: 800 13px 'Plus Jakarta Sans', system-ui, sans-serif;
          text-align: left;
        }

        .wd-side-nav i {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #00d4ff;
          background: rgba(4, 13, 29, 0.88);
          border: 1px solid rgba(0, 212, 255, 0.44);
          box-shadow: 0 0 26px rgba(0, 212, 255, 0.14);
          transition: color 0.25s, border-color 0.25s, box-shadow 0.25s;
        }

        .wd-side-nav button.active i,
        .wd-side-nav button:hover i {
          color: #7cff6b;
          border-color: #7cff6b;
          box-shadow: 0 0 28px rgba(124, 255, 107, 0.48);
        }

        .wd-side-nav b {
          position: absolute;
          left: 15px;
          top: 15px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid rgba(124, 255, 107, 0.7);
          animation: wdClickRipple 1.5s ease-out infinite;
        }

        .wd-hand-cursor {
          position: absolute;
          right: 28px;
          top: 224px;
          z-index: 10;
          color: #fff;
          font-size: 24px;
          filter: drop-shadow(0 4px 7px rgba(0, 0, 0, 0.65));
          animation: wdHandTap 1.8s ease-in-out infinite;
          pointer-events: none;
        }

        .wd-click-tooltip {
          position: absolute;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%);
          min-width: 230px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          border-radius: 28px;
          border: 1px solid rgba(0, 212, 255, 0.16);
          background: rgba(8, 22, 42, 0.76);
          padding: 13px 22px;
          color: #fff;
          z-index: 9;
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.34);
          backdrop-filter: blur(12px);
        }

        .wd-click-tooltip i {
          font-size: 24px;
        }

        .wd-click-tooltip strong {
          display: block;
          font-size: 14px;
          margin-bottom: 2px;
        }

        /* ── SERVICE GRID ── */
        .wd-services-section {
          max-width: 1280px;
          margin: 0 auto 48px;
          text-align: center;
        }

        .service-section-eyebrow {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #9ef35d;
          margin-bottom: 10px;
        }

        .dm-section-title {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 900;
          color: #fff;
          margin-bottom: 26px;
        }

        .dm-section-title span {
          color: #8ee85b;
        }

        .wd-section-sub {
          color: rgba(232, 248, 255, 0.6);
          font-size: 13px;
          margin-bottom: 36px;
        }

        .wd-service-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .wd-service-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 32px;
          border: 1px solid rgba(0, 180, 216, 0.16);
          border-radius: 14px;
          background: rgba(3, 18, 34, 0.68);
          backdrop-filter: blur(18px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: none;
        }

        .wd-service-card:hover {
          transform: translateY(-10px);
          border-color: rgba(6, 214, 160, 0.25);
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.4), 0 0 42px rgba(0, 119, 182, 0.15);
        }

        .wd-service-card i {
          font-size: 48px;
          margin-bottom: 28px;
          display: block;
        }

        .wd-service-card h3 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.25;
        }

        .wd-service-card p {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(232, 248, 255, 0.6);
          font-weight: 300;
          margin-bottom: 16px;
        }

        .wd-service-card span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #a4ec70;
          text-decoration: none;
          margin-top: 20px;
          transition: gap 0.3s;
        }

        .wd-service-card:hover span {
          gap: 12px;
        }

        /* ── TECH STACKS ── */
        .webapp-tech-panel {
          max-width: 1280px;
          margin: 0 auto 48px;
          background: rgba(3, 18, 34, 0.68);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(0, 180, 216, 0.16);
          border-radius: 14px;
          box-shadow: 0 0 70px rgba(0, 80, 140, 0.08);
          padding: 32px 34px 22px;
        }

        .tech-panel-title {
          text-align: center;
          margin-bottom: 26px;
        }

        .tech-panel-title h2 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 900;
          color: #fff;
          margin-bottom: 8px;
        }

        .tech-panel-title h2 span {
          color: #8ee85b;
        }

        .tech-panel-title p {
          color: rgba(232, 248, 255, 0.6);
          font-size: 13px;
        }

        .tech-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 46px;
          align-items: start;
        }

        .tech-stack-head {
          display: grid;
          grid-template-columns: 74px 1fr;
          gap: 18px;
          align-items: center;
          margin-bottom: 24px;
        }

        .tech-stack-head > i {
          font-size: 56px;
          filter: drop-shadow(0 0 15px rgba(0, 180, 216, 0.35));
        }

        .python-gradient {
          background: linear-gradient(135deg, #306998 50%, #FFD43B 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tech-stack-head h3 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 20px;
          color: #fff;
          margin-bottom: 8px;
        }

        .tech-stack-head p {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(232, 248, 255, 0.6);
          max-width: 380px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }

        .tech-tile {
          height: 80px;
          border: 1px solid rgba(0, 180, 216, 0.14);
          border-radius: 10px;
          background: rgba(4, 19, 35, 0.66);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .tech-tile i {
          font-size: 28px;
        }

        .tech-tile span {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 28px;
          font-weight: 900;
          color: #fff;
        }

        .tech-tile small {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
        }

        .tech-tags {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .tech-tags span {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          border: 1px solid rgba(158, 243, 93, 0.18);
          border-radius: 18px;
          padding: 6px 14px;
          background: rgba(158, 243, 93, 0.04);
        }

        .tech-tags span::before {
          content: "⊙";
          color: #9af75a;
          margin-right: 7px;
        }

        /* ── CTA SECTION ── */
        .webapp-cta {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 96px 1fr auto;
          gap: 26px;
          align-items: center;
          padding: 30px 46px;
          background: linear-gradient(135deg, rgba(9, 29, 57, 0.88), rgba(3, 18, 34, 0.72));
          border: 1px solid rgba(0, 180, 216, 0.16);
          border-radius: 12px;
        }

        .webapp-cta-icon {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(232, 248, 255, 0.45);
          color: #fff;
          font-size: 38px;
          box-shadow: 0 0 24px rgba(120, 140, 255, 0.28), inset 0 0 20px rgba(120, 140, 255, 0.16);
        }

        .webapp-cta h2 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 21px;
          color: #fff;
          margin-bottom: 10px;
        }

        .webapp-cta p {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(232, 248, 255, 0.6);
          max-width: 650px;
        }

        /* ── ANIMATIONS ── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }

        @keyframes wdCubeSpin {
          to { transform: rotateX(-24deg) rotateY(calc(403deg + var(--cube-spin, 0deg))); }
        }

        @keyframes wdRingPulse {
          50% { transform: rotateX(68deg) scale(1.08); opacity: 0.54; }
        }

        @keyframes wdParticlesDrift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(4px, -6px); }
          50% { transform: translate(-3px, 5px); }
          75% { transform: translate(5px, 3px); }
        }

        @keyframes wdPanelIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes wdStatsFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes wdHandTap {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-12deg); }
        }

        @keyframes wdClickRipple {
          from { box-shadow: 0 0 0 0 rgba(124, 255, 107, 0.7); }
          to { box-shadow: 0 0 0 12px rgba(124, 255, 107, 0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1180px) {
          .webapp-hero-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .wd-hero-visual {
            min-height: 430px;
          }

          .wd-laptop {
            transform: rotateX(3deg) rotateY(-7deg) rotateZ(-2deg);
          }

          .tech-columns {
            grid-template-columns: 1fr;
          }

          .wd-service-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 820px) {
          .webapp-page {
            padding: 96px 20px 46px;
          }

          .webapp-benefits {
            grid-template-columns: 1fr;
          }

          .wd-service-grid {
            grid-template-columns: 1fr;
          }

          .wd-hero-visual {
            min-height: 370px;
            overflow: visible;
          }

          .wd-laptop {
            width: 620px;
            transform: scale(0.82) rotateX(3deg) rotateY(-7deg) rotateZ(-2deg);
          }

          .webapp-cta {
            grid-template-columns: 1fr;
            text-align: center;
            justify-items: center;
            padding: 30px 24px;
          }

          .tech-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 540px) {
          .webapp-title {
            font-size: 38px;
          }

          .wd-laptop {
            transform: scale(0.82) rotateX(3deg) rotateY(-5deg) rotateZ(-2deg);
            right: 40px;
          }

          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <main className="webapp-page wd-page wrap">
        <section className="webapp-hero">
          <div className="webapp-breadcrumb reveal">
            <a href="/#hero">Home</a>
            <span>›</span>
            <a href="/#services">Services</a>
            <span>›</span>
            <strong>Web App Development</strong>
          </div>
          <div className="webapp-hero-grid">
            <div className="wd-hero-copy">
              <div className="webapp-pill reveal">Our Service</div>
              <h1 className="webapp-title wd-title reveal reveal-delay-1">
                Web <span>Development</span>
              </h1>
              <h2 className="webapp-kicker reveal reveal-delay-2">Conversion-Focused Websites</h2>
              <p className="webapp-lead reveal reveal-delay-3">
                We build modern, responsive websites that combine exceptional design with powerful functionality. Every website
                is optimized for speed, security, and user experience to help your business attract visitors and convert them
                into customers.
              </p>
              <div className="webapp-benefits reveal reveal-delay-4">
                <div>
                  <i className="fa-solid fa-rocket" aria-hidden="true" />
                  <strong>High Performance</strong>
                  <span>Lightning-fast websites for better engagement</span>
                </div>
                <div>
                  <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                  <strong>Secure & Reliable</strong>
                  <span>Built with security best practices in mind</span>
                </div>
                <div>
                  <i className="fa-solid fa-mobile-screen" aria-hidden="true" />
                  <strong>Fully Responsive</strong>
                  <span>Perfect experience on all devices</span>
                </div>
              </div>
              <div className="webapp-actions reveal reveal-delay-5">
                <a href="/#contact" className="btn-primary">
                  Let&apos;s Build Your Website <span className="arr">→</span>
                </a>
                <a href="#wd-services" className="btn-ghost">
                  View Our Services
                </a>
              </div>
            </div>
            <WebsiteMockup />
          </div>
        </section>

        <section className="wd-services-section" id="wd-services">
          <div className="service-section-eyebrow center reveal">What We Do</div>
          <h2 className="dm-section-title reveal reveal-delay-1">
            Our Web App Development <span>Services</span>
          </h2>
          <p className="wd-section-sub reveal reveal-delay-2">End-to-end web solutions tailored to your business goals.</p>
          <div className="wd-service-grid">
            {developmentServices.map(([icon, title, text, href, color], index) => (
              <a className={`wd-service-card reveal reveal-delay-${index + 1}`} href={href} key={title}>
                <i className={icon} style={{ color }} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span style={{ color }}>Learn more →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="webapp-tech-panel wd-tech-panel reveal">
          <div className="tech-panel-title">
            <div className="service-section-eyebrow center">Tech Stacks We Use</div>
            <h2>
              <span>Modern</span> Technologies, Powerful <span>Solutions</span>
            </h2>
            <p>We use the best technologies to build fast, scalable and future-ready applications.</p>
          </div>
          <div className="tech-columns">
            <div className="tech-stack">
              <div className="tech-stack-head">
                <i className="fab fa-python python-gradient" aria-hidden="true" />
                <div>
                  <h3>Python Stack</h3>
                  <p>Robust, scalable, and secure web applications using the power of Python.</p>
                </div>
              </div>
              <div className="tech-grid">
                {pythonTech.map((item) => (
                  <TechTile item={item} key={item.join('-')} />
                ))}
              </div>
              <div className="tech-tags">
                <span>High Security</span>
                <span>Scalable Architecture</span>
                <span>Rapid Development</span>
              </div>
            </div>
            <div className="tech-stack">
              <div className="tech-stack-head">
                <i className="fa-brands fa-react" aria-hidden="true" style={{ color: '#61DAFB' }} />
                <div>
                  <h3>MERN Stack</h3>
                  <p>Modern JavaScript-based solutions for dynamic and high-performance web applications.</p>
                </div>
              </div>
              <div className="tech-grid">
                {mernTech.map((item) => (
                  <TechTile item={item} key={item.join('-')} />
                ))}
              </div>
              <div className="tech-tags">
                <span>High Performance</span>
                <span>Full-Stack JavaScript</span>
                <span>Great User Experience</span>
              </div>
            </div>
          </div>
        </section>

        <section className="webapp-cta wd-final-cta reveal">
          <div className="webapp-cta-icon">
            <i className="fa-solid fa-rocket" aria-hidden="true" />
          </div>
          <div>
            <h2>Ready to Build Your Next Web Application?</h2>
            <p>Let&apos;s turn your ideas into powerful digital solutions that drive growth and deliver measurable results.</p>
          </div>
          <a href="/#contact" className="btn-primary">
            Get a Free Consultation <span className="arr">→</span>
          </a>
        </section>
      </main>
    </div>
  )
}