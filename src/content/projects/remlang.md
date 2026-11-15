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
      The mobile app ships with a prebuilt SQLite database, so dictionary search, word pages, decks and stroke-order practice all work without a connection. Japanese entries add pitch-accent diagrams and kanji breakdowns, and pitch cards review a word's accent alongside its reading. Behind it is a content pipeline that builds that database from dictionary data, example sentences, stroke-order data and pitch-accent data.
    stack: [React Native, Expo, SQLite]
  - label: Web · Chinese
    period: Mar 2023 – Jul 2025
    platforms: Web
    description: Dictionary search, HSK and community decks, spaced-repetition review and saved readings.
    about: >-
      The web app is the Chinese side of Remlang: a dictionary, decks built from HSK levels or shared by the community, spaced-repetition review with statistics, and saved readings. It's built with Next.js, tRPC and Drizzle on PostgreSQL.
    stack: [Next.js, tRPC, PostgreSQL]
showcase: { src: /media/projects/remlang-handwriting.mp4, fit: contain }
clips:
  - src: /media/projects/remlang-handwriting.mp4
    label: Handwriting review
    description: Review a character by writing it from memory, stroke by stroke, with its outline as a hint when you need one.
    fit: phone
    edition: Mobile · Japanese
  - src: /media/projects/remlang-word-entry.mp4
    label: Looking up a word
    description: Search in English, then open a word for its definitions, example sentences, pitch accent and kanji breakdown.
    fit: phone
    edition: Mobile · Japanese
  - src: /media/projects/remlang-web-review.mp4
    label: Stroke-order review
    description: Pick a deck and review its characters by writing them, with spaced repetition deciding what is due.
    edition: Web · Chinese
---
