// Inicializa el tema guardado y permite alternarlo desde cualquier página.
const savedTheme = localStorage.getItem("grupo29-theme");
if (savedTheme === "dark")
  document.documentElement.setAttribute("data-theme", "dark");

document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  const updateLabel = () => {
    const darkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    button.textContent = darkMode ? "Modo claro" : "Modo oscuro";
    button.setAttribute(
      "aria-label",
      darkMode ? "Activar modo claro" : "Activar modo oscuro",
    );
  };
  updateLabel();
  button.addEventListener("click", () => {
    const darkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.toggleAttribute("data-theme", !darkMode);
    if (!darkMode) localStorage.setItem("grupo29-theme", "dark");
    else localStorage.removeItem("grupo29-theme");
    updateLabel();
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
