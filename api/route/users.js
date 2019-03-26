var express = require("express"),
  router = express.Router(),
  User = require("../controllers/users.js"),
  Middleware = require("../middlewares/users.js");

/**
 * @api {get} /users/search Search users by query
 * @apiName Search User
 * @apiGroup Users
 *
 * @apiQueryParam  {String} [q] A query string.
 * @apiQueryParam  {Integer} [count] Number of users to return.
 * @apiSuccess (200) Array{Object} List of found users.
 */
router.get("/search", Middleware.validate("searchUser"), User.searchUser);

/**
 * @api {get} /users/:username Get a User
 * @apiName Get a User
 * @apiGroup Users
 *
 * @apiPathParam  {String} [username] The username of a user to get information about
 *
 * @apiSuccess (200) {Object} User profile information
 */
router.get("/:username", User.getUserInfo);

/**
 * @api {get} /users/:username/media/recent Get 
 * @apiName Get a User recent Feed
 * @apiGroup Users
 *
 * @apiPathParam  {String} [username] The username of a user to get recent media of
 * @apiQueryParam {Integer} [count] Count of media to return. TODO:
 * @apiSuccess (200) {Object} User profile information
 */
router.get("/:username/media/recent", User.getRecentMedia);

module.exports = router;
