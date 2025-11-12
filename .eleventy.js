const { DateTime } = require("luxon");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Passthrough copy
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  // Filters
  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy"),
  );

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd"),
  );

  eleventyConfig.addFilter("dateToIso", (dateString) =>
    new Date(dateString).toISOString(),
  );

  eleventyConfig.addFilter("head", (array, n) =>
    n < 0 ? array.slice(n) : array.slice(0, n),
  );

  // Collections
  eleventyConfig.addCollection("tagList", (collection) => {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      if ("tags" in item.data) {
        item.data.tags
          .filter((t) => !["all", "nav", "post", "posts"].includes(t))
          .forEach((tag) => tagSet.add(tag));
      }
    });
    return [...tagSet];
  });

  eleventyConfig.addFilter("pageTags", (tags) => {
    const generalTags = ["all", "nav", "post", "posts"];
    return tags
      .toString()
      .split(",")
      .filter((tag) => !generalTags.includes(tag));
  });

  // Shortcodes for assets (now just static paths)
  eleventyConfig.addShortcode(
    "bundledcss",
    () => `<link rel="stylesheet" href="/css/main.css" />`,
  );
  eleventyConfig.addShortcode(
    "bundledjs",
    () => `<script type="module" src="/js/main.js"></script>`,
  );

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes",
      data: "data",
      layouts: "layouts",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
