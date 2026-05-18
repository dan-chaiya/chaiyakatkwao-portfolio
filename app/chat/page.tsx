import type { Metadata } from "next";
import ChatInterface from "./ChatInterface";

export const metadata: Metadata = {
  title: "Chat — Chaiya Katkwao",
  description: "Ask Chaiya anything about his work.",
};

export default function ChatPage() {
  return <ChatInterface />;
}
