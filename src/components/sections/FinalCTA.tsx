"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "5491161053326";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola Facundo, vi tu portfolio y quiero saber cómo podés ayudar a mi negocio."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

export default function FinalCTA() {
  return (
    <section id="contacto" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-border bg-card p-12 overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, var(--accent-brand-glow), transparent)",
            }}
          />

          <div className="relative z-10">
            <p
              className="text-sm font-mono mb-4"
              style={{ color: "var(--accent-brand)" }}
            >
              ¿Listo para empezar?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              ¿Qué proceso querés
              <br />
              <span className="gradient-text">que se haga solo?</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto">
              Una conversación de 30 minutos es suficiente para entender si
              puedo ayudarte. Sin compromiso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="gap-2 bg-[#25D366] hover:bg-[#20bd59] text-white font-medium px-8"
                >
                  <MessageCircle className="w-5 h-5" />
                  Hablar por WhatsApp
                </Button>
              </a>
              <a href="mailto:hola@cfacu.dev">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-border hover:bg-secondary px-8"
                >
                  <Mail className="w-5 h-5" />
                  Enviar email
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
