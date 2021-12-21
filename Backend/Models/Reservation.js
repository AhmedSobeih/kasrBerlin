const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
ReservationNumber: {
    type: Number,
    unique:true,
    required: true,
  },
  DepartureFlightNumber: {
    type: Number,
    required: true,
  },
  ArrivalFlightNumber: {
    type: Number,
    required: true
  },
  CabinClass:{
    type:String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  User: {
    type: String,
    required: true
  }, 
  Seats: {
    type: [Number],
    required: true
  },
  ReturnSeats: {
    type: [Number],
    required: true
  }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
