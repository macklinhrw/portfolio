/**
 * The site theme: "dark" (the default) or "light", chosen with the theme toggle and stored in
 * localStorage. Layout.astro applies it before first paint with an inline copy of this logic.
 */
export type SiteTheme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/** Browser chrome colour for each theme (the page background). */
export const THEME_COLORS: Record<SiteTheme, string> = { dark: "#0d152a", light: "#faf7f1" };

export function readSiteTheme(): SiteTheme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

/**
 * Applies a site theme to the document. A post's reader page colour (Paper, Sepia, Night)
 * overrides the light/dark switch; its "Site" page follows the site theme.
 */
export function applySiteTheme(theme: SiteTheme) {
  const html = document.documentElement;
  html.dataset.siteTheme = theme;
  const reader = html.dataset.readerTheme;
  const dark = reader === "night" ? true : reader === "paper" || reader === "sepia" ? false : theme === "dark";
  html.classList.toggle("dark", dark);
  html.style.colorScheme = dark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[dark ? "dark" : "light"]);
}

/**
 * Switches the theme with a transition. The page swaps in a single frame and only the paint
 * animates, so nothing on the page moves:
 *
 * - With the View Transitions API, the new theme is revealed by a circle growing from `origin`
 *   (the toggle) over a snapshot of the old one. With reduced motion, a short crossfade instead.
 * - Without it, colours fade in place for the same duration.
 *
 * CSS transitions are switched off for the swap itself (`theme-switching`), so hover and focus
 * transitions on individual elements don't trail behind the page's.
 */
export function switchSiteTheme(theme: SiteTheme, origin?: { x: number; y: number }) {
  const html = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const swap = () => {
    html.classList.add("theme-switching");
    applySiteTheme(theme);
    // Flush styles while transitions are off, so the new colours land without animating.
    void getComputedStyle(html).color;
  };

  if (!document.startViewTransition) {
    // Fallback: a colour fade on every element, then back to normal.
    html.classList.add("theme-fading");
    applySiteTheme(theme);
    setTimeout(() => html.classList.remove("theme-fading"), 450);
    return;
  }

  html.dataset.themeTransition = reduceMotion ? "fade" : "reveal";
  const transition = document.startViewTransition(swap);
  transition.finished.finally(() => {
    html.classList.remove("theme-switching");
    delete html.dataset.themeTransition;
  });

  if (reduceMotion) return;
  transition.ready.then(() => {
    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? 0;
    // Far enough to reach the farthest corner of the viewport.
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    html.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 620, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
}
