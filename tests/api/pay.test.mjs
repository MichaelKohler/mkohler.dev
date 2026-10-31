import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import handler from "../../api/pay.js";
import { createResponse } from "./helpers.mjs";

const PAYMENT_POINTER = "https://ilp.gatehub.net/941671735/EUR";
const ALLOWED_METHODS = "GET, HEAD, OPTIONS";

let fetchMock;
let consoleErrorMock;

function mockUpstream(
  body = '{"id":"wallet"}',
  init = { headers: { "content-type": "application/json" } },
) {
  fetchMock.mock.mockImplementation(async () => new Response(body, init));
}

async function callHandler({ method = "GET", accept } = {}) {
  const response = createResponse();
  await handler(
    { method, headers: accept === undefined ? {} : { accept } },
    response,
  );
  return response;
}

const upstreamAccept = () =>
  fetchMock.mock.calls[0].arguments[1].headers.Accept;

beforeEach(() => {
  fetchMock = mock.method(globalThis, "fetch", async () => {
    throw new Error("Unexpected upstream request");
  });
  consoleErrorMock = mock.method(console, "error", () => {});
  mockUpstream();
});

afterEach(() => {
  mock.restoreAll();
});

describe("pay: HTTP methods", () => {
  it("answers a preflight without calling upstream", async () => {
    const response = await callHandler({ method: "OPTIONS" });

    assert.equal(response.statusCode, 204);
    assert.equal(response.body, undefined);
    assert.equal(response.headers.allow, ALLOWED_METHODS);
    assert.equal(
      response.headers["access-control-allow-methods"],
      ALLOWED_METHODS,
    );
    assert.equal(response.headers["access-control-allow-headers"], "*");
    assert.equal(fetchMock.mock.callCount(), 0);
  });

  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    it(`rejects ${method} without calling upstream`, async () => {
      const response = await callHandler({ method });

      assert.equal(response.statusCode, 405);
      assert.deepEqual(response.body, { error: "METHOD_NOT_ALLOWED" });
      assert.equal(response.headers.allow, ALLOWED_METHODS);
      assert.equal(fetchMock.mock.callCount(), 0);
    });
  }

  for (const method of ["GET", "HEAD"]) {
    it(`resolves the payment pointer for ${method}`, async () => {
      const response = await callHandler({ method });

      assert.equal(response.statusCode, 200);
      assert.equal(response.body, '{"id":"wallet"}');
      assert.equal(fetchMock.mock.callCount(), 1);
      assert.equal(fetchMock.mock.calls[0].arguments[0], PAYMENT_POINTER);
    });
  }
});

describe("pay: Accept header", () => {
  const cases = [
    ["no header", undefined, "application/json"],
    ["an empty header", "", "application/json"],
    ["an unrelated type", "text/html", "application/json"],
    ["a wildcard", "*/*", "application/json"],
    [
      "application/spsp4+json",
      "application/spsp4+json",
      "application/spsp4+json",
    ],
    ["application/spsp+json", "application/spsp+json", "application/spsp+json"],
    [
      "a type in another case",
      "Application/SPSP4+JSON",
      "application/spsp4+json",
    ],
    [
      "whitespace around the type",
      " application/spsp+json ; q=0.5 ",
      "application/spsp+json",
    ],
    [
      "a mix with an unrelated type",
      "text/html, application/spsp+json",
      "application/spsp+json",
    ],
    [
      "a tie, using our preference",
      "application/spsp+json, application/spsp4+json",
      "application/spsp4+json",
    ],
    [
      "a higher q-value for the less preferred type",
      "application/spsp4+json;q=0.5, application/spsp+json;q=0.9",
      "application/spsp+json",
    ],
    [
      "a refused preferred type",
      "application/spsp4+json;q=0, application/spsp+json",
      "application/spsp+json",
    ],
    [
      "only refused types",
      "application/spsp4+json;q=0, application/spsp+json;q=0.0",
      "application/json",
    ],
    [
      "a malformed q-value, counting as 1",
      "application/spsp+json;q=0.9, application/spsp4+json;q=abc",
      "application/spsp4+json",
    ],
    [
      "other parameters than q",
      "application/spsp+json;charset=utf-8",
      "application/spsp+json",
    ],
  ];

  for (const [name, accept, expected] of cases) {
    it(`requests ${expected} for ${name}`, async () => {
      await callHandler({ accept });

      assert.equal(upstreamAccept(), expected);
    });
  }
});

describe("pay: response headers", () => {
  it("forwards the content type of the upstream response", async () => {
    mockUpstream("{}", {
      headers: { "content-type": "application/json; charset=utf-8" },
    });

    const response = await callHandler({ accept: "application/spsp4+json" });

    assert.equal(upstreamAccept(), "application/spsp4+json");
    assert.equal(
      response.headers["content-type"],
      "application/json; charset=utf-8",
    );
  });

  it("falls back to the requested type if upstream sends no content type", async () => {
    fetchMock.mock.mockImplementation(async () => {
      const upstream = new Response("{}");
      upstream.headers.delete("content-type");
      return upstream;
    });

    const response = await callHandler({ accept: "application/spsp4+json" });

    assert.equal(response.headers["content-type"], "application/spsp4+json");
  });

  it("varies on Accept", async () => {
    const response = await callHandler();

    assert.equal(response.headers.vary, "Accept");
  });

  const noStoreCases = [
    ["a success", "GET", () => {}],
    ["a preflight", "OPTIONS", () => {}],
    ["a rejected method", "POST", () => {}],
    ["an upstream error", "GET", () => mockUpstream("", { status: 503 })],
    [
      "a network error",
      "GET",
      () =>
        fetchMock.mock.mockImplementation(async () => {
          throw new Error("Network down");
        }),
    ],
  ];

  for (const [name, method, setup] of noStoreCases) {
    it(`does not allow caching ${name}`, async () => {
      setup();

      const response = await callHandler({ method });

      assert.equal(response.headers["cache-control"], "no-store");
    });
  }
});

describe("pay: upstream failures", () => {
  it("sets a timeout on the upstream request", async () => {
    await callHandler();

    assert.ok(
      fetchMock.mock.calls[0].arguments[1].signal instanceof AbortSignal,
    );
  });

  for (const status of [404, 406, 503]) {
    it(`responds with 502 and logs the status for an upstream ${status}`, async () => {
      mockUpstream("", { status });

      const response = await callHandler();

      assert.equal(response.statusCode, 502);
      assert.deepEqual(response.body, { error: "BAD_GATEWAY" });
      assert.equal(consoleErrorMock.mock.callCount(), 1);
      assert.match(
        consoleErrorMock.mock.calls[0].arguments[0],
        new RegExp(status),
      );
    });
  }

  it("responds with 500 and logs if the request fails", async () => {
    const error = new Error("Network down");
    fetchMock.mock.mockImplementation(async () => {
      throw error;
    });

    const response = await callHandler();

    assert.equal(response.statusCode, 500);
    assert.deepEqual(response.body, { error: "INTERNAL_SERVER_ERROR" });
    assert.equal(consoleErrorMock.mock.calls[0].arguments[1], error);
  });

  it("responds with 500 and logs if upstream does not return JSON", async () => {
    mockUpstream("<html></html>", { headers: { "content-type": "text/html" } });

    const response = await callHandler();

    assert.equal(response.statusCode, 500);
    assert.deepEqual(response.body, { error: "INTERNAL_SERVER_ERROR" });
    assert.equal(consoleErrorMock.mock.callCount(), 1);
  });
});
