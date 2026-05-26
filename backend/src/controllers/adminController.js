const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');


exports.addStore = async (req, res) => {

  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      owner_id
    });

    res.status(201).json({
      message: 'Store added successfully',
      store
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};
exports.dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();

    const totalStores = await Store.count();

    const totalRatings = await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'address', 'role']
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllStores = async (req, res) => {
  try {

    const stores = await Store.findAll();

    res.json(stores);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.addUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    res.status(201).json({
      message: 'User created successfully',
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.addStore = async (req, res) => {
  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      owner_id
    });

    res.status(201).json({
      message: 'Store created successfully',
      store
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};