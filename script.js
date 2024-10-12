// Newsletter form submission handler
document
  .getElementById("newsletter-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const emailInput = document.getElementById("email");
    const confirmationMessage = document.getElementById("confirmation-message");
    const email = emailInput.value;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      confirmationMessage.textContent = "Please enter a valid email address.";
      confirmationMessage.classList.remove("hidden");
      return; // Exit the function if the email is invalid
    }

    // Simulate a successful submission
    console.log(`Email submitted: ${email}`); // For debugging
    confirmationMessage.textContent =
      "Thank you for subscribing! Please check your email for further instructions.";
    confirmationMessage.classList.remove("hidden");

    // Automatically hide the confirmation message after 5 seconds
    setTimeout(() => {
      confirmationMessage.classList.add("hidden");
    }, 5000);

    // Clear the form
    emailInput.value = "";
  });

// Accordion functionality with smooth transitions
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion, index) => {
  const header = accordion.querySelector(".accordion__header");
  const content = accordion.querySelector(".accordion__content");
  const icon = accordion.querySelector(".accordion__icon i");

  header.addEventListener("click", () => {
    const isOpen = content.style.maxHeight === `${content.scrollHeight}px`;

    accordions.forEach((a, i) => {
      const c = a.querySelector(".accordion__content");
      const ic = a.querySelector(".accordion__icon i");

      if (i === index) {
        c.style.maxHeight = isOpen ? "0px" : `${c.scrollHeight}px`;
        ic.classList.toggle("ri-add-line", isOpen);
        ic.classList.toggle("ri-subtract-fill", !isOpen);
      } else {
        c.style.maxHeight = "0px";
        ic.classList.add("ri-add-line");
        ic.classList.remove("ri-subtract-fill");
      }
    });
  });
});

// Function to handle the active state of navbar items
function changeContent(page) {
  const links = document.querySelectorAll(".menu ul li a");
  links.forEach((link) => link.classList.remove("active"));
  document.getElementById(page + "-link").classList.add("active");
}

// Make "Home" the default active page on load
window.onload = function () {
  document.getElementById("home-link").classList.add("active");
};

// JS for dark mode functionality
const darkModeButton = document.getElementById('dark-mode-button');

// Check for stored dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeButton.querySelector('i').classList.add('fa-sun');
} else {
  document.body.classList.remove('dark-mode');
  darkModeButton.querySelector('i').classList.add('fa-moon');
}

// Add event listener for toggle functionality
darkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = darkModeButton.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');

  // Save the user's preference in localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }

  console.log(icon.classList); // Check the classes being applied to the icon
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

// Show the button when scrolled down 100px from the top
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopButton.style.display = "block";
    backToTopButton.style.opacity = "1"; // Fade in
  } else {
    backToTopButton.style.opacity = "0"; // Fade out
    setTimeout(() => {
      backToTopButton.style.display = "none";
    }, 300); // Delay hiding to allow for fade out
  }
};

// Scroll to top when the button is clicked
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
