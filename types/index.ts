export type ProjectCategory =
  "All" | "SaaS" | "Web Apps" | "Consulting" | "Labs";

interface ProjectMetric {
  label: string;
  value: string;
}

interface CaseStudy {
  challenge: string;
  solution: string;
  results: string[];
}

/** One additional view in a case study's gallery strip — a real screenshot
 *  of a section beyond the hero, with a short caption naming what it shows. */
export interface ProjectGalleryImage {
  image: string;
  caption: string;
}

export interface Project {
  id: string;
  indexCode: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  featured: boolean;
  tags: string[];
  highlights: [string, string, string];
  metrics: ProjectMetric[];
  caseStudy: CaseStudy;
  image?: string;
  /** Extra views beyond the hero — only for projects with real material to
   *  show. Omit rather than invent images for a project that doesn't have
   *  any. */
  gallery?: ProjectGalleryImage[];
  demoUrl?: string;
  githubUrl?: string;
  isLab?: boolean;
}
