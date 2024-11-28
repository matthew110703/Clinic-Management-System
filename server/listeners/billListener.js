const Bill = require("../models/bill");

const changeStream = Bill.watch();

const billListener = (socket) => {
  changeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        socket.emit("newBill", change.fullDocument);
        break;
      case "update":
        socket.emit("updateBill", "Bill Updated");
        break;
      case "delete":
        socket.emit("deleteBill", "Bill Deleted");
        break;
      default:
        break;
    }
  });
};

module.exports = billListener;
