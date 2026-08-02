import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { ProjectDetail } from "@/components/work/ProjectDetail";
import { getDictionary, Locale } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return { title: "Project Not Found — buildroot_" };
  }

  return {
    title: `${project.title} — buildroot_`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <div
      className="pt-16 sm:pt-20 bg-[var(--bg-primary)]"
      style={{ "--bg-primary": "var(--bg-work)" } as React.CSSProperties}
    >
      <ProjectDetail project={project} dict={dict.work.detail} />
    </div>
  );
}
