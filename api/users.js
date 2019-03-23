var express = require("express");
var router = express.Router();

const Crawler = require("../crawler/crawler.js");

// Routes
// Get user profile information
router.get("/:username", function(req, res) {
  const { username } = req.params;
  const crawler = Crawler(username);

  crawler.scrapUserInfo().then(response => {
    res.json({ data: response });
    crawler.finish();
  });
});

module.exports = router;
