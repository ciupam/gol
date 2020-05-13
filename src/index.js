import "./styles/index.scss";
import { QueryableWorker } from "./workers/main";

var myTask = new QueryableWorker();

myTask.addListener("printStuff", function (res) {
  console.log(res);
});

myTask.addListener("doAlert", (time, unit) =>
  alert(`Work waited for ${time}${unit}.`)
);

myTask.sendQuery("getDifference", 5, 3);
