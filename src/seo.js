import { useEffect } from "react";

const SITE_URL = "https://bitbytetech.org";

const page = (title, description, keywords, extra = {}) => ({
  title,
  description,
  keywords,
  ...extra,
});

export const SEO_BY_PATH = {
  "/": page(
    "Bit Byte Technologies in Salem",
    "Bit Byte Technologies is a web development company in Salem offering website development, web apps, SEO and digital marketing solutions for growing businesses.",
    "Web Development Company in Salem,Website Development Company in Salem, Digital Marketing Agency in Salem",
    {
      h1: "Transforming Imagination into Digital Reality",
      faqs: [
        ["What services does a web development company in Salem provide?", "Bit Byte Technologies is a web development and digital solutions company in Salem providing website development, ecommerce development, custom web applications, web portals, dashboards and related digital solutions. Depending on business requirements, Bit Byte Technologies can help with website design and development, integrations, maintenance, SEO and digital marketing solutions."],
        ["Do you provide SEO services in Salem?", "Yes. Bit Byte Technologies provides digital marketing and SEO-focused solutions designed to improve a business's online visibility. SEO can include keyword research, technical SEO, on-page optimization, content strategy, local SEO and performance analysis, depending on the requirements of the business and its target audience."],
        ["Do you build custom web applications?", "Yes. Bit Byte Technologies develops custom web applications for businesses that need functionality beyond a standard website. Custom web applications can include business management systems, customer portals, dashboards, workflow applications, database-driven platforms and software integrations based on specific business requirements."],
        ["Can you work with businesses outside Salem?", "Yes. Bit Byte Technologies can work with businesses outside Salem through remote communication, online meetings and digital project collaboration. This allows the company to provide web development, software, analytics and digital solutions to businesses across Tamil Nadu and other locations where remote collaboration is suitable."],
      ],
    },
  ),
  "/services/web-development": page(
    "Web Development in Salem",
    "Bit Byte Technologies is a web development company in Salem offering custom websites, web applications, eCommerce and scalable digital solutions for businesses.",
    "Web Development Company in Salem,Website Development Company in Salem, Web Development Services in Salem",
    {
      h1: "Web Development",
      supportingCopy: "Bit Byte Technologies builds fast, secure and scalable websites and web applications for businesses in Salem and across Tamil Nadu. From business websites and eCommerce platforms to custom web applications and APIs, our development team creates digital solutions designed around your business goals.",
      faqs: [
        ["What does a web development company in Salem do?", "Bit Byte Technologies is a web development company in Salem that helps businesses design, develop and maintain websites and web-based solutions. Its web development capabilities can include responsive business websites, custom web applications, ecommerce websites, web portals, dashboards, integrations and ongoing website support."],
        ["How much does website development cost in Salem?", "Website development cost in Salem depends on the website's design, number of pages, functionality, CMS requirements, integrations, ecommerce features and support needs. Bit Byte Technologies can provide a project-specific quotation after understanding the required pages, features, technology requirements and business objectives."],
        ["How long does it take to develop a website?", "Website development time depends on the project scope, number of pages, design complexity, content readiness, integrations and approval process. Bit Byte Technologies can establish a project timeline after understanding the website requirements. A simple business website generally requires less development work than an ecommerce website or custom web application."],
        ["Do you develop custom web applications?", "Yes. Bit Byte Technologies develops custom web applications for businesses that require specialized workflows, databases, dashboards, user accounts, integrations or business-specific functionality. The application can be planned around the organization's processes and technical requirements."],
        ["Do you provide eCommerce website development in Salem?", "Yes. Bit Byte Technologies provides ecommerce development solutions for businesses that want to sell products or services online. Ecommerce functionality can include product catalogues, shopping carts, checkout, payment gateway integration, order management, inventory functionality, customer accounts and ecommerce SEO."],
        ["Can you redesign an existing website?", "Yes. Bit Byte Technologies can help businesses redesign existing websites to improve visual design, mobile responsiveness, user experience, performance, content structure and conversion paths. A website redesign can also include SEO and technical improvements while preserving valuable existing URLs where appropriate."],
        ["Do you provide website maintenance after development?", "Bit Byte Technologies can provide post-development website support based on the project's requirements. Website maintenance may include content updates, technical fixes, security updates, performance improvements, backups, feature enhancements and ongoing website support."],
      ],
    },
  ),
  "/services/web-development/custom-web-applications": page(
    "Custom Web Application Development in Salem",
    "Build secure, scalable custom web applications in Salem with Bit Byte Technologies. We develop business portals, dashboards, SaaS platforms, APIs and workflow solutions.",
    "Custom Web Application Development in Salem,Web Application Development Company in Salem, Custom Web Development Company in Salem",
    {
      h1: "Custom Web Application Development",
      supportingCopy: "We build secure, scalable and business-focused web applications designed around your workflows, users and growth goals. From internal dashboards and customer portals to SaaS platforms and custom business systems, Bit Byte Technologies develops web applications for businesses in Salem and across Tamil Nadu.",
      faqs: [
        ["What is a custom web application?", "A custom web application is software accessed through a web browser and developed around specific business requirements. Bit Byte Technologies can develop custom web applications with features such as user accounts, databases, workflows, dashboards, permissions, automation and integrations when these capabilities are required."],
        ["How is a web application different from a website?", "A website primarily provides information about a business, while a web application provides interactive functionality and performs specific business processes. Bit Byte Technologies can develop web applications such as customer portals, employee systems, dashboards, booking platforms and workflow applications when a standard website is not sufficient."],
        ["How long does it take to build a custom web application?", "The development time for a custom web application depends on its functionality, number of users, database requirements, integrations, security requirements, testing and overall scope. Bit Byte Technologies can establish a realistic development timeline after completing requirements discovery and technical planning."],
        ["Can you build a web application around our existing business process?", "Yes. Bit Byte Technologies can design a custom web application around an organization's existing business processes. The workflow can be analyzed and converted into digital processes such as user roles, approvals, dashboards, automation, data management and reporting."],
        ["Can you integrate our existing software or APIs?", "Yes, Bit Byte Technologies can develop integrations with existing software and APIs when the required systems provide suitable integration capabilities. This can connect data and workflows between CRM, ERP, payment systems, business applications and other supported platforms."],
        ["Can you build customer and employee portals?", "Yes. Bit Byte Technologies can develop custom customer and employee portals with features such as secure login, role-based access, dashboards, documents, requests, workflows and notifications. The portal can be customized around the organization's users and business processes."],
        ["Can you build SaaS applications?", "Bit Byte Technologies can approach SaaS product development as a cloud-based software solution with features such as user accounts, permissions, dashboards, databases and integrations. The appropriate SaaS architecture and functionality should be determined during product discovery and technical planning."],
        ["Can you maintain an application after launch?", "Yes. Bit Byte Technologies can support ongoing application maintenance depending on the project requirements. Post-launch support can include bug fixes, security updates, performance optimization, monitoring, integrations, new features and technical improvements."],
        ["Do you provide custom web application development outside Salem?", "Yes. Bit Byte Technologies can work with businesses outside Salem on custom web application projects through remote collaboration, online meetings, digital project management and remote development workflows."],
      ],
    },
  ),
  "/services/web-development/e-commerce-solutions": page(
    "Ecommerce Website Development in Salem",
    "Bit Byte Technologies provides ecommerce development in Salem, building fast, secure and scalable online stores with payments, product catalogs, inventory and order management.",
    "Ecommerce Development Company in Salem,Ecommerce Website Development in Salem, Ecommerce Website Development Company in Salem",
    {
      h1: "Ecommerce Development",
      supportingCopy: "We build fast, secure and conversion-focused ecommerce websites for businesses in Salem and across Tamil Nadu. From product catalogs and secure checkout to payment integration, inventory management and order tracking, Bit Byte Technologies creates ecommerce solutions designed to help businesses sell online and grow.",
      faqs: [
        ["What is ecommerce development?", "Ecommerce development is the process of designing and building an online store where customers can browse products, add items to a cart, make payments and manage orders. Bit Byte Technologies can develop ecommerce solutions with features such as product catalogues, checkout, payment integration, order management, inventory functionality, customer accounts and ecommerce SEO."],
        ["How much does ecommerce website development cost in Salem?", "Ecommerce website development cost in Salem depends on the number of products, design requirements, ecommerce platform, payment gateways, inventory management, shipping, integrations and custom functionality. Bit Byte Technologies can provide a project-specific ecommerce quotation after understanding the store's business and technical requirements."],
        ["How long does it take to build an ecommerce website?", "Ecommerce website development time depends on the number of products, design complexity, payment integration, shipping requirements, inventory, third-party integrations and testing. Bit Byte Technologies can provide a more accurate timeline after the ecommerce requirements and project scope are defined."],
        ["Do you develop Shopify stores?", "If Shopify is part of the selected technology stack for the project, Bit Byte Technologies can develop and customize an ecommerce store according to the required functionality. Shopify-specific services, features and integrations should be confirmed with Bit Byte Technologies based on the current project scope."],
        ["Do you develop WooCommerce websites?", "If WooCommerce is selected as the ecommerce platform, Bit Byte Technologies can develop and customize the store according to the required design, product, payment, integration and functionality requirements. WooCommerce-specific implementation should be confirmed during project planning."],
        ["Can you integrate payment gateways?", "Yes. Bit Byte Technologies can integrate suitable payment gateways into an ecommerce website when the selected gateway supports the required technical integration. The appropriate gateway depends on the business location, payment requirements, currencies and transaction requirements."],
        ["Can you integrate inventory and order management?", "Yes. Bit Byte Technologies can develop ecommerce functionality that connects product inventory, stock information, orders and fulfilment workflows. Where technically supported, inventory and order management can also be connected with existing business software."],
        ["Can you build a B2B ecommerce website?", "Yes. Bit Byte Technologies can develop B2B ecommerce solutions around requirements such as business customer accounts, bulk orders, quotation requests, account-based pricing, approval workflows and business purchasing processes."],
        ["Can you migrate our existing ecommerce website?", "Bit Byte Technologies can support ecommerce migration projects involving the transfer of products, categories, content and other relevant website data to a new ecommerce environment. Ecommerce migration should also include URL, redirect, data validation and SEO planning to protect existing organic visibility."],
        ["Can you optimize an ecommerce website for SEO?", "Yes. Bit Byte Technologies can incorporate ecommerce SEO considerations such as product and category page optimization, internal linking, metadata, structured data, technical SEO, image optimization, page performance and search-focused content."],
        ["Do you provide ecommerce maintenance after launch?", "Bit Byte Technologies can provide ecommerce maintenance and support according to the requirements of the online store. Support can include technical fixes, security updates, product and content changes, performance optimization, payment-related troubleshooting, backups and feature improvements."],
      ],
    },
  ),
  "/services/web-development/web-portals-dashboards": page(
    "Web Portal Development Company in Salem",
    "Bit Byte Technologies provides web portal development in Salem, building secure customer, employee, vendor and business portals with custom dashboards, role-based access and integrations.",
    "Web Portal Development Company in Salem,Web Portal Development Services in Salem, Dashboard Development Company in Salem",
    {
      h1: "Web Portal Development",
      supportingCopy: "Bit Byte Technologies develops custom web portals and business dashboards for organizations in Salem and across Tamil Nadu. From customer and employee portals to vendor management systems, admin panels and real-time dashboards, we build secure digital platforms around your business workflows.",
      faqs: [
        ["What is web portal development?", "Web portal development involves creating a secure online platform where specific users can access information, services, workflows or business functions. Bit Byte Technologies can develop custom web portals for customers, employees, vendors, partners and internal business users based on their access, workflow and data requirements."],
        ["What types of web portals do you develop?", "Bit Byte Technologies can develop custom customer portals, employee portals, vendor portals, partner portals, member portals, service portals and internal business portals. Portal functionality can be customized around user roles, permissions, workflows, dashboards and business data."],
        ["Can you develop a custom customer portal in Salem?", "Yes. Bit Byte Technologies can develop custom customer portals in Salem with functionality such as secure login, customer-specific information, requests, documents, order information, support functions and dashboards. The portal can be designed around the company's customer-service workflow."],
        ["Can a web portal include an admin dashboard?", "Yes. Bit Byte Technologies can include an admin dashboard within a web portal to help authorized users manage customers, users, content, records, reports, workflows and other administrative functions. Dashboard functionality can be customized according to the organization's requirements."],
        ["Can you integrate our existing CRM or ERP with a web portal?", "Yes. Bit Byte Technologies can integrate a custom web portal with an existing CRM or ERP when suitable APIs or integration mechanisms are available. Integration can help connect customer, operational and business information while reducing duplicate data entry."],
        ["Can you create role-based dashboards for different users?", "Yes. Bit Byte Technologies can create role-based dashboards that display different information and functionality according to each user's permissions and responsibilities. Management, sales teams, employees, customers and administrators can have different dashboard views when required."],
        ["How long does it take to develop a web portal?", "Web portal development time depends on the number of user types, workflows, dashboards, integrations, security requirements and overall functionality. Bit Byte Technologies can define the development timeline after understanding the portal's requirements and technical architecture."],
      ],
    },
  ),
  "/services/personal-branding": page("Personal Branding Services in Salem", "Bit Byte Technologies provides personal branding services in Salem to help entrepreneurs, professionals and business leaders build authority, improve online visibility and grow their personal brand.", "Personal Branding Services in Salem,Personal Branding Agency in Salem, Personal Branding Company in Salem", {
    supportingCopy: "We help entrepreneurs, founders, professionals and business leaders build a strong personal brand through strategic positioning, content, social media and digital visibility.",
    faqs: [
      ["What is personal branding?", "Personal branding is the process of intentionally building and communicating a professional identity around a person's expertise, experience, values and unique positioning. Bit Byte Technologies can help entrepreneurs, founders and professionals develop their digital presence through positioning, content, professional profiles and online visibility."],
      ["Why is personal branding important for entrepreneurs?", "Personal branding can help entrepreneurs communicate their expertise, build recognition and establish credibility with customers, partners, employees and professional networks. Bit Byte Technologies approaches personal branding as a combination of positioning, content and digital visibility rather than simply social media posting."],
      ["Do you provide personal branding services in Salem?", "Yes. Bit Byte Technologies provides personal branding solutions for entrepreneurs, founders and professionals who want to strengthen their digital visibility in Salem and beyond. Services can include positioning, professional-profile optimization, content strategy, social media branding and authority-building activities, depending on the project scope."],
      ["Can you help optimize my LinkedIn profile?", "Yes. Bit Byte Technologies can help optimize a LinkedIn profile by improving the presentation of professional experience, expertise, achievements, positioning and value proposition. Profile optimization can include the headline, About section, experience, skills and overall profile structure."],
      ["Do you create personal branding content?", "Yes. Bit Byte Technologies can develop personal branding content around an individual's expertise, audience and positioning. Content can include LinkedIn posts, thought-leadership content, educational content, professional insights and other relevant formats."],
      ["Can personal branding help establish industry authority?", "Yes. Consistent expertise-led content and professional visibility can help an individual establish industry authority over time. Bit Byte Technologies can support this process through strategic positioning, content and digital visibility designed around the individual's expertise and target audience."],
      ["How long does it take to build a personal brand?", "Personal branding is a long-term process rather than a one-time campaign. Bit Byte Technologies can establish the positioning, content strategy and digital foundation, while meaningful authority and recognition generally require consistent publishing and visibility over time. Results vary according to the person's industry, starting position and consistency."],
    ],
  }),
  "/services/digital-marketing/ai-powered-digital-marketing-solutions": page("AI Digital Marketing in Salem", "Bit Byte Technologies provides AI-powered digital marketing services in Salem, combining AI, automation, SEO, AEO, GEO, content, advertising and analytics to generate measurable business growth.", "Digital Marketing Agency in Salem,Digital Marketing Services in Salem, Digital Marketing Services in Salem", {
    supportingCopy: "Bit Byte Technologies combines AI, automation, data and digital marketing expertise to create smarter growth strategies for businesses in Salem and across Tamil Nadu. From AI-powered SEO and content to campaign optimization, lead generation and marketing analytics, we use technology to make digital marketing more efficient and measurable.",
    faqs: [
      ["What is AI-powered digital marketing?", "AI-powered digital marketing uses artificial intelligence to support marketing research, content workflows, audience analysis, campaign optimization, automation and performance analysis. Bit Byte Technologies combines AI and digital marketing approaches to help businesses improve marketing efficiency while keeping human strategy, creativity and business judgment at the center."],
      ["How does AI improve digital marketing?", "AI can help Bit Byte Technologies and marketing teams analyze large amounts of information, identify patterns, support content workflows, research audiences, automate repetitive tasks and improve campaign analysis. Human review remains important for strategy, accuracy, brand consistency and marketing decisions."],
      ["Do you provide AI digital marketing services in Salem?", "Yes. Bit Byte Technologies provides AI-powered digital marketing solutions for businesses looking to combine artificial intelligence, automation, data and digital marketing. The approach can support areas such as SEO, content, campaign optimization, lead generation and marketing analytics, depending on the project requirements."],
      ["Can AI help with SEO and content marketing?", "Yes. Bit Byte Technologies can use AI-supported workflows for SEO research, topic discovery, content planning, keyword analysis and content optimization. AI should support rather than replace human expertise, because factual accuracy, originality, search intent, brand expertise and content quality still require human oversight."],
      ["Can AI improve Google Ads performance?", "AI can support Google Ads campaign analysis, audience insights, performance reporting, testing and optimization. Bit Byte Technologies can combine AI-supported analysis with human marketing strategy because Google Ads performance also depends on targeting, offers, landing pages, conversion tracking, budget and campaign structure."],
      ["Can AI automate marketing tasks?", "Yes. Bit Byte Technologies can use AI and automation to support repetitive marketing activities such as reporting, data processing, content workflows, lead classification, campaign analysis and other suitable processes. Automation should be implemented with appropriate human review and business rules."],
      ["Is AI-powered marketing suitable for small businesses?", "Yes. AI-powered marketing can be useful for small businesses because it can help reduce repetitive work, analyze marketing information and improve workflow efficiency. Bit Byte Technologies can help businesses identify practical AI marketing opportunities based on their goals, resources and existing digital marketing activities."],
    ],
  }),
  "/services/business-analytics/data-driven-business-analytics-solutions": page("Business Analytics Company in Salem", "Bit Byte Technologies provides business analytics services in Salem, helping businesses turn data into actionable insights through dashboards, KPIs, reporting, visualization and predictive analytics.", "Business Analytics Company in Salem,Business Analytics Services in Salem, Business Intelligence Services in Salem", {
    supportingCopy: "Bit Byte Technologies helps businesses in Salem transform data from sales, customers, finance and operations into actionable business insights. We build analytics solutions, dashboards and reporting systems that help leadership teams understand performance and make faster, data-driven decisions.",
    faqs: [
      ["What is business analytics?", "Business analytics is the process of using business data to understand performance, identify trends, measure KPIs and support better decisions. Bit Byte Technologies can help businesses transform information from sales, customers, finance and operations into dashboards, reports and actionable business insights."],
      ["What is the difference between business analytics and data analytics?", "Data analytics is the broader process of examining and interpreting data, while business analytics focuses on applying data insights to business decisions and performance. Bit Byte Technologies can use business analytics to connect data with areas such as sales, revenue, customers, operations, KPIs and strategic decision-making."],
      ["Do you provide business analytics services in Salem?", "Yes. Bit Byte Technologies provides business analytics solutions for organizations that need to convert business data into useful insights. Depending on the requirements, solutions can include business dashboards, KPI reporting, data visualization, sales analytics and other analytical reporting capabilities."],
      ["Can you build custom business dashboards?", "Yes. Bit Byte Technologies can build custom business dashboards that bring important KPIs and business information into a centralized reporting interface. Dashboards can be designed for management, sales, finance, operations or other teams according to their specific reporting requirements."],
      ["Can you integrate data from our existing systems?", "Yes. Bit Byte Technologies can integrate data from existing systems when suitable APIs, databases or other data-access mechanisms are available. Connecting multiple data sources can reduce manual reporting and help businesses create a more centralized view of performance."],
      ["Can business analytics help improve sales performance?", "Yes. Bit Byte Technologies can use sales analytics to help businesses monitor revenue, products, customers, sales teams, branches and other performance indicators. Better sales visibility can help management identify trends, opportunities and areas that require attention."],
      ["Do you provide predictive analytics?", "Predictive analytics uses historical and current data to identify patterns and estimate possible future outcomes. Bit Byte Technologies can explore predictive analytics use cases where they align with the client's data, technology and business requirements. Specific predictive analytics capabilities should be confirmed during project discovery."],
      ["Which tools do you use for business analytics?", "Bit Byte Technologies should select business analytics tools according to the client's existing systems, data sources, reporting requirements and technical environment. The appropriate technology may include data processing, database and visualization tools. The specific tools used should be confirmed based on the individual analytics project."],
    ],
  }),
  "/services/imagination-to-reality": page("Software Product Development in Salem", "Bit Byte Technologies helps businesses and founders turn ideas into software products in Salem, from product strategy and MVP development to custom software, testing, launch and ongoing improvement.", "Software Product Development Company in Salem,Software Product Development Services in Salem, Custom Software Development Company in Salem", {
    supportingCopy: "Bit Byte Technologies helps businesses and entrepreneurs in Salem turn software ideas into practical digital products. From MVPs and custom business applications to SaaS platforms and customer-facing systems, we combine product thinking, design and software development to move ideas from concept to launch.",
    faqs: [
      ["What is software product development?", "Software product development is the process of turning a software idea into a usable and scalable product. Bit Byte Technologies can support the product journey through activities such as product discovery, requirements planning, UX/UI design, MVP development, software engineering, testing, deployment and ongoing improvement, depending on the project scope."],
      ["Can you turn my software idea into a product?", "Yes. Bit Byte Technologies can help transform a software idea into a structured product by understanding the target users, business problem, product requirements and desired outcomes. The development process can then move through product planning, UX/UI, MVP development, testing, launch and future improvements."],
      ["Do you provide MVP development in Salem?", "Yes. Bit Byte Technologies can support MVP development for businesses and founders in Salem who want to validate a software idea with a focused initial product. An MVP concentrates on the core functionality needed to test the product concept before investing in a larger platform."],
      ["What is the difference between custom software and product development?", "Custom software is generally developed for the specific requirements of one organization, while product development creates software intended for a broader group of users or customers. Bit Byte Technologies can approach each project differently based on whether the objective is an internal business system or a scalable software product."],
      ["Can you develop SaaS products?", "Yes, Bit Byte Technologies can approach SaaS product development as a cloud-based software product with functionality such as user accounts, permissions, dashboards, databases and integrations. The specific SaaS architecture, features and scalability requirements should be established during product discovery."],
      ["How long does it take to build a software product?", "Software product development time depends on the product's complexity, MVP scope, number of features, UX requirements, integrations, testing and infrastructure. Bit Byte Technologies can establish a realistic development roadmap after understanding the product concept, target users and technical requirements."],
      ["Can you improve an existing software product?", "Yes. Bit Byte Technologies can help improve existing software through new features, UX improvements, performance optimization, security updates, integrations, bug fixes and technical enhancements. The first step is to understand the existing product, technology and user requirements."],
      ["Do you provide support after product launch?", "Yes. Bit Byte Technologies can provide post-launch software support according to project requirements. Support can include maintenance, bug fixing, monitoring, performance improvements, feature development, security updates and technical assistance as the product evolves."],
    ],
  }),
  "/services/real-time-sales-data": page("Sales Analytics Company in Salem", "Bit Byte Technologies provides sales analytics solutions in Salem with real-time dashboards, sales KPIs, revenue reporting, product insights and data-driven sales performance analysis.", "Sales Analytics Company in Salem,Real-Time Sales Analytics in Salem, Sales Dashboard Development in Salem", {
    supportingCopy: "Bit Byte Technologies helps businesses in Salem monitor sales performance with real-time data, interactive dashboards and actionable analytics. Track revenue, products, customers, teams and sales trends from a centralized view.",
    faqs: [
      ["What is real-time sales analytics?", "Real-time sales analytics is the process of monitoring sales and revenue information as it becomes available so businesses can understand current performance. Bit Byte Technologies can develop sales analytics solutions that bring relevant sales KPIs, product information, branch performance and other sales data into centralized dashboards."],
      ["How does a real-time sales dashboard work?", "A real-time sales dashboard collects sales information from connected data sources and presents important metrics through visual reports and KPIs. Bit Byte Technologies can design dashboards around the sales information a business needs to monitor, such as revenue, orders, products, employees, branches, targets and trends."],
      ["Can you build a custom sales dashboard in Salem?", "Yes. Bit Byte Technologies can develop custom sales dashboards for businesses in Salem that need centralized visibility into sales performance. The dashboard can be designed around relevant KPIs such as revenue, products, employees, branches, customers and sales trends."],
      ["Can sales data from multiple systems be combined?", "Yes. Bit Byte Technologies can combine sales data from multiple systems when the relevant platforms provide suitable APIs, databases or data-access mechanisms. Centralizing data can provide a more complete view of sales performance and reduce manual data consolidation."],
      ["Can I track sales by product, employee or branch?", "Yes. Bit Byte Technologies can design sales analytics dashboards to report sales by product, employee, branch, customer, category or other dimensions when those fields are available in the underlying data. This can help management compare performance and identify trends."],
      ["Can you integrate our CRM or ERP with a sales dashboard?", "Yes. Bit Byte Technologies can integrate CRM or ERP data with a sales dashboard when the relevant systems provide suitable APIs or data-access mechanisms. Integration can help centralize customer, sales and business information for more efficient reporting and decision-making."],
      ["Can real-time sales analytics help with forecasting?", "Yes. Bit Byte Technologies can use current and historical sales information to support analytics and forecasting use cases where the available data is suitable. Forecasting can help identify trends and potential future performance, although accuracy depends on data quality, historical information and business conditions."],
      ["Do you provide sales analytics solutions for small businesses?", "Yes. Bit Byte Technologies can develop sales analytics solutions for small businesses that need better visibility into revenue, products, customers, employees or branches. The solution can be scaled according to the company's actual data, reporting requirements and operational complexity."],
    ],
  }),
  "/careers": page("Bit Byte Technologies | Jobs & Careers in Salem", "Explore career opportunities at Bit Byte Technologies in Salem. Find software development, web development, digital marketing, analytics and internship opportunities with our growing technology team.", "Jobs in Salem at Bit Byte Technologies,IT Jobs in Salem, Software Developer Jobs in Salem", { noindex: true }),
  "/careers/apply": page("Bit Byte Technologies | Apply for IT Jobs in Salem", "Apply for technology and IT opportunities at Bit Byte Technologies in Salem. Submit your resume and details for current job openings and future career opportunities.", "Apply for IT Jobs in Salem,Apply for Jobs at Bit Byte Technologies, IT Job in Salem"),
  "/privacy-policy": page("Bit Byte Technologies | Privacy Policy", "Read the Bit Byte Technologies Privacy Policy to understand how we collect, use, protect and manage personal information when you use our website and services.", "Bit Byte Technologies Privacy Policy,Privacy Policy Bit Byte Technologies, Bit Byte Technologies Data Privacy"),
  "/terms-and-conditions": page("Bit Byte Technologies | Terms and Conditions", "Read the Bit Byte Technologies Terms and Conditions governing use of our website, services, content, intellectual property and related online resources.", "Bit Byte Technologies Terms and Conditions,Terms and Conditions Bit Byte Technologies, Bit Byte Technologies Terms of Use"),
};

