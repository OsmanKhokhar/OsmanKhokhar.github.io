'use strict';

import * as config from "./config";

export async function login(username, password){
    const response = await fetch(`${config.API_BASE_URL}/auth`, {
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

export async function logout(token){
    const response = await fetch(`${config.API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

    return response.json();
}

export async function refreshAccessToken(refreshToken){
    const response = await fetch(`${config.API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
        },
    })

    return response.json();
}

export async function getProfile(token){
    const response = await fetch(`${config.API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.json();
}

export async function getAllAllergens(){
    const response = await fetch(`${config.API_BASE_URL}/allergens`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return response.json();
}

export async function getAllergen(id){
    const response = await fetch(`${config.API_BASE_URL}/allergens/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return response.json();
}

export async function getAllAdditives(){
    const response = await fetch(`${config.API_BASE_URL}/additives`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return response.json();
}

export async function getAdditive(id){
    const response = await fetch(`${config.API_BASE_URL}/additives/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return response.json();
}

export default {
    login,
    logout,
    refreshAccessToken,
    getProfile,
    getAllAllergens,
    getAllergen,
    getAllAdditives,
    getAdditive,
}