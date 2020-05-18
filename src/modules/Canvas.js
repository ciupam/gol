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
    return this.#canvas.parentElement.scrollWidth;
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

  drawCell(i, j) {
    this.#ctx.beginPath();
    this.#ctx.lineWidth = Canvas.#LINE_WIDTH;
    this.#ctx.rect(...this.cellToCords(i, j), this.#cellSize, this.#cellSize);
    this.#ctx.stroke();
  }

  drawGrid() {
    for (let i = 0; i < this.#gridHeight; i++)
      for (let j = 0; j < this.#gridWidth; j++) this.drawCell(i, j);
  }

  fillCell(i, j, fill = Canvas.ALIVE_CELL_FILL) {
    this.#ctx.fillStyle = fill;
    this.#ctx.fillRect(
      ...this.cellToCords(i, j),
      this.#cellSize,
      this.#cellSize
    );
  }
}
