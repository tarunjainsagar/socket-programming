const { v4: uuidv4 } = require("uuid");
const Game = require("./Game");
const io = require("socket.io")();

class Server {
  constructor(port) {
    this.port = port;
    this.rooms = []; // Store the active game rooms
  }

  start() {
    io.on("connection", (socket) => {
      if (
        this.rooms.length === 0 ||
        this.rooms[this.rooms.length - 1].players.length === 2
      ) {
        // If no active rooms or the last room is full, create a new room
        const room = uuidv4();
        this.rooms.push({
          id: room,
          players: [socket],
        });
        socket.join(room);
      } else {
        // Add the player to the last room
        const lastRoom = this.rooms[this.rooms.length - 1];
        lastRoom.players.push(socket);
        socket.join(lastRoom.id);
      }

      if (this.rooms[this.rooms.length - 1].players.length === 2) {
        const currentRoom = this.rooms[this.rooms.length - 1];
        this.startGame(currentRoom);
      }
    });

    io.listen(this.port);
    console.log(`Server is running on port ${this.port}`);
  }

  startGame(room) {
    const { id, players } = room;
    const game = new Game(io, id, players);
    game.start();
  }
}

const port = process.argv[2] || 5050;
const server = new Server(port);
server.start();
