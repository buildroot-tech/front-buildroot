import type { Metadata, Viewport } from "next";
import { Hero } from "@/components/home/Hero";
import { HeroTransition } from "@/components/home/HeroTransition";
import { WorkflowSteps } from "@/components/home/WorkflowSteps";
import { SelectWork } from "@/components/home/SelectWork";
import { CTA } from "@/components/home/CTA";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getProjects } from "@/lib/projects";
import { buildAlternates, localizedSeo } from "@/lib/seo";

// Colour behind the browser chrome on mobile — this page opens on
// #000000, so the status-bar area matches instead of falling back
// to the browser default (a white band above a dark page on iOS).
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const copy = localizedSeo[lang as Locale] ?? localizedSeo.es;

  // The homepage title is the strongest ranking signal the site has, so it
  // states the service and the place. It used to repeat the hero headline
  // ("Creamos Productos Digitales.") — good copy, but it names neither what
  // we do nor where we are, which is what people actually search for.
  return {
    title: copy.title,
    description: copy.description,
    keywords: [...copy.keywords],
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
