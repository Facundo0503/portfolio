"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
export type GymProView = "Dashboard" | "Pipeline" | "Gastos";
type CSS = CSSProperties;

// ─── Design tokens ───────────────────────────────────────────────────────────
const MK = {
  bg: "#0a0a0a",
  card: "#141414",
  cardAlt: "#101010",
  border: "#252525",
  borderSoft: "#1c1c1c",
  text: "#fafafa",
  dim: "#a1a1aa",
  dimmer: "#71717a",
  gold: "#f5b942",
  goldStrong: "rgba(245,185,66,0.18)",
  red: "#f87171",
  redBg: "rgba(248,113,113,0.15)",
  blue: "#60a5fa",
  green: "#34d399",
  gray: "#3f3f46",
} as const;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IC = {
  grid:   "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  users:  "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M17 3.13a4 4 0 0 1 0 7.75",
  funnel: "M3 4h18l-7 9v6l-4 2v-8z",
  stats:  "M3 21h18 M5 17V10 M10 17V6 M15 17v-9 M20 17v-4",
  wallet: "M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7 M17 12v.01",
  msg:    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  bell:   "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.94 1.94 0 0 0 3.4 0",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  money:  "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  trend:  "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  flame:  "M8.5 14.5A2.5 2.5 0 0 0 11 17c1.5 0 3-1 3-3 0-1.5-1-2.5-2-3.5-1.5-1.5-2-2.5-2-4 0 0-4 2-4 6 0 1 .5 2 1.5 2.5z M14 3s4 4 4 9-4 9-7 9c-1 0-2-.2-3-.6",
  alert:  "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  search: "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M21 21l-4.35-4.35",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54z",
  more:   "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  check:  "M20 6L9 17l-5-5",
  clock:  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
} as const;

// ─── Shared util ──────────────────────────────────────────────────────────────
function pillBtn(primary: boolean): CSS {
  return {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "8px 14px", borderRadius: 8,
    background: primary ? MK.gold : MK.card,
    color: primary ? "#1a1208" : MK.text,
    border: primary ? "1px solid transparent" : `1px solid ${MK.border}`,
    fontSize: 13, fontWeight: 600, cursor: "pointer",
  };
}

