"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "¿Cómo definimos el alcance y el precio del proyecto?",
    a: "Arrancamos con una llamada diagnóstico sin cargo. Entiendo tu proceso actual, identifico dónde está el problema real y te propongo la solución más simple que lo resuelve. Los proyectos arrancan desde $800 USD — el número exacto lo definimos juntos según el alcance, no antes.",
  },
  {
    q: "¿Cuánto tiempo lleva el desarrollo?",
    a: "Depende del proyecto. Sistemas de automatización puntuales pueden estar listos en menos de una semana. Un SaaS completo con panel de control, base de datos e integraciones puede llevar 2 a 4 semanas. Trabajo con entregas parciales: ves progreso desde el día uno.",
  },
  {
    q: "¿Necesito saber de tecnología para trabajar con vos?",
    a: "No. Mi trabajo es traducir tu problema de negocio a un sistema que funcione. Solo necesitás entender tu propio proceso — yo me encargo del resto. La entrega incluye documentación en términos simples, sin jerga técnica.",
  },
  {
    q: "¿Qué pasa si algo falla después de la entrega?",
    a: "Todos los proyectos incluyen soporte post-entrega. Los bugs que aparezcan en producción los resuelvo sin costo adicional. Si querés soporte continuo a largo plazo, lo coordinamos con un plan mensual.",
  },
  {
    q: "¿Solo trabajás con gimnasios?",
    a: "No. Trabajo con cualquier negocio que tenga procesos repetitivos que se puedan automatizar: barberías, inmobiliarias, estudios contables, clínicas, e-commerce. Si perdés tiempo haciendo lo mismo cada semana, probablemente tengo una solución.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-sm font-mono mb-3"
            style={{ color: "var(--accent-brand)" }}
          >
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Lo que siempre me preguntan
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="rounded-xl border bg-card overflow-hidden"
                style={{ borderColor: isOpen ? "var(--accent-brand)" : "var(--border)" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                    style={{ color: isOpen ? "var(--accent-brand)" : "var(--muted-foreground)" }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
