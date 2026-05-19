import { useEffect } from 'react'

const heroCards = [
  ['fa-solid fa-lightbulb', '01', 'CONCEPT'],
  ['fa-solid fa-magnifying-glass-chart', '02', 'ANALYZE'],
  ['fa-solid fa-gears', '03', 'VALIDATE'],
  ['fa-solid fa-gear', '04', 'BUILD'],
  ['fa-solid fa-magnifying-glass', '05', 'DELIVER'],
]

const heroPillars = [
  ['fa-solid fa-brain', 'Innovative Ideas', 'We explore creative possibilities and unique solutions.'],
  ['fa-solid fa-magnifying-glass-chart', 'Data-Driven Research', 'We analyze, validate, and ensure market relevance and feasibility.'],
  ['fa-solid fa-microscope', 'Prototyping & Testing', 'We build prototypes, test rigorously, and refine ideas.'],
  ['fa-solid fa-city', 'Real-World Solutions', 'We deliver scalable products that solve real problems.'],
]

const processSteps = [
  ['fa-solid fa-magnifying-glass-chart', '01. Discover', 'We understand your idea, goals, challenges, and target audience.'],
  ['fa-solid fa-chart-line', '02. Research & Validate', 'We conduct market research, competitor analysis, and technical feasibility.'],
  ['fa-solid fa-pen-ruler', '03. Prototype', 'We create prototypes and test core functionality to validate the idea.'],
  ['fa-solid fa-code', '04. Develop', 'We design, build, and integrate the solution with modern technologies.'],
  ['fa-solid fa-rocket', '05. Launch & Scale', 'We deploy, monitor, and optimize for performance and future growth.'],
]

const deliverables = [
  ['fa-solid fa-chart-pie', 'Market Research', 'In-depth market insights and competitor analysis to ensure your idea is positioned for success.'],
  ['fa-regular fa-clipboard', 'Feasibility Study', 'Technical, operational, and financial feasibility to reduce risks and ensure a strong foundation.'],
  ['fa-solid fa-bullseye', 'Product Strategy', 'We define the right product strategy, features, and roadmap aligned with your business goals.'],
  ['fa-solid fa-cube', 'Prototyping', 'Interactive prototypes to visualize, test, and validate your idea before full-scale development.'],
  ['fa-solid fa-code', 'Development', 'High-quality, scalable, and secure development using the latest technologies.'],
]

const trustItems = [
  ['fa-solid fa-lock', 'Innovative Approach', 'We bring creativity and technology together to solve real problems.'],
  ['fa-solid fa-bullseye', 'Market-Focused', 'We build solutions that are user-centric and market-ready.'],
  ['fa-solid fa-shield-halved', 'Proven Expertise', 'Experienced team with a strong track record in R&D and product development.'],
  ['fa-solid fa-chart-line', 'Scalable Solutions', 'We design solutions that grow with your business and future needs.'],
  ['fa-solid fa-users', 'End-to-End Support', 'From ideation to launch and beyond, we are with you at every step.'],
]

const industries = [
  ['fa-regular fa-heart', 'Healthcare'],
  ['fa-solid fa-chart-line', 'Fintech'],
  ['fa-solid fa-cart-shopping', 'E-Commerce'],
  ['fa-solid fa-graduation-cap', 'Education'],
  ['fa-solid fa-house', 'Real Estate'],
  ['fa-solid fa-truck', 'Logistics'],
  ['fa-solid fa-icons', 'Entertainment'],
  ['fa-solid fa-atom', 'SaaS & Startups'],
]

function HeroLabVisual() {
  return (
    <div className="ir-visual" aria-label="R and D idea development visual">
      <div className="ir-bulb">
        <div className="ir-bulb-glass">
          <span />
        </div>
        <div className="ir-bulb-base" />
      </div>
      <div className="ir-orbit ir-orbit-one" />
      <div className="ir-orbit ir-orbit-two" />
      <div className="ir-stage">
        <span />
        <span />
        <span />
      </div>
      {heroCards.map(([icon, number, label], index) => (
        <article className={`ir-float-card ir-float-${index + 1}`} key={`${number}-${label}-${index}`}>
          <i className={icon} aria-hidden="true" />
          <strong>{number}</strong>
          {label && <span>{label}</span>}
        </article>
      ))}
    </div>
  )
}

