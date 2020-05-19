export default class Canvas {
  static DEAD_CELL_FILL = "white";
  static ALIVE_CELL_FILL = "black";
  static #HOVER_FILL = "gray";
  static #LINE_WIDTH = "1";

  #canvas;
  #ctx;

  #gridHeight;
  #gridWidth;
  #cellSize;

  constructor(queryString, gridHeight, gridWidth) {
    this.#canvas = document.querySelector(queryString);
    this.#ctx = this.#canvas.getContext("2d");
    this.setGrid(gridHeight, gridWidth);
  }

  get canvas() {
    return this.#canvas;
  }

  getParentWidth() {
    return this.#canvas.parentElement.clientWidth;
  }

  setGrid(gridHeight, gridWidth) {
    this.#gridHeight = gridHeight;
    this.#gridWidth = gridWidth;
    this.setSize();
  }

  getHeight() {
    return this.#canvas.scrollHeight;
  }

  getWidth() {
    return this.#canvas.scrollWidth;
  }

  setSize() {
    this.#cellSize = this.getParentWidth() / this.#gridWidth;
    this.#canvas.width = this.getParentWidth();
    this.#canvas.height = this.#cellSize * this.#gridHeight;
  }

  cellToCords(i, j) {
    return [j * this.#cellSize, i * this.#cellSize];
  }

  cordsToCell(x, y) {
    return [Math.floor(y / this.#cellSize), Math.floor(x / this.#cellSize)];
  }

  drawBorder(i, j, value) {
    this.#ctx.beginPath();
    this.#ctx.lineWidth = Canvas.#LINE_WIDTH;
    this.#ctx.strokeStyle = value;
    this.#ctx.rect(...this.cellToCords(i, j), this.#cellSize, this.#cellSize);
    this.#ctx.stroke();
  }

  // fill cell without borders
  fillCell(i, j, fill = Canvas.ALIVE_CELL_FILL) {
    const cords = this.cellToCords(i, j);
    cords[0] += 1;
    cords[1] += 1;

    this.#ctx.fillStyle = fill;
    this.#ctx.fillRect(...cords, this.#cellSize - 2, this.#cellSize - 2);
  }

  // fill whole cell with black color
  fillCellAlive(i, j) {
    const cords = this.cellToCords(i, j);
    this.#ctx.fillStyle = Canvas.ALIVE_CELL_FILL;
    this.#ctx.fillRect(...cords, this.#cellSize, this.#cellSize);
  }

  // fill whole cell with white color and then drawCell (looks better than just fillCell)
  fillCellDead(i, j) {
    const cords = this.cellToCords(i, j);
    this.#ctx.fillStyle = Canvas.DEAD_CELL_FILL;
    this.#ctx.fillRect(...cords, this.#cellSize, this.#cellSize);
    this.drawBorder(i, j, Canvas.ALIVE_CELL_FILL);
  }
}
