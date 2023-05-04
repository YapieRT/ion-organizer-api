const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Database functions

const connectDB = require('./database/connectDB');
const insertRegistrationData = require('./database/scripts/insertRegistrationData');
const doesUserExists = require('./database/scripts/doesUserExists');
const loginVerify = require('./database/scripts/loginVerify');

const getItems = require('./database/scripts/getItems');
const insertItem = require('./database/scripts/insertItem');
const removeItem = require('./database/scripts/removeItem');

// Defining app, app cors, port

connectDB();

const app = express();

app.use(cors());

const port = 8080;

// Defining parsers

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// JWT verify

const secretKey = 'SecretION';

app.get('/UserAuth', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ auth: true, email: decoded.email, message: `Hello ${decoded.email}!` });
  } catch (err) {
    res.status(401).json({ auth: false, message: 'Invalid token' });
  }
});

// Fetching Storage Data

app.get('/storage/getItems', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);

    const items = await getItems(decoded.email);

    res.status(200).json(items);
  } catch (err) {
    res.status(404).json({ message: 'Failed to find items' });
  }
});

// Log In

app.post('/login', jsonParser, async (req, res) => {
  try {
    const postData = req.body;

    console.log(`Attempt to login:`);
    console.dir(postData);

    if (await loginVerify(postData.email, postData.password)) {
      const email = postData.email;
      const token = jwt.sign({ email }, secretKey, { expiresIn: 3600 });
      return res.status(201).json({ auth: true, token: token });
    } else return res.status(401).json({ message: 'Login Failed(wrong data)' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Registration failed',
    });
  }
});

// Registration new user

app.post('/registration', jsonParser, async (req, res) => {
  try {
    const postData = req.body;

    console.log(`Here is your registration data:`);
    console.dir(postData);

    if (await doesUserExists(postData.email)) {
      return res.status(400).json({ message: 'Such email already used' });
    }
    await insertRegistrationData(postData);
    const email = postData.email;
    const token = jwt.sign({ email }, secretKey, { expiresIn: 300 });
    return res.status(201).json({ auth: true, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Registration failed',
    });
  }
});

// Adding new item

app.post('/storage/addItem', jsonParser, async (req, res) => {
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
});

app.post('/storage/removeItem', jsonParser, async (req, res) => {
  try {
    const postData = req.body;

    console.log(`Here is your item data:`);
    console.dir(postData);

    if (await removeItem(postData)) return res.status(201).json({ message: 'Item Removed' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Item Removal failed',
    });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
