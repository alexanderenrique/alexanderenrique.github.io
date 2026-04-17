module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      const slug = data?.page?.fileSlug;
      if (!slug) return;
      return `/microelectronics/${slug}/`;
    },
  },
};

