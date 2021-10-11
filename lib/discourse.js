const debug = require('debug')('contributions:discourse');
const axios = require('axios');

const BASE_URL = 'https://discourse.mozilla.org';
const DISCOURSE_USERNAME = 'mkohler';
const RESULTS_PER_PAGE = 30;
const TOPICS_CATEGORY = 'discourse-topics';
const POSTS_CATEGORY = 'discourse-posts';

module.exports = {
  TOPICS_CATEGORY,
  POSTS_CATEGORY,
  gather,
};

async function gather() {
  const topics = await processTopics();
  const posts = await processPosts();
  const contributions = [
    ...topics,
    ...posts,
  ];

  debug('Finished gathering contributions');
  return contributions;
}

async function processTopics() {
  debug('Getting topics from Discourse');
  let allTopics = [];

  const page = topicPageGenerator();

  for await (const topicsResponse of page) {
    const { topics } = topicsResponse.topic_list;
    debug(`Got ${topics.length} topics`);
    allTopics = allTopics.concat(topics.map(format));

    const hasMore = topics.length === RESULTS_PER_PAGE;
    if (!hasMore) {
      debug('We are done!');
      return allTopics;
    }
  }

  return undefined;
}

async function processPosts() {
  debug('Getting posts from Discourse');
  let allPosts = [];

  const page = postPageGenerator();

  for await (const postsResponse of page) {
    const posts = postsResponse.user_actions;
    debug(`Got ${posts.length} posts`);
    allPosts = allPosts.concat(posts.map(format));

    const hasMore = posts.length === RESULTS_PER_PAGE;
    if (!hasMore) {
      debug('We are done!');
      return allPosts;
    }
  }

  return undefined;
}

async function* topicPageGenerator() {
  let page = 0;
  while (true) {
    debug(`Getting page ${page}`);
    const url = `${BASE_URL}/topics/created-by/${DISCOURSE_USERNAME}.json?page=${page}`;
    const results = await getDiscourseData(url); // eslint-disable-line no-await-in-loop
    page++;
    yield results;
  }
}

async function* postPageGenerator() {
  let page = 0;
  while (true) {
    debug(`Getting page ${page}`);
    const offset = page * RESULTS_PER_PAGE;
    const url = `${BASE_URL}/user_actions.json?username=${DISCOURSE_USERNAME}&filter=5&offset=${offset}`;
    const results = await getDiscourseData(url); // eslint-disable-line no-await-in-loop
    page++;
    yield results;
  }
}

async function getDiscourseData(url) {
  const response = await axios.get(url);
  return response.data;
}

function format(entity) {
  if (entity.post_id) {
    return formatPost(entity);
  }

  return formatTopic(entity);
}

function formatTopic(entity) {
  return {
    createdAt: new Date(entity.created_at),
    description: entity.title,
    link: `${BASE_URL}/t/${entity.slug}/${entity.id}`,
    type: 'Created Discourse Topic',
    source: TOPICS_CATEGORY,
  };
}

function formatPost(entity) {
  return {
    createdAt: new Date(entity.created_at),
    description: entity.title,
    link: `${BASE_URL}/t/${entity.slug}/${entity.topic_id}/${entity.post_number}`,
    type: 'Posted on Discourse Topic',
    source: POSTS_CATEGORY,
  };
}
