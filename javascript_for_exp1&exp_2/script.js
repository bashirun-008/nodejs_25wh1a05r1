document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Helper function to set validation UI states
  function setValidation(input, isValid, errorId, message = "") {
    const errorEl = document.getElementById(errorId);
    if (isValid) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      if (errorEl && message) errorEl.textContent = message;
    }
    return isValid;
  }

  // Regex Helper for Email Validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  // --- Registration Validation ---
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("regUsername");
      const email = document.getElementById("regEmail");
      const password = document.getElementById("regPassword");
      const confirmPassword = document.getElementById("regConfirmPassword");

      let valid = true;

      // Username check (>= 3 chars)
      if (!setValidation(username, username.value.trim().length >= 3, "usernameError")) {
        valid = false;
      }

      // Email check
      if (!setValidation(email, isValidEmail(email.value), "emailError")) {
        valid = false;
      }

      // Password check (>= 6 chars)
      if (!setValidation(password, password.value.length >= 6, "passwordError")) {
        valid = false;
      }

      // Confirm Password match check
      const passwordsMatch = confirmPassword.value.length > 0 && confirmPassword.value === password.value;
      if (!setValidation(confirmPassword, passwordsMatch, "confirmPasswordError")) {
        valid = false;
      }

      if (valid) {
        alert("Registration Successful!");
        registerForm.reset();
        document.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
      }
    });
  }

  // --- Login Validation ---
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail");
      const password = document.getElementById("loginPassword");

      let valid = true;

      // Email check
      if (!setValidation(email, isValidEmail(email.value), "loginEmailError")) {
        valid = false;
      }

      // Password empty check
      if (!setValidation(password, password.value.trim().length > 0, "loginPasswordError", "Password cannot be empty.")) {
        valid = false;
      }

      if (valid) {
        alert("Login Successful!");
        loginForm.reset();
        document.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
      }
    });
  }
});
