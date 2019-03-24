var express = require("express"),
  { validationResult } = require("express-validator/check");

const Crawler = require("../../crawler/crawler.js");

exports.searchUser = function(req, res, next) {
  try {
    if (!req.query.q) {
      return next();
    }
    validationResult(req).throw();

    const { q, count } = req.query;
    const crawler = Crawler("search");
    crawler.searchUser(q).then(response => {
      if (count) {
        response = response.slice(0, count);
      }
      res.json({ data: response });
      crawler.finish();
    });
  } catch (err) {
    res.status(422).json(err.mapped());
  }
};

exports.getUserInfo = function(req, res) {
  const { username } = req.params;
  const crawler = Crawler(username);

  crawler.scrapUserInfo().then(response => {
    res.json({ data: response });
    crawler.finish();
  });
};
