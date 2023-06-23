const path = require("path");
// http server
const app = require("express")();
const http = require("http").Server(app);

const port = process.env.PORT || 3000;

// attach http server to the socket.io
const io = require("socket.io")(http);

// route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

// create a new connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("message", (msg) => {
    console.log("Client message: " + msg);
  });

  // emit event
  socket.emit("server", "Received from server");
  socket.emit("server1", "Received from server1");
});

// http-server port
http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
