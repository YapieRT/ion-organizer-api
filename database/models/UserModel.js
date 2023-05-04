const mongoose = require('mongoose');
const userSchema = require('../schemas/UserSchema');

const collectionName = 'users';
const UserModel = mongoose.model(collectionName, userSchema);

module.exports = UserModel;
