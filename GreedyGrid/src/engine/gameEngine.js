export class GameEngine {
  constructor(config) {
    this.config = config;
    this.board = [];
  }

  initializeBoard() {
    const size = this.config.boardSize;
    this.board = Array(size).fill().map(() => Array(size).fill(null));
  }

  start() {
    this.initializeBoard();
    console.log(`Game started: ${this.config.gameName}`);
  }
}