const Consultation = require("../models/consultation");

const changeStream = Consultation.watch();

const consultationListener = (socket) => {
  try {
    changeStream.on("change", (change) => {
      switch (change.operationType) {
        case "insert":
          socket.emit("newConsultation", change.fullDocument);
          break;
        case "update":
          socket.emit("updateConsultation", "Consultation Updated");
          break;
        case "delete":
          socket.emit("deleteConsultation", "Consultation Deleted");
          break;
        default:
          break;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = consultationListener;
