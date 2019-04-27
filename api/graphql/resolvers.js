import Crawler from '../../crawler/crawler.js';

export default {
  Query: {
    user: async (root, { username }, context) => {
      const crawler = Crawler();
      const user = await crawler.scrapUserInfo(username);
      return user;
    },
    search: async (root, { query, count }, context) => {
      const crawler = Crawler();

      let users = await crawler.searchUser(query);
      users = users.slice(0, count);
      return users;
    },
    media: async (root, { mediaId }, context) => {
      const crawler = Crawler();

      let media = await crawler.scrapMediaInfo(mediaId);
      return media;
    },
    feed: async (root, { username }, context) => {
      const crawler = Crawler();

      let feed = await crawler.scrapUserFeed(username);
      return feed;
    }
  }
};
