import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ChatInterface from "./ChatInterface";

export const metadata: Metadata = pageMetadata({
  title: "Chat",
  description: "Ask Chaiya anything about his work.",
  path: "/chat",
});

export default function ChatPage() {
  return <ChatInterface />;
}
