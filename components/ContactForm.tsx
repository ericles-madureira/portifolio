"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/data";
import { useI18n } from "@/lib/i18n";


type Status = "idle" | "sending" | "success" | "error" | "activation";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const { t, lang } = useI18n();
  const [topicIdx, setTopicIdx] = useState(0);
  const topic = t.form.topics[topicIdx];
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [lastDraft, setLastDraft] = useState({ name: "", message: "" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const honey = String(fd.get("_honey") ?? "");

    const errs: Errors = {};
    if (name.length < 2) errs.name = t.form.errName;
    if (!EMAIL_RE.test(email)) errs.email = t.form.errEmail;
    if (message.length < 10) errs.message = t.form.errMessage;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (honey) return; // bot

    setLastDraft({ name, message });
    setStatus("sending");
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nome: name,
          "E-mail": email,
          Empresa: company || "Não informada",
          Assunto: topic,
          Idioma: lang === "pt" ? "Português" : "English",
          Mensagem: message,
          _replyto: email,
          _subject: `Portfólio · ${topic} · ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (String(data.message ?? "").toLowerCase().includes("activat")) {
        // FormSubmit: no primeiro envio, o dono do e-mail precisa clicar no link de ativação
        console.warn("[contato] FormSubmit:", data.message);
        setStatus("activation");
        return;
      }
      if (!res.ok || String(data.success) === "false") throw new Error(data.message || `HTTP ${res.status}`);
      setStatus("success");
      form.reset();
      setTopicIdx(0);
    } catch (err) {
      console.error("[contato] falha no envio:", err);
      setStatus("error");
    }
  };

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Portfólio · ${topic}`)}&body=${encodeURIComponent(
    lastDraft.message,
  )}`;


  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-indigo/30 bg-obsidian/60 p-8 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo/15 text-indigo shadow-[0_0_40px_rgba(110,116,247,0.5)]"
            >
              <CheckCircle2 size={32} />
            </motion.span>
            <h3 className="font-display text-2xl font-bold text-white">{t.form.successTitle}</h3>
            <p className="mt-2 max-w-xs text-sm text-muted">{t.form.successText}</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              <RotateCcw size={13} /> {t.form.sendAnother}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 rounded-2xl border border-white/[0.08] bg-obsidian/50 p-5 backdrop-blur sm:p-7"
          >
            {/* honeypot anti-spam */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <fieldset>
              <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">{t.form.legend}</legend>
              <div className="flex flex-wrap gap-2">
                {t.form.topics.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setTopicIdx(i)}
                    aria-pressed={topicIdx === i}
                    className={`rounded-full border px-4 py-2 font-mono text-[11px] transition-all duration-300 ${
                      topicIdx === i
                        ? "border-indigo bg-indigo text-white shadow-[0_0_20px_rgba(110,116,247,0.5)]"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:border-indigo/50 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
              <FloatField name="name" label={t.form.name.label} hint={t.form.name.hint} autoComplete="name" error={errors.name} />
              <FloatField name="email" type="email" label={t.form.email.label} hint={t.form.email.hint} autoComplete="email" error={errors.email} />
            </div>

            <FloatField name="company" label={t.form.company.label} hint={t.form.company.hint} autoComplete="organization" />

            <FloatField
              name="message"
              label={t.form.message.label}
              hint={t.form.message.hint}
              multiline
              error={errors.message}
            />

            {status === "activation" && (
              <p className="flex items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>
                  {t.form.activation}
                </span>
              </p>
            )}

            {status === "error" && (
              <p className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>
                  {t.form.errorText}{" "}
                  <a href={mailto} className="underline underline-offset-2 hover:text-white">
                    {t.form.errorLink}
                  </a>
                  .
                </span>
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-shine group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-indigo px-7 py-4 font-mono text-xs font-bold tracking-[0.22em] text-white shadow-[0_0_30px_rgba(110,116,247,0.45)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(110,116,247,0.8)] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> {t.form.sending}
                </>
              ) : (
                <>
                  {t.form.submit}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Campo com rótulo flutuante: o texto fica dentro do quadrado; ao focar
 * (ou se já houver conteúdo) o rótulo sobe para fora do campo em branco.
 * Se sair vazio, ele volta para dentro.
 */
function FloatField({
  name,
  label,
  hint,
  type = "text",
  autoComplete,
  multiline = false,
  error,
}: {
  name: string;
  label: string;
  hint: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const floated = focused || filled;

  const common = {
    id,
    name,
    autoComplete,
    "aria-invalid": Boolean(error) || undefined,
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      setFilled(e.currentTarget.value.trim().length > 0);
    },
    onInput: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilled(e.currentTarget.value.length > 0),
    className: `peer w-full rounded-xl border bg-obsidian/60 px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow] duration-300 focus:border-indigo focus:shadow-[0_0_0_4px_rgba(110,116,247,0.15)] ${
      error ? "border-red-400/60" : "border-white/10 hover:border-white/20"
    } ${multiline ? "min-h-[120px] resize-none" : ""}`,
  };

  return (
    <div className="relative pt-6">
      {multiline ? <textarea rows={4} {...common} /> : <input type={type} {...common} />}

      <motion.label
        htmlFor={id}
        initial={false}
        animate={
          floated
            ? { x: -16, y: -36, scale: 0.8, color: "#FFFFFF" }
            : { x: 0, y: 0, scale: 1, color: "rgba(255,255,255,0.38)" }
        }
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.7 }}
        style={{ originX: 0, originY: 0.5 }}
        className="pointer-events-none absolute left-4 top-[calc(1.5rem+0.75rem)] text-sm leading-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={floated ? "label" : "hint"}
            initial={{ opacity: 0, y: floated ? 6 : -6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: floated ? -6 : 6, filter: "blur(4px)" }}
            transition={{ duration: 0.18 }}
            className={`block whitespace-nowrap ${floated ? "font-mono font-semibold uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(110,116,247,0.6)]" : ""}`}
          >
            {floated ? label : hint}
          </motion.span>
        </AnimatePresence>
      </motion.label>

      {error && <span className="mt-1.5 block text-xs text-red-300">{error}</span>}
    </div>
  );
}
