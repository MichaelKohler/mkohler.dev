const INTERNAL_SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';
const PAYMENT_POINTER = "https://ilp.gatehub.net/941671735/EUR";

const DEFAULT_ACCEPT_HEADER = "application/json";
// In order of preference
const SPSP_MEDIA_TYPES = [
  'application/spsp4+json',
  'application/spsp+json',
];

// Picks the preferred SPSP media type out of an Accept header such as
// "application/spsp4+json, application/spsp+json;q=0.9", if any.
function getSPSPMediaType(acceptHeaderValue = "") {
  const accepted = acceptHeaderValue
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase());

  return SPSP_MEDIA_TYPES.find((type) => accepted.includes(type));
}

export default async function handler(request, response) {
  const spspMediaType = getSPSPMediaType(request.headers["accept"]);
  const mediaType = spspMediaType || DEFAULT_ACCEPT_HEADER;

  try {
    const res = await fetch(PAYMENT_POINTER, {
      headers: {
        Accept: mediaType,
      },
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
