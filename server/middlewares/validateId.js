const mongoose = require("mongoose");

// Middleware to check if the provided ID is a valid MongoDB ObjectId
const validateId = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Patient ID format" });
  }

  next();
};

module.exports = { validateId };
