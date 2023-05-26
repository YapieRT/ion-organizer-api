import UserModel from '../database/models/UserModel.js';

import jwt from 'jsonwebtoken';

const secretKey = 'SecretION';

const doesUserExists = async (email) => {
  const inUse = await UserModel.findOne({ email });

  if (Object.is(inUse, null)) return false;
  else return true;
};

const loginVerify = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!Object.is(user, null)) {
    if (user.password == password) return true;
  }
  return false;
};

export const userAuth = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ auth: true, email: decoded.email, message: `Hello ${decoded.email}!` });
  } catch (err) {
    res.status(401).json({ auth: false, message: 'Invalid token' });
  }
};

export const login = async (req, res) => {
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
      message: 'Login failed',
    });
  }
};

export const registration = async (req, res) => {
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
};
