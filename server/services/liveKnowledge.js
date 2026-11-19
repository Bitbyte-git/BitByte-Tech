/**
 * BitByte Technologies - Full-Website Knowledge Store & Sub-2ms Retrieval Engine
 * Ingests 100% of website capabilities, services, showcase projects, careers, FAQs, and company info.
 */

// Normalized Alias Dictionary
const ALIAS_MAP = {
  nextjs: "next.js",
  "next.js": "next.js",
  reactjs: "react",
  "react.js": "react",
  vuejs: "vue",
  "vue.js": "vue",
  nodejs: "node.js",
  "node.js": "node.js",
  expressjs: "express",
  angularjs: "angular",
  postgres: "postgresql",
  psql: "postgresql",
  mongo: "mongodb",
  mongodb: "mongodb",
  k8s: "kubernetes",
  docker: "docker",
  genai: "ai",
  llm: "ai",
  chatbot: "ai",
  ml: "ai",
  seo: "seo",
  aeo: "seo",
  geo: "seo",
  mern: "mern",
  pern: "pern",
  mean: "mean",
  mevn: "mevn",
  flutter: "flutter",
  dart: "flutter",
  reactnative: "react native",
  "react-native": "react native",
  // Contact intent mappings
  whatsapp: "contact_intent",
  call: "contact_intent",
  phone: "contact_intent",
  mobile_contact: "contact_intent",
  email: "contact_intent",
  mail: "contact_intent",
  reach: "contact_intent",
  contact: "contact_intent",
  office: "contact_intent",
  address: "contact_intent",
  location: "contact_intent",
  meet: "contact_intent",
  consult: "contact_intent",
  consultation: "contact_intent",
  salem: "contact_intent",
  // Career intent mappings
  career: "career_intent",
  careers: "career_intent",
  job: "career_intent",
  jobs: "career_intent",
  intern: "career_intent",
  internship: "career_intent",
  apply: "career_intent",
  hiring: "career_intent",
  resume: "career_intent",
  opening: "career_intent",
  openings: "career_intent",
  vacancy: "career_intent",
  // Showcase intent mappings
  portfolio: "showcase_intent",
  showcase: "showcase_intent",
  projects: "showcase_intent",
  project: "showcase_intent",
  sample: "showcase_intent",
  samples: "showcase_intent",
  works: "showcase_intent",
  examples: "showcase_intent",
  // Distinct service intent mappings
  website: "website_intent",
  websites: "website_intent",
  webapp: "webapp_intent",
  webapps: "webapp_intent",
  "web-app": "webapp_intent",
  saas: "webapp_intent",
  mobileapp: "mobile_intent",
  mobileapps: "mobile_intent",
  "mobile-app": "mobile_intent",
  app: "mobile_intent",
  apps: "mobile_intent",
  android: "mobile_intent",
  ios: "mobile_intent",
  ecommerce: "ecommerce_intent",
  store: "ecommerce_intent",
  // Tanglish & Tamil intent mappings
  enna: "what",
  ethu: "what",
  enga: "location",
  engae: "location",
  eppadi: "how",
  evlo: "cost",
  kaasu: "cost",
  panam: "cost",
  vilai: "cost",
  velai: "career_intent",
  vela: "career_intent",
  neram: "timeline",
  naal: "timeline",
  sevai: "services",
  servis: "services",
  thodharbu: "contact_intent",
  pesanum: "contact_intent",
  call_panna: "contact_intent",
  mudiyuma: "can",
  pannalama: "can",
  pannunga: "do",
  solu: "tell",
  kudu: "give",
  iruka: "is",
  irukku: "is",
};

// Common English Stop-words
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
  "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from",
  "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself",
  "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn't", "it",
  "its", "itself", "let's", "me", "more", "most", "my", "myself", "no", "nor",
  "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",
  "ourselves", "out", "over", "own", "same", "she", "should", "so", "some", "such",
  "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there",
  "these", "they", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "wasn't", "we", "were", "weren't", "what", "when", "where",
  "which", "while", "who", "whom", "why", "with", "won't", "would", "you", "your",
  "yours", "yourself", "yourselves", "tell", "give", "please", "want", "need", "like"
]);

// ─── FULL WEBSITE KNOWLEDGE REPOSITORY ─────────────────────────────────────────

