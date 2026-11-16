// The end piece of every blog post (a Sätteri hast plugin): a "Thanks for reading." sign-off
// under a rule, placed before the post's footnotes so the post ends text → sign-off → notes.
// Only Markdown files under content/blog get it.

/** @param {any} node */
const isFootnotes = (node) =>
  node?.type === "element" &&
  node.tagName === "section" &&
  (node.properties?.dataFootnotes !== undefined || [node.properties?.className].flat().includes("footnotes"));

/** @type {import("satteri").HastPluginEntry} */
export default function postEndPlugin(/** @type {any} */ { fileURL }) {
  if (!fileURL || !/\/content\/blog\//.test(fileURL.pathname)) return null;
  return {
    name: "post-end",
    after(root, ctx) {
      const signOff = {
        type: "element",
        tagName: "p",
        properties: { className: ["reader-fin"] },
        children: [{ type: "text", value: "Thanks for reading." }],
      };
      const footnotes = root.children.find(isFootnotes);
      if (footnotes) ctx.insertBefore(footnotes, /** @type {any} */ (signOff));
      else ctx.appendChild(root, /** @type {any} */ (signOff));
    },
  };
}
