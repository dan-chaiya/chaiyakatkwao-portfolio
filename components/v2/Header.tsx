import Link from "next/link";
import Clock from "@/components/v2/Clock";

// Name left, nav centre, clock (or the project counter) right. Difference blend so
// it reads over the full-bleed hero and over paper alike.
export default function Header({ right }: { right?: React.ReactNode }) {
  return (
    <header className="v2-header">
      <Link href="/" className="v2-header__name">
        Chaiya Katkwao
      </Link>
      <nav aria-label="Main" className="v2-header__nav">
        <Link href="/works">Index</Link>, <Link href="/information">Information</Link>
      </nav>
      <div className="v2-header__right v2-mono">{right ?? <Clock />}</div>
    </header>
  );
}