// ─── Primitives ───────────────────────────────────────────────────────────────
function Ico({ d, size = 16, stroke = 1.6 }: { d: string; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function MKLogo({ size = 68 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "radial-gradient(circle at 30% 30%, #e9c574 0%, #b3892c 55%, #6a4f15 100%)",
      border: `2px solid ${MK.gold}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#1a1208", fontWeight: 900, textAlign: "center", lineHeight: 1,
      boxShadow: "0 4px 14px rgba(245,185,66,0.25), inset 0 -6px 14px rgba(0,0,0,0.3)",
    }}>
      <div>
        <div style={{ fontSize: size * 0.28 }}>MK</div>
        <div style={{ fontSize: size * 0.13, marginTop: 2, letterSpacing: "0.15em" }}>GYM</div>
      </div>
    </div>
  );
}

function Av({ initials, color = MK.gold }: { initials: string; color?: string }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: `${color}22`, border: `1px solid ${color}55`,
      color, fontWeight: 700, fontSize: 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, letterSpacing: "0.04em",
    }}>{initials}</div>
  );
}

function Bdg({ children, color = MK.blue }: { children: ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "2px 8px",
      borderRadius: 999, background: `${color}25`, color,
      border: `1px solid ${color}55`, fontSize: 10.5, fontWeight: 600, lineHeight: 1.6,
    }}>{children}</span>
  );
}

function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 32px", borderBottom: `1px solid ${MK.borderSoft}`,
    }}>
      <h1 style={{ color: MK.text, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
        {title}
      </h1>
      {children && <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{children}</div>}
    </div>
  );
}

function KpiCard({ label, value, sub, iconD, accent }: {
  label: string; value: string; sub?: string; iconD: string; accent: string;
}) {
  return (
    <div style={{
      background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 12,
      padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8, minWidth: 0,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
        <div style={{ color: MK.dim, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.3 }}>
          {label}
        </div>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: `${accent}22`, color: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Ico d={iconD} size={14} stroke={1.8} />
        </div>
      </div>
      <div style={{ color: MK.text, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ color: MK.dimmer, fontSize: 11, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      {label}
    </span>
  );
}

function Donut({ size = 190, segments }: { size?: number; segments: { v: number; c: string }[] }) {
  const r = size / 2 - 18, cx = size / 2, cy = size / 2, C = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((s, i) => {
        const len = (s.v / 100) * C;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.c} strokeWidth={24}
            strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`} />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function AlertRow({ initials, name, date }: { initials: string; name: string; date: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", borderBottom: `1px solid ${MK.borderSoft}` }}>
      <Av initials={initials} color={MK.gold} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: MK.text, fontWeight: 600, fontSize: 13 }}>{name}</span>
          <Bdg color={MK.blue}>Gimnasio</Bdg>
        </div>
        <div style={{ color: MK.dimmer, fontSize: 11.5, marginTop: 2 }}>Vence: {date}</div>
      </div>
      <Bdg color={MK.red}>Vencido</Bdg>
    </div>
  );
}

// ─── Charts ───────────────────────────────────────────────────────────────────
function Sparkline({ values, color }: { values: number[]; color: string }) {
  const W = 400, H = 48;
  const min = Math.min(...values), range = Math.max(...values) - min || 1;
  const x = (i: number) => (i / (values.length - 1)) * W;
  const y = (v: number) => H - 4 - ((v - min) / range) * (H - 14);
  const path = values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const gid = `sp${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity={0.35} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${path} L${W},${H} L0,${H} Z`} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function AreaLine({ values, color }: { values: number[]; color: string }) {
  const W = 600, H = 200, p = { t: 14, r: 8, b: 18, l: 8 };
  const min = Math.min(...values), range = Math.max(...values) - min || 1;
  const x = (i: number) => p.l + (i / (values.length - 1)) * (W - p.l - p.r);
  const y = (v: number) => p.t + (1 - (v - min) / range) * (H - p.t - p.b);
  const path = values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const gid = `al${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity={0.32} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${path} L${x(values.length-1)},${H-p.b} L${x(0)},${H-p.b} Z`} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PairedBars({ data }: { data: { m: string; i: number; e: number }[] }) {
  const W = 700, H = 230, p = { t: 18, r: 14, b: 24, l: 14 };
  const max = Math.max(...data.flatMap(d => [d.i, d.e])) * 1.1;
  const gW = (W - p.l - p.r) / data.length, bw = gW * 0.32;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none">
      {data.map((d, i) => {
        const gx = p.l + i * gW + gW / 2;
        const hi = (d.i / max) * (H - p.t - p.b), he = (d.e / max) * (H - p.t - p.b);
        return (
          <g key={i}>
            <rect x={gx - bw - 2} y={H - p.b - hi} width={bw} height={hi} rx={3} fill={MK.gold} />
            <rect x={gx + 2} y={H - p.b - he} width={bw} height={he} rx={3} fill={MK.red} />
            <text x={gx} y={H - 6} fill={MK.dimmer} fontSize={10} textAnchor="middle">{d.m}</text>
          </g>
        );
      })}
    </svg>
  );
}

function SparkCard({ label, value, delta, iconD, color, vals }: {
  label: string; value: string; delta: string; iconD: string; color: string; vals: number[];
}) {
  const up = !delta.startsWith("-");
  return (
    <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden", minHeight: 110 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: MK.dim, fontSize: 10.5, letterSpacing: "0.08em", fontWeight: 700, textTransform: "uppercase" }}>
          <Ico d={iconD} size={12} stroke={2} />{label}
        </div>
        <span style={{ color: up ? MK.green : MK.red, fontSize: 11, fontWeight: 600 }}>{up ? "↑" : "↓"} {delta}</span>
      </div>
      <div style={{ color: MK.text, fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 48 }}>
        <Sparkline values={vals} color={color} />
      </div>
    </div>
  );
}

