import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          background: "linear-gradient(135deg, #eef2ff 0%, #c7d2fe 50%, #bfdbfe 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#16a34a", fontWeight: 600 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="40" height="40">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>100% private • Local processing</span>
        </div>

        <h1 style={{ fontSize: 64, margin: "24px 0 12px", letterSpacing: -1, color: "#1e1b4b" }}>
          Watermark
        </h1>
        <p style={{ fontSize: 30, maxWidth: 780, lineHeight: 1.3, color: "#1f2937" }}>
          Add watermarks to PDFs and images privately, right in your browser.
        </p>

        <div style={{ marginTop: 48, display: "flex", gap: 16, color: "#312e81", fontSize: 22 }}>
          <span>PDF & images</span>
          <span>•</span>
          <span>No uploads</span>
          <span>•</span>
          <span>Free</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
