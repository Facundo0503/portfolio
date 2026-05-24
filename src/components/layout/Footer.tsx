import { Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm">
            cfacu<span style={{ color: "var(--accent-brand)" }}>.ai</span>
          </span>
          <span className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Facundo Cabrera
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/cfacu.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram @cfacu.ai"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:hola@cfacu.dev"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
