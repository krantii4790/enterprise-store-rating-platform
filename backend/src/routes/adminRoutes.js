const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const roleMiddleware = require('../middleware/roleMiddleware');

const {
  dashboardStats,
  getAllUsers,
  getAllStores,
  addUser,
  addStore
} = require('../controllers/adminController');

router.use(authMiddleware);

router.use(roleMiddleware('ADMIN'));

router.get(
  '/dashboard',
  dashboardStats
);

router.get(
  '/users',
  getAllUsers
);

router.get(
  '/stores',
  getAllStores
);

router.post(
  '/users',
  addUser
);

router.post(
  '/stores',
  addStore
);

module.exports = router;