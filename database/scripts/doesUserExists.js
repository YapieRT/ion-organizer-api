const userModel = require('../models/UserModel');

const doesUserExists = async (email) => {
  const inUse = await userModel.findOne({ email });

  if (Object.is(inUse, null)) return false;
  else return true;
};
module.exports = doesUserExists;
