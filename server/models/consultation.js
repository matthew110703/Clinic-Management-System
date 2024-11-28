const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
      required: [true, "Token is required"],
    },
    doctorName: {
      type: String,
      required: [true, "Doctor is required"],
    },
    diagnosis: {
      type: String,
      required: [true, "Diagnosis is required"],
    },
    medication: {
      type: [
        {
          type: String,
        },
      ],
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultation", consultationSchema);
