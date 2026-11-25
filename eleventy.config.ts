import path from "node:path";
import { pathToFileURL } from "node:url";
import pluginRss from "@11ty/eleventy-plugin-rss";
import type { UserConfig } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import type { Node } from "posthtml";
import { TIME_ZONE } from "./scripts/timezone.ts";

// Liquid's date filter formats in the process timezone. Its timezoneOffset option
// is off by an hour around DST changes when the build machine observes DST itself.
process.env.TZ = TIME_ZONE;

const md = markdownIt({ html: true });

export default (eleventyConfig: UserConfig) => {
  // Eleventy only picks up .js, .cjs and .mjs data files by itself. Node strips the
  // types on import, and the query busts the module cache on rebuilds during `start`.
  eleventyConfig.addDataExtension("ts", {
    read: false,
    parser: async (filePath) => {
      const url = pathToFileURL(path.resolve(filePath));
      url.searchParams.set("t", String(Date.now()));
      const { default: data } = await import(url.href);
      return typeof data === "function" ? data() : data;
    },
  });

  eleventyConfig.addPassthroughCopy({
    public: "/",
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addFilter("md", (content = "") => {
    return md.render(content);
  });

  // Code blocks and tables scroll on narrow screens, so keyboard users need to
  // be able to focus them. Tables get a wrapper to keep their table semantics.
  eleventyConfig.htmlTransformer.addPosthtmlPlugin(
    "html",
    ({ page }) =>
      (tree: Node) => {
        if (!page.inputPath.startsWith("./src/blog/posts/")) {
          return;
        }

        let codeBlocks = 0;
        let tables = 0;
        const wrapped = new WeakSet<Node>();
        tree.walk((node) => {
          if (node.tag === "pre") {
            node.attrs = {
              ...node.attrs,
              tabindex: "0",
              role: "region",
              "aria-label": `Code block ${++codeBlocks}`,
            };
          }
          // walk() descends into what we return, so skip the table when it gets there again
          if (node.tag === "table" && !wrapped.has(node)) {
            wrapped.add(node);
            return {
              tag: "div",
              attrs: {
                class: "table-scroll",
                tabindex: "0",
                role: "region",
                "aria-label": `Table ${++tables}`,
              },
              content: [node],
            };
          }
          return node;
        });
      },
  );

  eleventyConfig.addCollection("blogposts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").reverse();
  });

  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
