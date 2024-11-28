const router = require("express").Router();
const { validateId } = require("../middlewares/validateId");

const User = require("../models/user");

// GET all users or users by role
router.route("/").get(async (req, res) => {
  const { role } = req.query;
  try {
    let users;
    if (role) {
      // Fetch users based on role
      users = await User.find({ role });
    } else {
      // Fetch all users
      users = await User.find();
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET, PUT, DELETE user by ID
router
  .route("/:id")
  .get(validateId, async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id.toString());

      // Check if the user exists
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  .put(validateId, async (req, res) => {
    const { id } = req.params;
    const { clinicName, fullName, age, email, phone } = req.body;

    try {
      const user = await User.findById(id.toString());

      // Check if the user exists
      if (!user) return res.status(404).json({ message: "User not found" });

      // Update the user
      user.clinicName = clinicName || user.clinicName;
      user.fullName = fullName || user.fullName;
      user.age = age || user.age;
      user.email = email || user.email;
      user.phone = phone || user.phone;

      await user.save();

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  .delete(validateId, async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id.toString());

      // Check if the user exists
      if (!user) return res.status(404).json({ message: "User not found" });

      await user.deleteOne();

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

module.exports = router;
