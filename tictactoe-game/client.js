const io = require("socket.io-client");
const readline = require("readline");
const { createReadStream } = require("fs");

class Client {
  constructor(ip, port) {
    this.socket = io.connect(`http://${ip}:${port}`);
    this.rl = readline.createInterface({
      input: createReadStream("/dev/tty"),
      output: process.stdout,
      terminal: false,
    });

    this.socket.on("connect", () => {
      this.log(`connected to ${ip} ${port}`);
    });

    this.socket.on("start", (player) => {
      this.log(`Game started. You are the ${player} player.`);
    });

    this.socket.on("board", (board) => {
      this.displayBoard(board);
    });

    this.socket.on("game-over", (message) => {
      this.log(message);
      this.rl.close(); // Close the readline interface
      this.socket.disconnect();
      process.exit(0); // Exit the program
    });

    this.rl.on("line", (input) => {
      const command = input.trim();
      if (command === "r") {
        this.socket.emit("resign");
      } else if (command.match(/^\d$/)) {
        this.socket.emit("move", command);
      } else {
        this.log(
          "Invalid command. Please enter a valid move (1-9) or 'r' to resign."
        );
      }
    });

    this.rl.prompt();
  }

  log(message) {
    console.log(message);
  }

  displayBoard(board) {
    let formattedBoard = "";
    for (let i = 0; i < board.length; i++) {
      const cell = board[i];
      if (cell === -1) {
        formattedBoard += ".";
      } else {
        formattedBoard += cell;
      }
      if (i % 3 === 2) {
        formattedBoard += "\n";
      } else {
        formattedBoard += "";
      }
    }
    console.log(formattedBoard);
  }
}

const serverAddress = process.argv[2] || "127.0.0.1";
const serverPort = process.argv[3] || 5050;
new Client(serverAddress, serverPort);
