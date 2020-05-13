function reply() {
  if (arguments.length < 1) {
    throw new TypeError("reply - takes at least one argument");
  }

  postMessage({
    queryMethodListener: arguments[0],
    queryMethodArguments: Array.prototype.slice.call(arguments, 1),
  });
}

const querableFunctions = {
  getDifference: function (a, b) {
    reply("printStuff", a - b);
  },
  waitSomeTime: function () {
    setTimeout(function () {
      reply("doAlert", 3, "seconds");
    }, 3000);
  },
};

function defaultReply(message) {
  console.log(message);
}

onmessage = (event) => {
  if (
    event.data instanceof Object &&
    event.data.hasOwnProperty("queryMethod") &&
    event.data.hasOwnProperty("queryArguments")
  ) {
    querableFunctions[event.data.queryMethod].apply(
      self,
      event.data.queryArguments
    );
  } else {
    defaultReply(event.data);
  }
};
