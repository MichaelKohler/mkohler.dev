export default async function handler(request, response) {
  const res = await fetch("https://ilp.gatehub.net/941671735/EUR");

  if (!res.ok) {
    return response.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }

  try {
    const data = await res.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
}
