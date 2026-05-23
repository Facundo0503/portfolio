"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AgendaOSView = "Agenda" | "Dashboard" | "Configuracion";
type CSS = CSSProperties;

// ─── Design tokens ────────────────────────────────────────────────────────────
const AG = {
  bg: "#0a0a0a",
  card: "#141414",
  cardAlt: "#101010",
  border: "#252525",
  borderSoft: "#1c1c1c",
  text: "#fafafa",
  dim: "#a1a1aa",
  dimmer: "#71717a",
  indigo: "#818cf8",
  indigoStrong: "rgba(129,140,248,0.15)",
  green: "#34d399",
  amber: "#fbbf24",
  red: "#f87171",
  gray: "#3f3f46",
} as const;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IC = {
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  users:    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M17 3.13a4 4 0 0 1 0 7.75",
  stats:    "M3 21h18M5 17V10M10 17V6M15 17v-9M20 17v-4",
  settings: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  chevL:    "M15 18l-6-6 6-6",
  chevR:    "M9 18l6-6-6-6",
  plus:     "M12 5v14M5 12h14",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  clock:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  wa:       "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  edit:     "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
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

function AOLogo({ size = 56 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 14,
      background: "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 900, fontSize: size * 0.32, letterSpacing: "-0.02em",
      boxShadow: "0 4px 14px rgba(129,140,248,0.32)",
    }}>AO</div>
  );
}

function Av({ initials, color = AG.indigo }: { initials: string; color?: string }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%",
      background: `${color}22`, border: `1px solid ${color}55`,
      color, fontWeight: 700, fontSize: 11, letterSpacing: "0.04em",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>{initials}</div>
  );
}

function Bdg({ children, color = AG.indigo }: { children: ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "2px 8px",
      borderRadius: 999, background: `${color}25`, color,
      border: `1px solid ${color}55`, fontSize: 10.5, fontWeight: 600, lineHeight: 1.6,
    }}>{children}</span>
  );
}

