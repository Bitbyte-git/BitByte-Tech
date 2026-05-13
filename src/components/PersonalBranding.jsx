const brandServices = [
  ['fa-regular fa-user', 'Profile Optimization', 'We optimize your social media profiles to reflect your expertise and create a strong first impression.'],
  ['fa-regular fa-newspaper', 'Content Strategy', 'We create a content strategy that showcases your knowledge, story, and value.'],
  ['fa-solid fa-palette', 'Visual Branding', 'From professional graphics to branded templates, we design a visual identity that you.'],
  ['fa-solid fa-chart-line', 'Growth & Engagement', 'We help you grow your audience and engage meaningfully across the right platforms.'],
]

const heroBenefits = [
  ['fa-regular fa-user', 'Build Credibility', 'Position yourself as a trusted expert'],
  ['fa-solid fa-bullhorn', 'Increase Visibility', 'Reach the right audience across platforms'],
  ['fa-solid fa-users', 'Grow Influence', 'Engage, connect & build a loyal community'],
  ['fa-solid fa-chart-line', 'Drive Opportunities', 'Attract new clients, partnerships & growth'],
]

const processSteps = [
  ['fa-solid fa-magnifying-glass-chart', '01. Discovery', 'We understand your goals, expertise, and target audience.'],
  ['fa-solid fa-pen-ruler', '02. Strategy', 'We create a customized branding and content strategy.'],
  ['fa-solid fa-pen-fancy', '03. Create', 'We design, write, and develop content that represents you.'],
  ['fa-solid fa-rocket', '04. Grow', 'We publish, promote, and grow your brand consistently.'],
  ['fa-solid fa-chart-column', '05. Measure', 'We track performance and optimize for better results.'],
]

const impactCards = [
  ['fa-regular fa-eye', '10X', 'More Visibility', 'Get noticed by the right people and opportunities.'],
  ['fa-solid fa-shield-halved', '', 'Build Trust', 'Establish credibility and become a go-to expert.'],
  ['fa-solid fa-users', '', 'Grow Your Network', 'Connect with industry leaders, clients & collaborators.'],
  ['fa-solid fa-trophy', '', 'Career & Business Growth', 'Unlock new opportunities for success and growth.'],
]

const stories = [
  ['https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop', 'Vasanth & Co', 'Social Media Branding'],
  ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop', 'Bharathi Jewellers', 'Founder Branding'],
  ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop', 'Real Estate Consultant', 'LinkedIn Personal Branding'],
  ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop', 'Fitness Coach', 'Instagram Growth Strategy'],
]

function BrandingMockup() {
  return (
    <div className="pb-visual" aria-label="Personal branding website mockup">
      <div className="pb-plant pb-plant-left" aria-hidden="true" />
      <div className="pb-plant pb-plant-right" aria-hidden="true" />
      <div className="pb-laptop">
        <div className="pb-laptop-screen">
          <div className="pb-screen-nav">
            <span><i /> Bit Byte</span>
            <b>Home</b>
            <b>About</b>
            <b>Agenda</b>
            <b>Contact</b>
          </div>
          <div className="pb-screen-content">
            <div>
              <h3>Building Personal Brands That <span>Inspire Trust</span></h3>
              <p>We craft powerful personal brands that reflect your identity, expertise, and vision.</p>
              <button type="button">Get Started</button>
            </div>
            <div className="pb-portrait">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=420&auto=format&fit=crop" alt="" />
            </div>
          </div>
        </div>
        <div className="pb-laptop-base" />
      </div>
      <div className="pb-phone">
        <div className="pb-phone-speaker" />
        <div className="pb-phone-top">
          <span><i /> BitByte</span>
          <b />
        </div>
        <h3>Building Personal Brands That <span>Inspire Trust</span></h3>
        <p>We craft powerful personal brands that reflect your identity, expertise, and vision.</p>
        <button type="button">Get Started</button>
        <strong>Our Services</strong>
        <em>Personal Branding</em>
      </div>
      <div className="pb-rock" aria-hidden="true" />
    </div>
  )
}

