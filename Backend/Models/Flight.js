const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  Number: {
    type: Number,
    required: true,
  },
  flightDate: {
    type: Date,
    required: true
  },
  // which datatype will represent arrival and depature time???
  DepatureTime: {
    type: Date,
    required: true,
  },
  ArrivalTime: {
    type: Date,
    required: true
  },
  EconomySeats: {
    type: Number,
    required: true
  },
  BusinessSeats: {
    type: Number,
    required: true
  },
  DepatureAirport: {
    type: String,
    required: true
  },
  ArrivalAirport: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
