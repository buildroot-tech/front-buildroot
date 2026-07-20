import { Hero } from "@/components/home/Hero";
import { HeroTransition } from "@/components/home/HeroTransition";
import { Services } from "@/components/home/Services";
import { WorkSection } from "@/components/work/WorkSection";
import { Highlights } from "@/components/home/Highlights";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <HeroTransition />
      <section id="services">
        <Services />
      </section>
      <section id="work">
        <WorkSection />
      </section>
      <section id="highlights">
        <Highlights />
      </section>
      <section id="cta">
        <CTA />
      </section>
    </>
  );
}
