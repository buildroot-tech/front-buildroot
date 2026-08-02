export interface RouteTheme {
  bg: string;
  text: string;
  border: string;
}

// Single source of truth for the background/text/border assigned to each
// top-level section. Header and Footer both read from this so a section's
// color never drifts between the two.
export const routeThemes: Record<string, RouteTheme> = {
  "/": {
    bg: "var(--bg-primary)",
    text: "var(--text-primary)",
    border: "var(--border)",
  },
  "/work": {
    bg: "var(--bg-work)",
    text: "var(--text-primary)",
    border: "var(--border)",
  },
  "/services": {
    bg: "var(--accent)",
    text: "#ffffff",
    border: "#ffffff",
  },
  "/about": {
    bg: "#000000",
    text: "#ffffff",
    border: "#ffffff",
  },
};

export function normalizeLocalePathname(pathname: string): string {
  return pathname.replace(/^\/(en|es)(\/|$)/, "/").replace(/\/$/, "") || "/";
}

export function getRouteTheme(pathname: string): RouteTheme {
  const normalized = normalizeLocalePathname(pathname);

  if (routeThemes[normalized]) return routeThemes[normalized];

  // Nested routes (e.g. /work/[slug]) inherit their parent section's theme.
  const parentKey = Object.keys(routeThemes)
    .filter((key) => key !== "/" && normalized.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];

  return routeThemes[parentKey] ?? routeThemes["/"];
}
