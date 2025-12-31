// GSAP Plugin Registration
gsap.registerPlugin(ScrollTrigger);

// Mobile nav toggle
const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");

const toggleNav = () => navLinks.classList.toggle("open");

if (hamburger) {
    hamburger.addEventListener("click", toggleNav);
}

if (navLinks) {
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));
}

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
    }, { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" });

    sectionObserverTargets.forEach(section => observer.observe(section));
}

// Navbar shrink on scroll
const navbar = document.querySelector(".navbar");
if (navbar) {
    const toggleNavShadow = () => {
        if (window.scrollY > 10) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };
    toggleNavShadow();
    window.addEventListener("scroll", toggleNavShadow);
}

// Navbar Animation
gsap.from(".navbar", { duration: 1, y: -80, opacity: 0, ease: "power4.out" });

// Hero Animations
gsap.from(".hero-item", {
    duration: 1, y: 30, opacity: 0, stagger: 0.12, delay: 0.4, ease: "power3.out"
});

// About Section
gsap.from(".about-content", {
    scrollTrigger: { trigger: "#about", start: "top 80%" },
    y: 40, opacity: 0, duration: 1
});

// Cards Stagger Animation (Skills, Projects)
gsap.utils.toArray(".grid-container").forEach(grid => {
    gsap.from(grid.children, {
        scrollTrigger: { trigger: grid, start: "top 85%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out"
    });
});

// Timeline Animation
gsap.from(".timeline-item", {
    scrollTrigger: { trigger: "#experience", start: "top 85%" },
    x: -30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power2.out"
});

// Services and Education
gsap.from("#services .card", {
    scrollTrigger: { trigger: "#services", start: "top 85%" },
    y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out"
});

gsap.from("#education .card", {
    scrollTrigger: { trigger: "#education", start: "top 85%" },
    y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power2.out"
});

// Contact Section
gsap.from("#contact", {
    scrollTrigger: { trigger: "#contact", start: "top 85%" },
    y: 30, opacity: 0, duration: 1
});