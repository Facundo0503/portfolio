"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ScaledGymProMockup, type GymProView } from "./GymProMockup";
import { ScaledAgendaOSMockup } from "./AgendaOSMockup";
import { ScaledLeadOSMockup } from "./LeadOSMockup";

// ─── Types ────────────────────────────────────────────────────────────────────
/** Un slide del LiveCarousel: nodo JSX, mockup GymPro (legacy) o imagen estática */
export type LiveSlide =
  | { node: ReactNode;  label: string; view?: never; src?: never }
  | { view: GymProView; label: string; node?: never; src?: never }
  | { src: string;      label: string; node?: never; view?: never };

type ShowcaseItem = {
  key: string;
  label: string;
  live: boolean;
  preview: ReactNode;
  eyebrow: string;
  headline: string;
  description: string;
  testimonial?: string;
  testimonialAuthor?: string;
  problem?: string;
  solution?: string;
  result?: string;
  tags: string[];
  cta: string;
  url?: string;
  launchDate?: string;
};

// ─── Showcase data ────────────────────────────────────────────────────────────
const showcaseItems: ShowcaseItem[] = [
  {
    key: "gymPro",
    label: "GymPro",
    live: true,
    preview: <ScaledGymProMockup view="Dashboard" />,
    eyebrow: "Caso real · MK Gym · Villa Martelli",
    headline: "De 23% morosidad a 4% en 60 días",
    description:
      "132 socios activos, cobranza automatizada por WhatsApp, panel de control en tiempo real. Reemplazó 4 planillas de Excel y 6 horas semanales de trabajo manual.",
    testimonial:
      "Recuperamos más de $800.000 en cuotas vencidas en los primeros 60 días.",
    testimonialAuthor: "Lorena y Matías · MK Gym, Villa Martelli",
    problem:
      "Cuotas y morosidad gestionadas con Excel. Sin visibilidad en tiempo real ni forma de avisar a socios vencidos.",
    solution:
      "Panel en tiempo real, pipeline de morosidad y notificaciones automáticas por WhatsApp. Todo en un sistema.",
    result:
      "100% del seguimiento centralizado. Notificaciones que antes llevaban horas se envían solas.",
    tags: ["Next.js", "Supabase", "WhatsApp API", "TypeScript"],
    cta: "Coordinar walkthrough de 15 min",
    url: "https://gympro-demo.vercel.app/",
    launchDate: "2025-06",
  },
  {
    key: "agendaOS",
    label: "AgendaOS",
    live: false,
    preview: <ScaledAgendaOSMockup view="Agenda" />,
    eyebrow: "Aceptando pilotos · Barberías y centros de estética",
    headline: "Turnos por WhatsApp sin apps ni cuentas",
    description:
      "El cliente reserva, confirma y cancela desde el mismo WhatsApp que ya usa. Confirmaciones y recordatorios automáticos. El dueño gestiona todo desde el panel.",
    tags: ["Next.js", "WhatsApp API", "Supabase", "Claude API"],
    cta: "Quiero ser cliente piloto",
  },
  {
    key: "leadOS",
    label: "LeadOS",
    live: false,
    preview: <ScaledLeadOSMockup view="Pipeline" />,
    eyebrow: "Aceptando pilotos · Agentes inmobiliarios",
    headline: "Ningún lead se pierde por falta de seguimiento",
    description:
      "Todos los leads en un pipeline Kanban. Seguimiento automático por WhatsApp, ficha con resumen IA y secuencia de contacto hasta el cierre.",
    tags: ["Next.js", "Supabase", "Claude API", "WhatsApp API"],
    cta: "Quiero ser cliente piloto",
  },
];

function monthsAgo(yyyyMM: string): number {
  const [y, m] = yyyyMM.split("-").map(Number);
  const now = new Date();
  return Math.max(1, (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m));
}

