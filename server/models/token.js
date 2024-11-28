const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    tokenNo: {
      type: Number,
      required: [true, "Token is required"],
      unique: true,
    },
    status: {
      type: String,
      enum: ["waiting", "consulting", "served", "cancelled"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

tokenSchema.index({ patient: 1, status: 1 }); // Indexing the patient field

module.exports = mongoose.model("Token", tokenSchema);
