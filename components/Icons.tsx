import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

export function GithubIcon({ size = 18, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 .5C5.73.5.67 5.56.67 11.83c0 5 3.24 9.25 7.75 10.75.57.1.78-.25.78-.55v-1.93c-3.15.69-3.82-1.52-3.82-1.52-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .95-.31 3.12 1.16a10.8 10.8 0 0 1 5.68 0c2.17-1.47 3.12-1.16 3.12-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55a11.17 11.17 0 0 0 7.74-10.75C23.33 5.56 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function Monogram({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} role="img" aria-label="Monograma EM">
      <defs>
        <linearGradient id="em-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6E74F7" />
          <stop offset="1" stopColor="#3B40B8" />
        </linearGradient>
      </defs>
      <path d="M24 2 43 13v22L24 46 5 35V13Z" fill="#0A0910" stroke="url(#em-grad)" strokeWidth="1.5" />
      <path d="M24 7.5 38.5 16v16L24 40.5 9.5 32V16Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text
        x="24"
        y="28.5"
        textAnchor="middle"
        fill="#fff"
        style={{ font: "700 12.5px var(--font-display), sans-serif", letterSpacing: "0.06em" }}
      >
        EM
      </text>
    </svg>
  );
}

/** Logo do Gmail colorida (envelope "M" multicolor). */
export function GmailColorIcon({ size = 18, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" {...p}>
      <path fill="#4CAF50" d="M45 16.2l-5 2.75-5 4.75V40h7c1.66 0 3-1.34 3-3V16.2z" />
      <path fill="#1E88E5" d="M3 16.2l3.61 1.71L13 23.7V40H6c-1.66 0-3-1.34-3-3V16.2z" />
      <polygon fill="#E53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
      <path fill="#C62828" d="M3 12.3v3.9l10 7.5V11.2L9.88 8.86A4.3 4.3 0 0 0 7.3 8 4.3 4.3 0 0 0 3 12.3z" />
      <path fill="#FBC02D" d="M45 12.3v3.9l-10 7.5V11.2l3.12-2.34A4.3 4.3 0 0 1 40.7 8 4.3 4.3 0 0 1 45 12.3z" />
    </svg>
  );
}
