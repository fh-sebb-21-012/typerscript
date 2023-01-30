function toggleHamburgerMenu() {
  const menuDiv = document.getElementById("nav-small-menu");
  if (menuDiv == null) {
    console.error("Could not find menu element");
    return;
  }

  menuDiv.style.display = (menuDiv.style.display) ? "" : "flex";
}

export function registerMenuToggle() {
  const toggleButton = document.getElementById("btn-hamburgerToggle");

  if (toggleButton == null) {
    console.error("Could not find toggleButton");
    return;
  }

  toggleButton.addEventListener("click", toggleHamburgerMenu);
}

window.onload = registerMenuToggle;
