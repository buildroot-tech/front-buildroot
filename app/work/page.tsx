import type { Metadata } from "next";
import { WorkSection } from "@/components/work/WorkSection";

export const metadata: Metadata = {
  title: "Selected Work — buildroot_",
  description:
    "Explore case studies and web development projects built by buildroot_ software studio. High performance SaaS, Next.js web applications, and cloud architecture.",
};

export default function WorkPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <WorkSection />
    </div>
  );
}
