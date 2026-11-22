"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import { useI18n, type Experience } from "@/lib/i18n";
import SectionTitle from "./SectionTitle";

export default function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { t } = useI18n();

  return (
    <section id="experiencias" className="relative scroll-mt-20 bg-obsidian px-5 py-24 sm:px-8 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[50vmin] w-[70vmin] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(110,116,247,0.35), transparent 70%)" }}
      />
      <SectionTitle eyebrow={t.timeline.eyebrow} title={t.timeline.title} />

      <div ref={listRef} className="relative mx-auto max-w-3xl">
        {/* rail */}
        <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <motion.div
            style={{ scaleY: lineScale }}
            className="h-full w-full origin-top bg-gradient-to-b from-indigo via-indigo to-indigo-deep shadow-[0_0_12px_#6E74F7]"
          />
        </div>

        <ol className="space-y-10 md:space-y-24">
          {t.timeline.items.map((exp, i) => (
            <TimelineItem key={exp.org + i} exp={exp} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function useSpotlight(progress: MotionValue<number>, reduce: boolean) {
  const r = reduce ? [1, 1, 1, 1, 1] : undefined;
  const opacity = useTransform(progress, [0, 0.35, 0.5, 0.65, 1], r ?? [0.25, 1, 1, 1, 0.25]);
  const scale = useTransform(progress, [0, 0.35, 0.5, 0.65, 1], r ?? [0.96, 1, 1, 1, 0.96]);
  const blurPx = useTransform(progress, [0, 0.35, 0.5, 0.65, 1], reduce ? [0, 0, 0, 0, 0] : [2, 0, 0, 0, 2]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);
  const dotGlow = useTransform(progress, [0.3, 0.5, 0.7], [0, 1, 0]);
  return { opacity, scale, filter, dotGlow };
}

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { opacity, scale, filter, dotGlow } = useSpotlight(scrollYProgress, reduce);
  const right = index % 2 === 1;

  return (
    <motion.li
      ref={ref}
      style={{ opacity, scale, filter }}
      className="relative pl-10 will-change-transform md:grid md:grid-cols-2 md:gap-16 md:pl-0"
    >
      {/* node */}
      <span aria-hidden className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center md:left-1/2 md:-translate-x-1/2">
        <span className="h-[15px] w-[15px] rounded-full border border-indigo bg-obsidian" />
        <motion.span style={{ opacity: dotGlow }} className="absolute h-[15px] w-[15px] rounded-full bg-indigo shadow-[0_0_18px_#6E74F7]" />
      </span>

      <div className={`${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
        <p className="font-mono text-xs font-medium tracking-[0.25em] text-indigo">{exp.period}</p>
        <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-white sm:text-[1.7rem]">{exp.role}</h3>
        <p className="mt-1 font-display text-base font-medium italic text-white/60">{exp.org}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{exp.description}</p>
        <span className="mt-5 inline-block rounded-full border border-indigo/40 bg-indigo/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-white/90">
          {exp.badge}
        </span>
      </div>
    </motion.li>
  );
}
