'use strict';

import * as config from "./config.js";
import storageService from "./services/storage/storageService.js";

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

export async function logout(){
    const token = storageService.get('token');
    const response = await fetch(`${config.API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.json();
}

export async function refreshAccessToken(){
    const refreshToken = storageService.get('refreshToken');
    const response = await fetch(`${config.API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
        },
    });

    return response.json();
}

export async function getProfile(){
    const token = storageService.get('token');
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

export async function getMeal(id){
    const response = await fetch(`${config.API_BASE_URL}/meals/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return response.json();
}

export async function getAllMeals(){
    const response = await fetch(`${config.API_BASE_URL}/meals`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return response.json();
}

export async function storeMenu(date, mealId){
    const token = storageService.get('token');
    const response = await fetch(`${config.API_BASE_URL}/menus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            date: date,
            meals: mealId
        })
    });

    return response.json();
}

export async function getSpecificMenu(date){
    const response = await fetch(`${config.API_BASE_URL}/menus/${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return response.json();
}

export async function register(username, first_name, last_name, password, passwordConfirmation, isAdmin = false){
    const token = storageService.get('token');
    const response = await fetch(`${config.API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password,
            password_confirmation: passwordConfirmation,
            is_admin: isAdmin,
        })
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
    getMeal,
    getAllMeals,
}