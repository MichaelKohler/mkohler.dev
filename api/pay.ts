// The parts of Vercel's request and response this handler uses
interface PayRequest {
  method?: string;
  // Node joins repeated Accept headers into one string
  headers: { accept?: string };
}
interface PayResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): PayResponse;
  json(body: unknown): PayResponse;
  send(body: string): PayResponse;
  end(): PayResponse;
}

const INTERNAL_SERVER_ERROR_CODE = "INTERNAL_SERVER_ERROR";
const BAD_GATEWAY_CODE = "BAD_GATEWAY";
const METHOD_NOT_ALLOWED_CODE = "METHOD_NOT_ALLOWED";
const ALLOWED_METHODS = "GET, HEAD, OPTIONS";
const PAYMENT_POINTER = "https://ilp.gatehub.net/941671735/EUR";
const UPSTREAM_TIMEOUT_MS = 5000;

const DEFAULT_ACCEPT_HEADER = "application/json";
// In order of preference
const SPSP_MEDIA_TYPES = ["application/spsp4+json", "application/spsp+json"];

// Picks the preferred SPSP media type out of an Accept header such as
// "application/spsp4+json, application/spsp+json;q=0.9", if any.
// The highest q-value wins, ties go to our order of preference. Types with q=0
// are explicitly refused by the client and thus skipped. A missing or malformed
// q-value counts as 1.
function getSPSPMediaType(acceptHeaderValue = ""): string | undefined {
  const qValues = new Map<string | undefined, number>(
    acceptHeaderValue.split(",").map((part) => {
      const [type, ...params] = part
        .split(";")
        .map((token) => token.trim().toLowerCase());
      const qParam = params
        .map((param) => param.match(/^q=(\d(?:\.\d*)?)$/))
        .find(Boolean);
      return [type, qParam ? Number(qParam[1]) : 1];
    }),
  );

  const qValue = (type: string) => qValues.get(type) ?? 0;
  return SPSP_MEDIA_TYPES.filter((type) => qValue(type) > 0).sort(
    (a, b) => qValue(b) - qValue(a),
  )[0];
}

export default async function handler(
  request: PayRequest,
  response: PayResponse,
) {
  // SPSP responses contain per-request credentials
  response.setHeader("Cache-Control", "no-store");

  if (request.method === "OPTIONS") {
    response.setHeader("Allow", ALLOWED_METHODS);
    response.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS);
    response.setHeader("Access-Control-Allow-Headers", "*");
    return response.status(204).end();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", ALLOWED_METHODS);
    return response.status(405).json({ error: METHOD_NOT_ALLOWED_CODE });
  }

  const spspMediaType = getSPSPMediaType(request.headers.accept);
  const mediaType = spspMediaType || DEFAULT_ACCEPT_HEADER;

  response.setHeader("Vary", "Accept");

  try {
    const res = await fetch(PAYMENT_POINTER, {
      headers: {
        Accept: mediaType,
      },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(
        `Failed to resolve payment pointer, upstream returned ${res.status}`,
      );
      return response.status(502).json({ error: BAD_GATEWAY_CODE });
    }

    const data = await res.json();
    response.setHeader(
      "Content-Type",
      res.headers.get("content-type") || mediaType,
    );
    return response.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error("Failed to resolve payment pointer", error);
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR_CODE });
  }
}
