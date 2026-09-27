"use client";

// components/ThemeToggle.tsx — the theme dot at the end of the header.
// One round button, half ink and half paper; a click flips the theme and the dot turns
// half a circle (2026-09-27: was two mono LIGHT / DARK labels in a box).
// <html data-theme> is the single source of truth: the inline script in app/layout.tsx
// sets it before the first paint, and this switch rewrites it and saves the pick.
// How the dot looks is decided in globals.css from that attribute, not from React
// state, so it is right from the first frame even before hydration; React owns only
// the click and the label.

import { useLayoutEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, storedTheme, type Theme } from "@/lib/theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

// Every colour on the page changes in the same frame. Without the freeze, each element
// that carries a colour transition (nav links, rows, buttons) would fade at its own
// speed and the switch would ripple across the page. The dot itself is left out, so it
// still turns.
function applyTheme(next: Theme) {
  const root = document.documentElement;
  const freeze = document.createElement("style");
  freeze.textContent = ":not(.theme-dot),::before,::after{transition:none!important}";
  document.head.appendChild(freeze);
  root.dataset.theme = next;
  void getComputedStyle(root).backgroundColor; // restyle now, while transitions are off
  requestAnimationFrame(() => requestAnimationFrame(() => freeze.remove()));
}

// A pick fades the page's colours from one theme to the other: while <html> carries
// .theme-fading, globals.css fades the colour tokens themselves over 450ms, and every
// element follows them, so the ground, the text and the rules shift together and
// nothing ripples. Only colours move; photographs and videos are never copied, so a
// playing video stays one clean picture. (Tried and dropped the same day: a
// view-transition cross-fade, which showed every video twice, and a transition on every
// element, which Chrome kept restarting on some text.) Corrections from
// syncWithStorage always cut: they put back a pick the visitor already made, so there
// is nothing to watch.
const FADE_MS = 450;
let fadeTimer: number | undefined;

function fadeToTheme(next: Theme) {
  const root = document.documentElement;
  // The class and the new theme land in the same style change; transitions take their
  // timing from the style after the change, so this one change is enough.
  root.classList.add("theme-fading");
  root.dataset.theme = next;
  window.clearTimeout(fadeTimer);
  fadeTimer = window.setTimeout(() => root.classList.remove("theme-fading"), FADE_MS + 50);
}

function showTheme(next: Theme, fade = false) {
  if (document.documentElement.dataset.theme === next) return;
  if (fade) fadeToTheme(next);
  else applyTheme(next);
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
  showTheme(next, true);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage blocked (private mode, disabled site data): the switch still works for
    // this page view, it just is not remembered.
  }
}

export default function ThemeToggle() {
  // The server cannot know the visitor's pick, so it renders the default; the client
  // snapshot corrects the label right after hydration.
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light");

  // The hydration-error strip happens in the same commit that mounts this switch, before
  // subscribe's observer exists, so it is caught here, before that render paints.
  useLayoutEffect(() => {
    if (!document.documentElement.dataset.theme) syncWithStorage();
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} theme`;

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => chooseTheme(next)}
    >
      <span className="theme-dot" aria-hidden="true" />
    </button>
  );
}
