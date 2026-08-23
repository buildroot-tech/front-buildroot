// Single source of truth for the per-service slide colors used by
// ServicesSection's scroll-stacking slides and mirrored by Header (which
// borrows whichever slide is currently in view — see the "Services" effect
// in components/layout/Header.tsx). Lives outside ServicesSection.tsx so
// Header, mounted on every route, doesn't pull that page's whole component
// tree into its bundle just to read three colors.
export const SERVICE_KEYS = ["web", "consulting", "saas"] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_COLORS: Record<ServiceKey, { bg: string; text: string }> = {
  web: { bg: "#0A0A0A", text: "#ffffff" },
  consulting: { bg: "var(--accent)", text: "#ffffff" },
  saas: { bg: "#e2e8f0", text: "#000000" },
};
