// Inicializa el tema guardado y permite alternarlo desde cualquier página.
const themeButtons = document.querySelectorAll("[data-theme-toggle]");
const savedTheme = localStorage.getItem("grupo29-theme");

function applyTheme(theme) {
  const darkMode = theme === "dark";

  if (darkMode) document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");

  themeButtons.forEach((button) => {
    button.textContent = darkMode ? "Modo claro" : "Modo oscuro";
    button.setAttribute(
      "aria-label",
      darkMode ? "Activar modo claro" : "Activar modo oscuro",
    );
  });
}

applyTheme(savedTheme === "dark" ? "dark" : "light");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const darkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = darkMode ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem("grupo29-theme", nextTheme);
  });
});

// Configura las pestañas de los perfiles y muestra un panel por vez.
document.querySelectorAll(".tabs").forEach((tabs) => {
  const buttons = tabs.querySelectorAll("[data-tab]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const profileContent = tabs.parentElement;
      buttons.forEach((tabButton) => {
        const isSelected = tabButton === button;
        tabButton.classList.toggle("active", isSelected);
        tabButton.setAttribute("aria-selected", isSelected);
      });
      profileContent.querySelectorAll(".tab-panel").forEach((panel) => {
        const isVisible = panel.id === button.dataset.tab;
        panel.classList.toggle("active", isVisible);
        panel.hidden = !isVisible;
      });
    });
  });
});
