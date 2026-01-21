// LOAD NAVBAR
fetch("\\Layout/navBar.html")
  .then(response => response.text())
  .then(data => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.innerHTML = data; 

      // ✅ CRITICAL LINE
      if (window.initNavbar) {
        window.initNavbar();
      }
    }
  });

// Der Rick
document.addEventListener("keydown", function (event) {
  if (!event.metaKey && event.key.toLowerCase() === "r") {
    window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
  }
});

// LOAD FOOTER
fetch("\\Layout/footer.html")
  .then(response => response.text())
  .then(data => {
    const footer = document.getElementById("footer");
    if (footer) footer.innerHTML = data;
  });
