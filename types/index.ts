export type ProjectCategory =
  "All" | "SaaS" | "Web Apps" | "Consulting" | "Labs";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  challenge: string;
  solution: string;
  results: string[];
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
  demoUrl?: string;
  githubUrl?: string;
  isLab?: boolean;
}
