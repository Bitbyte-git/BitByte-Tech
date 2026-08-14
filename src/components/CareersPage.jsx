import { useEffect, useState } from "react";

const careerValues = [
  [
    "fa-solid fa-rocket",
    "Innovate",
    "Work on exciting projects and solve real-world problems.",
  ],
  [
    "fa-solid fa-people-group",
    "Collaborate",
    "Great teamwork builds extraordinary results.",
  ],
  [
    "fa-solid fa-graduation-cap",
    "Learn",
    "Continuous learning and growth are at our core.",
  ],
  [
    "fa-solid fa-globe",
    "Impact",
    "Your work creates meaningful impact for businesses.",
  ],
];

const heroOrbitItems = [
  ["fa-solid fa-people-group", "Great People", "orb-people"],
  ["fa-solid fa-chart-column", "Growth Opportunities", "orb-growth"],
  ["fa-solid fa-heart", "Supportive Culture", "orb-culture"],
  ["fa-solid fa-star", "Make an Impact", "orb-impact"],
];

const openPositions = [
  {
    icon: "fa-solid fa-mobile-screen-button",
    title:
      "Mobile Application Development Intern / Associate - Flutter, Dart & Cross-Platform App Developer",
    type: "Full-Time / Internship / Graduate Trainee",
    mode: "On-site",
    description:
      "Design, develop, test, and maintain cross-platform mobile apps using Flutter and Dart for Android and iOS.",
    experience: "0-2 Years",
    salary:
      "Stipend for interns as per company policy. Associate salary is competitive and based on skills and experience.",
    suitableFor: [
      "Fresh Graduates",
      "Final Year Students",
      "Internship Candidates",
      "Entry-Level Mobile Application Developers",
    ],
    eligibility: [
      "Bachelor's degree, or pursuing final year, in Computer Science, Information Technology, or a related field.",
      "Freshers, interns, or candidates with 0-2 years of experience are welcome.",
      "Strong problem-solving and logical thinking skills.",
      "Passion for learning modern mobile technologies and software development.",
      "Ability to work independently and collaboratively in a team environment.",
      "Good communication and time management skills.",
    ],
    responsibilities: [
      "Develop responsive, scalable, and user-friendly cross-platform mobile applications.",
      "Build reusable Flutter widgets and maintain consistent UI components.",
      "Integrate REST APIs, local storage, Firebase services, and third-party SDKs.",
      "Write clean, null-safe, maintainable, and well-documented Dart code.",
      "Implement authentication, notifications, device permissions, camera, and location features.",
      "Debug, test, optimize, and improve application performance across devices.",
      "Collaborate with UI/UX designers, backend developers, and QA teams.",
      "Participate in code reviews and Agile development processes.",
      "Prepare Android and iOS builds and stay updated with mobile development best practices.",
    ],
    preferredExperience: [
      "Academic or personal mobile application projects.",
      "Internship experience in Flutter, Android, iOS, or cross-platform development.",
      "GitHub portfolio, demo builds, or published mobile applications.",
      "Participation in hackathons or mobile coding competitions is preferred but not mandatory.",
    ],
    skills: [
      "Dart",
      "Flutter",
      "Provider / BLoC / Riverpod / GetX",
      "Responsive & Adaptive UI",
      "Material Design & Cupertino Widgets",
      "Animations",
      "REST APIs",
      "JWT / OAuth",
      "HTTP / Dio Networking",
      "Firebase Services",
      "Shared Preferences",
      "SQLite / sqflite",
      "Git & GitHub",
      "Flutter DevTools",
      "Postman",
      "Android APK / AAB",
      "Firebase App Distribution",
      "Clean Architecture / MVC / MVVM",
      "OOP",
      "Agile / Scrum",
    ],
  },
  {
    icon: "fa-brands fa-java",
    title: "Java Full Stack Intern",
    type: "Internship",
    mode: "On-site",
    description:
      "Support the team in building Java-based applications while learning enterprise development workflows.",
    experience: "0 Years",
    salary: "Stipend as per company policy.",
    suitableFor: ["Fresh Graduates", "Final Year Students", "Internship Candidates"],
    eligibility: [
      "Bachelor's degree, or pursuing final year, in Computer Science, Information Technology, or a related field.",
      "Freshers, interns, or candidates with 0 years of experience are welcome.",
      "Strong problem-solving and logical thinking skills.",
      "Passion for learning Java and enterprise application development.",
      "Ability to work independently and collaboratively in a team environment.",
      "Good communication and time management skills.",
    ],
    responsibilities: [
      "Support the development team in building and maintaining Java-based applications under senior guidance.",
      "Contribute to writing clean, efficient, and testable code following established coding standards.",
      "Assist in database queries and basic schema operations.",
      "Participate in code reviews, sprint discussions, and debugging sessions.",
      "Gain exposure to Spring Boot, Hibernate, and RESTful API development.",
      "Collaborate with the frontend team on HTML5, CSS3, JavaScript, and React integration workflows.",
      "Assist in unit testing, bug fixing, and technical documentation.",
      "Work with cross-functional teams to understand requirements and delivery timelines.",
    ],
    preferredExperience: [
      "Academic or personal Java projects.",
      "GitHub portfolio or basic deployed applications.",
      "Participation in hackathons or coding competitions is preferred but not mandatory.",
    ],
    skills: [
      "Core Java",
      "OOP Concepts",
      "Collections Framework",
      "Exception Handling",
      "MySQL",
      "PostgreSQL",
      "JDBC",
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React basics",
      "Tailwind CSS",
      "Bootstrap",
      "Git & GitHub",
      "Eclipse",
      "VS Code",
      "IntelliJ",
      "Maven basics",
      "Docker basics",
      "REST API basics",
      "Postman",
      "Spring Boot basics",
      "MVC Architecture",
      "Hibernate",
      "JSP",
      "Vercel",
      "Netlify",
      "AWS basics",
      ".env basics",
    ],
  },
  {
    icon: "fa-solid fa-layer-group",
    title: "Java Full Stack Developer",
    type: "Full-Time",
    mode: "On-site",
    description:
      "Build Java, Spring Boot, REST API, database, and modern frontend solutions for real products.",
    experience: "0-3 Years",
    salary: "Competitive, based on skills and experience.",
    suitableFor: [
      "Fresh Graduates with strong fundamentals",
      "Entry-Level Java Developers",
      "Associate Software Engineers",
    ],
    eligibility: [
      "Bachelor's degree in Computer Science, Information Technology, or a related field.",
      "0-3 years of relevant development experience.",
      "Strong problem-solving and communication skills.",
      "Good understanding of software development fundamentals.",
      "Freshers with strong Java Full Stack projects are encouraged to apply.",
    ],
    responsibilities: [
      "Develop and maintain Java-based backend applications.",
      "Build and integrate REST APIs.",
      "Develop responsive frontend applications using React or Angular.",
      "Design and work with relational databases.",
      "Implement authentication and authorization.",
      "Write clean, maintainable, and reusable code.",
      "Debug and resolve application issues.",
      "Write unit tests and participate in code reviews.",
      "Collaborate with developers, testers, and other teams.",
      "Follow Agile development practices.",
    ],
    preferredExperience: [
      "Hands-on experience with Java, Spring Boot, REST APIs, SQL, React or Angular, Git, and real-world projects.",
      "GitHub portfolio or deployed applications.",
    ],
    skills: [
      "Core Java & OOP Concepts",
      "Java 8+ Features",
      "Streams & Lambda Expressions",
      "Multithreading",
      "DSA",
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "Hibernate",
      "Spring Security & JWT",
      "React.js / Angular",
      "Tailwind CSS",
      "RESTful Web Services",
      "Postman",
      "JWT / OAuth",
      "MySQL / PostgreSQL",
      "Git & GitHub",
      "Maven",
      "Docker",
      "Linux",
      "AWS / Azure",
      "Microservices",
      "JUnit & Mockito",
      "CI/CD",
      "Design Patterns",
      "SOLID Principles",
      "System Design",
    ],
  },
  {
    icon: "fa-solid fa-code-branch",
    title: "Full Stack Intern / Associate - MERN, PERN & Modern JavaScript Stacks",
    type: "Full-Time / Internship / Graduate Trainee",
    mode: "On-site",
    description:
      "Create modern web applications using MERN, PERN, and related JavaScript technologies.",
    experience: "0-2 Years",
    salary:
      "Stipend for interns as per company policy. Associate salary is competitive and based on skills and experience.",
    suitableFor: [
      "Fresh Graduates",
      "Final Year Students",
      "Internship Candidates",
      "Entry-Level Software Developers",
    ],
    eligibility: [
      "Bachelor's degree, or pursuing final year, in Computer Science, Information Technology, or a related field.",
      "Freshers, interns, or candidates with 0-2 years of experience are welcome.",
      "Strong problem-solving and logical thinking skills.",
      "Passion for learning modern web technologies and software development.",
      "Ability to work independently and collaboratively in a team environment.",
      "Good communication and time management skills.",
    ],
    responsibilities: [
      "Develop responsive and scalable web applications.",
      "Build reusable frontend components and backend APIs.",
      "Integrate databases and third-party services.",
      "Write clean, maintainable, and well-documented code.",
      "Debug, optimize, and improve application performance.",
      "Collaborate with UI/UX designers and development teams.",
      "Participate in code reviews and Agile development processes.",
      "Deploy and maintain applications on cloud platforms.",
      "Stay updated with emerging technologies and best practices.",
    ],
    preferredExperience: [
      "Academic or personal full-stack projects.",
      "Internship experience in web development.",
      "GitHub portfolio or live deployed applications.",
      "Participation in hackathons or coding competitions is preferred but not mandatory.",
    ],
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
      "TypeScript",
      "React.js",
      "Next.js",
      "Redux / Context API",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT / OAuth",
      "WebSockets basics",
      "MongoDB",
      "PostgreSQL",
      "MySQL basics",
      "Git & GitHub",
      "VS Code",
      "Postman",
      "npm / Yarn",
      "Docker",
      "Vercel",
      "Netlify",
      "Render",
      "Railway",
      "AWS basics",
      "MVC Architecture",
      "OOP",
      "DSA basics",
      "Agile / Scrum",
      "Clean Code Principles",
    ],
  },
  {
    icon: "fa-solid fa-brain",
    title: "Prompt Engineer - AI, NLP & Generative AI",
    type: "Full-Time",
    mode: "On-site",
    description:
      "Design, optimize, and evaluate prompts for Large Language Models and Generative AI systems to deliver accurate, consistent, and high-quality AI outputs.",
    experience: "2+ Years",
    salary: "Competitive, based on skills and experience.",
    suitableFor: [
      "Prompt Engineers",
      "AI / NLP / Generative AI Professionals",
    ],
    eligibility: [
      "2+ years of experience in AI, NLP, Prompt Engineering, or related domains.",
      "Strong understanding of Large Language Models (LLMs) and Generative AI.",
      "Experience with OpenAI GPT, Claude, Gemini, Llama, Mistral, or similar foundation models.",
      "Excellent written communication and prompt-writing skills.",
      "Basic knowledge of Python for testing and automation.",
      "Understanding of REST APIs and AI model integrations.",
      "Strong analytical and problem-solving abilities.",
      "Ability to evaluate AI responses and improve output quality.",
    ],
    responsibilities: [
      "Design, develop, and optimize prompts for Large Language Models (LLMs).",
      "Evaluate and improve prompt performance for accuracy, consistency, and relevance.",
      "Develop prompt templates and reusable prompt libraries for various business use cases.",
      "Create prompt workflows for chatbots, AI assistants, document processing, summarization, and content generation.",
      "Perform prompt testing, benchmarking, and A/B evaluations.",
      "Fine-tune prompts to minimize hallucinations and improve response quality.",
      "Collaborate with AI Engineers to integrate prompts into AI applications and APIs.",
      "Work with Retrieval-Augmented Generation (RAG) systems to improve AI responses.",
      "Document prompt strategies, best practices, and evaluation results.",
      "Stay updated with the latest advancements in Generative AI and LLM technologies.",
    ],
    preferredExperience: [
      "Hands-on experience with OpenAI GPT, Claude, Gemini, Llama, Mistral, or similar foundation models.",
      "Experience with prompt testing, benchmarking, A/B evaluations, and AI response quality improvement.",
      "Experience with REST APIs, AI model integrations, and Retrieval-Augmented Generation (RAG) systems.",
    ],
    skills: [
      "Large Language Models (LLMs)",
      "Generative AI",
      "Prompt Engineering",
      "Natural Language Processing (NLP)",
      "Prompt Writing & Optimization",
      "OpenAI GPT",
      "Claude",
      "Gemini",
      "Llama",
      "Mistral",
      "Prompt Templates",
      "Reusable Prompt Libraries",
      "Chatbot & AI Assistant Workflows",
      "Document Processing Prompts",
      "Summarization Prompts",
      "Content Generation Prompts",
      "Accuracy, Consistency & Relevance Evaluation",
      "Prompt Testing & Benchmarking",
      "A/B Evaluations",
      "Hallucination Reduction",
      "AI Response Quality Improvement",
      "Basic Python",
      "Testing & Automation",
      "REST APIs",
      "AI Model Integrations",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Strategy Documentation",
      "Analytical & Problem-Solving Skills",
    ],
  },
];

