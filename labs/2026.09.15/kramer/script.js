const button = document.getElementById("bt");

button.addEventListener("click", () => {
  const n1 = Number(document.getElementById("n1").value);
  const n2 = Number(document.getElementById("n2").value);
  const n3 = Number(document.getElementById("n3").value);

  const n4 = Number(document.getElementById("n4").value);
  const n5 = Number(document.getElementById("n5").value);
  const n6 = Number(document.getElementById("n6").value);

  const resultX = document.getElementById("result1");
  const resultY = document.getElementById("result2");

  const d = n1 * n5 - n2 * n4;

  if (d === 0) {
    resultX.value = "";
    resultY.value = "";

    alert("Система не имеет единственного решения");
    return;
  }

  const dx = n3 * n5 - n2 * n6;
  const dy = n1 * n6 - n3 * n4;

  const x = dx / d;
  const y = dy / d;

  resultX.value = x;
  resultY.value = y;
});
