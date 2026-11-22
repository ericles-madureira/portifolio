/**
 * Dados fixos (não traduzíveis). Os textos do site ficam em `lib/i18n.tsx`.
 */
export const CONTACT = {
  name: "Ericles Madureiro",
  email: "ericlespedromadureira@gmail.com",
  formEndpoint: "https://formsubmit.co/ajax/ericlespedromadureira@gmail.com",
  linkedin: "https://www.linkedin.com/in/ericlesmadureiro/",
  github: "https://github.com/ericles-madureira",
  githubUser: "ericles-madureira",
};

export type Project = {
  id: string;
  title: string;
  /** null = repositório sem descrição (usa o texto padrão do idioma atual) */
  description: string | null;
  url: string;
  language?: string | null;
  stars?: number;
};
