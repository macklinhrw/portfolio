/**
 * Renders the inline Markdown used in short frontmatter strings (clip descriptions, experience
 * highlights) to HTML: `code`, [links](url), **bold** and *italic*. Everything else is escaped,
 * so the result is safe for `set:html`.
 */
export function inlineMarkdown(text: string, { linkClass }: { linkClass?: string } = {}): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  // Code spans first, so their contents are never read as other Markdown.
  const codes: string[] = [];
  let html = escape(text).replace(/`([^`]+)`/g, (_, code: string) => {
    codes.push(`<code>${code}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });

  const classAttr = linkClass ? ` class="${linkClass}"` : "";
  html = html
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, `<a href="$2"${classAttr}>$1</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");

  return html.replace(/\u0000(\d+)\u0000/g, (_, i: string) => codes[Number(i)]);
}
