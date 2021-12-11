const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  new: newTicket,
  create,
  delete: deleteOne
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

function deleteOne(req, res) {
  Ticket.findByIdAndRemove(req.params.id, function(err, result) {
    if(err) console.log(err);
    console.log(result);
    res.redirect(`/flights/${result.flight}`);
  });
}