const bcrypt = require('bcryptjs');

const User = require('../models/User');

const Store = require('../models/Store');

const Rating = require('../models/Rating');

const sequelize = require('../config/db');


// GET STORES

exports.getStores = async (
  req,
  res
) => {

  try {

    const stores =
      await Store.findAll({

        attributes: {

          include: [

            [
              sequelize.literal(`(
                SELECT ROUND(
                  AVG(rating),
                  1
                )
                FROM ratings
                WHERE ratings.store_id = Store.id
              )`),

              'averageRating'
            ]

          ]
        }
      });

    res.json(stores);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// SUBMIT RATING

exports.submitRating = async (
  req,
  res
) => {

  try {

    const {
      store_id,
      rating
    } = req.body;

    if (
      rating < 1 ||
      rating > 5
    ) {

      return res.status(400).json({

        message:
          'Rating must be between 1 and 5'
      });
    }

    const existingRating =
      await Rating.findOne({

        where: {

          user_id: req.user.id,

          store_id
        }
      });

    if (existingRating) {

      existingRating.rating =
        rating;

      await existingRating.save();

      return res.json({

        message:
          'Rating updated successfully'
      });
    }

    await Rating.create({

      user_id: req.user.id,

      store_id,

      rating
    });

    res.json({

      message:
        'Rating submitted successfully'
    });

  } catch (error) {

    res.status(500).json({

      message: error.message
    });
  }
};


// UPDATE PASSWORD

exports.updatePassword = async (
  req,
  res
) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const user =
      await User.findByPk(
        req.user.id
      );

    if (!user) {

      return res.status(404).json({

        message: 'User not found'
      });
    }

    const validPassword =
      await bcrypt.compare(

        oldPassword,

        user.password
      );

    if (!validPassword) {

      return res.status(401).json({

        message:
          'Old password incorrect'
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    res.json({

      message:
        'Password updated successfully'
    });

  } catch (error) {

    res.status(500).json({

      message: error.message
    });
  }
};