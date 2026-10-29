import SmoothScroll from "@/components/v2/SmoothScroll";
import "./v2.css";

// v2: the artist's archive. Paper and ink only; the images carry all colour.
export default function V2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="v2">
      <a href="#main-content" className="v2-skip">
        Skip to content
      </a>
      <SmoothScroll />
      {children}
    </div>
  );
}
