import { login, getProfile } from "./api.js";
import storageService from "./services/storage/storageService.js";

// ---------- LOGIN FORM VALIDATION ----------
document.getElementById("loginForm")?.addEventListener("submit", async function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if(!username || !password){
        errorMsg.textContent = "Bitte füllen Sie alle Felder aus";
        errorMsg.classList.remove("hidden");
        return;
    }

    try{
        const data = await login(username, password);

        if((data.error || data.message)){
            errorMsg.textContent = "Ungültiger Benutzername oder Passwort!";
            errorMsg.classList.remove("hidden");
        }else{
            storageService.set("isLoggedIn", true);
            storageService.set("username", username);
            storageService.set("token", data.access_token);
            storageService.set("refreshToken", data.refresh_token);
            //storageService.set("user", JSON.stringify({ role: "admin" })); // Platzhalter

            // Decide the role of the user
            try{
                const token = storageService.get("token");
                const users = await getProfile(token);

                if(users.error || users.message){
                    console.error("Fehler beim Abrufen der Benutzerdaten:", users.error || users.message);
                    return;
                }
                // Get is_admin from response and set the role in storage
                const role = users.is_admin ? "admin" : "user";
                storageService.set("user", JSON.stringify({role}));

                // Log response.json to console
                console.log("User API Response:", users);

            }catch(err){
                console.error("Login Fehler:", err);
            }

            window.location.href = "login.html";
        }
    }catch(err){
        console.error("Login Fehler:", err);
    }
});

// FAKE DATABASE LOGIN (REPLACE LATER)
//   if (username === "admin" && password === "1234") {
//     storageService.set("isLoggedIn", "true");
//     storageService.set("username", username);

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

    if(!authBtn){
        return;
    }

    const isLoggedIn = storageService.get("isLoggedIn");
    const username = storageService.get("username");

    if(isLoggedIn === "true"){
        authBtn.textContent = "Abmelden";
        userDisplay.textContent = username;
        userDisplay.classList.remove("hidden");

        authBtn.addEventListener("click", () => {
            storageService.destroy();
            window.location.reload();
        });
    }else{
        authBtn.textContent = "Login";
        authBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
});
