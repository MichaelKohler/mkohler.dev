const debug = require('debug')('contributions:community-portal');
const { JSDOM } = require('jsdom');

const BASE_URL = 'https://community.mozilla.org/en/people';
const USERNAME = 'mkohler';

const EVENTS_CATEGORY = 'community-portal-events';
const CAMPAIGNS_CATEGORY = 'community-portal-campaigns';

module.exports = {
  EVENTS_CATEGORY,
  CAMPAIGNS_CATEGORY,
  gather,
};

async function gather() {
  const profileUrl = `${BASE_URL}/${USERNAME}`;
  const document = await getCommunityPortalDocument(profileUrl);
  const events = await processEvents(document);
  const campaigns = await processCampaigns(document);
  const contributions = [
    ...events,
    ...campaigns,
  ];

  debug('Finished gathering contributions');
  return contributions;
}

async function processEvents(document) {
  debug('Getting events from Community Portal');
  const allEventNodes = document.querySelectorAll('.profile__event');

  const allEvents = Array.from(allEventNodes, formatEvent)
    .sort((a, b) => b.createdAt - a.createdAt)
    .filter((event) => event.createdAt < new Date());
  return Array.from(new Set(allEvents));
}

async function processCampaigns(document) {
  debug('Getting campaigns from Community Portal');
  const allCampaignNodes = document.querySelectorAll('.profile__campaign');

  return Array.from(allCampaignNodes, formatCampaign)
    .sort((a, b) => b.createdAt - a.createdAt)
    .filter((campaign) => campaign.createdAt < new Date());
}

async function getCommunityPortalDocument(url) {
  const dom = await JSDOM.fromURL(url);
  const { document } = dom.window;
  return document;
}

function formatEvent(entity) {
  return {
    createdAt: new Date(entity.querySelector('.profile__event-time').textContent.replace(/[\n\t∙]/g, '')),
    description: entity.querySelector('.profile__event-title').textContent.replace(/[\n\t]/g, ''),
    link: entity.getAttribute('href'),
    type: 'Participated in an event',
    source: EVENTS_CATEGORY,
  };
}

function formatCampaign(entity) {
  const dateValue = entity.querySelector('.profile__campaign-dates').textContent.replace(/[\n\t∙]/g, '').replace(/\s*-\s*[a-zA-Z]+\s\d{2}/g, '');
  return {
    createdAt: new Date(dateValue),
    description: entity.querySelector('.profile__campaign-title').textContent.replace(/[\n\t]/g, ''),
    link: entity.getAttribute('href'),
    type: 'Participated in a campaign',
    source: CAMPAIGNS_CATEGORY,
  };
}
