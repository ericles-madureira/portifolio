"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * Luz índigo que segue o cursor em todo o site.
 * Fica fixa na tela, acima dos fundos das seções (mix-blend: screen),
 * então "acende" o preto e não altera a seção branca.
 */
export default function CursorGlow() {
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const coreX = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const coreY = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });
  const trailX = useSpring(mx, { stiffness: 45, damping: 18, mass: 1.2 });
  const trailY = useSpring(my, { stiffness: 45, damping: 18, mass: 1.2 });
  const intensity = useMotionValue(0);
  const glow = useSpring(intensity, { stiffness: 80, damping: 22 });
  const trailOpacity = useTransform(glow, (v) => v * 0.9);

  useEffect(() => {
    let idle = 0;
    let first = true;
    const onMove = (e: PointerEvent) => {
      if (first) {
        // primeira aparição: posiciona sem "voar" do canto
        coreX.jump(e.clientX);
        coreY.jump(e.clientY);
        trailX.jump(e.clientX);
        trailY.jump(e.clientY);
        first = false;
      }
      mx.set(e.clientX);
      my.set(e.clientY);
      intensity.set(1);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => intensity.set(0.35), 1400);
    };
    const onLeave = () => {
      window.clearTimeout(idle);
      intensity.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my, coreX, coreY, trailX, trailY, intensity]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[35] overflow-hidden mix-blend-screen">
      {/* halo que arrasta atrás */}
      <motion.div
        style={{ x: trailX, y: trailY, opacity: trailOpacity, translateX: "-50%", translateY: "-50%" }}
        className="absolute left-0 top-0 h-[70vmin] w-[70vmin] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,64,184,0.42) 0%, rgba(59,64,184,0.16) 35%, transparent 68%)" }}
        />
      </motion.div>
      {/* núcleo */}
      <motion.div
        style={{ x: coreX, y: coreY, opacity: glow, translateX: "-50%", translateY: "-50%" }}
        className="absolute left-0 top-0 h-[34vmin] w-[34vmin] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(110,116,247,0.45) 0%, rgba(110,116,247,0.16) 40%, transparent 70%)" }}
        />
      </motion.div>
    </div>
  );
}
