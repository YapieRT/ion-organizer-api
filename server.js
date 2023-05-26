import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Database functions

import * as userController from './controllers/userController.js';
import * as itemController from './controllers/itemController.js';

import { connectDB } from './database/connectDB.js';

// Defining app, app cors, port

connectDB();

const app = express();

app.use(cors());

const port = 8080;

// Defining parser

const jsonParser = bodyParser.json();

// JWT verify

app.get('/UserAuth', userController.userAuth);

// Fetching Storage Data

app.get('/storage/getItems', itemController.getItems);

// Log In

app.post('/login', jsonParser, userController.login);

// Registration new user

app.post('/registration', jsonParser, userController.registration);

// Add new item

app.post('/storage/addItem', jsonParser, itemController.addItem);

// Remove item

app.post('/storage/removeItem', jsonParser, itemController.removeItem);

// Listening

app.listen(port, () => console.log(`Server running on port ${port}`));
