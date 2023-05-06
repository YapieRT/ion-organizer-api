const itemModel = require('../models/ItemModel');

const removeItem = async (data) => {
  try {
    await itemModel.findOneAndRemove({ code: data.code, email: data.email });
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = removeItem;
