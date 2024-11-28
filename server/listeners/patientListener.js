const mongoose = require("mongoose");

const Patient = require("../models/patient");
const changeStream = Patient.watch();

const patientListener = (socket) => {
  try {
    changeStream.on("change", (change) => {
      switch (change.operationType) {
        case "insert":
          socket.emit("newPatient", change.fullDocument);
          break;
        case "update":
          socket.emit("updatePatient", "Patient Updated");
          break;
        case "delete":
          socket.emit("deletePatient", "Patient Deleted");
          break;
        default:
          break;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = patientListener;
