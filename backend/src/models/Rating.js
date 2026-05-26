const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');

const Rating = sequelize.define(
  'Rating',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER
    },

    store_id: {
      type: DataTypes.INTEGER
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'ratings',

    timestamps: false
  }
);

module.exports = Rating;