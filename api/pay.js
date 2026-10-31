const INTERNAL_SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';
const PAYMENT_POINTER = "https://ilp.gatehub.net/941671735/EUR";
const UPSTREAM_TIMEOUT_MS = 5000;

const DEFAULT_ACCEPT_HEADER = "application/json";
// In order of preference
const SPSP_MEDIA_TYPES = [
  'application/spsp4+json',
  'application/spsp+json',
];

// Picks the preferred SPSP media type out of an Accept header such as
// "application/spsp4+json, application/spsp+json;q=0.9", if any.
// The highest q-value wins, ties go to our order of preference. Types with q=0
// are explicitly refused by the client and thus skipped. A missing or malformed
// q-value counts as 1.
function getSPSPMediaType(acceptHeaderValue = "") {
  const qValues = new Map(
    acceptHeaderValue.split(',').map((part) => {
      const [type, ...params] = part.split(';').map((token) => token.trim().toLowerCase());
      const qParam = params.map((param) => param.match(/^q=(\d(?:\.\d*)?)$/)).find(Boolean);
      return [type, qParam ? Number(qParam[1]) : 1];
    })
  );

  return SPSP_MEDIA_TYPES
    .filter((type) => qValues.get(type) > 0)
    .sort((a, b) => qValues.get(b) - qValues.get(a))[0];
}

export default async function handler(request, response) {
  const spspMediaType = getSPSPMediaType(request.headers["accept"]);
  const mediaType = spspMediaType || DEFAULT_ACCEPT_HEADER;

  response.setHeader('Vary', 'Accept');

  try {
    const res = await fetch(PAYMENT_POINTER, {
      headers: {
        Accept: mediaType,
      },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!res.ok) {
      return response.status(500).json({ error: INTERNAL_SERVER_ERROR_CODE });
    }

    const data = await res.json();
    response.setHeader('Content-Type', mediaType);
    return response.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error('Failed to resolve payment pointer', error);
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR_CODE });
  }
}
