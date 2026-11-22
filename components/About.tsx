"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Rich, useI18n } from "@/lib/i18n";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const COMMAND = "/ericles";

type Phase = "idle" | "open" | "typing" | "running" | "output";

const left: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const nameLine: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const termInView = useInView(termRef, { once: true, margin: "-120px" });
  const reduce = useReducedMotionSafe();
  const { t } = useI18n();
  const HEADING = t.about.heading;
  const headingRef = useRef(HEADING);
  headingRef.current = HEADING;

  const [phase, setPhase] = useState<Phase>("idle");
  const [cmd, setCmd] = useState("");
  const [heading, setHeading] = useState("");

  // sequência: terminal desce → digita /ericles → "executa" → imprime "Quem sou eu" + texto
  useEffect(() => {
    if (!termInView) return;
    // A digitação roda sempre (não é movimento de tela); com "reduzir movimento"
    // apenas a janela troca a descida por um fade.
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    setPhase("open");
    let t = 750; // tempo da janela descendo
    at(t, () => setPhase("typing"));
    for (let i = 1; i <= COMMAND.length; i++) {
      t += 85;
      const s = COMMAND.slice(0, i);
      at(t, () => setCmd(s));
    }
    t += 380;
    at(t, () => setPhase("running"));
    t += 450;
    at(t, () => setPhase("output"));
    const text = headingRef.current;
    for (let i = 1; i <= text.length; i++) {
      t += 55;
      const s = text.slice(0, i);
      at(t, () => setHeading(s));
    }
    return () => timers.forEach(window.clearTimeout);
  }, [termInView]);

  // trocou o idioma depois de digitado: mostra o título novo completo
  useEffect(() => {
    setHeading((h) => (h.length ? HEADING : h));
  }, [HEADING]);

  const opened = phase !== "idle";
  const printing = phase === "output";
  const headingDone = heading === HEADING;

  return (
    <section id="sobre" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden bg-obsidian px-5 py-24 sm:px-8 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(110,116,247,0.35), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-16">
        {/* ESQUERDA: apresentação */}
        <motion.div variants={left} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <motion.p variants={rise} className="mb-7 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-indigo sm:text-[11px]">
            <span className="h-px w-10 bg-indigo shadow-[0_0_8px_#6E74F7]" />
            {t.about.eyebrow}
          </motion.p>

          <h2 className="font-display text-6xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl xl:text-[5.5rem]">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={nameLine} className="block text-white">
                Ericles
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={nameLine} className="block text-[#8C91FF]">
                Madureiro<span className="text-white">.</span>
              </motion.span>
            </span>
          </h2>

          <motion.p variants={rise} className="mt-7 max-w-md text-lg leading-relaxed text-white/85 sm:text-xl">
            {t.about.taglineA}{" "}
            <em className="font-semibold text-white">{t.about.taglineB}</em>
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href="#projetos"
              className="btn-shine group relative inline-flex items-center gap-3 overflow-hidden rounded-lg bg-[#8C91FF] px-6 py-3.5 text-sm font-semibold text-obsidian shadow-[0_0_24px_rgba(110,116,247,0.35)] transition-all duration-300 hover:bg-indigo hover:text-white hover:shadow-[0_0_40px_rgba(110,116,247,0.7)]"
            >
              {t.about.ctaWork}
              <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a href="#contato" className="group inline-flex items-center gap-2 text-sm font-semibold text-white">
              <span className="relative">
                {t.about.ctaTalk}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-indigo transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowUpRight size={15} className="text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo" />
            </a>
          </motion.div>
        </motion.div>

        {/* divisor vertical */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden h-72 w-px origin-top bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block"
        />

        {/* DIREITA: terminal que desce e imprime "Quem sou eu" */}
        <div ref={termRef} className="relative">
          <motion.div
            initial={false}
            animate={
              opened
                ? { clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }
                : { clipPath: reduce ? "inset(0% 0% 0% 0% round 16px)" : "inset(0% 0% 100% 0% round 16px)", opacity: 0 }
            }
            transition={{ duration: reduce ? 0.4 : 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="relative rounded-2xl border border-white/[0.08] bg-surface/80 shadow-[0_30px_80px_-30px_rgba(110,116,247,0.35)] backdrop-blur"
          >
            {/* barra da janela */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.15em] text-white/35">ericles@portfolio: ~</span>
              <span className="ml-auto font-mono text-[10px] text-white/25">zsh</span>
            </div>

            <div className="p-5 sm:p-7">
              {/* linha de comando */}
              <p className="font-mono text-xs text-white/70 sm:text-sm">
                <span className="text-emerald-400">➜</span> <span className="text-indigo">~</span>{" "}
                <span className="text-white">{cmd}</span>
                {(phase === "open" || phase === "typing") && <Caret />}
              </p>
              {(phase === "running" || printing) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 font-mono text-[11px] text-white/35"
                >
                  {phase === "running" ? t.about.loadingProfile : t.about.loadedProfile}
                </motion.p>
              )}

              {/* saída */}
              <div className={`transition-opacity duration-300 ${printing ? "opacity-100" : "opacity-0"}`}>
                <p className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-indigo sm:text-[11px]">{t.about.sectionEyebrow}</p>
                <h3 className="min-h-[1.2em] font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span aria-hidden>{heading}</span>
                  <span className="sr-only">{HEADING}</span>
                  {printing && !headingDone && <Caret big />}
                </h3>

                <motion.div
                  initial="hidden"
                  animate={printing && headingDone ? "show" : "hidden"}
                  variants={{ show: { transition: { staggerChildren: 0.22 } } }}
                  className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted"
                >
                  {[t.about.p1, t.about.p2, t.about.p3].map((p, i) => (
                    <PrintLine key={i}>
                      <Rich text={p} />
                    </PrintLine>
                  ))}
                  <PrintLine>
                    <span className="mt-2 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.06] pt-4 font-mono text-xs text-white/50">
                      {t.about.stats.map(([n, l]) => (
                        <span key={l}>
                          <span className="text-indigo">{n}</span> {l}
                        </span>
                      ))}
                      <span className="inline-flex items-center">
                        <span className="text-emerald-400">➜</span>&nbsp;<span className="text-indigo">~</span>&nbsp;
                        <Caret />
                      </span>
                    </span>
                  </PrintLine>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div aria-hidden className="mx-auto mt-20 h-px max-w-[1280px] bg-white/[0.06]" />
    </section>
  );
}

function PrintLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={{
        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        show: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.p>
  );
}

function Caret({ big = false }: { big?: boolean }) {
  return (
    <span
      aria-hidden
      className={`caret ml-1 inline-block bg-indigo align-middle ${big ? "h-7 w-[3px] sm:h-8" : "h-3.5 w-[7px]"}`}
    />
  );
}
