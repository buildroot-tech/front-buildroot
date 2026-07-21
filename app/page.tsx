import { Hero } from "@/components/home/Hero";
import { HeroTransition } from "@/components/home/HeroTransition";
import { WorkflowSteps } from "@/components/home/WorkflowSteps";
import { SelectWork } from "@/components/home/SelectWork";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <HeroTransition />
      <section id="process">
        <WorkflowSteps />
      </section>
      <section id="work">
        <SelectWork />
      </section>
      <section id="cta">
        <CTA />
      </section>
    </>
  );
}
