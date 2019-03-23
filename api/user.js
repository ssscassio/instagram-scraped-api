var express = require("express");
var router = express.Router();

// Routes
router.get("/", function(req, res) {
  res.json({
    name: "Cassio"
  });
});

module.exports = router;
