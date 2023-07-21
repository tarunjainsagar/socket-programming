class Game {
  constructor(io, room, players) {
    this.io = io;
    this.room = room;
    this.players = players;
    this.board = Array(9).fill(-1);
    this.currentPlayer = null;
    this.winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    this.moveHandler = this.moveHandler.bind(this);
    this.resignHandler = this.resignHandler.bind(this);
    this.disconnectHandler = this.disconnectHandler.bind(this);
  }

  start() {
    this.players[0].emit("start", "first");
    this.players[1].emit("start", "second");

    this.currentPlayer = this.players[0];

    this.players[0].on("move", (move) =>
      this.moveHandler(move, this.players[0])
    );
    this.players[0].on("resign", this.resignHandler);
    this.players[0].on("disconnect", this.disconnectHandler);

    this.players[1].on("move", (move) =>
      this.moveHandler(move, this.players[1])
    );
    this.players[1].on("resign", this.resignHandler);
    this.players[1].on("disconnect", this.disconnectHandler);
  }

  moveHandler(move, player) {
    if (player === this.currentPlayer) {
      if (this.isValidMove(move)) {
        this.makeMove(move);
        this.checkWinCondition();
        this.switchTurn();
      }
    }
  }

  resignHandler() {
    const winner = this.currentPlayer === this.players[0] ? "second" : "first";
    this.io
      .to(this.room)
      .emit("game-over", `Game won by ${winner} player due to resignation.`);
    this.end();
  }

  disconnectHandler() {
    const disconnectedPlayer = this.players.find((player) => !player.connected);
    const winner = disconnectedPlayer === this.players[0] ? "second" : "first";
    this.io
      .to(this.room)
      .emit(
        "game-over",
        `Game won by ${winner} player since ${
          winner === "second" ? "first" : "second"
        } player disconnected.`
      );
    this.end();
  }

  isValidMove(move) {
    return this.board[move - 1] === -1;
  }

  makeMove(move) {
    this.board[move - 1] = this.currentPlayer === this.players[0] ? "X" : "O";
    this.io.to(this.room).emit("board", this.board);
  }

  checkWinCondition() {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[a] !== -1 &&
        this.board[a] === this.board[b] &&
        this.board[b] === this.board[c]
      ) {
        const winner =
          this.currentPlayer === this.players[0] ? "first" : "second";
        this.io
          .to(this.room)
          .emit("game-over", `Game won by ${winner} player.`);
        this.end();
        return;
      }
    }

    if (this.board.every((cell) => cell !== -1)) {
      this.io.to(this.room).emit("game-over", "Game is tied.");
      this.end();
    }
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];
  }

  end() {
    this.players[0].removeListener("move", this.moveHandler);
    this.players[0].removeListener("resign", this.resignHandler);
    this.players[0].removeListener("disconnect", this.disconnectHandler);

    this.players[1].removeListener("move", this.moveHandler);
    this.players[1].removeListener("resign", this.resignHandler);
    this.players[1].removeListener("disconnect", this.disconnectHandler);

    this.players.forEach((player) => {
      player.leave(this.room);
    });
  }
}

module.exports = Game;
