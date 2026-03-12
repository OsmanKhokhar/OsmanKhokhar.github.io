const form = document.getElementById("allergyForm");

const allergyName = document.getElementById("allergyName");
const allergyId = document.getElementById("allergyId");

const nameError = document.getElementById("nameError");
const allergyError = document.getElementById("allergyError");


// Letters + spaces only
const namePattern = /^[A-Za-z\s]+$/;

// --------------------
// Allergy name validation
// --------------------
function validateAllergyName(){
    const value = allergyName.value.trim();

    if(value.length === 0){
        nameError.textContent = "Der Name des Allergens ist erforderlich";
        return false;
    }

    if(value.length < 3){
        nameError.textContent =
            "Der Name des Allergens muss mindestens 3 Zeichen lang sein";
        return false;
    }

    if(value.length > 30){
        nameError.textContent =
            "Der Name des Allergens darf nicht länger als 30 Zeichen sein";
        return false;
    }

    if(!namePattern.test(value)){
        nameError.textContent =
            "Der Name des Allergens darf nur Buchstaben und Leerzeichen enthalten";
        return false;
    }

    nameError.textContent = "";
    return true;
}

// --------------------
// Id validation
// --------------------
function validateId(){
    const value = allergyId.value.trim();

    if(value.length > 5){
        idError.textContent =
            "Die ID darf nicht mehr als 5 Zeichen lang sein";
        return false;
    }

    idError.textContent = "";
    return true;
}

// --------------------
// Field-level validation (on blur)
// --------------------
allergyName.addEventListener("blur", validateAllergyName);
allergyId.addEventListener("blur", validateId);

// --------------------
// Submit validation
// --------------------
form.addEventListener("submit", function(e){
    e.preventDefault();

    const isNameValid = validateAllergyName();
    const isIdValid = validateId();

    if(isNameValid && isIdValid){
        // 🔜 API call will go here later
        console.log("Allergy is valid, ready to submit");
        form.reset();
    }
});
