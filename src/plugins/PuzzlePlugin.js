const PuzzlePlugin = {

  init(config) {
    const size = config?.size || 3;
    const totalTiles = size * size;
    const tiles = Array(totalTiles).fill(0).map((_, i) => i === totalTiles - 1 ? null : i + 1);
    
    // Simple shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    return {
      tiles,
      size,
      moves: 0,
      status: "playing"
    }
  },

  move(state, index){
    if (state.status !== "playing") return state;
    
    const size = state.size;
    const empty = state.tiles.indexOf(null);

    const row = Math.floor(index / size);
    const col = index % size;

    const emptyRow = Math.floor(empty / size);
    const emptyCol = empty % size;

    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

    if(!isAdjacent) return state;

    const newTiles = [...state.tiles];
    newTiles[empty] = newTiles[index];
    newTiles[index] = null;

    const newState = {
      ...state,
      tiles: newTiles,
      moves: state.moves + 1
    };

    if (this.checkWin(newState)) {
        newState.status = "won";
    }

    return newState;
  },

  checkWin(state) {
    for (let i = 0; i < state.tiles.length - 1; i++) {
        if (state.tiles[i] !== i + 1) return false;
    }
    return state.tiles[state.tiles.length - 1] === null;
  },

  getScore(state, timeTaken) {
    return Math.max(0, 1000 - state.moves);
  }

}

export default PuzzlePlugin