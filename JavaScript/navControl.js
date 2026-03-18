import storageService from "./services/storage/storageService.js";
import authenticationService from "./api.js";

// =================== NAVBAR ===================
window.initNavbar = function(){
    const user = JSON.parse(storageService.get("user"));

    const menus = [
        document.getElementById("menu"),
        document.getElementById("mobile-menu")
    ];

    menus.forEach(menu => {
        if(!menu){
            return;
        }

        const links = menu.querySelectorAll("a");
        const logoutLink = menu.querySelector(".logout-link");

        // ---------- RESET ----------
        links.forEach(link => {
            link.style.display = "none";
        });

        // ---------- NOT LOGGED IN ----------
        if(!user){
            links.forEach(link => {
                if(["Home", "Anmelden"].includes(link.textContent.trim())){
                    link.style.display = "block";
                }
            });

            if(logoutLink){
                logoutLink.style.display = "none";
            }
            return;
        }

        // ---------- LOGGED IN ----------
        links.forEach(link => {
            const text = link.textContent.trim();

            // ADMIN sees everything except login/register
            if(user.role === "admin"){
                if(!["Anmelden"].includes(text)){
                    link.style.display = "block";
                }
            }

            // USER sees limited menu
            if(user.role === "user"){
                if(["Home", "Bewertung", "Abmelden"].includes(text)){
                    link.style.display = "block";
                }
            }
        });

        // ---------- LOGOUT ----------
        if(logoutLink){
            logoutLink.style.display = "block";
            logoutLink.onclick = async(e) => {
                e.preventDefault();
                await authenticationService.logout();
                storageService.destroy();
                initNavbar();
            };
        }
    });

    // ---------- HAMBURGER ----------
    const btn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if(btn && mobileMenu){
        btn.onclick = () => mobileMenu.classList.toggle("hidden");
    }
};

// =================== INIT ===================
document.addEventListener("DOMContentLoaded", initNavbar);
