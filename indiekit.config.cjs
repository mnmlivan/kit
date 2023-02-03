const process = require("node:process");

/**
 * Customise post types.
 *
 * Publication presets provide default values, but these can be overridden.
 * See: https://getindiekit.com/configuration/post-types
 *
 * Use placeholder tokens to customise file paths and URLS.
 * See: https://getindiekit.com/configuration/post-types#path-and-url-tokens
 */
const postTypes = [{
  type: "article",
  name: "Article",
  post: {
    path: "src/articles/{yyyy}-{MM}-{dd}-{slug}.md",
    url: "articles/{slug}/"
  },
},
{
  type: "note",
  name: "Note",
  post: {
    path: "src/notes/{t}.md",
    url: "notes/{t}/",
  },
},
{
  type: "photo",
  name: "Photo",
  post: {
    path: "src/photos/{t}.md",
    url: "photos/{t}/"
  },
  media: {
    path: "src/media/{t}.{ext}",
    url: "media/{t}.{ext}"
  }
},
{
  type: "bookmark",
  name: "Bookmark",
  post: {
    path: "src/bookmarks/{yyyy}-{MM}-{dd}-{slug}.md",
    url: "bookmarks/{slug}/"
  }
},
{
  media: {
    path: "src/media/{filename}"
  }
}
];

module.exports = {
  /**
   * Set application options
   *
   * These values are used to configure application behaviour.
   * See: https://getindiekit.com/configuration/#application
   */
  application: {
    url: "https://kit.mnmlivan.xyz",
    mongodbUrl: process.env.MONGO_URL,
  },
  /**
   * Add plug-ins.
   *
   * In this example we have chosen to use a publication preset for Eleventy,
   * save posts and media files to GitHub repository, and added a syndicator
   * to share posts on a Mastodon server.
   *
   * See: https://getindiekit.com/configuration/#plugins
   */
  plugins: [
    "@indiekit/endpoint-json-feed",
    "@indiekit/preset-jekyll",
    "@indiekit/store-github",
    "@indiekit/syndicator-mastodon",
  ],
  /**
   * Set publication options
   *
   * These values are used to configure application behaviour.
   * See: https://getindiekit.com/configuration/#publication
   */
  publication: {
    categories: "https://mnmlivan.xyz/categories/index.json",
    enrichPostData: true,
    locale: "bg",
    me: "https://mnmlivan.xyz",
    postTypes: postTypes,
    slugSeparator: "-",
    timeZone: "Europe/Sofia"
  },
  /**
   * GitHub content store options.
   *
   * Other content stores are available.
   * See: https://getindiekit.com/plugins/stores
   */
  "@indiekit/store-github": {
    user: "mnmlivan",
    repo: "mnmlivan.xyz",
    branch: "main",
    token: process.env.GITHUB_TOKEN
  },
  /**
   * Mastodon syndicator options.
   *
   * Multiple syndicators can be added.
   * See: https://getindiekit.com/plugins/syndicators
   */
  "@indiekit/syndicator-mastodon": {
    checked: true,
    forced: true,
    url: "https://indieweb.social",
    user: "mnmlivan",
    accessToken: process.env.MASTODON_ACCESS_TOKEN
  },
};
