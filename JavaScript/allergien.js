const form = document.getElementById("allergyForm");

const allergyName = document.getElementById("allergyName");
const description = document.getElementById("description");

const nameError = document.getElementById("nameError");
const descriptionError = document.getElementById("descriptionError");


// Letters + spaces only
const namePattern = /^[A-Za-z\s]+$/;

// --------------------
// Allergy name validation
// --------------------
function validateAllergyName() {
  const value = allergyName.value.trim();

  if (value.length === 0) {
    nameError.textContent = "Allergy name is required.";
    return false;
  }

  if (value.length < 3) {
    nameError.textContent =
      "Allergy name must be at least 3 characters.";
    return false;
  }

  if (value.length > 30) {
    nameError.textContent =
      "Allergy name must not exceed 30 characters.";
    return false;
  }

  if (!namePattern.test(value)) {
    nameError.textContent =
      "Allergy name can only contain letters and spaces.";
    return false;
  }

  nameError.textContent = "";
  return true;
}

// --------------------
// Description validation
// --------------------
function validateDescription() {
  const value = description.value.trim();

  if (value.length > 250) {
    descriptionError.textContent =
      "Description must not exceed 250 characters.";
    return false;
  }

  descriptionError.textContent = "";
  return true;
}

// --------------------
// Field-level validation (on blur)
// --------------------
allergyName.addEventListener("blur", validateAllergyName);
description.addEventListener("blur", validateDescription);

// --------------------
// Submit validation
// --------------------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateAllergyName();
  const isDescriptionValid = validateDescription();

  if (isNameValid && isDescriptionValid) {
    // 🔜 API call will go here later
    console.log("Allergy is valid, ready to submit");
    form.reset();
  }
});
