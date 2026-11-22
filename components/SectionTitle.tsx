"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionTitle({
  eyebrow,
  title,
  children,
  light = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
      <motion.p
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-indigo"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className={`font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${light ? "text-obsidian" : "text-gradient"}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        {title}
      </motion.h2>
      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
