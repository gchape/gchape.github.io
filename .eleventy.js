const { DateTime } = require("luxon");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs");
const path = require("path");

const isDev = process.env.ELEVENTY_ENV === "development";
const isProd = process.env.ELEVENTY_ENV === "production";

const manifestPath = path.resolve(
  __dirname,
  "public",
  "assets",
  "manifest.json",
);

let manifest = {};
if (isProd) {
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  }
} else {
  // dev server paths for Vite
  manifest = {
    "main.js": "http://localhost:5173/js/main.js",
    "main.css": "http://localhost:5173/css/main.css",
  };
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  const highlighter = eleventyConfig.markdownHighlighter;
  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === "mermaid") {
      return `<pre class="mermaid">${str}</pre>`;
    }
    return highlighter(str, language);
  });

  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

  eleventyConfig.addShortcode("bundledcss", () => {
    return manifest["main.css"]
      ? `<link rel="stylesheet" href="${manifest["main.css"]}" />`
      : "";
  });

  eleventyConfig.addShortcode("bundledjs", () => {
    return manifest["main.js"]
      ? `<script type="module" src="${manifest["main.js"]}"></script>`
      : "";
  });

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
