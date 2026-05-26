const express = require('express');

const router = express.Router();

const {
  register,
  login
} = require('../controllers/authController');

const {
  registerValidation
} = require('../validators/validation');

router.post('/register', registerValidation, register);

router.post('/login', login);

module.exports = router;