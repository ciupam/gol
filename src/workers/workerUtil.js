import SharedGrid from "modules/SharedGrid";

const sharedGrid = new SharedGrid();

const reply = (queryMethodListener, ...queryMethodArguments) => {
  if (arguments.length < 1)
    throw new TypeError("reply - takes at least one argument");

  self.postMessage({
    queryMethodListener,
    queryMethodArguments,
  });
};

export const getDifference = (a, b) => {
  reply("printStuff", a - b);
};

export const waitSomeTime = () => {
  setTimeout(() => {
    reply("doAlert", 3, "seconds");
  }, 3000);
};

export const initSharedGrid = (
  sharedArrayBuffer,
  sharedArrayBufferTmp,
  sharedDisplayFlag,
  height,
  width
) => {
  sharedGrid.initSharedGrid(
    sharedArrayBuffer,
    sharedArrayBufferTmp,
    sharedDisplayFlag,
    height,
    width
  );
  reply("printStuff", "Shared Grid init done");
};

export const calcNextState = (sharedArrayBuffer, height, width) => {
  sharedGrid = new SharedGrid(sharedArrayBuffer, height, width);
};
