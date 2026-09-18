const params = new URLSearchParams(location.search);

const paramA = params.get("A");
const paramB = params.get("B");

if (paramA && paramB) {
  const a = paramA.split(",").map(Number);
  const b = paramB.split(",").map(Number);
  calculatePirson(a, b);
}

function calculatePirson(a, b) {
  const avgA = a.reduce((sum, value) => sum + value, 0) / a.length;
  const avgB = b.reduce((sum, value) => sum + value, 0) / b.length;

  let numerator = 0;
  let sumA = 0;
  let sumB = 0;

  for (let i = 0; i < a.length; i++) {
    const diffA = a[i] - avgA;
    const diffB = b[i] - avgB;

    numerator += diffA * diffB;
    sumA += diffA ** 2;
    sumB += diffB ** 2;
  }

  const correlation = Math.abs(numerator / Math.sqrt(sumA * sumB));

  const result =
    correlation === 1
      ? "1"
      : (Math.trunc(correlation * 1000) / 1000).toFixed(3);

  document.title = result;
}
