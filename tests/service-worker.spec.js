const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const zlib = require("node:zlib");
const { test, expect } = require("@playwright/test");

const SITE_DIR = path.join(__dirname, "../_site");
const MAX_CACHE_ENTRIES = 200;
const NETWORK_TIMEOUT = 5000;
const CONTENT_TYPES = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
};
// Vercel's default, so that the browser's HTTP cache doesn't hide an outage or error.
const CACHE_CONTROL = "public, max-age=0, must-revalidate";

const respondWith =
  (status, body = "", headers = {}) =>
  (_request, response) => {
    response
      .writeHead(status, {
        "Cache-Control": CACHE_CONTROL,
        "Content-Type": "text/html",
        ...headers,
      })
      .end(body);
  };
const hang = () => {};

// Serves the build with its own server, so that tests can control the responses and take
// the site down in all browsers: in Firefox, setOffline doesn't affect the worker's requests.
function startServer(overrides, getWorkerRevision) {
  const server = http.createServer((request, response) => {
    const { pathname } = new URL(request.url, "http://localhost");
    if (overrides.has(pathname)) {
      overrides.get(pathname)(request, response);
      return;
    }

    const file = path.join(
      SITE_DIR,
      pathname.endsWith("/") ? `${pathname}index.html` : pathname,
    );
    fs.readFile(file, (error, content) => {
      if (error) {
        respondWith(404)(request, response);
        return;
      }

      const body =
        pathname === "/sw.js"
          ? `${content}\n// Revision ${getWorkerRevision()}`
          : content;
      respondWith(200, body, {
        "Content-Type":
          CONTENT_TYPES[path.extname(file)] || "application/octet-stream",
      })(request, response);
    });
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function stopServer(server) {
  return new Promise((resolve) => {
    server.close(resolve);
    server.closeAllConnections();
  });
}

const isCached = (page, pathname) =>
  page.evaluate(async (key) => !!(await caches.match(key)), pathname);

const waitUntilCached = (page, pathname) =>
  expect.poll(() => isCached(page, pathname)).toBe(true);

const request = (page, pathname, init) =>
  page.evaluate(
    async ([url, options]) => {
      const response = await fetch(url, options);
      return { status: response.status, text: await response.text() };
    },
    [pathname, init],
  );

test.describe("Service Worker", () => {
  let server;
  let baseUrl;
  let overrides;
  let workerRevision;

  const url = (pathname) => `${baseUrl}${pathname}`;

  test.skip(
    ({ viewport }) => viewport.width < 500,
    "The viewport makes no difference here",
  );

  test.beforeEach(async ({ page }) => {
    overrides = new Map();
    workerRevision = 1;
    server = await startServer(overrides, () => workerRevision);
    baseUrl = `http://127.0.0.1:${server.address().port}`;

    await page.goto(url("/"));
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => navigator.serviceWorker.controller);
    await waitUntilCached(page, "/offline/");
  });

  test.afterEach(async () => {
    if (server) {
      await stopServer(server);
    }
  });

  test.describe("Updating", () => {
    test("Purges old caches and disables navigation preload", async ({
      page,
    }) => {
      await page.evaluate(async () => {
        await caches.open("cache::old");
        const registration = await navigator.serviceWorker.ready;
        await registration.navigationPreload?.enable();
      });

      workerRevision++;
      await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.ready;
        await registration.update();
      });

      await expect
        .poll(() =>
          page.evaluate(async () => {
            const registration = await navigator.serviceWorker.ready;
            const preload = await registration.navigationPreload?.getState();
            return {
              hasOldCache: await caches.has("cache::old"),
              preload: !!preload?.enabled,
            };
          }),
        )
        .toEqual({ hasOldCache: false, preload: false });
      expect(await isCached(page, "/offline/")).toBe(true);
    });
  });

  test.describe("Caching", () => {
    test("Caches successful responses, ignoring query params", async ({
      page,
    }) => {
      await page.goto(url("/talks/?utm_source=test"));

      await waitUntilCached(page, "/talks/");
      expect(
        await page.evaluate(async () => {
          const name = (await caches.keys())[0];
          const keys = await (await caches.open(name)).keys();
          return keys.some((key) => key.url.includes("utm_source"));
        }),
      ).toBe(false);
    });

    test("Does not cache what it should not", async ({ page }) => {
      const excluded = {
        "/api/pay": respondWith(200),
        "/.well-known/pay": respondWith(200),
        "/_vercel/insights/script.js": respondWith(200, "", {
          "Content-Type": "text/javascript",
        }),
        "/presentations/deck/": respondWith(200),
        "/webmonetization/wm.html": respondWith(200),
        "/not-found/": respondWith(404),
        "/partial/": respondWith(206),
        "/server-error/": respondWith(503),
      };
      for (const [pathname, handler] of Object.entries(excluded)) {
        overrides.set(pathname, handler);
      }
      overrides.set("/post/", respondWith(200));
      overrides.set("/last/", respondWith(200));

      for (const pathname of Object.keys(excluded)) {
        await request(page, pathname);
      }
      await request(page, "/post/", { method: "POST" });

      // Requests are handled in order, so these had their chance once this one is cached.
      await request(page, "/last/");
      await waitUntilCached(page, "/last/");

      for (const pathname of [...Object.keys(excluded), "/post/"]) {
        expect(await isCached(page, pathname), pathname).toBe(false);
      }
    });

    test("Removes the oldest entries once over the limit, keeping the offline page", async ({
      page,
    }) => {
      await page.evaluate(async (count) => {
        const cache = await caches.open((await caches.keys())[0]);
        for (let i = 0; i < count; i++) {
          await cache.put(`/entry-${i}`, new Response("entry"));
        }
      }, MAX_CACHE_ENTRIES + 10);

      await page.goto(url("/talks/"));

      await expect
        .poll(() =>
          page.evaluate(async () => {
            const cache = await caches.open((await caches.keys())[0]);
            return (await cache.keys()).length;
          }),
        )
        .toBe(MAX_CACHE_ENTRIES);
      expect(await isCached(page, "/offline/")).toBe(true);
      expect(await isCached(page, "/talks/")).toBe(true);
      expect(await isCached(page, "/entry-0")).toBe(false);
    });
  });

  test.describe("Responding while the site is up", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url("/talks/"));
      await waitUntilCached(page, "/talks/");
    });

    test("Prefers the network over a cached copy", async ({ page }) => {
      overrides.set(
        "/talks/",
        respondWith(200, '<body><h1 class="title">Fresh</h1></body>'),
      );

      await page.goto(url("/talks/"));

      await expect(page.locator("h1.title")).toHaveText("Fresh");
      await expect(page.locator(".saved-copy-notice")).toHaveCount(0);
    });

    test("Passes on client errors", async ({ page }) => {
      overrides.set(
        "/talks/",
        respondWith(404, '<h1 class="title">Not found</h1>'),
      );

      const response = await page.goto(url("/talks/"));

      expect(response.status()).toBe(404);
      await expect(page.locator("h1.title")).toHaveText("Not found");
      await expect(page.locator(".saved-copy-notice")).toHaveCount(0);
    });
  });

  test.describe("Responding to server errors", () => {
    test("Shows a saved copy of a visited page", async ({ page }) => {
      await page.goto(url("/talks/"));
      await waitUntilCached(page, "/talks/");
      overrides.set("/talks/", respondWith(503));

      const response = await page.goto(url("/talks/"));

      expect(response.status()).toBe(200);
      await expect(page.locator(".saved-copy-notice")).toBeVisible();
      await expect(page.locator("h1.title")).toHaveText("On stage");
    });

    test("Responds with the cached copy without a notice to other requests", async ({
      page,
    }) => {
      await page.goto(url("/talks/"));
      await waitUntilCached(page, "/talks/");
      overrides.set("/talks/", respondWith(503));

      const { status, text } = await request(page, "/talks/");

      expect(status).toBe(200);
      expect(text).toContain('<h1 class="title">On stage</h1>');
      expect(text).not.toContain('<p class="saved-copy-notice"');
    });

    test("Passes on the error without a cached copy", async ({ page }) => {
      overrides.set(
        "/contributions/",
        respondWith(503, '<h1 class="title">Server error</h1>'),
      );

      const response = await page.goto(url("/contributions/"));

      expect(response.status()).toBe(503);
      await expect(page.locator("h1.title")).toHaveText("Server error");
    });
  });

  test.describe("Responding when the site is down", () => {
    test("Shows a saved copy of a visited page", async ({ page }) => {
      await page.goto(url("/talks/"));
      await waitUntilCached(page, "/talks/");

      await stopServer(server);
      await page.goto(url("/talks/"));

      await expect(page.locator(".saved-copy-notice")).toBeVisible();
      await expect(page.locator("h1.title")).toHaveText("On stage");
    });

    test("Shows the offline page for an unvisited page", async ({ page }) => {
      await stopServer(server);
      await page.goto(url("/contributions/"));

      await expect(page.locator("h1.title")).toHaveText("Offline");
      await expect(page.locator(".saved-copy-notice")).toHaveCount(0);
    });

    test("Does not show the notice on the offline page itself", async ({
      page,
    }) => {
      await stopServer(server);
      await page.goto(url("/offline/"));

      await expect(page.locator("h1.title")).toHaveText("Offline");
      await expect(page.locator(".saved-copy-notice")).toHaveCount(0);
    });

    test("Fails other requests without a cached copy instead of answering with HTML", async ({
      page,
    }) => {
      await stopServer(server);

      const failed = await page.evaluate(() =>
        fetch("/not-cached.js").then(
          () => false,
          () => true,
        ),
      );

      expect(failed).toBe(true);
    });

    test("Shows a saved copy of a compressed page, without the headers of the original", async ({
      page,
    }) => {
      const body = fs.readFileSync(path.join(SITE_DIR, "talks/index.html"));
      overrides.set(
        "/talks/",
        respondWith(200, zlib.gzipSync(body), {
          "Content-Encoding": "gzip",
          ETag: '"talks"',
          "X-Frame-Options": "DENY",
        }),
      );
      await page.goto(url("/talks/"));
      await waitUntilCached(page, "/talks/");

      await stopServer(server);
      const response = await page.goto(url("/talks/"));

      await expect(page.locator(".saved-copy-notice")).toBeVisible();
      await expect(page.locator("h1.title")).toHaveText("On stage");
      const headers = response.headers();
      expect(headers["content-encoding"]).toBeUndefined();
      expect(headers.etag).toBeUndefined();
      expect(headers["x-frame-options"]).toBe("DENY");
    });

    test("Does not add the notice to anything but HTML", async ({ page }) => {
      overrides.set(
        "/feed.xml",
        respondWith(200, "<feed><body/></feed>", {
          "Content-Type": "application/xml",
        }),
      );
      await request(page, "/feed.xml");
      await waitUntilCached(page, "/feed.xml");

      await stopServer(server);
      const response = await page.goto(url("/feed.xml"));

      expect(await response.text()).toBe("<feed><body/></feed>");
    });
  });

  test.describe("Responding when the site is slow", () => {
    test("Shows a saved copy after the network timeout", async ({ page }) => {
      await page.goto(url("/talks/"));
      await waitUntilCached(page, "/talks/");
      overrides.set("/talks/", hang);

      await page.goto(url("/talks/"));

      await expect(page.locator(".saved-copy-notice")).toBeVisible();
      await expect(page.locator("h1.title")).toHaveText("On stage");
    });

    test("Keeps waiting for the network without a cached copy", async ({
      page,
    }) => {
      overrides.set("/contributions/", (req, res) => {
        setTimeout(
          respondWith(200, '<h1 class="title">Late</h1>'),
          NETWORK_TIMEOUT + 1000,
          req,
          res,
        );
      });

      await page.goto(url("/contributions/"));

      await expect(page.locator("h1.title")).toHaveText("Late");
    });

    test("Gives up with the offline page without a cached copy", async ({
      page,
    }) => {
      test.slow();
      overrides.set("/contributions/", hang);

      await page.goto(url("/contributions/"));

      await expect(page.locator("h1.title")).toHaveText("Offline");
    });
  });
});
