const userModel = require('../models/UserModel');

const insertRegistrationData = async (data) => {
  try {
    const result = await userModel.create(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = insertRegistrationData;
