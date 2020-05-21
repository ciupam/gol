import "./styles/index.scss";
import "./styles/reset.css";

import { WorkerManager, Canvas, SharedGrid, GridInput } from "./modules";

const nextButton = document.querySelector(".button--start");

const gridHeight = 50;
const gridWidth = 100;

const gridInput = new GridInput(
  ".input--height > input",
  ".input--width > input"
);

const canvas = new Canvas("#canvas", gridInput.gridHeight, gridInput.gridWidth);

let workerManager = new WorkerManager(
  gridInput.gridHeight,
  gridInput.gridWidth
);
workerManager.initWebWorkers();

window.addEventListener("resize", () => {
  workerManager = new WorkerManager(gridInput.gridHeight, gridInput.gridWidth);
  workerManager.initWebWorkers();
  canvas.setGrid(gridInput.gridHeight, gridInput.gridWidth);
  render();
});

const render = () => {
  for (let i = 0; i < gridInput.gridHeight; i++)
    for (let j = 0; j < gridInput.gridWidth; j++)
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
