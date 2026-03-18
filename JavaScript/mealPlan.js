import { getAllMeals, storeMenu } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {

    const form = document.getElementById("mealPlanForm");
    const date = document.getElementById("date");
    const fleischhaltige = document.getElementById("fleischhaltige");
    const vegetarisch = document.getElementById("vegetarisch");
    const salat = document.getElementById("salat");
    const nachtisch = document.getElementById("nachtisch");

    const dateError = document.getElementById("dateError");
    const fleischhaltigeError = document.getElementById("fleischhaltigeError");
    const vegetarischError = document.getElementById("vegetarischError");
    const salatError = document.getElementById("salatError");
    const nachtischError = document.getElementById("nachtischError");

    const namePattern = /^[A-Za-z\s]+$/;

    // MOCK FLEISCHHALTIGE
    // const mockFleischhaltige = [
    //     {id: 1, name: "Steak"},
    //     {id: 2, name: "Chicken"},
    //     {id: 3, name: "Pork"},
    //     {id: 4, name: "Chicken Burger"},
    //     {id: 5, name: "Chicken Curry"},
    //     {id: 6, name: "Chicken Kebab"}
    // ];

    // API CALL FLEISCHHALTIGE
    try{
        const response = await getAllMeals();
        if(response.error || response.message){
            console.error("Fehler beim Abrufen der Mahlzeiten:", response.error || response.message);
        }else{
            console.log("Mahlzeiten API Response:", response);
            response.forEach(meal => {
                if(meal.category_id === 1){
                    const opt = document.createElement("option");
                    opt.value = meal.id;
                    opt.textContent = meal.name;
                    fleischhaltige.appendChild(opt);
                }
                else if(meal.category_id === 2){
                    const opt = document.createElement("option");
                    opt.value = meal.id;
                    opt.textContent = meal.name;
                    vegetarisch.appendChild(opt);
                }
                else if(meal.category_id === 3){
                    const opt = document.createElement("option");
                    opt.value = meal.id;
                    opt.textContent = meal.name;
                    salat.appendChild(opt);
                }
                else if(meal.category_id === 4){
                    const opt = document.createElement("option");
                    opt.value = meal.id;
                    opt.textContent = meal.name;
                    nachtisch.appendChild(opt);
                }
            });
        }
    }catch(err){
        console.error("Fehler beim Abrufen der Mahlzeiten:", err);
    }


    // --------------------
    // Validation functions
    // --------------------
    function validateDate(){
        if(!date.value){
            dateError.textContent = "Bitte wählen Sie ein Datum.";
            return false;
        }
        dateError.textContent = "";
        return true;
    }

    function validateFleischhaltige(){
        const value = fleischhaltige.value.trim();
        if(!value){
            fleischhaltigeError.textContent = "Bitte wählen Sie eine fleischhaltige.";
            return false;
        }
        fleischhaltigeError.textContent = "";
        return true;
    }

    function validateVegetarisch(){
        if(!vegetarisch.value){
            vegetarischError.textContent = "Bitte wählen Sie eine vegetarisch.";
            return false;
        }
        vegetarischError.textContent = "";
        return true;
    }

    function validateSalat(){
        if(!salat.value){
            salatError.textContent = "Bitte wählen Sie eine salat";
            return false;
        }
        salatError.textContent = "";
        return true;
    }

    function validateNachtisch(){
        if(!nachtisch.value){
            nachtischError.textContent = "Bitte wählen Sie eine nachtisch";
            return false;
        }
        nachtischError.textContent = "";
        return true;
    }

    // --------------------
    // Live validation
    // --------------------
    date.addEventListener("blur", validateDate);
    fleischhaltige.addEventListener("blur", validateFleischhaltige);
    vegetarisch.addEventListener("change", validateVegetarisch);
    salat.addEventListener("blur", validateSalat);
    nachtisch.addEventListener("blur", validateNachtisch);

    // API Submit Meals
    form.addEventListener("submit", async e => {
        e.preventDefault();
        try{
            //format date to YYYY-MM-DD
            const selectedDate = new Date(date.value);
            const formattedDate = selectedDate.toISOString().split("T")[0];
    
    
            //API UPLOAD ALL MEALS IN ONE CALL
            const mealIds = [fleischhaltige.value, vegetarisch.value, salat.value, nachtisch.value];
            const response = await storeMenu(formattedDate, mealIds);
            if(response.error || response.message){
                console.error("Fehler beim Hochladen der Mahlzeiten:", response.error || response.message);
                console.log("Request Payload:", { date: formattedDate, meal_ids: mealIds });
                console.log("response:", response);
            }else{
                console.log("Mahlzeiten erfolgreich hochgeladen:", response);
            }
    
            form.reset();
            
        }catch(err){
            console.error("Fehler beim Hochladen der Mahlzeiten:", err);
        }
    });
});
