import { Universe, Cell } from "wasm-game-of-life";
import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg'

const CELL_SIZE = 5 // px
const GRID_COLOR = "#CCCCCC"
const DEAD_COLOR = "#FFFFFF"
const ALIVE_COLOR = "#000000"

const universe = Universe.new()
const width = universe.width()
const height = universe.height()

const canvas = document.getElementById('game-of-life')
const BLOCK_SIZE = CELL_SIZE + 1
canvas.height = BLOCK_SIZE * height  + 1
canvas.width = BLOCK_SIZE * width + 1

const ctx = canvas.getContext('2d')

const eventLoop = () => {
  universe.tick()
  drawGrid()
  drawCells()
}

const drawGrid = () => {
  ctx.beginPath()
  ctx.strokeStyle = GRID_COLOR

  for(let i = 0; i <= width; i++) {
    const start = i * BLOCK_SIZE + 1
    ctx.moveTo(start, 0)
    ctx.lineTo(start, BLOCK_SIZE * height + 1)
  }

  for (let i = 0; i <= height; i++) {
    const end = i * BLOCK_SIZE + 1
    ctx.moveTo(0, end)
    ctx.lineTo(BLOCK_SIZE * width + 1 , end)
  }

  ctx.stroke()
}

const getIndex = (row, col) => {
  return row * width + col
}

const drawCells = () => {
  const cellsPtr = universe.cells()
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)

  ctx.beginPath()

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const index = getIndex(row, col)
      ctx.fillStyle = cells[index] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR

      ctx.fillRect(
        col * BLOCK_SIZE + 1,
        row * BLOCK_SIZE + 1,
        CELL_SIZE,
        CELL_SIZE
      )
    }
  }

  ctx.stroke()
}

setInterval(eventLoop, 30)