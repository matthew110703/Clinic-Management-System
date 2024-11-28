const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const User = require("../models/user");

const saltRounds = 10;

// Registration
router.post("/register", async (req, res) => {
  try {
    const { email, role, password, ...rest } = req.body;

    // Checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Creating the user
    const user = await User.create({
      email,
      role,
      password: hashedPassword,
      ...rest,
    });

    return res.status(201).json({
      message: "User created successfully",
      id: user._id,
      name: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is correct
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create and sign the token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// JWT TOKEN VALIDATION and Refresh Token

// verifyToken
router.get("/verify-token", async (req, res) => {
  const token = req.headers["authorization"];

  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(403).json({ error: "Invalid token" });
      }

      return res.status(200).json({ message: "Valid token" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// refreshToken

router.get("/refresh-token", async (req, res) => {
  const token = req.headers["authorization"];

  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(403).json({ error: "Invalid token" });
      }

      const newToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "3h" }
      );

      return res
        .status(200)
        .json({ message: "Token refreshed", token: newToken });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset Password

router.post("/reset-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the old password is correct
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Old password" });
    }

    // Hashing the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the password
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: "Password reseted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
