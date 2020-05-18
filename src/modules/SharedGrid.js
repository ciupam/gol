export default class SharedGrid {
  static #DEAD_CELL = 0;
  static #ALIVE_CELL = 1;
  #grid; // shared
  #gridTmp; // shared
  #height;
  #width;
  #isGridDisplayed; // shared

  initSharedGrid(
    sharedArrayBuffer,
    sharedArrayBufferTmp,
    sharedDisplayFlag,
    height,
    width
  ) {
    if (
      !(
        sharedArrayBuffer instanceof SharedArrayBuffer &&
        sharedArrayBufferTmp instanceof SharedArrayBuffer &&
        sharedDisplayFlag instanceof SharedArrayBuffer
      )
    )
      throw new TypeError(
        "SharedGrid.constructor requires instance of SharedArrayBuffer as first, second and third argument"
      );
    this.#height = height;
    this.#width = width;
    this.#grid = new Int8Array(sharedArrayBuffer);
    this.#gridTmp = new Int8Array(sharedArrayBufferTmp);
    this.#isGridDisplayed = new Int8Array(sharedDisplayFlag);
  }

  gridToWrite() {
    return !!Atomics.load(this.#isGridDisplayed, 0)
      ? this.#gridTmp
      : this.#grid;
  }

  gridToDisplay() {
    return !!Atomics.load(this.#isGridDisplayed, 0)
      ? this.#grid
      : this.#gridTmp;
  }

  clearGrid() {
    for (let i = 0; i < this.#height; i++)
      for (let j = 0; j < this.#width; j++)
        this.setCell(i, j, SharedGrid.#DEAD_CELL);
  }

  getCell(grid, i, j) {
    if (!(grid instanceof Int8Array))
      throw new TypeError(
        "SharedGrid.getCell requires Int8Array as first argument"
      );
    const m = i >= this.#height ? 0 : i < 0 ? this.#height - 1 : i;
    const n = j >= this.#width ? 0 : j < 0 ? this.#width - 1 : j;
    return Atomics.load(this.#grid, m * this.#width + n);
  }

  setCell(i, j, value) {
    Atomics.exchange(this.gridToWrite(), i * this.#width + j, value);
  }

  getCoords(x) {
    if (x < this.#width * this.#height) {
      let i = Math.floor(x / this.#width);
      let j = x - i * this.#width;
      return [i, j];
    }
    return [0, 0];
  }

  getArrayCell(grid, x) {
    if (!(grid instanceof Int8Array))
      throw new TypeError(
        "SharedGrid.getCell requires Int8Array as first argument"
      );
    return this.getCell(grid, ...this.getCoords(x));
  }

  setArrayCell(x, value) {
    this.setCell(...this.getCoords(x), value);
  }

  getNextArrayCellState(x) {
    return this.getNextCellState(...this.getCoords(x));
  }

  getNeighbors(i, j) {
    const neighbors = [];
    for (let a = -1; a < 2; a++)
      for (let b = -1; b < 2; b++)
        neighbors.push(this.getCell(this.gridToDisplay(), i + a, j + b));
    return neighbors;
  }

  getNextCellState(i, j) {
    const cell = this.getCell(this.gridToDisplay(), i, j);
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
