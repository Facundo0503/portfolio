"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type LeadOSView = "Pipeline" | "Dashboard" | "Lead";

// ─── Design tokens ────────────────────────────────────────────────────────────
const LO = {
  bg: "#0a0a0a",
  card: "#141414",
  cardAlt: "#101010",
  border: "#252525",
  borderSoft: "#1c1c1c",
  text: "#fafafa",
  dim: "#a1a1aa",
  dimmer: "#71717a",
  emerald: "#10b981",
  emeraldStrong: "rgba(16,185,129,0.15)",
  blue: "#60a5fa",
  amber: "#fbbf24",
  orange: "#fb923c",
  violet: "#c084fc",
  green: "#34d399",
  gray: "#3f3f46",
} as const;

// ─── Stage config ─────────────────────────────────────────────────────────────
const STAGES = [
  { key: "Nuevo",      color: "#6366f1"  },
  { key: "Contactado", color: LO.blue    },
  { key: "Interesado", color: LO.amber   },
  { key: "Visita",     color: LO.orange  },
  { key: "Propuesta",  color: LO.violet  },
  { key: "Cerrado",    color: LO.green   },
] as const;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IC = {
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  funnel:  "M3 4h18l-7 9v6l-4 2v-8z",
  users:   "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M17 3.13a4 4 0 0 1 0 7.75",
  stats:   "M3 21h18M5 17V10M10 17V6M15 17v-9M20 17v-4",
  settings:"M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  logout:  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  plus:    "M12 5v14M5 12h14",
  search:  "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM21 21l-4.35-4.35",
  filter:  "M22 3H2l8 9.46V19l4 2v-8.54z",
  clock:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  wa:      "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  brain:   "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.76-3.64 3 3 0 0 1-2.78-2 3 3 0 0 1 2.78-4.16 2.5 2.5 0 0 1 4.22-2.25M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.76-3.64 3 3 0 0 0 2.78-2 3 3 0 0 0-2.78-4.16 2.5 2.5 0 0 0-4.22-2.25",
  arrow:   "M5 12h14M12 5l7 7-7 7",
  home:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  check:   "M20 6L9 17l-5-5",
  note:    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  more:    "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
} as const;

// ─── Primitives ───────────────────────────────────────────────────────────────
function Ico({ d, size = 16, stroke = 1.6 }: { d: string; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function LOLogo({ size = 36 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 9,
      background: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 900, fontSize: size * 0.32, letterSpacing: "-0.02em",
      boxShadow: "0 4px 14px rgba(16,185,129,0.28)",
    }}>LO</div>
  );
}

function Av({ initials, color = LO.emerald, size = 32 }: { initials: string; color?: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `${color}22`, border: `1px solid ${color}55`,
      color, fontWeight: 700, fontSize: size * 0.34, letterSpacing: "0.04em",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>{initials}</div>
  );
}

function Bdg({ children, color = LO.emerald }: { children: ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "2px 8px",
      borderRadius: 999, background: `${color}25`, color,
      border: `1px solid ${color}55`, fontSize: 10.5, fontWeight: 600, lineHeight: 1.6,
    }}>{children}</span>
  );
}

