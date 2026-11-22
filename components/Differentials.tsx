"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Briefcase, Gauge, Server } from "lucide-react";
import SectionTitle from "./SectionTitle";

const ICONS = [<Server key="s" size={20} />, <Gauge key="g" size={20} />, <Briefcase key="b" size={20} />];

export default function Differentials() {
  const { t } = useI18n();
  const items = t.differentials.items.map((it, i) => ({ ...it, icon: ICONS[i], n: String(i + 1).padStart(2, "0") }));
  return (
    <section className="relative bg-white px-5 py-24 text-ink sm:px-8 md:py-32">
      <SectionTitle eyebrow={t.differentials.eyebrow} title={t.differentials.title} light>
        <p className="mx-auto max-w-xl text-base text-ink/70">
          {t.differentials.sub}
        </p>
      </SectionTitle>

      <div className="mx-auto grid max-w-[1280px] gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.article
            key={it.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl bg-obsidian p-8 text-white"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-indigo">
                {it.icon}
              </span>
              <span className="font-mono text-xs tracking-[0.3em] text-white/30">{it.n}</span>
            </div>
            <h3 className="mt-10 font-display text-2xl font-bold leading-tight">{it.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{it.text}</p>

            {/* luminous arc */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40">
              <div
                className="absolute left-1/2 top-[70%] h-[260px] w-[140%] -translate-x-1/2 rounded-[50%] border-t-2 border-indigo transition-transform duration-700 group-hover:-translate-y-3"
                style={{ boxShadow: "0 -10px 40px -4px rgba(110,116,247,0.75), inset 0 14px 40px -10px rgba(110,116,247,0.55)" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-24 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(60% 100% at 50% 100%, rgba(110,116,247,0.7), transparent)" }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
