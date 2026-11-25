// The parts of Vercel's request and response this handler uses
interface WebfingerRequest {
  query: Record<string, string | string[] | undefined>;
}
interface WebfingerResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): WebfingerResponse;
  json(body: unknown): WebfingerResponse;
  send(body?: string): WebfingerResponse;
}

export default function handler(
  request: WebfingerRequest,
  response: WebfingerResponse,
) {
  const resource = request.query.resource;

  if (!resource) {
    response.status(400).json({ error: "MISSING_RESOURCE_QUERY_PARAM" });
    return;
  }

  // Mastodon
  if (resource === "acct:mkohler@mkohler.dev") {
    const mastodonResponse = {
      subject: `acct:mkohler@chaos.social`,
      aliases: [
        `https://chaos.social/@mkohler`,
        `https://chaos.social/users/mkohler`,
      ],
      links: [
        {
          rel: "http://webfinger.net/rel/profile-page",
          type: "text/html",
          href: `https://chaos.social/@mkohler`,
        },
        {
          rel: "self",
          type: "application/activity+json",
          href: `https://chaos.social/users/mkohler`,
        },
        {
          rel: "http://ostatus.org/schema/1.0/subscribe",
          template: "https://chaos.social/authorize_interaction?uri={uri}",
        },
      ],
    };

    response.setHeader("Content-Type", "application/jrd+json");
    response.status(200).send(JSON.stringify(mastodonResponse));
    return;
  }

  response.status(404).send();
}
