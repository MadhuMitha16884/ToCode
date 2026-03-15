import { useState } from "react"
import Dashboard from "./ui/Dashboard"
import GameContainer from "./ui/GameContainer"

import PluginManager from "./engine/PluginManager"
import PuzzlePlugin from "./plugins/PuzzlePlugin"
import Game2048Plugin from "./plugins/Game2048Plugin"
import SudokuPlugin from "./plugins/SudokuPlugin"

PluginManager.register("puzzle", PuzzlePlugin)
PluginManager.register("2048", Game2048Plugin)
PluginManager.register("sudoku", SudokuPlugin)

function App() {

  const [game, setGame] = useState(null)
  const [difficulty, setDifficulty] = useState("easy")

  if (!game) {
    return <Dashboard setGame={setGame} setDifficulty={setDifficulty} />
  }

  return <GameContainer game={game} difficulty={difficulty} setGame={setGame} />
}

export default App