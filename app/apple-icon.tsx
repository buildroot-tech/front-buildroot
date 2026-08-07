import { ImageResponse } from "next/og";

// iOS home-screen icon. Generated rather than shipped as a PNG so it stays
// in lockstep with the SVG mark instead of drifting as a stale export.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
        }}
      >
        {/* Geometry copied from public/brand/buildroot-mark-b-white.svg —
            Satori can't reach /public, so it has to be inline. */}
        <svg width={116} height={97} viewBox="0 0 1225 1027">
          <g transform="translate(40,800) scale(1,-1)" fill="#FFFFFF">
            <g transform="translate(-55,0)">
              <path d="M354 -10Q308 -10 266.5 8.0Q225 26 197 60H187L165 0H55V760H197V583Q197 549 191 475H197Q223 516 265.5 536.0Q308 556 357 556Q428 556 473.0 518.0Q518 480 539.0 416.5Q560 353 560 275Q560 195 538.0 130.5Q516 66 470.5 28.0Q425 -10 354 -10ZM305 110Q413 110 413 276Q413 359 385.0 397.5Q357 436 304 436Q256 436 226.5 400.5Q197 365 197 276Q197 191 225.5 150.5Q254 110 305 110Z" />
              <path d="M0 -187V-67H600V-187Z" transform="translate(600,0)" />
            </g>
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
