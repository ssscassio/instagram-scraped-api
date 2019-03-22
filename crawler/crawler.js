const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const HEADER_SELECTOR = `#react-root > section > main > div > header >`;
const USERNAME_SELECTOR = `${HEADER_SELECTOR} section > div.nZSzR > h1`;
const FULL_NAME_SELECTOR = `${HEADER_SELECTOR} section > div.-vDIg > h1`;
const PROFILE_PICTURE_SELECTOR = `${HEADER_SELECTOR} div > div > span > img`;
const BIO_SELECTOR = `${HEADER_SELECTOR} section > div.-vDIg > span`;
const WEBSITE_SELECTOR = `${HEADER_SELECTOR} section > div.-vDIg > a.yLUwa`;
const COUNTS_SELECTOR = `${HEADER_SELECTOR} section > ul`;
const MEDIA_COUNT_SELECTOR = `${COUNTS_SELECTOR} > li:nth-child(1) > a > span`;
const FOLLOWED_BY_COUNT_SELECTOR = `${COUNTS_SELECTOR} > li:nth-child(2) > a > span`;
const FOLLOWS_COUNT_SELECTOR = `${COUNTS_SELECTOR} > li:nth-child(3) > a > span`;

class Crawler {
  constructor(username) {
    this.username = username;
    this.baseUrl = `https://www.instagram.com/${this.username}`;
    this.scrapUserInfo = this.scrapUserInfo.bind(this);
  }

  async scrapUserInfo() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 720 });
    await page.goto(this.baseUrl);
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(bodyHTML);
    const username = await $(USERNAME_SELECTOR).text();
    const full_name = await $(FULL_NAME_SELECTOR).text();
    const profile_picture = await $(PROFILE_PICTURE_SELECTOR).attr("src");
    const bio = await $(BIO_SELECTOR).text();
    const website = await $(WEBSITE_SELECTOR).text();
    const media = await $(MEDIA_COUNT_SELECTOR).text();
    const followed_by = await $(FOLLOWED_BY_COUNT_SELECTOR).attr("title");
    const follows = await $(FOLLOWS_COUNT_SELECTOR).text();
    browser.close();
    
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
}

module.exports = username => {
  return new Crawler(username);
};
