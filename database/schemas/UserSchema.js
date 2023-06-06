import mongoose from 'mongoose';
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
  passwordHash: {
    type: String,
    reguired: true,
  },
});

export default UserSchema;
