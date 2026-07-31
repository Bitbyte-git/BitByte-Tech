// ─── Category cards shown on the main landing page ───────────────────────────
export const websites = [
  {
    id: 0, slug: "textile", category: "Textile Website",
    description: "Fabric and apparel showcase with collection galleries, product catalogs, lookbooks, and fast quote requests.",
    badge: "Tailored", badgeColor: "bg-emerald-100 text-emerald-700",
    accent: "from-emerald-400 to-teal-500", previewBg: "from-emerald-50 to-teal-50",
    icon: "🧵", tags: ["Fabric", "Collections", "Lookbook"], color: "bg-emerald-500",
    coverImage: "assets/web-tex-1.png",
  },
  {
    id: 1, slug: "photoshop", category: "Photoshop Website",
    description: "Creative Photoshop website showcase for designers with portfolio layouts, mockup galleries, and branding visuals.",
    badge: "Creative", badgeColor: "bg-violet-100 text-violet-700",
    accent: "from-violet-400 to-fuchsia-500", previewBg: "from-violet-50 to-fuchsia-50",
    icon: "🎨", tags: ["Mockups", "Portfolio", "Branding"], color: "bg-violet-500",
    coverImage: "assets/photo-cover.png",
  },
  {
    id: 2, slug: "furniture", category: "Furniture Website",
    description: "Elegant showcase for furniture brands with product galleries, room inspiration, and seamless e-commerce integration.",
    badge: "Popular", badgeColor: "bg-amber-100 text-amber-700",
    accent: "from-amber-400 to-orange-500", previewBg: "from-amber-50 to-orange-50",
    icon: "🛋️", tags: ["E-Commerce", "Product Gallery", "Modern"], color: "bg-amber-500",
    coverImage: "assets/fur-out.png",
  },
  {
    id: 3, slug: "billing", category: "Billing Software Website",
    description: "Professional billing system showcase with invoice workflows, payment tracking, reports, and business dashboards.",
    badge: "Business", badgeColor: "bg-sky-100 text-sky-700",
    accent: "from-sky-400 to-blue-500", previewBg: "from-sky-50 to-blue-50",
    icon: "🧾", tags: ["Invoices", "Payments", "Reports"], color: "bg-sky-500",
    coverImage: "assets/test11.png",
  },
  {
    id: 4, slug: "hrms", category: "HRMS Website",
    description: "Modern HRMS platform showcase with employee records, attendance, payroll, leave management, and analytics.",
    badge: "Productive", badgeColor: "bg-indigo-100 text-indigo-700",
    accent: "from-indigo-400 to-cyan-500", previewBg: "from-indigo-50 to-cyan-50",
    icon: "👥", tags: ["Payroll", "Attendance", "Employees"], color: "bg-indigo-500",
    coverImage: "assets/test10.png",
  },
  {
    id: 5, slug: "restaurant", category: "Restaurant Website",
    description: "Appetizing design for restaurants featuring online menus, table reservations, and mouthwatering food photography.",
    badge: "Trending", badgeColor: "bg-red-100 text-red-700",
    accent: "from-red-400 to-rose-500", previewBg: "from-red-50 to-rose-50",
    icon: "🍽️", tags: ["Menu", "Reservations", "Food"], color: "bg-red-500",
    coverImage: "assets/rest-out.png",
  },
  {
    id: 6, slug: "gym", category: "Gym & Fitness Website",
    description: "High-energy design for gyms and fitness studios with class schedules, trainer profiles, and membership plans.",
    badge: "New", badgeColor: "bg-green-100 text-green-700",
    accent: "from-green-400 to-emerald-500", previewBg: "from-green-50 to-emerald-50",
    icon: "💪", tags: ["Fitness", "Classes", "Membership"], color: "bg-green-500",
    coverImage: "assets/test-img.png",
  },
  {
    id: 7, slug: "realestate", category: "Real Estate Website",
    description: "Sophisticated platform for real estate agencies with property listings, map search, virtual tours and lead capture.",
    badge: "Premium", badgeColor: "bg-blue-100 text-blue-700",
    accent: "from-blue-400 to-indigo-500", previewBg: "from-blue-50 to-indigo-50",
    icon: "🏠", tags: ["Listings", "Map Search", "Virtual Tour"], color: "bg-blue-500",
    coverImage: "assets/test-img1.png",
  },
  {
    id: 8, slug: "interior", category: "Interior Design Website",
    description: "Visually stunning portfolio for interior designers with project showcases, mood boards, and client consultations.",
    badge: "Creative", badgeColor: "bg-purple-100 text-purple-700",
    accent: "from-purple-400 to-violet-500", previewBg: "from-purple-50 to-violet-50",
    icon: "🎨", tags: ["Portfolio", "Gallery", "Luxury"], color: "bg-purple-500",
    coverImage: "assets/test-img3.png",
  },
  {
    id: 9, slug: "medical", category: "Medical & Clinic Website",
    description: "Clean, trustworthy design for clinics and hospitals with appointment booking, doctor profiles, and patient portal.",
    badge: "Trusted", badgeColor: "bg-cyan-100 text-cyan-700",
    accent: "from-cyan-400 to-teal-500", previewBg: "from-cyan-50 to-teal-50",
    icon: "🏥", tags: ["Appointments", "Doctors", "Healthcare"], color: "bg-cyan-500",
    coverImage: "assets/test8.png",
  },
  {
    id: 10, slug: "ecommerce", category: "E-Commerce Store",
    description: "Full-featured online store with product catalog, cart, wishlist, checkout flow, and inventory management.",
    badge: "Best Seller", badgeColor: "bg-pink-100 text-pink-700",
    accent: "from-pink-400 to-rose-500", previewBg: "from-pink-50 to-rose-50",
    icon: "🛒", tags: ["Shopping", "Cart", "Payments"], color: "bg-pink-500",
    coverImage: "assets/fur-out.png",
  },
];

