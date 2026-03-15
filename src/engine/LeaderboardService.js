export function getScores(game, difficulty) {
  const data = localStorage.getItem("greedygrid_leaderboard")
  const scores = data ? JSON.parse(data) : []
  
  if (!game || !difficulty) return scores;

  return scores.filter(s => s.game === game && s.difficulty === difficulty);
}

export function submitScore(game, difficulty, player, scoreVal, time) {
  const data = localStorage.getItem("greedygrid_leaderboard")
  const scores = data ? JSON.parse(data) : []
  
  scores.push({ game, difficulty, player, score: scoreVal, time, date: new Date().toISOString() })
  
  localStorage.setItem("greedygrid_leaderboard", JSON.stringify(scores))
}