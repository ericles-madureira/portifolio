"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";

export type SkillNodeId = "tl" | "tr" | "bl" | "br" | "center";
export type SkillNode = { id: SkillNodeId; label: string; items: string[] };
export type Experience = { period: string; role: string; org: string; description: string; badge: string };

/* ------------------------------------------------------------------ */
/* Português                                                           */
/* ------------------------------------------------------------------ */
const pt = {
  preloader: {
    tagline: "Software · Sistemas · Infra",
    corner: "Portfólio / 2026",
    loading: "Carregando",
  },
  nav: {
    projects: "PROJETOS",
    about: "SOBRE",
    experience: "EXPERIÊNCIAS",
    skills: "SKILLS",
    contact: "CONTATO",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Desenvolvedor de Software · Sistemas e Infraestrutura",
    headline: "Desenvolvedor de software focado em código de ==alto desempenho==, infraestrutura e sistemas robustos.",
    sub: "Uno a vivência prática em redes, nuvem e arquitetura de sistemas à programação em C/C++, Java e SQL.",
    ctaPrimary: "CONHEÇA MEUS PROJETOS",
    ctaSecondary: "FALE COMIGO",
    badge: "6º PERÍODO · CC",
    scroll: "EXPLORAR PROJETOS",
  },
  projects: {
    eyebrow: "// 01 · Portfólio",
    title: "Projetos Realizados",
    loading: "Sincronizando com a API do GitHub…",
    live: "● Atualizado em tempo real pelo GitHub",
    error: "Não foi possível carregar os repositórios agora. Veja todos diretamente no GitHub.",
    viewAll: "VER TODOS OS REPOSITÓRIOS",
    viewRepo: "Ver repositório",
    fallbackDesc: "Repositório público no GitHub. Explore o código-fonte e a documentação.",
  },
  about: {
    eyebrow: "Olá, prazer em conhecer você",
    taglineA: "Tecnologia com visão de ponta a ponta.",
    taglineB: "Do suporte à construção de soluções.",
    ctaWork: "Conheça meu trabalho",
    ctaTalk: "Fale comigo",
    loadingProfile: "carregando perfil…",
    loadedProfile: "✔ perfil carregado",
    sectionEyebrow: "// 02 · Sobre mim",
    heading: "Quem sou eu",
    p1: "Sou graduando em **Ciência da Computação (6º período)** na PUC Goiás. Tenho perfil analítico e experiência prática em suporte técnico N1/N2, redes e infraestrutura de TI, uma base que me ensinou a entender um sistema de ponta a ponta antes de mexer nele.",
    p2: "Trabalho com **C/C++**, **Java (POO)**, **Estruturas de Dados** e **SQL/MySQL**, com interesse especial em emulação, simulação e otimização de sistemas.",
    p3: "Tenho vivência real em ambientes de produção: troubleshooting em nuvem (RDP/VPN), integrações via brokers e web services, ERPs e rotinas fiscais como NF-e/NFC-e, Pix e certificados digitais.",
    stats: [
      ["6º", "período de CC"],
      ["N1/N2", "suporte técnico"],
      ["2+", "anos em TI"],
    ] as [string, string][],
  },
  timeline: {
    eyebrow: "// 03 · Trajetória",
    title: "Experiências e Formação",
    items: [
      {
        period: "JUN 2026 ATÉ HOJE",
        role: "Estagiário de Suporte Técnico (N1)",
        org: "GTEX 360",
        description:
          "Diagnóstico, análise de causa raiz e resolução de incidentes N1/N2 em sistemas ERP e e-commerce. Suporte em nuvem (RDP/VPN), mensageria e web services, além de rotinas fiscais e bancárias: NF-e/NFC-e, Pix, boletos e certificados digitais.",
        badge: "SUPORTE N1/N2 · ERP E NUVEM",
      },
      {
        period: "2023 ATÉ HOJE",
        role: "Bacharelado em Ciência da Computação (6º período)",
        org: "PUC Goiás",
        description:
          "Formação com foco em algoritmos, estruturas de dados, engenharia de software, bancos de dados e arquitetura de sistemas.",
        badge: "GRADUAÇÃO · GOIÂNIA, GO",
      },
      {
        period: "ABR 2024 A ABR 2026",
        role: "Estagiário de TI",
        org: "UniAraguaia",
        description:
          "Manutenção preventiva e corretiva dos laboratórios de informática, otimização de estações de trabalho, cabeamento e conectividade de rede, suporte a sistemas institucionais e operação audiovisual.",
        badge: "INFRAESTRUTURA E REDES · GOIÂNIA, GO",
      },
      {
        period: "2020 A 2022",
        role: "Ensino Médio Técnico em Manutenção Automotiva",
        org: "SESI/SENAI Canaã",
        description:
          "Base técnica e analítica em diagnóstico de sistemas mecânicos e eletrônicos, processos industriais e manutenção preventiva.",
        badge: "FORMAÇÃO TÉCNICA · SENAI",
      },
    ] as Experience[],
  },
  skills: {
    eyebrow: "// 04 · Stack",
    title: "Skills",
    centerKicker: "INFRA, NUVEM E DEVOPS",
    center: {
      id: "center",
      label: "CORE & INFRA",
      items: ["Git e GitHub", "Redes e Conectividade", "Nuvem (RDP/VPN)", "Suporte N1/N2", "Linux e Windows"],
    } as SkillNode,
    nodes: [
      { id: "tl", label: "LINGUAGENS E BASE", items: ["C", "C++", "Java", "Programação Orientada a Objetos (POO)"] },
      { id: "tr", label: "BANCO DE DADOS", items: ["SQL", "MySQL", "Oracle", "Modelagem Relacional"] },
      { id: "bl", label: "ENGENHARIA E SISTEMAS", items: ["Estruturas de Dados", "Emulação", "Simulação", "Otimização de Sistemas"] },
      { id: "br", label: "ERP, INTEGRAÇÕES E SEGURANÇA", items: ["Sistemas ERP", "Web Services e Brokers", "NF-e, NFC-e e Pix", "Cibersegurança (básico)"] },
    ] as SkillNode[],
    languagesLabel: "Idiomas",
    languages: ["Português (nativo)", "Inglês (intermediário técnico)", "Espanhol (básico)"],
    coursesLabel: "Cursos",
    courses: ["Lógica de Programação", "TIC", "Cibersegurança", "Empreendedorismo", "Gestão de Pessoas"],
  },
  differentials: {
    eyebrow: "// 05 · Diferenciais",
    title: "Onde código e infraestrutura se encontram",
    sub: "Um perfil híbrido: quem entende a máquina, a rede e o negócio escreve software que se sustenta em produção.",
    items: [
      {
        title: "Do hardware à aplicação",
        text: "Experiência real diagnosticando redes, servidores e ambientes RDP/VPN antes mesmo de escrever a primeira linha de código.",
      },
      {
        title: "Performance e baixo nível",
        text: "Base sólida em C/C++, Java e estruturas de dados, com foco em eficiência de memória, simulação e emulação.",
      },
      {
        title: "Visão de negócio e produção",
        text: "Vivência direta com regras fiscais, ERPs, certificados digitais e sistemas críticos que não podem parar.",
      },
    ],
  },
  contact: {
    available: "DISPONÍVEL AGORA",
    headline: "Pronto para construir soluções de ==alto desempenho==?",
    sub: "Estou aberto a oportunidades em desenvolvimento de software, sistemas e infraestrutura. Preencha o formulário e a mensagem chega direto no meu e-mail.",
    bullets: ["Resposta em até 48 horas úteis", "Vagas, estágios, freelas e parcerias", "Goiânia, GO · remoto ou presencial"],
    emailLabel: "E-mail",
    copy: "Copiar",
    copied: "Copiado!",
    copyAria: "Copiar e-mail",
    backToTop: "VOLTAR AO TOPO",
    location: "GOIÂNIA, GO",
  },
  form: {
    legend: "Sobre o que vamos falar?",
    topics: ["Vaga ou estágio", "Projeto freelance", "Parceria", "Outro assunto"],
    name: { label: "Nome *", hint: "Seu nome" },
    email: { label: "E-mail *", hint: "Seu e-mail" },
    company: { label: "Empresa", hint: "Empresa (opcional)" },
    message: { label: "Mensagem *", hint: "Conte um pouco sobre a oportunidade ou o projeto…" },
    errName: "Informe seu nome.",
    errEmail: "Informe um e-mail válido.",
    errMessage: "Escreva pelo menos 10 caracteres.",
    activation:
      "O formulário está aguardando ativação. Assim que o e-mail de ativação do FormSubmit for confirmado, as mensagens passam a chegar automaticamente.",
    errorText: "Não foi possível enviar agora.",
    errorLink: "Envie direto pelo seu e-mail",
    submit: "ENVIAR MENSAGEM",
    sending: "ENVIANDO…",
    successTitle: "Mensagem enviada!",
    successText: "Obrigado pelo contato. Respondo no seu e-mail o quanto antes.",
    sendAnother: "ENVIAR OUTRA",
  },
  dock: { label: "Fale comigo", aria: "Fale comigo: ir para o formulário de contato" },
};

