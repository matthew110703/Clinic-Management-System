const Token = require("../models/token");
const changeStream = Token.watch();

const tokenListener = (socket) => {
  try {
    changeStream.on("change", (change) => {
      switch (change.operationType) {
        case "insert":
          socket.emit("newToken", change.fullDocument);
          break;
        case "update":
          socket.emit("updateToken", "Token Updated");
          break;
        case "delete":
          socket.emit("deleteToken", "Token Deleted");
          break;
        default:
          break;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = tokenListener;
