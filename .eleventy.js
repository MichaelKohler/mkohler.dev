const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({
    'public': '/',
    'resume.json': 'data/resume.json'
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->"
  });

  eleventyConfig.addFilter('md', (content = "") => {
    return markdownIt({ html: true }).render(content);
  });

  eleventyConfig.addCollection('blogposts', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/blog/*.md').reverse();
  });

  eleventyConfig.addPlugin(pluginRss);
};