// ─── 7 design variants per category ──────────────────────────────────────────
// image: use picsum with a unique seed so every card gets a different photo
// You can replace any image URL with your own screenshot later.

export const categoryDesigns = {

  // ── TEXTILE ────────────────────────────────────────────────────────────────
  textile: {
    accent: "from-emerald-400 to-teal-500", color: "text-emerald-600",
    bg: "from-emerald-50 to-teal-50", icon: "🧵",
    designs: [
      { id:1, name:"Weave Atelier",     style:"Luxury Fabric Showcase",  image:"assets/web-tex-1.png", desc:"Premium layout for textile brands featuring curated collections, material highlights, and elegant lookbooks.",              previewUrl:"https://saree-2.vercel.app/",         tags:["Luxury","Lookbook","Collections"],  badge:"Most Popular", badgeColor:"bg-emerald-100 text-emerald-700" },
      { id:2, name:"Fabric Finder",     style:"Catalog & Filters",       image:"assets/text-2.png", desc:"Advanced filter-driven browsing for fabrics with color swatches, composition tags, and quick quote CTAs.",               previewUrl:"https://bb-textile-site2.vercel.app/", tags:["Filters","Swatches","B2B"],         badge:"Trending",     badgeColor:"bg-teal-100 text-teal-700" },
      { id:3, name:"Sew & Sell",        style:"E-Commerce Ready",        image:"assets/site-3.png", desc:"Store-first textile theme with product gallery, cart flow, and wholesale request options.",                              previewUrl:"https://bb-textile-site3.vercel.app/",  tags:["Shop","Wholesale","Cart"],          badge:"Best Seller",  badgeColor:"bg-green-100 text-green-700" },
      { id:4, name:"Pattern Studio",    style:"Artistic Patterns",       image:"assets/site-4.png", desc:"Bold typographic system and pattern-inspired sections perfect for print designers and apparel studios.",               previewUrl:"https://textile-4-w1e4.vercel.app/",                  tags:["Patterns","Creative","Studio"],    badge:"Creative",     badgeColor:"bg-emerald-100 text-emerald-700" },
      { id:5, name:"Eco Textile",       style:"Sustainable Materials",   image:"assets/site-5.png", desc:"Biophilic color palette and impact-first layout for eco-friendly fabrics, certifications, and sourcing stories.",       previewUrl:"https://bb-textile-site5.vercel.app/",   tags:["Eco","Sustainability","Impact"],   badge:"Eco",          badgeColor:"bg-teal-100 text-teal-700" },
      { id:6, name:"Boutique Lookbook", style:"Editorial + Gallery",     image:"assets/site-6.png", desc:"Magazine-style lookbook with full-bleed visuals, project stories, and style editorial components.",                   previewUrl:"https://bb-textile-site6.vercel.app/",         tags:["Editorial","Gallery","Brand"],     badge:"Premium",      badgeColor:"bg-emerald-100 text-emerald-700" },
      { id:7, name:"Bulk Quote",        style:"B2B Quote Flow",          image:"assets/site-web7.jpeg", desc:"Quote request UI with sampling flow, bulk ordering pages, and fast lead capture sections for B2B clients.",           previewUrl:"https://arulmathi-silks.vercel.app/",   tags:["B2B","Quotes","Bulk"],             badge:"Trusted",      badgeColor:"bg-cyan-100 text-cyan-700" },
    ],
  },

  // ── PHOTOSHOP ──────────────────────────────────────────────────────────────
  photoshop: {
    accent: "from-violet-400 to-fuchsia-500", color: "text-violet-600",
    bg: "from-violet-50 to-fuchsia-50", icon: "🎨",
    designs: [
      { id:1, name:"Studio Canvas",      style:"Portfolio Showcase",    image:"assets/photo-web.png", desc:"Modern portfolio layout for creative studios with hero mockups, case studies, and client galleries.", previewUrl:"https://photoshop-web-eta.vercel.app/", tags:["Portfolio","Mockups","Branding"], badge:"Creative", badgeColor:"bg-violet-100 text-violet-700" },
      { id:2, name:"Mockup Lab",        style:"Design Presentation",   image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", desc:"Clean presentation site for designers to share brand assets, mockups, and creative workflows.", previewUrl:"https://preview.themeforest.net/item/werkstatt-portfolio-theme/full_screen_preview/22809857", tags:["Mockups","Studio","Creative"], badge:"Trend", badgeColor:"bg-pink-100 text-pink-700" },
      { id:3, name:"Brand Studio",      style:"Visual Identity",      image:"https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?w=600&q=80", desc:"Visual identity-focused design with case study sections, service highlights, and branding showcases.", previewUrl:"https://preview.themeforest.net/item/salient-responsive-multipurpose-theme/full_screen_preview/4363266", tags:["Branding","Identity","Case Study"], badge:"Premium", badgeColor:"bg-violet-100 text-violet-700" },
      { id:4, name:"Creative Deck",     style:"Agency Pitch",         image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80", desc:"Pitch-ready layout for agencies with service decks, pricing tables, and client testimonial sections.", previewUrl:"https://preview.themeforest.net/item/thegem-creative-multipurpose-theme/full_screen_preview/16061685", tags:["Agency","Pitch","Presentation"], badge:"Popular", badgeColor:"bg-fuchsia-100 text-fuchsia-700" },
      { id:5, name:"Asset Gallery",     style:"Brand Asset Hub",      image:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80", desc:"A polished gallery to display logos, brand sheets, mood boards, and downloadable design assets.", previewUrl:"https://preview.themeforest.net/item/pofo-creative-portfolio-template/full_screen_preview/20458875", tags:["Gallery","Assets","Download"], badge:"Gallery", badgeColor:"bg-violet-100 text-violet-700" },
      { id:6, name:"Freelance Pro",     style:"Designer Landing",      image:"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80", desc:"Landing page design for freelance creatives with service highlights, testimonials, and contact CTAs.", previewUrl:"https://preview.themeforest.net/item/uncode-creative-multipurpose-theme/full_screen_preview/20432134", tags:["Landing","Freelance","Services"], badge:"Freelance", badgeColor:"bg-pink-100 text-pink-700" },
      { id:7, name:"Creative Grid",     style:"Project Showcase",      image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80", desc:"Grid-based project showcase for agencies and freelancers with bold thumbnails and narrative storytelling.", previewUrl:"https://preview.themeforest.net/item/soho-creative-portfolio/full_screen_preview/20942624", tags:["Projects","Showcase","Story"], badge:"New", badgeColor:"bg-violet-100 text-violet-700" },
    ],
  },

  // ── FURNITURE ──────────────────────────────────────────────────────────────
  furniture: {
    accent: "from-amber-400 to-orange-500", color: "text-amber-600",
    bg: "from-amber-50 to-orange-50", icon: "🛋️",
    designs: [
      { id:1, name:"Luxe Living",    style:"Minimalist Luxury",    image:"assets/fur-web.png", desc:"Clean white space, large product imagery, and subtle gold accents perfect for premium furniture brands.", previewUrl:"https://furniture-web-dev-cenk.vercel.app/", tags:["Minimalist","Luxury","E-Shop"],        badge:"Most Popular", badgeColor:"bg-amber-100 text-amber-700" },
      { id:1, name:"Luxe Living",    style:"Minimalist Luxury",    image:"assets/furniture- img1.png", desc:"Clean white space, large product imagery, and subtle gold accents perfect for premium furniture brands.", previewUrl:"https://furniture-web-dev-cenk.vercel.app/", tags:["Minimalist","Luxury","E-Shop"],        badge:"Most Popular", badgeColor:"bg-amber-100 text-amber-700" },
      { id:2, name:"Nordic Home",    style:"Scandinavian Style",   image:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80", desc:"Warm neutrals, clean grid layouts, and a cozy Scandinavian aesthetic for modern home brands.",           previewUrl:"https://preview.themeforest.net/item/homestyle-furniture-store-html-template/full_screen_preview/24130933", tags:["Nordic","Warm","Lifestyle"],          badge:"Trending",    badgeColor:"bg-orange-100 text-orange-700" },
      { id:3, name:"Urban Loft",     style:"Industrial Modern",    image:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80", desc:"Dark backgrounds, bold typography, and industrial textures for urban furniture collections.",              previewUrl:"https://preview.themeforest.net/item/woodmart-woocommerce-wordpress-theme/full_screen_preview/20264492", tags:["Dark Theme","Bold","Urban"],           badge:"New",         badgeColor:"bg-gray-100 text-gray-700" },
      { id:4, name:"Casa Bella",     style:"Italian Elegance",     image:"https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80", desc:"Sophisticated serif typography, rich earth tones, and editorial-style photography layouts.",               previewUrl:"https://preview.themeforest.net/item/glamo-furniture-store-html-template/full_screen_preview/26556523", tags:["Elegant","Editorial","Premium"],      badge:"Premium",     badgeColor:"bg-amber-100 text-amber-700" },
      { id:5, name:"Eco Wood",       style:"Natural & Organic",    image:"https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80", desc:"Nature-inspired palette, wood textures, and sustainable brand storytelling for eco furniture.",            previewUrl:"https://preview.themeforest.net/item/furnio-furniture-store-html-template/full_screen_preview/29115811", tags:["Eco","Natural","Sustainable"],        badge:"Green",       badgeColor:"bg-green-100 text-green-700" },
      { id:6, name:"Artisan Craft",  style:"Handmade & Boutique",  image:"https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80", desc:"Artisan feel with hand-drawn elements, textured backgrounds, and story-driven product pages.",             previewUrl:"https://preview.themeforest.net/item/craftshop-handmade-shop-html-template/full_screen_preview/20553057", tags:["Artisan","Boutique","Handmade"],      badge:"Creative",    badgeColor:"bg-yellow-100 text-yellow-700" },
      { id:7, name:"Smart Room",     style:"Tech + Furniture",     image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", desc:"Modern SaaS-inspired layout for smart home furniture with AR preview features and 3D product tours.",        previewUrl:"https://preview.themeforest.net/item/divi-the-ultimate-wordpress-theme/full_screen_preview/242431", tags:["Tech","AR/3D","Smart Home"],           badge:"Innovative",  badgeColor:"bg-blue-100 text-blue-700" },
    ],
  },


  // ── BILLING ─────────────────────────────────────────────────────────────
  billing: {
    accent: "from-sky-400 to-blue-500", color: "text-sky-600",
    bg: "from-sky-50 to-blue-50", icon: "🧾",
    designs: [
      { id:1, name:"Invoice Flow", style:"Smart Billing Dashboard", image:"assets/test10.png", desc:"Clean billing platform layout with invoice creation, payment status, tax summary, and client ledgers.", previewUrl:"https://bit-byte-billing-client.vercel.app/login", tags:["Invoices","GST","Ledger"], badge:"Most Popular", badgeColor:"bg-sky-100 text-sky-700" },
      { id:2, name:"Retail POS", style:"Point of Sale", image:"https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=80", desc:"Fast retail billing interface with product lookup, barcode-ready checkout, receipts, and daily sales reports.", previewUrl:"https://preview.themeforest.net/item/vuexy-vuejs-html-laravel-admin-dashboard-template/full_screen_preview/23328599", tags:["POS","Receipts","Retail"], badge:"Trending", badgeColor:"bg-blue-100 text-blue-700" },
      { id:3, name:"Finance Desk", style:"Accounts & Reports", image:"https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80", desc:"Report-first design for accountants with cash flow widgets, outstanding balances, and exportable statements.", previewUrl:"https://preview.themeforest.net/item/skote-html-laravel-admin-dashboard-template/full_screen_preview/25548061", tags:["Reports","Accounts","Exports"], badge:"Premium", badgeColor:"bg-indigo-100 text-indigo-700" },
      { id:4, name:"Subscription Bill", style:"Recurring Payments", image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80", desc:"SaaS billing layout with recurring plans, renewal reminders, usage charges, and payment history.", previewUrl:"https://preview.themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/full_screen_preview/26366820", tags:["Recurring","Plans","History"], badge:"SaaS", badgeColor:"bg-cyan-100 text-cyan-700" },
      { id:5, name:"Vendor Pay", style:"Purchase Billing", image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", desc:"Vendor-focused billing system with purchase entries, due reminders, stock-linked invoices, and approvals.", previewUrl:"https://preview.themeforest.net/item/velzon-aspnet-core-admin-dashboard-template/full_screen_preview/36077495", tags:["Vendors","Purchase","Approvals"], badge:"Operations", badgeColor:"bg-emerald-100 text-emerald-700" },
      { id:6, name:"Tax Ready", style:"Compliance Billing", image:"https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&q=80", desc:"Compliance-ready design with tax slabs, credit notes, payment reconciliation, and audit-friendly records.", previewUrl:"https://preview.themeforest.net/item/spruha-bootstrap-admin-panel-html-dashboard-template/full_screen_preview/25756171", tags:["Tax","Audit","Credit Notes"], badge:"Trusted", badgeColor:"bg-slate-100 text-slate-700" },
      { id:7, name:"Mobile Bills", style:"Responsive Billing App", image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", desc:"Mobile-friendly billing experience for field teams with quick invoices, UPI payment links, and customer records.", previewUrl:"https://preview.themeforest.net/item/nobleui-html-laravel-admin-template/full_screen_preview/24675813", tags:["Mobile","UPI","Customers"], badge:"Fast", badgeColor:"bg-sky-100 text-sky-700" },
    ],
  },

  // ── HRMS ────────────────────────────────────────────────────────────────
  hrms: {
    accent: "from-indigo-400 to-cyan-500", color: "text-indigo-600",
    bg: "from-indigo-50 to-cyan-50", icon: "👥",
    designs: [
      { id:1, name:"HRMS", style:"Complete Employee Management", image:"assets/test10.png", desc:"A modern enterprise HR platform for employee records,role-based access, onboarding, attendance tracking,leave requests, payroll management, and organizational workflows.", previewUrl:"https://hrms-bit-byte.vercel.app/login", tags:["Employees","Payroll","Attendance"], badge:"Most Popular", badgeColor:"bg-indigo-100 text-indigo-700" },
      { id:2, name:"Payroll Pro", style:"Payroll Dashboard", image:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80", desc:"Payroll-focused interface with salary slips, deductions, bonuses, reimbursement tracking, and monthly exports.", previewUrl:"https://preview.themeforest.net/item/hrm-human-resource-management-admin-template/full_screen_preview/28734456", tags:["Payroll","Salary","Exports"], badge:"Payroll", badgeColor:"bg-cyan-100 text-cyan-700" },
      { id:3, name:"Attendly", style:"Attendance & Leave", image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", desc:"Attendance-first HRMS with check-ins, shift rosters, leave approvals, holiday calendars, and team availability.", previewUrl:"https://preview.themeforest.net/item/adminto-responsive-admin-dashboard-template/full_screen_preview/15025393", tags:["Attendance","Leave","Shifts"], badge:"Trending", badgeColor:"bg-blue-100 text-blue-700" },
      { id:4, name:"Recruit Suite", style:"Hiring Pipeline", image:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", desc:"Recruitment module design with job posts, candidate stages, interview schedules, and offer workflows.", previewUrl:"https://preview.themeforest.net/item/jobick-job-admin-dashboard-bootstrap-template/full_screen_preview/32720853", tags:["Hiring","Candidates","Interviews"], badge:"Recruiting", badgeColor:"bg-violet-100 text-violet-700" },
      { id:5, name:"Performance Grid", style:"Reviews & Goals", image:"https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80", desc:"Performance review layout with OKRs, appraisal forms, manager feedback, skill matrices, and progress charts.", previewUrl:"https://preview.themeforest.net/item/minia-bootstrap-admin-dashboard-template/full_screen_preview/33496481", tags:["Reviews","OKR","Skills"], badge:"Growth", badgeColor:"bg-emerald-100 text-emerald-700" },
      { id:6, name:"HR Analytics", style:"People Analytics", image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", desc:"Analytics-heavy HRMS design with attrition insights, headcount charts, payroll trends, and department reports.", previewUrl:"https://preview.themeforest.net/item/sash-bootstrap-5-admin-dashboard-template/full_screen_preview/35183671", tags:["Analytics","Reports","Headcount"], badge:"Insights", badgeColor:"bg-sky-100 text-sky-700" },
      { id:7, name:"Self Service", style:"Employee Portal", image:"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", desc:"Employee self-service portal with payslips, leave requests, document downloads, policies, and support tickets.", previewUrl:"https://preview.themeforest.net/item/dashlite-bootstrap-responsive-admin-dashboard-template/full_screen_preview/25780042", tags:["Portal","Payslips","Tickets"], badge:"Self Serve", badgeColor:"bg-indigo-100 text-indigo-700" },
    ],
  },

  // ── RESTAURANT ─────────────────────────────────────────────────────────────
  restaurant: {
    accent: "from-red-400 to-rose-500", color: "text-red-600",
    bg: "from-red-50 to-rose-50", icon: "🍽️",
    designs: [
      { id:1, name:"Fine Dine",     style:"Upscale Restaurant",   image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", desc:"Dark, moody ambience with elegant typography and full-page food photography for fine dining.",           previewUrl:"https://preview.themeforest.net/item/restho-restaurant-cafe-html-template/full_screen_preview/29500882", tags:["Fine Dining","Dark","Elegant"],  badge:"Most Popular",  badgeColor:"bg-red-100 text-red-700" },
      { id:2, name:"Café Corner",   style:"Cozy Café",            image:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80", desc:"Warm browns, handwritten fonts, and a cozy layout perfect for coffee shops and cafés.",                  previewUrl:"https://preview.themeforest.net/item/caffino-coffee-shop-html-template/full_screen_preview/26530045", tags:["Café","Warm","Coffee"],          badge:"Trending",     badgeColor:"bg-amber-100 text-amber-700" },
      { id:3, name:"Street Eats",   style:"Fast Food & Casual",   image:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80", desc:"Bold colors, playful typography, and online ordering flow for fast casual and street food brands.",        previewUrl:"https://preview.themeforest.net/item/burger-house-food-restaurant-html/full_screen_preview/24574752", tags:["Fast Food","Bold","Online Order"], badge:"Fun",          badgeColor:"bg-yellow-100 text-yellow-700" },
      { id:4, name:"Sushi Bar",     style:"Japanese Minimalist",  image:"https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80", desc:"Zen-inspired white space, clean grid, and Asian typographic details for sushi restaurants.",              previewUrl:"https://preview.themeforest.net/item/sushi-bar-restaurant-html-template/full_screen_preview/13327891", tags:["Japanese","Minimal","Sushi"],    badge:"Unique",       badgeColor:"bg-rose-100 text-rose-700" },
      { id:5, name:"Bistro Plus",   style:"European Bistro",      image:"https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80", desc:"Classic French bistro aesthetic with reservation system, wine list, and seasonal menu display.",           previewUrl:"https://preview.themeforest.net/item/restaurant-cafe-html5-template/full_screen_preview/9156955", tags:["Bistro","European","Reservation"], badge:"Classic",      badgeColor:"bg-red-100 text-red-700" },
      { id:6, name:"Pizza Hub",     style:"Pizzeria & Italian",   image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", desc:"Vibrant red and white, rustic textures, and online ordering perfect for pizzerias.",                     previewUrl:"https://preview.themeforest.net/item/pizzaro-fast-food-restaurant-html/full_screen_preview/26339939", tags:["Pizza","Italian","Delivery"],    badge:"Delivery Ready",badgeColor:"bg-orange-100 text-orange-700" },
      { id:7, name:"Vegan Garden",  style:"Health & Plant-Based", image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80", desc:"Fresh greens, organic shapes, and clean layout for vegan, vegetarian, and health food restaurants.",      previewUrl:"https://preview.themeforest.net/item/greenfood-organic-food-html-template/full_screen_preview/20501636", tags:["Vegan","Healthy","Fresh"],       badge:"Green",        badgeColor:"bg-green-100 text-green-700" },
    ],
  },

  // ── GYM ────────────────────────────────────────────────────────────────────
  gym: {
    accent: "from-green-400 to-emerald-500", color: "text-green-600",
    bg: "from-green-50 to-emerald-50", icon: "💪",
    designs: [
      { id:1, name:"Power House",  style:"Heavy & Bold",       image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", desc:"Dark industrial design with bold typography, trainer profiles, and class booking system.",               previewUrl:"https://preview.themeforest.net/item/gymfit-gym-fitness-html-template/full_screen_preview/20282479", tags:["Bold","Dark","Gym"],          badge:"Most Popular", badgeColor:"bg-green-100 text-green-700" },
      { id:2, name:"Flex Studio",  style:"Modern Clean",       image:"https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80", desc:"White and neon green palette, clean layout for boutique fitness studios and personal trainers.",          previewUrl:"https://preview.themeforest.net/item/fitclub-gym-fitness-club-html-template/full_screen_preview/28564157", tags:["Studio","Neon","Modern"],     badge:"Trending",     badgeColor:"bg-emerald-100 text-emerald-700" },
      { id:3, name:"Yoga Zen",     style:"Yoga & Wellness",    image:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80", desc:"Soft neutrals, breathing room, and mindful design for yoga studios and wellness centers.",                previewUrl:"https://preview.themeforest.net/item/yogast-yoga-studio-html-template/full_screen_preview/28619736", tags:["Yoga","Wellness","Calm"],     badge:"Peaceful",     badgeColor:"bg-teal-100 text-teal-700" },
      { id:4, name:"CrossFit Pro", style:"High Intensity",     image:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", desc:"Action shots, bold red accents, and a membership tier system for CrossFit boxes.",                       previewUrl:"https://preview.themeforest.net/item/fitnesclub-gym-fitness-html5-template/full_screen_preview/16701984", tags:["CrossFit","Intense","Membership"], badge:"High Energy", badgeColor:"bg-red-100 text-red-700" },
      { id:5, name:"Cardio Zone",  style:"Cardio & Running",   image:"https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80", desc:"Dynamic layout with event calendar, run club features, and performance tracking for cardio gyms.",       previewUrl:"https://preview.themeforest.net/item/sport-gym-fitness-html-template/full_screen_preview/13748284", tags:["Running","Events","Cardio"],  badge:"Active",       badgeColor:"bg-blue-100 text-blue-700" },
      { id:6, name:"Boxing Gym",   style:"Combat & MMA",       image:"https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80", desc:"Aggressive dark layout with highlight reels, fighter profiles, and fight event pages.",                   previewUrl:"https://preview.themeforest.net/item/martialarts-martial-arts-school-html/full_screen_preview/21847555", tags:["Boxing","MMA","Combat"],      badge:"Fighter",      badgeColor:"bg-gray-100 text-gray-700" },
      { id:7, name:"Body & Mind",  style:"Holistic Fitness",   image:"https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80", desc:"Balanced design combining fitness, nutrition, and mental wellness programs with online booking.",          previewUrl:"https://preview.themeforest.net/item/healthy-life-fitness-html-template/full_screen_preview/15733441", tags:["Holistic","Nutrition","Wellness"], badge:"Balanced",   badgeColor:"bg-lime-100 text-lime-700" },
    ],
  },

  // ── REAL ESTATE ────────────────────────────────────────────────────────────
  realestate: {
    accent: "from-blue-400 to-indigo-500", color: "text-blue-600",
    bg: "from-blue-50 to-indigo-50", icon: "🏠",
    designs: [
      { id:1, name:"Estate Pro",    style:"Full Agency Platform",      image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", desc:"Agency website with advanced property search, map view, agent profiles, and lead capture.",  previewUrl:"https://preview.themeforest.net/item/homez-real-estate-html-template/full_screen_preview/28580695", tags:["Agency","Search","Leads"],         badge:"Most Popular", badgeColor:"bg-blue-100 text-blue-700" },
      { id:2, name:"Luxury Homes",  style:"Luxury Real Estate",        image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", desc:"Dark prestige design for luxury property sales with cinematic full-screen video backgrounds.",        previewUrl:"https://preview.themeforest.net/item/reales-real-estate-html-template/full_screen_preview/11895553", tags:["Luxury","Premium","Video"],         badge:"Premium",      badgeColor:"bg-indigo-100 text-indigo-700" },
      { id:3, name:"RentEasy",      style:"Rental Platform",           image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", desc:"Clean rental-focused layout with filters, pricing tables, and tenant application forms.",            previewUrl:"https://preview.themeforest.net/item/findhouse-real-estate-html-template/full_screen_preview/21561648", tags:["Rental","Filters","Applications"],  badge:"Rental",       badgeColor:"bg-cyan-100 text-cyan-700" },
      { id:4, name:"PropList",      style:"Property Listing Portal",   image:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", desc:"Portal-style design with advanced filters, grid/list toggle, and property comparison feature.",      previewUrl:"https://preview.themeforest.net/item/listeo-directory-listings-with-booking-html-template/full_screen_preview/23239920", tags:["Portal","Listings","Compare"],      badge:"Feature Rich",  badgeColor:"bg-blue-100 text-blue-700" },
      { id:5, name:"Agent Plus",    style:"Individual Agent",          image:"https://images.unsplash.com/photo-1600607687939-ce8a6d5eb9a9?w=600&q=80", desc:"Personal brand website for individual real estate agents with testimonials, listings, and CRM.",    previewUrl:"https://preview.themeforest.net/item/resido-real-estate-html-template/full_screen_preview/18834936", tags:["Agent","Personal","CRM"],           badge:"Solo Agent",    badgeColor:"bg-violet-100 text-violet-700" },
      { id:6, name:"New Build",     style:"Property Developer",        image:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", desc:"Off-plan property developer site with floor plan viewer, progress updates, and investor section.",   previewUrl:"https://preview.themeforest.net/item/galderia-architecture-and-interior-html-template/full_screen_preview/22105498", tags:["Developer","Floor Plans","Investor"], badge:"Developer",    badgeColor:"bg-amber-100 text-amber-700" },
      { id:7, name:"Virtual Tour",  style:"Modern + Virtual Reality",  image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", desc:"Tech-forward design with embedded 360° virtual tours, drone footage, and AR property preview.",     previewUrl:"https://preview.themeforest.net/item/real-estate-website-template/full_screen_preview/26574766", tags:["Virtual Tour","360°","AR"],         badge:"Future Ready",  badgeColor:"bg-sky-100 text-sky-700" },
    ],
  },

  // ── INTERIOR ───────────────────────────────────────────────────────────────
  interior: {
    accent: "from-purple-400 to-violet-500", color: "text-purple-600",
    bg: "from-purple-50 to-violet-50", icon: "🎨",
    designs: [
      { id:1, name:"Studio Luxe",    style:"Luxury Portfolio",       image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", desc:"Editorial magazine layout with full-bleed project photography and award-winning design showcase.", previewUrl:"https://preview.themeforest.net/item/interia-interior-design-html-template/full_screen_preview/28551440", tags:["Portfolio","Luxury","Editorial"],    badge:"Most Popular", badgeColor:"bg-purple-100 text-purple-700" },
      { id:2, name:"Minimal Space",  style:"Clean & Minimal",        image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", desc:"Ultra-minimal white design letting the project photography speak — perfect for modern designers.", previewUrl:"https://preview.themeforest.net/item/archi-architecture-and-interior-design/full_screen_preview/20505322", tags:["Minimal","White","Photography"],    badge:"Elegant",      badgeColor:"bg-gray-100 text-gray-700" },
      { id:3, name:"Mood Board",     style:"Creative & Artistic",    image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=600&q=80", desc:"Pinterest-style masonry grid with mood boards, color palettes, and project deep-dives.",          previewUrl:"https://preview.themeforest.net/item/porto-multipurpose-html5-template/full_screen_preview/4106987", tags:["Masonry","Creative","Mood Board"],  badge:"Creative",     badgeColor:"bg-pink-100 text-pink-700" },
      { id:4, name:"Dark Prestige",  style:"Dark Luxury",            image:"https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", desc:"Black and gold prestige design for high-end interior firms targeting luxury residential clients.",  previewUrl:"https://preview.themeforest.net/item/archin-architecture-html-template/full_screen_preview/23948897", tags:["Dark","Gold","High-End"],           badge:"Premium",      badgeColor:"bg-yellow-100 text-yellow-700" },
      { id:5, name:"Boho Chic",      style:"Bohemian & Warm",        image:"https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80", desc:"Earthy tones, organic shapes, and a warm aesthetic for bohemian interior designers.",             previewUrl:"https://preview.themeforest.net/item/be-theme-responsive-multipurpose-wordpress/full_screen_preview/7758048", tags:["Boho","Earthy","Warm"],             badge:"Cozy",         badgeColor:"bg-orange-100 text-orange-700" },
      { id:6, name:"Office Design",  style:"Commercial Interiors",   image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", desc:"Corporate-focused design for commercial interior firms specializing in offices and retail spaces.",previewUrl:"https://preview.themeforest.net/item/galderia-architecture-and-interior-html-template/full_screen_preview/22105498", tags:["Commercial","Office","Retail"],     badge:"Corporate",    badgeColor:"bg-blue-100 text-blue-700" },
      { id:7, name:"Eco Interior",   style:"Sustainable Design",     image:"https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&q=80", desc:"Nature-inspired layouts highlighting sustainable materials, biophilic design, and green certifications.", previewUrl:"https://preview.themeforest.net/item/greenpark-ecology-environment-html-template/full_screen_preview/15741094", tags:["Sustainable","Green","Biophilic"], badge:"Eco",          badgeColor:"bg-green-100 text-green-700" },
    ],
  },

  // ── MEDICAL ────────────────────────────────────────────────────────────────
  medical: {
    accent: "from-cyan-400 to-teal-500", color: "text-cyan-600",
    bg: "from-cyan-50 to-teal-50", icon: "🏥",
    designs: [
      { id:1, name:"MediCare Pro",     style:"Full Hospital Portal",     image:"https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80", desc:"Hospital website with department pages, doctor search, appointment booking, and patient portal.", previewUrl:"https://preview.themeforest.net/item/medilab-medical-health-html5-template/full_screen_preview/24185472", tags:["Hospital","Portal","Booking"],    badge:"Most Popular", badgeColor:"bg-cyan-100 text-cyan-700" },
      { id:2, name:"Dental Smile",     style:"Dental Clinic",            image:"https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80", desc:"Bright, friendly design for dental clinics with service showcases, before/after gallery, and booking.", previewUrl:"https://preview.themeforest.net/item/dentiste-dental-clinic-html-template/full_screen_preview/20462061", tags:["Dental","Friendly","Gallery"],   badge:"Dental",       badgeColor:"bg-blue-100 text-blue-700" },
      { id:3, name:"Clinic Plus",      style:"General Practice",         image:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", desc:"Trustworthy design for GP clinics and private practices with online appointment and patient records.", previewUrl:"https://preview.themeforest.net/item/health-and-medical-html-template/full_screen_preview/10606698", tags:["GP","Appointments","Trust"],     badge:"Trusted",      badgeColor:"bg-teal-100 text-teal-700" },
      { id:4, name:"Pharma Web",       style:"Pharmacy & Drug Store",    image:"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80", desc:"Clean pharmacy website with product catalog, prescription upload, and health blog integration.",        previewUrl:"https://preview.themeforest.net/item/pharma-medical-health-html-template/full_screen_preview/20539116", tags:["Pharmacy","Products","Blog"],    badge:"Pharmacy",     badgeColor:"bg-green-100 text-green-700" },
      { id:5, name:"Mental Wellness",  style:"Psychology & Therapy",     image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", desc:"Calm, approachable design for therapists and mental health professionals with session booking.",       previewUrl:"https://preview.themeforest.net/item/medic-medical-and-health-html5-template/full_screen_preview/21714097", tags:["Therapy","Mental Health","Calm"], badge:"Wellness",    badgeColor:"bg-violet-100 text-violet-700" },
      { id:6, name:"Eye Care",         style:"Optometry & Vision",       image:"https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=600&q=80", desc:"Specialist design for optometry clinics with eye test booking, eyewear showcase, and virtual try-on.", previewUrl:"https://preview.themeforest.net/item/cliniq-medical-health-html-template/full_screen_preview/20356456", tags:["Optometry","Eye Care","Specialist"], badge:"Specialist", badgeColor:"bg-sky-100 text-sky-700" },
      { id:7, name:"Wellness Hub",     style:"Integrative & Holistic",   image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80", desc:"Holistic health centre website with multiple practitioner profiles, wellness blog, and class booking.", previewUrl:"https://preview.themeforest.net/item/themedical-health-and-medical-html/full_screen_preview/26565898", tags:["Holistic","Wellness","Classes"], badge:"Holistic",     badgeColor:"bg-lime-100 text-lime-700" },
    ],
  },

  // ── E-COMMERCE ─────────────────────────────────────────────────────────────
  ecommerce: {
    accent: "from-pink-400 to-rose-500", color: "text-pink-600",
    bg: "from-pink-50 to-rose-50", icon: "🛒",
    designs: [
      { id:1, name:"Shop Master",      style:"Full E-Commerce",          image:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80", desc:"Feature-rich online store with product filtering, wishlist, cart, checkout, and order tracking.", previewUrl:"https://preview.themeforest.net/item/bacola-grocery-store-and-food-html-template/full_screen_preview/31154999", tags:["Full Store","Cart","Tracking"],   badge:"Best Seller", badgeColor:"bg-pink-100 text-pink-700" },
      { id:2, name:"Fashion Boutique", style:"Fashion & Apparel",        image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", desc:"Editorial fashion store with lookbook pages, size guide, outfit builder, and influencer collab pages.", previewUrl:"https://preview.themeforest.net/item/fashe-fashion-html-template/full_screen_preview/20688987", tags:["Fashion","Lookbook","Apparel"],  badge:"Trending",   badgeColor:"bg-rose-100 text-rose-700" },
      { id:3, name:"TechStore",        style:"Electronics & Gadgets",    image:"https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80", desc:"Tech-focused store with product comparison, spec sheets, video reviews, and bundle offers.",         previewUrl:"https://preview.themeforest.net/item/electro-electronics-store-html-template/full_screen_preview/9909195", tags:["Electronics","Tech","Compare"],  badge:"Tech",       badgeColor:"bg-blue-100 text-blue-700" },
      { id:4, name:"Beauty Bar",       style:"Beauty & Cosmetics",       image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80", desc:"Elegant beauty store with shade finder, skin quiz, subscription boxes, and loyalty rewards.",        previewUrl:"https://preview.themeforest.net/item/beautify-cosmetics-shop-html5-template/full_screen_preview/22488558", tags:["Beauty","Cosmetics","Subscription"], badge:"Glamour", badgeColor:"bg-fuchsia-100 text-fuchsia-700" },
      { id:5, name:"Food Market",      style:"Grocery & Food",           image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80", desc:"Grocery-style marketplace with category browsing, fresh deals, same-day delivery, and recipe blog.", previewUrl:"https://preview.themeforest.net/item/martfury-multivendor-marketplace-html-template/full_screen_preview/25476825", tags:["Grocery","Delivery","Fresh"],    badge:"Grocery",    badgeColor:"bg-green-100 text-green-700" },
      { id:6, name:"Kids Zone",        style:"Kids & Toys",              image:"https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&q=80", desc:"Colorful, playful store for children's toys, clothing, and educational products with safe checkout.", previewUrl:"https://preview.themeforest.net/item/toyshop-html5-ecommerce-template/full_screen_preview/9473888", tags:["Kids","Toys","Colorful"],        badge:"Fun",        badgeColor:"bg-yellow-100 text-yellow-700" },
      { id:7, name:"Marketplace Pro",  style:"Multi-Vendor Marketplace", image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", desc:"Multi-vendor platform with seller dashboards, product auctions, reviews, and affiliate program.",   previewUrl:"https://preview.themeforest.net/item/marketo-multipurpose-ecommerce-html-template/full_screen_preview/24433889", tags:["Multi-Vendor","Auction","Affiliate"], badge:"Marketplace", badgeColor:"bg-indigo-100 text-indigo-700" },
    ],
  },
};

// ─── Shared data ──────────────────────────────────────────────────────────────
export const features = [
  { icon:"🎨", title:"Custom Colors & Branding",  desc:"Your brand colors, fonts, and logo applied throughout every page." },
  { icon:"📱", title:"Responsive Design",          desc:"Pixel-perfect on mobile, tablet, laptop, and widescreen displays." },
  { icon:"🔍", title:"SEO Friendly",               desc:"Optimized meta tags, structured data, and fast load times for search ranking." },
  { icon:"⚡", title:"Fast Performance",           desc:"Lighthouse 90+ scores with lazy loading, CDN, and optimized assets." },
  { icon:"🔧", title:"Admin Panel",                desc:"Easy-to-use dashboard to update content, products, and settings yourself." },
  { icon:"📝", title:"Content Management",         desc:"Powered by a modern CMS so you can publish and edit without developers." },
  { icon:"✨", title:"Custom Features",            desc:"Booking systems, payment gateways, chat widgets — built exactly how you need." },
  { icon:"💎", title:"Modern UI/UX",               desc:"Award-winning design patterns that convert visitors into loyal customers." },
];

export const steps = [
  { step:"01", title:"Choose a Design",      desc:"Browse our showcase, preview live demos, and pick the style that fits your business.", icon:"🖥️" },
  { step:"02", title:"Discuss Requirements", desc:"We schedule a free consultation to understand your brand, goals, and specific needs.", icon:"💬" },
  { step:"03", title:"Customize & Build",    desc:"Our team tailors every detail — content, colors, features — to match your vision perfectly.", icon:"⚙️" },
  { step:"04", title:"Launch Your Website",  desc:"After testing and your approval, we go live. Your business is ready to grow online.", icon:"🚀" },
];


