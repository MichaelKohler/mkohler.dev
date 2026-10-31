import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { it } from "node:test";
import vercelConfig from "../../vercel.json" with { type: "json" };

const SITE_DIR =
  process.env.SITE_DIR || path.join(import.meta.dirname, "../../_site");
const ORIGIN = "https://mkohler.dev";

// The presentations are archived decks, so only links pointing to them are checked.
const isChecked = (file) => !file.startsWith("presentations/");
// These only exist on Vercel.
const isServedByVercel = (pathname) =>
  pathname.startsWith("/_vercel/") ||
  vercelConfig.rewrites.some(({ source }) => source === pathname);

const htmlFiles = fs
  .readdirSync(SITE_DIR, { recursive: true })
  .map((file) => file.split(path.sep).join("/"))
  .filter((file) => file.endsWith(".html") && isChecked(file));

function getLinks(html) {
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const attributes = withoutScripts.matchAll(
    /\s(href|src|srcset)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi,
  );

  return [...attributes]
    .flatMap(([, name, doubleQuoted, singleQuoted]) => {
      const value = doubleQuoted ?? singleQuoted;
      return name.toLowerCase() === "srcset"
        ? value.split(",").map((candidate) => candidate.trim().split(/\s+/)[0])
        : [value];
    })
    .filter(Boolean);
}

function resolveFile(pathname) {
  const file = path.join(SITE_DIR, decodeURIComponent(pathname));
  const candidate = pathname.endsWith("/")
    ? path.join(file, "index.html")
    : file;
  return fs.statSync(candidate, { throwIfNoEntry: false })?.isFile()
    ? candidate
    : null;
}

const anchorsByFile = new Map();
function getAnchors(file) {
  if (!anchorsByFile.has(file)) {
    const matches = fs
      .readFileSync(file, "utf8")
      .matchAll(/\s(?:id|name)\s*=\s*["']([^"']+)["']/g);
    anchorsByFile.set(file, new Set([...matches].map((match) => match[1])));
  }
  return anchorsByFile.get(file);
}

function getLinkError(link, page) {
  let url;
  try {
    url = new URL(link, `${ORIGIN}/${page}`);
  } catch {
    return "invalid URL";
  }

  if (url.origin !== ORIGIN || isServedByVercel(url.pathname)) {
    return null;
  }

  const target = resolveFile(url.pathname);
  if (!target) {
    return "target not found";
  }

  const anchor = decodeURIComponent(url.hash.slice(1));
  if (anchor && target.endsWith(".html") && !getAnchors(target).has(anchor)) {
    return "anchor not found";
  }

  return null;
}

it("has pages to check", () => {
  assert.ok(
    htmlFiles.length > 0,
    `No HTML files in ${SITE_DIR}, run the build first`,
  );
});

it("has no broken internal links", () => {
  const broken = htmlFiles.flatMap((page) => {
    const links = getLinks(fs.readFileSync(path.join(SITE_DIR, page), "utf8"));
    return links.flatMap((link) => {
      const error = getLinkError(link, page);
      return error ? [`${page}: ${link} (${error})`] : [];
    });
  });

  assert.deepEqual(broken, []);
});
