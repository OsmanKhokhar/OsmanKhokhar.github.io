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
    nameError.textContent = "Die Bezeichnung des Zusatzstoffs ist erforderlich";
    return false;
  }

  if (value.length < 3) {
    nameError.textContent =
      "Der Name des Zusatzstoffs muss mindestens 3 Zeichen lang sein";
    return false;
  }

  if (value.length > 30) {
    nameError.textContent =
      "Der Name des Zusatzstoffs darf nicht mehr als 30 Zeichen lang sein";
    return false;
  }

  if (!namePattern.test(value)) {
    nameError.textContent =
      "Der Zusatzname darf nur Buchstaben und Leerzeichen enthalten";
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
      "Die ID darf nicht mehr als 5 Zeichen lang sein";
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
