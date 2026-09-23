"use client";

// components/ThemeToggle.tsx — the Light / Dark switch at the end of the header.
// <html data-theme> is the single source of truth: the inline script in app/layout.tsx
// sets it before the first paint, and this switch rewrites it and saves the pick.
// Which option looks selected is decided in globals.css from that attribute, not from
// React state, so the switch is right from the first frame even before hydration;
// React owns only the click and aria-pressed.

import { useLayoutEffect, useSyncExternalStore } from "react";
import { THEMES, THEME_STORAGE_KEY, storedTheme, type Theme } from "@/lib/theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

// Every colour on the page changes in the same frame. Without the freeze, each element
// that carries a colour transition (nav links, rows, buttons) would fade at its own
// speed and the switch would ripple across the page instead of cutting.
function showTheme(next: Theme) {
  const root = document.documentElement;
  if (root.dataset.theme === next) return;
  const freeze = document.createElement("style");
  freeze.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(freeze);
  root.dataset.theme = next;
  void getComputedStyle(root).backgroundColor; // restyle now, while transitions are off
  requestAnimationFrame(() => requestAnimationFrame(() => freeze.remove()));
}

// Puts <html> back in step with the saved pick after something changed it behind the
// switch's back:
// - a hydration error anywhere on a page (a component that renders differently in the
//   browser, or an extension such as a translator rewriting the page first) makes React
//   client-render the whole document, and React strips every attribute off <html>
//   when it does, data-theme included;
// - another tab saved a different pick;
// - the page came back from the back-forward cache after a pick was made elsewhere.
function syncWithStorage() {
  showTheme(storedTheme());
}

function subscribe(onChange: () => void) {
  const root = document.documentElement;
  const observer = new MutationObserver(() => {
    if (!root.dataset.theme) syncWithStorage();
    onChange();
  });
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  const onStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY || e.key === null) syncWithStorage();
  };
  const onPageShow = (e: PageTransitionEvent) => {
    if (e.persisted) syncWithStorage();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("pageshow", onPageShow);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("pageshow", onPageShow);
  };
}

function chooseTheme(next: Theme) {
  showTheme(next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage blocked (private mode, disabled site data): the switch still works for
    // this page view, it just is not remembered.
  }
}

export default function ThemeToggle() {
  // The server cannot know the visitor's pick, so it renders the default; the client
  // snapshot corrects aria-pressed right after hydration.
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light");

  // The hydration-error strip happens in the same commit that mounts this switch, before
  // subscribe's observer exists, so it is caught here, before that render paints.
  useLayoutEffect(() => {
    if (!document.documentElement.dataset.theme) syncWithStorage();
  }, []);

  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {THEMES.map((t) => (
        <button
          key={t}
          type="button"
          data-theme-option={t}
          aria-pressed={theme === t}
          onClick={() => chooseTheme(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
