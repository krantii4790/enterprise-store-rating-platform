const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const roleMiddleware = require('../middleware/roleMiddleware');

const {
  getStores,
  submitRating,
  updatePassword
} = require('../controllers/userController');

router.use(authMiddleware);

router.use(roleMiddleware('USER'));

router.get('/stores', getStores);

router.post('/rate', submitRating);

router.put('/password', updatePassword);

module.exports = router;