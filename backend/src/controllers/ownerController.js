const Store = require('../models/Store');

const Rating = require('../models/Rating');

exports.ownerDashboard = async (req, res) => {

  try {

    const stores = await Store.findAll({

      where: {
        owner_id: req.user.id
      },

      include: [
        {
          model: Rating
        }
      ]

    });

    const formattedStores = stores.map((store) => {

      const ratings = store.Ratings || [];

      const averageRating =
        ratings.length > 0
          ? (
              ratings.reduce(
                (sum, r) => sum + r.rating,
                0
              ) / ratings.length
            ).toFixed(1)
          : 0;

      return {
        ...store.toJSON(),
        averageRating
      };
    });

    res.json(formattedStores);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};