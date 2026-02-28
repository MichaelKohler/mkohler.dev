export default function handler(request, response) {
  const resource = request.query.resource;

  if (!resource) {
    response.status(400).json({ error: 'MISSING_RESOURCE_QUERY_PARAM'});
    return;
  }

  // Mastodon
  if (resource === 'acct:mkohler@mkohler.dev') {
    const mastodonResponse = {
      subject: `acct:mkohler@chaos.social`,
      aliases: [`https://chaos.social/@mkohler`, `https://chaos.social/users/mkohler`],
      links: [{
        rel: 'http://webfinger.net/rel/profile-page',
        type: 'text/html',
        href: `https://chaos.social/@mkohler`,
      }, {
        rel: 'self',
        type: 'application/activity+json',
        href: `https://chaos.social/users/mkohler`,
      }, {
        rel: 'http://ostatus.org/schema/1.0/subscribe',
        template: 'https://chaos.social/authorize_interaction?uri={uri}',
      }],
    };

    response.status(200).json(mastodonResponse);
    return;
  }

  response.status(404).send();
}