export default function PersonalBranding() {
  return (
    <main className="pb-page wrap">
      <style>{`
        .pb-page {
          position: relative;
          z-index: 2;
          padding: 94px clamp(20px, 5vw, 96px) 34px;
          background:
            radial-gradient(circle at 92% 10%, rgba(0, 119, 255, 0.18), transparent 31%),
            radial-gradient(circle at 7% 53%, rgba(0, 213, 255, 0.1), transparent 28%),
            linear-gradient(180deg, rgba(1, 8, 18, 0.72), rgba(1, 10, 19, 0.96));
          overflow: hidden;
        }

        .pb-page::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background-image:
            radial-gradient(circle, rgba(0, 119, 255, 0.7) 0 2px, transparent 2.5px),
            linear-gradient(125deg, transparent 0 16%, rgba(0, 119, 255, 0.14) 16.1% 16.4%, transparent 16.5% 100%),
            linear-gradient(32deg, transparent 0 72%, rgba(0, 213, 255, 0.13) 72.1% 72.35%, transparent 72.45% 100%);
          background-size: 180px 180px, 420px 420px, 360px 360px;
          opacity: 0.58;
        }

        .pb-hero,
        .pb-section,
        .pb-cta {
          max-width: 1320px;
          margin-inline: auto;
        }

        .pb-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 54px;
          color: rgba(232, 248, 255, 0.68);
          font-family: var(--f-label);
          font-size: 11px;
        }

        .pb-breadcrumb a {
          color: inherit;
          text-decoration: none;
        }

        .pb-breadcrumb strong {
          color: #9af75a;
        }

        .pb-hero-grid {
          display: grid;
          grid-template-columns: minmax(420px, 0.82fr) minmax(560px, 1.18fr);
          align-items: center;
          gap: clamp(36px, 5vw, 84px);
          min-height: 520px;
        }

        .pb-pill,
        .pb-eyebrow {
          color: #9af75a;
          font-family: var(--f-label);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .pb-pill {
          display: inline-flex;
          border: 1px solid rgba(154, 247, 90, 0.3);
          border-radius: 999px;
          background: rgba(154, 247, 90, 0.06);
          padding: 10px 16px;
          margin-bottom: 25px;
        }

        .pb-title {
          color: #fff;
          font-family: var(--f-display);
          font-size: clamp(48px, 5.7vw, 76px);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: 0;
          margin-bottom: 17px;
        }

        .pb-grad,
        .pb-title span,
        .pb-section-title span,
        .pb-cta h2 span {
          background: linear-gradient(90deg, #9af75a 0%, #00d5ff 56%, #2874ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pb-subtitle {
          color: #fff;
          font-family: var(--f-display);
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 21px;
        }

        .pb-lead {
          max-width: 565px;
          color: rgba(232, 248, 255, 0.67);
          font-size: 14px;
          line-height: 1.9;
          margin-bottom: 34px;
        }

        .pb-benefits {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 19px;
          margin-bottom: 34px;
        }

        .pb-benefit i {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          color: #9af75a;
          font-size: 25px;
          margin-bottom: 12px;
          text-shadow: 0 0 18px rgba(154, 247, 90, 0.35);
        }

        .pb-benefit:nth-child(even) i {
          color: #00d5ff;
        }

        .pb-benefit strong {
          display: block;
          color: #fff;
          font-family: var(--f-display);
          font-size: 11px;
          margin-bottom: 7px;
        }

        .pb-benefit span {
          display: block;
          color: rgba(232, 248, 255, 0.62);
          font-size: 10px;
          line-height: 1.55;
        }

        .pb-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .pb-actions .btn-primary,
        .pb-actions .btn-ghost,
        .pb-cta .btn-primary {
          border-radius: 8px;
          min-width: 196px;
          justify-content: center;
        }

        .pb-actions .btn-ghost {
          color: #fff;
        }

        .pb-visual {
          position: relative;
          min-height: 520px;
          isolation: isolate;
        }

        .pb-laptop {
          position: absolute;
          z-index: 3;
          right: 34px;
          top: 18px;
          width: min(690px, 92%);
          height: 400px;
          transform: rotateZ(-6deg) skewX(-2deg);
          transform-origin: center bottom;
        }

        .pb-laptop-screen {
          position: absolute;
          inset: 0 32px 62px 22px;
          border: 8px solid #0b0d12;
          border-radius: 14px;
          background:
            radial-gradient(circle at 73% 54%, rgba(0, 119, 255, 0.36), transparent 31%),
            linear-gradient(135deg, #071525, #020913 74%);
          padding: 34px 38px;
          overflow: hidden;
          box-shadow: 0 28px 62px rgba(0, 0, 0, 0.55);
        }

        .pb-screen-nav {
          display: flex;
          align-items: center;
          gap: 22px;
          color: rgba(255, 255, 255, 0.75);
          font-size: 8px;
          margin-bottom: 52px;
        }

        .pb-screen-nav span,
        .pb-phone-top span {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-right: auto;
          color: #9af75a;
          font-family: var(--f-display);
          font-weight: 900;
        }

        .pb-screen-nav i,
        .pb-phone-top i {
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 2px solid #00d5ff;
          box-shadow: 10px 0 0 -4px #9af75a;
        }

        .pb-screen-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 210px;
          align-items: center;
          gap: 20px;
        }

        .pb-screen-content h3,
        .pb-phone h3 {
          color: #fff;
          font-family: var(--f-display);
          font-size: 24px;
          line-height: 1.13;
          max-width: 280px;
          margin-bottom: 15px;
        }

        .pb-screen-content h3 span,
        .pb-phone h3 span {
          display: block;
          color: #9af75a;
        }

        .pb-screen-content p,
        .pb-phone p {
          color: rgba(232, 248, 255, 0.72);
          font-size: 10px;
          line-height: 1.65;
          max-width: 252px;
          margin-bottom: 18px;
        }

        .pb-screen-content button,
        .pb-phone button {
          border: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #9af75a, #00d5ff);
          color: #00150e;
          font-family: var(--f-display);
          font-size: 8px;
          font-weight: 900;
          padding: 10px 18px;
        }

        .pb-portrait {
          position: relative;
          width: 198px;
          height: 230px;
          border-radius: 0 0 100px 100px;
          overflow: hidden;
          filter: drop-shadow(0 0 30px rgba(0, 119, 255, 0.42));
        }

        .pb-portrait::before {
          content: "";
          position: absolute;
          inset: 10px;
          border: 1px solid rgba(0, 213, 255, 0.36);
          border-radius: 50%;
          z-index: 2;
        }

        .pb-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 18%;
        }

        .pb-laptop-base {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 22px;
          height: 94px;
          background: linear-gradient(180deg, #29323c, #0d1219 62%, #06080c);
          clip-path: polygon(11% 0, 89% 0, 100% 67%, 0 67%);
          border-radius: 0 0 42px 42px;
          box-shadow: 0 30px 48px rgba(0, 0, 0, 0.72);
        }

        .pb-phone {
          position: absolute;
          z-index: 4;
          right: 0;
          top: 152px;
          width: 178px;
          height: 315px;
          border: 8px solid #080a0e;
          border-radius: 30px;
          background:
            radial-gradient(circle at 70% 18%, rgba(0, 119, 255, 0.28), transparent 34%),
            #071322;
          padding: 30px 17px 18px;
          box-shadow:
            0 22px 48px rgba(0, 0, 0, 0.72),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08);
          transform: rotateZ(-2deg);
          overflow: hidden;
        }

        .pb-phone-speaker {
          position: absolute;
          top: 12px;
          left: 50%;
          width: 46px;
          height: 4px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: #121a25;
        }

        .pb-phone-top {
          display: flex;
          align-items: center;
          margin-bottom: 28px;
          font-size: 8px;
        }

        .pb-phone-top b {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 1px solid rgba(232, 248, 255, 0.65);
        }

        .pb-phone h3 {
          font-size: 17px;
        }

        .pb-phone strong {
          display: block;
          color: #fff;
          font-size: 11px;
          margin: 22px 0 10px;
        }

        .pb-phone em {
          color: #00d5ff;
          font-size: 10px;
          font-style: normal;
        }

        .pb-rock {
          position: absolute;
          z-index: 1;
          left: 16%;
          right: 4%;
          bottom: 42px;
          height: 74px;
          border-radius: 50%;
          background:
            linear-gradient(180deg, rgba(60, 69, 78, 0.72), rgba(12, 16, 20, 0.96)),
            radial-gradient(ellipse, rgba(255, 255, 255, 0.16), transparent 68%);
          box-shadow: 0 28px 42px rgba(0, 0, 0, 0.62);
          transform: rotateX(58deg);
        }

        .pb-plant {
          position: absolute;
          z-index: 2;
          width: 130px;
          height: 210px;
          bottom: 88px;
          background: repeating-radial-gradient(ellipse at 50% 50%, rgba(119, 210, 94, 0.95) 0 6px, transparent 7px 15px);
          clip-path: polygon(45% 100%, 35% 75%, 14% 55%, 33% 54%, 22% 29%, 46% 45%, 48% 5%, 61% 42%, 82% 26%, 69% 57%, 92% 54%, 65% 75%, 57% 100%);
          opacity: 0.58;
        }

        .pb-plant-left {
          left: 18px;
        }

        .pb-plant-right {
          right: -34px;
          transform: scaleX(-1);
        }

        .pb-section {
          padding: 58px 0;
          border-top: 1px solid rgba(0, 180, 216, 0.08);
          text-align: center;
        }

        .pb-eyebrow {
          margin-bottom: 12px;
        }

        .pb-section-title {
          color: #fff;
          font-family: var(--f-display);
          font-size: clamp(30px, 3vw, 42px);
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: 0;
          margin-bottom: 13px;
        }

        .pb-section-sub {
          color: rgba(232, 248, 255, 0.64);
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 43px;
        }

        .pb-service-grid,
        .pb-impact-grid,
        .pb-story-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
        }

        .pb-card {
          text-align: left;
          border: 1px solid rgba(0, 180, 216, 0.14);
          border-radius: 8px;
          background: linear-gradient(145deg, rgba(7, 29, 54, 0.62), rgba(2, 16, 30, 0.78));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
        }

        .pb-service-card {
          min-height: 256px;
          padding: 34px 28px;
        }

        .pb-service-card i,
        .pb-impact-card i,
        .pb-process-step i,
        .pb-quote-mark,
        .pb-cta-icon {
          color: #00d5ff;
          font-size: 35px;
          text-shadow: 0 0 22px rgba(0, 213, 255, 0.28);
        }

        .pb-service-card:nth-child(3n) i,
        .pb-impact-card:nth-child(even) i,
        .pb-process-step:nth-child(4) i {
          color: #9af75a;
        }

        .pb-service-card h3,
        .pb-impact-card h3,
        .pb-story-card h3 {
          color: #fff;
          font-family: var(--f-display);
          font-size: 15px;
          margin: 26px 0 14px;
        }

        .pb-service-card p,
        .pb-impact-card p,
        .pb-story-card p,
        .pb-process-step p {
          color: rgba(232, 248, 255, 0.68);
          font-size: 13px;
          line-height: 1.65;
        }

        .pb-service-card a,
        .pb-story-card a {
          display: inline-flex;
          color: #9af75a;
          font-size: 12px;
          font-weight: 900;
          text-decoration: none;
          margin-top: 24px;
        }

        .pb-process-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 44px;
          max-width: 1120px;
          margin: 0 auto;
        }

        .pb-process-step {
          position: relative;
        }

        .pb-process-step:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 42px;
          left: calc(50% + 58px);
          width: 86px;
          height: 1px;
          background: rgba(232, 248, 255, 0.72);
        }

        .pb-process-step:not(:last-child)::before {
          content: "";
          position: absolute;
          top: 37px;
          left: calc(50% + 137px);
          border-left: 8px solid rgba(232, 248, 255, 0.72);
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }

        .pb-process-step i {
          display: grid;
          place-items: center;
          width: 82px;
          height: 82px;
          margin: 0 auto 20px;
          border-radius: 50%;
          border: 1px solid rgba(0, 213, 255, 0.42);
          background: radial-gradient(circle, rgba(0, 213, 255, 0.1), rgba(3, 18, 35, 0.82));
          font-size: 28px;
        }

        .pb-process-step h3 {
          color: #fff;
          font-family: var(--f-display);
          font-size: 13px;
          margin-bottom: 12px;
        }

        .pb-process-step h3 span {
          color: #9af75a;
        }

        .pb-impact-card {
          min-height: 200px;
          padding: 34px 28px;
          text-align: center;
        }

        .pb-impact-card strong {
          display: block;
          color: #9af75a;
          font-family: var(--f-display);
          font-size: 18px;
          margin: 20px 0 -14px;
        }

        .pb-story-card {
          overflow: hidden;
        }

        .pb-story-card img {
          display: block;
          width: 100%;
          height: 168px;
          object-fit: cover;
          object-position: center 24%;
        }

        .pb-story-card div {
          padding: 22px 22px 24px;
        }

        .pb-story-card h3 {
          margin: 0 0 8px;
        }

        .pb-story-card a {
          margin-top: 12px;
        }

        .pb-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
        }

        .pb-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(232, 248, 255, 0.28);
        }

        .pb-dots span:first-child {
          background: #9af75a;
          box-shadow: 0 0 12px rgba(154, 247, 90, 0.5);
        }

        .pb-testimonial {
          display: grid;
          grid-template-columns: 70px minmax(0, 1fr) 245px;
          align-items: center;
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
          border-radius: 20px;
          padding: 28px 36px;
          text-align: left;
        }

        .pb-quote-mark {
          color: #9af75a;
          font-size: 58px;
          font-family: Georgia, serif;
          line-height: 1;
        }

        .pb-testimonial p {
          color: rgba(232, 248, 255, 0.8);
          font-size: 14px;
          line-height: 1.75;
        }

        .pb-client {
          display: grid;
          grid-template-columns: 92px minmax(0, 1fr);
          align-items: center;
          gap: 18px;
        }

        .pb-client img {
          width: 92px;
          height: 92px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(154, 247, 90, 0.48);
        }

        .pb-client strong,
        .pb-client span {
          display: block;
        }

        .pb-client strong {
          color: #fff;
          font-family: var(--f-display);
          font-size: 14px;
          margin-bottom: 5px;
        }

        .pb-client span {
          color: rgba(232, 248, 255, 0.62);
          font-size: 12px;
        }

        .pb-cta {
          display: grid;
          grid-template-columns: 88px minmax(0, 1fr) auto;
          align-items: center;
          gap: 25px;
          border: 1px solid rgba(0, 180, 216, 0.14);
          border-radius: 10px;
          background: linear-gradient(145deg, rgba(8, 31, 61, 0.76), rgba(3, 18, 34, 0.86));
          padding: 30px 42px;
        }

        .pb-cta-icon {
          display: grid;
          place-items: center;
          width: 72px;
          height: 72px;
          border: 1px solid rgba(0, 213, 255, 0.38);
          border-radius: 50%;
        }

        .pb-cta h2 {
          color: #fff;
          font-family: var(--f-display);
          font-size: clamp(25px, 2.6vw, 38px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 7px;
        }

        .pb-cta p {
          color: rgba(232, 248, 255, 0.74);
          font-size: 14px;
          line-height: 1.6;
        }

        @media (max-width: 1180px) {
          .pb-hero-grid,
          .pb-cta {
            grid-template-columns: 1fr;
          }

          .pb-visual {
            max-width: 760px;
            margin-inline: auto;
            width: 100%;
          }

          .pb-service-grid,
          .pb-impact-grid,
          .pb-story-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pb-process-row {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .pb-process-step::before,
          .pb-process-step::after {
            display: none;
          }
        }

        @media (max-width: 720px) {
          .pb-page {
            padding: 88px 18px 30px;
          }

          .pb-breadcrumb {
            margin-bottom: 32px;
            flex-wrap: wrap;
          }

          .pb-hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
          }

          .pb-title {
            font-size: clamp(36px, 12vw, 48px);
          }

          .pb-benefits,
          .pb-service-grid,
          .pb-impact-grid,
          .pb-story-grid,
          .pb-process-row,
          .pb-testimonial {
            grid-template-columns: 1fr;
          }

          .pb-actions,
          .pb-actions .btn-primary,
          .pb-actions .btn-ghost,
          .pb-cta .btn-primary {
            width: 100%;
          }

          .pb-visual {
            min-height: 410px;
            transform: scale(0.82);
            transform-origin: top center;
            margin-bottom: -70px;
          }

          .pb-laptop {
            right: -78px;
            width: 680px;
          }

          .pb-phone {
            right: -34px;
          }

          .pb-section {
            padding: 46px 0;
          }

          .pb-testimonial,
          .pb-cta {
            padding: 24px 20px;
          }

          .pb-client {
            grid-template-columns: 70px minmax(0, 1fr);
          }

          .pb-client img {
            width: 70px;
            height: 70px;
          }
        }

        @media (max-width: 460px) {
          .pb-visual {
            transform: scale(0.62);
            margin-bottom: -170px;
          }

          .pb-laptop {
            right: -170px;
          }

          .pb-phone {
            right: -92px;
          }
        }
      `}</style>

      <section className="pb-hero">
        <div className="pb-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>&gt;</span>
          <a href="/#services">Services</a>
          <span>&gt;</span>
          <strong>Personal Branding</strong>
        </div>

        <div className="pb-hero-grid">
          <div className="pb-copy">
            <div className="pb-pill reveal">Our Service</div>
            <h1 className="pb-title reveal reveal-delay-1">Personal <span>Branding</span></h1>
            <h2 className="pb-subtitle reveal reveal-delay-2">Build Your Brand. Be Recognized. Create Impact.</h2>
            <p className="pb-lead reveal reveal-delay-3">
              We help entrepreneurs, professionals, and business owners build a powerful personal brand that creates trust,
              attracts opportunities, and sets you apart in the digital world.
            </p>

            <div className="pb-benefits reveal reveal-delay-4">
              {heroBenefits.map(([icon, title, text]) => (
                <article className="pb-benefit" key={title}>
                  <i className={icon} aria-hidden="true" />
                  <strong>{title}</strong>
                  <span>{text}</span>
                </article>
              ))}
            </div>

            <div className="pb-actions reveal reveal-delay-4">
              <a className="btn-primary" href="/#contact">Let's Build Your Brand</a>
              <a className="btn-ghost" href="#pb-work">View Our Work</a>
            </div>
          </div>

          <BrandingMockup />
        </div>
      </section>

      <section className="pb-section">
        <div className="pb-eyebrow reveal">What We Do</div>
        <h2 className="pb-section-title reveal reveal-delay-1">Our <span>Personal Branding Services</span></h2>
        <p className="pb-section-sub reveal reveal-delay-2">End-to-end personal branding solutions tailored to help you stand out and grow.</p>
        <div className="pb-service-grid">
          {brandServices.map(([icon, title, text]) => (
            <article className="pb-card pb-service-card reveal" key={title}>
              <i className={icon} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="/#contact">Learn more &rarr;</a>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-section">
        <div className="pb-eyebrow reveal">Our Process</div>
        <h2 className="pb-section-title reveal reveal-delay-1">How We Build Your <span>Personal Brand</span></h2>
        <p className="pb-section-sub reveal reveal-delay-2">A strategic approach to build, grow, and elevate your online presence.</p>
        <div className="pb-process-row">
          {processSteps.map(([icon, title, text]) => (
            <article className="pb-process-step reveal" key={title}>
              <i className={icon} aria-hidden="true" />
              <h3><span>{title.slice(0, 3)}</span>{title.slice(3)}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-section">
        <div className="pb-eyebrow reveal">Why Personal Branding Matters</div>
        <h2 className="pb-section-title reveal reveal-delay-1">Your <span>Brand.</span> Your Identity. Your <span>Future.</span></h2>
        <p className="pb-section-sub reveal reveal-delay-2">A strong personal brand opens doors to new opportunities.</p>
        <div className="pb-impact-grid">
          {impactCards.map(([icon, value, title, text]) => (
            <article className="pb-card pb-impact-card reveal" key={title}>
              <i className={icon} aria-hidden="true" />
              {value && <strong>{value}</strong>}
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-section" id="pb-work">
        <div className="pb-eyebrow reveal">Our Work</div>
        <h2 className="pb-section-title reveal reveal-delay-1">Personal <span>Branding Success Stories</span></h2>
        <p className="pb-section-sub reveal reveal-delay-2">Real people. Real brands. Real impact.</p>
        <div className="pb-story-grid">
          {stories.map(([image, title, text]) => (
            <article className="pb-card pb-story-card reveal" key={title}>
              <img src={image} alt={title} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="/#contact">View Case Study &rarr;</a>
              </div>
            </article>
          ))}
        </div>
        <div className="pb-dots" aria-hidden="true"><span /><span /><span /><span /></div>
      </section>

      <section className="pb-section">
        <div className="pb-eyebrow reveal">What Clients Say</div>
        <h2 className="pb-section-title reveal reveal-delay-1">Trusted by <span>Professionals</span></h2>
        <article className="pb-card pb-testimonial reveal reveal-delay-2">
          <div className="pb-quote-mark">"</div>
          <p>Bit Byte helped me build a strong personal brand on LinkedIn. My visibility increased, I started getting quality leads and new business opportunities.</p>
          <div className="pb-client">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=220&auto=format&fit=crop" alt="Arun Prakash" />
            <div>
              <strong>Arun Prakash</strong>
              <span>Real Estate Consultant</span>
            </div>
          </div>
        </article>
        <div className="pb-dots" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </section>

      <section className="pb-cta reveal">
        <div className="pb-cta-icon"><i className="fa-solid fa-rocket" aria-hidden="true" /></div>
        <div>
          <h2>Ready to Build Your <span>Personal Brand?</span></h2>
          <p>Let's craft a personal brand that reflects your identity, builds trust, and creates lasting impact.</p>
        </div>
        <a className="btn-primary" href="/#contact">Get a Free Consultation &rarr;</a>
      </section>
    </main>
  )
}