import { useEffect, useState } from 'react';
import ServiceFaq from "./ServiceFaq";

const termData = {
  SEO: {
    title: "SEO",
    fullName: "Search Engine Optimization",
    desc: "Optimizing your website's content and structure to rank #1 on standard search engine results like Google.",
    example: "Searching Google for 'IT agency Salem' and finding BitByte Technologies at the very top."
  },
  AEO: {
    title: "AEO",
    fullName: "Answer Engine Optimization",
    desc: "Optimizing content so smart assistants (Alexa, Siri, Google Assistant) read it aloud as the single verbal answer.",
    example: "Asking Alexa 'What is the best SaaS agency?' and it responds with your company's profile."
  },
  GEO: {
    title: "GEO",
    fullName: "Generative Engine Optimization",
    desc: "Structuring content and data to be fetched, cited, and recommended by generative AI search engines like ChatGPT, Gemini, and Perplexity.",
    example: "ChatGPT recommending your brand as a top-tier choice when asked to 'Find a premium software team'."
  },
  ROI: {
    title: "ROI",
    fullName: "Return on Investment",
    desc: "A key business metric measuring the net profit generated from advertising relative to the capital spent.",
    example: "Spending $1,000 on Facebook Ads and making $5,000 in sales (which is a 400% ROI)."
  }
};

function MarketingTerm({ term }) {
  const data = termData[term];
  if (!data) return <span>{term}</span>;

  return (
    <span className="tooltip-term">
      {term}
      <span className="tooltip-box">
        <span className="tooltip-header">{data.title}: {data.fullName}</span>
        <span className="tooltip-desc">{data.desc}</span>
        <span className="tooltip-example">
          <strong>Example: </strong>{data.example}
        </span>
      </span>
    </span>
  );
}

const marketingServices = [
  [
    "fa-solid fa-magnifying-glass",
    <span><MarketingTerm term="SEO" /> + <MarketingTerm term="AEO" /> + <MarketingTerm term="GEO" /></span>,
    <span>
      Search Optimization Services – Improve your visibility across Google, <MarketingTerm term="AI" />-powered search engines, conversational platforms, and voice search experiences using advanced <MarketingTerm term="SEO" />, <MarketingTerm term="AEO" /> (Answer Engine Optimization), and <MarketingTerm term="GEO" /> (Generative Engine Optimization) strategies. Our optimization approach improves search rankings, featured snippets, <MarketingTerm term="AI" /> recommendations, conversational search visibility, and long-term digital Requirement Gatheringability.
    </span>,
  ],
  [
    "fa-solid fa-bullseye",
    "Performance Marketing & Paid Advertising",
    <span>
      Performance Marketing & Paid Advertising – <MarketingTerm term="ROI" />-focused advertising campaigns powered by <MarketingTerm term="AI" /> audience targeting, smart bidding strategies, conversion optimization, predictive analytics, and real-time performance insights to maximize leads, sales, customer acquisition, and business growth across digital advertising platforms.
    </span>,
  ],
  [
    "fab fa-google",
    "Google Ads & Search Advertising",
    <span>
      Google Ads & Search Advertising – <MarketingTerm term="AI" />-enhanced Google Ads campaigns including Search Ads, Display Ads, Shopping Ads, YouTube Ads, and Performance Max campaigns designed to attract high-intent audiences, increase traffic, improve lead generation, and maximize advertising performance through smart automation and conversion-focused strategies.
    </span>,
  ],
  [
    "fa-solid fa-share-nodes",
    "Social Media Marketing & Brand Growth",
    <span>
      Social Media Marketing & Brand Growth – <MarketingTerm term="AI" />-powered social media marketing solutions focused on increasing brand awareness, audience engagement, online community growth, customer interaction, and digital influence across Facebook, Instagram, LinkedIn, YouTube, and emerging social platforms through creative campaigns, trend-driven content strategies, <MarketingTerm term="AI" /> audience insights, and performance-focused marketing.
    </span>,
  ],
  [
    "fa-solid fa-user-check",
    "Personal Branding & Online Reputation Growth",
    <span>
      Personal Branding & Online Reputation Growth – Strategic personal branding solutions designed to help entrepreneurs, business owners, influencers, executives, and professionals build powerful online presence, industry authority, audience trust, and long-term digital credibility through <MarketingTerm term="AI" />-driven content strategies and social media growth marketing.
    </span>,
  ],
  [
    "fa-solid fa-file-pen",
    "Content Marketing & Brand Communication",
    <span>
      Content Marketing & Brand Communication – High-quality, <MarketingTerm term="AI" />-friendly, and search-optimized content creation designed to improve search visibility, customer engagement, authority building, and conversion performance while maintaining a strong and consistent brand voice across digital platforms.
    </span>,
  ],
  [
    "fa-solid fa-palette",
    "Branding & Creative Digital Experiences",
    <span>
      Branding & Creative Digital Experiences – Creative branding strategies, visual storytelling, <MarketingTerm term="AI" />-enhanced ad creatives, social media designs, and digital brand experiences that help businesses build memorable identities, stronger emotional connections, and impactful customer engagement across online platforms.
    </span>,
  ],
  [
    "fa-solid fa-chart-line",
    "Analytics, Automation & Growth Intelligence",
    <span>
      Analytics, Automation & Growth Intelligence – Advanced analytics, audience behavior insights, <MarketingTerm term="AI" />-powered automation, predictive reporting, and performance tracking solutions that support smarter marketing decisions, continuous optimization, and scalable digital growth.
    </span>,
  ],
];

