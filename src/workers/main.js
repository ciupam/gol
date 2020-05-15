export function QueryableWorker(defaultListener, onError) {
  const instance = this,
    worker = new Worker("./worker.js", { type: "module", globalObject: false }),
    listeners = {};

  this.defaultListener = defaultListener || function () {};

  if (onError) worker.onerror = onError;

  this.postMessage = function (message) {
    worker.postMessage(message);
  };

  this.terminate = function () {
    worker.terminate;
  };

  this.addListener = function (name, listener) {
    listeners[name] = listener;
  };

  this.removeListener = function (name) {
    delete listeners[name];
  };

  this.sendQuery = function () {
    if (arguments.length < 1) {
      throw new TypeError(
        "QuerableWorker.sendQuery takes at least one argument",
      );
    }

    worker.postMessage({
      queryMethod: arguments[0],
      queryArguments: Array.prototype.slice.call(arguments, 1),
    });
  };

  worker.onmessage = function (event) {
    if (
      event.data instanceof Object &&
      event.data.hasOwnProperty("queryMethodListener") &&
      event.data.hasOwnProperty("queryMethodArguments")
    ) {
      listeners[event.data.queryMethodListener].apply(
        instance,
        event.data.queryMethodArguments,
      );
    } else {
      this.defaultListener.call(instance, event.data);
    }
  };
}
