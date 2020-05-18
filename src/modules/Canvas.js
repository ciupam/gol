export default class Canvas {
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

  drawCell(i, j) {
    this.#ctx.beginPath();
    this.#ctx.rect(...this.cellToCords(i, j), this.#cellSize, this.#cellSize);
    this.#ctx.stroke();
  }
}
