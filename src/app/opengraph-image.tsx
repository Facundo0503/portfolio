import { ImageResponse } from "next/og";

export const alt = "cfacu.ai — Sistemas con IA para negocios reales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "900px",
            height: "500px",
            display: "flex",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.2) 0%, transparent 65%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                background: "#6366f1",
                color: "#0d0d0d",
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              c
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  color: "#f0f0f0",
                  fontSize: "30px",
                  fontWeight: 700,
                  letterSpacing: "-1.5px",
                }}
              >
                facu
              </span>
              <span
                style={{
                  color: "#6366f1",
                  fontSize: "30px",
                  fontWeight: 700,
                  letterSpacing: "-1.5px",
                }}
              >
                .ai
              </span>
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "baseline",
              fontSize: "68px",
              fontWeight: 800,
              textAlign: "center",
              letterSpacing: "-2.5px",
              lineHeight: "1.08",
              maxWidth: "920px",
              marginBottom: "24px",
              gap: "16px",
            }}
          >
            <span style={{ color: "#f0f0f0" }}>Tu negocio puede</span>
            <span style={{ color: "#6366f1" }}>correr solo.</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              color: "rgba(240,240,240,0.5)",
              fontSize: "24px",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
              marginBottom: "48px",
            }}
          >
            Automatizaciones, SaaS y sistemas con IA para negocios en LATAM
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "64px",
              alignItems: "center",
            }}
          >
            {[
              { value: "2-4 sem", label: "Del diagnóstico al deploy" },
              { value: "1 SaaS", label: "Live en producción hoy" },
              { value: "6 hs/sem", label: "De trabajo manual eliminado" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    color: "#6366f1",
                    fontSize: "28px",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    color: "rgba(240,240,240,0.35)",
                    fontSize: "14px",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
