import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es"];

// Spanish, because the market is Ipiales, Nariño and northern Ecuador. The
// bare domain is the URL people link and share, so it is the one that
// accumulates the most authority — pointing it at English worked directly
// against the local search the site exists for.
//
// This also decides what a plain href="/work" resolves to, which is why
// internal links go through LocaleLink instead.
const defaultLocale = "es";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Routes that live at the app root rather than under app/[lang], and so
  // must never be rewritten into /en/... — that rewrite lands on a path that
  // does not exist and 404s.
  //
  // Next's generated metadata routes have no file extension, so the
  // `includes('.')` check below doesn't catch them. /style-guide is an
  // internal reference page with no translated counterpart.
  const UNLOCALIZED_ROUTES = [
    "/icon",
    "/apple-icon",
    "/opengraph-image",
    "/twitter-image",
    "/manifest",
    "/style-guide",
  ];

  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api") ||
    UNLOCALIZED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    )
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  // Rewrite to the default locale for clean URLs
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}
