export default function handler(request, reply) {
  const resource = request.query.resource;

  if (!resource) {
    reply.code(400).type('application/json').send({ error: 'MISSING_RESOURCE_QUERY_PARAM'});
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

    reply.code(200).type('application/json').send(mastodonResponse);
    return;
  }

  reply.code(404).send();
}
