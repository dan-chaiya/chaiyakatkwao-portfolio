"use client";

import { useEffect, useRef, useState } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string };

const OPENING: Message = {
  id: "opening",
  role: "assistant",
  // Said up front (2026-10-04): this is an AI answering in Chaiya's voice, not Chaiya.
  // An agency that found out later would feel misled, and a wrong answer would read as his.
  content: "Hi, I'm an AI assistant that answers in Chaiya's voice, from his CV and projects. Ask about his work, clients or process. For anything that matters, email him.",
};

const SUGGESTIONS = ["What's your background?", "Tell me about the Knack Factory project", "What are you available for?"];

// The chat in v2 (2026-10-29): the same behaviour as before (streaming, one-click retry,
// the rate-limit message, email as the way out), set as a ruled transcript in paper and
// ink instead of chat bubbles. Replies keep their line breaks.
export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const hasUserMessages = messages.some((m) => m.role === "user");
  const idRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll on message count, not on content: the streamed reply changes the last
  // message on every chunk, and a smooth scroll restarted per chunk visibly janks.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages.length]);

  useEffect(() => {
    if (!isLoading) return;
    bottomRef.current?.scrollIntoView({ behavior: "auto", block: "nearest" });
  }, [messages, isLoading]);

  // A suggestion is a finished question, so a tap sends it, as quick replies do in
  // messaging apps; filling the field and waiting for Enter left visitors unsure
  // anything had happened (2026-09-27).
  async function send(text: string, retry = false) {
    if (!text.trim() || isLoading) return;

    // A retry replaces the failed question instead of asking it twice.
    const base = retry && messages[messages.length - 1]?.role === "user" ? messages.slice(0, -1) : messages;
    setLastPrompt(text);
    const userMsg: Message = { id: String(++idRef.current), role: "user", content: text };
    const allMessages = [...base, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    const assistantId = String(++idRef.current);
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages.map(({ role, content }) => ({ role, content })) }),
      });

      if (res.status === 429) {
        const wait = res.headers.get("Retry-After");
        throw new Error(
          wait ? `That's a lot of questions at once. Try again in ${wait}s.` : "That's a lot of questions at once. Try again shortly.",
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
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content } : m)));
      }
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong. Try again.");
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <main id="main-content" className="v2-chat">
      <div className="v2-chat__about">
        <h1 className="v2-chat__title">An AI assistant that answers in Chaiya&apos;s voice.</h1>
        <p>
          Answers come from his CV and project notes and can be wrong. Briefs and bookings go to{" "}
          <a href="mailto:chaiyakatkwao@gmail.com">chaiyakatkwao@gmail.com</a>.
        </p>
        {hasUserMessages && (
          <button
            type="button"
            className="v2-chat__reset"
            onClick={() => {
              setMessages([OPENING]);
              setError(null);
              setInput("");
            }}
            disabled={isLoading}
          >
            Start over
          </button>
        )}
      </div>

      <div className="v2-chat__panel">
        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          // Busy while a reply streams in, so a screen reader reads the finished
          // answer once instead of announcing it a few words at a time.
          aria-busy={isLoading}
          aria-label="Conversation"
          className="v2-chat__log"
        >
          {/* Takes the empty height above a short conversation, so the messages sit at
              the foot of the panel, by the field, instead of hanging at the top. */}
          <div aria-hidden="true" className="v2-chat__spacer" />
          {messages.map((m) => (
            <div key={m.id} className={`v2-chat__msg v2-chat__msg--${m.role}`}>
              <p className="v2-chat__who">{m.role === "user" ? "You" : "Assistant"}</p>
              <p className="v2-chat__text">{m.content || <span className="v2-chat__thinking">Thinking…</span>}</p>
            </div>
          ))}
          {error && (
            <div className="v2-chat__msg" role="alert">
              <p className="v2-chat__text">
                {error}{" "}
                {/* One-click retry that keeps the question, and email as the way out
                    (2026-10-04): an error should never cost the visitor their words. */}
                {lastPrompt && (
                  <button type="button" className="v2-chat__inline" onClick={() => send(lastPrompt, true)} disabled={isLoading}>
                    Try again
                  </button>
                )}
                {lastPrompt ? " or " : ""}
                <a href="mailto:chaiyakatkwao@gmail.com">{lastPrompt ? "email Chaiya directly." : "Or email Chaiya directly."}</a>
              </p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form
          className="v2-chat__form"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          {!hasUserMessages && (
            <div role="group" aria-label="Suggested questions" className="v2-chat__suggest">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} disabled={isLoading}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <label htmlFor="chat-input" className="v2-visually-hidden">
            Ask about Chaiya&apos;s work
          </label>
          <div className="v2-chat__field">
            {/* 16px: iOS Safari zooms into any field set smaller, which threw the
                one-screen chat off the screen on focus (14px until 2026-10-04). */}
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something"
              autoComplete="off"
              // Not disabled while a reply streams: a disabled field can't take focus back
              // when the reply ends, and the visitor can write the next question meanwhile.
              // Send and send() still hold a second request until this one is done.
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
