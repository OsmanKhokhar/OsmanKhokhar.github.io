const form = document.getElementById("additiveForm");

const additiveName = document.getElementById("additiveName");
const additiveId = document.getElementById("additiveId");

const nameError = document.getElementById("nameError");
const additiveError = document.getElementById("idError");


// Letters + spaces only
const namePattern = /^[A-Za-z\s]+$/;

// --------------------
// Allergy name validation
// --------------------
function validateAdditiveName() {
  const value = additiveName.value.trim();

  if (value.length === 0) {
    nameError.textContent = "Additive name is required.";
    return false;
  }

  if (value.length < 3) {
    nameError.textContent =
      "Additive name must be at least 3 characters.";
    return false;
  }

  if (value.length > 30) {
    nameError.textContent =
      "Additive name must not exceed 30 characters.";
    return false;
  }

  if (!namePattern.test(value)) {
    nameError.textContent =
      "Additive name can only contain letters and spaces.";
    return false;
  }

  nameError.textContent = "";
  return true;
}

// --------------------
// Id validation
// --------------------
function validateAdditiveId() {
  const value = additiveId.value.trim();

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
additiveName.addEventListener("blur", validateAdditiveName);
additiveId.addEventListener("blur", validateAdditiveId);

// --------------------
// Submit validation
// --------------------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateAdditiveName();
  const isIdValid = validateAdditiveId();

  if (isNameValid && isIdValid) {
    // 🔜 API call will go here later
    console.log("Allergy is valid, ready to submit");
    form.reset();
  }
});
