// LOAD NAVBAR
fetch("navBar.html")
  .then(response => response.text())
  .then(data => {
    const navbar = document.getElementById("navbar");
    if (navbar) navbar.innerHTML = data;
  });
  document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "r") {
      window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
    }
  });

// LOAD FOOTER
fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    const footer = document.getElementById("footer");
    if (footer) footer.innerHTML = data;
  });
