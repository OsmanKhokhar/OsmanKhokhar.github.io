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

export async function logout(token) {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    
    return response.json();
}

export async function refreshToken(refreshToken) {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
        },
    })
    
    return response.json();
}

export async function profile(token) {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    
    return response.json();
}

export default {
    login,
    logout,
    refreshToken,
    profile,
}