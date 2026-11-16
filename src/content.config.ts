import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    /** Where it runs, shown under the name, e.g. "iOS, Android, Web". */
    platforms: z.string(),
    /** When the concentrated work on it happened, shown as written, e.g. "Mar 2026 – Present". */
    period: z.string().optional(),
    description: z.string(),
    /** One line under the name on the project's own page (the home card uses `description`). */
    tagline: z.string().optional(),
    stack: z.array(z.string()),
    icon: z.enum(["document", "hanzi", "feather", "mountain"]),
    /**
     * The project's own colour, as an OKLCH hue angle (0–360). Tints its icon tile, tech pills,
     * hover wash and media frames in both themes.
     */
    hue: z.number().min(0).max(360).optional(),
    /** The project's own app icon (e.g. its favicon); replaces `icon` where shown. */
    iconImage: z.string().optional(),
    /** Public address of the live project, if it has one. */
    url: z.string().url().optional(),
    /** Public source repositories, shown on the project page. */
    repos: z.array(z.string().url()).default([]),
    /** Lower numbers are listed first. */
    order: z.number(),
    /**
     * Short muted screen recordings (.mp4) or still screenshots (.webp, .png, .jpg): the chapters
     * of the project page's tour, in order.
     * `fit` picks the crop: "desktop" crops from the centre, "phone" from the top.
     */
    clips: z
      .array(
        z.object({
          src: z.string(),
          /** Optional square version (still or video), used where the clip is shown as a small square. */
          square: z.string().optional(),
          label: z.string(),
          /** A sentence or two shown with the clip in the project page's tour. */
          description: z.string().optional(),
          fit: z.enum(["desktop", "phone"]).default("desktop"),
          /** For a project with editions: the `label` of the edition this clip shows. */
          edition: z.string().optional(),
        }),
      )
      .default([]),
    /**
     * Separate versions of one project (e.g. a mobile app and a web app), shown as sections
     * inside a single card and as tabs on the project page. When present, they replace the
     * card's own description and stack.
     */
    editions: z
      .array(
        z.object({
          label: z.string(),
          /** When this edition was built, shown as written. */
          period: z.string().optional(),
          /** Where this edition runs, e.g. "iOS, Android". */
          platforms: z.string().optional(),
          description: z.string(),
          /** The edition's About text on the project page; blank lines separate paragraphs. */
          about: z.string().optional(),
          stack: z.array(z.string()),
          /** This edition's source repositories; replaces the project's `repos`. */
          repos: z.array(z.string().url()).optional(),
        }),
      )
      .optional(),
    /**
     * The project's tile in the home page showcase band. `fit: "contain"` keeps the whole
     * frame visible (for phone-shaped recordings); "cover" fills the tile.
     */
    showcase: z
      .object({
        src: z.string(),
        fit: z.enum(["cover", "contain"]).default("cover"),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    /** Where the company name links to. */
    url: z.string().optional(),
    /** Shown as written, e.g. "Oct 2022". */
    start: z.string(),
    end: z.string(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    /** Lower numbers are listed first. */
    order: z.number(),
  }),
});

export const collections = { blog, projects, experience };
