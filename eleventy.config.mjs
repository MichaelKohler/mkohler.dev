import pluginRss from '@11ty/eleventy-plugin-rss';
import markdownIt from 'markdown-it';

export default (eleventyConfig) => {
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
    return collectionApi.getFilteredByGlob('src/blog/posts/*.md').reverse();
  });

  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
