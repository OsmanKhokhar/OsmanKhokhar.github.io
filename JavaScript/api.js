'use strict';

const BASE_URL = 'https://mensa-app.test/api/v1';

export async function login(username, password) {
    const response = await fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });
    
    return response.json();
}

export default {
    login
}