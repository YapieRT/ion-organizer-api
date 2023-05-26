import ItemModel from '../database/models/ItemModel.js';

import jwt from 'jsonwebtoken';

const secretKey = 'SecretION';

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

const remove = async (data) => {
  try {
    await itemModel.findOneAndRemove({ code: data.code, email: data.email });
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const getItems = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);

    const items = await ItemModel.find({ email: decoded.email })
      .select('code name quantity')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(items);
  } catch (err) {
    res.status(404).json({ message: 'Failed to find items' });
  }
};

export const addItem = async (req, res) => {
  try {
    const postData = req.body;

    console.log(`Here is your item data:`);
    console.dir(postData);
    if (await insertItem(postData)) return res.status(201).json({ message: 'Item Inserted' });
    else {
      return res.status(406).json({ message: 'Wrong data' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Add item failed',
    });
  }
};

export const removeItem = async (req, res) => {
  try {
    const postData = req.body;

    console.log(`Here is your item removal data:`);
    console.dir(postData);

    if (await remove(postData)) {
      console.log('Item Removed');
      return res.status(201).json({ message: 'Item Removed' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Item Removal failed',
    });
  }
};
