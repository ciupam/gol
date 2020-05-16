import QueryableWorker from "./QueryableWorker";
import SharedGrid from "./SharedGrid";

export default class WorkerManager {
  #workerNo = window.navigator.hardwareConcurrency - 1;
  #workers = [];
  #sharedGrid;
  #isGridDisplayed; // shared
  #sharedArrayBuffer;
  #sharedArrayBufferTmp;
  #sharedDisplayFlag;

  constructor(height, width) {
    this.#sharedArrayBuffer = new SharedArrayBuffer(height * width);
    this.#sharedArrayBufferTmp = new SharedArrayBuffer(height * width);
    this.#sharedDisplayFlag = new SharedArrayBuffer(1);
    this.#sharedGrid = new SharedGrid(
      this.#sharedArrayBuffer,
      this.#sharedArrayBufferTmp,
      this.#sharedDisplayFlag,
      height,
      width
    );

    this.#isGridDisplayed = new Int8Array(this.#sharedDisplayFlag);
    Atomics.exchange(this.#isGridDisplayed, 0, 0);

    for (let i = 0; i < this.#workerNo; i++) {
      this.#workers.push(new QueryableWorker());
      this.#workers[i].addListener("printStuff", (message) =>
        console.log(message)
      );
      this.#workers[i].addListener();
      this.#workers[i].sendQuery(
        "initSharedGrid",
        this.#sharedArrayBuffer,
        this.#sharedArrayBufferTmp,
        this.#sharedDisplayFlag,
        height,
        width
      );
    }
  }

  toggleDisplayFlag() {
    const flag = Atomics.load(this.#isGridDisplayed, 0);
    Atomics.exchange(this.#isGridDisplayed, 0, !!flag ? 0 : 1);
  }
}