// ─── Top Navigation ───────────────────────────────────────────────────────────
function TopNav({ active }: { active: string }) {
  const items = [
    { key: "Pipeline",      label: "Pipeline",      d: IC.funnel   },
    { key: "Dashboard",     label: "Dashboard",     d: IC.grid     },
    { key: "Lead",          label: "Mis Leads",     d: IC.users    },
    { key: "Reportes",      label: "Reportes",      d: IC.stats    },
    { key: "Configuracion", label: "Configuración", d: IC.settings },
  ];
  return (
    <nav style={{
      height: 52, flexShrink: 0, background: LO.bg,
      borderBottom: `1px solid ${LO.border}`,
      display: "flex", alignItems: "center", padding: "0 24px", gap: 0,
    }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 28, paddingRight: 28, borderRight: `1px solid ${LO.borderSoft}` }}>
        <LOLogo size={32} />
        <div>
          <div style={{ color: LO.text, fontWeight: 700, fontSize: 14, lineHeight: 1.1 }}>LeadOS</div>
          <div style={{ color: LO.dim, fontSize: 10.5, marginTop: 1 }}>Martín Giménez · Agente</div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        {items.map(it => {
          const on = it.key === active;
          return (
            <div key={it.key} style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "7px 14px", borderRadius: 7,
              background: on ? LO.emeraldStrong : "transparent",
              color: on ? LO.emerald : LO.dim,
              fontSize: 13, fontWeight: on ? 600 : 500,
            }}>
              <Ico d={it.d} size={14} /><span>{it.label}</span>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 7,
          padding: "6px 12px", display: "flex", alignItems: "center", gap: 7, color: LO.dim, fontSize: 12,
        }}>
          <Ico d={IC.search} size={13} />
          <span style={{ width: 110 }}>Buscar lead…</span>
        </div>
        <div style={{
          background: LO.emerald, borderRadius: 7, padding: "7px 14px",
          color: "#fff", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
        }}>
          <Ico d={IC.plus} size={14} /> Nuevo lead
        </div>
      </div>
    </nav>
  );
}

// ─── View: Pipeline ───────────────────────────────────────────────────────────
type Lead = { name: string; prop: string; source: string; since: string; hot?: boolean };

const pipelineData: Record<string, Lead[]> = {
  Nuevo: [
    { name: "Valentina Ríos",   prop: "Dpto 2amb · Palermo",   source: "Zonaprop",   since: "4hs" },
    { name: "Ricardo Montes",   prop: "PH · Belgrano",         source: "Instagram",  since: "6hs" },
    { name: "Camila Espinoza",  prop: "Dpto 3amb · Caballito", source: "Formulario", since: "8hs" },
  ],
  Contactado: [
    { name: "Andrés Herrera",   prop: "Loft · Almagro",        source: "ML",         since: "2d" },
    { name: "Florencia Nadal",  prop: "Dpto 1amb · Recoleta",  source: "Zonaprop",   since: "1d" },
  ],
  Interesado: [
    { name: "Gabriel Torres",   prop: "Dpto 2amb · Palermo",   source: "Zonaprop",   since: "2hs", hot: true },
    { name: "M. Cecilia Vega",  prop: "PH · Palermo",          source: "Instagram",  since: "5hs" },
    { name: "Sebastián López",  prop: "Dpto 3amb · Belgrano",  source: "ML",         since: "1d" },
  ],
  Visita: [
    { name: "Patricia Morales", prop: "Dpto 2amb · Coghlan",   source: "Zonaprop",   since: "3hs", hot: true },
    { name: "Diego Castillo",   prop: "Dúplex · Núñez",        source: "Instagram",  since: "2d" },
  ],
  Propuesta: [
    { name: "Luciana Fernández",prop: "PH · Villa Urquiza",    source: "Formulario", since: "4hs" },
  ],
  Cerrado: [
    { name: "Roberto Sánchez",  prop: "Dpto 3amb · Palermo",   source: "ML",         since: "ayer" },
  ],
};

