/** Reading settings for blog posts, shared by the settings panel and the pre-paint script. */
import { applySiteTheme, readSiteTheme } from "@/lib/theme";

export type ReaderTheme = "site" | "paper" | "sepia" | "night";
export type ReaderFont = "serif" | "sans";
export interface ReaderSettings {
  /** Index into READER_SIZES. */
  size: number;
  theme: ReaderTheme;
  font: ReaderFont;
  /** Justified, hyphenated text (off by default). */
  justify: boolean;
}

export const READER_SIZES = [17, 18.5, 20, 21.5, 23, 25];
export const READER_DEFAULTS: ReaderSettings = { size: 2, theme: "site", font: "serif", justify: false };
export const READER_STORAGE_KEY = "reader-settings";

const THEMES: ReaderTheme[] = ["site", "paper", "sepia", "night"];
const FONTS: ReaderFont[] = ["serif", "sans"];

export function readReaderSettings(): ReaderSettings {
  try {
    const raw = JSON.parse(localStorage.getItem(READER_STORAGE_KEY) ?? "{}");
    return {
      size: Number.isInteger(raw.size) && raw.size >= 0 && raw.size < READER_SIZES.length ? raw.size : READER_DEFAULTS.size,
      theme: THEMES.includes(raw.theme) ? raw.theme : READER_DEFAULTS.theme,
      font: FONTS.includes(raw.font) ? raw.font : READER_DEFAULTS.font,
      justify: typeof raw.justify === "boolean" ? raw.justify : READER_DEFAULTS.justify,
    };
  } catch {
    return { ...READER_DEFAULTS };
  }
}

/** Applies settings to the document: page colour and font as attributes, size as a variable. */
export function applyReaderSettings(s: ReaderSettings) {
  const html = document.documentElement;
  html.dataset.readerTheme = s.theme;
  html.dataset.readerFont = s.font;
  html.dataset.readerJustify = String(s.justify);
  html.style.setProperty("--reader-size", `${READER_SIZES[s.size]}px`);
  // Light or dark follows the page colour; "Site" follows the site theme.
  applySiteTheme(readSiteTheme());
}
