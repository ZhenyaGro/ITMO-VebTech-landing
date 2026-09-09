const themeButton = document.querySelector("#themeButton");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  themeButton.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  themeButton.textContent = "☀️";
}

const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();