function LeadCard({ lead, stageColor }: { lead: Lead; stageColor: string }) {
  return (
    <div style={{
      background: LO.card, border: `1px solid ${lead.hot ? stageColor + "55" : LO.border}`,
      borderRadius: 9, padding: "9px 11px", display: "flex", flexDirection: "column", gap: 6,
      borderLeft: `3px solid ${stageColor}`,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
        <span style={{ color: LO.text, fontWeight: 600, fontSize: 12, lineHeight: 1.3 }}>{lead.name}</span>
        {lead.hot && <span style={{ color: LO.amber, fontSize: 10, flexShrink: 0 }}>●</span>}
      </div>
      <div style={{ color: LO.dim, fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
        <Ico d={IC.home} size={10} />{lead.prop}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ background: `${stageColor}18`, color: stageColor, border: `1px solid ${stageColor}44`, borderRadius: 999, padding: "1px 7px", fontSize: 9.5, fontWeight: 600 }}>{lead.source}</span>
        <span style={{ color: lead.hot ? LO.amber : LO.dimmer, fontSize: 10.5, display: "flex", alignItems: "center", gap: 4 }}>
          <Ico d={IC.clock} size={10} />hace {lead.since}
        </span>
      </div>
    </div>
  );
}

function ViewPipeline() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: LO.bg, minWidth: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: `1px solid ${LO.borderSoft}` }}>
        <div>
          <h2 style={{ color: LO.text, fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Pipeline</h2>
          <div style={{ color: LO.dim, fontSize: 12, marginTop: 2 }}>
            <span style={{ color: LO.text, fontWeight: 600 }}>13</span> leads activos ·{" "}
            <span style={{ color: LO.amber, fontWeight: 600 }}>2 calientes</span> requieren atención
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 7, padding: "6px 12px", color: LO.dim, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            <Ico d={IC.filter} size={13} />Filtros
          </div>
        </div>
      </div>

      {/* Kanban */}
      <div style={{ padding: "14px 24px 20px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, flex: 1, minHeight: 0, overflow: "hidden" }}>
        {STAGES.map(stage => {
          const leads = pipelineData[stage.key] ?? [];
          return (
            <div key={stage.key} style={{ background: LO.cardAlt, border: `1px solid ${LO.borderSoft}`, borderRadius: 10, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "10px 12px", borderBottom: `1px solid ${LO.borderSoft}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: stage.color }} />
                  <span style={{ color: LO.text, fontWeight: 600, fontSize: 11.5 }}>{stage.key}</span>
                </div>
                <span style={{ background: `${stage.color}20`, color: stage.color, border: `1px solid ${stage.color}50`, padding: "0 6px", borderRadius: 999, fontSize: 10, fontWeight: 700 }}>{leads.length}</span>
              </div>
              <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 7, flex: 1, overflow: "hidden" }}>
                {leads.map((lead, i) => (
                  <LeadCard key={i} lead={lead} stageColor={stage.color} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── View: Dashboard ──────────────────────────────────────────────────────────
function ViewDashboard() {
  const funnelData = [
    { stage: "Nuevo",      count: 3, pct: 100 },
    { stage: "Contactado", count: 2, pct: 67 },
    { stage: "Interesado", count: 3, pct: 100 },
    { stage: "Visita",     count: 2, pct: 67 },
    { stage: "Propuesta",  count: 1, pct: 33 },
    { stage: "Cerrado",    count: 1, pct: 33 },
  ];

  const hot = [
    { name: "Gabriel Torres",    prop: "Dpto 2amb · Palermo", stage: "Interesado", color: LO.amber,  since: "2hs" },
    { name: "Patricia Morales",  prop: "Dpto 2amb · Coghlan", stage: "Visita",     color: LO.orange, since: "3hs" },
    { name: "Luciana Fernández", prop: "PH · Villa Urquiza",  stage: "Propuesta",  color: LO.violet, since: "4hs" },
  ];

  const kpis = [
    { label: "Leads activos",     value: "13",     sub: "esta semana",          color: LO.emerald },
    { label: "Tasa conversión",   value: "7%",     sub: "nuevo → cerrado",      color: LO.green },
    { label: "Tiempo resp. prom", value: "38 min", sub: "vs. 2hs industria",    color: LO.blue },
    { label: "Sin contacto +4hs", value: "2",      sub: "requieren atención",   color: LO.amber },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: LO.bg, minWidth: 0 }}>
      <div style={{ padding: "16px 32px", borderBottom: `1px solid ${LO.borderSoft}` }}>
        <div style={{ color: LO.dimmer, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Métricas</div>
        <h2 style={{ color: LO.text, fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Dashboard</h2>
      </div>
      <div style={{ padding: "18px 32px", display: "flex", flexDirection: "column", gap: 14, flex: 1, overflow: "hidden" }}>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {kpis.map((k, i) => (
            <div key={i} style={{ background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ color: LO.dim, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{k.label}</div>
              <div style={{ color: k.color, fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{k.value}</div>
              <div style={{ color: LO.dimmer, fontSize: 11, marginTop: 4 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, flex: 1, minHeight: 0 }}>
          {/* Funnel */}
          <div style={{ background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 12, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${LO.borderSoft}`, color: LO.text, fontWeight: 600, fontSize: 13.5 }}>Embudo de conversión</div>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {funnelData.map((f, i) => {
                const stage = STAGES.find(s => s.key === f.stage);
                const color = stage?.color ?? LO.emerald;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: LO.dim, fontSize: 12, width: 82, flexShrink: 0 }}>{f.stage}</span>
                    <div style={{ flex: 1, height: 20, background: LO.border, borderRadius: 4, overflow: "hidden", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, width: `${f.pct}%`, background: `${color}35`, borderRadius: 4 }} />
                      <div style={{ position: "absolute", inset: 0, width: `${f.pct}%`, background: color, borderRadius: 4, opacity: 0.7, clipPath: "inset(0 0 50% 0)" }} />
                    </div>
                    <span style={{ color, fontWeight: 700, fontSize: 14, width: 20, textAlign: "right", flexShrink: 0 }}>{f.count}</span>
                    <span style={{ color: LO.dimmer, fontSize: 11, width: 36, flexShrink: 0 }}>{f.pct}%</span>
                  </div>
                );
              })}
              <div style={{ marginTop: 8, padding: "10px 14px", background: LO.cardAlt, borderRadius: 8, border: `1px solid ${LO.borderSoft}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {[
                    { label: "Mejor fuente",   value: "Zonaprop", color: LO.emerald },
                    { label: "Conv. promedio", value: "7.7%",     color: LO.green },
                    { label: "Días al cierre", value: "18d",      color: LO.blue },
                  ].map((m, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ color: m.color, fontSize: 15, fontWeight: 700 }}>{m.value}</div>
                      <div style={{ color: LO.dimmer, fontSize: 10.5 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hot leads */}
          <div style={{ background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${LO.borderSoft}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: LO.text, fontWeight: 600, fontSize: 13.5 }}>Leads calientes</span>
              <Bdg color={LO.amber}>Requieren acción</Bdg>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              {hot.map((h, i) => (
                <div key={i} style={{ padding: "13px 18px", borderBottom: `1px solid ${LO.borderSoft}`, display: "flex", gap: 12, alignItems: "flex-start", borderLeft: `3px solid ${h.color}` }}>
                  <Av initials={h.name.split(" ").map(w => w[0]).slice(0, 2).join("")} color={h.color} size={34} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: LO.text, fontWeight: 600, fontSize: 13 }}>{h.name}</div>
                    <div style={{ color: LO.dim, fontSize: 11.5, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                      <Ico d={IC.home} size={11} />{h.prop}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                      <Bdg color={h.color}>{h.stage}</Bdg>
                      <span style={{ color: h.color, fontSize: 10.5, display: "flex", alignItems: "center", gap: 4 }}>
                        <Ico d={IC.clock} size={10} />hace {h.since}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* AI nudge */}
              <div style={{ padding: "12px 18px", background: `${LO.emerald}0d`, borderTop: `1px solid ${LO.emerald}25` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ color: LO.emerald, marginTop: 1 }}><Ico d={IC.brain} size={14} /></div>
                  <div>
                    <div style={{ color: LO.dim, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Sugerencia IA</div>
                    <div style={{ color: LO.text, fontSize: 12, lineHeight: 1.5 }}>
                      Gabriel Torres lleva 2hs sin contacto. Mandá un WhatsApp con disponibilidad para visita — tiene señales de compra alta.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View: Lead detail ────────────────────────────────────────────────────────
function ViewLead() {
  const timeline = [
    { type: "wa_out", text: "Hola Gabriel! Vi tu consulta en Zonaprop por el dpto en Palermo...", time: "Hoy 9:42",  color: LO.emerald },
    { type: "wa_in",  text: "Sí, me interesa mucho. ¿Tiene balcón? ¿Cuánto son las expensas?",   time: "Hoy 9:58",  color: LO.green },
    { type: "wa_out", text: "¡Sí, tiene balcón corrido! Expensas $85.000/mes. ¿Podría ser una visita esta semana?", time: "Hoy 10:15", color: LO.emerald },
    { type: "note",   text: "Lead muy interesado — consultó por amenities, parking y expensas. Listo para visita.", time: "Ayer 14:30", color: LO.blue },
    { type: "wa_auto",text: "Seguimiento automático enviado (día 1)",                              time: "Ayer 09:00", color: LO.dimmer },
    { type: "capture",text: "Lead recibido via Zonaprop — consulta por dpto 2amb Palermo",        time: "Ayer 08:47", color: LO.violet },
  ];

  const typeIcon: Record<string, string> = {
    wa_out:  IC.wa,
    wa_in:   IC.wa,
    wa_auto: IC.wa,
    note:    IC.note,
    capture: IC.arrow,
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: LO.bg, minWidth: 0, overflow: "hidden" }}>
      {/* Lead header */}
      <div style={{ padding: "14px 28px", borderBottom: `1px solid ${LO.borderSoft}`, display: "flex", alignItems: "center", gap: 14 }}>
        <Av initials="GT" color={LO.amber} size={44} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h2 style={{ color: LO.text, fontSize: 19, fontWeight: 700, margin: 0 }}>Gabriel Torres</h2>
            <Bdg color={LO.amber}>Interesado</Bdg>
            <span style={{ color: LO.amber, fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
              <Ico d={IC.clock} size={11} />hace 2hs sin contacto
            </span>
          </div>
          <div style={{ color: LO.dim, fontSize: 12, marginTop: 3, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Ico d={IC.home} size={11} />Dpto 2amb · Palermo</span>
            <span>+54 11 4892-3317</span>
            <span style={{ background: `${LO.violet}20`, color: LO.violet, border: `1px solid ${LO.violet}44`, borderRadius: 999, padding: "1px 8px", fontSize: 10.5, fontWeight: 600 }}>Zonaprop</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 8, padding: "8px 14px", color: LO.text, fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <Ico d={IC.wa} size={14} />WhatsApp
          </div>
          <div style={{ background: LO.emerald, borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <Ico d={IC.check} size={14} />Agendar visita
          </div>
        </div>
      </div>

      {/* Two-panel layout */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", overflow: "hidden" }}>
        {/* Left: Info + AI */}
        <div style={{ borderRight: `1px solid ${LO.borderSoft}`, padding: "18px 24px", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
          {/* Info grid */}
          <div style={{ background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ color: LO.dim, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Datos del lead</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["Propiedad buscada", "Dpto 2amb · Palermo"],
                ["Presupuesto",       "$90.000 – $130.000 USD"],
                ["Fuente",            "Zonaprop"],
                ["Fecha de entrada",  "20 mayo 2026"],
                ["Teléfono",          "+54 11 4892-3317"],
                ["Email",             "g.torres@gmail.com"],
              ].map(([k, v], i) => (
                <div key={i}>
                  <div style={{ color: LO.dimmer, fontSize: 10.5, marginBottom: 2 }}>{k}</div>
                  <div style={{ color: LO.text, fontSize: 12.5, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div style={{ background: `${LO.emerald}0d`, border: `1px solid ${LO.emerald}35`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ color: LO.emerald }}><Ico d={IC.brain} size={15} /></div>
              <span style={{ color: LO.emerald, fontWeight: 600, fontSize: 12.5 }}>Resumen IA</span>
              <span style={{ color: LO.dimmer, fontSize: 10.5, marginLeft: "auto" }}>actualizado hace 2hs</span>
            </div>
            <p style={{ color: LO.text, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
              Interés real y calificado en Palermo. Consultó específicamente por balcón, amenities y expensas — señales de decisión próxima. Responde rápido.
            </p>
            <div style={{ marginTop: 12, padding: "10px 12px", background: `${LO.emerald}15`, borderRadius: 8 }}>
              <div style={{ color: LO.dimmer, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Próximo paso sugerido</div>
              <div style={{ color: LO.text, fontSize: 12.5, display: "flex", alignItems: "center", gap: 7 }}>
                <Ico d={IC.arrow} size={13} stroke={2} />
                Proponer visita para esta semana — tiene alta intención de compra.
              </div>
            </div>
          </div>

          {/* Pipeline progress */}
          <div style={{ background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 12, padding: "12px 16px" }}>
            <div style={{ color: LO.dim, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Etapa actual</div>
            <div style={{ display: "flex", gap: 4 }}>
              {STAGES.map((s, i) => {
                const active = s.key === "Interesado";
                const done = i < 2;
                return (
                  <div key={s.key} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 4, borderRadius: 2, background: done ? s.color : active ? s.color : LO.border, opacity: done || active ? 1 : 0.4, marginBottom: 5 }} />
                    <div style={{ color: active ? s.color : LO.dimmer, fontSize: 9.5, fontWeight: active ? 700 : 400 }}>{s.key}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div style={{ padding: "18px 24px", overflow: "hidden" }}>
          <div style={{ color: LO.dim, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Historial de interacciones</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {timeline.map((ev, i) => (
              <div key={i} style={{ display: "flex", gap: 12, position: "relative" }}>
                {i < timeline.length - 1 && (
                  <div style={{ position: "absolute", left: 13, top: 28, bottom: -6, width: 1, background: LO.borderSoft }} />
                )}
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${ev.color}20`, border: `1px solid ${ev.color}55`, color: ev.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, zIndex: 1 }}>
                  <Ico d={typeIcon[ev.type] ?? IC.arrow} size={11} />
                </div>
                <div style={{ flex: 1, paddingBottom: 16 }}>
                  <div style={{ color: LO.dim, fontSize: 10.5, marginBottom: 4 }}>{ev.time}</div>
                  <div style={{ background: LO.card, border: `1px solid ${LO.border}`, borderRadius: 8, padding: "8px 12px", color: LO.text, fontSize: 12, lineHeight: 1.5 }}>
                    {ev.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────
function MockupView({ view }: { view: LeadOSView }) {
  return (
    <div style={{ width: 1280, height: 800, display: "flex", flexDirection: "column", background: LO.bg, color: LO.text, fontFamily: "Inter, system-ui, -apple-system, sans-serif", overflow: "hidden" }}>
      <TopNav active={view} />
      {view === "Pipeline"  && <ViewPipeline />}
      {view === "Dashboard" && <ViewDashboard />}
      {view === "Lead"      && <ViewLead />}
    </div>
  );
}

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: 1280, height: 840, display: "flex", flexDirection: "column", background: "#1d1d1d" }}>
      <div style={{ height: 40, display: "flex", alignItems: "center", gap: 10, padding: "0 14px", background: "#1d1d1d", borderBottom: "1px solid #262626" }}>
        <div style={{ display: "flex", gap: 7 }}>
          {(["#ff5f57","#febc2e","#28c840"] as const).map((c, i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, height: 24, borderRadius: 8, background: "#2a2a2a", display: "flex", alignItems: "center", gap: 8, padding: "0 12px", maxWidth: 420, margin: "0 auto" }}>
          <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2.5}>
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{ color: "#e5e5e5", fontSize: 11, fontFamily: "ui-monospace,monospace" }}>leados-demo.vercel.app</span>
        </div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ flex: 1, background: "#0a0a0a", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function ScaledLeadOSMockup({ view }: { view: LeadOSView }) {
  const DESIGN_W = 1280, DESIGN_H = 840;
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.getBoundingClientRect().width / DESIGN_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <div style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: "top left", pointerEvents: "none", userSelect: "none" }}>
        <BrowserFrame><MockupView view={view} /></BrowserFrame>
      </div>
    </div>
  );
}
