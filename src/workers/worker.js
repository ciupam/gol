import * as workerMethods from "./workerUtil";

const defaultReply = (message) => {
  console.log(message);
};

self.onmessage = (event) => {
  if (
    event.data instanceof Object &&
    event.data.hasOwnProperty("queryMethod") &&
    event.data.hasOwnProperty("queryArguments")
  ) {
    const { queryMethod, queryArguments } = event.data;
    workerMethods[queryMethod] && workerMethods[queryMethod](...queryArguments);
  } else {
    defaultReply(event.data);
  }
};
