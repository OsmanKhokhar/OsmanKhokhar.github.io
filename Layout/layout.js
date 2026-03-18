// LOAD NAVBAR
fetch("/Layout/navBar.html")
    .then(response => response.text())
    .then(data => {
        const navbar = document.getElementById("navbar");
        if(navbar){
            navbar.innerHTML = data;

            // ✅ CRITICAL LINE
            if(window.initNavbar){
                window.initNavbar();
            }
        }
    });

// LOAD FOOTER
fetch("/Layout/footer.html")
    .then(response => response.text())
    .then(data => {
        const footer = document.getElementById("footer");
        if(footer){
            footer.innerHTML = data;
        }
    });
