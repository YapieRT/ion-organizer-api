const mongoose = require('mongoose');
const itemSchema = require('../schemas/ItemSchema');

const collectionName = 'items';
const ItemModel = mongoose.model(collectionName, itemSchema);

module.exports = ItemModel;
