// ---------- LOGIN FORM VALIDATION ----------
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (username === "" || password === "") {
    errorMsg.textContent = "All fields are required!";
    errorMsg.classList.remove("hidden");
    return;
  }

  // FAKE DATABASE LOGIN (REPLACE LATER)
  if (username === "admin" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    window.location.href = "login.html";
  } else {
    errorMsg.textContent = "Invalid username or password!";
    errorMsg.classList.remove("hidden");
  }
});

// ---------- NAVBAR LOGIN / LOGOUT ----------
document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authBtn");
  const userDisplay = document.getElementById("userDisplay");

  if (!authBtn) return;

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  if (isLoggedIn === "true") {
    authBtn.textContent = "Logout";
    userDisplay.textContent = username;
    userDisplay.classList.remove("hidden");

    authBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.reload();
    });
  } else {
    authBtn.textContent = "Login";
    authBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
