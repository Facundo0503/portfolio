"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "5491161053326";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola Facundo, vi tu portfolio y quiero saber cómo podés ayudar a mi negocio."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

function fadeProps(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  };
}

const stats = [
  { value: "2-4 sem",    label: "Del diagnóstico al sistema funcionando" },
  { value: "$800k ARS",  label: "Recuperados para MK Gym en 60 días" },
  { value: "6 hs/sem",   label: "De trabajo manual eliminado" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mide el progreso del scroll relativo a la sección
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Capa de fondo con parallax ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-grid"
        style={{ y: bgY }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, var(--accent-brand-glow), transparent)",
        }}
      />

      {/* ── Contenido principal ── */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* ── Avatar ── */}
        <motion.div
          {...fadeProps(0)}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-md scale-110 opacity-50"
              style={{ background: "var(--accent-brand-glow)" }}
            />
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2"
              style={{ borderColor: "var(--accent-brand)" }}
            >
              <Image
                src="/foto-profesional-redondeada.svg"
                alt="Facundo Cabrera"
                fill
                unoptimized
                className="object-cover"
                priority
                sizes="80px"
              />
            </div>
          </div>
          <p
            className="font-mono text-xs flex items-center gap-2"
            style={{ color: "var(--accent-brand)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent-brand)" }}
            />
            Facundo Cabrera · cfacu.ai
          </p>
        </motion.div>

        <motion.h1
          {...fadeProps(0.1)}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
        >
          Tu negocio puede{" "}
          <span className="gradient-text">correr solo.</span>
          <br />
          Yo construyo los sistemas
          <br />
          que lo hacen posible.
        </motion.h1>

        <motion.p
          {...fadeProps(0.2)}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
        >
          Automatizaciones, SaaS y sistemas con IA para negocios en LATAM
          que quieren crecer sin sumar más personal.
        </motion.p>

        <motion.div
          {...fadeProps(0.3)}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#20bd59] text-white font-semibold px-7"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </Button>
          </a>
          <a href="#proyectos">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 border-border hover:bg-secondary px-7"
            >
              Ver casos reales
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        <motion.div {...fadeProps(0.4)} className="flex flex-wrap justify-center gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span
                className="text-xl font-bold font-mono"
                style={{ color: "var(--accent-brand)" }}
              >
                {s.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
