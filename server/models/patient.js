const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
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
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    lastVisted: {
      type: Date,
    },
    medicalHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Consultation" },
    ],
  },
  { timestamps: true }
);

patientSchema.index({ fullName: 1 }); // Indexing the fullName field

module.exports = mongoose.model("Patient", patientSchema);
