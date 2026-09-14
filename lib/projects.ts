import { Project } from "@/types";
import type { Locale } from "@/lib/dictionaries";

export const PROJECTS: readonly Project[] = [
  {
    id: "plaet-restaurant-saas",
    indexCode: "01",
    title: "Plaet",
    image: "plaet",
    gallery: [
      {
        image: "plaet-features",
        caption: "The feature grid — menu, floor plan, kitchen board, stock and roles in one place",
      },
      {
        image: "plaet-benefits",
        caption: "The onboarding pitch: three steps from an empty menu to a running system",
      },
      {
        image: "plaet-pricing",
        caption: "Three tiers priced in Colombian pesos, from a single restaurant to multi-location chains",
      },
    ],
    client: "buildroot_",
    industry: "Restaurant Tech",
    year: "2025",
    category: "SaaS",
    featured: true,
    summary:
      "A multi-tenant restaurant management platform — menus, floor, kitchen and cash register in one system, built to run more than one restaurant at once.",
    description:
      "Our own restaurant-management SaaS, grown from a single-location tool into a multi-tenant platform: one system now runs the floor, the kitchen and the register for several restaurants at once, each one walled off from the others.",
    tags: [
      "React 19",
      "Node.js",
      "Express 5",
      "Prisma",
      "PostgreSQL",
      "Zustand",
    ],
    highlights: [
      "Multi-Tenant Architecture",
      "Real-Time Kitchen Kanban",
      "Prepaid Ticket Books",
    ],
    metrics: [
      { label: "Backend Modules", value: "15 modules, 109 endpoints" },
      { label: "Access Control", value: "21 permissions, 5 roles" },
      { label: "Database Models", value: "22 (Prisma)" },
    ],
    caseStudy: {
      challenge:
        "The original tool only ever ran one restaurant's floor. Turning it into something worth selling meant the data model, the auth system and every query in the app had to become tenant-aware — without any one restaurant ever seeing another's orders, menu or staff.",
      solution:
        "Rebuilt the core around a tenant id carried automatically through every request via AsyncLocalStorage, rather than a parameter every developer has to remember to pass, plus a granular role-permission system covering five staff roles — from cashier to super-admin — and a kitchen board staff actually use during service, not just for demos.",
      results: [
        "One codebase now runs any number of restaurants, each fully isolated at the query level",
        "A real-time kitchen Kanban replaced the paper ticket rail, with drag-and-drop and swipe support for tablets",
        "A prepaid \"ticket book\" system — common in Colombian workplace cafeterias — built in as a first-class payment method, not bolted on",
      ],
    },
    demoUrl: "https://plaet.cloud",
  },
  {
    id: "edusur-educational",
    indexCode: "02",
    title: "Edusur",
    image: "edusur",
    gallery: [
      {
        image: "edusur-pricing",
        caption: "Program pricing, laid out with no hidden fees",
      },
      {
        image: "edusur-about",
        caption: "The about section, with real student outcomes front and centre",
      },
      {
        image: "edusur-contact",
        caption: "A direct contact form alongside every other way to reach the school",
      },
      {
        image: "edusur-testimonials",
        caption: "Real testimonials, with names and the scores behind them",
      },
      {
        image: "edusur-enrollment",
        caption: "The enrollment call to action, plus the footer with hours and contact info",
      },
    ],
    client: "EDUSUR",
    industry: "Education",
    year: "2026",
    category: "Web Apps",
    featured: true,
    summary:
      "A mobile-fast prospective-student site for a tutoring academy in Ipiales, built around one WhatsApp button as the way in.",
    description:
      "The first thing a prospective student or family sees, rebuilt: a fast, mobile-first site carrying a video tour and real student results, with WhatsApp as the one way to reach out.",
    tags: ["Astro 7", "Tailwind 4", "GSAP"],
    highlights: [
      "Prospective-Student Site",
      "Real Student Testimonials",
      "WhatsApp-First Contact",
    ],
    metrics: [
      { label: "Lighthouse Performance", value: "89/100 (mobile)" },
      { label: "Layout Shift", value: "0.037 CLS" },
      { label: "Largest Contentful Paint", value: "~1.7s (mobile)" },
    ],
    caseStudy: {
      challenge:
        "A tutoring academy's real pitch is its results, but a page that makes a prospective family wait to see them doesn't get a second visit. EDUSUR needed a mobile-fast site that could carry a video tour, live testimonials and animated achievement counters without any of it slowing the page down.",
      solution:
        "Built the page to load fast on a phone first, then layered in the persuasion: an embedded video tour of the school, a rotating set of real student testimonials, and achievement counters that animate into view — all pointing at one WhatsApp button as the single call to action, matching how families in Ipiales actually reach out.",
      results: [
        "89/100 Lighthouse performance score on mobile",
        "Loads in under two seconds on a real mobile connection, with a stable layout — 0.037 cumulative layout shift",
        "One call to action throughout the page: WhatsApp, not a form nobody fills out",
      ],
    },
    demoUrl: "https://edusur.vercel.app/",
  },
  {
    id: "vereda-digital-daily",
    indexCode: "03",
    title: "Vereda",
    image: "vereda",
    client: "Vereda",
    industry: "Media",
    year: "2026",
    category: "Web Apps",
    featured: true,
    summary:
      "High-velocity digital newspaper & self-managed advertising engine for Nariño, Colombia.",
    description:
      "A local newsroom that can break a story in hours, not days — with its own ad sales built in, so the business doesn't depend on anyone else's ad network. Renamed from an early working title, Acá, to Vereda after a naming study grounded it in something more locally rooted.",
    tags: ["Next.js 16", "Sanity CMS", "Tailwind 4", "TypeScript"],
    highlights: ["Digital Newspaper", "Fast Publishing", "Local Ad Sales"],
    metrics: [
      { label: "Target Traffic", value: "50k visits a month" },
      { label: "Time to Publish", value: "Under 4 hours" },
      { label: "Running Cost", value: "USD 0–5 a month" },
    ],
    caseStudy: {
      challenge:
        "Local news in Nariño/Ecuador border region lacked modern digital publishing tools, requiring a cheap-to-operate platform supporting local ad sales without third-party ad network dependencies.",
      solution:
        "Built an editorial workflow the newsroom can run without help, on Sanity so non-technical columnists can publish without a developer in the loop, plus an ad system that sells and rotates local placements — all on infrastructure that costs almost nothing to keep online.",
      results: [
        "Designed to scale to 50,000 monthly visits at near-zero hosting cost",
        "Streamlined article publishing loop to under 4 hours",
        "Direct monetization via local business ad placements",
      ],
    },
  },
  {
    id: "precepto-legal-realestate",
    indexCode: "04",
    title: "Precepto",
    image: "precepto",
    gallery: [
      {
        image: "precepto-services",
        caption: "Three ways to transact — rent, sale or anticres — each with its own legal checklist",
      },
      {
        image: "precepto-legal-areas",
        caption: "The firm's other practice areas, alongside the real estate marketplace",
      },
    ],
    client: "Precepto Consultores Jurídicos",
    industry: "Legal Services",
    year: "2026",
    category: "SaaS",
    featured: true,
    summary:
      "A law firm's real estate marketplace with built-in legal verification — listings a firm can actually stand behind.",
    description:
      "A property marketplace and legal-services site for a family law firm in Ipiales — rentals, sales and anticres listings that carry the firm's own verification, not just an open board anyone can post to.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Tailwind 4",
      "shadcn/ui",
    ],
    highlights: [
      "Property Marketplace",
      "Bilingual (ES/EN)",
      "Document Workflow",
    ],
    metrics: [
      { label: "Access Control", value: "3 roles via Supabase RLS" },
      { label: "Database", value: "19 migrations, PostgreSQL" },
      { label: "Languages", value: "Spanish / English (next-intl)" },
    ],
    caseStudy: {
      challenge:
        "A law firm's real product is trust, but a property marketplace where anyone can list anything erodes exactly that. Precepto needed to open its real estate marketplace to public listings — arriendos, ventas, anticres — without giving up the legal verification that's the actual service being sold.",
      solution:
        "Built a hybrid model instead of a fully open one: owners publish their own properties, but every listing enters a reversible verification queue — pending, approved or rejected — with the firm's own document workflow sitting behind it, private storage and contracts carried through to signature. Three roles — admin, owner, client — each see only their own slice through Postgres row-level security, not application-layer checks that are easy to get wrong.",
      results: [
        "A bilingual (ES/EN) marketplace and legal-services site running on one Next.js codebase",
        "A reversible property-verification workflow — pending, approved, rejected — instead of a one-way gate",
        "A private-bucket document module covering contracts from draft to signature",
      ],
    },
  },
  {
    id: "salesforce-agentforce-omni",
    indexCode: "05",
    title: "Salesforce Omni",
    image: "salesforce-ai",
    client: "Enterprise Consulting",
    industry: "Customer Service",
    year: "2026",
    category: "Consulting",
    featured: true,
    summary:
      "Automated case routing with an assistant that resolves the routine requests.",
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
    highlights: [
      "Faster Support",
      "AI-Assisted Routing",
      "Unified Case Handling",
    ],
    metrics: [
      { label: "Routing Latency", value: "Under 1.2 seconds" },
      { label: "Cases Auto-Routed", value: "85%" },
      { label: "Escalation", value: "Seamless hand-off to staff" },
    ],
    caseStudy: {
      challenge:
        "Enterprise customer support teams faced high queue wait times due to manual case categorization and fragmented digital communication channels.",
      solution:
        "Designed automated routing that reads each incoming case and sends it straight to the right person, with an assistant resolving the routine ones and handing anything complex to staff without the customer repeating themselves.",
      results: [
        "Reduced average case triage time by 85%",
        "Seamless AI-to-human agent handoff for complex support inquiries",
        "Enhanced customer satisfaction CSAT by +28%",
      ],
    },
  },
  {
    id: "apex-analytics",
    indexCode: "06",
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
    highlights: [
      "Real-Time Dashboard",
      "Instant Load Times",
      "Enterprise Scale",
    ],
    metrics: [
      { label: "Throughput Gain", value: "+340%" },
      { label: "Query Response", value: "Under 50 ms" },
      { label: "Daily Events", value: "Over 10 million" },
    ],
    caseStudy: {
      challenge:
        "The legacy dashboard suffered from severe rendering freezes and API bottlenecks under heavy concurrent telemetry loads.",
      solution:
        "Rebuilt the dashboard so live data streams in continuously and the interface stays responsive while it does, even under the heaviest event volumes.",
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
    indexCode: "07",
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
    highlights: [
      "Internal AI Tooling",
      "Faster Delivery",
      "Built-In Quality Checks",
    ],
    metrics: [
      { label: "Specialised Roles", value: "6" },
      { label: "Delivery Speed", value: "3× faster" },
      { label: "Quality Checks", value: "5-axis audit" },
    ],
    caseStudy: {
      challenge:
        "Traditional single-prompt AI coding assistants suffer from context drift, forgotten requirements, and lack of systematic architectural review.",
      solution:
        "Built a structured workflow that splits a project into specialised roles, each one checking the previous stage's work, with strict hand-offs so nothing gets lost between steps.",
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
  "industry" | "summary" | "description" | "highlights" | "metrics" | "gallery"
> & {
  caseStudy: Pick<Project["caseStudy"], "challenge" | "solution" | "results">;
};

const PROJECTS_ES: Readonly<Record<string, TranslatableFields>> = {
  "edusur-educational": {
    industry: "Educación",
    gallery: [
      {
        image: "edusur-pricing",
        caption: "Precios de los programas, sin costos ocultos",
      },
      {
        image: "edusur-about",
        caption: "La sección de nosotros, con resultados reales de estudiantes al frente",
      },
      {
        image: "edusur-contact",
        caption: "Un formulario de contacto directo junto a todos los otros canales para escribir",
      },
      {
        image: "edusur-testimonials",
        caption: "Testimonios reales, con nombre y el puntaje detrás de cada uno",
      },
      {
        image: "edusur-enrollment",
        caption: "El llamado a inscribirse, junto al pie de página con horarios y contacto",
      },
    ],
    metrics: [
      { label: "Rendimiento en Lighthouse", value: "89/100 (móvil)" },
      { label: "Estabilidad visual", value: "0.037 CLS" },
      { label: "Carga de contenido principal", value: "~1.7s (móvil)" },
    ],
    summary:
      "Un sitio rápido en celular para una academia de preparación en Ipiales, construido alrededor de un solo botón de WhatsApp como puerta de entrada.",
    description:
      "Lo primero que ve un futuro estudiante o su familia, rediseñado: un sitio rápido en celular con un video del recorrido y resultados reales de estudiantes, con WhatsApp como el único camino para escribir.",
    highlights: [
      "Sitio para Futuros Estudiantes",
      "Testimonios Reales de Estudiantes",
      "Contacto por WhatsApp",
    ],
    caseStudy: {
      challenge:
        "El verdadero argumento de venta de una academia son sus resultados, pero una página que hace esperar a una familia para verlos no consigue una segunda visita. Edusur necesitaba un sitio rápido en celular que pudiera mostrar un video del recorrido, testimonios reales y contadores de logros animados, sin que nada de eso hiciera más lenta la página.",
      solution:
        "Se construyó la página para que cargue rápido en celular primero, y encima se fue agregando lo persuasivo: un video del recorrido por la institución, un carrusel de testimonios reales de estudiantes, y contadores de logros que se animan al aparecer — todo apuntando a un solo botón de WhatsApp como único llamado a la acción, tal como la gente en Ipiales realmente escribe.",
      results: [
        "89/100 de rendimiento en Lighthouse en móvil",
        "Carga en menos de dos segundos en una conexión móvil real, con un diseño estable — 0.037 de CLS",
        "Un solo llamado a la acción en toda la página: WhatsApp, no un formulario que nadie llena",
      ],
    },
  },
  "salesforce-agentforce-omni": {
    industry: "Servicio al Cliente",
    metrics: [
      { label: "Latencia de enrutamiento", value: "Menos de 1,2 segundos" },
      { label: "Casos enrutados solos", value: "85%" },
      { label: "Escalamiento", value: "Paso a persona sin fricción" },
    ],
    summary:
      "Enrutamiento automático de casos con un asistente que resuelve las solicitudes rutinarias.",
    description:
      "Los casos de soporte que antes esperaban en cola ahora se enrutan solos — el caso correcto al agente correcto, al instante, con IA resolviendo los casos rutinarios antes de que un humano los vea.",
    highlights: [
      "Soporte Más Rápido",
      "Enrutamiento Asistido por IA",
      "Gestión Unificada de Casos",
    ],
    caseStudy: {
      challenge:
        "Los equipos de soporte empresarial enfrentaban largos tiempos de espera en cola debido a la categorización manual de casos y canales de comunicación digital fragmentados.",
      solution:
        "Se diseñó un enrutamiento automático que lee cada caso que entra y lo envía directo a la persona indicada, con un asistente que resuelve los casos rutinarios y entrega los complejos al equipo sin que el cliente tenga que repetir su historia.",
      results: [
        "Se redujo el tiempo promedio de clasificación de casos en un 85%",
        "Traspaso fluido de IA a agente humano en consultas de soporte complejas",
        "Se mejoró el CSAT de satisfacción del cliente en +28%",
      ],
    },
  },
  "vereda-digital-daily": {
    industry: "Medios",
    metrics: [
      { label: "Tráfico objetivo", value: "50 mil visitas al mes" },
      { label: "Tiempo de publicación", value: "Menos de 4 horas" },
      { label: "Costo de operación", value: "USD 0–5 al mes" },
    ],
    summary:
      "Diario digital de alta velocidad con motor de publicidad autogestionado para Nariño, Colombia.",
    description:
      "Una redacción local que puede publicar una noticia en horas, no en días — con su propia venta de publicidad integrada, para que el negocio no dependa de ninguna red publicitaria externa. Renombrado de un título de trabajo inicial, Acá, a Vereda tras un estudio de naming que lo ancló en algo más local.",
    highlights: [
      "Diario Digital",
      "Publicación Rápida",
      "Venta de Publicidad Local",
    ],
    caseStudy: {
      challenge:
        "La prensa local en la región fronteriza de Nariño/Ecuador carecía de herramientas modernas de publicación digital, y requería una plataforma económica de operar que soportara venta de publicidad local sin depender de redes publicitarias de terceros.",
      solution:
        "Se construyó un flujo editorial que la redacción maneja sin ayuda técnica, sobre Sanity para que columnistas sin perfil técnico puedan publicar sin depender de un desarrollador, más un sistema que vende y rota los anuncios locales — todo sobre una operación que cuesta casi nada mantener en línea.",
      results: [
        "Diseñado para escalar a 50.000 visitas mensuales con un costo de hosting casi nulo",
        "Se redujo el ciclo de publicación de artículos a menos de 4 horas",
        "Monetización directa mediante pauta publicitaria de negocios locales",
      ],
    },
  },
  "apex-analytics": {
    industry: "Analítica de Datos",
    metrics: [
      { label: "Aumento de procesamiento", value: "+340%" },
      { label: "Respuesta de consulta", value: "Menos de 50 ms" },
      { label: "Eventos diarios", value: "Más de 10 millones" },
    ],
    summary:
      "Plataforma de telemetría y datos en streaming de alto rendimiento en tiempo real.",
    description:
      "Un dashboard que antes se congelaba con su propio volumen de datos ahora se actualiza en tiempo real — incluso con diez millones de eventos al día, sin que nadie note la carga.",
    highlights: [
      "Dashboard en Tiempo Real",
      "Cargas Instantáneas",
      "Escala Empresarial",
    ],
    caseStudy: {
      challenge:
        "El dashboard anterior sufría de congelamientos severos en el renderizado y cuellos de botella en la API bajo cargas de telemetría concurrentes altas.",
      solution:
        "Se rehízo el tablero para que los datos en vivo fluyan de forma continua y la interfaz siga respondiendo mientras lo hacen, incluso en los picos de mayor volumen.",
      results: [
        "Se redujo el tiempo de carga inicial del dashboard de 4.2s a 0.4s",
        "Se soportaron más de 500 vistas de telemetría en vivo concurrentes",
        "Cero caídas de frames en la interfaz durante picos de eventos",
      ],
    },
  },
  "buildroot-agent-system": {
    industry: "Automatización con IA",
    metrics: [
      { label: "Roles especializados", value: "6" },
      { label: "Velocidad de entrega", value: "3× más rápido" },
      { label: "Controles de calidad", value: "Auditoría de 5 ejes" },
    ],
    summary:
      "Framework multi-agente para el ciclo de vida autónomo de ingeniería de software.",
    description:
      "Nuestro propio sistema interno para construir software más rápido sin recortar calidad — seis roles especializados trabajando en secuencia, cada uno verificando al anterior, para que nada se escape.",
    highlights: [
      "Herramientas Internas de IA",
      "Entregas Más Rápidas",
      "Controles de Calidad Integrados",
    ],
    caseStudy: {
      challenge:
        "Los asistentes de codificación con IA de un solo prompt sufren de pérdida de contexto, requisitos olvidados y falta de una revisión arquitectónica sistemática.",
      solution:
        "Se construyó un flujo estructurado que divide el proyecto en roles especializados, cada uno revisando el trabajo de la etapa anterior, con entregas estrictas entre pasos para que nada se pierda en el camino.",
      results: [
        "Se eliminó la degradación de contexto en funcionalidades complejas de múltiples pasos",
        "Se aseguró el cumplimiento de accesibilidad WCAG 2.1 AA y de los objetivos de rendimiento",
        "Mejora continua integrada mediante persistencia de habilidades y memoria",
      ],
    },
  },
  "plaet-restaurant-saas": {
    gallery: [
      {
        image: "plaet-features",
        caption: "La grilla de funciones — menú, mesas, cocina, inventario y roles en un solo lugar",
      },
      {
        image: "plaet-benefits",
        caption: "El discurso de onboarding: tres pasos de un menú vacío a un sistema funcionando",
      },
      {
        image: "plaet-pricing",
        caption: "Tres planes en pesos colombianos, desde un restaurante único hasta cadenas multi-sede",
      },
    ],
    industry: "Tecnología para Restaurantes",
    metrics: [
      { label: "Módulos de backend", value: "15 módulos, 109 endpoints" },
      { label: "Control de acceso", value: "21 permisos, 5 roles" },
      { label: "Modelos de base de datos", value: "22 (Prisma)" },
    ],
    summary:
      "Una plataforma multi-tenant de gestión de restaurantes — menú, salón, cocina y caja en un solo sistema, hecho para operar más de un restaurante a la vez.",
    description:
      "Nuestro propio SaaS de gestión de restaurantes, evolucionado de una herramienta de un solo local a una plataforma multi-tenant: un mismo sistema opera hoy el salón, la cocina y la caja de varios restaurantes a la vez, cada uno aislado del resto.",
    highlights: [
      "Arquitectura Multi-Tenant",
      "Kanban de Cocina en Tiempo Real",
      "Tiqueteras Prepagadas",
    ],
    caseStudy: {
      challenge:
        "La herramienta original solo operaba el salón de un restaurante. Convertirla en algo vendible significaba que el modelo de datos, el sistema de autenticación y cada consulta de la aplicación tenían que volverse conscientes del inquilino (tenant) — sin que un restaurante viera jamás los pedidos, el menú o el personal de otro.",
      solution:
        "Se reconstruyó el núcleo alrededor de un id de inquilino que viaja automáticamente en cada solicitud vía AsyncLocalStorage, en vez de un parámetro que cada desarrollador debe recordar pasar, junto con un sistema de roles y permisos granular que cubre cinco roles de personal — de cajero a super-administrador — y un tablero de cocina que el personal realmente usa durante el servicio, no solo para demos.",
      results: [
        "Un mismo código base opera hoy cualquier cantidad de restaurantes, cada uno completamente aislado a nivel de consulta",
        "Un Kanban de cocina en tiempo real reemplazó el riel de comandas en papel, con arrastrar y soltar y gestos táctiles para tablets",
        "Un sistema de \"tiquetera\" prepagada — común en cafeterías de trabajo en Colombia — integrado como método de pago de primera clase, no agregado después",
      ],
    },
  },
  "precepto-legal-realestate": {
    gallery: [
      {
        image: "precepto-services",
        caption: "Tres formas de hacer negocio con una propiedad — arriendo, venta o anticresis, cada una con su propio checklist legal",
      },
      {
        image: "precepto-legal-areas",
        caption: "Las otras áreas de práctica de la firma, junto al mercado inmobiliario",
      },
    ],
    industry: "Servicios Legales",
    metrics: [
      { label: "Control de acceso", value: "3 roles vía Supabase RLS" },
      { label: "Base de datos", value: "19 migraciones, PostgreSQL" },
      { label: "Idiomas", value: "Español / Inglés (next-intl)" },
    ],
    summary:
      "El mercado inmobiliario de una firma legal, con verificación jurídica integrada — publicaciones que la firma realmente puede respaldar.",
    description:
      "Un mercado de propiedades y sitio de servicios legales para una consultora jurídica familiar en Ipiales — arriendos, ventas y anticresis que llevan la verificación de la firma, no solo una cartelera abierta donde cualquiera publica.",
    highlights: [
      "Mercado Inmobiliario",
      "Bilingüe (ES/EN)",
      "Flujo Documental",
    ],
    caseStudy: {
      challenge:
        "El producto real de una firma legal es la confianza, pero un mercado inmobiliario donde cualquiera publica lo que sea erosiona justamente eso. Precepto necesitaba abrir su mercado inmobiliario a publicaciones públicas — arriendos, ventas, anticresis — sin renunciar a la verificación legal que es el servicio que realmente vende.",
      solution:
        "Se construyó un modelo híbrido en vez de uno completamente abierto: los propietarios publican sus propias propiedades, pero cada publicación entra a una cola de verificación reversible — pendiente, aprobada o rechazada — con el propio flujo documental de la firma detrás: almacenamiento privado y contratos llevados hasta la firma. Tres roles — administrador, propietario, cliente — ven solo su propia porción mediante seguridad a nivel de fila en Postgres, no validaciones en la capa de aplicación, fáciles de hacer mal.",
      results: [
        "Un sitio bilingüe (ES/EN) de mercado inmobiliario y servicios legales corriendo en un solo código base de Next.js",
        "Un flujo de verificación de propiedades reversible — pendiente, aprobada, rechazada — en vez de una puerta de un solo sentido",
        "Un módulo documental con almacenamiento privado que cubre contratos desde el borrador hasta la firma",
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
/**
 * Path to a project's photo. Centralised so the format lives in one place —
 * it was repeated across five call sites, which is how a format change turns
 * into a hunt.
 *
 * WebP: the source JPEGs were 700KB–1MB each at 1024×1024 and made a
 * case-study page transfer 864KB against 108KB everywhere else. Same
 * dimensions, ~86% smaller.
 */
export function projectImageSrc(image: string): string {
  return `/projects/${image}.webp`;
}

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
