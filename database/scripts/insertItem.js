const itemModel = require('../models/ItemModel');

const insertItem = async (data) => {
  try {
    const item = await itemModel.findOne({ code: data.code, email: data.email });
    if (!Object.is(item, null)) {
      if (data.name !== item.name) return false;
      const quantity = item.quantity + Number(data.quantity);
      await itemModel.updateOne({ name: data.name, email: data.email }, { $set: { quantity: quantity } });
      return true;
    } else {
      await itemModel.create(data);
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = insertItem;
