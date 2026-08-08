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

// Get All Delegates
const getDelegates = async (req, res) => {
  try {
    const delegates = await Delegate.find().sort({
      createdAt: -1,
    });

    res.status(200).json(delegates);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Delegate
const getDelegateById = async (req, res) => {
  try {
    const delegate = await Delegate.findById(req.params.id);

    if (!delegate) {
      return res.status(404).json({
        success: false,
        message: "Delegate not found",
      });
    }

    res.status(200).json(delegate);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Delegate
const updateDelegate = async (req, res) => {
  try {
    const delegate = await Delegate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!delegate) {
      return res.status(404).json({
        success: false,
        message: "Delegate not found",
      });
    }

    res.status(200).json(delegate);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDelegate,
  getDelegates,
  getDelegateById,
  updateDelegate,
};