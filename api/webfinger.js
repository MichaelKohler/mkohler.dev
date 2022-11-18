const KNOWN_USERS = {
  mastodon: {
    mkohler: 'fosstodon.org',
  },
};

export default function handler(request, response) {
  const resource = request.query.resource;

  if (!resource) {
    response.status(400).json({ error: 'MISSING_RESOURCE_QUERY_PARAM'});
    return;
  }

  // Mastodon
  if (resource.startsWith('acct:')) {
    const fullUser = resource.split(':')[1];

    if (!fullUser || !fullUser.endsWith('@mkohler.dev')) {
      response.status(400).json({ error: 'UNRECOGNIZED_USERNAME'});
      return;
    }

    const username = fullUser.split('@')[0];
    const instance = KNOWN_USERS.mastodon[username];

    if (!username || !instance) {
      response.status(400).json({ error: 'UNRECOGNIZED_USERNAME_BEFORE_@'});
      return;
    }

    const mastodonResponse = {
      subject: `acct:${username}@${instance}`,
      aliases: [`https://${instance}/@${username}`, `https://${instance}/users/${username}`],
      links: [{
        rel: 'http://webfinger.net/rel/profile-page',
        type: 'text/html',
        href: `https://${instance}/@${username}`,
      }, {
        rel: 'self',
        type: 'application/activity+json',
        href: `https://${instance}/users/${username}`,
      }, {
        rel: 'http://ostatus.org/schema/1.0/subscribe',
        template: 'https://${instance}/authorize_interaction?uri={uri}',
      }],
    };

    response.status(200).json(mastodonResponse);
    return;
  }

  response.status(404).send();
}