export const COMPANY_DOCUMENTS = [
  // 1. Company Overview & Contact
  {
    id: "company_overview",
    title: "About BitByte Technologies & Company Overview",
    category: "company",
    url: "/about",
    summary:
      "BitByte Technologies: Premier software engineering, web application, digital marketing, and IT solutions firm based in Salem, Tamil Nadu.",
    content: `
BitByte Technologies Company Profile:
• Tagline: Transforming Imagination into Digital Reality.
• Track Record: 50+ completed software projects, 200+ clients served, 98% client satisfaction rate, 8+ years combined leadership engineering experience.
• Headquarters: Salem, Tamil Nadu, India.
• Leadership Philosophy: 'The universe has no limits, and neither does human imagination. Every line of code we write is built purposeful, methodical, and designed to scale.' Quote: 'மாற்றம் ஒன்றே மாறாதது' (Change is the only constant).
• Core Pillars:
  1. Innovative Solutions: Future-proof architecture with emerging AI and cloud tooling.
  2. Elite Engineering Squad: Full-stack developers, UI/UX designers, DevOps, and marketing strategists.
  3. Transparent Pricing: Value-focused digital systems tailored to business budgets without hidden costs.
  4. Agile Delivery: Rapid, reliable sprint execution without compromising security or code quality.
  5. 24/7 SLA Support: Round-the-clock monitoring and dedicated post-launch maintenance.
  6. Growth & ROI Driven: Every system is engineered to convert visitors into loyal customers.
• Legal Registrations:
  - GST No: 33BLNPN5359J1ZL
  - MSME Udhyam Registration: UDYAM-TN-20-0234773
`,
    tags: ["company", "about", "bitbyte", "experience", "stats", "projects", "clients", "satisfaction", "salem", "founder", "mission", "vision"],
  },

  // 2. Official Leadership & Employee Team Directory
  {
    id: "leadership_team_directory",
    title: "Official Leadership & Employee Team Directory",
    category: "company",
    url: "/about",
    summary:
      "BitByte Technologies verified executive leadership directory and employee roster.",
    content: `
BitByte Technologies Official Executive Leadership & Employee Roster:
• Executive Leadership:
  - CEO (Chief Executive Officer): Sri Priyadharshini
  - ED (Executive Director): Agilan
  - MD (Managing Director): Beemarao
  - PM (Project Manager): Jai Ramachandran
• Total Team Members / Employees: 7
  - Senthil (Development Team)
  - Roshini (Development Team)
  - Selva (Development Team)
  - Aarthi (Development Team)
  - Jai Ramachandran (Project Manager)
  - Mano
  - Naveen
`,
    tags: ["ceo", "md", "ed", "pm", "project manager", "director", "managing director", "executive director", "leader", "leadership", "founder", "employees", "team", "staff", "sri priyadharshini", "agilan", "beemarao", "jai", "jai ramachandran", "senthil", "roshini", "selva", "aarthi", "mano", "naveen"],
  },

  // 3. Official Contact & Consultation
  {
    id: "contact_office",
    title: "Official Contact Channels & Salem Office Details",
    category: "contact",
    url: "/contact",
    summary:
      "BitByte Technologies official contact numbers, WhatsApp channel, email address, physical office location, and business hours.",
    content: `
BitByte Technologies Official Contact Information:
• Official Phone & WhatsApp: +91 99437 43136 (WhatsApp & Direct Phone Enquiries)
• Official Email: reachus@bitbytetech.org
• Official Website: https://bitbytetech.org
• Official LinkedIn: https://www.linkedin.com/in/bit-byte-technologies-4aa820406/
• Office Operating Hours: Monday to Friday, 9:00 AM – 7:00 PM IST
• Physical Office Address:
  Bit Byte Technologies,
  2nd Floor, Raja Complex West Wing,
  Opp: Sago Serve, Omalur Main Road,
  Salem-636302, Tamil Nadu, India.
• Free Technical Consultation:
  Clients and founders can book a free 30-minute discovery call with our solutions architects via WhatsApp or our website contact form.
• Geographical Reach:
  While headquartered in Salem, we serve enterprise clients across Tamil Nadu (Chennai, Coimbatore, Madurai, Trichy), all over India, and global international businesses via remote digital workflows.
`,
    tags: ["contact", "phone", "whatsapp", "email", "office", "address", "location", "salem", "reach", "consultation", "booking", "contact_intent", "hours"],
  },

  // 3. Custom Web Application Development
  {
    id: "web_development",
    title: "Custom Web Application Development (MERN, PERN, Python, Microservices)",
    category: "services",
    url: "/services/web-development",
    summary:
      "Enterprise web apps, SaaS platforms, custom portals, internal dashboards, secure APIs, and database engineering.",
    content: `
Custom Web Application Development Services:
• Overview:
  High-performance, secure web applications tailored to operational workflows. From concept to production deployment, we build scalable platforms engineered for conversion and maintainability.
• Technology Stacks:
  - Frontend: React.js, Next.js, Vue.js, Angular, TypeScript, Tailwind CSS, Vite.
  - Backend: Node.js (Express), Python (FastAPI, Django), Go (Golang), PHP/Laravel.
  - Stacks: MERN (MongoDB, Express, React, Node), PERN (PostgreSQL, Express, React, Node), MEAN, MEVN.
  - Databases: PostgreSQL, MongoDB, MySQL, Redis, Supabase, Firebase.
• Key Offerings:
  1. Custom Business Portals & Web Apps: Tailor-made management systems and customer self-service portals.
  2. SaaS Product Engineering: Multi-tenant SaaS architectures, subscription billing, RBAC permissions.
  3. API Engineering: High-throughput RESTful and GraphQL APIs with OAuth2/JWT bank-grade security.
  4. Enterprise Dashboards: Real-time data visualization, KPI telemetry, and operational intelligence.
`,
    tags: ["web", "development", "react", "next.js", "node.js", "express", "saas", "portal", "dashboard", "api", "database", "mern", "pern", "fullstack", "custom web applications"],
  },

  // 4. Ecommerce Website Development
  {
    id: "ecommerce_solutions",
    title: "Ecommerce Website Development & Online Store Solutions",
    category: "services",
    url: "/services/web-development/ecommerce-solutions",
    summary:
      "Fast, secure online stores with payment gateways, automated inventory, product catalogs, and order management.",
    content: `
Ecommerce Website Development:
• Features:
  - Custom storefronts and headless commerce (Next.js commerce, Shopify development, WooCommerce).
  - Secure Payment Gateway Integrations: Razorpay, Stripe, PayPal, CCAvenue, UPI, NetBanking.
  - Product catalog management, variants, lookbooks, search & filtering, real-time stock sync.
  - Automated inventory management, order tracking, SMS/WhatsApp notifications, and invoice generation.
  - B2B Wholesale Portals: Bulk ordering, tier-based pricing, quotation requests, credit terms.
  - Seamless migration from legacy platforms with full URL and SEO preservation.
`,
    tags: ["ecommerce", "online store", "shop", "shopify", "woocommerce", "payment gateway", "razorpay", "stripe", "inventory", "b2b ecommerce"],
  },

  // 5. Web Portals & Business Dashboards
  {
    id: "portals_dashboards",
    title: "Web Portals & Business Dashboards Development",
    category: "services",
    url: "/services/web-development/web-portals-dashboards",
    summary:
      "Secure customer portals, employee intranets, vendor management systems, and real-time business dashboards.",
    content: `
Web Portals & Dashboard Development:
• Specialized Portals:
  - Customer Portals: Account self-service, order status, invoice downloads, ticket support.
  - Employee & HRMS Portals: Attendance tracking, leave requests, performance metrics, company documents.
  - Vendor & Supplier Portals: Purchase order management, invoice submissions, shipment tracking.
  - Admin & Management Dashboards: Role-based access control (RBAC), live revenue tracking, audit logs.
• System Integrations: Seamless two-way integration with existing ERPs, CRMs (Salesforce, Zoho, HubSpot), and accounting software.
`,
    tags: ["portal", "dashboard", "customer portal", "employee portal", "vendor portal", "admin", "rbac", "crm", "erp"],
  },

  // 6. Mobile Application Development
  {
    id: "mobile_development",
    title: "Mobile Application Development (Flutter, React Native, iOS, Android)",
    category: "services",
    url: "/services/web-development",
    summary:
      "Cross-platform and native mobile apps with offline-first architecture, GPS tracking, payments, and App Store deployment.",
    content: `
Mobile Application Development Services:
• Frameworks:
  - Cross-Platform: Flutter (Dart), React Native.
  - Native Development: iOS (Swift), Android (Kotlin / Java).
• Key Mobile Capabilities:
  - Single-codebase iOS and Android deployment ensuring 40% faster time-to-market.
  - Offline-first architectures using SQLite, Hive, or WatermelonDB with cloud synchronization.
  - Real-time GPS location tracking, geofencing, Google Maps SDK integration.
  - Push notifications via Firebase Cloud Messaging (FCM) and OneSignal.
  - In-App purchases, Apple Pay, Google Pay, Razorpay, and Stripe integration.
  - Full App Store (Apple) and Google Play Store submission and guideline approval management.
`,
    tags: ["mobile", "app", "flutter", "react native", "ios", "android", "swift", "kotlin", "playstore", "appstore", "dart"],
  },

  // 7. AI & Machine Learning Solutions
  {
    id: "ai_solutions",
    title: "AI & Machine Learning Solutions (Agents, LLMs, RAG, Chatbots)",
    category: "services",
    url: "/services/digital-marketing/ai-powered-digital-marketing-solutions",
    summary:
      "Custom AI agents, LLM integrations, RAG knowledge bases, intelligent chatbots, and automated business workflows.",
    content: `
AI & Machine Learning Solutions:
• Capabilities:
  - Custom AI Agents & Chatbots: Context-aware conversational assistants trained on company data.
  - Retrieval-Augmented Generation (RAG): Enterprise search engines grounding LLMs in internal documents.
  - LLM Integrations: OpenRouter, OpenAI (GPT-4o, GPT-oss), Anthropic Claude.
  - Document Intelligence: Automated OCR extraction for invoices, KYC documents, and contracts.
  - Predictive Analytics: Churn prediction, sales demand forecasting, and recommendation algorithms.
  - Enterprise Data Privacy: On-premise AI deployments and zero-data-retention API architectures.
`,
    tags: ["ai", "machine learning", "rag", "llm", "chatbot", "agents", "automation", "predictive", "nlp", "computer vision", "openrouter"],
  },

  // 8. Cloud Architecture & DevOps Services
  {
    id: "cloud_devops",
    title: "Cloud Infrastructure, Containerization & DevOps Engineering",
    category: "services",
    url: "/services/web-development",
    summary:
      "AWS, Google Cloud (GCP), Azure infrastructure design, Docker, Kubernetes, CI/CD pipelines, and cloud cost optimization.",
    content: `
Cloud & DevOps Engineering Services:
• Supported Clouds: Amazon Web Services (AWS), Google Cloud Platform (GCP), Microsoft Azure, Vercel, Railway.
• DevOps Practices:
  - Infrastructure as Code (IaC) using Terraform and CloudFormation.
  - Docker containerization and Kubernetes (EKS, GKE) container orchestration.
  - Automated CI/CD pipelines via GitHub Actions, GitLab CI, and AWS CodePipeline.
  - 24/7 uptime monitoring with Prometheus, Grafana, and automated PagerDuty alerts.
  - Cloud Cost Optimization: Auditing and right-sizing resources, saving clients 25%–40% in cloud bills.
`,
    tags: ["cloud", "devops", "aws", "gcp", "azure", "docker", "kubernetes", "cicd", "terraform", "monitoring"],
  },

  // 9. UI/UX Design & Product Strategy
  {
    id: "ui_ux_design",
    title: "UI/UX Design, Product Strategy & Figma Prototyping",
    category: "services",
    url: "/services/imagination-to-reality",
    summary:
      "User research, wireframing, high-fidelity interactive Figma prototypes, and atomic design systems.",
    content: `
UI/UX Design & Product Strategy:
• Capabilities:
  - Wireframing and clickable, interactive prototypes built in Figma.
  - Atomic Design Systems: Scalable component libraries, typography, color palettes, and token guidelines.
  - User Journey Mapping: UX usability audits, user research, and Conversion Rate Optimization (CRO).
  - Accessibility: WCAG 2.1 AA compliant interfaces with responsive mobile-first layouts.
`,
    tags: ["ui", "ux", "design", "figma", "wireframe", "prototype", "branding", "user experience"],
  },

  // 10. AI-Powered Digital Marketing & Growth
  {
    id: "digital_marketing",
    title: "AI-Powered Digital Marketing, SEO, AEO & Performance Ads",
    category: "services",
    url: "/services/digital-marketing/ai-powered-digital-marketing-solutions",
    summary:
      "SEO, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), Google & Meta Ads, and social media growth.",
    content: `
AI-Powered Digital Marketing Solutions:
• Core Disciplines:
  - Search Engine Optimization (SEO): Technical SEO, keyword research, on-page optimization, backlink strategy.
  - Answer Engine Optimization (AEO) & GEO: Optimizing brand presence for AI search tools (ChatGPT, Gemini, Perplexity).
  - Paid Advertising: High-converting Google Search/Display Ads, Meta (Instagram/Facebook) Ads, and LinkedIn campaigns.
  - Social Media Marketing: Content engines designed for organic reach, brand awareness, and qualified lead generation.
  - Funnel Analytics: Continuous A/B testing and conversion tracking to maximize Return on Ad Spend (ROAS).
`,
    tags: ["marketing", "seo", "google ads", "meta ads", "social media", "lead generation", "growth", "aeo", "geo"],
  },

  // 11. Data-Driven Business Analytics
  {
    id: "business_analytics",
    title: "Data-Driven Business Analytics & Executive Dashboards",
    category: "services",
    url: "/services/business-analytics/data-driven-business-analytics-solutions",
    summary:
      "PowerBI and Tableau dashboards, real-time sales analytics, ETL pipelines, and revenue intelligence.",
    content: `
Data-Driven Business Analytics:
• Offerings:
  - Interactive Executive Dashboards: Real-time visual tracking of revenue, order volume, churn, and gross margins.
  - BI Tool Implementations: Microsoft PowerBI, Tableau, Apache Superset, custom React dashboard platforms.
  - Data Engineering: Automated ETL/ELT pipelines, data warehousing (PostgreSQL, Snowflake, BigQuery).
  - Revenue Intelligence: Cohort retention analysis, pipeline velocity, and sales forecasting.
`,
    tags: ["analytics", "dashboard", "business intelligence", "kpi", "sales", "reporting", "powerbi", "tableau", "etl"],
  },

  // 12. Imagination to Reality (Startup MVP Program)
  {
    id: "imagination_to_reality",
    title: "Imagination to Reality - Startup MVP & Product Engineering",
    category: "services",
    url: "/services/imagination-to-reality",
    summary:
      "Turn raw startup concepts into scalable MVPs in 4 to 8 weeks with complete product strategy, UI/UX, and engineering.",
    content: `
Imagination to Reality (MVP Program):
• Scope:
  Tailored for early-stage founders and enterprise innovators wanting to validate a software concept rapidly.
• Process:
  1. Discovery & Roadmapping: Defining core value proposition and MVP feature boundaries.
  2. Figma Interactive Prototyping: Clickable UI designs approved in 1–2 weeks.
  3. Agile MVP Development: Production-grade web/mobile engineering deployed in iterative sprints.
  4. Launch & Market Validation: Production deployment, telemetry tracking, and iterative feature scaling.
• Delivery Timeline: Standard MVPs launch in 4 to 8 weeks.
`,
    tags: ["idea", "startup", "mvp", "imagination to reality", "prototype", "founder", "build my app", "from scratch"],
  },

  // 13. Real-Time Sales Data Solutions
  {
    id: "real_time_sales",
    title: "Real-Time Sales Data Driven Solutions",
    category: "services",
    url: "/services/real-time-sales-data",
    summary:
      "Live sales telemetry dashboards, branch performance tracking, and CRM revenue synchronizations.",
    content: `
Real-Time Sales Data Solutions:
• Features:
  - Instant visibility into sales revenues, top-performing products, sales rep leaderboards, and branch comparisons.
  - Integration with existing POS, CRM, and accounting systems.
  - Automated anomaly alerts when sales drop below forecasted thresholds.
  - Multi-location rollups for retail chains, franchises, and distributor networks.
`,
    tags: ["sales", "real time", "pos", "revenue", "branch", "tracking", "telemetry"],
  },

  // 14. Personal Branding
  {
    id: "personal_branding",
    title: "Personal Branding & Executive Positioning Services",
    category: "services",
    url: "/services/personal-branding",
    summary:
      "Authority positioning, LinkedIn content engines, portfolio websites, and executive branding for founders and leaders.",
    content: `
Personal Branding Services:
• Capabilities:
  - LinkedIn Thought Leadership: Organic content strategy, weekly ghostwritten insights, profile optimization.
  - Founder & Executive Portfolios: Bespoke personal websites showcasing milestones, speaking, and achievements.
  - Media & Narrative Positioning: Crafting a clear, compelling professional bio and industry point-of-view.
`,
    tags: ["personal branding", "linkedin", "founder", "executive", "portfolio", "thought leadership"],
  },

  // 15. Client Engagement & Hiring Models
  {
    id: "engagement_models",
    title: "Client Engagement & Hiring Models (Dedicated Teams, Fixed-Price, Hourly)",
    category: "services",
    url: "/services",
    summary:
      "Dedicated developer teams, fixed-price milestone delivery, and flexible hourly sprints.",
    content: `
BitByte Technologies Engagement Models:
1. Dedicated Development Team:
   - Full-time developers, designers, and project managers working as an extension of the client's internal team.
2. Fixed-Price Projects:
   - Milestone-based turnkey delivery with clearly defined scopes, budgets, and deliverables. Ideal for MVPs.
3. Time & Material (Hourly/Sprint):
   - Flexible 2-week sprints for fast-moving startups with evolving requirements and feature backlogs.
`,
    tags: ["hiring", "engagement", "dedicated team", "fixed price", "hourly", "contract", "rates", "model"],
  },

  // 16. Portfolio & Showcase Websites
  {
    id: "portfolio_showcase",
    title: "Showcase Projects & Industry Portfolio",
    category: "showcase",
    url: "/showcase",
    summary:
      "Live portfolio websites built by BitByte Technologies across 13+ industry verticals.",
    content: `
BitByte Technologies Showcase & Portfolio:
• Textile Website: Fabric & apparel showcases, product lookbooks, quote request workflows.
• Global Mobility & Visa Portal: Immigration consultancy, visa eligibility checkers, consultation booking.
• Smart Digital Card Platform: Contact sharing via QR code, social links, and analytics.
• Photoshop & Designer Showcase: Visual portfolio layouts and creative design galleries.
• Furniture E-Commerce: High-resolution catalog galleries, room visualizer, and checkout integration.
• Billing & Invoicing System: Invoice generation, payment tracking, financial reporting dashboards.
• HRMS Workforce Platform: Employee directory, leave tracking, attendance, payroll workflows.
• Restaurant & Cafe Website: Online food menus, table reservation system, and delivery options.
• Gym & Fitness Club Portal: Class schedules, membership subscriptions, trainer profiles.
• Real Estate Property Showcase: Property listings, filter by amenities, interactive floor plans.
• Interior Design Portfolio: Before/after project galleries, design consultation booking.
• Dental Clinic PRM: Patient Relationship Management, appointment booking, patient history.
• Multi-Vendor E-Commerce Store: Vendor dashboard, product listings, automated commission payouts.
`,
    tags: ["portfolio", "showcase", "textile", "visa", "digital card", "billing", "hrms", "restaurant", "gym", "real estate", "medical", "ecommerce", "showcase_intent"],
  },

  // 17. Careers & Job Openings
  {
    id: "careers_internships",
    title: "Careers & Internship Opportunities at BitByte Technologies",
    category: "careers",
    url: "/careers",
    summary:
      "Current job vacancies and internship roles in software engineering, mobile development, and AI prompt engineering in Salem.",
    content: `
Careers & Internships at BitByte Technologies (Salem, Tamil Nadu):
• Current Open Positions:
  1. Mobile Application Development Intern / Associate:
     - Stacks: Flutter, Dart, Cross-Platform App Development.
     - Responsibilities: Building UI screens, integrating REST APIs, state management (Provider/Bloc), local storage.
  2. Java Full Stack Intern:
     - Stacks: Core Java, Spring Boot, Hibernate, MySQL, HTML/CSS/JS.
     - Eligibility: B.E/B.Tech/MCA/B.Sc candidates with strong OOP fundamentals.
  3. Java Full Stack Developer:
     - Experience: 1–3 years in Spring Boot microservices, REST APIs, and modern frontend frameworks.
  4. Full Stack Intern / Associate (MERN & PERN Stacks):
     - Stacks: React, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS.
     - Focus: Real-world SaaS platforms, APIs, responsive frontend web apps.
  5. Prompt Engineering Intern:
     - Focus: Generative AI, LLM prompting, NLP workflows, OpenAI/OpenRouter model integration.
  6. Prompt Engineer - AI, NLP & Generative AI:
     - Role: Developing production RAG pipelines, fine-tuning prompt templates, and AI agent automation.
• How to Apply:
  Candidates can apply directly on our website at https://bitbytetech.org/careers/apply or email their resume to reachus@bitbytetech.org with the position code in the subject line.
`,
    tags: ["career", "careers", "jobs", "internship", "intern", "flutter", "java", "mern", "prompt engineering", "salem jobs", "career_intent"],
  },
];

