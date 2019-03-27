var express = require("express"),
  router = express.Router(),
  Media = require("../controllers/media.js");

 /**
 * @api {get} /media/:mediaId Get media information
 * @apiName Get a Media
 * @apiGroup Media
 *
 * @apiPathParam  {String} [mediaId] The mediaId of a media to get information about
 * @apiSuccess (200) {Object} Information about a media
 */
router.get("/:mediaId", Media.getMediaInfo);

module.exports = router;
