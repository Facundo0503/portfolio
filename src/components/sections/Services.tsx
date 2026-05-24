"use client";

import { motion } from "framer-motion";
import { Bot, Smartphone, Zap, LayoutDashboard, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Automatizaciones con IA",
    description:
      "¿Cuántas horas por semana perdés haciendo siempre lo mismo? Te construyo el flujo que lo hace solo — clasificación, respuestas, procesamiento de datos — sin que tengas que tocarlo.",
  },
  {
    icon: LayoutDashboard,
    title: "SaaS a medida",
    description:
      "Tu propio sistema de gestión: cuotas, CRM, reservas, dashboards. Construido sobre tu lógica de negocio, no al revés. Sin licencias mensuales de software genérico.",
  },
  {
    icon: Smartphone,
    title: "Cobranza y seguimiento por WhatsApp",
    description:
      "Recordatorios de vencimiento, pipelines de morosidad y seguimiento de clientes por el canal que ya usan a diario. Automatizado, con lógica real de negocio.",
  },
  {
    icon: Zap,
    title: "Sistemas operativos completos",
    description:
      "Base de datos, lógica de negocio, notificaciones y panel de control — todo conectado. Un sistema que opera mientras vos te enfocás en hacer crecer el negocio.",
  },
];


export default function Services() {
  return (
    <section id="servicios" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-sm font-mono mb-3"
            style={{ color: "var(--accent-brand)" }}
          >
            En qué puedo ayudarte
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Lo que construyo
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Cada solución parte de un problema real de tu negocio.
            Nada genérico, nada que no puedas usar desde el día uno.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="card-hover group relative rounded-xl border border-border bg-card p-7"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "var(--accent-brand-glow)" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "var(--accent-brand)" }}
                  />
                </div>
                <h3 className="font-semibold text-base mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Price anchor + CTA */}
        <div className="text-center mt-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 bg-card">
            <span className="text-sm font-mono font-semibold" style={{ color: "var(--accent-brand)" }}>
              Proyectos desde $800 USD
            </span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="text-xs text-muted-foreground">alcance y precio definidos en el diagnóstico</span>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--accent-brand)" }}
          >
            ¿Esto aplica a tu negocio? Hablemos 30 minutos
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
