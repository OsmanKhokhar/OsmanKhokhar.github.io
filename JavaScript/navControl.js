window.initNavbar = function () {
  const user = JSON.parse(localStorage.getItem("user"));

  // Get both desktop and mobile menus
  const menus = [document.getElementById("menu"), document.getElementById("mobile-menu")];

  menus.forEach(menu => {
    if (!menu) return;

    const allMenuItems = menu.querySelectorAll("a");

    allMenuItems.forEach(item => {
      const text = item.textContent.trim();

      // Reset everything first
      item.style.display = "block";

      if (user) {
        // ---------------- Admin ----------------
        if (user.role === "admin") {
          item.style.display = "block"; // show everything
        }
        // ---------------- User ----------------
        else if (user.role === "user") {
          // Hide restricted items for user
          if (["Neues Gericht", "Allergien", "Neues Essensplan"].includes(text)) {
            item.style.display = "none";
          } else {
            item.style.display = "block";
          }
        }

        // Replace Login/Registrieren with Logout ONLY ONCE per menu
        if (text === "Login" || text === "Registrieren") {
          item.textContent = "Logout";
          item.onclick = () => logout();
        }
      }
      // ---------------- Not logged in ----------------
      else {
        if (text === "Home" || text === "Login" || text === "Registrieren") {
          item.style.display = "block";
          if (text === "Login") item.onclick = () => loginUser();
        } else {
          item.style.display = "none";
        }
      }
    });
  });

  // ---------------- Hamburger Menu Toggle ----------------
  const btn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (btn && mobileMenu) {
    btn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
};

// ------------------- LOGIN / LOGOUT -------------------
window.loginAdmin = function () {
  localStorage.setItem("user", JSON.stringify({ username: "adminMock", role: "admin" }));
  initNavbar(); // refresh menu dynamically
};

window.loginUser = function () {
  localStorage.setItem("user", JSON.stringify({ username: "userMock", role: "user" }));
  initNavbar(); // refresh menu dynamically
};

window.logout = function () {
  localStorage.removeItem("user");
  initNavbar(); // refresh menu dynamically
};
