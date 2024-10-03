const INTERNAL_SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';
const PAYMENT_POINTER = "https://ilp.gatehub.net/941671735/EUR";

export default async function handler(request, response) {
  const acceptHeaderValue = request.headers["accept"];

  const res = await fetch(PAYMENT_POINTER, {
    headers: {
      Accept: acceptHeaderValue,
    },
  });

  if (!res.ok) {
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR_CODE });
  }

  try {
    const data = await res.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR_CODE });
  }
}
