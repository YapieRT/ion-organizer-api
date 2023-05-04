const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  code: {
    type: String,
    reguired: true,
  },
  name: {
    type: String,
    reguired: true,
  },
  email: {
    type: String,
    reguired: true,
  },
  quantity: {
    type: Number,
    reguired: true,
  },
});

module.exports = ItemSchema;
