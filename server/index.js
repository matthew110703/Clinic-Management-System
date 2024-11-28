const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(logger("common")); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON data
app.use(cors()); // Enable CORS for all requests
connectDB(); // Testing the db connection

// Http Server
const http = require("http").Server(app);

// Socket.io Initialization
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

// Socket.io Listeners
const patientListener = require("./listeners/patientListener");
const tokenListener = require("./listeners/tokenListener");
const consultationListener = require("./listeners/consultationListener");
const billListener = require("./listeners/billListener");

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Listeners
  patientListener(socket);
  tokenListener(socket);
  consultationListener(socket);
  billListener(socket);
});

// Auth
app.use("/auth", require("./auth"));

// Routes
app.use("/users", require("./routes/user"));
app.use("/patients", require("./routes/patient"));
app.use("/tokens", require("./routes/token"));
app.use("/consultations", require("./routes/consultation"));
app.use("/bills", require("./routes/bill"));

http.listen(3000, () => {
  console.log("Server is running on port 3000");
});
