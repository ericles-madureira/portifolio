import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ericles-madureiro.vercel.app"),
  title: "Ericles Madureiro | Desenvolvedor de Software",
  description:
    "Desenvolvedor de software focado em código de alto desempenho, infraestrutura e sistemas robustos. C/C++, Java, SQL, redes, cloud e ERPs. Goiânia, GO.",
  keywords: ["Ericles Madureiro", "Desenvolvedor de Software", "C++", "Java", "SQL", "Infraestrutura", "Redes", "Goiânia", "Portfólio"],
  authors: [{ name: "Ericles Madureiro" }],
  openGraph: {
    title: "Ericles Madureiro | Desenvolvedor de Software",
    description: "Código de alto desempenho, infraestrutura e sistemas robustos.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: { card: "summary_large_image", title: "Ericles Madureiro | Desenvolvedor de Software" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#020002", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable} is-loading`} suppressHydrationWarning>
      <body className="grain font-sans">{children}</body>
    </html>
  );
}
