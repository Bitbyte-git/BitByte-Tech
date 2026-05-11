import ServiceFaq from "./ServiceFaq";

const marketingServices = [
  [
    "fa-solid fa-magnifying-glass",
    "SEO + AEO + GEO",
    "Search Optimization Services – Improve your visibility across Google, AI-powered search engines, conversational platforms, and voice search experiences using advanced SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) strategies. Our optimization approach improves search rankings, featured snippets, AI recommendations, conversational search visibility, and long-term digital discoverability.",
  ],
  [
    "fa-solid fa-bullseye",
    "Performance Marketing & Paid Advertising",
    "Performance Marketing & Paid Advertising – ROI-focused advertising campaigns powered by AI audience targeting, smart bidding strategies, conversion optimization, predictive analytics, and real-time performance insights to maximize leads, sales, customer acquisition, and business growth across digital advertising platforms.",
  ],
  [
    "fab fa-google",
    "Google Ads & Search Advertising",
    "Google Ads & Search Advertising – AI-enhanced Google Ads campaigns including Search Ads, Display Ads, Shopping Ads, YouTube Ads, and Performance Max campaigns designed to attract high-intent audiences, increase traffic, improve lead generation, and maximize advertising performance through smart automation and conversion-focused strategies.",
  ],
  [
    "fa-solid fa-share-nodes",
    "Social Media Marketing & Brand Growth",
    "Social Media Marketing & Brand Growth – AI-powered social media marketing solutions focused on increasing brand awareness, audience engagement, online community growth, customer interaction, and digital influence across Facebook, Instagram, LinkedIn, YouTube, and emerging social platforms through creative campaigns, trend-driven content strategies, AI audience insights, and performance-focused marketing.",
  ],
  [
    "fa-solid fa-user-check",
    "Personal Branding & Online Reputation Growth",
    "Personal Branding & Online Reputation Growth – Strategic personal branding solutions designed to help entrepreneurs, business owners, influencers, executives, and professionals build powerful online presence, industry authority, audience trust, and long-term digital credibility through AI-driven content strategies and social media growth marketing.",
  ],
  [
    "fa-solid fa-file-pen",
    "Content Marketing & Brand Communication",
    "Content Marketing & Brand Communication – High-quality, AI-friendly, and search-optimized content creation designed to improve search visibility, customer engagement, authority building, and conversion performance while maintaining a strong and consistent brand voice across digital platforms.",
  ],
  [
    "fa-solid fa-palette",
    "Branding & Creative Digital Experiences",
    "Branding & Creative Digital Experiences – Creative branding strategies, visual storytelling, AI-enhanced ad creatives, social media designs, and digital brand experiences that help businesses build memorable identities, stronger emotional connections, and impactful customer engagement across online platforms.",
  ],
  [
    "fa-solid fa-chart-line",
    "Analytics, Automation & Growth Intelligence",
    "Analytics, Automation & Growth Intelligence – Advanced analytics, audience behavior insights, AI-powered automation, predictive reporting, and performance tracking solutions that support smarter marketing decisions, continuous optimization, and scalable digital growth.",
  ],
];

const whyFeatures = [
  ["fa-solid fa-wand-magic-sparkles", "AI-Powered Marketing Strategies"],
  ["fa-solid fa-magnifying-glass", "SEO, AEO & GEO Expertise"],
  ["fab fa-google", "Google Ads & Performance Marketing Specialists"],
  ["fa-solid fa-user-check", "Social Media & Personal Branding Growth"],
  ["fa-solid fa-compass", "Conversion-Driven Marketing Solutions"],
  ["fa-solid fa-chart-simple", "Advanced Analytics & Automation"],
  ["fa-solid fa-shield-halved", "ROI-Focused Campaign Optimization"],
  ["fa-solid fa-network-wired", "Customized Business Growth Strategies"],
];

