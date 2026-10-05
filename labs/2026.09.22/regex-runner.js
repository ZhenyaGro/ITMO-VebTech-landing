import { VULNERABLE_REGEX, SAFE_REGEX } from "./regex-config.js";

export function runRegex(type, value) {
  const regex = type === "vulnerable" ? VULNERABLE_REGEX : SAFE_REGEX;
  const start = performance.now();
  const result = regex.test(value);
  const end = performance.now();

  return {
    result,
    duration: end - start,
    regex: regex.toString(),
  };
}
