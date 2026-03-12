document.addEventListener("DOMContentLoaded", () => {

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

    // MOCK ALLERGIES
    const mockFleischhaltige = [
        {id: 1, name: "Steak"},
        {id: 2, name: "Chicken"},
        {id: 3, name: "Pork"},
        {id: 4, name: "Chicken Burger"},
        {id: 5, name: "Chicken Curry"},
        {id: 6, name: "Chicken Kebab"}
    ];

    // Populate allergens dropdown
    mockFleischhaltige.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.id;
        opt.textContent = a.name;
        fleischhaltige.appendChild(opt);
    });

    // MOCK ALLERGIES
    const mockVegetarisch = [
        {id: 1, name: "Veggie Burger"},
        {id: 2, name: "Pasta"},
        {id: 3, name: "Curry"},
        {id: 4, name: "Veggie Pizza"},
        {id: 5, name: "Veggie Falafel"}
    ];

    // Populate allergens dropdown
    mockVegetarisch.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.id;
        opt.textContent = a.name;
        vegetarisch.appendChild(opt);
    });

    // MOCK Salat
    const mockSalat = [
        {id: 1, name: "Greek Salad"},
        {id: 2, name: "Caesar Salad"},
        {id: 3, name: "Coleslaw"},
        {id: 4, name: "Chicken Salad"},
        {id: 5, name: "Fruit Salad"}
    ];

    // Populate allergens dropdown
    mockSalat.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.id;
        opt.textContent = a.name;
        salat.appendChild(opt);
    });

    // MOCK Nachhaltige
    const mockNachtisch = [
        {id: 1, name: "Cake"},
        {id: 2, name: "Ice Cream"},
        {id: 3, name: "Fruit"}

    ];

    // Populate allergens dropdown
    mockNachtisch.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.id;
        opt.textContent = a.name;
        nachtisch.appendChild(opt);
    });

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
    // Submit validation
    // --------------------
    form.addEventListener("submit", e => {
        e.preventDefault();

        const isValid =
            validateDate() &&
            validateFleischhaltige() &&
            validateVegetarisch() &&
            validateSalat() &&
            validateNachtisch();

        if(isValid){
            console.log("MealPlan is valid! Ready for API submit");
            form.reset();
        }else{
            console.log("Form has errors");
        }
    });

});
