"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";

export default function Navbar({ ready }: { ready: boolean }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const left = [
    { href: "#projetos", label: t.nav.projects },
    { href: "#sobre", label: t.nav.about },
    { href: "#experiencias", label: t.nav.experience },
  ];

  const linkCls =
    "relative font-mono text-[11px] tracking-[0.22em] text-white/70 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-indigo after:transition-all hover:after:w-full";

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ${
        scrolled ? "border-white/5 bg-obsidian/70 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
    >
      <nav className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 md:h-20">
        <ul className="hidden items-center gap-8 md:flex">
          {left.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkCls}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <span aria-hidden />

        <div className="flex items-center justify-end gap-3 sm:gap-6">
          <a href="#skills" className={`${linkCls} hidden md:inline`}>
            {t.nav.skills}
          </a>
          <LangToggle />
          <a
            href="#contato"
            className="rounded-full border border-indigo px-4 py-2 font-mono text-[11px] tracking-[0.22em] text-white transition-all duration-300 hover:bg-indigo hover:shadow-[0_0_24px_rgba(110,116,247,0.55)] sm:px-5"
          >
            {t.nav.contact}
          </a>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="mx-5 mb-4 flex flex-col gap-1 overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-3 backdrop-blur-md md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...left, { href: "#skills", label: t.nav.skills }].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-mono text-xs tracking-[0.22em] text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const LANGS: { id: Lang; label: string; title: string }[] = [
  { id: "pt", label: "PT", title: "Português" },
  { id: "en", label: "EN", title: "English" },
];

function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="relative flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 font-mono text-[10px] tracking-[0.15em]"
    >
      {LANGS.map((l) => {
        const active = lang === l.id;
        return (
          <button
            key={l.id}
            type="button"
            onClick={() => setLang(l.id)}
            aria-pressed={active}
            title={l.title}
            className={`relative z-10 rounded-full px-2.5 py-1.5 transition-colors duration-300 ${
              active ? "text-white" : "text-white/45 hover:text-white/80"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-indigo shadow-[0_0_16px_rgba(110,116,247,0.6)]"
              />
            )}
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