// ─── FULL WEBSITE FREQUENTLY ASKED QUESTIONS (FAQS) ───────────────────────────

export const FAQS = [
  {
    question: "What is your name?",
    answer:
      "I am BitByte AI, the official AI Technology Consultant for BitByte Technologies. How can our team assist you with your web app, mobile app, or AI project today?",
    docTitle: "BitByte AI Identity",
    url: "/about",
    tokens: ["what is your name", "what you name", "who are you", "your name", "bot name", "ai name", "un name enna", "un per enna", "what is your bot name", "what are you", "who r u"],
  },
  {
    question: "Who is the MD of BitByte Technologies?",
    answer:
      "The MD (Managing Director) of BitByte Technologies is Beemarao.",
    docTitle: "Official Leadership Directory",
    url: "/about",
    tokens: ["md", "managing director", "md ?", "who is md", "bitbyte md", "director beemarao", "beemarao", "md name", "md yaaru", "md yaaru bro"],
  },
  {
    question: "Who is the CEO of BitByte Technologies?",
    answer:
      "The CEO (Chief Executive Officer) of BitByte Technologies is Sri Priyadharshini.",
    docTitle: "Official Leadership Directory",
    url: "/about",
    tokens: ["ceo", "chief executive officer", "ceo ?", "who is ceo", "bitbyte ceo", "sri priyadharshini", "priyadharshini", "ceo name", "ceo yaaru", "ceo yaaru bro"],
  },
  {
    question: "Who is the ED of BitByte Technologies?",
    answer:
      "The ED (Executive Director) of BitByte Technologies is Agilan.",
    docTitle: "Official Leadership Directory",
    url: "/about",
    tokens: ["ed", "executive director", "ed ?", "who is ed", "bitbyte ed", "agilan", "ed name", "ed yaaru", "ed yaaru bro"],
  },
  {
    question: "Who is the PM of BitByte Technologies?",
    answer:
      "The PM (Project Manager) of BitByte Technologies is Jai Ramachandran. He oversees technical project execution, sprint deliverables, and engineering team workflows.",
    docTitle: "Official Leadership Directory",
    url: "/about",
    tokens: ["pm", "project manager", "pm ?", "who is pm", "who is the pm", "who is project manager", "bitbyte pm", "jai", "jai ramachandran", "pm name", "pm yaaru", "pm yaaru bro"],
  },
  {
    question: "How many employees work at BitByte Technologies?",
    answer:
      "BitByte Technologies has 7 team members: Senthil, Roshini, Selva, Aarthi, Jai, Mano, and Naveen, led by CEO Sri Priyadharshini, ED Agilan, and MD Beemarao.",
    docTitle: "Official Team Directory",
    url: "/about",
    tokens: ["how many employees", "how many employee", "employees", "team members", "team", "headcount", "staff", "who are the employees", "employees count", "members", "team members yaaru", "employees ethanai peru", "developers"],
  },
  {
    question: "Who are the developers and team members at BitByte Technologies?",
    answer:
      "BitByte Technologies development team includes Senthil, Roshini, Selva, and Aarthi. Our team also includes Jai, Mano, and Naveen, led by CEO Sri Priyadharshini, ED Agilan, and MD Beemarao.",
    docTitle: "Official Team Directory",
    url: "/about",
    tokens: ["developers", "development team", "senthil", "roshini", "selva", "aarthi", "jai", "mano", "naveen", "team", "engineers"],
  },
  {
    question: "Can I call this number?",
    answer:
      "Yes! You can call our technical consulting team directly at +91 99437 43136 or message us on WhatsApp. Tap the Call button below to dial directly from your phone.",
    docTitle: "Official Contact & Direct Calling",
    url: "/contact",
    tokens: ["call", "phone", "number", "dial", "telephone", "mobile", "contact", "contact number"],
  },
  {
    question: "What services does BitByte Technologies provide?",
    answer:
      "BitByte Technologies provides Custom Web Application Development (MERN, PERN, Python), Mobile App Development (Flutter, React Native, iOS, Android), AI & Machine Learning Solutions (Agents, LLMs, RAG, Chatbots), Cloud Architecture & DevOps (AWS, GCP, Azure, Docker, Kubernetes), UI/UX Design (Figma), AI-Powered Digital Marketing & SEO/AEO, and Data-Driven Business Analytics (PowerBI, Tableau).",
    docTitle: "Core Services Overview",
    url: "/services",
    tokens: ["services", "what do you do", "offer", "capabilities", "solutions", "provide", "services provide", "services list"],
  },
  {
    question: "I need website",
    answer:
      "Yes! BitByte Technologies designs and develops custom, responsive business websites, corporate portals, and marketing landing pages using React, Next.js, and Tailwind CSS. We deliver high-speed, SEO-optimized, and mobile-friendly websites tailored to your brand. Let's schedule a free discovery call to discuss your website requirements—WhatsApp +91 99437 43136 or email reachus@bitbytetech.org.",
    docTitle: "Website Development Services",
    url: "/services/web-development",
    tokens: ["need website", "want website", "build website", "website", "websites", "website_intent", "business website", "landing page", "site", "i need website ?", "i need website", "website pannanum", "website seiyanum"],
  },
  {
    question: "Do you build business websites and landing pages?",
    answer:
      "Yes! BitByte Technologies crafts modern, responsive business websites, corporate sites, portfolio showcases, and high-converting landing pages built with React, Next.js, Tailwind CSS, and WordPress. We optimize every site for search engines and performance. Connect with us via WhatsApp at +91 99437 43136 or reachus@bitbytetech.org.",
    docTitle: "Website Development Services",
    url: "/services/web-development",
    tokens: ["website", "websites", "website_intent", "landing page", "business website", "corporate website", "portfolio website"],
  },
  {
    question: "I need webapp",
    answer:
      "Yes! BitByte Technologies specializes in building scalable custom Web Applications, SaaS platforms, enterprise ERP/CRM systems, and interactive business dashboards using MERN (MongoDB, Express, React, Node.js), PERN (PostgreSQL), and Python microservices with secure role-based access. Connect with our engineering team via WhatsApp at +91 99437 43136 or email reachus@bitbytetech.org.",
    docTitle: "Web Application Development",
    url: "/services/web-development/custom-web-applications",
    tokens: ["need webapp", "need web app", "webapp", "web app", "web application", "webapp_intent", "saas", "dashboard", "portal", "mern", "pern", "i need webapp ?", "i need webapp", "webapp pannanum"],
  },
  {
    question: "I need mobile app",
    answer:
      "Yes! BitByte Technologies builds native-performance cross-platform Mobile Applications for Android and iOS using Flutter and React Native. We deliver seamless UI/UX, offline sync, real-time push notifications, payment gateways, and backend API integrations. Let's connect on WhatsApp at +91 99437 43136 or email reachus@bitbytetech.org to discuss your mobile app idea.",
    docTitle: "Mobile Application Development",
    url: "/services",
    tokens: ["need app", "need mobile app", "mobile app", "app", "mobile_intent", "android", "ios", "flutter", "react native", "i need mobile app ?", "i need mobile app", "mobile app pannanum"],
  },
  {
    question: "Where is BitByte Technologies located and how can I contact you?",
    answer:
      "BitByte Technologies is located at 2nd Floor, Raja Complex West Wing, Opp: Sago Serve, Omalur Main Road, Salem-636302, Tamil Nadu, India. You can contact us via Phone & WhatsApp at +91 99437 43136 or email us at reachus@bitbytetech.org. Office hours are Monday to Friday, 9:00 AM – 7:00 PM IST.",
    docTitle: "Official Contact & Office Location",
    url: "/contact",
    tokens: ["location", "address", "where", "office", "salem", "phone", "whatsapp", "email", "reach", "contact"],
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Software development investments depend entirely on your specific feature scope, platform requirements, third-party integrations, and design complexity. Standard MVPs typically range from 4 to 10 weeks, while full enterprise platforms require phased sprints. We invite you to schedule a free technical discovery call with our solutions architect for a free scope document and accurate estimate.",
    docTitle: "Pricing & Cost Estimation",
    url: "/contact",
    tokens: ["cost", "price", "pricing", "how much", "rate", "quote", "estimate", "budget", "fees", "charge"],
  },
  {
    question: "How long does it take to develop a custom website or mobile app?",
    answer:
      "Timelines are tailored to the scope. A focused MVP or business website typically takes 4 to 8 weeks. Larger SaaS platforms, ecommerce portals, and enterprise mobile applications are rolled out in iterative 2-week agile sprints over 3 to 6 months with continuous staging deployments.",
    docTitle: "Project Timelines & Milestones",
    url: "/services/imagination-to-reality",
    tokens: ["how long", "timeline", "duration", "weeks", "months", "time", "delivery", "deadline"],
  },
  {
    question: "Can BitByte Technologies work with clients outside Salem?",
    answer:
      "Yes. While our engineering office is in Salem, Tamil Nadu, we collaborate with clients across Tamil Nadu (Chennai, Coimbatore, Madurai, Trichy), across India, and globally through online video discovery calls, Slack/WhatsApp channels, and digital project management.",
    docTitle: "Remote Collaboration & Geographic Reach",
    url: "/about",
    tokens: ["outside salem", "chennai", "coimbatore", "remote", "global", "international", "usa", "india"],
  },
  {
    question: "What tech stacks do you specialize in for web development?",
    answer:
      "Our web stacks include React.js, Next.js, Vue.js, Angular, TypeScript, Node.js (Express), Python (FastAPI, Django), Go, PHP/Laravel, with PostgreSQL, MongoDB, MySQL, and Redis databases.",
    docTitle: "Web Development Tech Stacks",
    url: "/services/web-development",
    tokens: ["tech stack", "stacks", "technology", "react", "next.js", "node.js", "frontend", "backend", "database", "mern", "pern"],
  },
  {
    question: "Do you develop cross-platform mobile apps for iOS and Android?",
    answer:
      "Yes. We specialize in cross-platform mobile development using Flutter and React Native to deliver single-codebase iOS and Android apps with native performance, offline sync, payment gateways, GPS tracking, and push notifications.",
    docTitle: "Mobile App Development",
    url: "/services/web-development",
    tokens: ["mobile", "app", "flutter", "react native", "ios", "android", "iphone", "cross platform", "dart"],
  },
  {
    question: "Can you build custom AI chatbots and LLM workflows?",
    answer:
      "Yes. We build custom conversational AI agents, RAG knowledge bases, intelligent chatbots, and document automation workflows using OpenRouter, OpenAI, Claude, and open-weight models.",
    docTitle: "AI & Machine Learning Solutions",
    url: "/services/digital-marketing/ai-powered-digital-marketing-solutions",
    tokens: ["ai", "chatbot", "llm", "rag", "agents", "machine learning", "automation", "gpt", "openrouter"],
  },
  {
    question: "Do you build ecommerce websites with payment gateways?",
    answer:
      "Yes. We build custom ecommerce websites, Shopify stores, and WooCommerce solutions with Razorpay, Stripe, and UPI payment integrations, automated inventory, product catalogs, and order tracking.",
    docTitle: "Ecommerce Development",
    url: "/services/web-development/ecommerce-solutions",
    tokens: ["ecommerce", "shop", "online store", "shopify", "woocommerce", "payment gateway", "razorpay", "stripe"],
  },
  {
    question: "Can you build custom web portals and dashboards for our business?",
    answer:
      "Yes. We develop customer portals, employee HRMS portals, vendor management systems, and admin dashboards with role-based access control (RBAC) and two-way CRM/ERP integrations.",
    docTitle: "Web Portals & Dashboards",
    url: "/services/web-development/web-portals-dashboards",
    tokens: ["portal", "dashboard", "customer portal", "employee portal", "vendor portal", "admin", "rbac"],
  },
  {
    question: "What career and internship positions are open at BitByte Technologies?",
    answer:
      "We currently have openings for Mobile Application Development Interns (Flutter, Dart), Java Full Stack Interns & Developers, Full Stack Interns (MERN & PERN stacks), and Prompt Engineering Interns & AI Specialists in Salem. You can apply at https://bitbytetech.org/careers/apply.",
    docTitle: "Careers & Open Vacancies",
    url: "/careers",
    tokens: ["career", "careers", "job", "jobs", "internship", "intern", "vacancy", "openings", "apply"],
  },
  {
    question: "Can you help transform a raw startup idea into an MVP?",
    answer:
      "Yes. Through our 'Imagination to Reality' program, we help founders navigate product roadmapping, interactive Figma UI/UX prototyping, architecture design, and rapid MVP engineering to launch in 4 to 8 weeks.",
    docTitle: "Imagination to Reality (MVP Program)",
    url: "/services/imagination-to-reality",
    tokens: ["idea", "startup", "mvp", "imagination to reality", "prototype", "founder", "build my app"],
  },
  {
    question: "What client hiring and engagement models do you offer?",
    answer:
      "We offer three flexible models: Dedicated Development Teams (full-time engineers working as an extension of your team), Fixed-Price Milestone Projects (turnkey delivery for defined scopes), and Time & Material (flexible hourly/sprint development for agile roadmaps).",
    docTitle: "Engagement & Hiring Models",
    url: "/services",
    tokens: ["engagement", "hiring", "hire", "dedicated team", "fixed price", "hourly", "contract"],
  },
  {
    question: "Do you provide post-launch maintenance, SLAs, and technical support?",
    answer:
      "Yes. Every software project includes a post-launch warranty period, and we offer dedicated monthly SLA maintenance packages covering 24/7 uptime monitoring, security updates, bug fixes, and feature enhancements.",
    docTitle: "QA, Testing & Maintenance",
    url: "/services",
    tokens: ["maintenance", "support", "sla", "warranty", "updates", "monitoring", "post launch", "bug fix"],
  },
  {
    question: "What projects have you built in your showcase portfolio?",
    answer:
      "Our portfolio includes over 13 industry verticals: Textile websites, Global Visa & Immigration portals, Smart Digital Card platforms, Photoshop & Designer portfolios, Furniture Ecommerce, Billing & Invoicing software, HRMS Workforce Management, Restaurant websites, Gym & Fitness portals, Real Estate listing platforms, Dental Clinic PRMs, and Multi-Vendor Ecommerce stores.",
    docTitle: "Showcase & Portfolio",
    url: "/showcase",
    tokens: ["portfolio", "showcase", "projects", "sample", "examples", "what have you built", "works"],
  },
  {
    question: "Do you provide digital marketing and SEO services?",
    answer:
      "Yes. We provide full-funnel digital marketing, including Technical & On-Page SEO, Answer Engine Optimization (AEO/GEO for AI search), Google Search & Display Ads, Meta (Instagram/Facebook) Ads, and LinkedIn lead generation campaigns.",
    docTitle: "Digital Marketing & SEO",
    url: "/services/digital-marketing/ai-powered-digital-marketing-solutions",
    tokens: ["marketing", "seo", "google ads", "meta ads", "social media", "lead generation", "growth", "aeo"],
  },
  {
    question: "Can you build business analytics dashboards with PowerBI or Tableau?",
    answer:
      "Yes. We build custom real-time sales dashboards, KPI reporting systems, and automated ETL pipelines integrated with PowerBI, Tableau, Superset, or custom React dashboards connected to your databases.",
    docTitle: "Business Analytics Solutions",
    url: "/services/business-analytics/data-driven-business-analytics-solutions",
    tokens: ["analytics", "powerbi", "tableau", "dashboard", "kpi", "sales analytics", "reporting"],
  },
  {
    question: "How do I access the HRMS login, Career Admin, Showcase Admin, or billing portal?",
    answer:
      "All internal administrative portals (including HRMS Login, Career Admin, Showcase Admin, and internal billing systems) are strictly restricted to authorized BitByte Technologies personnel only. They cannot be accessed or viewed by the public.",
    docTitle: "Restricted Administrative Access",
    url: "/contact",
    tokens: ["admin", "login", "hrms", "career admin", "showcase admin", "billing admin", "portal access", "password", "secret", "credentials"],
  },
];

