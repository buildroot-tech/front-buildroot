import { Project } from "@/types";
import type { Locale } from "@/lib/dictionaries";

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
      "One platform, two businesses: a law firm's client portal and a regional real estate marketplace, working side by side — including Colombia's unique anticres contracts, handled securely from listing to signature.",
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
      "A prospective student's first impression, redesigned: a fast, beautifully animated site that loads instantly on any phone and makes it easy to say yes.",
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
      "Support tickets that used to sit in a queue now route themselves — the right case to the right agent, instantly, with AI handling the routine ones before a human ever sees them.",
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
      "A local newsroom that can break a story in hours, not days — with its own ad sales built in, so the business doesn't depend on anyone else's ad network.",
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
      "A dashboard that used to freeze under its own data now updates in real time — even at ten million events a day, without anyone noticing the load.",
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
      results: [
        "Reduced dashboard initial load time from 4.2s to 0.4s",
        "Supported 500+ concurrent live telemetry views",
        "Zero UI frame drops during peak events",
      ],
    },
    demoUrl: "https://apex.buildroot.co",
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
      "Our own internal system for building software faster without cutting corners — six specialized roles working in sequence, each one checking the last, so nothing slips through.",
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
      results: [
        "Eliminated context degradation on complex multi-step features",
        "Ensured WCAG 2.1 AA accessibility and performance target compliance",
        "Built-in continuous improvement via skill & memory persistence",
      ],
    },
    githubUrl: "https://github.com/nicommit/buildroot",
  },
];

/**
 * Translatable field overrides for the Spanish locale, keyed by project id.
 * Only the human-copy fields are translated here — proper nouns (title,
 * client), tech stack tags, the filter-driving `category` value, and the
 * structural/data fields (year, urls, ids, metrics, etc.) are intentionally
 * left out so they fall through to the English base via the merge in
 * `getProjects`. Keeping this as a partial-override map (rather than a
 * hand-duplicated full array) means it can't drift out of sync with
 * `PROJECTS` on ids, order, or structural fields.
 */
type TranslatableFields = Pick<
  Project,
  "industry" | "summary" | "description" | "highlights"
> & {
  caseStudy: Pick<Project["caseStudy"], "challenge" | "solution" | "results">;
};

