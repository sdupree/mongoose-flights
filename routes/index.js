var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Single-purpose website lives on a subpage.
  res.redirect("/flights");
});

module.exports = router;
