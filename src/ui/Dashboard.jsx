import { motion } from "framer-motion"
import { useState } from "react"
import gamesConfig from "../configs"

export default function Dashboard({ setGame, setDifficulty }) {

  const [selectedDifficulties, setSelectedDifficulties] = useState(
    Object.keys(gamesConfig).reduce((acc, key) => {
      acc[key] = Object.keys(gamesConfig[key].difficulties)[0];
      return acc;
    }, {})
  )

  const handleDifficultyChange = (gameKey, diff) => {
    setSelectedDifficulties(prev => ({ ...prev, [gameKey]: diff }))
  }

  const handleStart = (gameKey) => {
    setDifficulty(selectedDifficulties[gameKey])
    setGame(gameKey)
  }

  return (
    <div className="center" style={{ padding: "2rem" }}>

      <motion.h1 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: "1rem", fontSize: "3rem" }}
      >
        GreedyGrid Game Engine
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: "2rem", color: "#aaa" }}
      >
        Select a game to play
      </motion.p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", width: "100%", maxWidth: "1000px" }}>
        
        {Object.entries(gamesConfig).map(([key, config], index) => {
          
          const accents = {
            puzzle: "linear-gradient(135deg, #f6d365, #fda085)",
            "2048": "linear-gradient(135deg, #f2b179, #f65e3b)",
            sudoku: "linear-gradient(135deg, #4facfe, #00f2fe)",
            memory: "linear-gradient(135deg, #6e8efb, #a777e3)"
          }

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              style={{
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                textAlign: "center",
                overflow: "hidden"
              }}
            >
              <div style={{ background: accents[key], padding: "1.5rem 1rem", color: "#fff" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{config.icon}</div>
                <h2 style={{ margin: 0, fontSize: "1.8rem", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                  {config.name}
                </h2>
              </div>

              <p style={{ padding: "0 1.5rem", marginTop: "1.5rem", fontSize: "0.95rem", color: "#ccc", textAlign: "left" }}>
                {config.description}
              </p>
              
              <div style={{ padding: "0 1.5rem 1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <label style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "#aaa", textAlign: "left" }}>
                  Difficulty:
                </label>
                <select 
                  value={selectedDifficulties[key]} 
                  onChange={(e) => handleDifficultyChange(key, e.target.value)}
                  style={{ padding: "0.8rem", borderRadius: "8px", marginBottom: "1.5rem", background: "rgba(0,0,0,0.4)", color: "white", border: "1px solid rgba(255,255,255,0.2)", fontSize: "1rem", outline: "none" }}
                >
                  {Object.keys(config.difficulties).map(diff => (
                    <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
                  ))}
                </select>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStart(key)}
                  style={{
                    marginTop: "auto",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "none",
                    background: accents[key],
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                  }}
                >
                  Play {config.name}
                </motion.button>
              </div>
            </motion.div>
          )
        })}

      </div>
    </div>
  )
}