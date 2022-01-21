const test = require('ava');

test.serial('should throw without token', async (t) => {
  // eslint-disable-next-line global-require
  await t.throws(() => require('./github-fetcher'));
});
