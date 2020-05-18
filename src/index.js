import "./styles/index.scss";
import "./styles/reset.css";

import { WorkerManager, Canvas, SharedGrid } from "./modules";

const gridHeight = 8;
const gridWidth = 10;

const canvas = new Canvas("#canvas", gridHeight, gridWidth);
const workerManager = new WorkerManager(gridHeight, gridWidth);
workerManager.initWebWorkers();

window.addEventListener("resize", () => {
  canvas.setSize();
  render();
});

const render = () => {
  canvas.drawGrid();
};
render();

canvas.canvas.onmousedown = ({ offsetX, offsetY }) => {
  const cords = canvas.cordsToCell(offsetX, offsetY);
  const cell = workerManager.getCellToDisplay(...cords);
  console.log(cell);
  canvas.fillCell(
    ...cords,
    cell === SharedGrid.DEAD_CELL
      ? Canvas.ALIVE_CELL_FILL
      : Canvas.DEAD_CELL_FILL
  );
  workerManager.toggleCellToDisplay(...cords);
};
