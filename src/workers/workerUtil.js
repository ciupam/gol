import SharedGrid from "modules/SharedGrid";

let sharedGrid;

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

export const setGridShare = (sharedArrayBuffer, height, width) => {
  sharedGrid = new SharedGrid(sharedArrayBuffer, height, width);
};
