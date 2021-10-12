import test from 'ava';

test.serial('should throw without token', async (t) => {
  await t.throwsAsync(() => import('./github-fetcher'));
});