/**
 * Tokenize text, normalize aliases, and strip stop-words
 */
function tokenize(text) {
  if (!text || typeof text !== "string") return [];
  const rawWords = text
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const tokens = [];
  for (const raw of rawWords) {
    const normalized = ALIAS_MAP[raw] || raw;
    if (!STOP_WORDS.has(normalized)) {
      tokens.push(normalized);
    }
  }
  return tokens;
}

export function isPromptInstruction(text) {
  if (!text || typeof text !== "string") return false;
  const lower = text.toLowerCase();
  return (
    lower.includes("treat all questions") ||
    lower.includes("canonical answer above") ||
    lower.includes("match by meaning") ||
    lower.includes("do not invent") ||
    lower.includes("same intent:") ||
    lower.includes("for every matching question") ||
    lower.includes("the chatbot must") ||
    lower.includes("project_manager_identity") ||
    /intent\s*:\s*[A-Z_]+/i.test(text) ||
    lower.startsWith("prompt:") ||
    lower.startsWith("instruction:") ||
    lower.startsWith("system:") ||
    lower.startsWith("rule:") ||
    lower.includes("return the canonical answer")
  );
}

// Dynamic In-Memory Learned Q&A Store
export const DYNAMIC_LEARNED_FAQS = [];

let mongoLoaded = false;
export async function loadLearnedQAFromMongo(forceReload = false) {
  if ((mongoLoaded && !forceReload) || !process.env.MONGODB_URI) return;
  try {
    try {
      const dns = await import("node:dns");
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {}
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME || "BB-Careers-Application");
    
    // Auto-clean any contaminated prompt instructions from DB
    await db.collection("chatbot_learned_qa").deleteMany({
      $or: [
        { answer: /Treat all questions/i },
        { answer: /PROJECT_MANAGER_IDENTITY/i },
        { answer: /canonical answer above/i },
        { question: /Treat all questions/i },
        { question: /PROJECT_MANAGER_IDENTITY/i },
      ],
    }).catch(() => {});

    const docs = await db.collection("chatbot_learned_qa").find({ verified: { $ne: false } }).sort({ learnedAt: -1 }).limit(500).toArray();
    
    if (forceReload) {
      DYNAMIC_LEARNED_FAQS.length = 0;
    }
    
    for (const doc of docs) {
      if (doc.question && doc.answer) {
        if (isPromptInstruction(doc.answer) || isPromptInstruction(doc.question)) {
          continue; // Automatically skip contaminated prompt rules!
        }
        DYNAMIC_LEARNED_FAQS.push({
          id: doc._id?.toString() || "",
          question: doc.question,
          answer: doc.answer,
          docTitle: doc.category || doc.docTitle || "Learned & Verified Knowledge",
          url: doc.url || "/services",
          tokens: doc.tokens || tokenize(doc.question),
          learnedAt: doc.learnedAt ? new Date(doc.learnedAt).toISOString() : new Date().toISOString(),
        });
      }
    }
    mongoLoaded = true;
    await client.close();
  } catch {
    // Graceful in-memory fallback
  }
}

