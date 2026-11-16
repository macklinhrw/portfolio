---
name: Notolibra
platforms: Desktop
period: Sep 2026 – Present
description: "An operating system for your notes. No context switching: annotate PDFs and ebooks, and save web pages, all inside the same app. Integrated AI can operate everything. Your notes are a graph you can navigate and search seamlessly."
stack: [Rust, gpui]
icon: document
hue: 295
tagline: An operating system for your notes with no context switching needed.
iconImage: /media/projects/notolibra-icon.svg
order: 1
repos:
  [
    https://github.com/macklinhrw/notolibra,
    https://github.com/macklinhrw/notolibra-engine,
  ]
showcase: { src: /media/projects/notolibra-3.mp4, fit: cover }
clips:
  - src: /media/projects/notolibra-3.mp4
    label: Ask about what's on screen
    description: You can easily take a screenshot and ask a question with Claude Code or Codex open beside your work. For any tab, you can mention them using `@` and autocomplete.
  - src: /media/projects/notolibra-1.mp4
    label: Applets and the pane system
    description: There are about 35 applets, from a PDF viewer to a code editor, and each becomes a tab you can split and rearrange.
  - src: /media/projects/notolibra-2.mp4
    label: Vim mode
    description: Not only can you edit your notes with Vim bindings, but you can even navigate the entire app using only your keyboard. Inspired by LunarVim and AstroNvim, among others.
  - src: /media/projects/notolibra-4.mp4
    label: Highlights become notes
    description: Highlights in books and PDFs are written into a note for that book, each linked back to its passage.
---

The idea for this project came in 2022, about a month before the release of ChatGPT. However, I knew very clearly how ambitious it was and scrapped it reluctantly. It wasn't until recently, with more time on my hands and after revisiting my old notes, that it occurred to me it might actually be possible. I was still skeptical, but after getting more and more done, that skepticism has slowly been fading.

The idea came about from my use of various note-taking systems (known as personal knowledge management, or PKM). It's one thing to have the tool in front of you, but actually having it provide value requires a system, and friction in that system undermines its usage. That is what drove me to design an app that systematically removes all friction (context switching) that gets in the way of note-taking. Whenever I have an idea, no matter where I am, I should be able to write it down. Nothing should distract me from the idea.
