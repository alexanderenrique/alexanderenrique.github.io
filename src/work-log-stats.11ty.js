module.exports = {
  data: {
    permalink: "/work-log-stats.json",
    eleventyExcludeFromCollections: true,
  },
  render(data) {
    return JSON.stringify(data.workLogActivity, null, 2);
  },
};
