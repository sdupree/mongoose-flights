var express = require('express');
var router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

module.exports = router;

// GET "/flights/:flightId/tickets/new" -- New route.
router.get('/flights/:flightId/tickets/new', ticketsCtrl.new);

// POST "/flights/:flightId/tickets" -- Create route.
router.post('/flights/:flightId/tickets', ticketsCtrl.create);

