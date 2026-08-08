import { Poppins, Crimson_Pro, Geist_Mono } from "next/font/google";

/**
 * The site's three typefaces, defined once.
 *
 * They live here rather than in a layout because two layouts need them:
 * app/[lang]/layout.tsx for the site itself, and app/style-guide/layout.tsx
 * for the reference page. A style guide rendering different fonts from the
 * pages it documents is worse than no style guide.
 */

// Primary typeface — body copy, navbar, footer, and everything on /work.
export const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Secondary typeface — reserved for giant display headlines only (home's
// hero and CTA manifesto, the giant project-title lists on /work, the
// /contact and /about statement headlines, footer contact info, giant
// slide titles on /services). Never body copy, never small text/buttons.
// A plain book serif — elongated, low-contrast, not editorial/decorative.
// Only 300 (font-light, used everywhere) and 700 (Hero.tsx's inline
// `fontWeight: 700` override on the main headline) are ever rendered.
export const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "700"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

/** Every font variable, for the element that scopes them. */
export const fontVariables = `${poppins.variable} ${crimsonPro.variable} ${geistMono.variable}`;
