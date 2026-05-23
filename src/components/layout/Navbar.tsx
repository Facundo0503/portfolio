"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "5491161053326";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola Facundo, vi tu portfolio y quiero saber cómo podés ayudar a mi negocio."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const navLinks = [
  { href: "#proyectos",  label: "Proyectos" },
  { href: "#servicios",  label: "Servicios" },
  { href: "#sobre-mi",   label: "Sobre mí" },
  { href: "#proceso",    label: "Proceso" },
  { href: "#faq",        label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-mono font-bold text-lg tracking-tight">
          <span
            className="flex items-center justify-center w-[26px] h-[26px] rounded-[5px] text-xs font-black flex-shrink-0 select-none"
            style={{ background: "var(--accent-brand)", color: "oklch(0.09 0 0)" }}
            aria-hidden="true"
          >
            c
          </span>
          <span>facu<span style={{ color: "var(--accent-brand)" }}>.ai</span></span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="gap-2 bg-[#25D366] hover:bg-[#20bd59] text-white font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-6 pt-2 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <Button
              size="sm"
              className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd59] text-white font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
