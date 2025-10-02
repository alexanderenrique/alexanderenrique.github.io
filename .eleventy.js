const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Add collections
  eleventyConfig.addCollection("coding", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/coding/**/*.md");
  });

  eleventyConfig.addCollection("wrenching", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/wrenching/**/*.md");
  });

  eleventyConfig.addCollection("microelectronics", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/microelectronics/**/*.md");
  });

  eleventyConfig.addCollection("general", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/general/**/*.md");
  });

  // Add filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Add shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
