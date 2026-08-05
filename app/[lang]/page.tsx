import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HeroTransition } from "@/components/home/HeroTransition";
import { WorkflowSteps } from "@/components/home/WorkflowSteps";
import { SelectWork } from "@/components/home/SelectWork";
import { CTA } from "@/components/home/CTA";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getProjects } from "@/lib/projects";
import { siteConfig, buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const { line1, line2, line3 } = dict.home.hero;

  return {
    title: `${line1} ${line2} ${line3}`,
    description: siteConfig.description,
    alternates: buildAlternates(lang as Locale),
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <section id="hero">
        <Hero dict={dict.home.hero} />
      </section>
      <HeroTransition />
      <section id="process">
        <WorkflowSteps dict={dict.home.process} />
      </section>
      <section id="work">
        <SelectWork dict={dict.home.work} projects={getProjects(lang as Locale)} />
      </section>
      <section id="cta">
        <CTA dict={dict.home.cta} />
      </section>
    </>
  );
}