const whyFeatures = [
  ["fa-solid fa-wand-magic-sparkles", <span><MarketingTerm term="AI" />-Powered Marketing Strategies</span>],
  ["fa-solid fa-magnifying-glass", <span><MarketingTerm term="SEO" />, <MarketingTerm term="AEO" /> & <MarketingTerm term="GEO" /> Expertise</span>],
  ["fab fa-google", "Google Ads & Performance Marketing Specialists"],
  ["fa-solid fa-user-check", "Social Media & Personal Branding Growth"],
  ["fa-solid fa-compass", "Conversion-Driven Marketing Solutions"],
  ["fa-solid fa-chart-simple", "Advanced Analytics & Automation"],
  ["fa-solid fa-shield-halved", <span><MarketingTerm term="ROI" />-Focused Campaign Optimization</span>],
  ["fa-solid fa-network-wired", "Customized Business Growth Strategies"],
];

const industries = [
  ["fa-solid fa-cart-shopping", "Ecommerce"],
  ["fa-solid fa-gem", "Jewellery"],
  ["fa-solid fa-building-columns", "Real Estate"],
  ["fa-solid fa-heart", "Healthcare"],
  ["fa-solid fa-book", "Education"],
  ["fa-solid fa-rocket", "Startups"],
  ["fa-solid fa-plane", "Travel"],
  ["fa-solid fa-spa", "Lifestyle"],
  ["fa-solid fa-shop", "Local Business"],
  ["fa-solid fa-seedling", "Agriculture"],
  ["fa-solid fa-building", "Enterprise"],
];

