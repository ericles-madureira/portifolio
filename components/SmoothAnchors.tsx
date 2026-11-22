"use client";

import { useEffect } from "react";

const NAV_OFFSET = 72;
const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);

/**
 * Intercepta cliques em links "#secao" e faz a página DESCER animada até a
 * seção (em vez de pular). Funciona mesmo com "reduzir movimento" do sistema,
 * pois o pedido é explícito do usuário ao clicar. Rolar a roda/tocar cancela.
 */
export default function SmoothAnchors() {
  useEffect(() => {
    let raf = 0;
    let running = false;

    const cancel = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const scrollToY = (target: number) => {
      cancel();
      const start = window.scrollY;
      const dist = target - start;
      if (Math.abs(dist) < 2) return;
      const duration = Math.min(1600, Math.max(700, 500 + Math.abs(dist) * 0.22));
      const t0 = performance.now();
      running = true;
      const step = () => {
        if (!running) return;
        const t = Math.min((performance.now() - t0) / duration, 1);
        window.scrollTo(0, start + dist * easeInOutQuart(t));
        if (t < 1) raf = requestAnimationFrame(step);
        else running = false;
      };
      raf = requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el && id !== "top") return;
      e.preventDefault();
      const y = !el || id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      scrollToY(Math.max(0, y));
      history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    return () => {
      cancel();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, []);

  return null;
}
