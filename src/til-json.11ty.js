module.exports = {
  data: {
    permalink: "/til.json",
    eleventyExcludeFromCollections: true,
  },
  render(data) {
    return JSON.stringify(data.tilFeed, null, 2);
  },
};
