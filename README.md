# portfolio

My personal site: the projects I've built, a few posts, and where I've worked. It's a static Astro site that ships no framework JavaScript.

## Projects on it

Each one is open source:

| Project                                                                     | What it is                                                           |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [Notolibra](https://github.com/macklinhrw/notolibra)                        | Notes, the web, PDFs, books and AI chat over one folder of Markdown  |
| [Remlang](https://github.com/macklinhrw/remlang)                            | Offline-first Japanese and Chinese dictionary and study app (Expo)   |
| [Remlang web](https://github.com/macklinhrw/remlang-web)                    | The Chinese web app it grew out of (Next.js, tRPC, Postgres)         |
| [Odincraft](https://github.com/macklinhrw/odincraft)                        | A block world formed by geology, drawn to the horizon (Odin + Metal) |
| [Hunter Reeve Poetry](https://github.com/macklinhrw/poetry-site)            | A site for my grandmother's poems and podcast (SvelteKit)            |

## How it's built

- **Content collections.** Projects, posts and work history are Markdown files in `src/content/` with typed frontmatter (`src/content.config.ts`). A project lists its stack, platforms, editions (for one project with several apps) and a tour of clips, each with a label and a sentence.
- **Clips, not screenshots.** Project pages tour short muted screen recordings. `ClipCycle` plays a project's clips one after another on the home page, holding stills for a few seconds and falling back to the project's icon when a file is missing; `MediaCarousel` runs the tour on the project page.
- **No framework JavaScript.** Pages are Astro components rendered at build time. A handful of shadcn/React components render to static HTML too; what runs in the browser is a few small inline scripts for the theme toggle, the clips, the carousels and the reading settings on posts.
- **Styling.** Tailwind CSS 4 with design tokens in `src/styles/global.css`, light and dark themes chosen before first paint, Geist and Source Serif 4 as self-hosted variable fonts.

## Running it

You need [Bun](https://bun.sh) 1.4.2 or newer.

```sh
bun install
bun dev          # http://localhost:4321
bun run check    # astro check: types and content schemas
bun run build    # static site in dist/
```

## Layout

```
src/content/      projects, blog posts and experience as Markdown
src/pages/        home, /projects/[slug], /blog and /blog/[...slug]
src/components/   clip player, carousel, lists, header, theme toggle, reader settings
src/layouts/      the page shell
src/styles/       Tailwind setup and design tokens
public/media/     project clips and images
```

## License

The code is licensed under the [GNU General Public License v3.0 or later](LICENSE).

The writing and media are not: the blog posts, project and experience write-ups in `src/content/`, and the clips and images in `public/media/` are © Macklin Reeve-Wilson, all rights reserved. Feel free to use the site's code for your own site, with your own content.
