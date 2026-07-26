import { Hero } from "@/components/home/Hero";
import { HeroTransition } from "@/components/home/HeroTransition";
import { WorkflowSteps } from "@/components/home/WorkflowSteps";
import { SelectWork } from "@/components/home/SelectWork";
import { CTA } from "@/components/home/CTA";
import { getDictionary, Locale } from "@/lib/dictionaries";

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
        <SelectWork dict={dict} />
      </section>
      <section id="cta">
        <CTA dict={dict.home.cta} />
      </section>
    </>
  );
}
