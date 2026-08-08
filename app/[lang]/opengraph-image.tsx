import { ImageResponse } from "next/og";

// Applies to every route under /[lang] that doesn't define its own
// opengraph-image (i.e. the whole site) — see Next.js file-based
// metadata conventions.
export const alt = "buildroot_ — Digital Products & Engineering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const TAGLINE: Record<string, string> = {
  en: "Digital Products & Engineering",
  es: "Productos Digitales e Ingeniería",
};

// The "b_" mark, inlined rather than fetched. Satori renders the OG image
// in an isolated environment with no access to /public, so pointing at a
// file there yields a blank frame — the geometry has to travel with the
// component. Paths are lifted verbatim from
// public/brand/buildroot-mark-b-white.svg; keep them in sync if the mark
// is ever redrawn.
function BrandMark({ size: markSize }: { size: number }) {
  return (
    <svg
      width={markSize}
      height={markSize * (1027 / 1225)}
      viewBox="0 0 1225 1027"
    >
      <g transform="translate(40,800) scale(1,-1)" fill="#f8fafc">
        <g transform="translate(-55,0)">
          <path d="M354 -10Q308 -10 266.5 8.0Q225 26 197 60H187L165 0H55V760H197V583Q197 549 191 475H197Q223 516 265.5 536.0Q308 556 357 556Q428 556 473.0 518.0Q518 480 539.0 416.5Q560 353 560 275Q560 195 538.0 130.5Q516 66 470.5 28.0Q425 -10 354 -10ZM305 110Q413 110 413 276Q413 359 385.0 397.5Q357 436 304 436Q256 436 226.5 400.5Q197 365 197 276Q197 191 225.5 150.5Q254 110 305 110Z" />
          <path d="M0 -187V-67H600V-187Z" transform="translate(600,0)" />
        </g>
      </g>
    </svg>
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tagline = TAGLINE[lang] ?? TAGLINE.en;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000000",
        padding: "80px",
      }}
    >
      <div style={{ display: "flex" }}>
        <BrandMark size={190} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 120,
            fontWeight: 700,
            color: "#f8fafc",
            letterSpacing: "-0.02em",
          }}
        >
          <span>buildroot</span>
          <span style={{ color: "#2563eb" }}>_</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 38,
            fontWeight: 400,
            color: "#94a3b8",
            letterSpacing: "0.02em",
          }}
        >
          {tagline}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