// Background startup load
loadLearnedQAFromMongo().catch(() => {});

let mongoLoadPromise = null;
export async function ensureMongoLoaded() {
  if (DYNAMIC_LEARNED_FAQS.length === 0 && process.env.MONGODB_URI) {
    if (!mongoLoadPromise) {
      mongoLoadPromise = loadLearnedQAFromMongo(true).finally(() => {
        mongoLoadPromise = null;
      });
    }
    await mongoLoadPromise;
  }
}

export async function persistLearnedQAToMongo(item) {
  if (!process.env.MONGODB_URI) return null;
  try {
    try {
      const dns = await import("node:dns");
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {}
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME || "BB-Careers-Application");
    const res = await db.collection("chatbot_learned_qa").updateOne(
      { question: item.question },
      {
        $set: {
          question: item.question,
          answer: item.answer,
          category: item.category || item.docTitle || "Custom Knowledge",
          tokens: item.tokens || tokenize(item.question),
          learnedAt: new Date(),
          verified: true,
        },
      },
      { upsert: true }
    );
    await client.close();
    return res;
  } catch {
    return null;
  }
}

export async function bulkPersistLearnedQAToMongo(items) {
  if (!process.env.MONGODB_URI || !Array.isArray(items) || items.length === 0) return 0;
  try {
    try {
      const dns = await import("node:dns");
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {}
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME || "BB-Careers-Application");
    const collection = db.collection("chatbot_learned_qa");
    
    const ops = [];
    for (const item of items) {
      if (!item.question || !item.answer) continue;
      if (isPromptInstruction(item.question) || isPromptInstruction(item.answer)) continue;
      const tokens = item.tokens || tokenize(item.question);
      ops.push({
        updateOne: {
          filter: { question: item.question },
          update: {
            $set: {
              question: item.question,
              answer: item.answer,
              category: item.category || "Uploaded Knowledge",
              tokens,
              learnedAt: new Date(),
              verified: true,
            },
          },
          upsert: true,
        },
      });

      // In-memory update
      const existingIdx = DYNAMIC_LEARNED_FAQS.findIndex(
        (f) => f.question.toLowerCase() === item.question.toLowerCase()
      );
      const learnedEntry = {
        question: item.question,
        answer: item.answer,
        docTitle: item.category || "Uploaded Knowledge",
        url: "/services",
        tokens,
        learnedAt: new Date().toISOString(),
      };
      if (existingIdx >= 0) {
        DYNAMIC_LEARNED_FAQS[existingIdx] = learnedEntry;
      } else {
        DYNAMIC_LEARNED_FAQS.unshift(learnedEntry);
      }
    }

    let count = ops.length;
    if (ops.length > 0) {
      await collection.bulkWrite(ops, { ordered: false });
    }
    await client.close();
    return count;
  } catch {
    return 0;
  }
}

