// Simulated backend users data
const users = [
  { email: "user1@example.com", password: "password123", name: "User One" },
  { email: "user2@example.com", password: "password456", name: "User Two" },
];

// Get modal elements
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

// Get open modal buttons
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Get close buttons
const closeLogin = document.getElementById("closeLogin");
const closeSignup = document.getElementById("closeSignup");

// Get form elements
const loginForm = document.querySelector("#loginModal form");
const signupForm = document.querySelector("#signupModal form");

// Get password inputs and show/hide checkboxes
const loginPassword = document.getElementById("login-password");
const signupPassword = document.getElementById("signup-password");
const loginShowPassword = document.getElementById("login-show-password");
const signupShowPassword = document.getElementById("signup-show-password");

// Reusable function to open modal
function openModal(modal) {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
}

// Reusable function to close modal
function closeModal(modal) {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

// Event listeners for opening modals
loginBtn.addEventListener("click", () => openModal(loginModal));
signupBtn.addEventListener("click", () => openModal(signupModal));

// Event listeners for closing modals
closeLogin.addEventListener("click", () => closeModal(loginModal));
closeSignup.addEventListener("click", () => closeModal(signupModal));

// Close modals when clicking outside of modal content
window.addEventListener("click", (event) => {
  if (event.target == loginModal) {
    closeModal(loginModal);
  }
  if (event.target == signupModal) {
    closeModal(signupModal);
  }
});

// Handle ESC key to close modal
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (loginModal.style.display === "block") {
      closeModal(loginModal);
    }
    if (signupModal.style.display === "block") {
      closeModal(signupModal);
    }
  }
});

// Focus management for accessibility
loginBtn.addEventListener("click", () => {
  openModal(loginModal);
  document.getElementById("login-email").focus();
});

signupBtn.addEventListener("click", () => {
  openModal(signupModal);
  document.getElementById("signup-name").focus();
});

closeLogin.addEventListener("click", () => {
  closeModal(loginModal);
  loginBtn.focus();
});

closeSignup.addEventListener("click", () => {
  closeModal(signupModal);
  signupBtn.focus();
});

// Authentication functions
function login(email, password) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    alert(`Welcome back, ${user.name}!`);
    closeModal(loginModal);
  } else {
    alert("Invalid email or password.");
  }
}

function signup(name, email, password) {
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    alert("Email already in use.");
  } else {
    users.push({ name, email, password });
    alert("Signup successful! Please log in.");
    closeModal(signupModal);
  }
}

// Handle form submissions
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  login(email, password);
});

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  signup(name, email, password);
});

// Show/Hide Password functions
function togglePasswordVisibility(passwordField, toggleCheckbox) {
  toggleCheckbox.addEventListener("change", () => {
    if (toggleCheckbox.checked) {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  });
}

// Attach toggle visibility functions
togglePasswordVisibility(loginPassword, loginShowPassword);
togglePasswordVisibility(signupPassword, signupShowPassword);
