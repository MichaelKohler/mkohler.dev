import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import handler from '../../api/webfinger.js';
import { createResponse } from './helpers.mjs';

function callHandler(query) {
  const response = createResponse();
  handler({ query }, response);
  return response;
}

describe('webfinger', () => {
  for (const [name, query] of [
    ['missing', {}],
    ['empty', { resource: '' }],
  ]) {
    it(`responds with 400 if the resource is ${name}`, () => {
      const response = callHandler(query);

      assert.equal(response.statusCode, 400);
      assert.deepEqual(response.body, { error: 'MISSING_RESOURCE_QUERY_PARAM' });
    });
  }

  it('responds with the Mastodon account for the known resource', () => {
    const response = callHandler({ resource: 'acct:mkohler@mkohler.dev' });

    assert.equal(response.statusCode, 200);
    assert.equal(response.headers['content-type'], 'application/jrd+json');
    assert.deepEqual(JSON.parse(response.body), {
      subject: 'acct:mkohler@chaos.social',
      aliases: ['https://chaos.social/@mkohler', 'https://chaos.social/users/mkohler'],
      links: [
        {
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
          href: 'https://chaos.social/@mkohler',
        },
        {
          rel: 'self',
          type: 'application/activity+json',
          href: 'https://chaos.social/users/mkohler',
        },
        {
          rel: 'http://ostatus.org/schema/1.0/subscribe',
          template: 'https://chaos.social/authorize_interaction?uri={uri}',
        },
      ],
    });
  });

  for (const [name, resource] of [
    ['another account', 'acct:someone@mkohler.dev'],
    ['another domain', 'acct:mkohler@example.com'],
    ['a resource without the acct scheme', 'mkohler@mkohler.dev'],
    ['a repeated query param', ['acct:mkohler@mkohler.dev', 'acct:someone@mkohler.dev']],
  ]) {
    it(`responds with 404 for ${name}`, () => {
      const response = callHandler({ resource });

      assert.equal(response.statusCode, 404);
      assert.equal(response.body, undefined);
    });
  }
});
