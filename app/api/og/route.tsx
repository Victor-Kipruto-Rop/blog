import { ImageResponse } from "next/og";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Engineering Notes").slice(0, 90);
  const label = (searchParams.get("label") || "Victor Kipruto Rop").slice(0, 50);

  return new ImageResponse(
    (
      <div style={{ background: "#f5f0e8", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "76px", color: "#0a0e14", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#c8401a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: 700 }}>V</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: "20px", letterSpacing: "2px", color: "#7a7060" }}>{label}<span style={{ fontSize: "13px", marginTop: "5px" }}>ENGINEERING JOURNAL</span></div>
        </div>
        <div style={{ display: "flex", fontSize: "58px", lineHeight: 1.12, fontWeight: 700, maxWidth: "1000px", letterSpacing: "-2px" }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px", color: "#7a7060" }}>
          <span>Data Engineering · FinTech · Systems</span>
          <span style={{ color: "#c8401a" }}>blog.victorkipruto.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