export type Dict = typeof pt;

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */
const en: Dict = {
  preloader: {
    tagline: "Software · Systems · Infra",
    corner: "Portfolio / 2026",
    loading: "Loading",
  },
  nav: {
    projects: "PROJECTS",
    about: "ABOUT",
    experience: "EXPERIENCE",
    skills: "SKILLS",
    contact: "CONTACT",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    eyebrow: "Software Developer · Systems & Infrastructure",
    headline: "Software developer focused on ==high-performance== code, infrastructure and robust systems.",
    sub: "I combine hands-on experience in networking, cloud and systems architecture with programming in C/C++, Java and SQL.",
    ctaPrimary: "SEE MY PROJECTS",
    ctaSecondary: "GET IN TOUCH",
    badge: "6TH SEMESTER · CS",
    scroll: "EXPLORE PROJECTS",
  },
  projects: {
    eyebrow: "// 01 · Portfolio",
    title: "Featured Projects",
    loading: "Syncing with the GitHub API…",
    live: "● Live from the GitHub API",
    error: "Couldn't load the repositories right now. You can see them all on GitHub.",
    viewAll: "VIEW ALL REPOSITORIES",
    viewRepo: "View repository",
    fallbackDesc: "Public GitHub repository. Explore the source code and documentation.",
  },
  about: {
    eyebrow: "Hi, nice to meet you",
    taglineA: "Technology with an end-to-end view.",
    taglineB: "From support to building solutions.",
    ctaWork: "See my work",
    ctaTalk: "Get in touch",
    loadingProfile: "loading profile…",
    loadedProfile: "✔ profile loaded",
    sectionEyebrow: "// 02 · About me",
    heading: "Who I am",
    p1: "I'm a **Computer Science student (6th semester)** at PUC Goiás, Brazil. I have an analytical mindset and hands-on experience in tier 1 and tier 2 technical support, networking and IT infrastructure, a background that taught me to understand a system end to end before changing it.",
    p2: "I work with **C/C++**, **Java (OOP)**, **Data Structures** and **SQL/MySQL**, with a special interest in emulation, simulation and systems optimization.",
    p3: "I have real experience in production environments: cloud troubleshooting (RDP/VPN), integrations through brokers and web services, ERP systems and Brazilian tax and payment routines such as NF-e/NFC-e invoicing, Pix and digital certificates.",
    stats: [
      ["6th", "CS semester"],
      ["T1/T2", "tech support"],
      ["2+", "years in IT"],
    ],
  },
  timeline: {
    eyebrow: "// 03 · Journey",
    title: "Experience & Education",
    items: [
      {
        period: "JUN 2026 TO PRESENT",
        role: "Technical Support Intern (Tier 1)",
        org: "GTEX 360",
        description:
          "Diagnosis, root cause analysis and resolution of tier 1 and tier 2 incidents in ERP and e-commerce systems. Cloud support (RDP/VPN), messaging and web services, plus tax and banking routines: NF-e/NFC-e invoices, Pix, bank slips and digital certificates.",
        badge: "TIER 1/2 SUPPORT · ERP & CLOUD",
      },
      {
        period: "2023 TO PRESENT",
        role: "B.Sc. in Computer Science (6th semester)",
        org: "PUC Goiás",
        description: "Coursework focused on algorithms, data structures, software engineering, databases and systems architecture.",
        badge: "UNDERGRADUATE · GOIÂNIA, BRAZIL",
      },
      {
        period: "APR 2024 TO APR 2026",
        role: "IT Intern",
        org: "UniAraguaia",
        description:
          "Preventive and corrective maintenance of computer labs, workstation optimization, network cabling and connectivity, support for institutional systems and audiovisual operations.",
        badge: "INFRASTRUCTURE & NETWORKING · GOIÂNIA, BRAZIL",
      },
      {
        period: "2020 TO 2022",
        role: "Technical High School in Automotive Maintenance",
        org: "SESI/SENAI Canaã",
        description:
          "Technical and analytical foundation in diagnosing mechanical and electronic systems, industrial processes and preventive maintenance.",
        badge: "TECHNICAL TRAINING · SENAI",
      },
    ],
  },
  skills: {
    eyebrow: "// 04 · Stack",
    title: "Skills",
    centerKicker: "INFRA, CLOUD & DEVOPS",
    center: {
      id: "center",
      label: "CORE & INFRA",
      items: ["Git & GitHub", "Networking & Connectivity", "Cloud (RDP/VPN)", "Tier 1/2 Support", "Linux & Windows"],
    },
    nodes: [
      { id: "tl", label: "LANGUAGES & FOUNDATIONS", items: ["C", "C++", "Java", "Object-Oriented Programming (OOP)"] },
      { id: "tr", label: "DATABASES", items: ["SQL", "MySQL", "Oracle", "Relational Modeling"] },
      { id: "bl", label: "ENGINEERING & SYSTEMS", items: ["Data Structures", "Emulation", "Simulation", "Systems Optimization"] },
      { id: "br", label: "ERP, INTEGRATIONS & SECURITY", items: ["ERP Systems", "Web Services & Brokers", "NF-e, NFC-e & Pix", "Cybersecurity (basic)"] },
    ],
    languagesLabel: "Languages",
    languages: ["Portuguese (native)", "English (intermediate, technical)", "Spanish (basic)"],
    coursesLabel: "Courses",
    courses: ["Programming Logic", "ICT", "Cybersecurity", "Entrepreneurship", "People Management"],
  },
  differentials: {
    eyebrow: "// 05 · What sets me apart",
    title: "Where code meets infrastructure",
    sub: "A hybrid profile: understanding the machine, the network and the business leads to software that holds up in production.",
    items: [
      {
        title: "From hardware to application",
        text: "Real experience diagnosing networks, servers and RDP/VPN environments before writing a single line of code.",
      },
      {
        title: "Performance & low level",
        text: "A solid foundation in C/C++, Java and data structures, focused on memory efficiency, simulation and emulation.",
      },
      {
        title: "Business & production mindset",
        text: "Hands-on experience with tax rules, ERP systems, digital certificates and mission-critical systems that can't go down.",
      },
    ],
  },
  contact: {
    available: "AVAILABLE NOW",
    headline: "Ready to build ==high-performance== solutions?",
    sub: "I'm open to opportunities in software development, systems and infrastructure. Fill out the form and your message goes straight to my inbox.",
    bullets: ["Reply within 2 business days", "Jobs, internships, freelance and partnerships", "Goiânia, Brazil · remote or on-site"],
    emailLabel: "Email",
    copy: "Copy",
    copied: "Copied!",
    copyAria: "Copy email",
    backToTop: "BACK TO TOP",
    location: "GOIÂNIA, BRAZIL",
  },
  form: {
    legend: "What would you like to talk about?",
    topics: ["Job or internship", "Freelance project", "Partnership", "Something else"],
    name: { label: "Name *", hint: "Your name" },
    email: { label: "Email *", hint: "Your email" },
    company: { label: "Company", hint: "Company (optional)" },
    message: { label: "Message *", hint: "Tell me a bit about the opportunity or project…" },
    errName: "Please enter your name.",
    errEmail: "Please enter a valid email.",
    errMessage: "Please write at least 10 characters.",
    activation:
      "This form is awaiting activation. Once the FormSubmit activation email is confirmed, messages will be delivered automatically.",
    errorText: "Couldn't send your message right now.",
    errorLink: "Send it from your email app",
    submit: "SEND MESSAGE",
    sending: "SENDING…",
    successTitle: "Message sent!",
    successText: "Thanks for reaching out. I'll reply to your email as soon as possible.",
    sendAnother: "SEND ANOTHER",
  },
  dock: { label: "Let's talk", aria: "Let's talk: go to the contact form" },
};

export const DICTS: Record<Lang, Dict> = { pt, en };

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */
type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx>({ lang: "pt", t: pt, setLang: () => {} });

const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Começa sempre em PT (igual ao HTML do servidor) e ajusta depois de montar.
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    let initial: Lang = "pt";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") initial = saved;
      else if (!navigator.language.toLowerCase().startsWith("pt")) initial = "en";
    } catch {
      /* storage indisponível */
    }
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = lang === "pt" ? "Ericles Madureiro | Desenvolvedor de Software" : "Ericles Madureiro | Software Developer";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return <LanguageContext.Provider value={{ lang, t: DICTS[lang], setLang }}>{children}</LanguageContext.Provider>;
}

export const useI18n = () => useContext(LanguageContext);

/* ------------------------------------------------------------------ */
/* Texto com marcações simples: **negrito** e ==destaque==             */
/* ------------------------------------------------------------------ */
export function Rich({ text, accentClass, strongClass = "font-semibold text-white" }: { text: string; accentClass?: string; strongClass?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**")) return <strong key={i} className={strongClass}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("==")) return <span key={i} className={accentClass}>{p.slice(2, -2)}</span>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}
