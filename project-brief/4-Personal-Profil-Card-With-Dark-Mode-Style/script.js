const toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	const isDark = document.body.classList.contains("dark");
	toggle.textContent = isDark ? "mode light" : "mode dark";
});