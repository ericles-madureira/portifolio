"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT, type Project } from "@/lib/data";
import { GithubIcon } from "./Icons";
import SectionTitle from "./SectionTitle";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

const prettify = (name: string) =>
  name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

const CACHE_KEY = "gh-repos-v2";
const CACHE_TTL = 1000 * 60 * 30;

async function loadRepos(): Promise<Project[]> {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const { t, data } = JSON.parse(raw) as { t: number; data: Project[] };
      if (Date.now() - t < CACHE_TTL) return data;
    }
  } catch {
    /* storage indisponível */
  }

  const res = await fetch(`https://api.github.com/users/${CONTACT.githubUser}/repos?sort=updated&per_page=6`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const repos = (await res.json()) as Repo[];
  const data: Project[] = repos
    .filter((r) => !r.fork && r.name.toLowerCase() !== CONTACT.githubUser.toLowerCase())
    .map((r) => ({
      id: String(r.id),
      title: prettify(r.name),
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
    }));
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* ignore */
  }
  return data;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<"loading" | "live" | "error">("loading");
  const { t } = useI18n();

  useEffect(() => {
    let alive = true;
    loadRepos()
      .then((repos) => {
        if (!alive) return;
        setProjects(repos.slice(0, 6));
        setStatus(repos.length ? "live" : "error");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="projetos" className="relative scroll-mt-20 bg-obsidian px-5 py-24 sm:px-8 md:py-32">
      <SectionTitle eyebrow={t.projects.eyebrow} title={t.projects.title}>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted transition-colors hover:text-white"
        >
          <GithubIcon size={14} /> github.com/{CONTACT.githubUser}
          <ArrowUpRight size={14} />
        </a>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          {status === "loading" && t.projects.loading}
          {status === "live" && t.projects.live}
        </p>
      </SectionTitle>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {status === "loading" &&
          [0, 1, 2].map((i) => (
            <div key={i} className="card-dark h-[340px] animate-pulse rounded-2xl bg-white/[0.02]" aria-hidden />
          ))}
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {status === "error" && (
        <div className="mx-auto max-w-xl text-center text-muted">
          {t.projects.error}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-surface px-7 py-3.5 font-mono text-xs tracking-[0.2em] text-white transition-colors hover:border-indigo/60"
        >
          <GithubIcon size={16} />
          {t.projects.viewAll}
          <ArrowUpRight size={15} className="text-indigo transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useI18n();
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-dark group relative flex h-[340px] flex-col overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {String(index + 1).padStart(2, "0")} / {project.language ?? "Code"}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all duration-300 group-hover:rotate-45 group-hover:border-indigo group-hover:bg-indigo group-hover:text-white">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold leading-snug text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.description ?? t.projects.fallbackDesc}</p>
      </div>

      {/* glowing wave */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden">
        <div
          className="mesh-anim absolute -inset-x-1/4 -bottom-1/3 h-[140%] opacity-80 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(60% 55% at 30% 80%, rgba(110,116,247,0.85), transparent 70%), radial-gradient(50% 50% at 75% 95%, rgba(59,64,184,0.9), transparent 70%), radial-gradient(40% 40% at 55% 60%, rgba(165,169,255,0.35), transparent 70%)",
          }}
        />
        <svg className="absolute inset-x-0 bottom-0 h-full w-full" viewBox="0 0 400 180" preserveAspectRatio="none">
          <path
            d="M0 70 C 80 30, 140 110, 220 70 S 340 40, 400 80"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
            className="transition-transform duration-700 group-hover:translate-y-[-8px]"
          />
          <path
            d="M0 100 C 90 60, 160 140, 240 100 S 350 70, 400 110"
            fill="none"
            stroke="rgba(165,169,255,0.25)"
            strokeWidth="1"
            className="transition-transform duration-700 group-hover:translate-y-[-14px]"
          />
        </svg>
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-surface to-transparent" />
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between p-6 font-mono text-[11px] text-white/80">
        <span className="inline-flex items-center gap-2">
          <GithubIcon size={14} /> {t.projects.viewRepo}
        </span>
        {typeof project.stars === "number" && (
          <span className="inline-flex items-center gap-1">
            <Star size={12} /> {project.stars}
          </span>
        )}
      </div>
    </motion.a>
  );
}
