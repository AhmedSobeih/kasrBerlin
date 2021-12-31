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
  DepartureCabinClass:{
    type:String,
    required: true
  },
  ReturnCabinClass:{
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
    type: [String],
    required: true
  },
  ReturnSeats: {
    type: [String],
    required: true
  }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
