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
// Id validation
// --------------------
function validateId() {
  const value = allergyId.value.trim();

  if (value.length > 5) {
    idError.textContent =
      "Id must not exceed 5 characters.";
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
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateAllergyName();
  const isIdValid = validateDescription();

  if (isNameValid && isIdValid) {
    // 🔜 API call will go here later
    console.log("Allergy is valid, ready to submit");
    form.reset();
  }
});