export default function ImaginationToReality() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="ir-page wrap">
      <style>{`
        .ir-page {
          position: relative;
          z-index: 2;
          padding: 112px clamp(20px, 5vw, 88px) 34px;
          overflow: hidden;
          background:
            radial-gradient(circle at 68% 12%, rgba(0, 119, 255, 0.2), transparent 31%),
            radial-gradient(circle at 7% 49%, rgba(0, 213, 255, 0.1), transparent 28%),
            linear-gradient(180deg, rgba(1, 8, 18, 0.76), rgba(1, 10, 20, 0.96));
        }

        .ir-page::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background-image:
            radial-gradient(circle, rgba(0, 119, 255, 0.68) 0 1.6px, transparent 2px),
            linear-gradient(130deg, transparent 0 22%, rgba(0, 119, 255, 0.1) 22.1% 22.35%, transparent 22.45% 100%),
            linear-gradient(36deg, transparent 0 62%, rgba(0, 213, 255, 0.1) 62.1% 62.35%, transparent 62.45% 100%);
          background-size: 190px 190px, 440px 440px, 390px 390px;
          opacity: 0.56;
        }

        .ir-hero,
        .ir-section,
        .ir-panel,
        .ir-cta {
          max-width: 1360px;
          margin-inline: auto;
        }

        .ir-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 34px;
          color: rgba(232, 248, 255, 0.68);
          font-family: var(--f-label);
          font-size: 13px;
        }

        .ir-breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .ir-breadcrumb strong {
          color: #9af75a;
        }

        .ir-hero-grid {
          display: grid;
          grid-template-columns: minmax(400px, 0.82fr) minmax(560px, 1.18fr);
          align-items: center;
          gap: clamp(34px, 4vw, 66px);
          min-height: 520px;
        }

        .ir-copy {
          padding-bottom: 18px;
        }

        .ir-pill,
        .ir-eyebrow {
          color: #9af75a;
          font-family: var(--f-label);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.7px;
          text-transform: uppercase;
        }

        .ir-pill {
          display: inline-flex;
          border: 1px solid rgba(154, 247, 90, 0.32);
          border-radius: 999px;
          background: rgba(154, 247, 90, 0.06);
          padding: 10px 16px;
          margin-bottom: 24px;
        }

        .ir-title {
          max-width: 520px;
          color: #fff;
          font-family: var(--f-display);
          font-size: clamp(44px, 4.6vw, 64px);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: 0;
          margin-bottom: 16px;
        }

        .ir-grad,
        .ir-title span,
        .ir-section-title span,
        .ir-cta h2 span {
          background: linear-gradient(90deg, #9af75a 0%, #00d5ff 54%, #2874ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ir-title span {
          display: block;
        }

        .ir-subtitle {
          color: #fff;
          font-family: var(--f-display);
          font-size: 21px;
          font-weight: 900;
          margin-bottom: 17px;
        }

        .ir-lead {
          max-width: 520px;
          color: rgba(232, 248, 255, 0.72);
          font-size: 13.5px;
          line-height: 1.78;
          margin-bottom: 28px;
        }

        .ir-hero-pillar-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 30px;
        }

        .ir-hero-pillar i {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          margin-bottom: 16px;
          color: #9af75a;
          font-size: 20px;
          background: rgba(154, 247, 90, 0.08);
          border: 1px solid rgba(154, 247, 90, 0.24);
          border-radius: 12px;
          text-shadow: 0 0 15px rgba(154, 247, 90, 0.3);
          transition: all 0.3s ease;
        }

        .ir-hero-pillar:nth-child(even) i {
          color: #00d5ff;
          background: rgba(0, 213, 255, 0.08);
          border-color: rgba(0, 213, 255, 0.24);
        }

        .ir-hero-pillar:hover i {
          transform: translateY(-5px) rotate(5deg);
          background: rgba(154, 247, 90, 0.15);
          border-color: #9af75a;
          box-shadow: 0 0 20px rgba(154, 247, 90, 0.2);
        }

        .ir-hero-pillar:nth-child(even):hover i {
          background: rgba(0, 213, 255, 0.15);
          border-color: #00d5ff;
          box-shadow: 0 0 20px rgba(0, 213, 255, 0.2);
        }

        .ir-hero-pillar strong {
          display: block;
          color: #fff;
          font-family: var(--f-display);
          font-size: 11px;
          margin-bottom: 7px;
        }

        .ir-hero-pillar span {
          display: block;
          color: rgba(232, 248, 255, 0.64);
          font-size: 10px;
          line-height: 1.48;
        }

        .ir-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .ir-actions .btn-primary,
        .ir-actions .btn-ghost,
        .ir-cta .btn-primary {
          border-radius: 8px;
          min-width: 194px;
          justify-content: center;
        }

        .ir-actions .btn-ghost {
          color: #fff;
        }

        .ir-visual {
          position: relative;
          min-height: 500px;
          isolation: isolate;
        }

        .ir-orbit {
          position: absolute;
          left: 50%;
          top: 47%;
          border: 1.5px dashed rgba(0, 213, 255, 0.28);
          border-radius: 50%;
          transition: all 0.8s ease;
          pointer-events: none;
        }

        .ir-orbit::before {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          background: #00d5ff;
          border-radius: 50%;
          box-shadow: 0 0 15px #00d5ff, 0 0 30px #00d5ff;
        }

        .ir-orbit-one {
          width: 440px;
          height: 260px;
          animation: irRotateOne 20s linear infinite;
        }

        .ir-orbit-one::before {
          top: 50%;
          left: -4px;
        }

        .ir-orbit-two {
          width: 560px;
          height: 320px;
          animation: irRotateTwo 30s linear infinite;
          opacity: 0.45;
          border-color: rgba(154, 247, 90, 0.3);
        }

        .ir-orbit-two::before {
          top: -4px;
          left: 50%;
          background: #9af75a;
          box-shadow: 0 0 15px #9af75a, 0 0 30px #9af75a;
        }

        .ir-bulb:hover ~ .ir-orbit {
          border-color: rgba(255, 176, 55, 0.5);
          border-style: solid;
          opacity: 0.8;
        }

        .ir-bulb:hover ~ .ir-orbit-one { animation-duration: 8s; }
        .ir-bulb:hover ~ .ir-orbit-two { animation-duration: 12s; }

        .ir-bulb {
          position: absolute;
          z-index: 4;
          left: 50%;
          top: 50%;
          width: 135px;
          height: 218px;
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 0 48px rgba(255, 176, 55, 0.62));
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: none;
          animation: irBulbPulse 4s ease-in-out infinite alternate;
        }

        @keyframes irBulbPulse {
          from { filter: drop-shadow(0 0 30px rgba(255, 176, 55, 0.4)); }
          to { filter: drop-shadow(0 0 60px rgba(255, 176, 55, 0.7)); }
        }

        .ir-bulb:hover {
          transform: translate(-50%, -55%) scale(1.1);
          filter: drop-shadow(0 0 80px rgba(255, 176, 55, 0.95));
        }

        .ir-bulb-glass {
          position: absolute;
          left: 12px;
          right: 12px;
          top: 0;
          height: 132px;
          border-radius: 50% 50% 44% 44%;
          background:
            radial-gradient(circle at 48% 58%, rgba(255, 255, 255, 0.95), rgba(255, 194, 70, 0.55) 20%, transparent 36%),
            radial-gradient(circle at 35% 22%, rgba(255, 245, 190, 0.85), rgba(255, 175, 51, 0.7) 34%, rgba(93, 50, 17, 0.52) 69%, rgba(255, 255, 255, 0.12));
          border: 3px solid rgba(255, 225, 126, 0.52);
          box-shadow:
            inset 0 0 28px rgba(255, 255, 255, 0.26),
            0 0 85px rgba(255, 166, 40, 0.6);
          overflow: hidden;
          transition: all 0.6s ease;
        }

        .ir-bulb:hover .ir-bulb-glass {
          background:
            radial-gradient(circle at 48% 58%, rgba(255, 255, 255, 1), rgba(255, 214, 110, 0.75) 25%, transparent 40%),
            radial-gradient(circle at 35% 22%, rgba(255, 255, 220, 1), rgba(255, 195, 71, 0.85) 34%, rgba(123, 70, 27, 0.62) 69%, rgba(255, 255, 255, 0.2));
          border-color: rgba(255, 250, 195, 0.9);
          box-shadow:
            inset 0 0 40px rgba(255, 255, 255, 0.4),
            0 0 120px rgba(255, 176, 55, 0.85);
        }

        .ir-bulb-glass::before,
        .ir-bulb-glass::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 26px;
          width: 2px;
          height: 58px;
          background: rgba(255, 250, 195, 0.86);
          transform-origin: bottom;
        }

        .ir-bulb-glass::before {
          transform: translateX(-50%) rotate(-22deg);
        }

        .ir-bulb-glass::after {
          transform: translateX(-50%) rotate(22deg);
        }

        .ir-bulb-glass span {
          position: absolute;
          left: 50%;
          bottom: 24px;
          width: 42px;
          height: 25px;
          transform: translateX(-50%);
          border: 2px solid rgba(255, 250, 195, 0.78);
          border-top: 0;
          border-radius: 0 0 26px 26px;
          transition: all 0.6s ease;
        }

        .ir-bulb:hover .ir-bulb-glass span {
          border-width: 3px;
          border-color: #fff;
          box-shadow: 0 0 15px #fff;
        }

        .ir-bulb-base {
          position: absolute;
          left: 50%;
          top: 120px;
          width: 62px;
          height: 78px;
          transform: translateX(-50%);
          border-radius: 18px 18px 24px 24px;
          background:
            repeating-linear-gradient(180deg, #273442 0 10px, #101720 10px 18px),
            linear-gradient(90deg, #111820, #526070, #101720);
          box-shadow: 0 18px 26px rgba(0, 0, 0, 0.48);
        }

        @keyframes irRotateOne {
          from { transform: translate(-50%, -50%) rotate(-15deg); }
          to { transform: translate(-50%, -50%) rotate(345deg); }
        }

        @keyframes irRotateTwo {
          from { transform: translate(-50%, -50%) rotate(20deg); }
          to { transform: translate(-50%, -50%) rotate(-340deg); }
        }

        .ir-stage {
          position: absolute;
          z-index: 2;
          left: 50%;
          bottom: 48px;
          width: 390px;
          height: 126px;
          transform: translateX(-50%);
        }

        .ir-stage span {
          position: absolute;
          left: 50%;
          bottom: 0;
          border-radius: 50%;
          border: 2px solid rgba(0, 139, 255, 0.72);
          background: radial-gradient(ellipse, rgba(0, 119, 255, 0.5), transparent 62%);
          box-shadow:
            0 0 20px rgba(0, 180, 255, 0.8),
            0 0 70px rgba(0, 80, 255, 0.48);
          transform: translateX(-50%) rotateX(66deg);
        }

        .ir-stage span:nth-child(1) {
          width: 386px;
          height: 96px;
          opacity: 0.62;
        }

        .ir-stage span:nth-child(2) {
          width: 286px;
          height: 74px;
          bottom: 20px;
        }

        .ir-stage span:nth-child(3) {
          width: 176px;
          height: 46px;
          bottom: 42px;
          background: radial-gradient(ellipse, rgba(0, 213, 255, 0.82), transparent 66%);
        }

        .ir-float-card {
          position: absolute;
          z-index: 5;
          display: grid;
          grid-template-columns: 38px auto;
          align-items: center;
          gap: 10px;
          min-width: 108px;
          min-height: 68px;
          border: 1px solid rgba(0, 139, 255, 0.62);
          border-radius: 10px;
          background: rgba(6, 18, 34, 0.78);
          box-shadow:
            0 0 26px rgba(0, 119, 255, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          padding: 12px 14px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: none;
        }

        .ir-float-card:hover {
          transform: scale(1.1) translateY(-10px) !important;
          border-color: #9af75a;
          box-shadow: 0 15px 35px rgba(0, 213, 255, 0.3), 0 0 20px rgba(154, 247, 90, 0.2);
          z-index: 10;
        }

        .ir-float-card i {
          grid-row: span 2;
          color: #00d5ff;
          font-size: 24px;
        }

        .ir-float-card strong {
          color: #fff;
          font-family: var(--f-display);
          font-size: 22px;
          line-height: 1;
        }

        .ir-float-card span {
          color: #fff;
          font-family: var(--f-label);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.7px;
          text-transform: uppercase;
        }

        .ir-float-1 { left: 43%; top: 4%; }
        .ir-float-2 { right: 5%; top: 23%; }
        .ir-float-3 { right: 11%; top: 55%; }
        .ir-float-4 { left: 20%; top: 55%; }
        .ir-float-5 { left: 16%; top: 25%; }

        .ir-section {
          padding: 60px 0;
          border-top: 1px solid rgba(0, 180, 216, 0.08);
          text-align: center;
        }

        .ir-eyebrow {
          margin-bottom: 12px;
        }

        .ir-section-title {
          color: #fff;
          font-family: var(--f-display);
          font-size: clamp(31px, 3.15vw, 45px);
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: 0;
          margin-bottom: 13px;
        }

        .ir-section-sub {
          color: rgba(232, 248, 255, 0.68);
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 43px;
        }

        .ir-process-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 38px;
        }

        .ir-process-step {
          position: relative;
          transition: all 0.4s ease;
          cursor: none;
        }

        .ir-process-step:hover {
          transform: translateY(-8px);
        }

        .ir-process-step:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 44px;
          left: calc(50% + 54px);
          width: 86px;
          height: 1px;
          border-top: 2px dotted rgba(154, 247, 90, 0.66);
          transition: all 0.4s ease;
        }

        .ir-process-step:hover:not(:last-child)::after {
          border-top-style: solid;
          border-color: #9af75a;
          width: 100px;
          left: calc(50% + 47px);
        }

        .ir-process-step i {
          display: grid;
          place-items: center;
          width: 86px;
          height: 86px;
          margin: 0 auto 24px;
          border-radius: 50%;
          border: 2px solid rgba(154, 247, 90, 0.74);
          background: radial-gradient(circle, rgba(154, 247, 90, 0.12), rgba(3, 18, 35, 0.82));
          color: #9af75a;
          font-size: 29px;
          box-shadow: 0 0 24px rgba(154, 247, 90, 0.18);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .ir-process-step:hover i {
          transform: scale(1.15) rotate(10deg);
          border-color: #fff;
          box-shadow: 0 0 40px rgba(154, 247, 90, 0.4);
          background: rgba(154, 247, 90, 0.2);
        }

        .ir-process-step:nth-child(2) i,
        .ir-process-step:nth-child(4) i {
          border-color: rgba(0, 119, 255, 0.82);
          color: #2874ff;
        }

        .ir-process-step:nth-child(3) i {
          border-color: rgba(130, 79, 255, 0.86);
          color: #8d73ff;
        }

        .ir-process-step h3 {
          color: #fff;
          font-family: var(--f-display);
          font-size: 14px;
          margin-bottom: 13px;
        }

        .ir-process-step h3 span {
          color: #9af75a;
        }

        .ir-process-step p,
        .ir-deliver-card p,
        .ir-trust-item p,
        .ir-cta p {
          color: rgba(232, 248, 255, 0.7);
          font-size: 13px;
          line-height: 1.7;
        }

        .ir-panel {
          border: 1px solid rgba(0, 180, 216, 0.14);
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(7, 29, 54, 0.62), rgba(2, 16, 30, 0.82));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
          padding: 42px 26px 30px;
          text-align: center;
        }

        .ir-deliver-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 22px;
          margin-top: 32px;
        }

        .ir-deliver-card {
          min-height: 300px;
          border: 1px solid rgba(0, 180, 216, 0.13);
          border-radius: 8px;
          background: linear-gradient(145deg, rgba(7, 29, 54, 0.66), rgba(2, 16, 30, 0.78));
          padding: 34px 26px;
          text-align: left;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: none;
        }

        .ir-deliver-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(0, 213, 255, 0.45);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4), 0 0 25px rgba(0, 213, 255, 0.15);
        }

        .ir-deliver-card i {
          color: #00d5ff;
          font-size: 38px;
          text-shadow: 0 0 22px rgba(0, 213, 255, 0.28);
          transition: all 0.4s ease;
        }

        .ir-deliver-card:hover i {
          transform: scale(1.1) translateX(5px);
          color: #9af75a;
          text-shadow: 0 0 30px rgba(154, 247, 90, 0.5);
        }

        .ir-deliver-card:nth-child(3) i,
        .ir-deliver-card:nth-child(4) i {
          color: #2874ff;
        }

        .ir-deliver-card h3,
        .ir-trust-item h3 {
          color: #fff;
          font-family: var(--f-display);
          font-size: 16px;
          margin: 28px 0 14px;
        }

        .ir-deliver-card a {
          display: inline-flex;
          color: #9af75a;
          font-family: var(--f-label);
          font-size: 12px;
          font-weight: 900;
          margin-top: 26px;
          text-decoration: none;
        }

        .ir-trust-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0;
          margin-top: 46px;
        }

        .ir-trust-item {
          padding: 0 27px;
          border-right: 1px dashed rgba(0, 180, 216, 0.34);
          transition: all 0.4s ease;
          cursor: default;
        }

        .ir-trust-item:hover {
          background: rgba(255, 255, 255, 0.03);
          transform: scale(1.05);
          z-index: 2;
        }

        .ir-trust-item:last-child {
          border-right: 0;
        }

        .ir-trust-item i {
          color: #00d5ff;
          font-size: 38px;
        }

        .ir-trust-item:nth-child(even) i {
          color: #9af75a;
        }

        .ir-industries {
          margin-top: 28px;
        }

        .ir-industry-grid {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 28px;
          margin-top: 34px;
        }

        .ir-industry {
          display: grid;
          justify-items: center;
          gap: 12px;
          color: #fff;
          font-family: var(--f-display);
          font-size: 13px;
          font-weight: 800;
          transition: all 0.3s ease;
          cursor: none;
        }

        .ir-industry:hover {
          transform: translateY(-5px);
          color: #9af75a;
        }

        .ir-industry i {
          color: #00d5ff;
          font-size: 32px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .ir-industry:hover i {
          transform: scale(1.2) rotate(8deg);
          color: #9af75a;
          filter: drop-shadow(0 0 15px rgba(154, 247, 90, 0.6));
        }

        .ir-industry:nth-child(even) i {
          color: #9af75a;
        }

        .ir-cta {
          display: grid;
          grid-template-columns: 300px minmax(0, 1fr) 350px;
          align-items: center;
          gap: 32px;
          margin-top: 32px;
          border: 1px solid rgba(0, 180, 216, 0.16);
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(8, 31, 61, 0.78), rgba(3, 18, 34, 0.88));
          overflow: hidden;
          padding: 0 44px 0 0;
          transition: all 0.5s ease;
        }

        .ir-cta:hover {
          border-color: rgba(154, 247, 90, 0.4);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(154, 247, 90, 0.1);
        }

        .ir-rocket-art {
          position: relative;
          min-height: 250px;
          overflow: hidden;
        }

        .ir-rocket-art::before {
          content: "";
          position: absolute;
          left: 22px;
          bottom: -30px;
          width: 220px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255, 255, 255, 0.7), rgba(128, 118, 255, 0.38), transparent 70%);
        }

        .ir-rocket {
          position: absolute;
          left: 102px;
          bottom: 28px;
          width: 82px;
          height: 150px;
          transform: rotate(28deg);
          border-radius: 48% 48% 32% 32%;
          background: linear-gradient(145deg, #eef8ff 0%, #8796bd 56%, #323b68 100%);
          box-shadow: 0 0 34px rgba(0, 119, 255, 0.44);
        }

        .ir-rocket::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 23px;
          width: 32px;
          height: 32px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, #0b1d30 0 43%, #9af75a 45% 70%, #07101e 72%);
        }

        .ir-rocket::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -76px;
          width: 48px;
          height: 92px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: linear-gradient(180deg, #ffffff, #7c7dff 38%, transparent 88%);
          filter: blur(2px);
        }

        .ir-cta h2 {
          color: #fff;
          font-family: var(--f-display);
          font-size: clamp(31px, 3.2vw, 48px);
          line-height: 1.14;
          letter-spacing: 0;
          margin-bottom: 20px;
        }

        .ir-cta-actions {
          display: grid;
          gap: 16px;
        }

        .ir-cta-actions .btn-primary {
          width: 100%;
        }

        .ir-cta-actions p {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
        }

        .ir-cta-actions i {
          color: #9af75a;
        }

        @media (max-width: 1200px) {
          .ir-hero-grid,
          .ir-cta {
            grid-template-columns: 1fr;
          }

          .ir-visual {
            max-width: 720px;
            width: 100%;
            margin-inline: auto;
          }

          .ir-process-row,
          .ir-deliver-grid,
          .ir-trust-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ir-process-step::after {
            display: none;
          }

          .ir-trust-item {
            border-right: 0;
            border-bottom: 1px dashed rgba(0, 180, 216, 0.22);
            padding: 26px;
          }

          .ir-industry-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .ir-cta {
            padding: 0 28px 30px;
          }
        }

        @media (max-width: 720px) {
          .ir-page {
            padding: 82px 18px 30px;
          }

          .ir-breadcrumb {
            margin-bottom: 32px;
          }

          .ir-hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
            text-align: center;
          }

          .ir-title {
            font-size: clamp(38px, 12vw, 50px);
          }

          .ir-hero-pillar-grid,
          .ir-process-row,
          .ir-deliver-grid,
          .ir-trust-row,
          .ir-industry-grid {
            grid-template-columns: 1fr;
          }

          .ir-actions,
          .ir-actions .btn-primary,
          .ir-actions .btn-ghost {
            width: 100%;
          }

          .ir-visual {
            min-height: 340px;
            transform: scale(0.65);
            transform-origin: top center;
            margin: 0 auto -110px;
          }

          .ir-section,
          .ir-panel {
            padding-top: 44px;
            padding-bottom: 44px;
          }

          .ir-panel {
            padding-left: 16px;
            padding-right: 16px;
          }

          .ir-cta {
            padding: 0 20px 26px;
          }
        }

        @media (max-width: 460px) {
          .ir-visual {
            transform: scale(0.52);
            margin-bottom: -220px;
          }

          .ir-float-1 { left: 32%; }
          .ir-float-2 { right: -8%; }
          .ir-float-3 { right: -6%; }
          .ir-float-4 { left: 2%; }
          .ir-float-5 { left: -3%; }
        }
      `}</style>

      <section className="ir-hero">
        <div className="ir-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>&gt;</span>
          <a href="/#services">Services</a>
          <span>&gt;</span>
          <strong>Imagination to Reality</strong>
        </div>

        <div className="ir-hero-grid">
          <div className="ir-copy">
            <div className="ir-pill reveal">Our Service</div>
            <h1 className="ir-title reveal reveal-delay-1">Imagination to <span>Reality</span></h1>
            <h2 className="ir-subtitle reveal reveal-delay-2">Research & Development (R&D)</h2>
            <p className="ir-lead reveal reveal-delay-3">
              We turn your ideas into innovative digital solutions through in-depth research, validation, and development.
              From concept to creation, we make your vision a reality.
            </p>

            <div className="ir-hero-pillar-grid reveal reveal-delay-4">
              {heroPillars.map(([icon, title, text]) => (
                <article className="ir-hero-pillar" key={title}>
                  <i className={icon} aria-hidden="true" />
                  <strong>{title}</strong>
                  <span>{text}</span>
                </article>
              ))}
            </div>

            <div className="ir-actions reveal reveal-delay-4">
              <a className="btn-primary" href="/#contact">Let's Build Your Idea <span className="arr">&#8599;</span></a>
              <a className="btn-ghost" href="#ir-work">View Our Work</a>
            </div>
          </div>

          <HeroLabVisual />
        </div>
      </section>

      <section className="ir-section">
        <div className="ir-eyebrow reveal">Our R&D Process</div>
        <h2 className="ir-section-title reveal reveal-delay-1">A Proven Path from <span>Idea to Impact</span></h2>
        <p className="ir-section-sub reveal reveal-delay-2">A structured approach that ensures your idea is validated, developed, and delivered successfully.</p>
        <div className="ir-process-row">
          {processSteps.map(([icon, title, text]) => (
            <article className="ir-process-step reveal" key={title}>
              <i className={icon} aria-hidden="true" />
              <h3><span>{title.slice(0, 3)}</span>{title.slice(3)}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ir-panel" id="ir-work">
        <div className="ir-eyebrow reveal">What We Deliver</div>
        <h2 className="ir-section-title reveal reveal-delay-1">From <span>Concept</span> to Complete <span>Solution</span></h2>
        <div className="ir-deliver-grid">
          {deliverables.map(([icon, title, text]) => (
            <article className="ir-deliver-card reveal" key={title}>
              <i className={icon} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
          
            </article>
          ))}
        </div>
      </section>

      <section className="ir-section">
        <div className="ir-eyebrow reveal">Why Choose Us</div>
        <h2 className="ir-section-title reveal reveal-delay-1">Why Businesses Trust <span>Bit Byte</span> for <span>R&D</span></h2>
        <div className="ir-trust-row">
          {trustItems.map(([icon, title, text]) => (
            <article className="ir-trust-item reveal" key={title}>
              <i className={icon} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ir-panel ir-industries">
        <div className="ir-eyebrow reveal">Industries We Empower</div>
        <h2 className="ir-section-title reveal reveal-delay-1"><span>Innovating</span> Across <span>Industries</span></h2>
        <div className="ir-industry-grid">
          {industries.map(([icon, title]) => (
            <article className="ir-industry reveal" key={title}>
              <i className={icon} aria-hidden="true" />
              <span>{title}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="ir-cta reveal">
        <div className="ir-rocket-art" aria-hidden="true">
          <div className="ir-rocket" />
        </div>
        <div>
          <h2>Have an Idea?<br />Let's Turn It Into <span>Reality!</span></h2>
          <p>Share your idea with us and let our R&D experts build something amazing together.</p>
        </div>
        <div className="ir-cta-actions">
          <a className="btn-primary" href="/#contact">Get a Free Consultation <span className="arr">&#8594;</span></a>
          <p><i className="fa-brands fa-whatsapp" aria-hidden="true" /> No obligation. Just a conversation.</p>
        </div>
      </section>
    </main>
  )
}