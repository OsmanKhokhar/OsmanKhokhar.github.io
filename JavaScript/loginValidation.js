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
    const response = await fetch("https://mensa-app.test/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if ((data.error || data.message)) {
      errorMsg.textContent = "Ungültiger Benutzername oder Passwort!";
      errorMsg.classList.remove("hidden");
    } else {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("token", data.access_token);

      window.location.href = "login.html";
    }
  } catch (err) {
    console.error("Login Fehler:", err);
  }
});

  // FAKE DATABASE LOGIN (REPLACE LATER)
//   if (username === "admin" && password === "1234") {
//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("username", username);

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
