export default class SharedGrid {
  static #DEAD_CELL = 0;
  static #ALIVE_CELL = 1;
  #grid;
  #height;
  #width;

  constructor(sharedArrayBuffer, height, width) {
    if (!(sharedArrayBuffer instanceof SharedArrayBuffer))
      throw new TypeError(
        "SharedGrid.constructor requires instance of SharedArrayBuffer as first argument"
      );
    this.#height = height;
    this.#width = width;
    this.#grid = new Int8Array(sharedArrayBuffer);
  }

  clearGrid() {
    for (let i = 0; i < this.#height; i++)
      for (let j = 0; j < this.#width; j++)
        this.setCell(i, j, SharedGrid.#DEAD_CELL);
  }

  getCell(i, j) {
    const m = i >= this.#height ? 0 : i < 0 ? this.#height - 1 : i;
    const n = j >= this.#width ? 0 : j < 0 ? this.#width - 1 : j;
    return Atomics.load(this.#grid, m * this.#width + n);
  }

  setCell(i, j, value) {
    Atomics.exchange(this.#grid, i * this.#width + j, value);
  }

  getNeighbors(i, j) {
    const neighbors = [];
    for (let a = -1; a < 2; a++)
      for (let b = -1; b < 2; b++) neighbors.push(this.getCell(i + a, j + b));
    return neighbors;
  }

  getNextCellState(i, j) {
    const cell = this.getCell(i, j);
    const neighbors = this.getNeighbors(i, j);
    let alive = 0;
    neighbors.forEach((c) => {
      if (c === SharedGrid.#ALIVE_CELL) alive++;
    });
    return alive === 3
      ? SharedGrid.#ALIVE_CELL
      : cell === SharedGrid.#ALIVE_CELL && alive === 2
      ? SharedGrid.#ALIVE_CELL
      : SharedGrid.#DEAD_CELL;
  }
}
