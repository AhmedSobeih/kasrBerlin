const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: Number,
    unique:true,
    required: true,
  },
  DepatureDate: {
    type: Date,
    required: true
  },
  ArrivalDate:{
    type:Date,
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
  FirstSeats: {
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
  },
  FreeEconomySeatsNum: {
    type: Number,
    required: true
  },
  FreeBusinessSeatsNum: {
    type: Number,
    required: true
  },
  FreeFirstSeatsNum: {
    type: Number,
    required: true
  },
  EconomySeatPrice: {
    type: Number,
    required: true
  },
  BusinessSeatPrice: {
    type: Number,
    required: true
  },
  FirstSeatPrice: {
    type: Number,
    required: true
  },
  IsBusinessSeatBusy: {
    type: [Boolean],
    required: true
  },
  IsEconomySeatBusy: {
    type: [Boolean],
    required: true
  },
  IsFirstSeatBusy: {
    type: [Boolean],
    required: true
  },
  BaggageAllowance: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
