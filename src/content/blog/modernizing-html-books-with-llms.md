---
title: "How I used LLMs to modernize over 2,000 HTML books"
description: "Migrating an internet archive of hardcoded HTML books using structured output, crawling, and a regression-tested feedback loop."
pubDate: 2026-11-11
---

It was about 5 years ago when I was first presented with a problem. It was my freshman year of college, and I had been introduced to a small company. They are an internet archive which it wouldn't be an exaggeration to call as old as the internet itself. However, with that sort of history come some important technical implications. The site was driven by HTML. More specifically, the roughly 2,000[^1] books (and some articles) that were its foundation were _hardcoded_ in HTML, many of them following a different standard for markup. My job was to put these into a database.

```prisma
model Book {
  id        Int           @id @default(autoincrement())
  slug      String        @unique
  title     String
  author    String?
  sourceUrl String?       // the old HTML index page
  pages     BookPage[]
}

// One chapter of a book: one old HTML file
model BookPage {
  id          Int    @id @default(autoincrement())
  bookId      Int
  slug        String
  title       String
  contentHtml String // cleaned markup for the reader
  contentText String // plain text for search
  order       Int
  book        Book   @relation(fields: [bookId], references: [id])

  @@unique([bookId, slug])
}
```

The above is a simple Prisma schema (the ORM I was using at the time) that illustrates the problem and part of an initial solution. A simple solution is to accept the HTML markup and the rendering that comes with it (React: `dangerouslySetInnerHTML` prop), but we still need to extract a book title, author, slug, and overall chapter order for each book.

This is where the problem starts to get more complicated, and consistent markup would have made the issue trivial. However, the site content was originally converted as part of an evolving pipeline, so it was not altogether consistent. It could not be simply solved by throwing together a couple of CSS selectors to extract each piece of information. And there is an even bigger problem with scraping: if we were to launch a new site, I wanted to be certain that the content was imported _correctly_. It's hard to have a guarantee that a CSS selector is not grabbing the wrong text in edge cases, creating a book with metadata that makes no sense.

Correctness was very important, because our content was our business. And a large-scale migration done improperly could lose valuable SEO ranking and therefore was a significant risk. On the flip side, a proper migration, given modern SEO optimizations, could improve organic traffic and improve business.

That being said, it is hard to guarantee correctness altogether. To address the CSS selector issue I decided to explore the idea of **structured output**. I initially came up with a simple plan after experimenting with the cost-effective _Gemini 2.0 Flash_ model around the time of its release. It could operate over a large amount of data and output in a format you specify (using Pydantic at the time).

```python
from google import genai
from pydantic import BaseModel, Field


class Book(BaseModel):
    title: str
    author: str | None = Field(description="null if the page does not name one")
    translator: str | None
    date: str | None = Field(description="publication date as printed, e.g. '1882'")


client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=["Extract this book's metadata.", index_html],
    config={
        "response_mime_type": "application/json",
        "response_schema": Book,
    },
)

book: Book = response.parsed
```

The schema above specifies the format I want, which corresponds to our database schema. It is exactly the kind of solution I was looking for: given an uncertain input format, output in a consistent structured format. For extracting book metadata, this was the approach that worked. That being said, it was not perfect, and there still existed cases of ambiguity between author and editor or publication date versus original edition publication date. Human verification is still necessary.

But this is only one part of the problem: how do we scrape the _chapters_? That is where the meat of the content is after all. And a solution came from one realization: almost all books on the site had a table of contents and that table of contents listed all its chapters _in order_. Once we have the actual chapter index, we can use the HTML directly, albeit after cutting out page chrome and navigation (which will be replaced by our own UI). But you might point out this is not a guarantee either: a Table of Contents _could_ have all of the chapters, but it also might not, and we are relying on a convention that we have verified holds for the examples we have looked at, but how do we guarantee it holds for the entire site?

Early on, I had this same realization and my solution was a crawler; the chapters were meant to be navigable by a human and generally have a link to the next chapter (again there are exceptions), so if I crawled in DFS order based on which links I saw first starting from the book index, deduplicated already visited links, and pruned links that leave the book URL level `hostname/.../<book>/<chapters>/...`, then I could create a more robust TOC list.

