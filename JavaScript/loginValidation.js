import api from "./api.js";

// ---------- LOGIN FORM VALIDATION ----------
document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!username || !password) {
    errorMsg.textContent = "Bitte füllen Sie alle Felder aus";
    errorMsg.classList.remove("hidden");
    return;
  }

  try {
    const data = await api.login(username, password);
    console.log(data);

    if ((data.error || data.message)) {
      errorMsg.textContent = "Ungültiger Benutzername oder Passwort!";
      errorMsg.classList.remove("hidden");
    } else {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("refreshToken", data.refresh_token);
      //sessionStorage.setItem("user", JSON.stringify({ role: "admin" })); // Platzhalter

      // Check for admin role
      try {
        const url = new URL("https://mensa-app.test/api/v1/users");
        const token = sessionStorage.getItem("token");

        const headers = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        };

        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        const users = await response.json();

        // Search response for user
        const currentUser = users.find(u => u.username === username);

        if (currentUser && currentUser.is_admin) {
          sessionStorage.setItem("user", JSON.stringify({ role: "admin" }));
        } else {
          sessionStorage.setItem("user", JSON.stringify({ role: "user" }));
        }

      } catch (err) {
        console.error("Login Fehler:", err);
      }

      window.location.href = "login.html";
    }
  } catch (err) {
    console.error("Login Fehler:", err);
  }
});

// FAKE DATABASE LOGIN (REPLACE LATER)
//   if (username === "admin" && password === "1234") {
//     sessionStorage.setItem("isLoggedIn", "true");
//     sessionStorage.setItem("username", username);

//     window.location.href = "login.html";
//   } else {
//     errorMsg.textContent = "Ungültiger Benutzername oder ungültiges Passwort!";
//     errorMsg.classList.remove("hidden");
//   }
// });


// ---------- NAVBAR LOGIN / LOGOUT ----------
document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authBtn");
  const userDisplay = document.getElementById("userDisplay");

  if (!authBtn) return;

  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const username = sessionStorage.getItem("username");

  if (isLoggedIn === "true") {
    authBtn.textContent = "Abmelden";
    userDisplay.textContent = username;
    userDisplay.classList.remove("hidden");

    authBtn.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.reload();
    });
  } else {
    authBtn.textContent = "Login";
    authBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
