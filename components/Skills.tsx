"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Database, Globe2, GraduationCap, Network, ShieldCheck, Code2 } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useI18n, type SkillNode, type SkillNodeId } from "@/lib/i18n";
import SectionTitle from "./SectionTitle";

const ICONS: Record<SkillNodeId, ReactNode> = {
  center: <Network size={18} />,
  tl: <Code2 size={16} />,
  tr: <Database size={16} />,
  bl: <Cpu size={16} />,
  br: <ShieldCheck size={16} />,
};

type PathDef = { id: string; d: string; ex: number; ey: number };

const NODE_IDS: Exclude<SkillNodeId, "center">[] = ["tl", "tr", "bl", "br"];

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Skills() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Partial<Record<SkillNodeId, HTMLDivElement | null>>>({});
  const [paths, setPaths] = useState<PathDef[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const reduce = useReducedMotion();

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const c = nodeRefs.current.center;
    if (!wrap || !c) return;
    const W = wrap.getBoundingClientRect();
    if (window.innerWidth < 1024) {
      setPaths([]);
      return;
    }
    const rel = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { l: r.left - W.left, r: r.right - W.left, t: r.top - W.top, b: r.bottom - W.top, cy: r.top - W.top + r.height / 2 };
    };
    const C = rel(c);
    const out: PathDef[] = [];
    for (const n of NODE_IDS) {
      const el = nodeRefs.current[n];
      if (!el) continue;
      const N = rel(el);
      const left = n === "tl" || n === "bl";
      const top = n === "tl" || n === "tr";
      const sy = C.cy + (top ? -28 : 28);
      const sx = left ? C.l : C.r;
      const ex = left ? N.r : N.l;
      const mid = (sx + ex) / 2;
      out.push({ id: n, d: `M ${sx} ${sy} H ${mid} V ${N.cy} H ${ex}`, ex, ey: N.cy });
    }
    setBox({ w: W.width, h: W.height });
    setPaths(out);
  }, []);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const setRef = (id: SkillNodeId) => (el: HTMLDivElement | null) => {
    nodeRefs.current[id] = el;
  };

  const { t, lang } = useI18n();
  const [tl, tr, bl, br] = t.skills.nodes;

  // o tamanho dos cards muda com o idioma: recalcula as linhas do circuito
  useEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [lang, measure]);

  return (
    <section id="skills" className="relative scroll-mt-20 overflow-hidden bg-obsidian px-5 py-24 sm:px-8 md:py-32">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <SectionTitle eyebrow={t.skills.eyebrow} title={t.skills.title} />

      <div ref={wrapRef} className="relative mx-auto max-w-[1200px]">
        {/* circuit */}
        {paths.length > 0 && (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden lg:block"
            width={box.w}
            height={box.h}
            viewBox={`0 0 ${box.w} ${box.h}`}
          >
            <defs>
              <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {paths.map((p, i) => (
              <g key={p.id}>
                <path d={p.d} fill="none" stroke="rgba(110,116,247,0.35)" strokeWidth="1" />
                {!reduce &&
                  [0, 1].map((k) => (
                    <motion.path
                      key={k}
                      d={p.d}
                      fill="none"
                      stroke="#A5A9FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray="6 94"
                      filter="url(#pulse-glow)"
                      initial={{ strokeDashoffset: 6 }}
                      animate={{ strokeDashoffset: -94 }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: i * 0.35 + k * 1.2 }}
                    />
                  ))}
                <circle
                  cx={p.ex}
                  cy={p.ey}
                  r="3"
                  fill="#6E74F7"
                  style={{ filter: "drop-shadow(0 0 4px #6E74F7)" }}
                />
              </g>
            ))}
          </svg>
        )}

        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1.05fr_1fr] lg:grid-rows-2 lg:gap-x-24 lg:gap-y-16">
          <div className="sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <CenterCard node={t.skills.center} kicker={t.skills.centerKicker} refCb={setRef("center")} />
          </div>
          <div className="lg:col-start-1 lg:row-start-1">
            <NodeCard node={tl} refCb={setRef("tl")} delay={0.1} />
          </div>
          <div className="lg:col-start-3 lg:row-start-1">
            <NodeCard node={tr} refCb={setRef("tr")} delay={0.2} />
          </div>
          <div className="lg:col-start-1 lg:row-start-2">
            <NodeCard node={bl} refCb={setRef("bl")} delay={0.3} />
          </div>
          <div className="lg:col-start-3 lg:row-start-2">
            <NodeCard node={br} refCb={setRef("br")} delay={0.4} />
          </div>
        </div>
      </div>

      {/* languages & courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-16 grid max-w-[1200px] gap-6 rounded-2xl border border-white/[0.08] bg-surface/60 p-6 backdrop-blur md:grid-cols-[auto_1fr] md:items-center md:gap-x-8 md:gap-y-4 md:p-7"
      >
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-indigo">
          <Globe2 size={14} /> {t.skills.languagesLabel}
        </span>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/80">
          {t.skills.languages.map((l, i) => (
            <span key={l} className="inline-flex items-center gap-3">
              {l}
              {i < t.skills.languages.length - 1 && <span className="text-indigo">·</span>}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-indigo">
          <GraduationCap size={14} /> {t.skills.coursesLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {t.skills.courses.map((c) => (
            <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/70">
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Chip({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <li
      className={`rounded-md border px-2.5 py-1 font-mono text-[11px] leading-tight ${
        strong ? "border-indigo/40 bg-indigo/10 text-white" : "border-white/10 bg-white/[0.03] text-white/75"
      }`}
    >
      {children}
    </li>
  );
}

function NodeCard({ node, refCb, delay }: { node: SkillNode; refCb: (el: HTMLDivElement | null) => void; delay: number }) {
  return (
    <motion.div
      ref={refCb}
      initial={{ opacity: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card-dark relative h-full rounded-2xl p-5"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-indigo">
          {ICONS[node.id]}
        </span>
        <h3 className="font-mono text-[11px] font-medium tracking-[0.2em] text-white">{node.label}</h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {node.items.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </ul>
    </motion.div>
  );
}

function CenterCard({ node, kicker, refCb }: { node: SkillNode; kicker: string; refCb: (el: HTMLDivElement | null) => void }) {
  return (
    <motion.div
      ref={refCb}
      initial={{ opacity: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border border-indigo bg-surface p-6 shadow-[0_0_0_1px_rgba(110,116,247,0.25),0_0_60px_-10px_rgba(110,116,247,0.6)]"
    >
      <div aria-hidden className="absolute inset-0 -z-10 rounded-2xl bg-indigo/20 blur-2xl" />
      <p className="font-mono text-[10px] tracking-[0.3em] text-indigo">{kicker}</p>
      <div className="mt-3 mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-indigo-deep text-white">
          {ICONS.center}
        </span>
        <h3 className="font-display text-2xl font-bold text-white">{node.label}</h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {node.items.map((s) => (
          <Chip key={s} strong>
            {s}
          </Chip>
        ))}
      </ul>
    </motion.div>
  );
}