const upsertMeta = (name, content) => {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertCanonical = (url) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
};

const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bit Byte Technologies",
  url: `${SITE_URL}/`,
  telephone: "+91 99437 43136",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2nd Floor, Raja Complex West Wing, Opp: Sago Serve, Omalur Main Road",
    addressLocality: "Salem",
    addressRegion: "Tamil Nadu",
    postalCode: "636302",
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: "Salem" },
};

export const getSeoSchemas = (pathname, config = SEO_BY_PATH[pathname]) => {
  if (!config) return [];
  const schemas = [];
  if (pathname === "/") schemas.push(localBusinessSchema);
  if (config.faqs?.length) schemas.push(faqSchema(config.faqs));
  return schemas;
};

export default function Seo({ pathname }) {
  useEffect(() => {
    const normalizedPath = pathname.replace(/\/$/, "") || "/";
    const config = SEO_BY_PATH[normalizedPath];
    if (!config) return undefined;

    document.title = config.title;
    upsertMeta("description", config.description);
    upsertMeta("keywords", config.keywords);
    upsertMeta("robots", config.noindex ? "noindex, nofollow" : "index, follow");
    upsertCanonical(`${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`);

    document.querySelectorAll('script[data-seo-schema="true"]').forEach((node) => node.remove());
    getSeoSchemas(normalizedPath, config).forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "true";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-seo-schema="true"]').forEach((node) => node.remove());
    };
  }, [pathname]);

  return null;
}
