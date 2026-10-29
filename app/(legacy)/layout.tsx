import Navigation from "@/components/Navigation";
import MotionProvider from "@/components/MotionProvider";

// /chat keeps the pre-v2 look until it gets its own pass (/cv moved to v2 on 2026-10-29).
// The route group adds nothing to its URL.
export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionProvider>
      <Navigation />
      {children}
    </MotionProvider>
  );
}