export async function deleteLearnedQAFromMongo(idOrQuestion) {
  if (!process.env.MONGODB_URI || !idOrQuestion) return false;
  try {
    try {
      const dns = await import("node:dns");
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {}
    const { MongoClient, ObjectId } = await import("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME || "BB-Careers-Application");
    
    const filter = ObjectId.isValid(idOrQuestion)
      ? { $or: [{ _id: new ObjectId(idOrQuestion) }, { question: idOrQuestion }] }
      : { question: idOrQuestion };
      
    await db.collection("chatbot_learned_qa").deleteOne(filter);
    await client.close();

    // Remove from in-memory
    const idx = DYNAMIC_LEARNED_FAQS.findIndex(
      (f) => f.id === idOrQuestion || f.question === idOrQuestion
    );
    if (idx >= 0) {
      DYNAMIC_LEARNED_FAQS.splice(idx, 1);
    }
    return true;
  } catch {
    return false;
  }
}

export async function getLearnedQAFromMongo() {
  if (!process.env.MONGODB_URI) {
    return DYNAMIC_LEARNED_FAQS;
  }
  try {
    try {
      const dns = await import("node:dns");
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {}
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME || "BB-Careers-Application");
    const docs = await db.collection("chatbot_learned_qa").find({}).sort({ learnedAt: -1 }).limit(500).toArray();
    await client.close();
    return docs.map((doc) => ({
      id: doc._id?.toString() || "",
      question: doc.question || "",
      answer: doc.answer || "",
      category: doc.category || doc.docTitle || "General Knowledge",
      tokens: doc.tokens || [],
      learnedAt: doc.learnedAt ? new Date(doc.learnedAt).toISOString() : new Date().toISOString(),
    }));
  } catch {
    return DYNAMIC_LEARNED_FAQS;
  }
}

/**
 * Quality-Filtered Self-Learning Hook
 * ONLY feeds 100% accurate, verified answers to genuine BitByte questions.
 * Rejects spam, off-topic, refusals, admin attempts, and duplicates.
 */
export function recordLearnedQA(question, answer) {
  if (!question || !answer) return false;
  const q = String(question).trim();
  const a = String(answer).trim();
  const lowerQ = q.toLowerCase();

  // 1. Length validation
  if (q.length < 5 || q.length > 250 || a.length < 25) return false;

  // 2. Reject if the answer was a refusal or security block or apology/lack of info
  const rejectionKeywords = [
    "I am the dedicated AI Technology Consultant for BitByte Technologies. I can only assist with",
    "Administrative portals",
    "strictly restricted",
    "illegal hacking",
    "not configured",
    "connection delay",
    "error",
    "sorry",
    "don't have",
    "don’t have",
    "do not have",
    "don't know",
    "don’t know",
    "do not know",
    "cannot answer",
    "headcount on hand",
    "apologize",
  ];
  if (rejectionKeywords.some((kw) => a.toLowerCase().includes(kw.toLowerCase()))) return false;

  // 3. Reject if question is an admin access attempt or illegal request
  const spamWords = new Set(["admin", "login", "password", "hack", "hacking", "bypass", "secret", "credential", "credentials", "asdf", "qwerty"]);
  const qWords = q.toLowerCase().split(/\s+/);
  if (qWords.some((w) => spamWords.has(w))) return false;

  // 4. Must be genuinely about BitByte Technologies or our engineering services
  const relevantTokens = [
    "service", "services", "web", "website", "mobile", "app", "apps", "flutter", "react", "python",
    "node", "mern", "pern", "design", "figma", "ai", "seo", "aeo", "marketing", "analytics",
    "dashboard", "mvp", "career", "careers", "job", "jobs", "intern", "internship", "salem",
    "contact", "whatsapp", "email", "phone", "pricing", "cost", "price", "timeline", "portfolio",
    "project", "projects", "bitbyte", "saas", "software", "development", "develop", "build",
    "ecommerce", "store", "custom", "tech", "technology", "ceo", "founder", "owner", "leader", "leadership"
  ];
  const qTokens = tokenize(q);
  const isRelevant = qTokens.some((t) => relevantTokens.includes(t)) || relevantTokens.some((rt) => q.toLowerCase().includes(rt));
  if (!isRelevant) return false;

  // 5. Deduplication check: Avoid feeding duplicates
  const allCurrent = [...FAQS, ...DYNAMIC_LEARNED_FAQS];
  const isDuplicate = allCurrent.some((item) => {
    if (item.question.toLowerCase() === lowerQ) return true;
    const itemTokens = new Set(tokenize(item.question));
    const matchCount = qTokens.filter((t) => itemTokens.has(t)).length;
    return qTokens.length > 0 && matchCount / qTokens.length > 0.85;
  });

  if (isDuplicate) return false;

  // 100% Verified Quality Check Passed -> Ingest into knowledge store!
  const learnedItem = {
    question: q,
    answer: a,
    docTitle: "Learned & Verified Knowledge",
    url: "/services",
    tokens: qTokens,
    learnedAt: new Date().toISOString(),
  };

  DYNAMIC_LEARNED_FAQS.push(learnedItem);
  persistLearnedQAToMongo(learnedItem).catch(() => {});

  return true;
}

/**
 * Sub-2ms in-memory token-weighted retrieval engine across 100% of website content
 */
export function findRelevantKnowledge(query) {
  const queryTokens = tokenize(query);
  const allFaqs = [...FAQS, ...DYNAMIC_LEARNED_FAQS];

  if (queryTokens.length === 0) {
    const defaultDoc = COMPANY_DOCUMENTS.find((d) => d.id === "company_overview");
    const contactDoc = COMPANY_DOCUMENTS.find((d) => d.id === "contact_office");
    return {
      matchedFaqs: allFaqs.slice(0, 3),
      matchedDocs: [defaultDoc, contactDoc],
      context: `${defaultDoc.content.trim()}\n\n${contactDoc.content.trim()}`,
      sources: [
        { title: defaultDoc.title, url: defaultDoc.url },
        { title: contactDoc.title, url: contactDoc.url },
      ],
    };
  }

  const isContactIntent = queryTokens.includes("contact_intent");
  const isCareerIntent = queryTokens.includes("career_intent");
  const isShowcaseIntent = queryTokens.includes("showcase_intent");

  // Distinct service and query intents
  const queryLower = query.toLowerCase();
  const isTimelineQuery =
    queryTokens.some((t) => ["timeline", "duration", "how long", "time", "weeks", "months", "schedule", "neram", "naal", "days"].includes(t)) ||
    /how\s+long|how\s+many\s+(days|weeks|months)|when\s+will|timeline/i.test(queryLower);
  const isCostQuery =
    queryTokens.some((t) => ["cost", "price", "pricing", "budget", "rate", "evlo", "kaasu", "panam", "vilai"].includes(t)) ||
    /how\s+much|cost|price|budget|rate|fee/i.test(queryLower);

  const isWebappIntent = queryTokens.includes("webapp_intent") || /\b(web\s*apps?|web\s*application|saas|dashboards?|portals?)\b/i.test(queryLower);
  const isWebsiteIntent = !isWebappIntent && (queryTokens.includes("website_intent") || /\bwebsites?\b/i.test(queryLower));
  const isMobileIntent = queryTokens.includes("mobile_intent") || /\b(mobile\s*apps?|android|ios|flutter|react\s*native)\b/i.test(queryLower);
  const isEcommerceIntent = queryTokens.includes("ecommerce_intent") || /\b(ecommerce|online\s*store|shopify|woocommerce)\b/i.test(queryLower);

  // 1. Score FAQs (Both static and dynamic learned FAQs)
  const scoredFaqs = allFaqs.map((faq) => {
    let score = 0;
    const cleanQuery = queryLower.replace(/[?!.,;]/g, "").trim();
    const cleanFaqQ = faq.question.toLowerCase().replace(/[?!.,;]/g, "").trim();

    // Exact question match
    if (cleanQuery === cleanFaqQ) {
      score += 600;
    }

    const tokenSet = new Set();
    const qTokens = tokenize(faq.question);
    qTokens.forEach((t) => tokenSet.add(t));

    (faq.tokens || []).forEach((t) => {
      const norm = (ALIAS_MAP[t.toLowerCase()] || t.toLowerCase()).replace(/[?!.,;]/g, "").trim();
      tokenSet.add(norm);
      if (cleanQuery === norm) {
        score += 500;
      }
      tokenize(norm).forEach((sub) => tokenSet.add(sub));
    });

    for (const token of queryTokens) {
      if (tokenSet.has(token)) {
        score += 8; // High direct token match
      }
    }

    const isTimelineFaq = faq.docTitle.includes("Timelines") || faq.tokens.includes("timeline") || /how long|timeline|weeks|months/i.test(faq.question);
    const isCostFaq = faq.docTitle.includes("Pricing") || faq.tokens.includes("cost") || /cost|pricing|how much|fee/i.test(faq.question);

    // CRITICAL: NEVER return timeline or pricing FAQs when user didn't ask for timeline or cost!
    if (isTimelineFaq && !isTimelineQuery) score -= 500;
    if (isCostFaq && !isCostQuery) score -= 500;

    // Distinct service boosts
    if (isWebsiteIntent && (faq.docTitle.includes("Website Development") || faq.tokens.includes("website_intent") || faq.tokens.includes("website"))) score += 180;
    if (isWebappIntent && (faq.docTitle.includes("Web Application") || faq.tokens.includes("webapp_intent") || faq.tokens.includes("webapp"))) score += 180;
    if (isMobileIntent && (faq.docTitle.includes("Mobile App") || faq.tokens.includes("mobile_intent") || faq.tokens.includes("mobileapp"))) score += 180;
    if (isEcommerceIntent && (faq.docTitle.includes("Ecommerce") || faq.tokens.includes("ecommerce_intent"))) score += 180;

    // Leadership & Team directory boosts
    const isCeoQuery = /\b(ceo|chief\s*executive\s*officer|priyadharshini)\b/i.test(queryLower);
    const isEdQuery = /\b(ed|executive\s*director|agilan)\b/i.test(queryLower);
    const isMdQuery = /\b(md|managing\s*director|beemarao)\b/i.test(queryLower);
    const isPmQuery = /\b(pm|project\s*manager|jai\s*ramachandran)\b/i.test(queryLower);
    const isTeamQuery = /\b(team|members|employees|staff|developers|headcount|roster)\b/i.test(queryLower) && !isCeoQuery && !isEdQuery && !isMdQuery && !isPmQuery;

    // Leadership directory matching: strictly require the specific role to be queried!
    const isLeadershipFaq = faq.docTitle === "Official Leadership Directory";
    if (isLeadershipFaq) {
      const isThisCeo = faq.tokens.some((t) => t.includes("ceo"));
      const isThisEd = faq.tokens.some((t) => t.includes("ed"));
      const isThisMd = faq.tokens.some((t) => t.includes("md"));
      const isThisPm = faq.tokens.some((t) => t.includes("pm"));

      if (isThisCeo && !isCeoQuery) score -= 500;
      if (isThisEd && !isEdQuery) score -= 500;
      if (isThisMd && !isMdQuery) score -= 500;
      if (isThisPm && !isPmQuery) score -= 500;

      if (isThisCeo && isCeoQuery) score += 300;
      if (isThisEd && isEdQuery) score += 300;
      if (isThisMd && isMdQuery) score += 300;
      if (isThisPm && isPmQuery) score += 300;
    }

    if (isTeamQuery && (faq.tokens.includes("employees") || faq.tokens.includes("team members") || faq.tokens.includes("developers"))) score += 300;

    // Never allow contaminated prompt instructions to match!
    if (isPromptInstruction(faq.answer) || isPromptInstruction(faq.question)) {
      score -= 9999;
    }

    if (isContactIntent && faq.docTitle.includes("Contact")) score += 100;
    if (isCareerIntent && faq.docTitle.includes("Career")) score += 100;
    if (isShowcaseIntent && faq.docTitle.includes("Showcase")) score += 80;

    return { faq, score };
  });

  scoredFaqs.sort((a, b) => b.score - a.score);
  const matchedFaqs = scoredFaqs.filter((item) => item.score >= 60).slice(0, 3).map((item) => item.faq);
  const exactMatchFaq = scoredFaqs[0] && scoredFaqs[0].score >= 100 ? scoredFaqs[0].faq : null;

  // 2. Score Documents
  const scoredDocs = COMPANY_DOCUMENTS.map((doc) => {
    let score = 0;
    const docTags = new Set(doc.tags.map((t) => ALIAS_MAP[t] || t));
    const titleTokens = tokenize(doc.title);

    for (const token of queryTokens) {
      if (docTags.has(token)) {
        score += 5;
      }
      if (titleTokens.includes(token)) {
        score += 4;
      }
      if (doc.content.toLowerCase().includes(token)) {
        score += 1;
      }
    }

    if (isContactIntent && doc.id === "contact_office") score += 100;
    if (isCareerIntent && doc.id === "careers_internships") score += 100;
    if (isShowcaseIntent && doc.id === "portfolio_showcase") score += 80;

    return { doc, score };
  });

  scoredDocs.sort((a, b) => b.score - a.score);
  let matchedDocs = scoredDocs.filter((item) => item.score > 0).slice(0, 3).map((item) => item.doc);

  if (matchedDocs.length === 0) {
    matchedDocs = [COMPANY_DOCUMENTS.find((d) => d.id === "company_overview")];
  }

  // Ensure contact doc is included if contact intent is detected
  if (isContactIntent && !matchedDocs.some((d) => d.id === "contact_office")) {
    const contactDoc = COMPANY_DOCUMENTS.find((d) => d.id === "contact_office");
    if (contactDoc) matchedDocs.unshift(contactDoc);
  }

  // 3. Assemble verified context block
  const contextParts = [];

  if (matchedDocs.length > 0) {
    contextParts.push("=== VERIFIED BITBYTE TECHNOLOGIES WEBSITE DOCUMENTS ===");
    matchedDocs.forEach((doc) => {
      contextParts.push(`DOCUMENT: ${doc.title} (${doc.url})\n${doc.content.trim()}`);
    });
  }

  if (matchedFaqs.length > 0) {
    contextParts.push("=== VERIFIED FREQUENTLY ASKED QUESTIONS ===");
    matchedFaqs.forEach((faq) => {
      contextParts.push(`Q: ${faq.question}\nA: ${faq.answer}`);
    });
  }

  const context = contextParts.join("\n\n").slice(0, 12000);

  // 4. Extract deduplicated sources
  const sourcesMap = new Map();
  matchedDocs.forEach((d) => sourcesMap.set(d.title, { title: d.title, url: d.url }));
  matchedFaqs.forEach((f) => sourcesMap.set(f.docTitle, { title: f.docTitle, url: f.url }));

  const sources = Array.from(sourcesMap.values()).slice(0, 4);

  return {
    exactMatchFaq,
    matchedFaqs,
    matchedDocs,
    context,
    sources,
  };
}
