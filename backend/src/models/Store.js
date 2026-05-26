const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');

const Store = sequelize.define(
  'Store',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      unique: true
    },

    address: {
      type: DataTypes.STRING
    },

    owner_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'stores',

    timestamps: false
  }
);

module.exports = Store;