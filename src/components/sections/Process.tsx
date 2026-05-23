"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Entiendo tu negocio, tus procesos actuales y dónde se pierde más tiempo y plata. Una llamada de 30 minutos es suficiente.",
  },
  {
    number: "02",
    title: "Diseño del sistema",
    description:
      "Propongo la solución más simple que resuelve el problema real. Sin sobreingeniería, sin tecnología innecesaria.",
  },
  {
    number: "03",
    title: "Construcción",
    description:
      "Desarrollo iterativo con entregas parciales. Ves el progreso desde el día uno, no esperás meses para ver algo funcionando.",
  },
  {
    number: "04",
    title: "Entrega y soporte",
    description:
      "El sistema queda en tus manos con documentación clara. Seguimiento incluido para asegurar que funcione en producción real.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-sm font-mono mb-3"
            style={{ color: "var(--accent-brand)" }}
          >
            ¿Cómo trabajamos?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Proceso directo, sin vueltas
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            De la idea al sistema funcionando. Sin reuniones eternas, sin
            presupuestos que no se cumplen.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative sm:pl-16 flex flex-col sm:flex-row gap-4"
              >
                {/* Step number circle */}
                <div
                  className="hidden sm:flex absolute left-0 w-12 h-12 rounded-full border border-border bg-card items-center justify-center font-mono text-sm font-bold z-10"
                  style={{ color: "var(--accent-brand)" }}
                >
                  {step.number}
                </div>

                {/* Mobile step number */}
                <span
                  className="sm:hidden font-mono text-sm font-bold"
                  style={{ color: "var(--accent-brand)" }}
                >
                  {step.number}
                </span>

                {/* Content */}
                <div className="card-hover rounded-xl border border-border bg-card p-6 flex-1">
                  <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
