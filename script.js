// ---------- Elements ----------
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const formTitle = document.getElementById("form-title");
const formSubtitle = document.getElementById("form-subtitle");

const showRegisterBtn = document.getElementById("show-register");
const showLoginBtn = document.getElementById("show-login");

// Login fields
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginEmailError = document.getElementById("login-email-error");
const loginPasswordError = document.getElementById("login-password-error");
const loginSubmit = document.getElementById("login-submit");

// Register fields
const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerConfirmPassword = document.getElementById("register-confirm-password");

const registerNameError = document.getElementById("register-name-error");
const registerEmailError = document.getElementById("register-email-error");
const registerPasswordError = document.getElementById("register-password-error");
const registerConfirmPasswordError = document.getElementById(
  "register-confirm-password-error"
);

const registerSubmit = document.getElementById("register-submit");

// Password strength
const passwordStrengthContainer = document.getElementById("password-strength");
const strengthLabel = document.getElementById("strength-label");
const strengthBar = document.getElementById("strength-bar");

// ---------- View Toggle ----------
function showRegister() {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  formTitle.textContent = "Create your account";
  formSubtitle.textContent = "Join us to get started";
}

function showLogin() {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  formTitle.textContent = "Welcome back";
  formSubtitle.textContent = "Sign in to continue to your dashboard";
}

showRegisterBtn.addEventListener("click", showRegister);
showLoginBtn.addEventListener("click", showLogin);

// ---------- Validation Logic (AI-generated rules) ----------
// Email regex: local-part@domain.tld
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email || !email.trim()) {
    return "Email is required";
  }
  const trimmed = email.trim();
  if (!emailRegex.test(trimmed)) {
    return "Enter a valid email address";
  }
  return "";
}

function validateLoginPassword(password) {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return "";
}

function validateRegisterPassword(password) {
  if (!password) {
    return "Password is required";
  }

  const rules = [];
  if (password.length < 8) rules.push("8+ characters");
  if (!/[A-Z]/.test(password)) rules.push("uppercase letter");
  if (!/[a-z]/.test(password)) rules.push("lowercase letter");
  if (!/[0-9]/.test(password)) rules.push("number");
  if (!/[^A-Za-z0-9]/.test(password)) rules.push("special character");

  if (rules.length > 0) {
    return "Password must include: " + rules.join(", ");
  }
  return "";
}

function calculatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function updatePasswordStrength(password) {
  if (!password) {
    passwordStrengthContainer.classList.add("hidden");
    return;
  }

  passwordStrengthContainer.classList.remove("hidden");

  const score = calculatePasswordStrength(password);
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  strengthLabel.textContent = labels[score] || "Very weak";
  strengthBar.className =
    "h-2 rounded-full transition-all " + (colors[score] || "bg-red-500");
  strengthBar.style.width = `${(score / 5) * 100}%`;
}

// ---------- Real-time Validation (Login) ----------
loginEmail.addEventListener("input", () => {
  const err = validateEmail(loginEmail.value);
  toggleFieldError(loginEmail, loginEmailError, err);
});

loginPassword.addEventListener("input", () => {
  const err = validateLoginPassword(loginPassword.value);
  toggleFieldError(loginPassword, loginPasswordError, err);
});

// ---------- Real-time Validation (Register) ----------
registerName.addEventListener("input", () => {
  const err = !registerName.value.trim() ? "Name is required" : "";
  toggleFieldError(registerName, registerNameError, err);
});

registerEmail.addEventListener("input", () => {
  const err = validateEmail(registerEmail.value);
  toggleFieldError(registerEmail, registerEmailError, err);
});

registerPassword.addEventListener("input", () => {
  const pwd = registerPassword.value;
  updatePasswordStrength(pwd);

  const err = validateRegisterPassword(pwd);
  toggleFieldError(registerPassword, registerPasswordError, err);

  // Re-validate confirm password if already typed
  if (registerConfirmPassword.value) {
    const confirmErr =
      registerConfirmPassword.value !== pwd ? "Passwords do not match" : "";
    toggleFieldError(
      registerConfirmPassword,
      registerConfirmPasswordError,
      confirmErr
    );
  }
});

registerConfirmPassword.addEventListener("input", () => {
  const pwd = registerPassword.value;
  const confirm = registerConfirmPassword.value;
  const err = confirm && confirm !== pwd ? "Passwords do not match" : "";
  toggleFieldError(registerConfirmPassword, registerConfirmPasswordError, err);
});

// Helper to toggle error styles
function toggleFieldError(inputEl, errorEl, errorMessage) {
  if (errorMessage) {
    errorEl.textContent = errorMessage;
    errorEl.classList.remove("hidden");
    inputEl.classList.add("border-red-500", "focus:ring-red-200");
    inputEl.classList.remove("border-gray-300", "focus:ring-blue-200");
  } else {
    errorEl.classList.add("hidden");
    inputEl.classList.remove("border-red-500", "focus:ring-red-200");
    inputEl.classList.add("border-gray-300", "focus:ring-blue-200");
  }
}

// ---------- Submit Handlers ----------
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  const emailErr = validateEmail(email);
  const passwordErr = validateLoginPassword(password);

  toggleFieldError(loginEmail, loginEmailError, emailErr);
  toggleFieldError(loginPassword, loginPasswordError, passwordErr);

  if (emailErr || passwordErr) return;

  // Simulate API call
  loginSubmit.disabled = true;
  loginSubmit.textContent = "Signing in...";
  await new Promise((res) => setTimeout(res, 800));
  alert("Logged in successfully (demo)");
  loginSubmit.disabled = false;
  loginSubmit.textContent = "Sign in";
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = registerName.value;
  const email = registerEmail.value;
  const password = registerPassword.value;
  const confirmPassword = registerConfirmPassword.value;

  const nameErr = !name.trim() ? "Name is required" : "";
  const emailErr = validateEmail(email);
  const passwordErr = validateRegisterPassword(password);
  const confirmErr =
    confirmPassword && confirmPassword !== password
      ? "Passwords do not match"
      : "";

  toggleFieldError(registerName, registerNameError, nameErr);
  toggleFieldError(registerEmail, registerEmailError, emailErr);
  toggleFieldError(registerPassword, registerPasswordError, passwordErr);
  toggleFieldError(
    registerConfirmPassword,
    registerConfirmPasswordError,
    confirmErr
  );

  if (nameErr || emailErr || passwordErr || confirmErr) return;

  // Simulate API call
  registerSubmit.disabled = true;
  registerSubmit.textContent = "Creating account...";
  await new Promise((res) => setTimeout(res, 800));
  alert("Account created successfully (demo)");
  registerSubmit.disabled = false;
  registerSubmit.textContent = "Create account";
});

// ---------- Social Buttons (Demo) ----------
document.getElementById("login-google").addEventListener("click", () => {
  alert("Google login (demo)");
});
document.getElementById("login-github").addEventListener("click", () => {
  alert("GitHub login (demo)");
});
document.getElementById("register-google").addEventListener("click", () => {
  alert("Google signup (demo)");
});
document.getElementById("register-github").addEventListener("click", () => {
  alert("GitHub signup (demo)");
});