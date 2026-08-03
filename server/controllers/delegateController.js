const Delegate = require("../models/Delegate");

// Create Delegate
const createDelegate = async (req, res) => {
  try {
    const delegate = await Delegate.create(req.body);

    res.status(201).json(delegate);
  } catch (error) {
    res.status(400).json({
  success: false,
  message: error.message,
});
  }
};

module.exports = {
  createDelegate,
};