function ChartCard({ title, legend, children }: {
  title: string; legend?: { c: string; l: string }[]; children: ReactNode;
}) {
  return (
    <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 12, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "12px 18px", borderBottom: `1px solid ${MK.borderSoft}` }}>
        <div style={{ color: MK.text, fontWeight: 600, fontSize: 13.5 }}>{title}</div>
        {legend && (
          <div style={{ display: "flex", gap: 12, color: MK.dim, fontSize: 11 }}>
            {legend.map((l, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: l.c }} />{l.l}
              </span>
            ))}
          </div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}

function MiniMetric({ label, value, tone }: { label: string; value: string; tone: "red" | "green" | "neutral" }) {
  const c = tone === "red" ? MK.red : tone === "green" ? MK.green : MK.text;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ color: MK.dimmer, fontSize: 11, marginBottom: 2 }}>{label}</div>
      <div style={{ color: c, fontSize: 15, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  const items = [
    { key: "Dashboard", d: IC.grid },
    { key: "Clientes",  d: IC.users },
    { key: "Pipeline",  d: IC.funnel },
    { key: "Stats",     d: IC.stats },
    { key: "Gastos",    d: IC.wallet },
    { key: "Mensajes",  d: IC.msg },
  ];
  return (
    <aside style={{ width: 220, background: MK.bg, borderRight: `1px solid ${MK.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "28px 20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <MKLogo />
        <div style={{ color: MK.gold, fontWeight: 700, fontSize: 16, letterSpacing: "0.04em" }}>MK Gym</div>
      </div>
      <nav style={{ padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map(it => {
          const on = it.key === active;
          return (
            <div key={it.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, background: on ? MK.goldStrong : "transparent", color: on ? MK.gold : MK.dim, fontSize: 14, fontWeight: on ? 600 : 500 }}>
              <Ico d={it.d} size={17} /><span>{it.key}</span>
            </div>
          );
        })}
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{ padding: "18px 26px", borderTop: `1px solid ${MK.borderSoft}`, display: "flex", alignItems: "center", gap: 12, color: MK.dim, fontSize: 14 }}>
        <Ico d={IC.logout} size={17} /><span>Cerrar sesión</span>
      </div>
    </aside>
  );
}

// ─── View: Dashboard ──────────────────────────────────────────────────────────
function ViewDashboard() {
  const kpis = [
    { label: "Ingresos del mes",   value: "$3.640.000", iconD: IC.money,  accent: MK.green },
    { label: "Proyectado (100%)",  value: "$5.505.000", sub: "Si todos los activos pagan", iconD: IC.trend, accent: MK.green },
    { label: "Miembros activos",   value: "132",        sub: "22% del total", iconD: IC.users, accent: MK.gold },
    { label: "Total Muay Thai",    value: "$375.000",   sub: "Ingresos del mes · Muay Thai", iconD: IC.flame, accent: MK.gold },
    { label: "Con deuda",          value: "23",         sub: "4% del total", iconD: IC.alert, accent: MK.red },
    { label: "Total miembros",     value: "596",        iconD: IC.user,   accent: MK.blue },
  ];
  const alerts: [string, string, string][] = [
    ["AM","Angelica Martinez","1/5/2026"],["AG","ANTONIA GIMENEZ","1/5/2026"],
    ["MN","Monica Navarrete","1/5/2026"],["GC","GERMAN CORREA","1/5/2026"],
    ["KL","KATHERINE LUNA","6/5/2026"], ["CL","Carla Liendro","6/5/2026"],
    ["SC","SILVESTRE CACERES","7/5/2026"],
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: MK.bg, minWidth: 0 }}>
      <PageHeader title="Dashboard" />
      <div style={{ padding: "20px 32px", display: "flex", flexDirection: "column", gap: 18, flex: 1, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}>
          {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 14, flex: 1, minHeight: 0 }}>
          <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 12, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: `1px solid ${MK.borderSoft}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: MK.text, fontWeight: 600, fontSize: 14 }}>
                <span style={{ color: MK.gold }}><Ico d={IC.bell} size={16} /></span>Alertas
              </div>
              <div style={{ background: MK.redBg, color: MK.red, border: `1px solid ${MK.red}55`, borderRadius: 999, padding: "2px 9px", fontSize: 11, fontWeight: 700 }}>10</div>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              {alerts.map(([ini, n, d], i) => <AlertRow key={i} initials={ini} name={n} date={d} />)}
            </div>
          </div>
          <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", flexDirection: "column" }}>
            <div style={{ color: MK.text, fontWeight: 600, fontSize: 14, marginBottom: 6 }}>Estado de membresías</div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Donut segments={[{ v: 68, c: MK.gold }, { v: 27, c: MK.gray }, { v: 5, c: MK.red }]} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 18, color: MK.dim, fontSize: 11.5, paddingTop: 4 }}>
              <Legend color={MK.gold} label="Activos" />
              <Legend color={MK.gray} label="Inactivos" />
              <Legend color={MK.red} label="Vencidos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View: Pipeline ───────────────────────────────────────────────────────────
type CardRow = [string, string, string, string, string, boolean?];

function PCard({ initials, name, plan, when, amount, sent, accent }: {
  initials: string; name: string; plan: string; when: string;
  amount: string; sent?: boolean; accent: string;
}) {
  return (
    <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6, borderLeft: `3px solid ${accent}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Av initials={initials} color={accent} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: MK.text, fontWeight: 600, fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
          <div style={{ color: MK.dimmer, fontSize: 10.5 }}>{plan}</div>
        </div>
        <div style={{ color: MK.text, fontWeight: 700, fontSize: 12 }}>{amount}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: MK.dim, fontSize: 10.5 }}>
          <Ico d={IC.clock} size={11} />{when}
        </span>
        {sent
          ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: MK.green, fontSize: 10, fontWeight: 600 }}><Ico d={IC.check} size={11} /> Enviado</span>
          : <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: MK.borderSoft, color: MK.dim, padding: "2px 7px", borderRadius: 999, fontSize: 10, fontWeight: 600, border: `1px solid ${MK.border}` }}><Ico d={IC.msg} size={10} /> WhatsApp</span>
        }
      </div>
    </div>
  );
}

function ViewPipeline() {
  const cols: { key: string; color: string; cards: CardRow[] }[] = [
    { key: "Al día", color: MK.green, cards: [
      ["MA","Matías Aguirre","Muay Thai","Vence 12/6","$25.000"],
      ["LP","Lucía Paredes","Gimnasio","Vence 14/6","$18.000"],
      ["DR","Diego Robles","Gym + MT","Vence 22/6","$32.000"],
      ["VM","Valentina Morales","Gimnasio","Vence 28/6","$18.000"],
    ]},
    { key: "Vence esta semana", color: MK.gold, cards: [
      ["NB","Nicolás Bravo","Muay Thai","Vence 24/5","$25.000"],
      ["CR","Camila Rojas","Gym + MT","Vence 25/5","$32.000"],
      ["FS","Fernanda Suárez","Gimnasio","Vence 26/5","$18.000"],
    ]},
    { key: "Vencido", color: MK.red, cards: [
      ["AM","Angelica Martinez","Gimnasio","Vencida hace 5d","$18.000",true],
      ["AG","ANTONIA GIMENEZ","Gimnasio","Vencida hace 5d","$18.000",true],
      ["MN","Monica Navarrete","Gimnasio","Vencida hace 5d","$18.000"],
      ["GC","GERMAN CORREA","Gym + MT","Vencida hace 5d","$32.000"],
      ["KL","KATHERINE LUNA","Gimnasio","Vencida hace 1d","$18.000"],
    ]},
    { key: "Muy moroso", color: "#dc2626", cards: [
      ["JT","Joaquín Torres","Muay Thai","Vencida hace 21d","$25.000",true],
      ["EC","Esteban Cárdenas","Gimnasio","Vencida hace 34d","$18.000",true],
      ["SC","SILVESTRE CACERES","Gimnasio","Vencida hace 18d","$18.000",true],
    ]},
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: MK.bg, minWidth: 0 }}>
      <PageHeader title="Pipeline de morosidad">
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 8, padding: "7px 12px", width: 220, color: MK.dim, fontSize: 12 }}>
          <Ico d={IC.search} size={13} /><span>Buscar socio…</span>
        </div>
        <button style={pillBtn(false)}><Ico d={IC.filter} size={13} /> Filtros</button>
        <button style={pillBtn(true)}><Ico d={IC.msg} size={13} /> Enviar a todos</button>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, padding: "16px 32px 0" }}>
        {cols.map(c => (
          <div key={c.key} style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: MK.dim, fontSize: 10.5, letterSpacing: "0.06em", fontWeight: 600, textTransform: "uppercase" }}>{c.key}</div>
              <div style={{ color: MK.text, fontSize: 18, fontWeight: 700 }}>{c.cards.length}</div>
            </div>
            <div style={{ color: MK.dimmer, fontSize: 11, textAlign: "right" }}>
              ${c.cards.reduce((s, x) => s + parseInt(x[4].replace(/\D/g, "")), 0).toLocaleString("es-AR")}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "16px 32px 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, flex: 1, minHeight: 0, overflow: "hidden" }}>
        {cols.map(c => (
          <div key={c.key} style={{ background: MK.cardAlt, border: `1px solid ${MK.borderSoft}`, borderRadius: 12, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
            <div style={{ padding: "12px 14px", borderBottom: `1px solid ${MK.borderSoft}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                <span style={{ color: MK.text, fontWeight: 600, fontSize: 12.5 }}>{c.key}</span>
                <span style={{ background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}55`, padding: "1px 7px", borderRadius: 999, fontSize: 10, fontWeight: 700 }}>{c.cards.length}</span>
              </div>
              <span style={{ color: MK.dimmer }}><Ico d={IC.more} size={14} /></span>
            </div>
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
              {c.cards.map((card, idx) => (
                <PCard key={idx} initials={card[0]} name={card[1]} plan={card[2]} when={card[3]} amount={card[4]} sent={card[5]} accent={c.color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── View: Gastos ─────────────────────────────────────────────────────────────
function ViewGastos() {
  const tabs = [
    { label: "Resumen", count: null as number | null, active: true },
    { label: "Inventario", count: 23 },
    { label: "Ventas", count: 45 },
    { label: "Gastos", count: 28 },
  ];
  const netMonthly   = [0.9,0.7,1.1,1.4,1.8,2.1,1.9,1.5,1.2,0.8,0.4,-0.6];
  const incomeVsExp  = [
    {m:"Dic",i:3.1,e:1.4},{m:"Ene",i:3.4,e:1.6},{m:"Feb",i:3.2,e:1.8},
    {m:"Mar",i:3.5,e:2.1},{m:"Abr",i:3.6,e:2.4},{m:"May",i:4.0,e:5.3},
  ];
  const gananciaArea = [0.6,0.9,1.4,1.7,2.2,2.1,1.8,1.3,0.8,0.3,-0.4,-1.1];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: MK.bg, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "18px 32px 0" }}>
        <div>
          <div style={{ color: MK.dimmer, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Dashboard</div>
          <h1 style={{ color: MK.text, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Gestión de Gastos</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 8, padding: "7px 12px", width: 220, color: MK.dimmer, fontSize: 12 }}>
          <Ico d={IC.search} size={13} />
          <span style={{ flex: 1 }}>Buscar o ejecutar…</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: MK.borderSoft, border: `1px solid ${MK.border}`, padding: "1px 6px", borderRadius: 4, color: MK.dim, fontFamily: "ui-monospace,monospace", fontSize: 10 }}>Ctrl K</span>
        </div>
      </div>

      <div style={{ padding: "16px 32px 8px", display: "flex", gap: 4, borderBottom: `1px solid ${MK.borderSoft}` }}>
        {tabs.map(t => (
          <div key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, background: t.active ? MK.card : "transparent", border: t.active ? `1px solid ${MK.border}` : "1px solid transparent", color: t.active ? MK.text : MK.dim, fontSize: 13, fontWeight: t.active ? 600 : 500 }}>
            {t.label}
            {t.count != null && <span style={{ background: MK.borderSoft, color: MK.dim, padding: "1px 7px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{t.count}</span>}
          </div>
        ))}
      </div>

      <div style={{ padding: "18px 32px", display: "flex", flexDirection: "column", gap: 14, flex: 1, minHeight: 0, overflow: "hidden" }}>
        <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 14, padding: "16px 22px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: MK.dim, fontSize: 10.5, letterSpacing: "0.08em", fontWeight: 700, textTransform: "uppercase" }}>
                <span style={{ color: MK.red }}>▼</span>Ganancia neta · Mayo de 2026
              </div>
              <span style={{ background: MK.redBg, color: MK.red, border: `1px solid ${MK.red}55`, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>-137.3% vs Abr/26</span>
            </div>
            <div style={{ color: MK.red, fontSize: 50, fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 6 }}>-$ 1.143.700</div>
            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, padding: "10px 14px", background: MK.cardAlt, borderRadius: 10, border: `1px solid ${MK.borderSoft}` }}>
              <MiniMetric label="vs Abr/26" value="-$4.2M" tone="red" />
              <MiniMetric label="Margen" value="-27.6%" tone="red" />
              <MiniMetric label="Gastos / Ing." value="128%" tone="red" />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ color: MK.dim, fontSize: 10.5, letterSpacing: "0.08em", fontWeight: 700, textTransform: "uppercase" }}>Últimos 12 meses</span>
              <span style={{ color: MK.dimmer, fontSize: 11 }}>prom · $1.4M</span>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}><AreaLine values={netMonthly} color={MK.red} /></div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          <SparkCard label="Cuotas del mes"    value="$3.6M" delta="+18.8%" iconD={IC.money}  color={MK.green} vals={[1.2,1.4,1.3,1.6,1.9,2.2,2.4,2.7,3.0,3.2,3.4,3.6]} />
          <SparkCard label="Ventas productos"  value="$400k" delta="+0.0%"  iconD={IC.wallet} color={MK.blue}  vals={[0.1,0.15,0.2,0.18,0.22,0.2,0.25,0.28,0.3,0.32,0.38,0.4]} />
          <SparkCard label="Gastos"            value="$5.3M" delta="+0.0%"  iconD={IC.alert}  color={MK.red}   vals={[1.6,1.8,2.0,2.2,2.4,2.8,3.2,3.6,4.0,4.4,4.9,5.3]} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14, flex: 1, minHeight: 0 }}>
          <ChartCard title="Ingresos vs. Gastos" legend={[{ c: MK.gold, l: "Ingresos" }, { c: MK.red, l: "Gastos" }]}>
            <PairedBars data={incomeVsExp} />
          </ChartCard>
          <ChartCard title="Ganancia neta">
            <AreaLine values={gananciaArea} color={MK.green} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

// ─── MockupView ───────────────────────────────────────────────────────────────
function MockupView({ view }: { view: GymProView }) {
  return (
    <div style={{ width: 1280, height: 800, display: "flex", background: MK.bg, color: MK.text, fontFamily: "Inter, system-ui, -apple-system, sans-serif", overflow: "hidden" }}>
      <Sidebar active={view} />
      {view === "Dashboard" && <ViewDashboard />}
      {view === "Pipeline"  && <ViewPipeline />}
      {view === "Gastos"    && <ViewGastos />}
    </div>
  );
}

// ─── Browser chrome ───────────────────────────────────────────────────────────
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
          <span style={{ color: "#e5e5e5", fontSize: 11, fontFamily: "ui-monospace,monospace" }}>gympro-demo.vercel.app</span>
        </div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ flex: 1, background: "#0a0a0a", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function ScaledGymProMockup({ view }: { view: GymProView }) {
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
