import { ImageResponse } from "next/og";
import { HERO, SITE } from "@/lib/constants";

export const alt = `${SITE.name} — Estudio de productos digitales`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f9f5eb",
          color: "#1a4d4e",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8ba888",
              marginBottom: 24,
            }}
          >
            {HERO.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            {HERO.headline} {HERO.headlineAccent}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#4a5f5e",
              maxWidth: 900,
            }}
          >
            {HERO.tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 48,
              fontSize: 26,
              color: "#e67e66",
              fontWeight: 600,
            }}
          >
            {SITE.name}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
