const INTERNAL_SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';
const PAYMENT_POINTER = "https://ilp.gatehub.net/941671735/EUR";

const DEFAULT_ACCEPT_HEADER = "application/json";

export default async function handler(request, reply) {
  const acceptHeaderValue = request.headers["accept"];
  const spspHeaders = [
    'application/spsp4+json',
    'application/spsp+json',
  ];
  const isSPSPRequest = spspHeaders.includes(acceptHeaderValue);

  const res = await fetch(PAYMENT_POINTER, {
    headers: {
      Accept: isSPSPRequest ? request.headers["accept"] : DEFAULT_ACCEPT_HEADER,
    },
  });

  if (!res.ok) {
    return reply.code(500).type('application/json').send({ error: INTERNAL_SERVER_ERROR_CODE });
  }

  try {
    const data = await res.json();
    return reply.code(200).type('application/json').send(data);
  } catch (error) {
    return reply.code(500).type('application/json').send({ error: INTERNAL_SERVER_ERROR_CODE });
  }
}
