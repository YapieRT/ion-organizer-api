const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    reguired: true,
  },
  email: {
    type: String,
    reguired: true,
    unigue: true,
  },
  organization: {
    type: String,
    reguired: true,
  },
  password: {
    type: String,
    reguired: true,
  },
});

module.exports = UserSchema;
