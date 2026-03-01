import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Subhan Ghafoor — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG Image Design Skill: Dark background outperforms light in feeds
// Golden layout: title left + visual right, 40px safe zone padding
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#0a192f",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid (stays within safe zone) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(100,255,218,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.035) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Gradient glow orbs */}
        <div style={{
          position: "absolute", top: "-120px", right: "-80px",
          width: "520px", height: "520px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,255,218,0.14) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", left: "180px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,112,243,0.1) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "30%",
          width: "250px", height: "250px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }} />

        {/* LEFT: Text content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, zIndex: 1, paddingRight: "60px" }}>
          {/* Logo badge */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "58px", height: "58px",
            borderRadius: "12px",
            border: "2px solid rgba(100,255,218,0.5)",
            background: "rgba(100,255,218,0.07)",
            color: "#64ffda", fontSize: "22px", fontWeight: 800,
            marginBottom: "28px",
            letterSpacing: "1px",
          }}>
            SG
          </div>

          {/* Name — 48-64px per OG skill */}
          <div style={{
            fontSize: "68px", fontWeight: 800,
            color: "#ccd6f6",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: "14px",
          }}>
            Subhan Ghafoor
          </div>

          {/* Role — subtitle 20-28px per OG skill */}
          <div style={{
            fontSize: "26px",
            color: "#64ffda",
            marginBottom: "28px",
            letterSpacing: "0.3px",
            fontWeight: 500,
          }}>
            Full Stack Developer
          </div>

          {/* Tech tags */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["TypeScript", "Next.js", "Python", "AI Tools", "Three.js"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: "15px",
                  color: "#8892b0",
                  background: "rgba(100,255,218,0.06)",
                  border: "1px solid rgba(100,255,218,0.18)",
                  borderRadius: "6px",
                  padding: "5px 14px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Stats block */}
        <div style={{
          display: "flex", flexDirection: "column", gap: "14px",
          zIndex: 1, minWidth: "240px",
        }}>
          {[
            { value: "3",    label: "Hackathons" },
            { value: "20+",  label: "Repositories" },
            { value: "2+",   label: "Years Coding" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(17,34,64,0.75)",
              border: "1px solid rgba(100,255,218,0.12)",
              borderRadius: "12px",
              padding: "16px 22px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "#ccd6f6", letterSpacing: "-1px", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "13px", color: "#8892b0", marginTop: "6px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom URL (within safe zone) */}
        <div style={{
          position: "absolute", bottom: "48px", left: "60px",
          fontSize: "16px", color: "#4a5568",
          zIndex: 1,
        }}>
          github.com/subhanbaloch18 · subhanghafoor2006@gmail.com
        </div>
      </div>
    ),
    { ...size }
  );
}