const PROJECTS_ES: Readonly<Record<string, TranslatableFields>> = {
  "polo-pantoja-platform": {
    industry: "Servicios Legales",
    summary:
      "Portal para firma de abogados y marketplace inmobiliario especializado con gestión de contratos de anticresis.",
    description:
      "Una sola plataforma, dos negocios: el portal de clientes de una firma de abogados y un marketplace inmobiliario regional, funcionando en conjunto — incluyendo los contratos de anticresis, propios de Colombia, gestionados de forma segura desde la publicación hasta la firma.",
    highlights: ["Marketplace Inmobiliario", "Portal de Clientes", "Contratos Seguros"],
    caseStudy: {
      challenge:
        "Polo & Pantoja necesitaba una solución unificada para sus servicios legales y un marketplace inmobiliario regional que soportara contratos de anticresis — una modalidad legal particular que exige una verificación documental estricta.",
      solution:
        "Se diseñó un backend monolito modular en Spring Boot 3 con Clean Architecture y un frontend en Next.js 14 con App Router. Se construyeron flujos personalizados de verificación de documentos para administradores de la firma y propietarios de inmuebles.",
      results: [
        "Se unificó la vitrina legal y la gestión inmobiliaria en una sola plataforma",
        "Se redujo el tiempo de verificación de propiedades para el personal de la firma",
        "Estrategia de seguridad multi-rol para el manejo seguro de contratos",
      ],
    },
  },
  "edusur-educational": {
    industry: "Educación",
    summary:
      "Sitio web de alto rendimiento en Astro 5 con micro-animaciones GSAP.",
    description:
      "La primera impresión de un futuro estudiante, rediseñada: un sitio rápido y con animaciones cuidadas que carga al instante en cualquier celular y facilita decir que sí.",
    highlights: ["Sitio para Estudiantes", "Experiencia Móvil Rápida", "Diseño Atractivo"],
    caseStudy: {
      challenge:
        "Edusur necesitaba un portal web moderno y atractivo para futuros estudiantes que cargara al instante en redes móviles sin sacrificar animaciones fluidas.",
      solution:
        "Se implementó una arquitectura orientada a contenido con Astro 5 y Tailwind CSS v4, usando GSAP para animaciones de scroll aceleradas por hardware y sin overhead de JS en el contenido estático.",
      results: [
        "Se logró un First Contentful Paint menor a 500ms en móviles",
        "Puntaje de rendimiento de 98/100 en Lighthouse",
        "14 secciones personalizadas y responsivas, construidas con modularidad estricta",
      ],
    },
  },
  "salesforce-agentforce-omni": {
    industry: "Servicio al Cliente",
    summary:
      "Suite de enrutamiento omnicanal automatizado e integración con Agentforce AI.",
    description:
      "Los casos de soporte que antes esperaban en cola ahora se enrutan solos — el caso correcto al agente correcto, al instante, con IA resolviendo los casos rutinarios antes de que un humano los vea.",
    highlights: ["Soporte Más Rápido", "Enrutamiento Asistido por IA", "Gestión Unificada de Casos"],
    caseStudy: {
      challenge:
        "Los equipos de soporte empresarial enfrentaban largos tiempos de espera en cola debido a la categorización manual de casos y canales de comunicación digital fragmentados.",
      solution:
        "Se diseñó una matriz de enrutamiento omnicanal automatizada combinada con Lightning Web Components (LWC) a medida y asistentes de Agentforce AI para clasificar automáticamente los casos entrantes.",
      results: [
        "Se redujo el tiempo promedio de clasificación de casos en un 85%",
        "Traspaso fluido de IA a agente humano en consultas de soporte complejas",
        "Se mejoró el CSAT de satisfacción del cliente en +28%",
      ],
    },
  },
  "aca-diario-digital": {
    industry: "Medios",
    summary:
      "Diario digital de alta velocidad con motor de publicidad autogestionado.",
    description:
      "Una redacción local que puede publicar una noticia en horas, no en días — con su propia venta de publicidad integrada, para que el negocio no dependa de ninguna red publicitaria externa.",
    highlights: ["Diario Digital", "Publicación Rápida", "Venta de Publicidad Local"],
    caseStudy: {
      challenge:
        "La prensa local en la región fronteriza de Nariño/Ecuador carecía de herramientas modernas de publicación digital, y requería una plataforma económica de operar que soportara venta de publicidad local sin depender de redes publicitarias de terceros.",
      solution:
        "Se construyó una aplicación monorepo liviana en Next.js 14 con un flujo editorial de texto enriquecido a medida y un sistema propio de rotación de banners publicitarios.",
      results: [
        "Diseñado para escalar a 50.000 visitas mensuales con un costo de hosting casi nulo",
        "Se redujo el ciclo de publicación de artículos a menos de 4 horas",
        "Monetización directa mediante pauta publicitaria de negocios locales",
      ],
    },
  },
  "apex-analytics": {
    industry: "Analítica de Datos",
    summary:
      "Plataforma de telemetría y datos en streaming de alto rendimiento en tiempo real.",
    description:
      "Un dashboard que antes se congelaba con su propio volumen de datos ahora se actualiza en tiempo real — incluso con diez millones de eventos al día, sin que nadie note la carga.",
    highlights: ["Dashboard en Tiempo Real", "Cargas Instantáneas", "Escala Empresarial"],
    caseStudy: {
      challenge:
        "El dashboard anterior sufría de congelamientos severos en el renderizado y cuellos de botella en la API bajo cargas de telemetría concurrentes altas.",
      solution:
        "Se rediseñó el frontend usando las funciones concurrentes de React 19, componentes de servidor en streaming y fragmentación de WebSocket junto con consultas analíticas en ClickHouse.",
      results: [
        "Se redujo el tiempo de carga inicial del dashboard de 4.2s a 0.4s",
        "Se soportaron más de 500 vistas de telemetría en vivo concurrentes",
        "Cero caídas de frames en la interfaz durante picos de eventos",
      ],
    },
  },
  "buildroot-agent-system": {
    industry: "Automatización con IA",
    summary:
      "Framework multi-agente para el ciclo de vida autónomo de ingeniería de software.",
    description:
      "Nuestro propio sistema interno para construir software más rápido sin recortar calidad — seis roles especializados trabajando en secuencia, cada uno verificando al anterior, para que nada se escape.",
    highlights: ["Herramientas Internas de IA", "Entregas Más Rápidas", "Controles de Calidad Integrados"],
    caseStudy: {
      challenge:
        "Los asistentes de codificación con IA de un solo prompt sufren de pérdida de contexto, requisitos olvidados y falta de una revisión arquitectónica sistemática.",
      solution:
        "Se desarrolló un sistema de flujo de trabajo multi-agente estructurado que divide las fases del proyecto en roles especializados, con entregables estrictos entre etapas y validación de calidad automatizada.",
      results: [
        "Se eliminó la degradación de contexto en funcionalidades complejas de múltiples pasos",
        "Se aseguró el cumplimiento de accesibilidad WCAG 2.1 AA y de los objetivos de rendimiento",
        "Mejora continua integrada mediante persistencia de habilidades y memoria",
      ],
    },
  },
};

/**
 * Returns the project catalog for the given locale. English is the base
 * `PROJECTS` array, unchanged. Spanish merges each project with its
 * translated fields from `PROJECTS_ES`, falling back to the English copy
 * for any project that doesn't (yet) have a translation entry, so a
 * missing/partial translation never drops a project from the list.
 */
export function getProjects(locale: Locale): readonly Project[] {
  if (locale !== "es") {
    return PROJECTS;
  }

  return PROJECTS.map((project) => {
    const translation = PROJECTS_ES[project.id];
    if (!translation) {
      return project;
    }

    return {
      ...project,
      ...translation,
      caseStudy: {
        ...project.caseStudy,
        ...translation.caseStudy,
      },
    };
  });
}
