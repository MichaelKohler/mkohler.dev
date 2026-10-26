# Design exploration

A design study for modernising mkohler.dev. It holds 18 layout proposals, each a set of static HTML pages (CV, Open Source, contributions, blog index, one blog post, talks, 404), generated from the same data the live site uses. All of them keep the existing navy palette and portrait. None of this is production code; the site build copies it to /2026-design-exploration/ as is.

Open `index.html` in a browser for the overview: the idea behind each proposal, a desktop and a mobile screenshot of its home page, and links to all its pages. Everything works straight from disk, no server needed.

## Proposals

- **01–12**: first directions, from Editorial and Swiss Grid to Terminal and Neo-Brutalist.
- **13**: Editorial with Split Screen's (12) mobile photo header.
- **14–16**: built from a 1-vs-1 match-off of 01–13 (results in `matchoff-results.md`).
- **17**: Editorial with the Duotone Poster (09) header and the contribution charts from Bento (03) and Aurora Glass (11).
- **18**: 17 with the Timeline (06) header instead of the poster.

## Layout

- `NN-name/`: one proposal. `template.mjs` renders the pages, `style.css` is handwritten, `screenshots/` holds the overview images. The generated `.html` files are checked in.
- `_tools/`: the build (`build.mjs`), shared content (`content.mjs`), charts, the overview page and the screenshot script.
- `assets/`: photos, the icon font and the favicon copied from the site’s `public/` folder, so the pages work offline.
- `current/`: screenshots of the live site, for reference.

## Rebuilding

From the repo root:

```sh
node public/2026-design-exploration/_tools/build.mjs [NN-name]        # regenerate pages, index.html and assets
node public/2026-design-exploration/_tools/screenshots.mjs [NN-name]  # refresh the screenshots (uses Playwright)
```

Set `CHROMIUM=/path/to/chrome` if Playwright's bundled browser isn't installed.

## Not for search engines

Every page carries `<meta name="robots" content="noindex, nofollow">`.
