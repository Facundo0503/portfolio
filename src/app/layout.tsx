import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cfacu.dev"),
  title: "cfacu.ai — Automatizaciones con IA para negocios en LATAM",
  description:
    "Construyo sistemas con IA que reemplazan procesos manuales. Automatizaciones, SaaS a medida e integraciones WhatsApp para negocios en LATAM.",
  keywords: [
    "automatizaciones IA",
    "SaaS LATAM",
    "sistemas inteligentes",
    "WhatsApp automatización",
    "Facundo Cabrera",
    "cfacu.ai",
  ],
  authors: [{ name: "Facundo Cabrera" }],
  creator: "Facundo Cabrera",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://cfacu.dev",
    title: "cfacu.ai — Automatizaciones con IA para negocios en LATAM",
    description:
      "Construyo sistemas con IA que reemplazan procesos manuales. Para negocios en LATAM que quieren escalar sin contratar más gente.",
    siteName: "cfacu.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "cfacu.ai — Automatizaciones con IA para negocios en LATAM",
    description:
      "Construyo sistemas con IA que reemplazan procesos manuales. Para negocios en LATAM.",
    creator: "@cfacu.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
