module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      const slug = data?.page?.fileSlug;
      const stem = data?.page?.filePathStem;
      if (!slug) return;
      if (stem && stem.endsWith("/index")) return "/coding/";
      return `/coding/${slug}/`;
    },
  },
};

