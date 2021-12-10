const Flight = require("../models/flight");

module.exports = {
  index,
  new: newFlight,
  create
};

const flightConsts = {
  airlines: ['American', 'Southwest', 'United'],
  airports: ['AUS', 'BOS', 'DFW', 'DEN', 'LAX', 'SAN']
};

function index(req, res) {
  const sort = req.query.sort;
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
  const d = new Date();
  // const dateVal = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
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