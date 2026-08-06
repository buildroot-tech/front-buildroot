"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type LocaleLinkProps = ComponentProps<typeof Link>;

const LOCALE_PREFIX = /^\/(en|es)(\/|$)/;

/**
 * next/link that keeps you in the language you're already reading.
 *
 * Routes live under /[lang], and proxy.ts rewrites any un-prefixed path to
 * the default locale — so a plain `href="/work"` doesn't mean "work in the
 * current language", it means "work in English". Following one from /es
 * silently dropped the visitor back into English mid-session. This reads the
 * locale off the current pathname and carries it over.
 *
 * Use plain next/link for the language switcher itself, which deliberately
 * builds the *other* locale's path.
 */
export function LocaleLink({ href, ...rest }: LocaleLinkProps) {
  const pathname = usePathname();

  let resolved = href;
  if (typeof href === "string" && href.startsWith("/") && !LOCALE_PREFIX.test(href)) {
    const match = pathname.match(LOCALE_PREFIX);
    const locale = match?.[1];
    // "en" is what an un-prefixed path already resolves to, so only "es"
    // needs rewriting — that keeps English URLs clean.
    if (locale === "es") {
      resolved = href === "/" ? "/es" : `/es${href}`;
    }
  }

  return <Link href={resolved} {...rest} />;
}
