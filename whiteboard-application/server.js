const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  socket.on("draw", function (position) {
    socket.broadcast.emit("draw", position);
  });

  socket.on("startDrawing", function (position) {
    socket.broadcast.emit("startDrawing", position);
  });

  socket.on("endDrawing", function () {
    socket.broadcast.emit("endDrawing");
  });
});

const port = 3000;
http.listen(port, function () {
  console.log("Server listening on port " + port);
});
