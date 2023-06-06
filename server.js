import express from 'express';
import cors from 'cors';

// Database functions

import * as userController from './controllers/userController.js';
import * as itemController from './controllers/itemController.js';

import { connectDB } from './database/connectDB.js';

// Defining app, app cors, port

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const port = 8080;

// JWT verify

app.get('/api/UserAuth', userController.userAuth);

// Fetching Storage Data

app.get('/api/storage/getItems', itemController.getItems);

// Log In

app.post('/api/login', userController.login);

// Registration new user

app.post('/api/registration', userController.registration);

// Add new item

app.post('/api/storage/addItem', itemController.addItem);

// Remove item

app.delete('/api/storage/removeItem', itemController.removeItem);

// Listening

app.listen(port, () => console.log(`Server running on port ${port}`));
