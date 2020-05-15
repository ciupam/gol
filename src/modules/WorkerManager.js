import QueryableWorker from "./QueryableWorker";
import SharedGrid from "./SharedGrid";

export default class WorkerManager {
  #workerNo = window.navigator.hardwareConcurrency - 1;
  #workers = [];
  #sharedGrid;
  #sharedArrayBuffer;

  constructor(height, width) {
    this.#sharedArrayBuffer = new SharedArrayBuffer(height * width);
    this.#sharedGrid = new SharedGrid(this.#sharedArrayBuffer, height, width);

    for (let i = 0; i < this.#workerNo; i++)
      this.#workers.push(new QueryableWorker());
  }
}
