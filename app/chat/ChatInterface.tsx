"use client";

import { useState, useRef, useEffect } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string };

const OPENING: Message = {
  id: "opening",
  role: "assistant",
  content: "Hey — I'm Chaiya. Ask me anything about my work, or just say hi.",
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
  const [error, setError] = useState(false);
  const hasUserMessages = messages.some(m => m.role === "user");
  const idRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: String(++idRef.current), role: "user", content: input };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);
    setError(false);

    const assistantId = String(++idRef.current);
    setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages.map(({ role, content }) => ({ role, content })) }),
      });

      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: full } : m));
      }
    } catch {
      setError(true);
      setMessages(prev => prev.filter(m => m.id !== assistantId));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div style={{ backgroundColor: "var(--color-surface-chat)", minHeight: "100vh", paddingTop: "64px" }}>
      <p style={{ ...mono, padding: "24px 32px 0" }}>Chat</p>

      <div
        style={{ display: "flex", flexDirection: "column", padding: "32px", height: "calc(100vh - 120px)" }}
        className="lg:flex-row"
      >
        {/* Left — identity */}
        <div
          style={{ flexShrink: 0, paddingBottom: "24px", marginBottom: "24px", borderBottom: "1px solid var(--color-grey-700)" }}
          className="lg:w-72 lg:pr-10 lg:border-r lg:border-b-0 lg:pb-0 lg:mb-0"
        >
          <p style={{ ...mono, marginBottom: "12px" }}>Speaking with</p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--color-warm)", textTransform: "uppercase", marginBottom: "16px" }}>
            Chaiya /<br />Katkwao.
          </h1>
          <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "13px", color: "var(--color-grey-400)", lineHeight: 1.6 }}>
            Creative Producer<br />Bangkok, Thailand
          </p>
          <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "12px", color: "var(--color-grey-600)", lineHeight: 1.5, marginTop: "10px" }}>
            Ask me about my work, clients, or process.
          </p>
        </div>

        {/* Right — chat */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }} className="lg:pl-10">
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "16px" }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "12px 16px", backgroundColor: m.role === "user" ? "var(--color-warm)" : "var(--color-surface-dark)", border: m.role === "user" ? "none" : "1px solid var(--color-border-muted)", color: m.role === "user" ? "var(--color-surface-chat)" : "var(--color-grey-200)", fontFamily: "var(--font-jakarta)", fontSize: "14px", lineHeight: 1.7 }}>
                  {m.content || (
                    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--color-grey-500)" }}>...</span>
                  )}
                </div>
              </div>
            ))}
            {!hasUserMessages && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); inputRef.current?.focus(); }}
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      color: "var(--color-grey-300)",
                      background: "transparent",
                      border: "1px solid var(--color-border-muted)",
                      padding: "8px 14px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 180ms ease, color 180ms ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-grey-500)"; e.currentTarget.style.color = "var(--color-text)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border-muted)"; e.currentTarget.style.color = "var(--color-grey-300)"; }}
                  >
                    {s} →
                  </button>
                ))}
              </div>
            )}
            {error && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "12px 16px", backgroundColor: "var(--color-surface-dark)", border: "1px solid var(--color-border-muted)", color: "var(--color-grey-400)", fontFamily: "var(--font-jakarta)", fontSize: "14px" }}>Something went wrong — try again.</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ border: "1px solid var(--color-grey-700)", display: "flex", alignItems: "center" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask something..."
                disabled={isLoading}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "14px 16px", fontFamily: "var(--font-jakarta)", fontSize: "14px", color: "var(--color-warm)", caretColor: "var(--color-warm)" }}
              />
              <button type="submit" disabled={isLoading || !input.trim()} style={{ padding: "12px 16px", color: isLoading || !input.trim() ? "var(--color-grey-600)" : "var(--color-grey-500)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10pt", background: "transparent", border: "none", cursor: isLoading || !input.trim() ? "not-allowed" : "pointer", transition: "color 0.15s" }}>↵</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
