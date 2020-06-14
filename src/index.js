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

let workerManager;

window.addEventListener("resize", () => {
  canvas.setSize();
  draw();
});

const render = () => {
  for (let i = 0; i < gridInput.gridHeight; i++)
    for (let j = 0; j < gridInput.gridWidth; j++)
      if (workerManager.getCellToDisplay(i, j) === SharedGrid.ALIVE_CELL)
        canvas.fillCellAlive(i, j);
      else canvas.fillCellDead(i, j);
};

const draw = () => {
  if (checkboxManager.render) {
    requestAnimationFrame(render);
  }
};
draw();

let dateNow;
let timeoutId;
const initWorkerManager = () => {
  workerManager = new WorkerManager(gridInput.gridHeight, gridInput.gridWidth);
  workerManager.initWebWorkers();
  workerManager.scatterListener("gridAnswer", () => {
    if (
      workerManager.incrGridAnswer(checkboxManager.parallel ? undefined : 1)
    ) {
      console.log(new Date() - dateNow - 100);
      dateNow = new Date();
      workerManager.toggleDisplayFlag();
      window.dispatchEvent(rerenderEvent);
      if (clicked) {
        timeoutId = setTimeout(calcNextState, 100);
      }
    }
  });
};
initWorkerManager();

const calcNextState = () => {
  workerManager.calcNextStateParallel(checkboxManager.parallel ? undefined : 1);
};

let clicked = false;
nextButton.onclick = () => {
  clicked = !clicked;
  nextButton.innerHTML = clicked ? "Stop" : "Start";
  if (clicked) {
    dateNow = new Date();
    calcNextState();
  } else {
    clearTimeout(timeoutId);
  }
};

window.addEventListener("gridChange", () => {
  if (clicked) {
    clicked = !clicked;
    nextButton.innerHTML = "Start";
  } else {
    clearTimeout(timeoutId);
  }

  workerManager.destroyWebWorkers();
  initWorkerManager();

  canvas.setGrid(gridInput.gridHeight, gridInput.gridWidth);

  draw();
});

const rerenderEvent = new Event("rerender");
window.addEventListener("rerender", () => {
  draw();
});

canvas.canvas.onmousedown = ({ offsetX, offsetY }) => {
  const cords = canvas.cordsToCell(offsetX, offsetY);
  const cell = workerManager.getCellToDisplay(...cords);

  if (cell === SharedGrid.ALIVE_CELL) canvas.fillCellDead(...cords);
  else canvas.fillCellAlive(...cords);

  workerManager.toggleCellToDisplay(...cords);
};

clearButton.onclick = () => {
  workerManager.clearDisplaySharedGrid();
  draw();
};

randomizeButton.onclick = () => {
  workerManager.randomizeDisplaySharedGrid();
  draw();
};
