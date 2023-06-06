import { body } from 'express-validator';

export const registrationValidator = () => {
  return [
    body('name', 'Make sure the name is entered correctly.').not().isEmpty(),
    body('email', 'Make sure that the email is entered correctly.').isEmail(),
    body('organization', 'Make sure the organization is entered correctly.').not().isEmpty(),
    body('password', 'Password must contain at least 5 characters.').isLength({ min: 5 }),
  ];
};

export const loginValidator = () => {
  return [
    body('email', 'Make sure that the email is entered correctly.').isEmail(),
    body('password', 'Make sure the password is entered correctly.').not().isEmpty(),
  ];
};
