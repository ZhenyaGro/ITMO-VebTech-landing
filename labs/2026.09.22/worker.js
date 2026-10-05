import { runRegex } from "./regex-runner.js";

self.onmessage = (event) => {
  const { type, value } = event.data;
  self.postMessage(runRegex(type, value));
};
