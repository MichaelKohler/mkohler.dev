module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({
    'public': '/',
    'resume.json': 'data/resume.json'
  });
};
