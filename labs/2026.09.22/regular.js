import { VULNERABLE_REGEX, SAFE_REGEX } from "./regex-config.js";
import { runRegex } from "./regex-runner.js";

const vulnerableRegexElement = document.querySelector("#vulnerable-regex");
const safeRegexElement = document.querySelector("#safe-regex");
vulnerableRegexElement.textContent = VULNERABLE_REGEX.toString();
safeRegexElement.textContent = SAFE_REGEX.toString();

const input = document.querySelector("#input");
const vulnerableButton = document.querySelector("#vulnerable");
const safeButton = document.querySelector("#safe");
const status = document.querySelector("#status");
const blockMainThreadButton = document.querySelector("#block-main-thread");

function showRegexResult({ result, duration, regex }, heading = "") {
  status.innerHTML = `
    ${heading ? `<strong>${heading}</strong><br>` : ""}
    Regex: <code>${regex}</code><br>
    Совпадение: ${result}<br>
    Время: <strong>${duration.toFixed(3)} ms</strong>
  `;
}

function runRegexInWorker(type) {
  const value = input.value;

  status.textContent = "Выполняется...";

  const worker = new Worker("worker.js", { type: "module" });

  worker.postMessage({
    type,
    value,
  });

  worker.onmessage = (event) => {
    showRegexResult(event.data);
    worker.terminate();
  };
}

vulnerableButton.addEventListener("click", () => {
  runRegexInWorker("vulnerable");
});

safeButton.addEventListener("click", () => {
  runRegexInWorker("safe");
});

blockMainThreadButton.addEventListener("click", () => {
  const confirmed = confirm(
    "Внимание! Уязвимый Regex будет запущен в основном потоке браузера.\n\n" +
      "Интерфейс может временно зависнуть.\n\n" +
      "Продолжить?",
  );

  if (!confirmed) {
    return;
  }

  const value = input.value;
  status.innerHTML = `Regex выполняется в Главном потоке... <div class="spinner">⚙</div>`;

  setTimeout(() => {
    showRegexResult(
      runRegex("vulnerable", value),
      "Выполнение в Главном потоке",
    );
  }, 50);
});
