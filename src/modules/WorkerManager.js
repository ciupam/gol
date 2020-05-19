import QueryableWorker from "./QueryableWorker";
import SharedGrid from "./SharedGrid";

export default class WorkerManager {
  #workerNo = window.navigator.hardwareConcurrency - 1;
  #workers = [];

  #sharedGrid;
  #isGridDisplayed; // shared

  // memory buffers
  #sharedArrayBuffer;
  #sharedArrayBufferTmp;
  #sharedDisplayFlag;

  constructor(height, width) {
    this.#sharedArrayBuffer = new SharedArrayBuffer(height * width);
    this.#sharedArrayBufferTmp = new SharedArrayBuffer(height * width);
    this.#sharedDisplayFlag = new SharedArrayBuffer(1);

    this.#sharedGrid = new SharedGrid();
    this.#sharedGrid.initSharedGrid(
      this.#sharedArrayBuffer,
      this.#sharedArrayBufferTmp,
      this.#sharedDisplayFlag,
      height,
      width
    );

    this.#isGridDisplayed = new Int8Array(this.#sharedDisplayFlag);
    Atomics.exchange(this.#isGridDisplayed, 0, 0);
  }

  initWebWorkers() {
    for (let i = 0; i < this.#workerNo; i++) {
      this.#workers.push(new QueryableWorker());
      this.#workers[i].addListener("printStuff", (message) =>
        console.log(message)
      );
      this.#workers[i].sendQuery(
        "initSharedGrid",
        this.#sharedArrayBuffer,
        this.#sharedArrayBufferTmp,
        this.#sharedDisplayFlag,
        this.#sharedGrid.height,
        this.#sharedGrid.width
      );
    }
  }

  scatterQuery(queryMethod, ...queryArguments) {
    for (let i = 0; i < this.#workerNo; i++)
      this.#workers[i].sendQuery(queryMethod, ...queryArguments);
  }

  getCellToDisplay(i, j) {
    return this.#sharedGrid.getCell(this.#sharedGrid.gridToDisplay(), i, j);
  }

  toggleCellToDisplay(i, j) {
    const gridToDisplay = this.#sharedGrid.gridToDisplay();
    this.#sharedGrid.setCell(
      gridToDisplay,
      i,
      j,
      this.#sharedGrid.getCell(gridToDisplay, i, j) === SharedGrid.DEAD_CELL
        ? SharedGrid.ALIVE_CELL
        : SharedGrid.DEAD_CELL
    );
  }

  toggleDisplayFlag() {
    const flag = Atomics.load(this.#isGridDisplayed, 0);
    Atomics.exchange(this.#isGridDisplayed, 0, !!flag ? 0 : 1);
  }

  calcNextState() {
    this.#sharedGrid.setNextShareState();
    this.toggleDisplayFlag();
  }
}
