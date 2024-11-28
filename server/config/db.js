const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((db) => {
      console.log(`MongoDB connected: ${db.connection.host}`);
    })
    .catch((err) => {
      console.log(`MongoDB connection failed: ${err}`);
      process.exit(1);
    });
};

module.exports = connectDB;