const digitalMarketingFaqs = [
  [
    <span>What is <MarketingTerm term="AI" />-powered digital marketing?</span>,
    <span>
      <MarketingTerm term="AI" />-powered digital marketing uses automation, audience intelligence, and smart data insights to improve online visibility, customer engagement, lead generation, and business growth more effectively than traditional marketing methods.
    </span>,
  ],
  [
    "Why is digital marketing important for modern businesses?",
    <span>
      Digital marketing helps businesses increase brand visibility, attract targeted customers, build trust, generate quality leads, and grow consistently across search engines, social media, and <MarketingTerm term="AI" />-powered platforms.
    </span>,
  ],
  [
    <span>What are <MarketingTerm term="SEO" />, <MarketingTerm term="AEO" />, and <MarketingTerm term="GEO" /> services?</span>,
    <span>
      <MarketingTerm term="SEO" /> improves your Google rankings, <MarketingTerm term="AEO" /> helps your business appear in direct answers and voice searches, while <MarketingTerm term="GEO" /> increases visibility in AI-generated search experiences like ChatGPT and AI-powered search platforms.
    </span>,
  ],
  [
    <span>How does <MarketingTerm term="AI" /> improve digital marketing performance?</span>,
    <span>
      <MarketingTerm term="AI" /> helps analyze customer behavior, optimize campaigns in real time, improve audience targeting, personalize content, and increase marketing efficiency through smarter automation and data-driven insights.
    </span>,
  ],
  [
    "Can digital marketing help generate more leads and sales?",
    <span>
      Yes. Strategic digital marketing helps businesses reach the right audience, improve engagement, increase website traffic, and convert visitors into customers using performance-focused marketing strategies.
    </span>,
  ],
  [
    <span>How long does it take to see results from digital marketing?</span>,
    <span>
      Paid advertising campaigns can deliver faster results, while <MarketingTerm term="SEO" />, <MarketingTerm term="AEO" />, and <MarketingTerm term="GEO" /> strategies build long-term organic visibility, stronger rankings, and sustainable business growth over time.
    </span>,
  ],
  [
    <span>Why is <MarketingTerm term="AI" /> search optimization becoming important?</span>,
    <span>
      Search behavior is evolving toward <MarketingTerm term="AI" />-generated answers, conversational search, and voice assistants. <MarketingTerm term="AI" /> search optimization helps businesses stay visible in future search experiences and modern digital ecosystems.
    </span>,
  ],
  [
    "Do you provide customized marketing strategies for different industries?",
    <span>
      Yes. We create customized digital marketing strategies based on your industry, target audience, business goals, and competition to deliver better engagement, visibility, and <MarketingTerm term="ROI" />.
    </span>,
  ],
  [
    "How do you measure digital marketing success?",
    <span>
      We track performance using advanced analytics, keyword rankings, audience insights, lead generation, engagement metrics, conversion tracking, and <MarketingTerm term="ROI" />-focused reporting.
    </span>,
  ],
  [
    "BitByte Technologies for digital marketing services?",
    <span>
      BitByte Technologies combines <MarketingTerm term="AI" />-powered strategies, creative marketing, <MarketingTerm term="SEO" /> expertise, and performance-driven solutions to help businesses build stronger visibility, improve customer engagement, and achieve scalable digital growth.
    </span>,
  ],
];

