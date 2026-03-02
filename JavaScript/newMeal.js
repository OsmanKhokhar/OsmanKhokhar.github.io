
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("mealForm");
  const type = document.getElementById("type");
  const mealName = document.getElementById("mealName");
  const allergens = document.getElementById("allergens");
  const additive = document.getElementById("additive");
  const price = document.getElementById("price");

  const typeError = document.getElementById("typeError");
  const mealNameError = document.getElementById("mealNameError");
  const allergensError = document.getElementById("allergensError");
  const additiveError = document.getElementById("additiveError");
  const priceError = document.getElementById("priceError");

  const namePattern = /^[A-Za-z\s]+$/;

  // MOCK ALLERGIES
const mockAllergies = [
  { id: 1, name: "Gluten" },
  { id: 2, name: "Lactose"},
  { id: 3, name: "Nuts" },
  { id: 4, name: "Soy" }
];

// Populate allergens dropdown
mockAllergies.forEach(a => {
  const opt = document.createElement("option");
  opt.value = a.id;
  opt.textContent = a.name;
  allergens.appendChild(opt);
});

  // MOCK ALLERGIES
const mockAdditive = [
  { id: 1, name: "Gluten" },
  { id: 2, name: "Lactose"},
  { id: 3, name: "Nuts" },
  { id: 4, name: "Soy" }
];

// Populate allergens dropdown
mockAdditive.forEach(a => {
  const opt = document.createElement("option");
  opt.value = a.id;
  opt.textContent = a.name;
  additive.appendChild(opt);
});

  // --------------------
  // Validation functions
  // --------------------
  function validateType() {
    if (!type.value) {
      typeError.textContent = "Bitte wählen Sie eine Mahlzeit aus";
      return false;
    }
    typeError.textContent = "";
    return true;
  }

  function validateMealName() {
    const value = mealName.value.trim();
    if (!value) {
      mealNameError.textContent = "Die Angabe des Gerichtsnamens ist erforderlich";
      return false;
    }
    if (value.length < 3) {
      mealNameError.textContent = "Der Name des Gerichts muss mindestens 3 Zeichen lang sein";
      return false;
    }
    if (!namePattern.test(value)) {
      mealNameError.textContent = "Der Name der Mahlzeit darf nur Buchstaben und Leerzeichen enthalten";
      return false;
    }
    mealNameError.textContent = "";
    return true;
  }

  function validateAllergens() {
    if (!allergens.value || allergens.value === "") {
      allergensError.textContent = "Bitte wählen Sie ein Allergen aus";
      return false;
    }
    allergensError.textContent = "";
    return true;
  }

    function validateAdditive() {
    if (!additive.value || additive.value === "") {
      additiveError.textContent = "Bitte wählen Sie einen Zusatzstoff aus";
      return false;
    }
    additiveError.textContent = "";
    return true;
  }

  function validatePrice() {
    const value = parseFloat(price.value);
    if (isNaN(value)) {
      priceError.textContent = "Ein Preis wird benötigt.";
      return false;
    }
    if (value <= 0) {
      priceError.textContent = "Der Preis muss größer als 0 sein";
      return false;
    }
    priceError.textContent = "";
    return true;
  }

  // --------------------
  // Live validation
  // --------------------
  type.addEventListener("blur", validateType);
  mealName.addEventListener("blur", validateMealName);
  allergens.addEventListener("change", validateAllergens);
  price.addEventListener("blur", validatePrice);
  additive.addEventListener("blur", validateAdditive);

  // --------------------
  // Submit validation
  // --------------------
  form.addEventListener("submit", e => {
    e.preventDefault();

    const isValid =
      validateType() &&
      validateMealName() &&
      validateAllergens() &&
      validatePrice() &&
      validateAdditive();

    if (isValid) {
      console.log("Meal is valid! Ready for API submit");
      form.reset();
    } else {
      console.log("Form has errors");
    }
  });

});
