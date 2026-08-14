import { useEffect } from "react";

const policySections = [
  {
    key: "PT",
    title: "Project Terms & Conditions",
    start: 1,
    items: [
      "Third-party subscription charges are excluded from development cost.",
      "Any additional features outside the agreed scope will be charged separately.",
      "Source code, Documentation, Configuration Workbook, and Test case documents will be delivered after final payment clearance.",
      "30 days free support is included post-deployment.",
      "Extended PRD along with configuration workbook will be developed once the Initial Quotation is accepted for further rounds of talks.",
      "All credentials (AWS Cloud Server, MS Mail Server, Admin Level Credentials) will be handed over to the client on final payment clearance.",
    ],
  },
  {
    key: "PP",
    title: "Payment & Pricing Terms",
    start: 1,
    items: [
      "Payment Terms: 50% Advance, 25% at Development Milestones, and 25% on Final Delivery.",
      "Estimated Delivery Timeline: 4–5 Weeks.",
      "Negotiation Terms: Open for negotiation on mutual terms.",
      "Monthly charges are due on or before the 5th date of every month as a single payment.",
      "Payment is due within the period specified on the invoice. Delayed payments may attract applicable charges.",
      "All prices are exclusive of applicable taxes unless otherwise stated.",
      "Services and deliverables provided are limited to the scope agreed upon in the proposal, quotation, or contract.",
      "Any additional work, revisions, or change requests beyond the agreed scope may be billed separately.",
      "Ownership of deliverables and intellectual property shall transfer only upon receipt of full payment, unless otherwise agreed in writing.",
      "Advance payments, milestone payments, and completed services are non-refundable unless specified otherwise.",
      "The client shall verify invoice details and report any discrepancies within 7 days of the invoice date.",
      "The company shall not be liable for delays or interruptions caused by third-party service providers, hosting providers, internet outages, or force majeure events.",
      "All disputes arising from this invoice shall be subject to the jurisdiction of the courts located at Salem, Tamil Nadu, India.",
      "Payment of an invoice constitutes acceptance of the services, pricing, and terms stated therein.",
    ],
  },
  {
    key: "A",
    title: "Client Confidentiality & Information Protection",
    start: 1,
    items: [
      "We respect and protect the confidentiality of all client information entrusted to us during the course of engagement.",
      "Client business information, operational processes, strategic plans, financial data, customer databases, and proprietary information shall remain confidential unless expressly authorized for disclosure.",
      "We do not disclose source code, administrative credentials, access keys, passwords, encryption keys, API secrets, or security configurations under any circumstances.",
      "Any project showcased on our website is presented solely for demonstrating our technical capabilities and service expertise.",
      "Client-sensitive information may be concealed, masked, anonymized, or omitted from public-facing materials.",
      "Internal project discussions, communications, planning documents, and meeting records remain confidential.",
      "We implement reasonable administrative, technical, and organizational measures to safeguard client information.",
      "Employees, contractors, consultants, and vendors engaged by us are required to adhere to confidentiality obligations.",
      "Confidentiality obligations continue even after project completion or termination of services.",
      "We reserve the right to remove any showcased project upon a client's reasonable request and subject to contractual obligations.",
    ],
  },
  {
    key: "B",
    title: "Intellectual Property Rights",
    start: 11,
    items: [
      "All client-owned trademarks, logos, branding materials, and copyrighted content remain the exclusive property of their respective owners.",
      "Project ownership shall be governed by the executed agreement between the Company and the Client.",
      "Unless otherwise agreed in writing, proprietary tools, reusable frameworks, templates, utilities, libraries, and internal development assets developed by the Company shall remain the property of the Company.",
      "Displaying a project in our portfolio does not transfer any ownership rights to third parties.",
      "No visitor may copy, reproduce, distribute, modify, or commercially exploit showcased materials without prior written permission.",
      "Copyright ownership of project deliverables shall be determined by contractual agreements executed with the client.",
      "Any third-party intellectual property used within projects remains subject to the rights of its respective owners.",
      "Reverse engineering, cloning, scraping, replication, or unauthorized reproduction of showcased solutions is prohibited.",
      "Proprietary algorithms, workflows, automation logic, and development methodologies remain confidential.",
      "We reserve all rights not expressly granted under applicable agreements.",
    ],
  },
  {
    key: "C",
    title: "Project Planning & Consulting Disclaimer",
    start: 21,
    items: [
      "Discovery sessions, consultations, requirement-gathering documents, and project planning outputs may contain confidential and proprietary information.",
      "Strategic recommendations provided during consulting engagements are intended solely for the client's internal business use.",
      "Market research, competitor analysis, feasibility studies, and technical recommendations are based on information available at the time of assessment.",
      "Project estimates are prepared based on available requirements and may be revised if scope changes occur.",
      "Proposed timelines are indicative and subject to client approvals, dependencies, third-party services, and unforeseen technical challenges.",
      "We do not guarantee business success solely based on implementation of our recommendations.",
      "Clients remain responsible for validating business, legal, regulatory, and operational requirements relevant to their industry.",
      "Technology recommendations are made according to project objectives and current industry standards.",
      "Project plans may evolve during execution due to changing business requirements.",
      "Final deliverables are subject to mutually agreed scope definitions and acceptance criteria.",
    ],
  },
  {
    key: "D",
    title: "Design & User Experience",
    start: 31,
    items: [
      "UI/UX designs presented in our portfolio are intended for demonstration purposes only.",
      "Design concepts, wireframes, prototypes, mockups, and visual assets may be modified before final production deployment.",
      "Certain design elements showcased may be customized versions created specifically for individual clients.",
      "User experience outcomes may vary depending on user behavior, target audience, and market conditions.",
      "Accessibility implementation is performed according to project scope and agreed requirements.",
      "Design trends, layouts, and visual styles evolve over time and may differ from currently deployed client versions.",
      "We reserve the right to showcase selected design work unless restricted by contractual agreements.",
      "Branding assets remain the property of their respective owners.",
      "Demonstration screenshots may not reflect current production environments.",
      "Design performance and conversion outcomes cannot be guaranteed solely through visual enhancements.",
    ],
  },
  {
    key: "E",
    title: "Software Development & Technical Implementation",
    start: 41,
    items: [
      "We follow industry-standard software development practices, methodologies, and quality assurance procedures.",
      "Project implementation may involve third-party frameworks, APIs, libraries, plugins, cloud services, and integrations.",
      "Software performance may vary based on infrastructure, usage patterns, and external dependencies.",
      "We do not guarantee uninterrupted operation of third-party services integrated into client solutions.",
      "Source code delivery, repository access, and development artifacts are governed by contractual agreements.",
      "Clients are responsible for providing accurate requirements, content, and approvals in a timely manner.",
      "Any modifications made by third parties after project delivery may impact performance, security, or stability.",
      "We reserve the right to utilize generalized technical knowledge gained through project experience in future engagements.",
      "Technology stacks may be upgraded or replaced as industry standards evolve.",
      "Software compatibility with future platforms, browsers, operating systems, or third-party services cannot be guaranteed indefinitely.",
    ],
  },
  {
    key: "F",
    title: "System Architecture & Infrastructure",
    start: 51,
    items: [
      "Detailed system architecture diagrams and infrastructure designs are considered confidential unless expressly authorized for publication.",
      "Security architecture, network topology, server configurations, and infrastructure details are not publicly disclosed.",
      "Architectural decisions are based on project requirements, scalability goals, budget considerations, and operational needs.",
      "Performance benchmarks are indicative and may vary under real-world conditions.",
      "Infrastructure recommendations may change due to advancements in technology or business requirements.",
      "We do not disclose disaster recovery, backup, monitoring, or security procedures implemented for clients.",
      "Clients remain responsible for infrastructure costs unless otherwise agreed.",
      "Cloud service availability remains subject to the terms and performance of respective providers.",
      "Infrastructure scaling may require additional resources and costs over time.",
      "Architectural implementations are customized according to project-specific needs.",
    ],
  },
  {
    key: "G",
    title: "Hosting, Domain & Cloud Services",
    start: 61,
    items: [
      "Hosting services may be provided directly or through authorized third-party providers.",
      "Domain registration remains subject to the policies of relevant domain registrars.",
      "Hosting uptime depends on infrastructure providers, network availability, maintenance activities, and external factors.",
      "We are not liable for outages caused by third-party hosting providers, internet service providers, or force majeure events.",
      "Clients are responsible for timely renewal of domains, hosting plans, SSL certificates, and related subscriptions unless covered under a maintenance agreement.",
      "Server migrations, upgrades, and maintenance activities may require temporary service interruptions.",
      "Hosting resources are allocated according to agreed service plans.",
      "Additional hosting costs may apply if resource consumption exceeds allocated limits.",
      "Cloud services remain subject to the policies and terms of respective providers.",
      "Backup retention policies are governed by applicable service agreements.",
    ],
  },
  {
    key: "H",
    title: "Digital Marketing Services",
    start: 71,
    items: [
      "Digital marketing outcomes depend on numerous external factors beyond our control.",
      "Search engine rankings cannot be guaranteed due to changing algorithms and competitive market conditions.",
      "Social media performance depends on audience behavior, platform policies, and content relevance.",
      "Advertising platform policies may affect campaign delivery and performance.",
      "Lead generation results may vary by industry, geography, competition, and market demand.",
      "Historical campaign performance does not guarantee future results.",
      "Marketing metrics are presented in good faith based on available analytics data.",
      "Third-party advertising costs are separate unless specifically included in service agreements.",
      "We are not responsible for policy violations committed by clients on advertising platforms.",
      "Clients remain responsible for compliance with applicable advertising laws and regulations.",
    ],
  },
  {
    key: "I",
    title: "Payment, Commercial & Legal Matters",
    start: 81,
    items: [
      "Project fees, payment schedules, and commercial terms are governed by executed agreements.",
      "Delayed payments may result in suspension of services, support, hosting, or project activities.",
      "All payments made are subject to applicable tax regulations.",
      "Refund eligibility shall be governed strictly by contractual terms.",
      "Additional work beyond agreed scope may attract additional charges.",
      "Change requests impacting timelines, resources, or deliverables may require revised commercial agreements.",
      "Third-party costs are generally non-refundable unless otherwise specified.",
      "Clients remain responsible for obtaining necessary licenses, permissions, and regulatory approvals.",
      "Legal ownership transfer, if applicable, shall occur according to contractual obligations and payment completion.",
      "Any disputes shall be governed by the jurisdiction specified in the applicable agreement.",
    ],
  },
  {
    key: "J",
    title: "Maintenance, Support & General Provisions",
    start: 91,
    items: [
      "Support services are provided according to the selected maintenance plan or support agreement.",
      "Response and resolution times may vary depending on issue complexity and support level.",
      "We reserve the right to update technologies, tools, and processes as required.",
      "Emergency support may incur additional charges unless covered under a support agreement.",
      "Security threats originating from third-party systems are beyond our direct control.",
      "Clients are encouraged to maintain strong security practices and access controls.",
      "Portfolio content may be updated periodically to reflect current capabilities and completed projects.",
      "These policies may be revised from time to time without prior notice.",
      "Continued use of our website constitutes acceptance of these policies and related terms.",
      "Bit Byte Technologies remains committed to professionalism, transparency, innovation, client confidentiality, ethical business conduct, and delivery excellence across all services and engagements.",
    ],
  },
];

