import { io } from "socket.io-client";

const SOCKET_URL = `${import.meta.env.VITE_SERVER_URL}`;

const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: 5, // Retry 5 times
  reconnectionDelay: 1000, // Start with 1 second delay
  reconnectionDelayMax: 5000, // Cap delay at 5 seconds
});

socket.on("connection", () => {
  console.log("Connected to server");
});

export default socket;