const industries = [
  ["fa-solid fa-cart-shopping", "Ecommerce"],
  ["fa-regular fa-gem", "Jewellery"],
  ["fa-solid fa-building-columns", "Real Estate"],
  ["fa-regular fa-heart", "Healthcare"],
  ["fa-solid fa-book", "Education"],
  ["fa-solid fa-rocket", "Startups"],
  ["fa-solid fa-plane", "Travel"],
  ["fa-solid fa-spa", "Lifestyle"],
  ["fa-solid fa-shop", "Local Business"],
  ["fa-regular fa-building", "Enterprise"],
];

const digitalMarketingFaqs = [
  [
    "What is AI-powered digital marketing?",
    "AI-powered digital marketing uses automation, audience intelligence, and smart data insights to improve online visibility, customer engagement, lead generation, and business growth more effectively than traditional marketing methods.",
  ],
  [
    "Why is digital marketing important for modern businesses?",
    "Digital marketing helps businesses increase brand visibility, attract targeted customers, build trust, generate quality leads, and grow consistently across search engines, social media, and AI-powered platforms.",
  ],
  [
    "What are SEO, AEO, and GEO services?",
    "SEO improves your Google rankings, AEO helps your business appear in direct answers and voice searches, while GEO increases visibility in AI-generated search experiences like ChatGPT and AI-powered search platforms.",
  ],
  [
    "How does AI improve digital marketing performance?",
    "AI helps analyze customer behavior, optimize campaigns in real time, improve audience targeting, personalize content, and increase marketing efficiency through smarter automation and data-driven insights.",
  ],
  [
    "Can digital marketing help generate more leads and sales?",
    "Yes. Strategic digital marketing helps businesses reach the right audience, improve engagement, increase website traffic, and convert visitors into customers using performance-focused marketing strategies.",
  ],
  [
    "How long does it take to see results from digital marketing?",
    "Paid advertising campaigns can deliver faster results, while SEO, AEO, and GEO strategies build long-term organic visibility, stronger rankings, and sustainable business growth over time.",
  ],
  [
    "Why is AI search optimization becoming important?",
    "Search behavior is evolving toward AI-generated answers, conversational search, and voice assistants. AI search optimization helps businesses stay visible in future search experiences and modern digital ecosystems.",
  ],
  [
    "Do you provide customized marketing strategies for different industries?",
    "Yes. We create customized digital marketing strategies based on your industry, target audience, business goals, and competition to deliver better engagement, visibility, and ROI.",
  ],
  [
    "How do you measure digital marketing success?",
    "We track performance using advanced analytics, keyword rankings, audience insights, lead generation, engagement metrics, conversion tracking, and ROI-focused reporting.",
  ],
  [
    "BitByte Technology for digital marketing services?",
    "BitByte Technology combines AI-powered strategies, creative marketing, SEO expertise, and performance-driven solutions to help businesses build stronger visibility, improve customer engagement, and achieve scalable digital growth.",
  ],
];