function MarketingDashboard() {
  const [activePeriod, setActivePeriod] = useState('This Month');
  const [activeChannel, setActiveChannel] = useState('All');

  const channels = [
    { id: 'All', icon: 'fa-solid fa-globe', label: 'All', color: '#00b4d8' },
    { id: 'Google Ads', icon: 'fab fa-google', label: 'Google Ads', color: '#58a6ff' },
    { id: 'SEO', icon: 'fa-solid fa-magnifying-glass', label: 'SEO', color: '#9af75a' },
    { id: 'Facebook', icon: 'fab fa-facebook-f', label: 'Facebook', color: '#1877f2' },
    { id: 'Instagram', icon: 'fab fa-instagram', label: 'Instagram', color: '#f45aa2' },
    { id: 'X', icon: 'fa-brands fa-x-twitter', label: 'X (Twitter)', color: '#ffffff' },
    { id: 'LinkedIn', icon: 'fab fa-linkedin-in', label: 'LinkedIn', color: '#4aa8ff' },
    { id: 'YouTube', icon: 'fab fa-youtube', label: 'YouTube', color: '#ff3434' },
    { id: 'Reddit', icon: 'fab fa-reddit', label: 'Reddit', color: '#ff4500' },
    { id: 'TikTok', icon: 'fab fa-tiktok', label: 'TikTok', color: '#25F4EE' },
    { id: 'Threads', icon: 'fa-brands fa-threads', label: 'Threads', color: '#ffffff' },
  ];

  const periodMultipliers = { 'This Month': 1, 'Last Month': 0.85, 'This Year': 9.5 };

  const baseChannelData = {
    'All': { users: 125.4, leads: 8.45, conv: 3.24, roi: 246, growth: 3.24, traffic: [38, 28, 20, 14] },
    'Google Ads': { users: 45.2, leads: 3.12, conv: 1.15, roi: 310, growth: 1.15, traffic: [0, 0, 100, 0] },
    'SEO': { users: 52.8, leads: 2.85, conv: 0.95, roi: 420, growth: 0.95, traffic: [100, 0, 0, 0] },
    'Facebook': { users: 28.5, leads: 1.95, conv: 0.65, roi: 185, growth: 0.65, traffic: [0, 100, 0, 0] },
    'Instagram': { users: 34.2, leads: 2.10, conv: 0.75, roi: 215, growth: 0.75, traffic: [0, 100, 0, 0] },
    'X': { users: 12.5, leads: 0.45, conv: 0.12, roi: 140, growth: 0.12, traffic: [0, 100, 0, 0] },
    'LinkedIn': { users: 8.4, leads: 1.25, conv: 0.45, roi: 350, growth: 0.45, traffic: [0, 100, 0, 0] },
    'YouTube': { users: 42.1, leads: 1.85, conv: 0.55, roi: 280, growth: 0.55, traffic: [20, 80, 0, 0] },
    'Reddit': { users: 15.6, leads: 0.65, conv: 0.25, roi: 195, growth: 0.25, traffic: [0, 100, 0, 0] },
    'TikTok': { users: 55.4, leads: 2.45, conv: 0.85, roi: 260, growth: 0.85, traffic: [0, 100, 0, 0] },
    'Threads': { users: 9.2, leads: 0.35, conv: 0.08, roi: 110, growth: 0.08, traffic: [0, 100, 0, 0] },
  };

  const currentBase = baseChannelData[activeChannel] || baseChannelData['All'];
  const mult = periodMultipliers[activePeriod];
  
  const formatNum = (num) => (num >= 1000 ? (num / 1000).toFixed(1) + 'M' : num.toFixed(2) + 'K');

  const currentData = {
    stats: [
      ["Total Users", formatNum(currentBase.users * mult), (18.6 * (mult === 1 ? 1 : 1.2)).toFixed(1) + "%"],
      ["New Leads", formatNum(currentBase.leads * mult), (24.8 * (mult === 1 ? 1 : 1.1)).toFixed(1) + "%"],
      ["Conversions", formatNum(currentBase.conv * mult), (32.7 * (mult === 1 ? 1 : 1.3)).toFixed(1) + "%"],
      ["ROI Growth", Math.round(currentBase.roi * (mult === 0.85 ? 0.9 : 1)) + "%", (28.4 * (mult === 1 ? 1 : 0.9)).toFixed(1) + "%"],
    ],
    growth: formatNum(currentBase.growth * mult),
    traffic: activeChannel === 'All' ? [38, 28, 20, 14] : currentBase.traffic,
    monthLabel: activePeriod === 'This Year' ? '2024' : (activePeriod === 'Last Month' ? 'Apr 24' : 'May 24')
  };

  return (
    <div
      className="dm-dashboard reveal reveal-delay-2"
      aria-label="Marketing performance overview"
    >
      <div className="dm-dashboard-head">
        <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {activeChannel !== 'All' && <i className={channels.find(c => c.id === activeChannel)?.icon} style={{ color: channels.find(c => c.id === activeChannel)?.color }}></i>}
          {activeChannel === 'All' ? 'Overall' : activeChannel} Performance
        </strong>
        <select 
          value={activePeriod} 
          onChange={(e) => setActivePeriod(e.target.value)}
          style={{
            background: 'rgba(3, 15, 35, 0.55)',
            border: '1px solid rgba(0, 180, 216, 0.12)',
            borderRadius: '18px',
            color: '#fff',
            padding: '6px 12px',
            fontFamily: 'var(--f-label)',
            fontSize: '12px',
            fontWeight: '700',
            outline: 'none',
            cursor: 'none'
          }}
        >
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>
      <div className="dm-stat-grid">
        {currentData.stats.map(([label, value, gain]) => (
          <div className="dm-stat-card" key={label} style={{ animation: 'hReveal 0.4s ease forwards' }}>
            <small>{label}</small>
            <b>{value}</b>
            <em>▲ {gain}</em>
          </div>
        ))}
      </div>
      <div className="dm-dashboard-body">
        <div className="dm-growth-chart">
          <strong>Performance Growth</strong>
          <span className="dm-line dm-line-one" />
          <span className="dm-line dm-line-two" />
          <span className="dm-line dm-line-three" />
          <span className="dm-line dm-line-four" />
          <span className="dm-line dm-line-five" />
          <i style={{ animation: 'hReveal 0.4s ease forwards' }}>
            {currentData.monthLabel}
            <br />
            {currentData.growth}
          </i>
        </div>
        <div className="dm-traffic">
          <strong>Traffic Sources</strong>
          <div className="dm-donut" style={{
            animation: 'spinWheel 15s linear infinite',
            background: `conic-gradient(
              #8c3cff 0 ${currentData.traffic[0]}%,
              #00b4d8 ${currentData.traffic[0]}% ${currentData.traffic[0] + currentData.traffic[1]}%,
              #ffb22d ${currentData.traffic[0] + currentData.traffic[1]}% ${currentData.traffic[0] + currentData.traffic[1] + currentData.traffic[2]}%,
              #ff6b3d ${currentData.traffic[0] + currentData.traffic[1] + currentData.traffic[2]}% 100%
            )`
          }}>
            <span style={{ animation: 'counterSpinWheel 15s linear infinite, hReveal 0.4s ease forwards' }}>
              {currentData.traffic.find(t => t > 0) || 0}%
            </span>
          </div>
          <ul>
            <li>Google Search <b>{currentData.traffic[0]}%</b></li>
            <li>Social Media <b>{currentData.traffic[1]}%</b></li>
            <li>Paid Ads <b>{currentData.traffic[2]}%</b></li>
            <li>Direct <b>{currentData.traffic[3]}%</b></li>
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--white60)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
        Filter by Channel:
      </div>
      <div className="dm-channel-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', padding: '16px 20px' }}>
        {channels.map((channel) => (
          <div 
            key={channel.id} 
            onClick={() => setActiveChannel(channel.id)}
            style={{ 
              cursor: 'none', 
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '8px',
              background: activeChannel === channel.id ? 'rgba(0, 180, 216, 0.15)' : 'transparent',
              border: `1px solid ${activeChannel === channel.id ? 'rgba(0, 180, 216, 0.4)' : 'transparent'}`,
              transform: activeChannel === channel.id ? 'scale(1.05)' : 'scale(1)'
            }} 
            onMouseEnter={(e) => { if(activeChannel !== channel.id) e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }} 
            onMouseLeave={(e) => { if(activeChannel !== channel.id) e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent' }}
          >
            <i className={channel.icon} style={{ color: channel.color, fontSize: '20px', filter: activeChannel === channel.id ? `drop-shadow(0 0 8px ${channel.color})` : 'none' }} aria-hidden="true" />
            <span style={{ fontSize: '10px', color: activeChannel === channel.id ? '#fff' : 'var(--white60)' }}>{channel.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiMarketingVisual() {
  return (
    <div className="dm-ai-visual" aria-hidden="true">
      <div className="dm-brain">
        <i className="fa-solid fa-brain" />
      </div>
      <span className="dm-orbit dm-orbit-one">
        <i className="fa-solid fa-chart-line" />
      </span>
      <span className="dm-orbit dm-orbit-two">
        <i className="fa-solid fa-bullseye" />
      </span>
      <span className="dm-orbit dm-orbit-three">
        <i className="fa-solid fa-pen-nib" />
      </span>
      <span className="dm-orbit dm-orbit-four">
        <i className="fa-solid fa-robot" />
      </span>
    </div>
  );
}

export default function DigitalMarketingSolutions() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="webapp-page dm-page wrap">
      <section className="dm-hero">
        <div className="webapp-breadcrumb reveal">
          <a href="/#hero" title="Go to home">Home</a>
          <span>›</span>
          <a href="/#services" title="Go to home">Services</a>
          <span>›</span>
          <strong>Digital Marketing</strong>
        </div>
        <div className="dm-hero-grid">
          <div className="dm-hero-copy">
            <div className="webapp-pill reveal">
              <MarketingTerm term="AI" />-Powered Digital Marketing
            </div>
            <h1 className="webapp-title dm-title reveal reveal-delay-1">
              <MarketingTerm term="AI" />-Powered<br />
              <span>Digital Marketing</span>
            </h1>
            <h2 className="webapp-kicker reveal reveal-delay-2">
              Smarter Marketing. Stronger Visibility. Higher Conversions.
            </h2>
            <p className="webapp-lead reveal reveal-delay-3">
              We empower businesses with <MarketingTerm term="AI" />-driven digital marketing strategies
              designed to increase online visibility, attract high-intent
              audiences, improve engagement, and accelerate business growth
              across search engines, social media, and <MarketingTerm term="AI" />-powered platforms.
            </p>
            <div className="webapp-actions reveal reveal-delay-4">
              <a href="/#contact" className="btn-primary" title="Go to home">
                Get Free Consultation <span className="arr">→</span>
              </a>
              <a href="#dm-services" className="btn-ghost" title="Go to dm services">
                Explore Services
              </a>
            </div>
          </div>
          <MarketingDashboard />
        </div>
      </section>

      <section className="dm-about reveal">
        <AiMarketingVisual />
        <div>
          <div className="service-section-eyebrow">About Digital Marketing</div>
          <h2>Future-Ready Digital Marketing for the <MarketingTerm term="AI" /> Era</h2>
          <p>
            Our digital marketing solutions combine <MarketingTerm term="AI" /> (Artificial Intelligence),
            automation, performance analytics, creative storytelling, and
            data-driven strategies to build powerful digital brand presence and
            measurable business growth. From search optimization and paid
            advertising to social media growth and personal branding, we create
            scalable marketing ecosystems designed for modern customer behavior
            and future search experiences.
          </p>
        </div>
      </section>

      <section className="dm-services-section" id="dm-services">
        <div className="service-section-eyebrow center reveal">
          Our <MarketingTerm term="AI" />-Powered
        </div>
        <h2 className="dm-section-title reveal reveal-delay-1">
          Digital Marketing <span>Services</span>
        </h2>
        <div className="dm-service-grid">
          {marketingServices.map(([icon, title, text], index) => (
            <article
              className={`dm-service-card reveal reveal-delay-${(index % 4) + 1}`}
              key={index}
            >
              <i className={icon} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dm-why reveal">
        <div className="service-section-eyebrow center">Why Choose</div>
        <h2 className="dm-section-title"> <span>BitByte Technologies?</span></h2>
        <div className="dm-why-grid">
          {whyFeatures.map(([icon, title], index) => (
            <div className="dm-why-card" key={index}>
              <i className={icon} aria-hidden="true" />
              <strong>{title}</strong>
            </div>
          ))}
        </div>
        <p>
          We combine <MarketingTerm term="AI" /> intelligence, creative innovation, performance marketing
          expertise, and future-ready digital strategies to deliver measurable
          business growth. Our marketing solutions are designed to help brands
          stay ahead in evolving search ecosystems, <MarketingTerm term="AI" />-powered platforms, and
          competitive digital markets.
        </p>
      </section>

      <section className="dm-industries reveal">
        <div className="service-section-eyebrow center">
          Industries We Serve
        </div>
        <p>
          We provide customized <MarketingTerm term="AI" />-powered digital marketing solutions for
          ecommerce brands, jewellery businesses, real estate companies,
          healthcare providers, educational institutions, startups, travel
          businesses, lifestyle brands, local businesses, agricultural sectors, and enterprise
          organizations.
        </p>
        <div className="dm-industry-grid">
          {industries.map(([icon, title], index) => (
            <div className="dm-industry-card" key={index}>
              <i className={icon} aria-hidden="true" />
              <strong>{title}</strong>
            </div>
          ))}
        </div>
      </section>

      <ServiceFaq items={digitalMarketingFaqs} />

      <section className="webapp-cta dm-final-cta reveal">
        <div className="webapp-cta-icon">
          <i className="fa-solid fa-rocket" aria-hidden="true" />
        </div>
        <div>
          <h2>
            Ready to Accelerate Your Digital Growth with <MarketingTerm term="AI" />-Powered Marketing?
          </h2>
          <p>
            Strengthen your digital presence, attract the right audience,
            improve customer engagement, and scale your business with <MarketingTerm term="AI" />-powered
            digital marketing solutions designed for future-ready brands and
            modern search experiences.
          </p>
        </div>
        <a href="/#contact" className="btn-primary" title="Go to home">
          Start Your Digital Growth Extravaganza <span className="arr">→</span>
        </a>
      </section>
    </main>
  );
}
