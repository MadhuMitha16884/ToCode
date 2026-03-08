export function createGrid(size) {
  return Array(size).fill().map(() => Array(size).fill(0));
}