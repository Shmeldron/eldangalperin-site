"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "motion/react";
import { Bot, Mail, Send, Sparkles, X } from "lucide-react";
import { track } from "@vercel/analytics";
import { DICT, DIR } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type Msg = { role: "user" | "assistant"; content: string };

/**
 * Floating AI assistant. Its UI/greeting/suggestions follow the site language
 * toggle; replies still come from /api/chat, which mirrors the visitor's input
 * language (so a Hebrew opener → Hebrew conversation). Message bubbles use
 * dir="auto" so each message aligns by its own content language.
 */
export function ChatWidget() {
  const reduce = useReducedMotion();
  const { locale } = useLocale();
  const t = DICT[locale].chat;
  const dir = DIR[locale];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadNote, setLeadNote] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "sent" | "error" | "offline">("idle");

  // Slide the launcher to the opposite corner when the language flips. The
  // button is anchored `end-5` (bottom-right in EN, bottom-left in HE); we start
  // it visually at the OLD corner and animate the transform back to the anchor.
  const launcher = useAnimationControls();
  const localeRef = useRef(locale);
  useEffect(() => {
    if (localeRef.current === locale) return;
    localeRef.current = locale;
    setOpen(false); // re-anchor cleanly; don't fly an open panel across
    if (reduce) return;
    const travel = window.innerWidth - 56 - 40; // button width + both 20px margins
    launcher.set({ x: locale === "he" ? travel : -travel });
    launcher.start({ x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } });
  }, [locale, reduce, launcher]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("eg:open-chat", onOpen);
    return () => window.removeEventListener("eg:open-chat", onOpen);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      track("chat_opened");
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      // Return focus to the launcher when the dialog closes.
      launcherRef.current?.focus();
    }
  }, [open]);

  // Dialog behaviour while open: Esc closes, and Tab is trapped within the panel.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    track("chat_message_sent");

    const history = [...messages, { role: "user", content: trimmed } as Msg];
    setMessages((m) => [...m, { role: "user", content: trimmed }, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        replaceLast(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        replaceLast(acc);
      }
    } catch {
      replaceLast("Couldn't reach the assistant. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function replaceLast(content: string) {
    setMessages((m) => {
      const next = [...m];
      next[next.length - 1] = { role: "assistant", content };
      return next;
    });
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    const email = leadEmail.trim();
    if (!email || leadStatus === "sending") return;
    setLeadStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, note: leadNote.trim() }),
      });
      if (res.ok) {
        track("lead_submitted");
        setLeadStatus("sent");
        setLeadFormOpen(false);
      } else if (res.status === 503) {
        setLeadStatus("offline");
      } else {
        setLeadStatus("error");
      }
    } catch {
      setLeadStatus("error");
    }
  }

  return (
    <>
      {/* Launcher — wrapper handles the fixed anchor + slide; button handles hover */}
      <motion.div animate={launcher} className="fixed bottom-5 end-5 z-40">
        <motion.button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={t.openAria}
          aria-haspopup="dialog"
          aria-expanded={open}
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.95 }}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_0_40px_-8px] shadow-accent/60"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Bot className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            dir={dir}
            role="dialog"
            aria-modal="true"
            aria-label={t.headerTitle}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 end-5 z-40 flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border-strong bg-card shadow-2xl shadow-black/60"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-border bg-card-2 px-4 py-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium">{t.headerTitle}</p>
                <p className="font-mono text-[10px] text-muted">{t.headerSub}</p>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {/* greeting (presentational, follows the toggle) */}
              <div dir="auto" className="me-auto max-w-[85%] rounded-2xl rounded-es-sm bg-card-2 px-3.5 py-2 text-sm text-foreground">
                {t.greeting}
              </div>

              {messages.map((m, i) => (
                <div
                  key={i}
                  dir="auto"
                  className={
                    m.role === "user"
                      ? "ms-auto max-w-[85%] rounded-2xl rounded-ee-sm bg-accent/15 px-3.5 py-2 text-sm text-foreground"
                      : "me-auto max-w-[85%] rounded-2xl rounded-es-sm bg-card-2 px-3.5 py-2 text-sm text-foreground"
                  }
                >
                  {m.content || (busy && i === messages.length - 1 ? <TypingDots /> : "")}
                </div>
              ))}

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card-2 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.length > 0 && leadStatus !== "sent" && (
                <div className="pt-1">
                  {!leadFormOpen && (leadStatus === "idle" || leadStatus === "error") && (
                    <button
                      type="button"
                      onClick={() => setLeadFormOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {t.shareEmail}
                    </button>
                  )}

                  {leadFormOpen && (
                    <form onSubmit={submitLead} className="space-y-2 rounded-xl border border-border bg-card-2 p-3">
                      <input
                        type="email"
                        required
                        dir="ltr"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        maxLength={120}
                        placeholder="you@company.com"
                        className="w-full rounded-lg bg-card px-2.5 py-1.5 text-sm text-foreground outline-none placeholder:text-muted"
                      />
                      <input
                        value={leadNote}
                        onChange={(e) => setLeadNote(e.target.value)}
                        maxLength={600}
                        placeholder={t.notePlaceholder}
                        className="w-full rounded-lg bg-card px-2.5 py-1.5 text-sm text-foreground outline-none placeholder:text-muted"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          disabled={leadStatus === "sending" || !leadEmail.trim()}
                          className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-on-accent transition-opacity disabled:opacity-40"
                        >
                          {leadStatus === "sending" ? t.sending : t.send}
                        </button>
                        <button
                          type="button"
                          onClick={() => setLeadFormOpen(false)}
                          className="text-xs text-muted hover:text-foreground"
                        >
                          {t.cancel}
                        </button>
                      </div>
                      {leadStatus === "error" && (
                        <p className="text-xs text-danger">{t.errorSend}</p>
                      )}
                    </form>
                  )}

                  {leadStatus === "offline" && (
                    <p className="text-xs text-muted">{t.offline}</p>
                  )}
                </div>
              )}

              {leadStatus === "sent" && (
                <p className="pt-1 text-xs text-accent">{t.sent}</p>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-card-2 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={800}
                aria-label={t.placeholder}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={t.sendAria}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-on-accent transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
