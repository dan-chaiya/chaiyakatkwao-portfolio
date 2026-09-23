// lib/theme.ts — the site's two colour themes, Light and Dark.
// Light is the default: a first visit, a browser that blocks localStorage and a page
// without JavaScript all get it. The visitor's own pick is stored under
// THEME_STORAGE_KEY by components/ThemeToggle.tsx and applied as <html data-theme>.
// The colours themselves live in app/globals.css, one block per theme.

export type Theme = "light" | "dark";

export const THEMES: readonly Theme[] = ["light", "dark"];

export const THEME_STORAGE_KEY = "theme";

// The saved pick: Dark only when "dark" is stored, Light for anything else, including
// storage that throws. THEME_INIT_SCRIPT below is the same rule as a string, because
// it has to run inline before any bundle loads; change the two together.
export function storedTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

// Inlined into <head> by app/layout.tsx, so it runs while the page is still being
// parsed, before the first paint: a visitor who picked Dark never sees a Light frame.
export const THEME_INIT_SCRIPT = `(function(){var t="light";try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")t="dark"}catch(e){}document.documentElement.dataset.theme=t})()`;
