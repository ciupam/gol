export default class QueryableWorker {
  #worker = new Worker("../workers/worker.js", {
    type: "module",
    globalObject: false,
  });

  #listeners = {};
  #defaultListener = (message) => {
    console.log(message);
  };

  constructor(defaultListener, onError) {
    this.#defaultListener = typeof defaultListener === "function" || (() => {});

    if (onError) this.#worker.onerror;

    this.#worker.onmessage = (event) => {
      if (
        event.data instanceof Object &&
        event.data.hasOwnProperty("queryMethodListener") &&
        event.data.hasOwnProperty("queryMethodArguments")
      ) {
        const { queryMethodListener, queryMethodArguments } = event.data;
        this.#listeners[queryMethodListener] &&
          this.#listeners[queryMethodListener](...queryMethodArguments);
      } else {
        this.#defaultListener(event.data);
      }
    };
  }

  postMessage(message) {
    this.#worker.postMessage(message);
  }

  addListener(name, listener) {
    this.#listeners[name] = listener;
  }

  removeListener(name) {
    delete this.#listeners[name];
  }

  sendQuery(queryMethod, ...queryArguments) {
    if (arguments.length < 1) {
      throw new TypeError(
        "QuerableWorker.sendQuery takes at least one argument"
      );
    }

    this.postMessage({
      queryMethod,
      queryArguments,
    });
  }
}
