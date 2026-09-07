#!/usr/bin/env bash
# validate-locale.sh — Checks that the three-point locale agreement holds.
# proxy.ts (defaultLocale), LocaleLink.tsx (DEFAULT_LOCALE), and
# seo.ts (x-default in buildAlternates) must all agree on "es".
#
# Exit 0 = all agree, Exit 1 = mismatch found.

set -euo pipefail

EXPECTED="es"
ERRORS=0

# 1. proxy.ts — const defaultLocale = "es";
PROXY_DEFAULT=$(grep -oP 'const defaultLocale\s*=\s*"\K[^"]+' proxy.ts || true)
if [ "$PROXY_DEFAULT" != "$EXPECTED" ]; then
  echo "MISMATCH: proxy.ts defaultLocale = \"$PROXY_DEFAULT\" (expected \"$EXPECTED\")"
  ERRORS=$((ERRORS + 1))
else
  echo "OK: proxy.ts defaultLocale = \"$PROXY_DEFAULT\""
fi

# 2. LocaleLink.tsx — const DEFAULT_LOCALE = "es";
LOCALE_LINK=$(grep -oP 'const DEFAULT_LOCALE\s*=\s*"\K[^"]+' components/ui/LocaleLink.tsx || true)
if [ "$LOCALE_LINK" != "$EXPECTED" ]; then
  echo "MISMATCH: LocaleLink.tsx DEFAULT_LOCALE = \"$LOCALE_LINK\" (expected \"$EXPECTED\")"
  ERRORS=$((ERRORS + 1))
else
  echo "OK: LocaleLink.tsx DEFAULT_LOCALE = \"$LOCALE_LINK\""
fi

# 3. seo.ts — "x-default": `/es${path}`,
X_DEFAULT=$(grep 'x-default' lib/seo.ts | grep -oP '/\K[a-z]+' | head -1 || true)
if [ "$X_DEFAULT" != "$EXPECTED" ]; then
  echo "MISMATCH: seo.ts x-default prefix = \"$X_DEFAULT\" (expected \"$EXPECTED\")"
  ERRORS=$((ERRORS + 1))
else
  echo "OK: seo.ts x-default prefix = \"$X_DEFAULT\""
fi

if [ $ERRORS -gt 0 ]; then
  echo ""
  echo "FAILED: $ERRORS locale agreement violation(s) found."
  echo "All three files must agree on the default locale."
  exit 1
else
  echo ""
  echo "PASSED: All three locale points agree on \"$EXPECTED\"."
  exit 0
fi
