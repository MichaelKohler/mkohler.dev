const debug = require('debug')('contributions:github-fetcher');
const { Octokit } = require('@octokit/rest');

const RESULTS_PER_PAGE = 100;
const { GITHUB_TOKEN } = process.env;

if (!GITHUB_TOKEN) {
  throw new Error('NO_GITHUB_TOKEN_PROVIDED');
}

debug('Initializing Octokit');
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

module.exports = {
  RESULTS_PER_PAGE,
  searchCommits,
  searchIssues,
};

async function searchCommits(options) {
  const octokitOptions = {
    ...options,
    per_page: RESULTS_PER_PAGE, // eslint-disable-line camelcase
  };
  const response = await octokit.search.commits(octokitOptions);
  return response.data.items;
}

async function searchIssues(options) {
  const octokitOptions = {
    ...options,
    per_page: RESULTS_PER_PAGE, // eslint-disable-line camelcase
  };
  const response = await octokit.search.issuesAndPullRequests(octokitOptions);
  return response.data.items;
}
