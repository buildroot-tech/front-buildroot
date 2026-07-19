import { Hero } from "@/components/home/Hero";
import { HeroTransition } from "@/components/home/HeroTransition";
import { Services } from "@/components/home/Services";
import { Highlights } from "@/components/home/Highlights";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroTransition />
      <Services />
      <Highlights />
      <CTA />
    </>
  );
}
