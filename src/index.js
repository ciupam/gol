import "./styles/index.scss";
import "./styles/reset.css";

import {
  WorkerManager,
  Canvas,
  SharedGrid,
  GridInput,
  CheckboxManager,
} from "./modules";

const nextButton = document.querySelector(".button--start");
const clearButton = document.querySelector(".button--clear");
const randomizeButton = document.querySelector(".button--randomize");

const gridInput = new GridInput(
  ".input--height > input",
  ".input--width > input"
);

const canvas = new Canvas("#canvas", gridInput.gridHeight, gridInput.gridWidth);

const checkboxManager = new CheckboxManager(
  ".input--parallel > input",
  ".input--render > input"
);

let workerManager = new WorkerManager(
  gridInput.gridHeight,
  gridInput.gridWidth
);
workerManager.initWebWorkers();

window.addEventListener("resize", () => {
  canvas.setSize();
  render();
});

const render = () => {
  for (let i = 0; i < gridInput.gridHeight; i++)
    for (let j = 0; j < gridInput.gridWidth; j++)
      if (workerManager.getCellToDisplay(i, j) === SharedGrid.ALIVE_CELL)
        canvas.fillCellAlive(i, j);
      else canvas.fillCellDead(i, j);
};

const draw = () => {
  requestAnimationFrame(render);
};
draw();

let clicked = false;
window.addEventListener("gridChange", () => {
  if (clicked) {
    clicked = !clicked;
    clearTimeout(intervalId);
    nextButton.innerHTML = "Start";
  }
  workerManager.destroyWebWorkers();
  workerManager = new WorkerManager(gridInput.gridHeight, gridInput.gridWidth);
  workerManager.initWebWorkers();
  workerManager.scatterListener("gridAnswer", () => {
    if (workerManager.incrGridAnswer()) {
      workerManager.toggleDisplayFlag();
      window.dispatchEvent(rerenderEvent);
    }
  });
  canvas.setGrid(gridInput.gridHeight, gridInput.gridWidth);
  draw();
});

const rerenderEvent = new Event("rerender");
window.addEventListener("rerender", () => {
  if (checkboxManager.render) {
    draw();
  }
});

canvas.canvas.onmousedown = ({ offsetX, offsetY }) => {
  const cords = canvas.cordsToCell(offsetX, offsetY);
  const cell = workerManager.getCellToDisplay(...cords);

  if (cell === SharedGrid.ALIVE_CELL) canvas.fillCellDead(...cords);
  else canvas.fillCellAlive(...cords);

  workerManager.toggleCellToDisplay(...cords);
};

workerManager.scatterListener("gridAnswer", () => {
  if (workerManager.incrGridAnswer()) {
    workerManager.toggleDisplayFlag();
    window.dispatchEvent(rerenderEvent);
  }
});

let intervalId;
const timeoutNext = () => {
  intervalId = setInterval(() => {
    workerManager.calcNextStateParallel();
  }, 150);
};

nextButton.onclick = () => {
  clicked = !clicked;
  nextButton.innerHTML = clicked ? "Stop" : "Start";
  if (clicked) timeoutNext();
  else clearInterval(intervalId);
};

clearButton.onclick = () => {
  workerManager.clearDisplaySharedGrid();
  draw();
};

randomizeButton.onclick = () => {
  workerManager.randomizeDisplaySharedGrid();
  draw();
};
