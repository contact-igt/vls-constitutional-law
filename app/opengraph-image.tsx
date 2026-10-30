import { ImageResponse } from "next/og";

export const alt = "Constitutional Law & Practice Boot Camp at VLS Law Academy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Text-only card in the VLS palette. No logo or photograph is used until VLS approves the assets.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF8F5",
          padding: "64px 72px",
          borderLeft: "20px solid #AE1015",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, fontWeight: 700, color: "#AE1015" }}>
          VLS LAW ACADEMY  |  PRACTICAL LEGAL TRAINING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1.05, color: "#161616" }}>
            Constitutional Law & Practice Boot Camp
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#5C5A57" }}>
            Understand the Constitution. Learn the Remedies. Explore Court Practice.
          </div>
        </div>
        <div style={{ display: "flex", width: 160, height: 6, background: "#C8A46B" }} />
      </div>
    ),
    size,
  );
}