function KpiCard({ label, value, sub, iconD, accent }: {
  label: string; value: string; sub?: string; iconD: string; accent: string;
}) {
  return (
    <div style={{
      background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 12,
      padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ color: AG.dim, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.3 }}>{label}</div>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: `${accent}22`, color: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Ico d={iconD} size={13} stroke={1.8} />
        </div>
      </div>
      <div style={{ color: AG.text, fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ color: AG.dimmer, fontSize: 11 }}>{sub}</div>}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  const items = [
    { key: "Agenda",        label: "Agenda",         d: IC.calendar },
    { key: "Dashboard",     label: "Dashboard",      d: IC.grid },
    { key: "Clientes",      label: "Clientes",       d: IC.users },
    { key: "Reportes",      label: "Reportes",       d: IC.stats },
    { key: "Configuracion", label: "Configuración",  d: IC.settings },
  ];
  return (
    <aside style={{ width: 220, background: AG.bg, borderRight: `1px solid ${AG.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "24px 20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <AOLogo />
        <div style={{ textAlign: "center" }}>
          <div style={{ color: AG.text, fontWeight: 700, fontSize: 15 }}>AgendaOS</div>
          <div style={{ color: AG.dim, fontSize: 11, marginTop: 2 }}>Centro Estética Valentina</div>
        </div>
      </div>
      <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map(it => {
          const on = it.key === active;
          return (
            <div key={it.key} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8,
              background: on ? AG.indigoStrong : "transparent",
              color: on ? AG.indigo : AG.dim, fontSize: 14, fontWeight: on ? 600 : 500,
            }}>
              <Ico d={it.d} size={16} /><span>{it.label}</span>
            </div>
          );
        })}
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{ padding: "16px 26px", borderTop: `1px solid ${AG.borderSoft}`, display: "flex", alignItems: "center", gap: 12, color: AG.dim, fontSize: 14 }}>
        <Ico d={IC.logout} size={16} /><span>Cerrar sesión</span>
      </div>
    </aside>
  );
}

// ─── View: Agenda ─────────────────────────────────────────────────────────────
type Appt = { time: string; employee: string; service: string; client: string; duration: string; status: "confirmed" | "pending" | "noshow" | "completed" };

const statusCfg: Record<Appt["status"], { label: string; color: string }> = {
  confirmed: { label: "Confirmado", color: AG.green },
  pending:   { label: "Pendiente",  color: AG.amber },
  noshow:    { label: "No-show",    color: AG.red },
  completed: { label: "Completado", color: AG.dimmer },
};

const empColors: Record<string, string> = { "Lucía": AG.indigo, "Martina": "#a78bfa" };

function ViewAgenda() {
  const appts: Appt[] = [
    { time: "9:00",  employee: "Lucía",   service: "Corte + Brushing",    client: "María González",  duration: "45 min", status: "completed" },
    { time: "9:30",  employee: "Martina", service: "Manicura",             client: "Sofía Ruiz",      duration: "30 min", status: "confirmed" },
    { time: "10:00", employee: "Lucía",   service: "Manicura",             client: "Ana Torres",      duration: "30 min", status: "confirmed" },
    { time: "10:30", employee: "Martina", service: "Pedicura",             client: "Daniela Pérez",   duration: "30 min", status: "confirmed" },
    { time: "11:00", employee: "Lucía",   service: "Tintura + Balayage",   client: "Carmen López",    duration: "60 min", status: "pending" },
    { time: "12:00", employee: "Martina", service: "Depilación completa",  client: "Romina Flores",   duration: "60 min", status: "confirmed" },
    { time: "14:00", employee: "Lucía",   service: "Depilación cejas",     client: "Julia Martínez",  duration: "20 min", status: "confirmed" },
    { time: "14:30", employee: "Martina", service: "Masajes relajantes",   client: "Patricia Vega",   duration: "60 min", status: "pending" },
    { time: "15:00", employee: "Lucía",   service: "Corte + Brushing",     client: "Valeria Sosa",    duration: "45 min", status: "confirmed" },
    { time: "15:00", employee: "Martina", service: "Facial hidratante",    client: "Claudia Herrera", duration: "60 min", status: "confirmed" },
    { time: "16:30", employee: "Lucía",   service: "Manicura",             client: "Laura Díaz",      duration: "30 min", status: "noshow" },
  ];
  const statsBar = [
    { label: "Total turnos", value: "11", color: AG.dim },
    { label: "Confirmados",  value: "8",  color: AG.green },
    { label: "Pendientes",   value: "2",  color: AG.amber },
    { label: "No-shows",     value: "1",  color: AG.red },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: AG.bg, minWidth: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", borderBottom: `1px solid ${AG.borderSoft}` }}>
        <div>
          <div style={{ color: AG.dimmer, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Agenda del día</div>
          <h1 style={{ color: AG.text, fontSize: 21, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Miércoles, 21 mayo 2026</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 7, padding: "7px 10px", color: AG.dim, display: "flex" }}><Ico d={IC.chevL} size={14} /></div>
            <div style={{ background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 7, padding: "7px 14px", color: AG.text, fontSize: 12, fontWeight: 600 }}>Hoy</div>
            <div style={{ background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 7, padding: "7px 10px", color: AG.dim, display: "flex" }}><Ico d={IC.chevR} size={14} /></div>
          </div>
          <div style={{ background: AG.indigo, borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <Ico d={IC.plus} size={14} /> Nuevo turno
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "10px 32px", borderBottom: `1px solid ${AG.borderSoft}`, background: AG.cardAlt }}>
        {statsBar.map((s, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
            <span style={{ color: s.color, fontWeight: 700, fontSize: 16 }}>{s.value}</span>
            <span style={{ color: AG.dim }}>{s.label}</span>
          </span>
        ))}
        <div style={{ flex: 1 }} />
        {Object.entries(empColors).map(([name, color]) => (
          <span key={name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: AG.dim }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />{name}
          </span>
        ))}
      </div>

      {/* Appointment list */}
      <div style={{ flex: 1, overflow: "hidden", padding: "10px 32px 16px", display: "flex", flexDirection: "column", gap: 5 }}>
        {appts.map((a, i) => {
          const sc = statusCfg[a.status];
          const ec = empColors[a.employee] ?? AG.dim;
          return (
            <div key={i} style={{
              background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 10,
              padding: "9px 16px", display: "flex", alignItems: "center", gap: 14,
              borderLeft: `3px solid ${ec}`,
            }}>
              <div style={{ width: 46, color: AG.text, fontWeight: 700, fontSize: 13.5, fontFamily: "ui-monospace,monospace", flexShrink: 0 }}>{a.time}</div>
              <Av initials={a.employee.slice(0, 2).toUpperCase()} color={ec} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: AG.text, fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.service}</div>
                <div style={{ color: AG.dim, fontSize: 11.5, marginTop: 2 }}>{a.client}</div>
              </div>
              <div style={{ color: AG.dimmer, fontSize: 11.5, flexShrink: 0 }}>{a.duration}</div>
              <Bdg color={sc.color}>{sc.label}</Bdg>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── View: Dashboard ──────────────────────────────────────────────────────────
function ViewDashboard() {
  const kpis = [
    { label: "Turnos hoy",  value: "11", sub: "miércoles 21/5",    iconD: IC.calendar, accent: AG.indigo },
    { label: "Confirmados", value: "8",  sub: "73% de confirmación", iconD: IC.check,   accent: AG.green },
    { label: "Pendientes",  value: "2",  sub: "esperando confirmar", iconD: IC.phone,   accent: AG.amber },
    { label: "No-shows",    value: "1",  sub: "9% hoy",              iconD: IC.x,       accent: AG.red },
  ];
  const upcoming = [
    { time: "14:00", service: "Depilación cejas",   client: "Julia Martínez",  emp: "Lucía",   color: AG.indigo },
    { time: "14:30", service: "Masajes relajantes", client: "Patricia Vega",   emp: "Martina", color: "#a78bfa" },
    { time: "15:00", service: "Corte + Brushing",   client: "Valeria Sosa",    emp: "Lucía",   color: AG.indigo },
    { time: "15:00", service: "Facial hidratante",  client: "Claudia Herrera", emp: "Martina", color: "#a78bfa" },
    { time: "16:30", service: "Manicura",           client: "Laura Díaz",      emp: "Lucía",   color: AG.indigo },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: AG.bg, minWidth: 0 }}>
      <div style={{ padding: "20px 32px", borderBottom: `1px solid ${AG.borderSoft}` }}>
        <div style={{ color: AG.dimmer, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Resumen del día</div>
        <h1 style={{ color: AG.text, fontSize: 21, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Dashboard</h1>
      </div>
      <div style={{ padding: "20px 32px", display: "flex", flexDirection: "column", gap: 16, flex: 1, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
        </div>

        {/* WhatsApp status bar */}
        <div style={{ background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 12, padding: "13px 20px", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, color: AG.green }}>
            <Ico d={IC.wa} size={17} />
            <span style={{ color: AG.text, fontSize: 13, fontWeight: 600 }}>WhatsApp automático</span>
            <Bdg color={AG.green}>Activo</Bdg>
          </div>
          <div style={{ width: 1, height: 20, background: AG.border }} />
          <span style={{ color: AG.dim, fontSize: 12 }}><span style={{ color: AG.green, fontWeight: 700 }}>9</span> recordatorios enviados</span>
          <span style={{ color: AG.dim, fontSize: 12 }}><span style={{ color: AG.amber, fontWeight: 700 }}>2</span> sin confirmar</span>
          <span style={{ color: AG.dim, fontSize: 12 }}><span style={{ color: AG.red, fontWeight: 700 }}>1</span> no-show registrado</span>
          <div style={{ flex: 1 }} />
          <span style={{ color: AG.dimmer, fontSize: 11.5 }}>Recordatorio automático · 24hs antes</span>
        </div>

        {/* Upcoming + week summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, flex: 1, minHeight: 0 }}>
          {/* Upcoming list */}
          <div style={{ background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${AG.borderSoft}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: AG.text, fontWeight: 600, fontSize: 13.5 }}>Próximos turnos</span>
              <span style={{ color: AG.dim, fontSize: 11.5 }}>tarde de hoy</span>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              {upcoming.map((u, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 18px", borderBottom: `1px solid ${AG.borderSoft}`, borderLeft: `3px solid ${u.color}` }}>
                  <span style={{ color: AG.text, fontWeight: 700, fontSize: 13, fontFamily: "ui-monospace,monospace", width: 44, flexShrink: 0 }}>{u.time}</span>
                  <Av initials={u.emp.slice(0, 2).toUpperCase()} color={u.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: AG.text, fontSize: 13 }}>{u.service}</div>
                    <div style={{ color: AG.dimmer, fontSize: 11.5, marginTop: 1 }}>{u.client}</div>
                  </div>
                  <span style={{ color: u.color, fontSize: 11.5, fontWeight: 600, flexShrink: 0 }}>{u.emp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly stats */}
          <div style={{ background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ color: AG.text, fontWeight: 600, fontSize: 13.5 }}>Semana actual</div>
            {[
              { day: "Lunes",    total: 9, conf: 9, color: AG.green },
              { day: "Martes",   total: 11, conf: 10, color: AG.green },
              { day: "Miércoles", total: 11, conf: 8, color: AG.indigo },
              { day: "Jueves",   total: 10, conf: 0, color: AG.dimmer },
              { day: "Viernes",  total: 8,  conf: 0, color: AG.dimmer },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: i === 2 ? AG.text : AG.dim, fontSize: 12, width: 74, fontWeight: i === 2 ? 600 : 400 }}>{d.day}</span>
                <div style={{ flex: 1, height: 6, background: AG.border, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(d.conf / 11) * 100}%`, background: d.color, borderRadius: 3 }} />
                </div>
                <span style={{ color: AG.dim, fontSize: 11, width: 20, textAlign: "right" }}>{d.total}</span>
              </div>
            ))}
            <div style={{ marginTop: 6, padding: "10px 14px", background: AG.cardAlt, borderRadius: 8, border: `1px solid ${AG.borderSoft}` }}>
              <div style={{ color: AG.dim, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Esta semana</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: AG.text, fontSize: 18, fontWeight: 700 }}>49</div>
                  <div style={{ color: AG.dimmer, fontSize: 10.5 }}>turnos</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: AG.green, fontSize: 18, fontWeight: 700 }}>91%</div>
                  <div style={{ color: AG.dimmer, fontSize: 10.5 }}>confirmados</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: AG.red, fontSize: 18, fontWeight: 700 }}>2</div>
                  <div style={{ color: AG.dimmer, fontSize: 10.5 }}>no-shows</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View: Configuracion ──────────────────────────────────────────────────────
