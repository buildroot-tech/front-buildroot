import { Project } from "@/types";
export const PROJECTS: readonly Project[] = [
  {
    id: "polo-pantoja-platform",
    indexCode: "01",
    title: "Polo & Pantoja",
    image: "polo-pantoja",
    client: "Polo & Pantoja Abogados",
    industry: "Legal Services",
    year: "2026",
    category: "SaaS",
    featured: true,
    summary:
      "Law firm portal & specialized real estate marketplace with anticres contract management.",
    description:
      "Full-stack legal service portal combined with a regional real estate marketplace handling rentals, sales, and Colombian anticres property contracts with role-based document access.",
    tags: [
      "Next.js 14",
      "Spring Boot 3",
      "Java 17",
      "PostgreSQL",
      "Clean Architecture",
      "JWT",
    ],
    highlights: ["Property Marketplace", "Client Portal", "Secure Contracts"],
    metrics: [
      { label: "Contract Modalities", value: "3 (Rent/Sale/Anticres)" },
      { label: "Security", value: "Spring Sec + RBAC" },
      { label: "Architecture", value: "Modular Monolith" },
    ],
    caseStudy: {
      challenge:
        "Polo & Pantoja needed a unified solution for legal services and a regional real estate marketplace supporting anticres contracts—a unique legal modality requiring strict document verification.",
      solution:
        "Architected a modular monolith backend in Spring Boot 3 with Clean Architecture and a Next.js 14 App Router frontend. Built custom document verification workflows for law firm admins and property owners.",
      architecture: [
        "Spring Boot 3 + Java 17 Controller-Service-Repository clean layers",
        "Next.js 14 App Router with server-side rendered listings",
        "JWT Authentication + Role-Based Access Control (Admin, Owner, Client)",
        "PostgreSQL database with soft-delete repositories",
      ],
      results: [
        "Unified legal showcase & property management into a single platform",
        "Streamlined property verification time for law firm staff",
        "Multi-role security strategy for secure contract handling",
      ],
    },
    demoUrl: "https://polopantoja.co",
  },
  {
    id: "edusur-educational",
    indexCode: "02",
    title: "Edusur",
    image: "edusur",
    client: "Edusur Servicios Educativos",
    industry: "Education",
    year: "2026",
    category: "Web Apps",
    featured: true,
    summary:
      "High-performance Astro 5 web experience with GSAP micro-animations.",
    description:
      "A fast, content-driven educational website featuring 14 custom sections, student review engines, and sub-second load times.",
    tags: ["Astro 5", "TypeScript", "Tailwind 4", "GSAP 3", "EmailJS"],
    highlights: ["Student-Facing Site", "Fast Mobile Experience", "Engaging Design"],
    metrics: [
      { label: "Framework", value: "Astro 5.3" },
      { label: "Custom Sections", value: "14 Sections" },
      { label: "Lighthouse Score", value: "98/100" },
    ],
    caseStudy: {
      challenge:
        "Edusur needed a modern, highly engaging web portal for prospective students that loaded instantly on mobile networks while maintaining smooth animations.",
      solution:
        "Implemented a content-driven architecture using Astro 5 and Tailwind CSS v4, utilizing GSAP for hardware-accelerated scroll animations and zero JS runtime overhead for static content.",
      architecture: [
        "Astro 5 island architecture for zero JS default shipped",
        "Tailwind CSS 4.0 for utility styling",
        "GSAP 3 scroll-triggered timeline animations",
        "EmailJS client-side secure lead capture",
      ],
      results: [
        "Achieved sub-500ms First Contentful Paint on mobile",
        "98/100 Lighthouse performance rating",
        "14 responsive custom sections built with strict modularity",
      ],
    },
    demoUrl: "https://edusur.edu.co",
  },
  {
    id: "salesforce-agentforce-omni",
    indexCode: "03",
    title: "Salesforce Omni",
    image: "salesforce-ai",
    client: "Enterprise Consulting",
    industry: "Customer Service",
    year: "2026",
    category: "Consulting",
    featured: true,
    summary:
      "Automated Omni-Channel customer routing & Agentforce AI integration suite.",
    description:
      "Architecture design and custom LWC integration for enterprise Salesforce CRM deployments, automating Omni-Channel routing, case escalation flows, and AI Agentforce assistants.",
    tags: [
      "Salesforce",
      "LWC",
      "Agentforce AI",
      "Omni-Channel",
      "Apex",
      "Flow Automation",
    ],
    highlights: ["Faster Support", "AI-Assisted Routing", "Unified Case Handling"],
    metrics: [
      { label: "Routing Latency", value: "<1.2s" },
      { label: "Case Automation", value: "85% Auto-Routed" },
      { label: "Integration", value: "Agentforce AI" },
    ],
    caseStudy: {
      challenge:
        "Enterprise customer support teams faced high queue wait times due to manual case categorization and fragmented digital communication channels.",
      solution:
        "Engineered an automated Omni-Channel routing matrix combined with custom Lightning Web Components (LWC) and Agentforce AI assistants to auto-triage incoming cases.",
      architecture: [
        "Salesforce Service Cloud Omni-Channel skill-based routing",
        "Agentforce AI digital engagement connectors",
        "Custom Lightning Web Component (LWC) widgets for agent dashboards",
        "Declarative Flow automation for case status lifecycle",
      ],
      results: [
        "Reduced average case triage time by 85%",
        "Seamless AI-to-human agent handoff for complex support inquiries",
        "Enhanced customer satisfaction CSAT by +28%",
      ],
    },
  },
  {
    id: "aca-diario-digital",
    indexCode: "04",
    title: "Acá",
    image: "aca-diario",
    client: "Acá Medios",
    industry: "Media",
    year: "2026",
    category: "Web Apps",
    featured: true,
    summary:
      "High-velocity digital newspaper & self-managed advertising engine.",
    description:
      "A modern local journalism platform built for fast editorial workflows (draft -> review -> publish in <4h) with self-hosted ad management.",
    tags: ["Next.js 14", "Tailwind 4", "PostgreSQL", "Monorepo", "Local CMS"],
    highlights: ["Digital Newspaper", "Fast Publishing", "Local Ad Sales"],
    metrics: [
      { label: "Target Visits", value: "50K/mo" },
      { label: "Publish SLA", value: "<4 Hours" },
      { label: "Infra Cost Target", value: "$0-$5/mo" },
    ],
    caseStudy: {
      challenge:
        "Local news in Nariño/Ecuador border region lacked modern digital publishing tools, requiring a cheap-to-operate platform supporting local ad sales without third-party ad network dependencies.",
      solution:
        "Built a lightweight monorepo application in Next.js 14 with a custom editorial rich-text workflow and a self-managed banner advertising rotation system.",
      architecture: [
        "Next.js 14 App Router monorepo architecture",
        "Internal ad banner manager (weight-based rotation & date caps)",
        "Role-based editorial workflow (Draft, Review, Scheduled, Live)",
        "Static page generation for viral article traffic bursts",
      ],
      results: [
        "Designed to scale to 50,000 monthly visits at near-zero hosting cost",
        "Streamlined article publishing loop to under 4 hours",
        "Direct monetization via local business ad placements",
      ],
    },
    demoUrl: "https://diarioaca.co",
  },
  {
    id: "apex-analytics",
    indexCode: "05",
    title: "Apex",
    client: "Apex Enterprise Systems",
    industry: "Data Analytics",
    year: "2025",
    category: "SaaS",
    featured: false,
    summary: "High-throughput real-time telemetry and streaming data platform.",
    description:
      "Engineered an enterprise telemetry dashboard handling over 10M events/day with sub-50ms query latencies.",
    tags: ["Next.js 16", "React 19", "ClickHouse", "WebSockets", "Tailwind 4"],
    highlights: ["Real-Time Dashboard", "Instant Load Times", "Enterprise Scale"],
    metrics: [
      { label: "Throughput Boost", value: "+340%" },
      { label: "Query Latency", value: "<50ms" },
      { label: "Daily Events", value: "10M+" },
    ],
    caseStudy: {
      challenge:
        "The legacy dashboard suffered from severe rendering freezes and API bottlenecks under heavy concurrent telemetry loads.",
      solution:
        "Re-architected the frontend using React 19 concurrent features, streaming server components, and WebSocket chunking with ClickHouse analytics queries.",
      architecture: [
        "Next.js App Router streaming server render",
        "ClickHouse columnar DB integration",
        "High-performance canvas rendering engine",
        "Real-time WebSocket data pipelines",
      ],
      results: [
        "Reduced dashboard initial load time from 4.2s to 0.4s",
        "Supported 500+ concurrent live telemetry views",
        "Zero UI frame drops during peak events",
      ],
    },
    demoUrl: "https://apex.buildroot.dev",
  },
  {
    id: "buildroot-agent-system",
    indexCode: "06",
    title: "buildroot_ Engine",
    client: "buildroot_ Labs",
    industry: "AI Automation",
    year: "2026",
    category: "Labs",
    featured: false,
    isLab: true,
    summary: "Multi-agent autonomous software engineering lifecycle framework.",
    description:
      "Orchestration engine coordinating 6 specialized AI agents (Requirements, Architecture, Frontend, QA, Copywriting, DevOps) with automated handoff gates.",
    tags: [
      "Antigravity AGY",
      "Multi-Agent",
      "TypeScript",
      "AI Automation",
      "Workflows",
    ],
    highlights: ["Internal AI Tooling", "Faster Delivery", "Built-In Quality Checks"],
    metrics: [
      { label: "Agent Roles", value: "6 Specialized" },
      { label: "Cycle Speed", value: "3x Faster" },
      { label: "QA Checkpoints", value: "5-Axis Audit" },
    ],
    caseStudy: {
      challenge:
        "Traditional single-prompt AI coding assistants suffer from context drift, forgotten requirements, and lack of systematic architectural review.",
      solution:
        "Developed a structured multi-agent workflow system partitioning project phases into specialized roles with strict deliverable handoffs and automated quality validation.",
      architecture: [
        "Role-based agent definitions (Requirements Engineer, Solution Architect, Frontend Dev, QA Engineer, DevOps, Copywriter)",
        "Slash command workflow orchestration (/startcycle)",
        "Automated 5-axis code quality & accessibility audit checklists",
        "Markdown artifact persistence & transcript traceability",
      ],
      results: [
        "Eliminated context degradation on complex multi-step features",
        "Ensured WCAG 2.1 AA accessibility and performance target compliance",
        "Built-in continuous improvement via skill & memory persistence",
      ],
    },
    githubUrl: "https://github.com/nicommit/buildroot",
  },
];
