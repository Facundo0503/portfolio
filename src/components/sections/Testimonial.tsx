"use client";

import { motion } from "framer-motion";

export default function Testimonial() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-2xl border border-border bg-card p-8 sm:p-12 text-center overflow-hidden"
        >
          {/* Glow sutil */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 100%, var(--accent-brand-glow), transparent)",
            }}
          />

          {/* Comillas */}
          <div
            className="relative z-10 text-6xl font-serif leading-none mb-6 select-none"
            style={{ color: "var(--accent-brand)", opacity: 0.5 }}
          >
            "
          </div>

          <blockquote className="relative z-10 text-lg sm:text-xl font-medium leading-relaxed mb-8 text-foreground">
            El sistema nos cambió la operación por completo. Antes perdíamos
            horas cada mes persiguiendo socios con deuda. Ahora el proceso
            es automático y los cobros mejoraron notablemente desde el
            primer mes.
          </blockquote>

          <footer className="relative z-10 flex flex-col items-center gap-1">
            <span className="text-sm font-semibold text-foreground">
              Lorena y Matías
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              MK Gym · Villa Martelli, Buenos Aires
            </span>
          </footer>
        </motion.div>
      </div>
    </section>
  );
}
