"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/v2/Header";
import "./(v2)/v2.css";

// Sits outside the (v2) group so it catches every route; wears the v2 look directly.
export default function NotFound() {
  // A client 404 cannot export metadata, and the root title would otherwise name the
  // tab as the home page. The streamed metadata writes the root title after this mounts,
  // so hold the 404 title for as long as the page is open (2026-10-04).
  useEffect(() => {
    const TITLE = "Not found · Chaiya Katkwao";
    document.title = TITLE;
    const path = window.location.pathname;
    const keep = new MutationObserver(() => {
      // Only on this URL: a link away must get its own page's title.
      if (window.location.pathname !== path) return keep.disconnect();
      if (document.title !== TITLE) document.title = TITLE;
    });
    keep.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => keep.disconnect();
  }, []);

  return (
    <div className="v2">
      <Header />
      <main id="main-content" className="v2-info">
        <div>
          <p className="v2-mono">404</p>
          <h1 className="v2-info__bio">Nothing at this address. The work is still here.</h1>
          <p>
            <Link href="/works">Index</Link>, <Link href="/information">Information</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
