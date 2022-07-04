const debug = require('debug')('contributions:gather');
const fs = require('fs').promises;

const communityPortal = require('./lib/community-portal');
const discourse = require('./lib/discourse');
const github = require('./lib/github');
const wiki = require('./lib/wiki');

const CONTRIBUTION_FILE = `${__dirname}/_data/contributions.json`;

async function fetchAll() {
  debug('fetching...');
  const existingContributions = JSON.parse(await fs.readFile(CONTRIBUTION_FILE, 'utf-8'));

  const githubResult = await github.gather(existingContributions);
  const wikiResult = await wiki.gather();
  const communityPortalResult = await communityPortal.gather();
  const discourseResult = await discourse.gather();

  // Some types are fetched on every update run, therefore we want to filter them out for now.
  // Otherwise we might end up with duplicate entries we'd need to filter.
  // We need to make sure we always will save the "reps" source entries, as we do not fetch those
  // anymore.
  const ALWAYS_FULL_FETCH_SOURCE_ENTRIES = [
    communityPortal.EVENTS_CATEGORY,
    communityPortal.CAMPAIGNS_CATEGORY,
    discourse.POSTS_CATEGORY,
    discourse.TOPICS_CATEGORY,
    wiki.WIKI_CATEGORY,
  ];
  const existingContributionsToSave = existingContributions.filter((activity) => {
    return !ALWAYS_FULL_FETCH_SOURCE_ENTRIES.includes(activity.source);
  });
  debug('ALREADY_EXISTING_CONTRIBUTIONS', existingContributionsToSave.length);

  debug('NEW_GITHUB_CONTRIBUTIONS', githubResult);
  debug('COMMUNITY_PORTAL_CONTRIBUTIONS', communityPortalResult.length);
  debug('DISCOURSE_CONTRIBUTIONS', discourseResult.length);
  debug('WIKI_CONTRIBUTIONS', wikiResult.length);

  const uniqueContributions = Array.from(new Set([
    ...existingContributionsToSave,
    ...discourseResult, // always a new fetch (previous entries removed above)
    ...wikiResult, // always a new fetch (previous entries removed above)
    ...communityPortalResult, // always a new fetch (previous entries removed above)
    ...githubResult,
  ]));

  if (uniqueContributions.length === existingContributions.length) {
    debug('NO_UPDATE_ABORTING');
    return;
  }

  uniqueContributions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  await fs.writeFile(CONTRIBUTION_FILE, `${JSON.stringify(uniqueContributions, null, 2)}\n`);
  debug('FILE_WRITTEN');
}

fetchAll();