const benefits = [
  [
    "fa-solid fa-wallet",
    "Competitive Salary",
    "We offer industry-leading compensation.",
  ],
  [
    "fa-solid fa-heart-pulse",
    "Health & Wellness",
    "Medical, dental, and mental wellness support.",
  ],
  [
    "fa-solid fa-graduation-cap",
    "Learning & Growth",
    "Access to courses, workshops and more.",
  ],
  [
    "fa-solid fa-clock",
    "Flexible Work",
    "Flexible hours and remote work options.",
  ],
  [
    "fa-solid fa-umbrella-beach",
    "Paid Time Off",
    "Take time off to rest and recharge.",
  ],
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (!selectedRole) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedRole(null);
    };

    document.body.classList.add("career-modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("career-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRole]);

  return (
    <main className="careers-showcase wrap">
      <section className="career-hero-panel">
        <div className="career-hero-copy reveal">
          <div className="career-pill">Careers</div>
          <h1>
            Build Your Career.
            <span>Build the Future.</span>
          </h1>
          <p>
            We are always looking for passionate, curious, and driven people who
            love building digital experiences that make an impact.
          </p>
          <a href="#open-positions" className="career-action" title="Go to open positions">
            Explore Open Positions
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </a>
        </div>

        <div
          className="career-hero-art reveal reveal-delay-2"
          aria-hidden="true"
        >
          <div className="career-orbit" />
          <div className="career-chair">
            <div className="chair-back" />
            <div className="chair-seat" />
            <div className="chair-arm chair-arm-left" />
            <div className="chair-arm chair-arm-right" />
            <div className="chair-stem" />
            <div className="chair-base" />
          </div>
          {heroOrbitItems.map(([icon, label, className]) => (
            <div className={`career-orb ${className}`} key={label}>
              <i className={icon} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        className="career-values reveal reveal-delay-3"
        aria-label="Career values"
      >
        {careerValues.map(([icon, title, text]) => (
          <article className="career-value" key={title}>
            <i className={icon} aria-hidden="true" />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="career-section" id="open-positions">
        <div className="career-section-head reveal">
          <div>
            <span>Open Positions</span>
            <h2>Find the Right Opportunity for You</h2>
          </div>
          <a href="#open-positions" className="career-outline-link" title="Go to open positions">
            View All Positions
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </a>
        </div>

        <div className="career-job-list reveal reveal-delay-1">
          {openPositions.map((role) => (
            <article className="career-job-row" key={role.title}>
              <div className="career-job-main">
                <span className="career-job-icon">
                  <i className={role.icon} aria-hidden="true" />
                </span>
                <div>
                  <h3>{role.title}</h3>
                  <p>
                    {role.type} <span>|</span> {role.mode}
                  </p>
                </div>
              </div>
              <p className="career-job-desc">{role.description}</p>
              <button
                type="button"
                className="career-apply"
                onClick={() => setSelectedRole(role)}
              >
                View Details
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="career-section career-benefits-section">
        <div className="career-section-head reveal">
          <div>
            <span>Why Join Bit Byte?</span>
            <h2>More Than Just a Job</h2>
          </div>
        </div>

        <div className="career-benefits reveal reveal-delay-1">
          {benefits.map(([icon, title, text]) => (
            <article className="career-benefit" key={title}>
              <i className={icon} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="career-resume-cta reveal">
        <div className="career-resume-icon">
          <i className="fa-solid fa-envelope" aria-hidden="true" />
        </div>
        <div>
          <h2>Don&apos;t see the right role?</h2>
          <p>We are always open to connecting with great talent.</p>
        </div>
        <a href="/#contact" className="career-resume-button" title="Go to home">
          Send Us Your Resume
        </a>
      </section>

      {selectedRole && (
        <CareerDetailsModal
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
        />
      )}
    </main>
  );
}

function CareerDetailsModal({ role, onClose }) {
  return (
    <div className="career-modal-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="career-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="career-modal-close"
          onClick={onClose}
          aria-label="Close career details"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <div className="career-modal-head">
          <span className="career-job-icon">
            <i className={role.icon} aria-hidden="true" />
          </span>
          <div>
            <p>Career Opportunity</p>
            <h2 id="career-modal-title">{role.title}</h2>
            <div className="career-modal-meta">
              <span>{role.type}</span>
              <span>{role.mode}</span>
              <span>{role.experience}</span>
            </div>
          </div>
        </div>

        <div className="career-modal-body">
          <CareerDetailSection title="Job Description" open>
            <p>{role.description}</p>
          </CareerDetailSection>

          <CareerList title="Eligibility" items={role.eligibility} />
          <CareerList title="Key Responsibilities" items={role.responsibilities} />
          <CareerList title="Suitable For" items={role.suitableFor} compact />
          <CareerList title="Preferred Experience" items={role.preferredExperience} />

          <CareerDetailSection title="Technical Skills">
            <div className="career-skill-cloud">
              {role.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </CareerDetailSection>

          <CareerDetailSection title="Salary" open>
            <p>{role.salary}</p>
          </CareerDetailSection>
        </div>

        <div className="career-modal-actions">
          <a href="/#contact" className="career-resume-button" title="Go to contact">
            Apply Now
          </a>
          <button type="button" className="career-outline-link" onClick={onClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
}

function CareerList({ title, items, compact = false }) {
  return (
    <CareerDetailSection title={title}>
      <ul className={compact ? "career-modal-list career-modal-list--compact" : "career-modal-list"}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </CareerDetailSection>
  );
}

function CareerDetailSection({ title, children, open = false }) {
  return (
    <details className="career-modal-section" open={open}>
      <summary>
        <span>{title}</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
      </summary>
      <div className="career-modal-section-content">{children}</div>
    </details>
  );
}
