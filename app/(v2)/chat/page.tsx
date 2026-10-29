import type { Metadata } from "next";
import Header from "@/components/v2/Header";
import Chat from "@/components/v2/Chat";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Chat",
  description: "Ask an AI assistant about Chaiya Katkwao's work. It answers from his CV and project notes.",
  path: "/chat",
});

export default function ChatPage() {
  return (
    <>
      <Header />
      <Chat />
    </>
  );
}
