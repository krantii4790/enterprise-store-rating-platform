const express = require('express');
const router = express.Router();

const { Store, Rating } = require('../models');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  try {

    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: {
        owner_id: ownerId
      }
    });

    if (!store) {
      return res.status(404).json({
        message: 'No store assigned'
      });
    }

    const ratings = await Rating.findAll({
      where: {
        store_id: store.id
      }
    });

    let averageRating = 0;

    if (ratings.length > 0) {
      averageRating =
        ratings.reduce((sum, r) => sum + r.rating, 0)
        / ratings.length;
    }

    res.json({
      store,
      ratings,
      averageRating: averageRating.toFixed(1)
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });
  }
});

module.exports = router;