"use client";

import { useI18n } from "@/lib/i18n";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DURATION = 1900;
const START_DELAY = 350;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.2);
const HEX_CELLS = 32;
const toHex = (n: number) => n.toString(16).toUpperCase().padStart(2, "0");
/** Byte pseudo-aleatório determinístico (evita mismatch de hidratação). */
const hash = (i: number, seed: number) => ((i * 73 + seed * 151 + 41) * 2654435761) % 256 >>> 0;

export default function PreloaderCurtain({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const finished = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");
    window.scrollTo(0, 0);
    // O contador roda com a duração completa mesmo com "reduzir movimento":
    // números mudando não são movimento; só a cortina vira fade nesse modo.
    // Usa um timer de relógio real (não rAF) para nunca travar se os frames pausarem.
    const start = performance.now() + START_DELAY;
    let hideTimer = 0;

    const interval = window.setInterval(() => {
      const t = Math.min(Math.max((performance.now() - start) / DURATION, 0), 1);
      setProgress(Math.round(easeOut(t) * 100));
      if (t >= 1 && !finished.current) {
        finished.current = true;
        window.clearInterval(interval);
        hideTimer = window.setTimeout(() => {
          setVisible(false);
          onDone();
        }, 450);
      }
    }, 16);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(hideTimer);
      finished.current = false;
    };
  }, [onDone]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.classList.remove("is-loading");
      }}
    >
      {visible && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian"
          initial={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.5 : 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-live="polite"
          aria-label={`${t.preloader.loading} ${progress}%`}
          role="status"
        >
          {/* ambient aura */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(110,116,247,0.22), transparent 65%)" }}
          />

          <div className="overflow-hidden px-6">
            <motion.h1
              className="font-display text-[13vw] font-extrabold uppercase leading-none tracking-[0.2em] text-white sm:text-7xl md:text-8xl"
              initial={{ y: 24, opacity: 0, clipPath: "inset(100% 0 0 0)" }}
              animate={{ y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Ericles
            </motion.h1>
            <motion.p
              className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t.preloader.tagline}
            </motion.p>
          </div>

          <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 sm:left-10 sm:top-10">
            {t.preloader.corner}
          </div>

          {/* hex counter */}
          <div className="absolute bottom-12 right-5 text-right sm:bottom-16 sm:right-10">
            <div className="font-mono text-6xl font-bold leading-none tabular-nums text-white sm:text-8xl md:text-[9rem]">
              <span className="text-indigo">0x</span>
              {toHex(progress)}
            </div>
            <div className="mt-2 font-mono text-[10px] tracking-[0.35em] text-white/40 sm:text-xs">
              = {String(progress).padStart(3, "0")}% <span className="text-indigo">/</span> 0x64
            </div>
          </div>

          {/* hex byte stream (substitui a linha de progresso) */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 flex justify-between gap-1 border-t border-white/5 px-5 py-3 font-mono text-[10px] sm:px-10 sm:text-[11px]"
          >
            {Array.from({ length: HEX_CELLS }, (_, i) => {
              const lit = i < Math.round((progress / 100) * HEX_CELLS);
              const head = i === Math.round((progress / 100) * HEX_CELLS) - 1;
              return (
                <span
                  key={i}
                  className={`hex-cell tabular-nums ${i >= HEX_CELLS / 2 ? "hidden sm:inline" : ""}`}
                  style={{
                    color: lit ? (head ? "#fff" : "#6E74F7") : "rgba(255,255,255,0.14)",
                    textShadow: lit ? "0 0 10px rgba(110,116,247,0.9)" : "none",
                  }}
                >
                  {toHex(lit ? hash(i, 0) : hash(i, progress))}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
