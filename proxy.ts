import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es'];
const defaultLocale = 'en';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Next's generated metadata routes live at the root and have no file
  // extension, so the `includes('.')` check below doesn't catch them — left
  // alone they'd be rewritten to /en/apple-icon and 404.
  const METADATA_ROUTES = ['/icon', '/apple-icon', '/opengraph-image', '/twitter-image', '/manifest'];

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    METADATA_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return; 
  }

  // Rewrite to the default locale for clean URLs
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}