const declaration =
  "Bit Byte Technologies is committed to protecting client interests, intellectual property, business confidentiality, data privacy, and technology assets while maintaining transparency, ethical practices, and industry-standard delivery processes across web application development, software engineering, cloud services, digital marketing, consulting, maintenance, and support engagements.";

export default function LegalPage({ type = "privacy" }) {
  const title = type === "privacy" ? "Privacy Policy" : "Terms & Conditions";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [type]);

  return (
    <main className="wrap min-h-screen pt-[calc(var(--nav-h)+56px)]">
      <section className="mx-auto w-full max-w-5xl pb-20">
        <div className="mb-8">
          <p className="mb-3 font-[var(--f-label)] text-xs font-bold uppercase tracking-[0.18em] text-[#00a4ec]">
            Bit Byte Technologies
          </p>
          <h1 className="font-[var(--f-display)] text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/55">
            Project Showcase, Client Confidentiality, Intellectual Property &
            Service Disclaimer Policy
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">
            The following policy statements may be displayed on the Company
            Website, Portfolio, Proposals, Marketing Materials, and Case Studies
            sections.
          </p>
        </div>

        <div className="grid gap-5">
          {policySections.map((section) => (
            <article
              className="rounded-lg border border-cyan-300/12 bg-white/[0.035] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-6"
              key={section.key}
            >
              <div className="mb-5 flex items-start gap-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 font-[var(--f-label)] text-sm font-extrabold text-[#a4ec70]">
                  {section.key}
                </span>
                <h2 className="font-[var(--f-display)] text-xl font-bold leading-tight text-white md:text-2xl">
                  {section.title}
                </h2>
              </div>
              <ol className="grid gap-3">
                {section.items.map((item, index) => (
                  <li
                    className="grid grid-cols-[32px_1fr] gap-3 text-sm leading-7 text-white/58"
                    key={item}
                  >
                    <span className="font-[var(--f-label)] text-xs font-bold text-[#00a4ec]">
                      {section.start + index}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <article className="mt-6 rounded-lg border border-[#a4ec70]/18 bg-[#a4ec70]/[0.055] p-5 md:p-6">
          <h2 className="font-[var(--f-display)] text-2xl font-bold text-white">
            Corporate Declaration
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/62">{declaration}</p>
          <p className="mt-5 font-[var(--f-label)] text-xs font-bold uppercase tracking-[0.14em] text-[#a4ec70]">
            Bit Byte Technologies
          </p>
        </article>
      </section>
    </main>
  );
}