So, now we have two different methods of creating a TOC list. How do we reconcile them? Furthermore, they are not necessarily equal in weight: a crawled order may not be the recommended order of reading the book, so we still care about the TOC order more if it exists. To do this, we keep the TOC order, and crawled _found_ pages slot under their parent. There are more edge cases. Images get filtered out by an allowlist, and special pages like errata float to the end.

However, there is one last edge case, the most important one, and it challenges our base assumptions. Every "book" may not have a single table of contents. In fact, it may be multiple books compiled into one, having multiple tables of contents, with one master table of contents. This suddenly makes the situation tricky again, and also lets me revisit a detail I skipped earlier.

How do we process a table of contents? We aren't doing it using structured output, which, due to output limits (`8,192` tokens) and due to our wanting to keep TOC markup, was ruled out as an approach. So the ideal is a deterministic way of extracting these TOC lists using a scraper + selectors, which again forces us back to the issue of correctness. However, the scenario here is different. What we want is a list of links, and furthermore we know they must be links nested under the parent book URL structure: the problem looks much more approachable. Another key point is that we can define, along with this script, a deterministic way of classifying whether a page looks like a Table of Contents; After some cleanup, we can apply a number of heuristics that shape our decision.

This brings me to a core part of the entire process. We have established a methodology that is effective, but in practice the data is not kind and involves much tweaking: the metadata structured output prompt, the heuristics and thresholds, more edge cases that don't look as we expected. And as a nice addition to all the chaos we have to consider that the site, old as the internet, was made with HTML standards as old as HTML. I frequently saw old (uppercased) tags such as `<FONT>`, `<CENTER>`, `<BIG>`, `<U>`, and misnested tags. Some pages did not use the UTF-8 standard since they predated it. Overall, the scripts needed to become something I iteratively polished, and this needed a process to be designed.

Before I get into the details of my solution, there is another aspect of the problem that also has this same solution. Where are the books listed, and how are they discovered by users? Each book is listed on a Category page, and that category page is generally split into sections with headers, sub-areas of the general category. A section might have a handwritten introduction, and each book row a short description introducing it especially for that page. This was by far the messiest part of the site: inconsistent markup, inconsistent sections, _hundreds_ of edge cases, and conventions only loosely followed. The most egregious case was Category pages that effectively served as a custom-formatted Table of Contents for a particular book, meaning the previously described logic of dealing with consistent book index pages as the TOC was useless for these.

To solve these problems, I created a list of manually reviewed pages that served 1) as my completion record and 2) as a list of regression tests to measure the impact of extraction logic changes. The second point was where the magic was. It meant I could manually review pages, find what looked wrong, ask the LLM for fixes, which it would make and then automatically run the regression suite on the list. Once I signed off after a review on a page, its extraction output _must_ stay identical. This was a **feedback loop**, and it was what turned this multi-week or multi-month task into something I completed in less than a week.

That being said, completing this task so quickly was still a large time commitment, most of which went to organizing all Category pages into a standardized schema that accommodated all the different layouts the originals used, and the UI components to properly display them. Manual review took a lot of time, and across the more than 160 Category pages, I reviewed each probably around half a dozen times.

Before concluding, let's revisit the correctness idea. How do we guarantee our system hasn't missed any content? The solution was somewhat simple: I took a crawl of the original site using the stored HTML copy of the site on my computer, then I constructed a list of all URLs on the site. Then, using this list, I compared it to a compiled list based on all `sourceUrl` columns in our database schemas. Sure enough, there were thousands of missing pages, many of them coming from strange edge cases. This was another case of iteratively refining the extraction scripts till all the holes were filled and I could safely say that no content was missing from the site (though all cases of malformed content are hard to resolve without more manual review).

It's hard to overstate the importance of this problem to the business, and the uncertainty of it being left unsolved was a lingering worry in my brain. We would not have been able to launch the new site without it being resolved. For a long time, it was unclear whether we would be able to resolve the problem, and we had thought the only reasonable solution was hundreds of hours of manual data entry.

After I decided to tackle it, I was overconfident in thinking I could solve it sooner. But after experiencing edge case after edge case and variables (like the nested TOC) that threw the plan off, I realized I wasn't going to get there through a brute force single-pass solution. The slow but thorough approach involving regression testing and incremental gains was what eventually made this impossible problem possible, and what I learned is that a measured approach beats a hasty one.

[^1]: The archive has 3,071 entries. Counting only the ones that are clearly books, with each volume and each book inside a collection counted separately, and leaving out articles and short pieces, comes to about 2,000.
