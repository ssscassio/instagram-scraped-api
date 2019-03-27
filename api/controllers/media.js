const Crawler = require("../../crawler/crawler.js");

exports.getMediaInfo = function(req, res) {
  const { mediaId } = req.params;
  
  const crawler = Crawler();

  crawler.scrapMediaInfo(mediaId).then(data => {
    res.json({ data });
    crawler.finish();
  });
};