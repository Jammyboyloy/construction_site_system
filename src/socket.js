import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export const connectSocket = (userId) => {
  if (!userId) return;

  const normalizedUserId = String(userId);

  if (socket.connected && socket.auth?.userId === normalizedUserId) return;

  if (socket.connected) {
    socket.disconnect();
  }

  socket.auth = { userId: normalizedUserId };

  socket.off("connect");
  socket.off("connect_error");

  socket.on("connect", () => {
    socket.emit("register", normalizedUserId);
    console.log("Socket connected:", {
      socketId: socket.id,
      userId: normalizedUserId,
    });
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
};

export default socket;
