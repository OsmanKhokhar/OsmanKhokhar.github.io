
/* AUTH */

const url = new URL(
    "https://mensa-app.test/api/v1/auth"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "username": "admin",
    "password": ""
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response => response.json());


/* URL COOKIE */

const url = new URL(
    "https://mensa-app.test/sanctum/csrf-cookie"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response => response.json());