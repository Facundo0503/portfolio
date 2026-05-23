"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stack = [
  "Next.js", "TypeScript", "Supabase", "Vercel",
  "WhatsApp API", "Claude AI", "Tailwind CSS", "PostgreSQL",
];

export default function About() {
  return (
    <section id="sobre-mi" className="py-28 px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Foto ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-2xl scale-75 opacity-60"
                style={{ background: "var(--accent-brand-glow)" }}
              />
              <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
                <Image
                  src="/foto-profesional-redondeada.svg"
                  alt="Facundo Cabrera"
                  fill
                  unoptimized
                  className="object-contain drop-shadow-xl"
                  sizes="(max-width: 640px) 320px, 380px"
                />
              </div>
            </div>
          </motion.div>

          {/* ── Texto ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              className="text-sm font-mono mb-4"
              style={{ color: "var(--accent-brand)" }}
            >
              Sobre mí
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Soy Facundo Cabrera.
              <br />
              <span className="text-muted-foreground font-normal text-2xl sm:text-3xl">
                Construyo sistemas, no promesas.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base mb-8">
              <p>
                Desarrollo software especializado en automatizaciones con IA y
                SaaS para negocios reales. Construyo aplicaciones completas:
                base de datos, lógica de negocio, interfaz e integraciones
                externas — todo en un solo sistema que funciona.
              </p>
              <p>
                Mi primer SaaS está en producción en{" "}
                <span className="text-foreground font-medium">MK Gym</span>{" "}
                (Villa Martelli): cuotas automatizadas, pipeline de morosidad y
                notificaciones por WhatsApp. Del diagnóstico al sistema
                funcionando en menos de 4 semanas.
              </p>
              <p>
                El modelo aplica igual a una barbería, una inmobiliaria o un
                estudio contable — el problema cambia, el enfoque no. Si tu
                negocio pierde tiempo en procesos que podrían estar
                automatizados, hablemos.
              </p>
            </div>

            {/* Stack */}
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-3 uppercase tracking-widest">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-md border border-border bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
