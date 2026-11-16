---
name: Remlang
platforms: iOS, Android, Web
description: Language-learning apps for Japanese on mobile and Chinese on the web.
tagline: Two language-learning apps, Japanese on mobile and Chinese on the web.
stack: [React Native, Expo, Next.js]
icon: hanzi
hue: 165
order: 2
editions:
  - label: Mobile · Japanese
    period: Mar – Apr 2026
    platforms: iOS, Android
    description: An offline-first app with pitch-accent review, kanji breakdowns, stroke-order practice and spaced-repetition decks.
    about: >-
      I've been iterating on this idea for multiple years now, and it started with my desire for a tool to assist in studying for my college Chinese classes. I eventually finished taking 6 classes of Chinese, and I can say that the web app was a great help. Recently, I have also taken up studying Japanese, inspired by my summer trip to Japan. Key features are an integrated dictionary, stroke-order, character decomposition, and pronunciation data (all from freely licensed sources). A key design decision is deduplicated "knowledge", meaning you don't have to study one word twice when it's in two decks.
    stack: [React Native, Expo, SQLite]
    repos: [https://github.com/macklinhrw/remlang]
  - label: Web · Chinese
    period: Mar 2023 – Jul 2025
    platforms: Web
    description: Dictionary search, HSK and community decks, spaced-repetition review and saved readings.
    about: >-
      I've been iterating on this idea for multiple years now, and it started with my desire for a tool to assist in studying for my college Chinese classes. I eventually passed 6 Chinese courses, and I can say that the web app was a great help. Recently, I have also taken up studying Japanese, inspired by my summer trip to Japan. Key features are an integrated dictionary, stroke-order, character decomposition, and pronunciation data (all from freely licensed sources). A key design decision is deduplicated "knowledge", meaning you don't have to study one word twice when it's in two decks.
    stack: [Next.js, tRPC, PostgreSQL]
    repos: [https://github.com/macklinhrw/remlang-web]
showcase: { src: /media/projects/remlang-handwriting.mp4, fit: contain }
clips:
  - src: /media/projects/remlang-handwriting.mp4
    label: Handwriting review
    description: Review a character by drawing it from memory, with stroke snapping, and its outline or drawing animation as a hint when you need one.
    fit: phone
    edition: Mobile · Japanese
  - src: /media/projects/remlang-word-entry.mp4
    label: Looking up a word
    description: Search by word, meaning, or pronunciation, then open an entry for its definitions, example sentences, pitch accent and kanji breakdown.
    fit: phone
    edition: Mobile · Japanese
  - src: /media/projects/remlang-web-review.mp4
    label: Stroke-order review
    description: Pick a deck and review its cards by drawing them, with spaced repetition determining the schedule.
    edition: Web · Chinese
---
