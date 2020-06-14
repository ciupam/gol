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

  #receivedGridAnswers = 0;

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

  destroyWebWorkers() {
    for (let i = 0; i < this.#workerNo; i++) {
      this.#workers[i].destroyWorker();
    }
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

  scatterListener(name, listener) {
    for (let i = 0; i < this.#workerNo; i++)
      this.#workers[i].addListener(name, listener);
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

  calcNextStateParallel(n = this.#workerNo) {
    this.#receivedGridAnswers = 0;
    if (n > this.#workerNo) n = this.#workerNo;

    const len = this.#sharedGrid.height * this.#sharedGrid.width;
    const mod = len % n;
    const share = Math.floor(len / n);

    const a = n - mod;

    for (let i = 0; i < a; i++)
      this.#workers[i].sendQuery(
        "setNextShareState",
        i * share,
        (i + 1) * share
      );

    const offset = share * a;

    for (let i = a; i < n; i++)
      this.#workers[i].sendQuery(
        "setNextShareState",
        offset + (i - a) * (share + 1),
        offset + (i - a + 1) * (share + 1)
      );
  }

  clearDisplaySharedGrid() {
    this.#sharedGrid.clearGrid(this.#sharedGrid.gridToDisplay());
  }

  randomizeDisplaySharedGrid() {
    this.#sharedGrid.randomizeGrid(this.#sharedGrid.gridToDisplay());
  }

  // true if answers received from all threads, false - otherwise
  incrGridAnswer(n = this.#workerNo) {
    if (n > this.#workerNo) n = this.#workerNo;
    if (++this.#receivedGridAnswers >= n) {
      this.#receivedGridAnswers = 0;
      return true;
    }

    return false;
  }
}
