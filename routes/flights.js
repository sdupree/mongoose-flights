var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');

module.exports = router;

// GET "/flights" -- Index route.
router.get('/', flightsCtrl.index);

// GET "/flights/new" -- New route.
router.get('/new', flightsCtrl.new);

// GET "/:id" -- Show route.
router.get('/:id', flightsCtrl.show);

// POST "/flights" -- Create route.
router.post('/', flightsCtrl.create);

