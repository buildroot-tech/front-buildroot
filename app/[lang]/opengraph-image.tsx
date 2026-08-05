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

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tagline = TAGLINE[lang] ?? TAGLINE.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#000000",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 140,
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
            marginTop: 24,
            fontSize: 40,
            fontWeight: 400,
            color: "#94a3b8",
            letterSpacing: "0.02em",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
