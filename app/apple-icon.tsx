import { ImageResponse } from "next/og";

// Apple touch icon — the same "E" monogram + emerald underline as app/icon.svg,
// rasterized so an iOS home-screen bookmark matches the browser-tab favicon.
// iOS masks the corners itself, so the whole square is filled with the ink bg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#18181b",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            fontFamily: "sans-serif",
            color: "#fafafa",
            lineHeight: 1,
          }}
        >
          E
        </div>
        <div
          style={{
            marginTop: 16,
            width: 66,
            height: 13,
            borderRadius: 7,
            background: "#34d399",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