function MarketingDashboard() {
  const stats = [
    ["Total Users", "125.4K", "18.6%"],
    ["New Leads", "8.45K", "24.8%"],
    ["Conversions", "3.24K", "32.7%"],
    ["ROI Growth", "246%", "28.4%"],
  ];

  return (
    <div
      className="dm-dashboard reveal reveal-delay-2"
      aria-label="Marketing performance overview"
    >
      <div className="dm-dashboard-head">
        <strong>Marketing Performance Overview</strong>
        <span>This Month</span>
      </div>
      <div className="dm-stat-grid">
        {stats.map(([label, value, gain]) => (
          <div className="dm-stat-card" key={label}>
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
          <i>
            May 24
            <br />
            3.24K
          </i>
        </div>
        <div className="dm-traffic">
          <strong>Traffic Sources</strong>
          <div className="dm-donut">
            <span>38%</span>
          </div>
          <ul>
            <li>
              Google Search <b>38%</b>
            </li>
            <li>
              Social Media <b>28%</b>
            </li>
            <li>
              Paid Ads <b>20%</b>
            </li>
            <li>
              Direct <b>14%</b>
            </li>
          </ul>
        </div>
      </div>
      <div className="dm-channel-row">
        {[
          ["fab fa-google", "Google Ads"],
          ["fab fa-facebook-f", "Facebook Ads"],
          ["fab fa-instagram", "Instagram"],
          ["fa-solid fa-magnifying-glass", "SEO"],
          ["fab fa-youtube", "YouTube"],
          ["fab fa-linkedin-in", "LinkedIn"],
        ].map(([icon, label]) => (
          <div key={label}>
            <i className={icon} aria-hidden="true" />
            <span>{label}</span>
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
  return (
    <main className="webapp-page dm-page wrap">
      <section className="dm-hero">
        <div className="webapp-breadcrumb reveal">
          <a href="/#hero">Home</a>
          <span>›</span>
          <a href="/#services">Services</a>
          <span>›</span>
          <strong>Digital Marketing</strong>
        </div>
        <div className="dm-hero-grid">
          <div className="dm-hero-copy">
            <div className="webapp-pill reveal">
              AI-Powered Digital Marketing
            </div>
            <h1 className="webapp-title dm-title reveal reveal-delay-1">
              AI-Powered
              <span>Digital Marketing </span>
            </h1>
            <h2 className="webapp-kicker reveal reveal-delay-2">
              Smarter Marketing. Stronger Visibility. Higher Conversions.
            </h2>
            <p className="webapp-lead reveal reveal-delay-3">
              We empower businesses with AI-driven digital marketing strategies
              designed to increase online visibility, attract high-intent
              audiences, improve engagement, and accelerate business growth
              across search engines, social media, and AI-powered platforms.
            </p>
            <div className="webapp-actions reveal reveal-delay-4">
              <a href="/#contact" className="btn-primary">
                Get Free Consultation <span className="arr">→</span>
              </a>
              <a href="#dm-services" className="btn-ghost">
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
          <h2>Future-Ready Digital Marketing for the AI Era</h2>
          <p>
            Our digital marketing solutions combine Artificial Intelligence,
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
          Our AI-Powered
        </div>
        <h2 className="dm-section-title reveal reveal-delay-1">
          Digital Marketing Services
        </h2>
        <div className="dm-service-grid">
          {marketingServices.map(([icon, title, text], index) => (
            <article
              className={`dm-service-card reveal reveal-delay-${(index % 4) + 1}`}
              key={title}
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
        <h2 className="dm-section-title"> BitByte Technology?</h2>
        <div className="dm-why-grid">
          {whyFeatures.map(([icon, title]) => (
            <div className="dm-why-card" key={title}>
              <i className={icon} aria-hidden="true" />
              <strong>{title}</strong>
            </div>
          ))}
        </div>
        <p>
          We combine AI intelligence, creative innovation, performance marketing
          expertise, and future-ready digital strategies to deliver measurable
          business growth. Our marketing solutions are designed to help brands
          stay ahead in evolving search ecosystems, AI-powered platforms, and
          competitive digital markets.
        </p>
      </section>

      <section className="dm-industries reveal">
        <div className="service-section-eyebrow center">
          Industries We Serve
        </div>
        <p>
          We provide customized AI-powered digital marketing solutions for
          ecommerce brands, jewellery businesses, real estate companies,
          healthcare providers, educational institutions, startups, travel
          businesses, lifestyle brands, local businesses, and enterprise
          organizations.
        </p>
        <div className="dm-industry-grid">
          {industries.map(([icon, title]) => (
            <div className="dm-industry-card" key={title}>
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
            Ready to Accelerate Your Digital Growth with AI-Powered Marketing?
          </h2>
          <p>
            Strengthen your digital presence, attract the right audience,
            improve customer engagement, and scale your business with AI-powered
            digital marketing solutions designed for future-ready brands and
            modern search experiences.
          </p>
        </div>
        <a href="/#contact" className="btn-primary">
          Start Your Digital Growth Journey <span className="arr">→</span>
        </a>
      </section>
    </main>
  );
}
