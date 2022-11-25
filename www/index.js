import { Universe } from "wasm-game-of-life";

let universe = Universe.new();
const eventLoop = () => {
  const contentElem = document.getElementById('content')
  universe.tick()
  contentElem.innerHTML = universe.render()
}

setInterval(eventLoop, 30)