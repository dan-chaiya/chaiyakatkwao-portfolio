import Link from "next/link";
import Header from "@/components/v2/Header";
import "./(v2)/v2.css";

// Sits outside the (v2) group so it catches every route; wears the v2 look directly.
export default function NotFound() {
  return (
    <div className="v2">
      <Header />
      <main id="main-content" className="v2-info">
        <div>
          <p className="v2-mono">404</p>
          <h1 className="v2-info__bio">Nothing at this address.</h1>
          <p>
            <Link href="/works">Go to the Index</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
