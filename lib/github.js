const debug = require('debug')('contributions:github');
const fetcher = require('./github-fetcher');

const ONE_YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;
const DELAY_FETCHING_MS = 2000;
const GITHUB_USERNAME = 'MichaelKohler';
const GITHUB_FILTER = 'mozilla|common-voice|reps|remo|sc-scripts|webmaker|firefox|activate|surprisera|fxos|foxfooding|arewetenyet|asknot|community_dashboard_participation|appday';
const STOP_DATE = '2008-01-01';
const GITHUB_CATEGORY = 'github';
const GITHUB_ISSUES_CATEGORY = 'github-issues';
const GITHUB_REVIEW_CATEGORY = 'github-reviews';

module.exports = {
  gather,
};

async function gather(existingContributions = []) {
  const latestCommit = existingContributions.find((contribution) => {
    return contribution.source === GITHUB_CATEGORY;
  }) || { createdAt: STOP_DATE };
  const latestIssue = existingContributions.find((contribution) => {
    return contribution.source === GITHUB_ISSUES_CATEGORY;
  }) || { createdAt: STOP_DATE };
  const latestReview = existingContributions.find((contribution) => {
    return contribution.source === GITHUB_REVIEW_CATEGORY;
  }) || { createdAt: STOP_DATE };

  const commits = await processCommits(latestCommit.createdAt);
  const issues = await processIssues(latestIssue.createdAt);
  const reviews = await processReviews(latestReview.createdAt);
  const contributions = [
    ...commits,
    ...issues,
    ...reviews,
  ];

  debug('Finished gathering contributions');
  return contributions;
}

async function processIssues(latestCreationDate) {
  debug('Getting issues from Github');
  const allIssues = [];

  const lowerBoundDate = new Date(latestCreationDate);
  const period = periodGenerator(lowerBoundDate);
  for await (const periodChunk of period) {
    const page = pageGenerator(periodChunk, getIssuePage);
    for await (const issues of page) {
      debug(`Got ${issues.length} issues`);
      allIssues.push(issues);
    }
  }

  return allIssues.flat().filter((issue) => {
    return new Date(issue.createdAt) > new Date(latestCreationDate);
  });
}

async function processCommits(latestCreationDate) {
  debug('Getting commits from Github');
  const allCommits = [];

  const lowerBoundDate = new Date(latestCreationDate);
  const period = periodGenerator(lowerBoundDate);
  for await (const periodChunk of period) {
    const page = pageGenerator(periodChunk, getCommitPage);
    for await (const commits of page) {
      debug(`Got ${commits.length} commits`);
      allCommits.push(commits);
    }
  }

  return allCommits.flat().filter((commit) => {
    return new Date(commit.createdAt) > new Date(latestCreationDate);
  });
}

async function processReviews(latestCreationDate) {
  debug('Getting reviews from Github');
  const allPRs = [];

  // We can only search for PRs and then get the reviews from there. As we
  // can't sort by review date, we need to fetch a certain number of PRs.
  // There is a possibility that a PR was created before `latestCreationDate`
  // but has not been reviewed yet. Once it gets reviewed it might be already
  // to old to show up here. Therefore we fetch the reviewed PRs for one year
  // and then later on filter out already-committed reviews.
  const lowerBoundDate = new Date(latestCreationDate) - ONE_YEAR_IN_MS;
  const period = periodGenerator(lowerBoundDate);
  for await (const periodChunk of period) {
    const page = pageGenerator(periodChunk, getPRPage, { skipProcessing: true });
    for await (const prs of page) {
      debug(`Got ${prs.length} PRs`);
      allPRs.push(prs);
    }
  }

  // Now that we have all the PRs, we need to fetch the reviews
  const allReviews = [];

  const prReviewsList = getPRReviews(allPRs.flat());
  for await (const prReviews of prReviewsList) {
    allReviews.push(prReviews);
  }

  const processedReviews = processEntities(allReviews.flat());

  return processedReviews.filter((review) => {
    return new Date(review.createdAt) > new Date(latestCreationDate);
  });
}

function getNextPeriod(period, lowerBoundDate) {
  const [before, after] = period;

  // First of the previous month
  const afterDate = new Date(after);
  afterDate.setMonth(afterDate.getMonth() - 1);
  const newAfterDay = '01';
  const newAfterMonth = getPadded(afterDate.getMonth() + 1);
  const newAfterYear = afterDate.getFullYear();
  const newAfterDate = `${newAfterYear}-${newAfterMonth}-${newAfterDay}`;

  // Last of the previous month
  const beforeDate = new Date(before);
  beforeDate.setDate(0);
  const newBeforeDay = beforeDate.getDate();
  const newBeforeMonth = getPadded(beforeDate.getMonth() + 1);
  const newBeforeYear = beforeDate.getFullYear();
  const newBeforeDate = `${newBeforeYear}-${newBeforeMonth}-${newBeforeDay}`;

  if (beforeDate < STOP_DATE || beforeDate < lowerBoundDate) {
    return [];
  }

  return [newBeforeDate, newAfterDate];
}

function getPadded(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
}

