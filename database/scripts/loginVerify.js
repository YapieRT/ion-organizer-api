const userModel = require('../models/UserModel');

const loginVerify = async (email, password) => {
  const user = await userModel.findOne({ email });

  if (!Object.is(user, null)) {
    if (user.password == password) return true;
  }
  return false;
};
module.exports = loginVerify;
