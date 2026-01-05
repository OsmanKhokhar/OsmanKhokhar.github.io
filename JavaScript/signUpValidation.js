const form = document.getElementById("signupForm");

const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Regex: letters and spaces only
const namePattern = /^[A-Za-z\s]+$/;

// --------------------
// First & Last name validation
// --------------------
function validateName(input, errorElement, fieldLabel) {
  const value = input.value.trim();

  if (value.length === 0) {
    errorElement.textContent = `${fieldLabel} is required.`;
    return false;
  }

  if (value.length < 3) {
    errorElement.textContent =
      `${fieldLabel} must be at least 3 characters.`;
    return false;
  }

  if (value.length > 25) {
    errorElement.textContent =
      `${fieldLabel} must not exceed 25 characters.`;
    return false;
  }

  if (!namePattern.test(value)) {
    errorElement.textContent =
      `${fieldLabel} can only contain letters and spaces.`;
    return false;
  }

  errorElement.textContent = "";
  return true;
}

// --------------------
// Username validation
// --------------------
function validateUsername() {
  const value = username.value.trim();

  if (value.length < 4) {
    usernameError.textContent =
      "Username must be at least 4 characters long.";
    return false;
  }

  usernameError.textContent = "";
  return true;
}

// --------------------
// Password validation
// --------------------
function validatePassword() {
  if (password.value.length < 8) {
    passwordError.textContent =
      "Password must be at least 8 characters long.";
    return false;
  }

  passwordError.textContent = "";
  return true;
}

// --------------------
// Confirm password validation
// --------------------
function validateConfirmPassword() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent =
      "Passwords do not match.";
    return false;
  }

  confirmPasswordError.textContent = "";
  return true;
}

// --------------------
// Field-level validation (on blur)
// --------------------
firstName.addEventListener("blur", () =>
  validateName(firstName, firstNameError, "First name")
);

lastName.addEventListener("blur", () =>
  validateName(lastName, lastNameError, "Last name")
);

username.addEventListener("blur", validateUsername);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

// --------------------
// Submit validation
// --------------------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isFirstValid = validateName(firstName, firstNameError, "First name");
  const isLastValid = validateName(lastName, lastNameError, "Last name");
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();

  if (
    isFirstValid &&
    isLastValid &&
    isUsernameValid &&
    isPasswordValid &&
    isConfirmValid
  ) {
     // 🔜 API call will go here later
    alert("Registration successful!");
    form.reset();
  }
});
