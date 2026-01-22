// Under Construction Popup
document.addEventListener("DOMContentLoaded", () => {
  const constructionPopup = document.getElementById("constructionPopup");
  const timerElement = document.getElementById("timer");
    let timeLeft = 2;

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

  // Allow closing popup by clicking backdrop
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

// Custom Notification System
function showNotification(title, message, type = 'info', duration = 5000) {
  // Create container if it doesn't exist
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.className = 'notification-container';
    document.body.appendChild(container);
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;

  const icons = {
    success: '<i class="fas fa-check-circle"></i>',
    error: '<i class="fas fa-exclamation-circle"></i>',
    info: '<i class="fas fa-info-circle"></i>'
  };

  notification.innerHTML = `
    <div class="notification-icon">
      ${icons[type] || icons.info}
    </div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
    <button class="notification-close" aria-label="Close">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Add to container
  container.appendChild(notification);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after duration
  if (duration > 0) {
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse';
        setTimeout(() => notification.remove(), 300);
      }
    }, duration);
  }

  return notification;
}
// GSAP Plugin Registration
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

// Mobile nav toggle
const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");
const navBackdrop = document.getElementById("navBackdrop");
const logoTypingEl = document.querySelector(".logo-typing");

// Typewriter for navbar title
if (logoTypingEl) {
    const text = (logoTypingEl.dataset.text || logoTypingEl.textContent || "").trim();
    const speed = 110;
    const pause = 1200;
    let index = 0;

    // Keep navbar width stable during loop
    logoTypingEl.style.width = `${text.length}ch`;

    const typeLoop = () => {
        logoTypingEl.textContent = text.slice(0, index);
        index++;
        if (index <= text.length) {
            setTimeout(typeLoop, speed);
        } else {
            setTimeout(() => {
                index = 0;
                typeLoop();
            }, pause);
        }
    };

    logoTypingEl.textContent = "";
    typeLoop();
}

const openNav = () => {
    if (!navLinks) return;
    navLinks.classList.add("open");
    document.body.classList.add("nav-open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "true");
};

const closeNav = () => {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    document.body.classList.remove("nav-open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
};

const toggleNav = () => {
    if (!navLinks) return;
    if (navLinks.classList.contains("open")) {
        closeNav();
    } else {
        openNav();
    }
};

const setActiveLink = (targetId) => {
    if (!navLinks) return;
    navLinks.querySelectorAll("a[href^='#']").forEach(link => {
        const id = link.getAttribute("href").replace("#", "");
        link.classList.toggle("active", id === targetId);
    });
};

if (hamburger) {
    hamburger.addEventListener("click", toggleNav);
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-controls", "navLinks");
}

if (navBackdrop) {
    navBackdrop.addEventListener("click", closeNav);
}

if (navLinks) {
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
        closeNav();
        const href = link.getAttribute("href") || "";
        if (href.startsWith("#")) {
            const id = href.replace("#", "");
            setActiveLink(id);
        }
    }));
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
});

// Active section highlighting
const sectionObserverTargets = document.querySelectorAll("main section");
const navAnchorMap = {};
if (navLinks) {
    navLinks.querySelectorAll("a[href^='#']").forEach(link => {
        const id = link.getAttribute("href").replace("#", "");
        navAnchorMap[id] = link;
    });
}

if (sectionObserverTargets.length && Object.keys(navAnchorMap).length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            if (!id || !navAnchorMap[id]) return;
            if (entry.isIntersecting) {
                Object.values(navAnchorMap).forEach(link => link.classList.remove("active"));
                navAnchorMap[id].classList.add("active");
            }
        });
    }, { threshold: 0.35, rootMargin: "-30% 0px -35% 0px" });

    sectionObserverTargets.forEach(section => observer.observe(section));

    // set an initial active state when landing at the top
    setActiveLink("hero");
}

// Navbar shrink on scroll (both up and down)
const navbar = document.querySelector(".navbar");
if (navbar) {
    let lastScroll = 0;
    const toggleNavShadow = () => {
        const currentScroll = window.scrollY;
        
        // Add scrolled class when scrolled down from top
        if (currentScroll > 10) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        lastScroll = currentScroll;
    };
    toggleNavShadow();
    window.addEventListener("scroll", toggleNavShadow, { passive: true });
}

// Navbar Animation
gsap.from(".navbar", { duration: 1, y: -80, opacity: 0, ease: "power4.out", immediateRender: false });

// Hero Animations
gsap.from(".hero-item", {
    duration: 1, y: 30, opacity: 0, stagger: 0.12, delay: 0.4, ease: "power3.out"
});

// Counting effect for stats
const statNumbers = document.querySelectorAll(".stat strong");
statNumbers.forEach(el => {
    const text = el.textContent.trim();
    const hasPlus = text.endsWith("+");
    const numericTarget = Number(el.dataset.count || text.replace(/[^0-9.]/g, "")) || 0;
    el.dataset.count = numericTarget;
    el.textContent = "0" + (hasPlus ? "+" : "");

    gsap.fromTo(el, { innerText: 0 }, {
        innerText: numericTarget,
        duration: 1.6,
        ease: "power1.out",
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: el.closest(".stats") || el,
            start: "top 85%",
            once: true
        },
        onUpdate: function () {
            const value = Math.round(this.targets()[0].innerText);
            el.textContent = `${value}${hasPlus ? "+" : ""}`;
        }
    });
});

// About Section
gsap.from(".about-content", {
    scrollTrigger: { trigger: "#about", start: "top 80%" },
    y: 40, opacity: 0, duration: 1,
    immediateRender: false
});

// Grid and card animations (mobile-first smooth stagger)
mm.add("(max-width: 768px)", () => {
    // Section-level fade for smooth paging on scroll
    gsap.utils.toArray("main section").forEach(sec => {
        gsap.from(sec, {
            scrollTrigger: { trigger: sec, start: "top 94%", once: true },
            y: 45, opacity: 0, duration: 0.7, ease: "power2.out",
            clearProps: "all"
        });
    });

    gsap.utils.toArray(".grid-container").forEach(grid => {
        gsap.from(grid.children, {
            scrollTrigger: { trigger: grid, start: "top 92%", once: true },
            y: 50, opacity: 0, duration: 0.9, stagger: 0.18, ease: "power2.out",
            clearProps: "all"
        });
    });

    gsap.from(["#services .card", "#education .card"], {
        scrollTrigger: { trigger: "#services", start: "top 90%", once: true },
        y: 55, opacity: 0, duration: 0.9, stagger: 0.18, ease: "power3.out",
        clearProps: "all"
    });

    gsap.from(".projects-grid .project-card", {
        scrollTrigger: { trigger: "#projects", start: "top 90%", once: true },
        y: 55, opacity: 0, duration: 0.9, stagger: 0.16, ease: "power3.out",
        clearProps: "all"
    });
});

mm.add("(min-width: 769px)", () => {
    // Section-level fade on desktop/tablet to reveal with scroll
    gsap.utils.toArray("main section").forEach(sec => {
        gsap.from(sec, {
            scrollTrigger: { trigger: sec, start: "top 88%", once: true },
            y: 40, opacity: 0, duration: 0.75, ease: "power2.out",
            clearProps: "all"
        });
    });

    gsap.utils.toArray(".grid-container").forEach(grid => {
        gsap.from(grid.children, {
            scrollTrigger: { trigger: grid, start: "top 82%" },
            y: 45, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
            clearProps: "all"
        });
    });

    gsap.from("#services .card", {
        scrollTrigger: { trigger: "#services", start: "top 80%", toggleActions: "play none none none" },
        y: 55, opacity: 0, duration: 0.85, stagger: 0.14, ease: "power3.out",
        clearProps: "all"
    });

    gsap.from("#education .card", {
        scrollTrigger: { trigger: "#education", start: "top 80%", toggleActions: "play none none none" },
        y: 55, opacity: 0, duration: 0.85, stagger: 0.14, ease: "power3.out",
        clearProps: "all"
    });

    gsap.from(".projects-grid .project-card", {
        scrollTrigger: { trigger: "#projects", start: "top 82%", toggleActions: "play none none none" },
        y: 55, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out",
        clearProps: "all"
    });
});

// Timeline Animation
gsap.from(".timeline-item", {
    scrollTrigger: { trigger: "#experience", start: "top 85%", once: true },
    x: -30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
    clearProps: "all"
});

// Deep Dive Tabs Section
gsap.from("#profile-tabs .tab-container", {
    scrollTrigger: { trigger: "#profile-tabs", start: "top 82%", toggleActions: "play none none none" },
    y: 50, opacity: 0, duration: 1, ease: "power3.out",
    clearProps: "all"
});

// Footer Animation
gsap.from("footer .footer-container > *", {
    scrollTrigger: { trigger: "footer", start: "top 85%", toggleActions: "play none none none" },
    y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
    clearProps: "all"
});

// Contact Section
gsap.from("#contact", {
    scrollTrigger: { trigger: "#contact", start: "top 85%", once: true },
    y: 30, opacity: 0, duration: 1,
    clearProps: "all"
});

// Tabs interaction
const tabLinks = document.querySelectorAll(".tab-link");
const tabPanels = document.querySelectorAll(".tab-panel");

const openTab = (tabId) => {
    tabLinks.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabId));
    tabPanels.forEach(panel => panel.classList.toggle("active", panel.id === tabId));
};

tabLinks.forEach(btn => {
    btn.addEventListener("click", () => openTab(btn.dataset.tab));
});

// Certificates popup
const popup = document.getElementById("image-popup");
const popupImg = document.getElementById("popup-img");

const showImage = (src, alt = "Certificate preview") => {
    if (!popup || !popupImg) return;
    popupImg.src = src;
    popupImg.alt = alt;
    popup.classList.add("open");
};

const closePopup = () => {
    if (!popup) return;
    popup.classList.remove("open");
    if (popupImg) popupImg.src = "";
};

document.querySelectorAll(".achievement-box .box-image").forEach(img => {
    img.addEventListener("click", () => showImage(img.dataset.full || img.src, img.alt));
});

document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-src");
        if (src) showImage(src, "Certificate preview");
    });
});

if (popup) {
    popup.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup") || e.target.classList.contains("popup-backdrop")) {
            closePopup();
        }
    });
}

// Project details popup
const projectPopup = document.getElementById("project-popup");
const projectPopupText = document.querySelector(".project-popup-text");
const projectPopupClose = document.querySelector(".project-popup-close");

const openProjectPopup = (text) => {
    if (!projectPopup || !projectPopupText) return;
    projectPopupText.textContent = text;
    projectPopup.classList.add("open");
};

const closeProjectPopup = () => {
    if (!projectPopup) return;
    projectPopup.classList.remove("open");
    if (projectPopupText) projectPopupText.textContent = "";
};

document.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const details = btn.getAttribute("data-details") || "";
        openProjectPopup(details);
    });
});

if (projectPopupClose) {
    projectPopupClose.addEventListener("click", closeProjectPopup);
}

if (projectPopup) {
    projectPopup.addEventListener("click", (e) => {
        if (e.target.classList.contains("project-popup")) {
            closeProjectPopup();
        }
    });
}

// Contact popup & mailto submission
const contactOpenBtn = document.getElementById("contactOpen");
const contactPopup = document.getElementById("contact-popup");
const contactCloseBtns = document.querySelectorAll(".contact-popup-close");
const contactForm = document.getElementById("contact-form");

const openContactPopup = () => {
    if (contactPopup) contactPopup.classList.add("open");
};

const closeContactPopup = () => {
    if (contactPopup) contactPopup.classList.remove("open");
};

if (contactOpenBtn) {
    contactOpenBtn.addEventListener("click", openContactPopup);
}

contactCloseBtns.forEach(btn => btn.addEventListener("click", closeContactPopup));

if (contactPopup) {
    contactPopup.addEventListener("click", (e) => {
        if (e.target.classList.contains("contact-popup")) {
            closeContactPopup();
        }
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = {
            name: (document.getElementById("contact-name")?.value || "").trim(),
            email: (document.getElementById("contact-email")?.value || "").trim(),
            type: (document.getElementById("contact-type")?.value || "General"),
            timeline: (document.getElementById("contact-timeline")?.value || "Flexible"),
            message: (document.getElementById("contact-message")?.value || "").trim()
        };
        
        // Validate
        if (!formData.name || !formData.email || !formData.message) {
            showNotification("Validation Error", "Please fill in all required fields (Name, Email, Message)", 'error', 5000);
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Try to determine correct API path
            let apiPath = 'api/submit-contact.php';
            
            // If current location is localhost, use it
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                // Use the port from current location
                if (window.location.port) {
                    apiPath = `http://${window.location.hostname}:${window.location.port}/api/submit-contact.php`;
                } else {
                    apiPath = `/api/submit-contact.php`;
                }
            }
            
            console.log('Sending to:', apiPath);
            
            // Send to backend
            const response = await fetch(apiPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.success) {
                // Success - show message and close popup
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                showNotification(
                    "✅ Message Saved!", 
                    `Thank you ${formData.name}! Your message has been saved to the database. I'll review it soon.`, 
                    'success', 
                    6000
                );
                setTimeout(() => {
                    contactForm.reset();
                    closeContactPopup();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 1500);
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            console.error('Failed to reach PHP backend. Make sure run-server.bat is running.');
            
            // Show error message instead of fallback
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Check if PHP is available first
            showNotification(
                "⚠️ Backend Not Available",
                "PHP backend is not running. Opening email client as fallback...",
                'info',
                5000
            );
            
            // Fallback to mailto after a short delay
            setTimeout(() => {
                const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
                const body = encodeURIComponent(
                    `Name: ${formData.name}\n` +
                    `Email: ${formData.email}\n` +
                    `Project Type: ${formData.type}\n` +
                    `Timeline: ${formData.timeline}\n\n` +
                    `Message:\n${formData.message}\n\n` +
                    `---\nSent from Portfolio Contact Form`
                );
                window.location.href = `mailto:mdahsanurrahaman@gmail.com?subject=${subject}&body=${body}`;
                closeContactPopup();
            }, 1500);
        }
=======
        const name = (document.getElementById("contact-name")?.value || "").trim();
        const email = (document.getElementById("contact-email")?.value || "").trim();
        const message = (document.getElementById("contact-message")?.value || "").trim();
        if (!name || !email || !message) return;

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:mdahsanurrahaman2456@gmail.com?subject=${subject}&body=${body}`;
        closeContactPopup();
>>>>>>> 80d23e2ee0b57a988253fe12bc1a580ad536c7e3
    });
}