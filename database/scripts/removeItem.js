const itemModel = require('../models/ItemModel');

const removeItem = async (data) => {
  try {
    await itemModel.findByIdAndRemove({ _id: data._id });
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = removeItem;
