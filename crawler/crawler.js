const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const users_selector = require('./selectors/users.js');
const search_selector = require('./selectors/search.js');
const feed_selector = require('./selectors/feed.js');
const media_selector = require('./selectors/media.js');

class Crawler {
  constructor() {
    this.baseUrl = `https://www.instagram.com/`;
  }

  async initialize(pathUrl) {
    if (!this.page) {
      // Initialize Browser: Issue: https://github.com/GoogleChrome/puppeteer/issues/758#issuecomment-328906039
      this.browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      // Go to user profile
      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1080, height: 720 });
      await this.page.goto(`${this.baseUrl}${pathUrl}`, {
        waitUntil: 'networkidle0'
      });
    }
  }

  async scrapUserInfo(usernameParam) {
    await this.initialize(`${usernameParam}`);
    let bodyHTML = await this.page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(bodyHTML);
    const isPrivate = (await $(users_selector.IS_PRIVATE).text()) != '';
    const username = await $(users_selector.USERNAME).text();
    const full_name = await $(users_selector.FULL_NAME).text();
    const profile_picture = isPrivate
      ? await $(users_selector.PROFILE_PICTURE_PRIVATE).attr('src')
      : await $(users_selector.PROFILE_PICTURE).attr('src');
    const bio = await $(users_selector.BIO).text();
    const website = await $(users_selector.WEBSITE).text();
    const media = await $(users_selector.MEDIA_COUNT).text();
    const followed_by = await $(users_selector.FOLLOWED_BY_COUNT).attr('title');
    const follows = await $(users_selector.FOLLOWS_COUNT).text();

    return {
      username,
      full_name,
      profile_picture,
      bio,
      website,
      isPrivate,
      counts: {
        media: parseInt(media.replace(/,/g, '')),
        follows: parseInt(follows.replace(/,/g, '')),
        followed_by: parseInt(followed_by.replace(/,/g, ''))
      }
    };
  }

  async searchUser(query) {
    await this.initialize(`search`);
    await this.page.screenshot({ path: './crawler/screenshots/search.png' });
    await this.page.type(search_selector.SEARCH_INPUT, query);
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    await this.page.screenshot({
      path: './crawler/screenshots/search_typed.png'
    });
    await this.page.waitForSelector(search_selector.SEARCH_LIST);

    const bodyHTML = await this.page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(bodyHTML);
    return $(search_selector.SEARCH_LIST)
      .find(search_selector.SEARCH_ITEM)
      .map((index, element) => ({
        profile_picture: $(element)
          .find(search_selector.PROFILE_PICTURE)
          .attr('src'),
        full_name: $(element)
          .find(search_selector.FULL_NAME)
          .text(),
        username: $(element)
          .find(search_selector.USERNAME)
          .text()
      }))
      .get()
      .filter(value => value.username.charAt(0) != '#');
  }

  async scrapUserFeed(username, count = 100, scrollDelay = 1000) {
    await this.initialize(`${username}`);
    await this.page.screenshot({ path: './crawler/screenshots/feed.png' });
    const bodyHTML = await this.page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(bodyHTML);

    return $(feed_selector.FEED_LIST)
      .find(feed_selector.FEED_ITEM)
      .map((index, element) => {
        const media_id = $(element)
          .find(feed_selector.FEED_LINK)
          .attr('href')
          .slice(1);
        return {
          link: `${this.baseUrl}${media_id}`,
          id: media_id,
          picture: $(element)
            .find(feed_selector.FEED_PICTURE)
            .attr('src'),
          picture_alt: $(element)
            .find(feed_selector.FEED_PICTURE)
            .attr('alt')
        };
      })
      .get();
  }

  async scrapMediaInfo(mediaId) {
    await this.initialize(`p/${mediaId}`);
    await this.page.screenshot({ path: './crawler/screenshots/media.png' });
    await this.page.waitFor(1000);
    await loadMoreComments(this.page);

    // Try click on views count
    try {
      await this.page.click(media_selector.LIKES_VIDEO_BUTTON);
      await this.page.waitFor(200);
    } catch (err) {}

    let bodyHTML = await this.page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(bodyHTML);

    // Getting comments
    let comments = [];
    await $(media_selector.COMMENTS_BOX)
      .find(media_selector.COMMENT)
      .each((index, element) => {
        if (index > 0) {
          comments.push({
            from: {
              username: $(element)
                .find(media_selector.FROM_USERNAME)
                .text()
            },
            text: $(element)
              .find(media_selector.COMMENT_TEXT)
              .text()
          });
        }
      });

    // Get users in photo
    let users_in_photo = [];
    await $(media_selector.USERS_IN_PHOTO).each((index, element) => {
      users_in_photo.push({
        username: $(element)
          .find(media_selector.USERNAME_IN_PHOTO)
          .text()
      });
    });

    // Get media type
    let type = (function($) {
      if (
        !(
          $(media_selector.LEFT_BOX)
            .find(media_selector.IMAGE)
            .html() == null
        )
      )
        return 'image';
      if (!($(media_selector.IMAGES).html() == null)) return 'images';
      if (!($(media_selector.VIDEO).html() == null)) return 'video';
    })($);

    // Get media Images or videos
    let videos = [],
      images = [];
    switch (type) {
      case 'image':
        images.push({
          height: $(media_selector.LEFT_BOX)
            .find(media_selector.IMAGE)
            .attr('sizes')
            .replace('px', ''),
          width: $(media_selector.LEFT_BOX)
            .find(media_selector.IMAGE)
            .attr('sizes')
            .replace('px', ''),
          image_alt: $(media_selector.LEFT_BOX)
            .find(media_selector.IMAGE)
            .attr('alt'),
          url: $(media_selector.LEFT_BOX)
            .find(media_selector.IMAGE)
            .attr('src')
        });
        break;
      case 'images':
        $(media_selector.IMAGES).each((index, element) => {
          images.push({
            height: $(element)
              .find(media_selector.IMAGE_FROM_IMAGES)
              .attr('sizes')
              .replace('px', ''),
            width: $(element)
              .find(media_selector.IMAGE_FROM_IMAGES)
              .attr('sizes')
              .replace('px', ''),
            image_alt: $(element)
              .find(media_selector.IMAGE_FROM_IMAGES)
              .attr('alt'),
            url: $(element)
              .find(media_selector.IMAGE_FROM_IMAGES)
              .attr('src')
          });
        });
        type = 'image';
        break;
      case 'video':
        videos.push({
          thumbnail: $(media_selector.VIDEO).attr('poster'),
          url: $(media_selector.VIDEO).attr('src')
        });
        break;
      case 'videos': // TODO:
    }
    const username = $(media_selector.MEDIA_HEADER)
      .find(media_selector.CREATOR_USERNAME)
      .text();
    const profile_picture = $(media_selector.MEDIA_HEADER)
      .find(media_selector.CREATOR_PROFILE_PICTURE)
      .attr('src');
    const text = $(media_selector.COMMENTS_BOX)
      .find(media_selector.CAPTION_TEXT)
      .text();
    const created_time = $(media_selector.CREATION_TIME).attr('datetime');
    const likes = parseInt(
      (type == 'image'
        ? $(media_selector.LIKES_COUNT_IMAGE)
        : $(media_selector.LIKES_COUNT_VIDEO)
      )
        .text()
        .replace(/,/g, '')
    );
    const location_name = $(media_selector.MEDIA_HEADER)
      .find(media_selector.LOCATION_NAME)
      .text();

    return {
      caption: {
        from: {
          username,
          profile_picture
        },
        text
      },
      comments: {
        count: comments.length,
        data: comments
      },
      created_time,
      id: mediaId,
      link: `${this.baseUrl}p/${mediaId}`,
      likes,
      location: {
        name: location_name
      },
      type,
      users_in_photo,
      videos,
      images
    };
  }

  async finish() {
    this.browser.close();
  }
}

const loadMoreComments = async page => {
  if (await page.$(media_selector.MORE_BUTTON)) {
    await page.waitFor(200);
    await page.click(media_selector.MORE_BUTTON);
    await loadMoreComments(page);
  }
};

module.exports = () => {
  return new Crawler();
};
