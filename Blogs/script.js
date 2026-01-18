// Under Construction Popup
document.addEventListener("DOMContentLoaded", () => {
  const constructionPopup = document.getElementById("constructionPopup");
  const timerElement = document.getElementById("timer");
  let timeLeft = 5;

  // Update timer
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Hide popup with animation
      constructionPopup.classList.add("hide");
      setTimeout(() => {
        constructionPopup.style.display = "none";
      }, 500);
    }
  }, 1000);

  // Allow closing popup by clicking
  constructionPopup.addEventListener("click", (e) => {
    if (e.target === constructionPopup.querySelector(".popup-backdrop")) {
      clearInterval(timerInterval);
      constructionPopup.classList.add("hide");
      setTimeout(() => {
        constructionPopup.style.display = "none";
      }, 500);
    }
  });
});

// Category Filter
const categoryButtons = document.querySelectorAll(".category-btn");
const blogCards = document.querySelectorAll(".blog-card");
const noResults = document.getElementById("no-results");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const category = button.getAttribute("data-category");
    let visibleCount = 0;

    blogCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
        visibleCount++;
        // Add animation
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.classList.add("show");
    } else {
      noResults.classList.remove("show");
    }
  });
});

// Search Functionality
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  let visibleCount = 0;

  blogCards.forEach((card) => {
    const title = card.querySelector(".blog-title").textContent.toLowerCase();
    const excerpt = card
      .querySelector(".blog-excerpt")
      .textContent.toLowerCase();
    const tag = card.querySelector(".blog-tag").textContent.toLowerCase();

    if (
      title.includes(searchTerm) ||
      excerpt.includes(searchTerm) ||
      tag.includes(searchTerm)
    ) {
      card.style.display = "block";
      visibleCount++;
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });

  // Show/hide no results message
  if (visibleCount === 0) {
    noResults.classList.add("show");
  } else {
    noResults.classList.remove("show");
  }

  // Reset category filter when searching
  if (searchTerm === "") {
    categoryButtons.forEach((btn) => {
      if (btn.getAttribute("data-category") === "all") {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
});

// Newsletter Form
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = newsletterEmail.value;

  // Simple email validation
  if (email && email.includes("@")) {
    // Show success message
    alert(
      "Thank you for subscribing! You'll receive updates at " + email
    );
    newsletterEmail.value = "";
  } else {
    alert("Please enter a valid email address.");
  }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Toggle icon
    const icon = hamburger.querySelector("i");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = hamburger.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".navbar")
    ) {
      navLinks.classList.remove("active");
      const icon = hamburger.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all blog cards
blogCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  observer.observe(card);
});

// Header background on scroll
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.background = "rgba(3, 7, 18, 0.98)";
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.background = "rgba(3, 7, 18, 0.95)";
    header.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});
