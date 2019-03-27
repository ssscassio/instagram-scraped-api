var express = require("express"),
  router = express.Router();

router.use("/users", require("./users"));

router.use("/media", require("./media"));

module.exports = router;
