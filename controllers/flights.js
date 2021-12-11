const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newFlight,
  create,
  show
};

const flightConsts = {
  airlines: ['American', 'Southwest', 'United'],
  airports: ['AUS', 'BOS', 'DFW', 'DEN', 'LAX', 'SAN']
};

function index(req, res) {
  const sort = req.query.sort || 'asc';
  Flight.find({}, function (err, flights) {
    if(sort === 'asc') {
      // Sort flights in ascending order of departure time.
      flights.sort((a, b) => {return Date.parse(a.departs) - Date.parse(b.departs)});
    }
    flights.forEach(function(flight) {
      // Set hasPassed to "true" if flight has departed.
      flight.hasPassed = Date.parse(flight.departs) < Date.now();
    });
    res.render('flights/index', { title: 'All Flights', flights, sort });
  });
}

function newFlight(req, res) {
  // Manage date complexity.
  const d = new Date();
  const dateVal = `${d.getFullYear()+1}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}T${d.toTimeString().slice(0, 5)}`;
  res.render('flights/new', { title: 'Add Flight', dateVal, flightConsts });
}

function create(req, res) {
  var flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.redirect('/flights/new');
    res.redirect('/flights');
  });
}

function show(req, res) {
  // Get flight data.
  Flight.findById(req.params.id, function (err, flight) {
    // Order destinations by arrival time, ascending.
    flight.destinations.sort((a, b) => {return Date.parse(a.arrives) - Date.parse(b.arrives)});

    // Indicate if flight's date has passed.
    flight.hasPassed = Date.parse(flight.departs) < Date.now();

    // Remove unavailable destinations.
    const availableDestinations = [];
    for(airport of flightConsts.airports) {
      if(airport === flight.airport) continue;
      for(destAirport of flight.destinations) { if(airport === destAirport.airport) continue; }
      availableDestinations.push(airport);
    }

    // Find tickets associated with flight.
    Ticket.find({flight: flight._id}, function(err, tickets) {
      // Render page.
      res.render('flights/show', { title: 'Flight Detail', flight, flightConsts, availableDestinations, tickets });
    });
  });
}