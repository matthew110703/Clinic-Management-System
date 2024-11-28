const router = require("express").Router();
const { validateId } = require("../middlewares/validateId");

const Token = require("../models/token");
const Patient = require("../models/patient");

// GET all tokens or tokens by status or patient ID or other criteria
router.route("/").get(async (req, res) => {
  const { page = 1, limit = 10, status, orderBy, byDate } = req.query;

  try {
    // Prepare sort options
    let sortOptions = {};
    if (orderBy) {
      // Split the order parameter into field and direction
      const orderFields = orderBy.split(",");
      orderFields.forEach((field) => {
        const [fieldName, direction] = field.split(":");
        sortOptions[fieldName] =
          direction === "desc" || direction === "-1" ? -1 : 1;
      });
    }

    // Prepare query object for finding tokens
    let query = {};
    if (status) query.status = status;
    if (byDate) query.createdAt = { $gte: new Date(byDate) };

    // Count total documents based on query
    const totalTokens = await Token.countDocuments(query);

    // Check if there are no tokens
    if (totalTokens === 0) {
      return res.status(400).json({ message: "No tokens found" });
    }

    // Fetch tokens based on the prepared query and sorting
    const tokens = await Token.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sortOptions)
      .populate("patient", "fullName phone");

    res.status(200).json({
      currentPage: page,
      totalTokens,
      totalPages: Math.ceil(totalTokens / limit),
      tokens,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET, PUT, DELETE token by ID
router
  .route("/:id")
  // Fetch token by ID
  .get(validateId, async (req, res) => {
    const { id } = req.params;

    try {
      const token = await Token.findById(id.toString()).populate(
        "patient",
        "fullName phone"
      );

      // Check if the token exists
      if (!token) return res.status(404).json({ message: "Token not found" });

      res.status(200).json(token);
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  // Update token by ID
  .put(validateId, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const token = await Token.findById(id.toString()).populate(
        "patient",
        "fullName phone"
      );

      // Check if the token exists
      if (!token) return res.status(404).json({ message: "Token not found" });

      // Update the token
      token.status = status || token.status;

      await token.save();

      res.status(200).json({ message: "Token updated successfully", token });
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  // Delete token by ID
  .delete(validateId, async (req, res) => {
    const { id } = req.params;

    try {
      const token = await Token.findById(id.toString()).populate(
        "patient",
        "fullName phone"
      );

      // Check if the token exists
      if (!token) return res.status(404).json({ message: "Token not found" });

      await token.deleteOne();

      res.status(200).json({ message: "Token deleted successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

module.exports = router;
