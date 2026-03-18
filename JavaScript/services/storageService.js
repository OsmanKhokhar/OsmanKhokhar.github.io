'use strict';

import { STORAGE_KEY } from "../config.js";

let storage = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) ?? {};

function persist(){
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

export function get(key){
    return storage[key] ?? null;
}

export function set(key, value){
    storage[key] = value;
    persist();
}

export function remove(key){
    delete storage[key];
    persist();
}

export default {
    get,
    set,
    remove,
}