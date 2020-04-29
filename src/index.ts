import Worker from "worker-loader!./main";

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (e) => console.log(e);
