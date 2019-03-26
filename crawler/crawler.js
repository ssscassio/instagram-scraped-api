const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const users_selector = require("./selectors/users.js");
const search_selector = require("./selectors/search.js");
const feed_selector = require("./selectors/feed.js");

class Crawler {
  constructor() {
    this.baseUrl = `https://www.instagram.com/`;
  }

  async initialize(pathUrl) {
    if (!this.page) {
      // Initialize Browser
      this.browser = await puppeteer.launch();
      // Go to user profile
      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1080, height: 720 });
      await this.page.goto(`${this.baseUrl}${pathUrl}`, {
        waitUntil: "networkidle0"
      });
    }
  }

  async scrapUserInfo(usernameParam) {
    await this.initialize(`${usernameParam}`);
    let bodyHTML = await this.page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(bodyHTML);
    const username = await $(users_selector.USERNAME).text();
    const full_name = await $(users_selector.FULL_NAME).text();
    const profile_picture = await $(users_selector.PROFILE_PICTURE).attr("src");
    const bio = await $(users_selector.BIO).text();
    const website = await $(users_selector.WEBSITE).text();
    const media = await $(users_selector.MEDIA_COUNT).text();
    const followed_by = await $(users_selector.FOLLOWED_BY_COUNT).attr("title");
    const follows = await $(users_selector.FOLLOWS_COUNT).text();

    return {
      username,
      full_name,
      profile_picture,
      bio,
      website,
      counts: {
        media: parseInt(media.replace(/,/g, "")),
        follows: parseInt(follows.replace(/,/g, "")),
        followed_by: parseInt(followed_by.replace(/,/g, ""))
      }
    };
  }

  async searchUser(query) {
    await this.initialize(`search`);
    await this.page.screenshot({ path: "./crawler/screenshots/search.png" });
    await this.page.type(search_selector.SEARCH_INPUT, query);
    await this.page.waitForNavigation({ waitUntil: "networkidle0" });
    await this.page.screenshot({
      path: "./crawler/screenshots/search_typed.png"
    });
    await this.page.waitForSelector(search_selector.SEARCH_LIST);

    const bodyHTML = await this.page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(bodyHTML);
    return $(search_selector.SEARCH_LIST)
      .find(search_selector.SEARCH_ITEM)
      .map((index, element) => ({
        profile_picture: $(element)
          .find(search_selector.PROFILE_PICTURE)
          .attr("src"),
        full_name: $(element)
          .find(search_selector.FULL_NAME)
          .text(),
        username: $(element)
          .find(search_selector.USERNAME)
          .text()
      }))
      .get()
      .filter(value => value.username.charAt(0) != "#");
  }

  async scrapUserFeed(username, count = 100, scrollDelay = 1000) {
    await this.initialize(`${username}`);
    await this.page.screenshot({ path: "./crawler/screenshots/feed.png" });
    const bodyHTML = await this.page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(bodyHTML);

    return $(feed_selector.FEED_LIST)
      .find(feed_selector.FEED_ITEM)
      .map((index, element) => ({
        link: `${this.baseUrl}${$(element)
          .find(feed_selector.FEED_LINK)
          .attr("href")
          .slice(1)}`,
        picture: $(element)
          .find(feed_selector.FEED_PICTURE)
          .attr("src"),
        picture_alt: $(element)
          .find(feed_selector.FEED_PICTURE)
          .attr("alt")
      }))
      .get();
  }

  async finish() {
    this.browser.close();
  }
}

module.exports = () => {
  return new Crawler();
};
