const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      required: [true, "Clinic name is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["doctor", "receptionist"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
