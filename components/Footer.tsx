"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { CONTACT } from "@/lib/data";
import { Rich, useI18n } from "@/lib/i18n";
import ContactForm from "./ContactForm";
import { GithubIcon, GmailColorIcon, LinkedinIcon, Monogram } from "./Icons";

/** Atualiza --mx/--my para o efeito de spotlight que segue o cursor. */
function trackSpot(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Footer() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const emailHover = useStickyHover();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = CONTACT.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer id="contato" className="relative scroll-mt-16 overflow-hidden bg-obsidian px-5 pt-24 sm:px-8 md:pt-32">
      {/* CTA banner with animated border */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="border-spin relative mx-auto max-w-[1280px] rounded-3xl p-px"
      >
        <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface">
          <div aria-hidden className="aurora aurora-a" />
          <div aria-hidden className="aurora aurora-b" />
          <div aria-hidden className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

          <div className="relative grid gap-10 px-5 py-12 sm:px-8 md:px-14 md:py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div className="lg:pt-4">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo/40 bg-indigo/10 px-3 py-1 font-mono text-[10px] tracking-[0.25em] text-white/90">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t.contact.available}
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                <Rich text={t.contact.headline} accentClass="bg-gradient-to-r from-indigo to-[#A5A9FF] bg-clip-text text-transparent" />
              </h2>
              <p className="mt-4 max-w-md text-muted">
                {t.contact.sub}
              </p>

              <ul className="mt-8 space-y-3 font-mono text-[11px] tracking-[0.15em] text-white/60">
                {t.contact.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="h-px w-6 bg-indigo shadow-[0_0_6px_#6E74F7]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>
        </div>
      </motion.div>

      {/* direct contacts */}
      <div className="mx-auto mt-8 grid max-w-[1280px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <motion.button
          onClick={copy}
          onMouseMove={trackSpot}
          {...emailHover.handlers}
          whileTap={{ scale: 0.98 }}
          className="spot-card group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl p-4 text-left lg:col-span-2"
          aria-label={t.contact.copyAria}
        >
          <span className="relative flex min-w-0 items-center gap-3">
            <BrandIcon brand="gmail" active={emailHover.active} mono={<Mail size={17} />} />
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{t.contact.emailLabel}</span>
              <span className="block truncate text-sm text-white">{CONTACT.email}</span>
            </span>
          </span>
          <span
            className={`relative flex h-8 min-w-[96px] items-center justify-center rounded-full border px-3 transition-colors ${
              copied ? "border-emerald-400/50 bg-emerald-400/10" : "border-white/10 bg-white/[0.03] group-hover:border-indigo/50"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400"
                >
                  <Check size={14} /> {t.contact.copied}
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-white/60 group-hover:text-white"
                >
                  <Copy size={13} /> {t.contact.copy}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>

        <ContactLink href={CONTACT.linkedin} label="LinkedIn" value="/in/ericlesmadureiro" brand="linkedin" />
        <ContactLink href={CONTACT.github} label="GitHub" value="/ericles-madureira" brand="github" />
      </div>

      <div className="mx-auto mt-14 flex max-w-[1280px] flex-col items-center justify-between gap-5 border-t border-white/[0.06] py-8 pb-24 text-center sm:flex-row sm:pb-8 sm:text-left">
        <div className="flex items-center gap-3">
          <Monogram size={32} />
          <span className="text-sm text-white/50">© {new Date().getFullYear()} Ericles Madureiro</span>
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white/40">
          <MapPin size={13} className="text-indigo" /> {t.contact.location}
        </span>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[10px] tracking-[0.25em] text-white/60 transition-all hover:border-indigo/60 hover:text-white sm:mr-44"
        >
          {t.contact.backToTop}
          <ArrowUp size={13} className="text-indigo transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}

const LINGER_MS = 3200;

/** Hover "pegajoso": ativa ao entrar e só desativa 3,2 s depois de sair. */
function useStickyHover() {
  const [active, setActive] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return {
    active,
    handlers: {
      onMouseEnter: () => {
        window.clearTimeout(timer.current);
        setActive(true);
      },
      onMouseLeave: () => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setActive(false), LINGER_MS);
      },
      onFocus: () => setActive(true),
      onBlur: () => {
        timer.current = window.setTimeout(() => setActive(false), LINGER_MS);
      },
    },
  };
}

type Brand = "gmail" | "linkedin" | "github";

const BRAND: Record<Brand, { ring: string; glow: string; logo: ReactNode; mono: ReactNode }> = {
  gmail: {
    ring: "rgba(234,67,53,0.8)",
    glow: "0 0 24px rgba(234,67,53,0.55), 0 0 48px rgba(251,192,45,0.25)",
    logo: <GmailColorIcon size={22} />,
    mono: null,
  },
  linkedin: {
    ring: "rgba(10,102,194,0.9)",
    glow: "0 0 24px rgba(10,102,194,0.7), 0 0 48px rgba(10,102,194,0.35)",
    logo: <LinkedinIcon size={20} style={{ color: "#0A66C2" }} />,
    mono: <LinkedinIcon size={17} />,
  },
  github: {
    ring: "rgba(255,255,255,0.85)",
    glow: "0 0 24px rgba(255,255,255,0.45), 0 0 48px rgba(110,116,247,0.35)",
    logo: <GithubIcon size={22} style={{ color: "#181717" }} />,
    mono: <GithubIcon size={17} />,
  },
};

function BrandIcon({ brand, active, mono }: { brand: Brand; active: boolean; mono?: ReactNode }) {
  const b = BRAND[brand];
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
      {/* ondas circulares */}
      {active &&
        [0, 0.45].map((d) => (
          <span
            key={d}
            aria-hidden
            className="brand-ripple absolute inset-0 rounded-full border-2"
            style={{ borderColor: b.ring, animationDelay: `${d}s` }}
          />
        ))}
      <motion.span
        animate={{
          borderRadius: active ? 999 : 12,
          backgroundColor: active ? "#FFFFFF" : "rgba(255,255,255,0.04)",
          borderColor: active ? b.ring : "rgba(255,255,255,0.10)",
          boxShadow: active ? b.glow : "0 0 0 rgba(0,0,0,0)",
          rotate: active ? 360 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-10 w-10 items-center justify-center border text-indigo"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active ? "logo" : "mono"}
            initial={{ scale: 0.3, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.3, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            {active ? b.logo : (mono ?? b.mono)}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}

function ContactLink({ href, label, value, brand }: { href: string; label: string; value: string; brand: Brand }) {
  const hover = useStickyHover();
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={trackSpot}
      {...hover.handlers}
      whileHover={{ y: -3 }}
      className="spot-card group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl p-4"
    >
      <span className="relative flex min-w-0 items-center gap-3">
        <BrandIcon brand={brand} active={hover.active} />
        <span className="min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</span>
          <span className="block truncate text-sm text-white">{value}</span>
        </span>
      </span>
      <ArrowUpRight
        size={16}
        className="relative shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo"
      />
    </motion.a>
  );
}
