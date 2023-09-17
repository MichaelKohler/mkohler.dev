const pluginRss = require('@11ty/eleventy-plugin-rss');
const CleanCSS = require('clean-css');
const markdownIt = require('markdown-it');

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('cssmin', (code) => {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addPassthroughCopy({
    'public': '/',
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

  return {
    dir: {
      includes: '_layouts',
    },
  };
};
