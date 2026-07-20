export type ProjectCategory = "All" | "SaaS" | "Web Apps" | "Consulting";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  challenge: string;
  solution: string;
  architecture: string[];
  results: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  featured: boolean;
  tags: string[];
  metrics: ProjectMetric[];
  caseStudy: CaseStudy;
  demoUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "apex-analytics",
    title: "Apex Analytics Platform",
    client: "Apex Enterprise Systems",
    year: "2025",
    category: "SaaS",
    featured: true,
    summary: "High-throughput real-time telemetry and streaming data platform.",
    description:
      "Engineered an enterprise telemetry dashboard handling over 10M events/day with sub-50ms query latencies.",
    tags: ["Next.js 16", "React 19", "ClickHouse", "WebSockets", "Tailwind 4"],
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
    id: "kuro-studio-engine",
    title: "Kuro Digital Experience",
    client: "Kuro Architecture Studio",
    year: "2025",
    category: "Web Apps",
    featured: true,
    summary: "Brutalist portfolio & interactive 3D studio catalog.",
    description:
      "A raw, high-impact digital experience featuring smooth inertia scroll, fluid spatial webGL transitions, and headless CMS integration.",
    tags: ["Next.js", "Framer Motion", "Lenis", "Tailwind 4", "Three.js"],
    metrics: [
      { label: "Lighthouse Performance", value: "99/100" },
      { label: "Conversion Lift", value: "+410%" },
      { label: "Average Session", value: "4m 12s" },
    ],
    caseStudy: {
      challenge:
        "Kuro Studio needed a portfolio that reflected their bold architectural aesthetic without compromising load speeds or accessibility.",
      solution:
        "Developed a brutalist hybrid UI with hardware-accelerated Framer Motion transitions, preloaded asset pipeline, and responsive WCAG 2.1 AA compliant structure.",
      architecture: [
        "Custom Lenis smooth scroll orchestration",
        "Selective WebGL canvas initialization",
        "Optimized next/image asset pipeline",
        "Hydration-deferred interactive controls",
      ],
      results: [
        "Achieved 99/100 Lighthouse performance score",
        "Increased inbound project inquiries by 4.1x",
        "Featured on Awwwards & SiteInspire",
      ],
    },
    demoUrl: "https://kuro.buildroot.dev",
  },
  {
    id: "vanguard-cloud-gateway",
    title: "Vanguard Cloud Gateway",
    client: "Vanguard Financial Technologies",
    year: "2024",
    category: "Consulting",
    featured: true,
    summary: "Zero-trust edge gateway & micro-service API architecture.",
    description:
      "Comprehensive cloud strategy and infrastructure refactor for high-compliance financial transaction processing.",
    tags: ["Go", "Node.js", "Docker", "Kubernetes", "Vercel Edge"],
    metrics: [
      { label: "System Uptime", value: "99.999%" },
      { label: "Infra Cost", value: "-45%" },
      { label: "API Latency P99", value: "18ms" },
    ],
    caseStudy: {
      challenge:
        "High cloud hosting overhead paired with regional latencies during automated compliance verifications.",
      solution:
        "Migrated monolithic backend APIs into lightweight edge-distributed functions with Redis distributed caching and automated CI/CD security scanning.",
      architecture: [
        "Vercel Edge middleware & distributed cache",
        "Containerized Go micro-services on Kubernetes",
        "Automated Terraform infrastructure-as-code",
        "Zero-downtime blue/green deployment strategy",
      ],
      results: [
        "Cut monthly AWS cloud expenses by 45%",
        "Maintained 99.999% SLA across 4 global regions",
        "Passed SOC2 Type II compliance audit on first pass",
      ],
    },
  },
  {
    id: "flowstate-workspace",
    title: "FlowState Async Workspace",
    client: "FlowState Labs",
    year: "2024",
    category: "SaaS",
    featured: false,
    summary: "Minimalist task & documentation workspace for remote engineering teams.",
    description:
      "An offline-first collaborative workspace designed for fast keyboard-driven engineering workflows.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Zustand", "Stripe"],
    metrics: [
      { label: "Active MAU", value: "25K+" },
      { label: "Sync Latency", value: "<12ms" },
      { label: "User Satisfaction", value: "4.9/5" },
    ],
    caseStudy: {
      challenge:
        "Existing project management tools were bloated, slow, and unreliable during offline remote work.",
      solution:
        "Built a local-first sync engine using IndexedDB and WebSockets with optimistic UI updates and instant command palette navigation.",
      architecture: [
        "Client-side optimistic state store with Zustand",
        "IndexedDB offline fallback persistence",
        "PostgreSQL + Prisma transaction backend",
        "Stripe customer portal & subscription webhook sync",
      ],
      results: [
        "Grew to 25,000 monthly active users within 90 days of launch",
        "Sub-15ms command palette search across 10,000 items",
        "Zero data loss reports across offline sync reconnection events",
      ],
    },
  },
];
