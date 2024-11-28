const mongoose = require("mongoose");
const patient = require("./patient");

const billSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: [true, "Consultation is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
