const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//first name, last name, home address, country code, telephone number(s), email and passport number.

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  homeAddress: {
    type: String,
    required: true,
  },
  telephoneNumbers: {
    type: [String],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passportNumber: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;
