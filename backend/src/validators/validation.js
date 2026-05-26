const { body } = require('express-validator');

exports.registerValidation = [
  body('name')
    .isLength({ min: 20, max: 60 })
    .withMessage('Name must be between 20 and 60 characters'),

  body('email')
    .isEmail()
    .withMessage('Invalid email'),

  body('password')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
    .withMessage(
      'Password must contain uppercase and special character'
    ),

  body('address')
    .isLength({ max: 400 })
    .withMessage('Address max length is 400')
];