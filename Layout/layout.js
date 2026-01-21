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
  if (
    event.key === "r" &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.shiftKey
  ) {
    event.preventDefault(); // helps on Safari
    window.location.assign("https://www.youtube.com/watch?v=xvFZjo5PgG0");
  }
});

// LOAD FOOTER
fetch("\\Layout/footer.html")
  .then(response => response.text())
  .then(data => {
    const footer = document.getElementById("footer");
    if (footer) footer.innerHTML = data;
  });
