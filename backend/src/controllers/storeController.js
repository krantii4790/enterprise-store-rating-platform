const Store = require('../models/Store');

exports.getStores = async (req, res) => {
  try {

    const stores = await Store.findAll();

    res.json(stores);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};