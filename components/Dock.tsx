"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Dock({ ready }: { ready: boolean }) {
  const { t } = useI18n();
  return (
    <motion.div
      className="group fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
      initial={{ y: 40, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* halo pulsante + aura grande (só no hover) */}
      <span aria-hidden className="cta-halo pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(closest-side, rgba(110,116,247,0.75), transparent)" }}
      />
      <motion.a
        href="#contato"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        aria-label={t.dock.aria}
        className="dock-btn btn-shine relative flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-surface/80 py-3 pl-5 pr-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo opacity-75 group-hover:bg-white" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo transition-colors group-hover:bg-white" />
        </span>
        <span className="text-sm font-semibold text-white">{t.dock.label}</span>
        <ArrowRight size={15} className="text-indigo transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
      </motion.a>
    </motion.div>
  );
}
