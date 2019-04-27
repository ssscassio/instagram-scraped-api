var { validationResult } = require('express-validator/check');

const Crawler = require('../../crawler/crawler.js');

exports.searchUser = function(req, res, next) {
  try {
    if (!req.query.q) {
      return next();
    }
    validationResult(req).throw();

    const { q, count } = req.query;
    const crawler = Crawler();
    crawler.searchUser(q).then(data => {
      if (count) {
        data = data.slice(0, count);
      }
      res.json({ data });
      crawler.finish();
    });
  } catch (err) {
    res.status(422).json(err.mapped());
  }
};

exports.getUserInfo = function(req, res) {
  const { username } = req.params;
  const crawler = Crawler();

  crawler.scrapUserInfo(username).then(data => {
    res.json({ data });
    crawler.finish();
  });
};

exports.getRecentMedia = function(req, res) {
  const { username } = req.params;
  const crawler = Crawler();

  crawler.scrapUserFeed(username).then(data => {
    res.json({ data });
  });
};
