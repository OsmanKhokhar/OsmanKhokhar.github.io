
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("mealForm");
  const type = document.getElementById("type");
  const mealName = document.getElementById("mealName");
  const allergens = document.getElementById("allergens");
  const price = document.getElementById("price");
  const description = document.getElementById("description");

  const typeError = document.getElementById("typeError");
  const mealNameError = document.getElementById("mealNameError");
  const allergensError = document.getElementById("allergensError");
  const priceError = document.getElementById("priceError");
  const descriptionError = document.getElementById("descriptionError");

  const namePattern = /^[A-Za-z\s]+$/;

  // MOCK ALLERGIES
  const mockAllergies = [
    { id: 1, name: "Gluten", description: "Found in wheat, barley, and rye." },
    { id: 2, name: "Lactose", description: "Milk sugar found in dairy products." },
    { id: 3, name: "Nuts", description: "Includes peanuts and tree nuts." },
    { id: 4, name: "Soy", description: "Found in soybeans and soy products." }
  ];

  // Populate allergens dropdown
  mockAllergies.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = `${a.name} (${a.description})`;
    allergens.appendChild(opt);
  });

  // --------------------
  // Validation functions
  // --------------------
  function validateType() {
    if (!type.value) {
      typeError.textContent = "Please select a meal type.";
      return false;
    }
    typeError.textContent = "";
    return true;
  }

  function validateMealName() {
    const value = mealName.value.trim();
    if (!value) {
      mealNameError.textContent = "Meal name is required.";
      return false;
    }
    if (value.length < 3) {
      mealNameError.textContent = "Meal name must be at least 3 characters.";
      return false;
    }
    if (!namePattern.test(value)) {
      mealNameError.textContent = "Meal name can only contain letters and spaces.";
      return false;
    }
    mealNameError.textContent = "";
    return true;
  }

  function validateAllergens() {
    if (!allergens.value || allergens.value === "") {
      allergensError.textContent = "Please select an allergen.";
      return false;
    }
    allergensError.textContent = "";
    return true;
  }

  function validatePrice() {
    const value = parseFloat(price.value);
    if (isNaN(value)) {
      priceError.textContent = "Price is required.";
      return false;
    }
    if (value <= 0) {
      priceError.textContent = "Price must be greater than 0.";
      return false;
    }
    priceError.textContent = "";
    return true;
  }

  function validateDescription() {
    if (description.value.length > 250) {
      descriptionError.textContent = "Description must not exceed 250 characters.";
      return false;
    }
    descriptionError.textContent = "";
    return true;
  }

  // --------------------
  // Live validation
  // --------------------
  type.addEventListener("blur", validateType);
  mealName.addEventListener("blur", validateMealName);
  allergens.addEventListener("change", validateAllergens);
  price.addEventListener("blur", validatePrice);
  description.addEventListener("blur", validateDescription);

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
      validateDescription();

    if (isValid) {
      console.log("Meal is valid! Ready for API submit");
      form.reset();
    } else {
      console.log("Form has errors");
    }
  });

});
