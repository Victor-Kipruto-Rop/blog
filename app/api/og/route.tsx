import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "DataForge Log";
  const label = searchParams.get("label") || "Engineering Blog";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0e1a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "#fff",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: "#3ddc97",
              boxShadow: "0 0 20px rgba(61, 220, 151, 0.35)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "22px", color: "#94a3b8", letterSpacing: "0.24em" }}>/ / {label}</span>
            <span style={{ fontSize: "36px", fontWeight: 700 }}>{title}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "18px" }}>DataForge Log</p>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "18px" }}>victor-kipruto-rop.github.io</p>
          </div>
          <div
            style={{
              display: "inline-flex",
              padding: "12px 18px",
              borderRadius: "999px",
              background: "rgba(61, 220, 151, 0.15)",
              color: "#3ddc97",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            SYSTEM ONLINE
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
