"use client";

import { useState, useRef, useEffect } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string };

const OPENING: Message = {
  id: "opening",
  role: "assistant",
  content: "Hey — I'm Chaiya. Ask me anything about my work, or just say hi.",
};

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "6.5pt",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "#6B6560",
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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
    <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", paddingTop: "64px" }}>
      <p style={{ ...mono, padding: "24px 32px 0" }}>Chat</p>

      <div
        style={{ display: "flex", flexDirection: "column", padding: "32px", height: "calc(100vh - 120px)" }}
        className="lg:flex-row"
      >
        {/* Left — identity */}
        <div
          style={{ flexShrink: 0, paddingBottom: "24px", marginBottom: "24px", borderBottom: "1px solid #1E1C1A" }}
          className="lg:w-72 lg:pr-10 lg:border-r lg:border-b-0 lg:pb-0 lg:mb-0"
        >
          <p style={{ ...mono, marginBottom: "12px" }}>Speaking with</p>
          <h1 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "#F2F0EB", textTransform: "uppercase", marginBottom: "16px" }}>
            Chaiya /<br />Katkwao.
          </h1>
          <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "8.5pt", color: "#6B6560", lineHeight: 1.6 }}>
            Creative Producer<br />Bangkok, Thailand
          </p>
        </div>

        {/* Right — chat */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }} className="lg:pl-10">
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "16px" }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "10px 14px", backgroundColor: m.role === "user" ? "#F2F0EB" : "#161514", border: m.role === "user" ? "none" : "1px solid #1E1C1A", color: m.role === "user" ? "#0D0D0D" : "#C8C4BC", fontFamily: "var(--font-jakarta)", fontSize: "8.5pt", lineHeight: 1.7 }}>
                  {m.content || (
                    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8pt", color: "#6B6560" }}>...</span>
                  )}
                </div>
              </div>
            ))}
            {error && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 14px", backgroundColor: "#161514", border: "1px solid #1E1C1A", color: "#6B6560", fontFamily: "var(--font-jakarta)", fontSize: "8.5pt" }}>Something went wrong — try again.</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ border: "1px solid #2A2826", display: "flex", alignItems: "center" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask something..."
                disabled={isLoading}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "12px 16px", fontFamily: "var(--font-jakarta)", fontSize: "8.5pt", color: "#F2F0EB", caretColor: "#F2F0EB" }}
              />
              <button type="submit" disabled={isLoading || !input.trim()} style={{ padding: "12px 16px", color: isLoading || !input.trim() ? "#3A3836" : "#6B6560", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10pt", background: "transparent", border: "none", cursor: isLoading || !input.trim() ? "not-allowed" : "pointer", transition: "color 0.15s" }}>↵</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