async function* periodGenerator(lowerBoundDate) {
  const date = new Date();
  const firstOfThisMonth = `${date.getFullYear()}-${getPadded(date.getMonth() + 1)}-01`;
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  const lastOfThisMonth = `${date.getFullYear()}-${getPadded(date.getMonth() + 1)}-${date.getDate()}`;
  let currentPeriod = [lastOfThisMonth, firstOfThisMonth];
  while (true) {
    yield currentPeriod;
    currentPeriod = getNextPeriod(currentPeriod, lowerBoundDate);
    if (!currentPeriod.length) {
      debug('We reached the stop date, we are done!');
      return;
    }
  }
}

async function* pageGenerator(period, cb, { skipProcessing } = {}) {
  let hasMoreToFetch = true;
  let page = 1;
  while (hasMoreToFetch) {
    debug(`Getting data for period between ${period[1]} and ${period[0]}`);
    const results = await cb(period, page); // eslint-disable-line no-await-in-loop
    debug(`Got ${results.length} results to filter`);
    // If we have less results than the max result, we're at the end
    // Special case: GitHub doesn't let us fetch more than 10 pages, so we just
    // pretend we are done for that period..
    if (results.length < fetcher.RESULTS_PER_PAGE || page === 10) {
      hasMoreToFetch = false;
      yield skipProcessing ? results : processEntities(results);
      return;
    }

    page++;
    yield skipProcessing ? results : processEntities(results);
  }
}

async function getCommitPage(commitsPeriod, page) {
  const [before, after] = commitsPeriod;

  debug(`Getting commits page ${page} between ${after} and ${before}`);
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const items = await fetcher.searchCommits({
          q: `author:${GITHUB_USERNAME}+author-date:${after}..${before}`,
          sort: 'committer-date',
          page,
        });

        return resolve(items);
      } catch (error) {
        debug('Error fetching commits', error);
        return resolve([]);
      }
    }, DELAY_FETCHING_MS);
  });
}

async function getIssuePage(issuesPeriod, page) {
  const [before, after] = issuesPeriod;

  debug(`Getting issues page ${page} between ${after} and ${before}`);
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const items = await fetcher.searchIssues({
          q: `author:${GITHUB_USERNAME}+created:${after}..${before}`,
          sort: 'created',
          page,
        });

        return resolve(items);
      } catch (error) {
        debug('Error fetching issues', error);
        return resolve([]);
      }
    }, DELAY_FETCHING_MS);
  });
}

async function getPRPage(reviewPeriod, page) {
  const [before, after] = reviewPeriod;

  debug(`Getting reviews page ${page} between ${after} and ${before}`);
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const items = await fetcher.searchIssues({
          q: `reviewed-by:${GITHUB_USERNAME}+created:${after}..${before}`,
          sort: 'created',
          page,
        });

        return resolve(items);
      } catch (error) {
        debug('Error fetching PRs', error);
        return resolve([]);
      }
    }, DELAY_FETCHING_MS);
  });
}

async function* getPRReviews(prList) {
  debug('Getting PR reviews');
  for await (const pr of prList) {
    try {
      const [, owner, repo] = /github\.com\/repos\/(.+)\/(.*)/.exec(pr.repository_url);
      // We're waiting for a bit here, as we've previously hit a secondary GitHub rate limit...
      await waitFor(2000);
      debug(`Fetching reviews for ${owner}/${repo} PR ${pr.number}`);
      const items = await fetcher.listReviews({
        owner,
        repo,
        pull_number: pr.number,
      });

      yield items;
    } catch (error) {
      debug('Error fetching reviews', error);
      return [];
    }
  }

  return [];
}

async function waitFor(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function processEntities(entities) {
  return entities.filter(filter).map(format);
}

function filter(entity) {
  const regex = new RegExp(GITHUB_FILTER, 'i');
  const matchesRegex = regex.test(entity.html_url);
  const isFork = entity.repository && entity.repository.fork;
  return matchesRegex && !isFork;
}

function format(entity) {
  if (entity.commit) {
    return formatCommit(entity);
  }

  if (entity.pull_request_url) {
    return formatPRReview(entity);
  }

  return formatIssue(entity);
}

function formatCommit(entity) {
  const createdAt = new Date(entity.commit.author.date);
  let description = '';
  let link = '';

  if (entity.repository.private) {
    description = 'Commit in private repository';
  } else {
    description = `${entity.repository.owner.login}/${entity.repository.name}: ${entity.commit.message}`;
    link = entity.html_url;
  }

  return {
    createdAt,
    description,
    link,
    type: 'GitHub Commit',
    source: GITHUB_CATEGORY,
  };
}

function formatIssue(entity) {
  return {
    createdAt: new Date(entity.created_at),
    description: entity.title,
    link: entity.html_url,
    type: entity.pull_request ? 'Created PR' : 'Created Issue Report',
    source: GITHUB_ISSUES_CATEGORY,
  };
}

function formatPRReview(entity) {
  const label = (() => {
    switch (entity.state) {
      case 'COMMENTED':
        return 'Commented on a Pull Request';
      case 'APPROVED':
        return 'Approved a Pull Request';
      case 'CHANGES_REQUESTED':
        return 'Requested changes on a Pull Request';
      default:
        return 'Reviewed a Pull Request';
    }
  })();

  return {
    createdAt: new Date(entity.submitted_at),
    description: '',
    link: entity.html_url,
    type: label,
    source: GITHUB_REVIEW_CATEGORY,
  };
}
