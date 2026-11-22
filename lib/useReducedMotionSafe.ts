"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Igual ao useReducedMotion do framer-motion, mas sempre retorna `false` no
 * primeiro render (servidor e hidratação) e só depois aplica a preferência do
 * sistema. Evita "hydration mismatch" quando o valor muda estilos renderizados.
 */
export function useReducedMotionSafe(): boolean {
  const pref = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(pref) : false;
}
