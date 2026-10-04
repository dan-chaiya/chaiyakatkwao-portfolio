"use client";

import { useState, useRef, useEffect } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string };

const OPENING: Message = {
  id: "opening",
  role: "assistant",
  content: "Hey, I'm Chaiya. Ask me anything about my work, or just say hi.",
};

const SUGGESTIONS = [
  "What's your background?",
  "Tell me about the Knack Factory project",
  "What are you available for?",
];

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "11px",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "var(--color-grey-400)",
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasUserMessages = messages.some(m => m.role === "user");
  const idRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll on message count, not on content: the streamed reply mutates the last
  // message on every chunk, and a smooth scroll restarted per chunk visibly janks.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (!isLoading) return;
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, isLoading]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  // A suggestion is a finished question, so a tap sends it, as quick replies do in
  // messaging apps; filling the field and waiting for Enter left visitors unsure
  // anything had happened (2026-09-27).
  async function send(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: String(++idRef.current), role: "user", content: text };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    const assistantId = String(++idRef.current);
    setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages.map(({ role, content }) => ({ role, content })) }),
      });

      if (res.status === 429) {
        const wait = res.headers.get("Retry-After");
        throw new Error(
          wait
            ? `That's a lot of questions at once. Try again in ${wait}s.`
            : "That's a lot of questions at once. Try again shortly."
        );
      }
      if (!res.ok || !res.body) throw new Error("Something went wrong. Try again.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        const content = full; // the updater runs later; hand it this chunk's text, not the live variable
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content } : m));
      }
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong. Try again.");
      setMessages(prev => prev.filter(m => m.id !== assistantId));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <main id="main-content" style={{ backgroundColor: "var(--color-surface-chat)" }}>
      {/* One screen under the sticky header. The direction and the rule that splits the
          two columns live in classes only: as inline styles they beat the lg: classes,
          which kept the identity panel stacked above the chat on desktop, under a
          bottom rule, until 2026-09-27. The header's "/ Chat" names the page. */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ padding: "32px", height: "calc(100dvh - var(--header-h) - 1px)" }}
      >
        {/* Left — identity */}
        <div
          style={{ flexShrink: 0, borderColor: "var(--color-grey-700)" }}
          className="border-b pb-6 mb-6 lg:w-72 lg:pr-10 lg:border-b-0 lg:border-r lg:pb-0 lg:mb-0"
        >
          <p style={{ ...mono, marginBottom: "12px" }}>Speaking with</p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--color-warm)", textTransform: "uppercase", marginBottom: "16px" }}>
            Chaiya<br />Katkwao.
          </h1>
          <p style={{ fontFamily: "var(--font-archivo)", fontSize: "0.875rem", color: "var(--color-grey-300)", lineHeight: 1.5 }}>
            Creative Producer<br />Bangkok, Thailand
          </p>
          <p style={{ fontFamily: "var(--font-archivo)", fontSize: "0.875rem", color: "var(--color-grey-400)", lineHeight: 1.5, marginTop: "10px" }}>
            Ask me about my work, clients, or process.
          </p>
        </div>

        {/* Right — chat */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }} className="lg:pl-10">
          <div
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            // Busy while a reply streams in, so a screen reader reads the finished
            // answer once instead of announcing it a few words at a time.
            aria-busy={isLoading}
            aria-label="Conversation"
            style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "16px" }}
          >
            {/* Takes the empty height above a short conversation, so the messages sit
                on the field the way they do in a messaging app instead of hanging at
                the top of the panel. Shrinks to nothing once the log scrolls. */}
            <div aria-hidden="true" style={{ flex: "1 1 0" }} />
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "12px 16px", backgroundColor: m.role === "user" ? "var(--color-warm)" : "var(--color-surface-dark)", border: m.role === "user" ? "none" : "1px solid var(--color-border-muted)", color: m.role === "user" ? "var(--color-surface-chat)" : "var(--color-grey-200)", fontFamily: "var(--font-archivo)", fontSize: "14px", lineHeight: 1.7 }}>
                  {m.content || (
                    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--color-grey-500)" }}>...</span>
                  )}
                </div>
              </div>
            ))}
            {error && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div role="alert" style={{ padding: "12px 16px", backgroundColor: "var(--color-surface-dark)", border: "1px solid var(--color-border-muted)", color: "var(--color-grey-400)", fontFamily: "var(--font-archivo)", fontSize: "14px" }}>{error}</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit}>
            {/* Suggestions sit on the field, where quick replies sit in a chat app. */}
            {!hasUserMessages && (
              // Phones get one row that swipes sideways, as quick replies do in messaging apps,
              // so a long question never breaks its arrow onto a second line.
              <div role="group" aria-label="Suggested questions" className="flex flex-nowrap overflow-x-auto sm:flex-wrap" style={{ gap: "8px", marginBottom: "10px", scrollbarWidth: "none" }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    disabled={isLoading}
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      background: "transparent",
                      padding: "8px 14px",
                      cursor: "pointer",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    className="border border-[var(--color-border-muted)] text-[var(--color-grey-300)] transition-[border-color,color] duration-[180ms] hover:border-[var(--color-grey-500)] hover:text-[var(--color-text)]"
                  >
                    {s} →
                  </button>
                ))}
              </div>
            )}
            <label htmlFor="chat-input" className="sr-only">
              Ask Chaiya about his work
            </label>
            <div className="chat-field" style={{ border: "1px solid var(--color-grey-700)", display: "flex", alignItems: "center" }}>
              {/* 16px: iOS Safari zooms into any field set smaller, which threw the
                  one-screen chat off the screen on focus (14px until 2026-10-04). */}
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask something..."
                disabled={isLoading}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "14px 16px", fontFamily: "var(--font-archivo)", fontSize: "16px", color: "var(--color-warm)", caretColor: "var(--color-warm)" }}
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={isLoading || !input.trim()}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "44px", minHeight: "44px", color: isLoading || !input.trim() ? "var(--color-grey-400)" : "var(--color-grey-200)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "13px", background: "transparent", border: "none", cursor: isLoading || !input.trim() ? "not-allowed" : "pointer", transition: "color 0.15s" }}
              >
                <span aria-hidden="true">↵</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
