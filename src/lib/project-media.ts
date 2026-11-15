import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CollectionEntry } from "astro:content";
import type { Slide } from "@/components/MediaCarousel.astro";

/** True when a `/media/...` path points at a file in `public/`. */
const published = (src: string) => existsSync(join(process.cwd(), "public", src));

/**
 * The slides for a project page's carousel: its clips in order, each with its title and
 * description, leaving out any whose file isn't in `public/` yet. With `edition`, only the clips
 * tagged with that edition's label.
 */
export function projectSlides(project: CollectionEntry<"projects">, edition?: string): Slide[] {
  return project.data.clips
    .filter((clip) => (edition === undefined || clip.edition === edition) && published(clip.src))
    .map((clip) => ({
      src: clip.src,
      fit: clip.fit === "phone" ? "contain" : "cover",
      caption: clip.label,
      description: clip.description,
    }));
}
