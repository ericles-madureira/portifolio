# Portfólio — Ericles Madureiro

Site em **Next.js 15 + TypeScript + Tailwind CSS + Framer Motion**.

---

## 1. Rodar no seu computador

Pré-requisito: **Node.js 18+** (você já tem o 24).

Abra o terminal do VS Code (`Ctrl + '`) e rode:

```powershell
npm install
```

Só precisa rodar uma vez (instala as dependências).

```powershell
npm run dev
```

Abra **http://localhost:3000** no navegador. Toda alteração que você salvar aparece na hora.

Para parar o servidor: `Ctrl + C` no terminal.

### Versão de produção (opcional, para testar igual ao site no ar)

```powershell
npm run build
```

```powershell
npm run start
```

---

## 2. Formulário enviando automático para o seu e-mail

O formulário usa o **FormSubmit** (gratuito, sem cadastro). O endereço de destino fica em
`lib/data.ts` → `formEndpoint`.

### Ativação (só uma vez)

1. Rode o site (`npm run dev`) e envie uma mensagem de teste pelo formulário.
2. O site vai mostrar o aviso amarelo **"aguardando ativação"**.
3. Abra o Gmail **ericlespedromadureira@gmail.com** — chegou um e-mail do **FormSubmit** com o
   assunto *"Action Required: Activate FormSubmit…"* (confira também **Spam** e **Promoções**).
4. Clique em **Activate Form**.
5. Pronto: a partir daí toda mensagem enviada pelo site chega automaticamente no seu e-mail,
   e ao clicar em **Responder** você responde direto para quem escreveu.

### (Recomendado) Esconder seu e-mail do código

Depois de ativar, o FormSubmit manda um segundo e-mail com um **código aleatório**
(algo como `a1b2c3d4e5...`). Troque em `lib/data.ts`:

```ts
formEndpoint: "https://formsubmit.co/ajax/SEU_CODIGO_AQUI",
```

Assim seu e-mail não fica visível para quem inspecionar o site.

### Se der erro

- Aperte `F12` → aba **Console**: o motivo aparece como `[contato] ...`.
- O link **"Envie direto pelo seu e-mail"** no aviso vermelho sempre funciona como alternativa.

---

## 3. Colocar o site no ar (grátis) — Vercel

1. Crie um repositório no GitHub e envie esta pasta (`git init`, `git add .`, `git commit`, `git push`).
2. Entre em **vercel.com** com sua conta do GitHub → **Add New → Project** → escolha o repositório.
3. Clique em **Deploy**. Em ~1 minuto o site está no ar num link `*.vercel.app`.
4. Atualize o domínio em `app/layout.tsx` → `metadataBase` com o link final.

O formulário funciona igual no site publicado (a ativação vale para qualquer endereço).

---

## 4. Onde editar cada coisa

| O quê | Arquivo |
|---|---|
| E-mail, LinkedIn, GitHub, endpoint do formulário | `lib/data.ts` |
| **Todos os textos do site, em português e inglês** (experiências, skills, idiomas, cursos, formulário) | `lib/i18n.tsx` |
| Abertura (contador hex) | `components/PreloaderCurtain.tsx` |
| Topo (título, botões, luz do mouse) | `components/Hero.tsx` |
| Projetos (puxa do GitHub automaticamente) | `components/Projects.tsx` |
| Sobre / terminal "Quem sou eu" | `components/About.tsx` |
| Linha do tempo | `components/Timeline.tsx` |
| Grafo de skills | `components/Skills.tsx` |
| Seção branca de diferenciais | `components/Differentials.tsx` |
| Formulário de contato | `components/ContactForm.tsx` |
| Rodapé | `components/Footer.tsx` |
| Cores e efeitos globais | `app/globals.css`, `tailwind.config.ts` |
| Título da aba / SEO | `app/layout.tsx` |