// ─── LiveCarousel (kept for external use) ─────────────────────────────────────
export function LiveCarousel({ views }: { views: LiveSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    const n = ((next % views.length) + views.length) % views.length;
    if (next >= views.length) setDirection(1);
    else if (next < 0) setDirection(-1);
    else setDirection(next > current ? 1 : -1);
    setCurrent(n);
  };
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div className="mb-7">
      <div className="relative rounded-xl overflow-hidden bg-secondary/30 border border-border/50">
        <div
          className="relative w-full touch-pan-y select-none overflow-hidden"
          style={{ aspectRatio: "1280/840" }}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                const { offset, velocity } = info;
                if (offset.x < -50 || velocity.x < -400) next();
                else if (offset.x > 50 || velocity.x > 400) prev();
              }}
            >
              {views[current].node ? (
                <>{views[current].node}</>
              ) : views[current].src ? (
                <Image
                  src={views[current].src}
                  alt={views[current].label}
                  fill
                  quality={90}
                  priority={current === 0}
                  draggable={false}
                  className="object-cover object-top pointer-events-none select-none"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
                />
              ) : views[current].view ? (
                <ScaledGymProMockup view={views[current].view} />
              ) : null}
            </motion.div>
          </AnimatePresence>

          {views.length > 1 && (
            <>
              <button onClick={prev} aria-label="Slide anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-9 h-9 rounded-full items-center justify-center bg-black/60 border border-white/10 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/80 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={next} aria-label="Slide siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-9 h-9 rounded-full items-center justify-center bg-black/60 border border-white/10 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/80 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-sm text-white/80">
              {views[current].label}
            </span>
          </div>
        </div>
      </div>

      {views.length > 1 && (
        <div className="flex justify-center gap-2 mt-3" role="tablist">
          {views.map((v, i) => (
            <button key={i} role="tab" aria-selected={i === current} aria-label={v.label}
              onClick={() => go(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: i === current ? "oklch(0.68 0.2 260)" : "var(--border)",
                transform: i === current ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ProjectShowcase ──────────────────────────────────────────────────────────
function ProjectShowcase() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  function go(i: number) {
    if (i === idx) return;
    setDir(i > idx ? 1 : -1);
    setIdx(i);
  }

  const item = showcaseItems[idx];
  const months = item.launchDate ? monthsAgo(item.launchDate) : null;

  return (
    <div>
      {/* ── Tab switcher ── */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {showcaseItems.map((s, i) => {
          const on = i === idx;
          return (
            <button
              key={s.key}
              onClick={() => go(i)}
              className={[
                "inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer",
                on
                  ? "bg-card border-border text-foreground shadow-sm"
                  : "bg-transparent border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60",
              ].join(" ")}
            >
              {s.live ? (
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              ) : on ? (
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ background: "oklch(0.68 0.2 260)" }}
                />
              ) : null}
              {s.label}
            </button>
          );
        })}
      </div>

      {/* ── Preview area (fixed aspect ratio, animated) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-2xl border border-border/50 shadow-[0_0_80px_-20px_oklch(0.68_0.2_260/0.15)]"
        style={{ paddingBottom: `${(840 / 1280) * 100}%` }}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 48 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -48 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "absolute", inset: 0 }}
          >
            {item.preview}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Project details (animated per tab) ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, delay: 0.06 }}
          className="mt-8"
        >
          {/* Status + eyebrow + URL */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {item.live ? (
              <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                live en producción{months ? ` · ${months} meses` : ""}
              </div>
            ) : (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium"
                style={{
                  backgroundColor: "oklch(0.68 0.2 260 / 0.1)",
                  borderColor: "oklch(0.68 0.2 260 / 0.3)",
                  color: "oklch(0.68 0.2 260)",
                }}
              >
                Aceptando pilotos
              </span>
            )}
            <span className="text-xs font-mono text-muted-foreground">{item.eyebrow}</span>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 text-xs font-medium transition-colors"
                style={{ color: "var(--accent-brand)" }}
              >
                Ver demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Headline + description */}
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">{item.headline}</h3>
          <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-3xl">{item.description}</p>

          {/* Testimonial — GymPro only */}
          {item.testimonial && (
            <figure
              className="mb-6 p-5 rounded-xl bg-secondary/30 border border-border/50 border-l-2 max-w-3xl"
              style={{ borderLeftColor: "oklch(0.68 0.2 260)" }}
            >
              <blockquote className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                "{item.testimonial}"
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "oklch(0.68 0.2 260)" }}
                />
                {item.testimonialAuthor}
              </figcaption>
            </figure>
          )}

          {/* Problem / Solution / Result — GymPro only */}
          {item.problem && (
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "El problema", text: item.problem },
                { label: "La solución", text: item.solution },
                { label: "El resultado", text: item.result },
              ].map(({ label, text }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border/60 bg-secondary/40 p-4"
                >
                  <p
                    className="text-xs font-mono font-medium mb-2"
                    style={{ color: "var(--accent-brand)" }}
                  >
                    {label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tags + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap"
              style={{
                backgroundColor: "oklch(0.68 0.2 260 / 0.1)",
                borderColor: "oklch(0.68 0.2 260 / 0.3)",
                color: "oklch(0.68 0.2 260)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "oklch(0.68 0.2 260 / 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "oklch(0.68 0.2 260 / 0.1)";
              }}
            >
              {item.cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="proyectos" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-mono mb-3"
            style={{ color: "var(--accent-brand)" }}
          >
            Casos reales
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Lo que ya está funcionando
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Sistemas en producción y proyectos en construcción. Cada uno resuelve
            un problema concreto de operación.
          </p>
          <p className="font-mono text-xs text-muted-foreground/70 mt-3">
            Aceptando 2 nuevos clientes · Q3 2026
          </p>
        </div>

        <ProjectShowcase />
      </div>
    </section>
  );
}
