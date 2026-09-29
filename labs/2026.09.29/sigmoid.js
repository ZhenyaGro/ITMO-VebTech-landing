const query = location.search.slice(1);
const parts = query.split("&");
const params = {};

for (const part of parts) {
  const [key, value] = part.split("=");
  params[key] = value;
}

const a = params.A.split(",").map(Number);
const b = params.B.split(",").map(Number);
const c = Number(params.C);

let z = c;

for (let i = 0; i < a.length; i++) {
  z += a[i] * b[i];
}

const y = 1 / (1 + Math.exp(-z));

if (y === 1) {
  document.title = "1";
} else {
  const truncated = Math.floor(y * 1000) / 1000;
  document.title = truncated.toFixed(3);
}
