const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  new: newTicket,
  create
};

function newTicket(req, res) {
  Flight.findById(req.params.flightId, function(err, flight) {
    res.render('tickets/new', {title: 'New Ticket', flight})
  });
}

function create(req, res) {
  req.body.flight = req.params.flightId;
  console.log(req.params.flightId);
  const ticket = new Ticket(req.body);
  ticket.save(function (err) {
    if (err) {
      console.log(err);
      return res.redirect(`/flights/${req.params.flightId}/tickets/new`);
    }
    res.redirect(`/flights/${req.params.flightId}`);
  });
}
