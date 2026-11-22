"use client";

import { Rich, useI18n } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useI18n();
  const state = ready ? "show" : "hidden";

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-obsidian pt-20"
    >
      {/* circuitos nos cantos inferiores */}
      <CornerCircuit side="left" />
      <CornerCircuit side="right" />

      {/* conteúdo */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={state}
        className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 items-center px-5 py-16 sm:px-8 lg:px-16"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-5xl">
            <motion.p
              variants={item}
              className="mb-7 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-indigo sm:text-xs"
            >
              <span className="h-px w-10 bg-indigo shadow-[0_0_8px_#6E74F7]" />
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={item}
              className="font-display text-[2.35rem] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl xl:text-[4.1rem] 3xl:text-[5.2rem]"
            >
              <Rich text={t.hero.headline} accentClass="bg-gradient-to-r from-indigo to-[#8C91FF] bg-clip-text text-transparent" />
            </motion.h1>
            <motion.p variants={item} className="mt-7 max-w-2xl font-mono text-sm leading-relaxed text-white/60 sm:text-base">
              {t.hero.sub}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
              <a
                href="#projetos"
                className="btn-shine group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-indigo px-7 py-4 font-mono text-xs font-bold tracking-[0.2em] text-white shadow-[0_0_30px_rgba(110,116,247,0.45)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(110,116,247,0.8)]"
              >
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#contato"
                className="group relative inline-flex items-center gap-3 pb-2 font-mono text-xs font-bold tracking-[0.2em] text-white"
              >
                {t.hero.ctaSecondary}
                <ArrowRight size={15} className="text-indigo transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
                <span className="absolute bottom-0 left-0 h-[2px] w-[80%] bg-indigo shadow-[0_0_8px_#6E74F7] transition-all duration-500 group-hover:w-full" />
              </a>
            </motion.div>
          </div>

          <motion.div variants={item} className="relative hidden items-center lg:flex">
            <span className="relative z-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-surface/80 px-5 py-2.5 font-mono text-[11px] tracking-[0.25em] text-white/90 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo" />
              </span>
              {t.hero.badge}
            </span>
            {/* linha que sai do selo até a borda da tela */}
            <span aria-hidden className="absolute left-full top-1/2 h-px w-[50vw] bg-gradient-to-r from-white/15 to-transparent" />
          </motion.div>

          <motion.span
            variants={item}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-white/90 lg:hidden"
          >
            <span className="h-2 w-2 rounded-full bg-indigo" />
            {t.hero.badge}
          </motion.span>
        </div>
      </motion.div>

      {/* indicador de scroll */}
      <motion.a
        href="#projetos"
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="group relative z-20 mx-auto mb-8 flex flex-col items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-white/50 transition-colors hover:text-white sm:text-[11px]"
      >
        <span className="relative flex h-11 w-7 justify-center rounded-full border-2 border-white/60 transition-colors group-hover:border-indigo">
          <span className="scroll-wheel mt-2 h-2 w-[2px] rounded-full bg-white" />
          <ChevronDown size={12} className="absolute bottom-1 text-indigo" />
        </span>
        {t.hero.scroll}
      </motion.a>
    </section>
  );
}

function CornerCircuit({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  const main = left ? "M0 30 L120 150 L290 150 L390 250" : "M420 250 L560 110 L700 110";
  const ghost = left ? "M0 90 L80 170 L200 170" : "M520 250 L620 150 L700 150";
  return (
    <svg
      aria-hidden
      viewBox="0 0 700 250"
      preserveAspectRatio={left ? "xMinYMax meet" : "xMaxYMax meet"}
      className={`pointer-events-none absolute bottom-0 z-10 h-[24vh] w-[48vw] ${left ? "left-0" : "right-0"}`}
    >
      <defs>
        <filter id={`cc-glow-${side}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={ghost} fill="none" stroke="rgba(110,116,247,0.18)" strokeWidth="1" />
      <path d={main} fill="none" stroke="rgba(110,116,247,0.55)" strokeWidth="1.5" filter={`url(#cc-glow-${side})`} />
      <path
        d={main}
        fill="none"
        stroke="#A5A9FF"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="10 90"
        className="circuit-pulse"
        style={{ animationDelay: left ? "0s" : "1.6s" }}
        filter={`url(#cc-glow-${side})`}
      />
    </svg>
  );
}
