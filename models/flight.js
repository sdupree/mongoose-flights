const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ['AUS', 'BOS', 'DFW', 'DEN', 'LAX','SAN'],
    },
    arrives: {
      type: Date
    }
  }
);

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ['American', 'Southwest', 'United']
    },
    airport: {
      type: String,
      enum: ['AUS', 'BOS', 'DFW', 'DEN', 'LAX','SAN'],
      default: 'DEN'
    },
    flightNo: {
      type: Number,
      min: 10,
      max: 9999
    },
    departs: {
      type: Date,
      default: function () {
        let d = new Date();
        return new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
      },
    },
    destinations: [destinationSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);