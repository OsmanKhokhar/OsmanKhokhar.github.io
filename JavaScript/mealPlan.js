import { listAllMeals, storeMenu } from "./api.js";

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
        const response = await listAllMeals();
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
            });
        }
    }catch(err){
        console.error("Fehler beim Abrufen der Mahlzeiten:", err);
    }
    

    // Populate fleischhaltige dropdown
    // mockFleischhaltige.forEach(a => {
    //     const opt = document.createElement("option");
    //     opt.value = a.id;
    //     opt.textContent = a.name;
    //     fleischhaltige.appendChild(opt);
    // });

    // MOCK Vegetarisch
    // const mockVegetarisch = [
    //     {id: 1, name: "Veggie Burger"},
    //     {id: 2, name: "Pasta"},
    //     {id: 3, name: "Curry"},
    //     {id: 4, name: "Veggie Pizza"},
    //     {id: 5, name: "Veggie Falafel"}
    // ];

    // Populate allergens dropdown
    // mockVegetarisch.forEach(a => {
    //     const opt = document.createElement("option");
    //     opt.value = a.id;
    //     opt.textContent = a.name;
    //     vegetarisch.appendChild(opt);
    // });

    // API CALL VEGETARISCH
    try{
        const response = await listAllMeals();
        if(response.error || response.message){
            console.error("Fehler beim Abrufen der Mahlzeiten:", response.error || response.message);
        }else{
            console.log("Mahlzeiten API Response:", response);
            response.forEach(meal => {
                if(meal.category_id === 2){
                    const opt = document.createElement("option");
                    opt.value = meal.id;
                    opt.textContent = meal.name;
                    vegetarisch.appendChild(opt);
                }
            });
        }
    }catch(err){
        console.error("Fehler beim Abrufen der Mahlzeiten:", err);
    }

    // MOCK Salat
    // const mockSalat = [
    //     {id: 1, name: "Greek Salad"},
    //     {id: 2, name: "Caesar Salad"},
    //     {id: 3, name: "Coleslaw"},
    //     {id: 4, name: "Chicken Salad"},
    //     {id: 5, name: "Fruit Salad"}
    // ];

    // Populate allergens dropdown
    // mockSalat.forEach(a => {
    //     const opt = document.createElement("option");
    //     opt.value = a.id;
    //     opt.textContent = a.name;
    //     salat.appendChild(opt);
    // });

    // API CALL SALAT
    try{
        const response = await listAllMeals();
        if(response.error || response.message){
            console.error("Fehler beim Abrufen der Mahlzeiten:", response.error || response.message);
        }else{
            console.log("Mahlzeiten API Response:", response);
            response.forEach(meal => {
                if(meal.category_id === 3){
                    const opt = document.createElement("option");
                    opt.value = meal.id;
                    opt.textContent = meal.name;
                    salat.appendChild(opt);
                }
            });
        }
    }catch(err){
        console.error("Fehler beim Abrufen der Mahlzeiten:", err);
    }

    // MOCK Nachhaltige
    // const mockNachtisch = [
    //     {id: 1, name: "Cake"},
    //     {id: 2, name: "Ice Cream"},
    //     {id: 3, name: "Fruit"}

    // ];

    // Populate allergens dropdown
    // mockNachtisch.forEach(a => {
    //     const opt = document.createElement("option");
    //     opt.value = a.id;
    //     opt.textContent = a.name;
    //     nachtisch.appendChild(opt);
    // });

    // API CALL NACHTISCH
    try{
        const response = await listAllMeals();
        if(response.error || response.message){
            console.error("Fehler beim Abrufen der Mahlzeiten:", response.error || response.message);
        }else{
            console.log("Mahlzeiten API Response:", response);
            response.forEach(meal => {
                if(meal.category_id === 4){
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

    // --------------------
    // Mock Submit validation
    // --------------------
    // form.addEventListener("submit", e => {
    //     e.preventDefault();

    //     const isValid =
    //         validateDate() &&
    //         validateFleischhaltige() &&
    //         validateVegetarisch() &&
    //         validateSalat() &&
    //         validateNachtisch();

    //     if(isValid){
    //         console.log("MealPlan is valid! Ready for API submit");
    //         form.reset();
    //     }else{
    //         console.log("Form has errors");
    //     }
    // });

    // API Submit Meals
    form.addEventListener("submit", async e => {
        e.preventDefault();
    try{
        const token = sessionStorage.getItem("token");

        //format date to YYYY-MM-DD
        const selectedDate = new Date(date.value);
        const formattedDate = selectedDate.toISOString().split("T")[0];

        //API Upload each meal id
        // for(let i = 0; i < 4; i++){
        //     const mealId = [fleischhaltige.value, vegetarisch.value, salat.value, nachtisch.value][i];
        //     const category = ["Fleischhaltige", "Vegetarisch", "Salat", "Nachtisch"][i];
        //     const response = await StoreMenu(token, formattedDate, mealId);
        //     if(response.error || response.message){
        //         console.error(`Fehler beim Hochladen der ${category}-Kategorie:`, response.error || response.message);
        //     }else{
        //         console.log(`${category} erfolgreich hochgeladen:`, response);
        //     }
        // }

        //API UPLOAD ALL MEALS IN ONE CALL
        const mealIds = [fleischhaltige.value, vegetarisch.value, salat.value, nachtisch.value];
        const response = await storeMenu(token, formattedDate, mealIds);
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
