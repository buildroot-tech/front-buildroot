import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
import { ProjectDetail } from "@/components/work/ProjectDetail";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { buildAlternates } from "@/lib/seo";

// Colour behind the browser chrome on mobile — this page opens on
// #f5f5f0, so the status-bar area matches instead of falling back
// to the browser default (a white band above a dark page on iOS).
export const viewport: Viewport = {
  themeColor: "#f5f5f0",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProjects(lang as Locale).find((p) => p.id === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: buildAlternates(lang as Locale, `/work/${slug}`),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = getProjects(lang as Locale).find((p) => p.id === slug);

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
