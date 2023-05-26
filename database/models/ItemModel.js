import mongoose from 'mongoose';
import itemSchema from '../schemas/ItemSchema.js';

const collectionName = 'items';
const ItemModel = mongoose.model(collectionName, itemSchema);

export default ItemModel;
