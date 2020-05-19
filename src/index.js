import "./styles/index.scss";
import "./styles/reset.css";

import { WorkerManager, Canvas, SharedGrid } from "./modules";

const nextButton = document.querySelector(".button--start");
const heightInput = document.querySelector(".input--height > input");
heightInput.oninput = () => console.log(heightInput.value, heightInput.max);

const gridHeight = 50;
const gridWidth = 100;

const canvas = new Canvas("#canvas", gridHeight, gridWidth);
const workerManager = new WorkerManager(gridHeight, gridWidth);
workerManager.initWebWorkers();

window.addEventListener("resize", () => {
  canvas.setSize();
  render();
});

const render = () => {
  for (let i = 0; i < gridHeight; i++)
    for (let j = 0; j < gridWidth; j++)
      if (workerManager.getCellToDisplay(i, j) === SharedGrid.ALIVE_CELL)
        canvas.fillCellAlive(i, j);
      else canvas.fillCellDead(i, j);
};
render();

canvas.canvas.onmousedown = ({ offsetX, offsetY }) => {
  const cords = canvas.cordsToCell(offsetX, offsetY);
  const cell = workerManager.getCellToDisplay(...cords);

  if (cell === SharedGrid.ALIVE_CELL) canvas.fillCellDead(...cords);
  else canvas.fillCellAlive(...cords);

  workerManager.toggleCellToDisplay(...cords);
};

nextButton.onclick = () => {
  workerManager.calcNextState();
  render();
};
