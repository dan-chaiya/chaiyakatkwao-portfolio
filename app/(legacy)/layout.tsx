import Navigation from "@/components/Navigation";
import MotionProvider from "@/components/MotionProvider";

// /cv and /chat keep the pre-v2 look until they get their own pass. The route group
// adds nothing to their URLs.
export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionProvider>
      <Navigation />
      {children}
    </MotionProvider>
  );
}
