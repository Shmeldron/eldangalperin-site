import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Default social card for every route (case studies inherit it unless they
// define their own). Dark theme matching the site, with the emerald→cyan accent.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0f",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontFamily: "monospace",
            color: "#34d399",
          }}
        >
          ~/ {site.name.toLowerCase().replace(" ", "-")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              color: "#e7e9f0",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            I build digital products
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              backgroundImage: "linear-gradient(110deg, #34d399, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            end to end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 30,
            color: "#9aa0b4",
          }}
        >
          <span>{site.name}</span>
          <span style={{ fontFamily: "monospace", color: "#5c6178", fontSize: 24 }}>
            {site.role}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
