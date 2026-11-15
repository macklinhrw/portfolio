---
name: Hunter Reeve Poetry
platforms: Web
period: Sep 2026
description: A poem website I created for my grandmother, features a poem carousel and podcast player.
tagline: A home for my grandmother's poems and her podcast.
stack: [SvelteKit, Drizzle, PostgreSQL]
icon: feather
hue: 10
url: https://huntyreeve.com
order: 4
showcase: { src: /media/projects/poemsite-carousel.mp4, fit: cover }
clips:
  - src: /media/projects/poemsite-carousel.mp4
    label: The poem carousel
    description: The front page opens on her latest poems, with a shuffle that draws five at random from the whole collection.
  - src: /media/projects/poemsite-poem-scroll.mp4
    square: /media/projects/poemsite-poem-scroll-square.mp4
    label: A poem page
    description: Every poem has a page of its own.
---

Hunter Reeve Poetry collects my grandmother's poems in one place. The front page opens on a carousel of her most recent poems, with a shuffle that draws five at random from the whole collection, followed by every poem as a card and the latest podcast episode.

Signed-in administrators get an editor for adding and updating poems: a plain text box, a photo picker, a live preview, and drafts that save as you type. Photos are resized and stored by the site itself.

The site is built with SvelteKit, Drizzle and PostgreSQL, with Google sign-in through Better Auth, and has light and dark themes.
