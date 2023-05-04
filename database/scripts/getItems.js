const itemModel = require('../models/ItemModel');

const getItems = async (email) => {
  try {
    const items = await itemModel.find({ email: email }).select('code name quantity').sort({ createdAt: -1 }).lean();
    console.dir(items);
    return items;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getItems;
