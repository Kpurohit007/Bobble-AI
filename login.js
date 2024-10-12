const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const passwordField = document.querySelector(".sign-up-form input[type='password']");
const strengthWeak = document.getElementById("strength-weak");
const strengthMedium = document.getElementById("strength-medium");
const strengthStrong = document.getElementById("strength-strong");

// Event listeners for sign-in and sign-up buttons
signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Toggle password visibility
function togglePassword(fieldId, icon) {
  const field = document.getElementById(fieldId);
  const isPassword = field.type === "password";

  // Toggle between 'password' and 'text'
  field.type = isPassword ? "text" : "password";

  // Change the icon class between eye and eye-slash
  icon.classList.toggle("fa-eye-slash", isPassword);
  icon.classList.toggle("fa-eye", !isPassword);
}

// Check password strength
function checkPasswordStrength() {
  const password = passwordField.value;
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  // Reset strength indicators
  strengthWeak.classList.remove("weak");
  strengthMedium.classList.remove("medium");
  strengthStrong.classList.remove("strong");

  // Update strength indicators based on strength
  if (strength >= 1) strengthWeak.classList.add("weak");
  if (strength >= 3) strengthMedium.classList.add("medium");
  if (strength >= 5) strengthStrong.classList.add("strong");
}

// Call the checkPasswordStrength function on password input
passwordField.addEventListener("input", checkPasswordStrength);