function ViewConfiguracion() {
  const services = [
    { name: "Corte + Brushing",    duration: "45 min", price: "$4.500",  active: true },
    { name: "Manicura",            duration: "30 min", price: "$2.800",  active: true },
    { name: "Pedicura",            duration: "30 min", price: "$3.200",  active: true },
    { name: "Tintura + Balayage",  duration: "60 min", price: "$8.500",  active: true },
    { name: "Depilación cejas",    duration: "20 min", price: "$1.800",  active: true },
    { name: "Depilación completa", duration: "60 min", price: "$6.500",  active: true },
    { name: "Masajes relajantes",  duration: "60 min", price: "$5.500",  active: false },
    { name: "Facial hidratante",   duration: "45 min", price: "$4.200",  active: true },
  ];
  const employees = [
    { name: "Lucía Gómez",  role: "Estilista",   schedule: "Lun–Vie · 9:00–18:00",  color: AG.indigo },
    { name: "Martina Ruiz", role: "Esteticista", schedule: "Mar–Sáb · 10:00–19:00", color: "#a78bfa" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: AG.bg, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: `1px solid ${AG.borderSoft}` }}>
        <h1 style={{ color: AG.text, fontSize: 21, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Configuración</h1>
        <div style={{ background: AG.indigo, borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <Ico d={IC.plus} size={14} /> Agregar servicio
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, padding: "12px 32px 0", borderBottom: `1px solid ${AG.borderSoft}` }}>
        {["Servicios", "Empleadas", "Horarios", "WhatsApp"].map((t, i) => (
          <div key={t} style={{
            padding: "7px 16px", fontSize: 13, fontWeight: i === 0 ? 600 : 500, cursor: "pointer",
            color: i === 0 ? AG.text : AG.dim,
            borderBottom: i === 0 ? `2px solid ${AG.indigo}` : "2px solid transparent",
            marginBottom: -1,
          }}>{t}</div>
        ))}
      </div>

      <div style={{ padding: "20px 32px", display: "flex", flexDirection: "column", gap: 14, flex: 1, overflow: "hidden" }}>
        {/* Services table */}
        <div style={{ background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 100px 90px 60px", padding: "10px 18px", borderBottom: `1px solid ${AG.border}`, color: AG.dim, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <span>Servicio</span><span>Duración</span><span>Precio</span><span>Estado</span><span></span>
          </div>
          {services.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 90px 100px 90px 60px", padding: "9px 18px", borderBottom: i < services.length - 1 ? `1px solid ${AG.borderSoft}` : "none", alignItems: "center" }}>
              <span style={{ color: AG.text, fontSize: 13 }}>{s.name}</span>
              <span style={{ color: AG.dim, fontSize: 12 }}>{s.duration}</span>
              <span style={{ color: AG.text, fontSize: 13, fontWeight: 600 }}>{s.price}</span>
              <Bdg color={s.active ? AG.green : AG.dim}>{s.active ? "Activo" : "Inactivo"}</Bdg>
              <span style={{ color: AG.dimmer }}><Ico d={IC.edit} size={13} /></span>
            </div>
          ))}
        </div>

        {/* Employees */}
        <div>
          <div style={{ color: AG.dim, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Empleadas</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {employees.map((e, i) => (
              <div key={i} style={{ background: AG.card, border: `1px solid ${AG.border}`, borderRadius: 12, padding: "16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Av initials={e.name.slice(0, 2).toUpperCase()} color={e.color} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: AG.text, fontWeight: 600, fontSize: 14 }}>{e.name}</div>
                  <div style={{ color: AG.dim, fontSize: 12, marginTop: 2 }}>{e.role}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: AG.dimmer, fontSize: 11.5, marginTop: 6 }}>
                    <Ico d={IC.clock} size={11} />{e.schedule}
                  </div>
                </div>
                <div style={{ background: "transparent", border: `1px solid ${AG.border}`, borderRadius: 6, padding: "5px 8px", color: AG.dim, display: "flex" }}>
                  <Ico d={IC.edit} size={13} />
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
function MockupView({ view }: { view: AgendaOSView }) {
  return (
    <div style={{ width: 1280, height: 800, display: "flex", background: AG.bg, color: AG.text, fontFamily: "Inter, system-ui, -apple-system, sans-serif", overflow: "hidden" }}>
      <Sidebar active={view} />
      {view === "Agenda"        && <ViewAgenda />}
      {view === "Dashboard"     && <ViewDashboard />}
      {view === "Configuracion" && <ViewConfiguracion />}
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
          <span style={{ color: "#e5e5e5", fontSize: 11, fontFamily: "ui-monospace,monospace" }}>agendaos-demo.vercel.app</span>
        </div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ flex: 1, background: "#0a0a0a", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function ScaledAgendaOSMockup({ view }: { view: AgendaOSView }) {
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
