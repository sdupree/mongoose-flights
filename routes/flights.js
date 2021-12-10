var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');

module.exports = router;

/* GET flights listing. */
router.get('/', flightsCtrl.index);

// GET "/flights/new"
router.get('/new', flightsCtrl.new);

// POST "/flights"
router.post('/', flightsCtrl.create);

