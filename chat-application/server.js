const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./public/utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./public/utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = "Chat Bot";

// set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(
      /*not recommended to use socket id*/ socket.id,
      username,
      room
    );
    socket.join(user.room);

    const userList = getRoomUsers(user.room);
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: userList,
    });

    socket.emit(
      "message",
      formatMessage(botName, "Welcome to Chat Application")
    );

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const currentUser = getCurrentUser(socket.id);
    const user = userLeave(socket.id);

    if (currentUser) {
      io.to(currentUser.room).emit(
        "message",
        formatMessage(botName, `${currentUser.username} has left the chat`)
      );

      const userList = getRoomUsers(currentUser.room);
      io.to(currentUser.room).emit("roomUsers", {
        room: currentUser.room,
        users: userList,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
