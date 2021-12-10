var express = require('express');
var router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

module.exports = router;

// POST "/flights/:id/destinations" -- Create route.
router.post('/flights/:id/destinations', destinationsCtrl.create);

