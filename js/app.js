// Under Construction Popup
document.addEventListener("DOMContentLoaded", () => {
  const constructionPopup = document.getElementById("constructionPopup");
  const timerElement = document.getElementById("timer");
    const shouldShowPopup = false;
    const popupMemoryKey = "constructionPopupSeen";

    if (!constructionPopup || !timerElement) {
        return;
    }

    if (!shouldShowPopup || sessionStorage.getItem(popupMemoryKey) === "1") {
        constructionPopup.style.display = "none";
        return;
    }

    let timeLeft = 4;
    sessionStorage.setItem(popupMemoryKey, "1");

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

// Theme toggle (light/dark) with persisted preference
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const storageKey = "portfolioTheme";

    if (!themeToggle) {
        return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem(storageKey);
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

    const setTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(storageKey, theme);

        const icon = themeToggle.querySelector("i");
        if (icon) {
            icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }

        themeToggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        );
    };

    setTheme(initialTheme);

    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(current === "dark" ? "light" : "dark");
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
});

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

// Dynamic projects, featured carousel, project drawer, and language switching
const appState = {
    language: localStorage.getItem("portfolioLanguage") || "en",
    projects: [],
    featuredIndex: 0,
    activeCategory: "all",
    originalFeaturedOrderMap: {}
};

const projectGridEl = document.querySelector(".projects-grid");
const projectsPrevEl = document.getElementById("projectsPrev");
const projectsNextEl = document.getElementById("projectsNext");
const featuredTrackEl = document.getElementById("featuredTrack");
const featuredPrevEl = document.getElementById("featuredPrev");
const featuredNextEl = document.getElementById("featuredNext");
const featuredSpotlightImageEl = document.getElementById("featuredSpotlightImage");
const featuredSpotlightMetaEl = document.getElementById("featuredSpotlightMeta");
const featuredSpotlightKickerEl = document.getElementById("featuredSpotlightKicker");
const featuredSpotlightTitleEl = document.getElementById("featuredSpotlightTitle");
const featuredSpotlightDetailsEl = document.getElementById("featuredSpotlightDetails");
const featuredSpotlightTagsEl = document.getElementById("featuredSpotlightTags");
const featuredSpotlightLiveEl = document.getElementById("featuredSpotlightLive");
const featuredSpotlightDetailsBtnEl = document.getElementById("featuredSpotlightDetailsBtn");
const projectDrawerEl = document.getElementById("projectDrawer");
const projectDrawerCloseEl = document.getElementById("projectDrawerClose");
const languageToggleEl = document.getElementById("languageToggle");
const quickManageFeaturedEl = document.getElementById("quickManageFeatured");
const featuredOrderPanelEl = document.getElementById("featuredOrderPanel");
const featuredOrderCloseEl = document.getElementById("featuredOrderClose");
const featuredOrderListEl = document.getElementById("featuredOrderList");
const featuredOrderSaveEl = document.getElementById("featuredOrderSave");
const featuredOrderResetEl = document.getElementById("featuredOrderReset");

const i18n = {
    en: {
        home: "Home",
        about: "About",
        skills: "Skills",
        services: "Services",
        projects: "Projects",
        education: "Education",
        contact: "Contact",
        resume: "Resume",
        heroEyebrow: "Data Science • Engineering • Design",
        heroTitle: "Data Scientist & Product-Minded Engineer",
        heroBody: "Based in Bangladesh and finishing my CSE degree at Pundra University of Science and Technology, I blend machine learning, analytics storytelling, and front-end craft to ship reliable, insight-led products people can use and trust.",
        heroSub: "I help founders and student teams turn messy data into dashboards, ML prototypes, and shippable web experiences.",
        viewProjects: "View Projects",
        hireMe: "Hire Me!",
        aboutTitle: "About",
        skillsTitle: "Technical Skills",
        expertiseTitle: "Expertise & Stack",
        servicesTitle: "Services",
        educationTitle: "Education & Highlights",
        deepDiveTitle: "Deep Dive",
        contactTitle: "Get In Touch",
        letsWorkTogether: "Let's Work Together",
        letsWorkSub: "Open to data science projects, ML prototypes, research collaborations, and product design work. Response time: 24 hours.",
        popupSendMessage: "Send a Message",
        popupReplyTime: "I usually reply within 24 hours.",
        sendMessageBtn: "Send Message",
        tabLeadership: "Leadership",
        tabCertifications: "Certifications",
        tabExperiences: "Experiences",
        aboutP1: "I'm an aspiring data scientist who turns messy data into models and dashboards. I started with algorithms and C/C++, leveled up with Python analytics, and now build ML prototypes alongside polished web experiences.",
        aboutP2: "My focus is supervised learning, feature engineering, and experiment design with a bias for explainability and clean handoff. I ship data stories, lightweight APIs, and UIs that make insights actionable.",
        aboutP3: "Comfortable with Pandas, NumPy, scikit-learn, SQL, and visualization; currently exploring MLOps basics and deep learning for next-step projects.",
        featuredTitle: "Featured Projects",
        featuredSpotlightKicker: "Spotlight project",
        searchPlaceholder: "Search project by name, problem, solution, or tag",
        projectCarouselPrev: "Scroll projects left",
        projectCarouselNext: "Scroll projects right",
        drawerProblem: "Problem:",
        drawerSolution: "Solution:",
        drawerDetails: "Details:",
        liveLink: "Live Link",
        detailsBtn: "Details",
        drawerRepo: "Repository",
        projectCategoryAll: "All Projects",
        projectCategoryAnalytics: "Analytics",
        projectCategorySocial: "Social",
        projectCategoryProductivity: "Productivity",
        projectCategoryEducation: "Education",
        projectCategoryFinance: "Finance",
        projectCategoryComponents: "Components",
        projectCategoryDesign: "Design",
        projectCategoryGreeting: "Greetings",
        projectCategoryLearning: "Learning",
        quickTitle: "Quick Actions",
        quickTip: "Tip: press Ctrl/Cmd + K to open this panel.",
        quickJumpProjects: "Jump to Projects",
        quickJumpContact: "Jump to Contact",
        quickOpenResume: "Open Resume",
        quickToggleTheme: "Toggle Theme",
        quickManageFeatured: "Manage Featured Order",
        quickEmail: "Email Me",
        reorderTitle: "Reorder Featured Projects",
        reorderHint: "Drag items to set display order. Click save to apply.",
        reorderSave: "Save Order",
        reorderReset: "Reset",
        formName: "Name",
        formEmail: "Email",
        formProjectType: "Project Type",
        formTimeline: "Timeline",
        formMessage: "Message",
        formNamePlaceholder: "Your name",
        formEmailPlaceholder: "you@example.com",
        formMessagePlaceholder: "What would you like to build together?",
        formTypeGeneral: "General",
        formTypeWeb: "Web UI/Frontend",
        formTypeDashboard: "Dashboard/Analytics",
        formTypeBrand: "Brand/Design",
        formTypeML: "ML/Prototyping",
        formTimelineFlexible: "Flexible",
        formTimeline1to2: "1-2 weeks",
        formTimeline1month: "~1 month",
        formTimelineOngoing: "Longer / ongoing",
        footerAboutTitle: "About Me",
        footerLinksTitle: "Quick Links",
        footerFollowTitle: "Follow Me",
        contactInfoEmail: "Email",
        contactInfoPhone: "Phone",
        contactInfoLocation: "Location",
        connectWithMe: "Connect with me",
        blogLabel: "Blogs",
        all: "All",
        projectsShown: (v, t) => `${v} of ${t} projects shown`
    },
    bn: {
        home: "হোম",
        about: "পরিচিতি",
        skills: "দক্ষতা",
        services: "সেবা",
        projects: "প্রজেক্ট",
        education: "শিক্ষা",
        contact: "যোগাযোগ",
        resume: "রিজিউমে",
        heroEyebrow: "ডাটা সায়েন্স • ইঞ্জিনিয়ারিং • ডিজাইন",
        heroTitle: "ডাটা সায়েন্টিস্ট ও প্রোডাক্ট-ফোকাসড ইঞ্জিনিয়ার",
        heroBody: "বাংলাদেশে অবস্থান করে এবং পুন্দ্র ইউনিভার্সিটিতে CSE শেষ করার পথে আমি machine learning, analytics storytelling এবং front-end craft একসাথে ব্যবহার করে ব্যবহারযোগ্য ও নির্ভরযোগ্য প্রোডাক্ট তৈরি করি।",
        heroSub: "আমি প্রতিষ্ঠাতা ও স্টুডেন্ট টিমকে জটিল ডাটা থেকে ড্যাশবোর্ড, এমএল প্রোটোটাইপ ও ব্যবহারযোগ্য ওয়েব এক্সপেরিয়েন্স তৈরি করতে সাহায্য করি।",
        viewProjects: "প্রজেক্ট দেখুন",
        hireMe: "আমাকে হায়ার করুন",
        aboutTitle: "পরিচিতি",
        skillsTitle: "টেকনিক্যাল দক্ষতা",
        expertiseTitle: "দক্ষতা ও টেক স্ট্যাক",
        servicesTitle: "সেবা",
        educationTitle: "শিক্ষা ও অর্জন",
        deepDiveTitle: "বিস্তারিত",
        contactTitle: "যোগাযোগ করুন",
        letsWorkTogether: "চলুন একসাথে কাজ করি",
        letsWorkSub: "ডাটা সায়েন্স প্রজেক্ট, এমএল প্রোটোটাইপ, রিসার্চ সহযোগিতা এবং প্রোডাক্ট ডিজাইন কাজের জন্য আমি উন্মুক্ত। সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দিই।",
        popupSendMessage: "বার্তা পাঠান",
        popupReplyTime: "আমি সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দিই।",
        sendMessageBtn: "বার্তা পাঠান",
        tabLeadership: "নেতৃত্ব",
        tabCertifications: "সার্টিফিকেট",
        tabExperiences: "অভিজ্ঞতা",
        aboutP1: "আমি একজন aspiring data scientist, যে জটিল ডাটাকে মডেল ও ড্যাশবোর্ডে রূপ দিই। অ্যালগরিদম ও C/C++ থেকে শুরু করে Python analytics-এ এগিয়ে এখন ML prototype ও polished web experience তৈরি করি।",
        aboutP2: "আমার মূল ফোকাস supervised learning, feature engineering এবং experiment design; explainability ও clean handoff আমার অগ্রাধিকার।",
        aboutP3: "Pandas, NumPy, scikit-learn, SQL ও visualization-এ কাজ করি; পাশাপাশি MLOps basics ও deep learning শিখছি।",
        featuredTitle: "ফিচারড প্রজেক্ট",
        featuredSpotlightKicker: "স্পটলাইট প্রজেক্ট",
        searchPlaceholder: "নাম, সমস্যা, সমাধান বা ট্যাগ দিয়ে প্রজেক্ট খুঁজুন",
        projectCarouselPrev: "প্রজেক্ট বামে সরান",
        projectCarouselNext: "প্রজেক্ট ডানে সরান",
        drawerProblem: "সমস্যা:",
        drawerSolution: "সমাধান:",
        drawerDetails: "বিস্তারিত:",
        liveLink: "লাইভ লিংক",
        detailsBtn: "বিস্তারিত",
        drawerRepo: "রিপোজিটরি",
        projectCategoryAll: "সব প্রজেক্ট",
        projectCategoryAnalytics: "অ্যানালিটিক্স",
        projectCategorySocial: "সোশ্যাল",
        projectCategoryProductivity: "প্রোডাক্টিভিটি",
        projectCategoryEducation: "শিক্ষা",
        projectCategoryFinance: "ফাইন্যান্স",
        projectCategoryComponents: "কম্পোনেন্ট",
        projectCategoryDesign: "ডিজাইন",
        projectCategoryGreeting: "শুভেচ্ছা",
        projectCategoryLearning: "লার্নিং",
        quickTitle: "দ্রুত অ্যাকশন",
        quickTip: "টিপ: Ctrl/Cmd + K চাপলে এই প্যানেল খুলবে।",
        quickJumpProjects: "প্রজেক্টে যান",
        quickJumpContact: "যোগাযোগে যান",
        quickOpenResume: "রিজিউমে খুলুন",
        quickToggleTheme: "থিম পরিবর্তন",
        quickManageFeatured: "ফিচারড অর্ডার সাজান",
        quickEmail: "ইমেইল করুন",
        reorderTitle: "ফিচারড প্রজেক্টের অর্ডার সাজান",
        reorderHint: "প্রজেক্টগুলো drag করে অর্ডার দিন। Save চাপলে প্রয়োগ হবে।",
        reorderSave: "অর্ডার সংরক্ষণ",
        reorderReset: "রিসেট",
        formName: "নাম",
        formEmail: "ইমেইল",
        formProjectType: "প্রজেক্টের ধরন",
        formTimeline: "সময়সীমা",
        formMessage: "বার্তা",
        formNamePlaceholder: "আপনার নাম",
        formEmailPlaceholder: "you@example.com",
        formMessagePlaceholder: "আপনি কী তৈরি করতে চান তা লিখুন",
        formTypeGeneral: "সাধারণ",
        formTypeWeb: "ওয়েব UI/ফ্রন্টএন্ড",
        formTypeDashboard: "ড্যাশবোর্ড/অ্যানালিটিক্স",
        formTypeBrand: "ব্র্যান্ড/ডিজাইন",
        formTypeML: "এমএল/প্রোটোটাইপ",
        formTimelineFlexible: "নমনীয়",
        formTimeline1to2: "১-২ সপ্তাহ",
        formTimeline1month: "প্রায় ১ মাস",
        formTimelineOngoing: "দীর্ঘমেয়াদী / চলমান",
        footerAboutTitle: "আমার সম্পর্কে",
        footerLinksTitle: "দ্রুত লিংক",
        footerFollowTitle: "ফলো করুন",
        contactInfoEmail: "ইমেইল",
        contactInfoPhone: "ফোন",
        contactInfoLocation: "অবস্থান",
        connectWithMe: "সংযুক্ত থাকুন",
        blogLabel: "ব্লগ",
        all: "সব",
        projectsShown: (v, t) => `${t}টির মধ্যে ${v}টি প্রজেক্ট দেখানো হচ্ছে`
    }
};

const t = (key) => i18n[appState.language]?.[key] || i18n.en[key] || key;

const getField = (project, key) => {
    const bnKey = `${key}Bn`;
    if (appState.language === "bn" && project[bnKey]) return project[bnKey];
    return project[key] || "";
};

const getCategoryLabel = (category = "all") => {
        if (category === "all") return t("projectCategoryAll");
        const key = `projectCategory${String(category).replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase())}`;
        return t(key);
};

const createProjectCard = (project, index = 0) => {
    const tags = (project.tags || []).map(tag => `<span>${tag}</span>`).join("");
        const cardNumber = String(index + 1).padStart(2, "0");
    return `
            <article class="project-card" data-project-id="${project.id}" data-category="${project.category || "all"}">
        <div class="project-image">
          <img src="${project.image}" alt="${getField(project, "title")}" />
        </div>
        <div class="project-copy">
                    <div class="project-card-topline">
                        <div class="project-card-badges">
                            <span class="project-card-number">Project ${cardNumber}</span>
                            <span class="project-card-category">${getCategoryLabel(project.category || "all")}</span>
                        </div>
                        <span class="project-card-status">Live demo</span>
                    </div>
          <h3>${getField(project, "title")}</h3>
                    <p class="project-summary">${getField(project, "details")}</p>
          <p class="project-blurb"><span class="project-label">${t("drawerProblem")}</span> ${getField(project, "problem")}</p>
          <p class="project-blurb"><span class="project-label">${t("drawerSolution")}</span> ${getField(project, "solution")}</p>
          <div class="project-tags">${tags}</div>
        </div>
        <div class="project-buttons">
                    <a href="${project.live}" class="btn live-link" target="_blank">${t("liveLink")}</a>
          <a href="${project.repo}" class="btn repo-link" target="_blank">${t("drawerRepo")}</a>
                    <button class="btn details-btn" type="button" data-project-id="${project.id}">${t("detailsBtn")}</button>
        </div>
      </article>
    `;
};

const getFeaturedProjects = () => {
        return appState.projects
                .filter((p) => p.featured)
                .sort((a, b) => (Number(a.order) || 9999) - (Number(b.order) || 9999) || a.title.localeCompare(b.title));
};

const renderProjectsFromData = () => {
    if (!projectGridEl || !appState.projects.length) return;
    projectGridEl.innerHTML = appState.projects.map((project, index) => createProjectCard(project, index)).join("");
    document.dispatchEvent(new CustomEvent("projects:updated"));
};

const renderFeaturedProjects = () => {
    if (!featuredTrackEl) return;
    const featured = getFeaturedProjects();
    if (!featured.length) {
        featuredTrackEl.innerHTML = "";
        renderFeaturedSpotlight(null, 0, 0);
        return;
    }

    featuredTrackEl.innerHTML = featured.map((project) => `
      <article class="featured-card" data-project-id="${project.id}">
        <img src="${project.image}" alt="${getField(project, "title")}" />
        <div class="featured-card-copy">
          <h4>${getField(project, "title")}</h4>
          <p>${getField(project, "details")}</p>
                    <button type="button" class="btn details-btn" data-project-id="${project.id}">${t("detailsBtn")}</button>
        </div>
      </article>
    `).join("");

    appState.featuredIndex = Math.min(appState.featuredIndex, featured.length - 1);
    renderFeaturedSpotlight(featured[appState.featuredIndex], appState.featuredIndex, featured.length);
    updateFeaturedPosition();
};

const renderFeaturedSpotlight = (project, index = 0, total = 0) => {
    if (!project) {
        if (featuredSpotlightTitleEl) featuredSpotlightTitleEl.textContent = "";
        if (featuredSpotlightDetailsEl) featuredSpotlightDetailsEl.textContent = "";
        if (featuredSpotlightTagsEl) featuredSpotlightTagsEl.innerHTML = "";
        return;
    }

    if (featuredSpotlightImageEl) {
        featuredSpotlightImageEl.src = project.image;
        featuredSpotlightImageEl.alt = getField(project, "title");
    }
    if (featuredSpotlightMetaEl) {
        featuredSpotlightMetaEl.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total || getFeaturedProjects().length).padStart(2, "0")}`;
    }
    if (featuredSpotlightKickerEl) {
        featuredSpotlightKickerEl.textContent = t("featuredSpotlightKicker");
    }
    if (featuredSpotlightTitleEl) featuredSpotlightTitleEl.textContent = getField(project, "title");
    if (featuredSpotlightDetailsEl) featuredSpotlightDetailsEl.textContent = getField(project, "details");
    if (featuredSpotlightTagsEl) {
        featuredSpotlightTagsEl.innerHTML = (project.tags || []).map((tag) => `<span>${tag}</span>`).join("");
    }
    if (featuredSpotlightLiveEl) {
        featuredSpotlightLiveEl.href = project.live || "#";
        featuredSpotlightLiveEl.textContent = t("liveLink");
    }
    if (featuredSpotlightDetailsBtnEl) {
        featuredSpotlightDetailsBtnEl.dataset.projectId = project.id;
        featuredSpotlightDetailsBtnEl.textContent = t("detailsBtn");
    }
};

const updateFeaturedPosition = () => {
    if (!featuredTrackEl) return;
    const offset = appState.featuredIndex * 100;
    featuredTrackEl.style.transform = `translateX(-${offset}%)`;
};

const setLanguageUI = () => {
    const navMap = [
        ["#hero", "home"],
        ["#about", "about"],
        ["#skills", "skills"],
        ["#services", "services"],
        ["#projects", "projects"],
        ["#education", "education"],
        ["#contact", "contact"]
    ];

    navMap.forEach(([href, key]) => {
        const el = document.querySelector(`.nav-links a[href='${href}'] .nav-label`);
        if (el) el.textContent = t(key);
    });

    const resumeLabel = document.querySelector(".btn-resume .nav-label");
    if (resumeLabel) resumeLabel.textContent = t("resume");
    const eyebrow = document.querySelector("#hero .eyebrow");
    if (eyebrow) eyebrow.textContent = t("heroEyebrow");
    const heroTitle = document.querySelector("#hero h1");
    if (heroTitle) heroTitle.textContent = t("heroTitle");
    const heroSub = document.querySelector("#hero .hero-sub");
    if (heroSub) heroSub.textContent = t("heroSub");
    const heroBody = document.querySelector("#hero .hero-body");
    if (heroBody) heroBody.textContent = t("heroBody");
    const viewProjectsBtn = document.querySelector("#hero .btn-primary");
    if (viewProjectsBtn) viewProjectsBtn.textContent = t("viewProjects");
    const hireMeBtn = document.querySelector("#hero .btn-ghost");
    if (hireMeBtn) hireMeBtn.textContent = t("hireMe");

    const sectionTextMap = [
        ["#about .section-title", "aboutTitle"],
        ["#skills .section-title", "skillsTitle"],
        ["#expertise .section-title", "expertiseTitle"],
        ["#services .section-title", "servicesTitle"],
        ["#education .section-title", "educationTitle"],
        ["#profile-tabs .section-title", "deepDiveTitle"],
        ["#contact .section-title", "contactTitle"],
        ["#contact .contact-header h3", "letsWorkTogether"],
        ["#contact .contact-header p", "letsWorkSub"],
        ["#contact-popup h3", "popupSendMessage"],
        ["#contact-popup .contact-popup-sub", "popupReplyTime"],
        [".tab-link[data-tab='Leadership']", "tabLeadership"],
        [".tab-link[data-tab='Achievement']", "tabCertifications"],
        [".tab-link[data-tab='Experiences']", "tabExperiences"],
        ["#about .about-text p:nth-of-type(1)", "aboutP1"],
        ["#about .about-text p:nth-of-type(2)", "aboutP2"],
        ["#about .about-text p:nth-of-type(3)", "aboutP3"],
        [".footer-about h3", "footerAboutTitle"],
        [".footer-links h3", "footerLinksTitle"],
        [".footer-social h3", "footerFollowTitle"],
        ["#quickJumpProjectsLabel", "quickJumpProjects"],
        ["#quickJumpContactLabel", "quickJumpContact"],
        ["#quickOpenResumeLabel", "quickOpenResume"],
        ["#quickToggleThemeLabel", "quickToggleTheme"],
        ["#quickManageFeaturedLabel", "quickManageFeatured"],
        ["#quickEmailLabel", "quickEmail"],
        ["#featuredOrderTitle", "reorderTitle"],
        ["#featuredOrderHint", "reorderHint"],
        ["#featuredOrderSave", "reorderSave"],
        ["#featuredOrderReset", "reorderReset"]
    ];

    sectionTextMap.forEach(([selector, key]) => {
        const el = document.querySelector(selector);
        if (el) el.textContent = t(key);
    });

    const infoLabels = document.querySelectorAll(".contact-info-item .info-label");
    if (infoLabels[0]) infoLabels[0].textContent = t("contactInfoEmail");
    if (infoLabels[1]) infoLabels[1].textContent = t("contactInfoPhone");
    if (infoLabels[2]) infoLabels[2].textContent = t("contactInfoLocation");

    const connectLabel = document.querySelector(".links-label");
    if (connectLabel) connectLabel.textContent = t("connectWithMe");

    const blogNav = document.querySelector(".nav-links a[href='Blogs/index.html'] .nav-label");
    if (blogNav) blogNav.textContent = t("blogLabel");

    const blogFooter = document.querySelector(".footer-links a[href='Blogs/index.html']");
    if (blogFooter) blogFooter.textContent = t("blogLabel");

    const formNameLabel = document.querySelector("label[for='contact-name']");
    const formEmailLabel = document.querySelector("label[for='contact-email']");
    const formTypeLabel = document.querySelector("label[for='contact-type']");
    const formTimelineLabel = document.querySelector("label[for='contact-timeline']");
    const formMessageLabel = document.querySelector("label[for='contact-message']");
    if (formNameLabel) formNameLabel.textContent = t("formName");
    if (formEmailLabel) formEmailLabel.textContent = t("formEmail");
    if (formTypeLabel) formTypeLabel.textContent = t("formProjectType");
    if (formTimelineLabel) formTimelineLabel.textContent = t("formTimeline");
    if (formMessageLabel) formMessageLabel.textContent = t("formMessage");

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    if (nameInput) nameInput.placeholder = t("formNamePlaceholder");
    if (emailInput) emailInput.placeholder = t("formEmailPlaceholder");
    if (messageInput) messageInput.placeholder = t("formMessagePlaceholder");

    const typeSelect = document.getElementById("contact-type");
    if (typeSelect?.options?.length >= 5) {
        typeSelect.options[0].text = t("formTypeGeneral");
        typeSelect.options[1].text = t("formTypeWeb");
        typeSelect.options[2].text = t("formTypeDashboard");
        typeSelect.options[3].text = t("formTypeBrand");
        typeSelect.options[4].text = t("formTypeML");
    }

    const timelineSelect = document.getElementById("contact-timeline");
    if (timelineSelect?.options?.length >= 4) {
        timelineSelect.options[0].text = t("formTimelineFlexible");
        timelineSelect.options[1].text = t("formTimeline1to2");
        timelineSelect.options[2].text = t("formTimeline1month");
        timelineSelect.options[3].text = t("formTimelineOngoing");
    }

    const sendBtnSpan = document.querySelector("#contact-form button[type='submit'] span");
    if (sendBtnSpan) sendBtnSpan.textContent = t("sendMessageBtn");
    const featuredTitle = document.getElementById("featuredProjectsTitle");
    if (featuredTitle) featuredTitle.textContent = t("featuredTitle");
    const featuredSpotlightKicker = document.getElementById("featuredSpotlightKicker");
    if (featuredSpotlightKicker) featuredSpotlightKicker.textContent = t("featuredSpotlightKicker");
    const searchInput = document.getElementById("projectSearch");
    if (searchInput) searchInput.placeholder = t("searchPlaceholder");
    if (projectsPrevEl) projectsPrevEl.setAttribute("aria-label", t("projectCarouselPrev"));
    if (projectsNextEl) projectsNextEl.setAttribute("aria-label", t("projectCarouselNext"));
    const quickTitle = document.querySelector(".quick-actions-head h3");
    if (quickTitle) quickTitle.textContent = t("quickTitle");
    const quickTip = document.querySelector(".quick-actions-note");
    if (quickTip) quickTip.textContent = t("quickTip");

    if (languageToggleEl) {
        languageToggleEl.textContent = appState.language === "bn" ? "BN/EN" : "EN/BN";
        languageToggleEl.setAttribute("aria-label", appState.language === "bn" ? "Switch to English" : "Switch to Bangla");
    }
};

const openProjectDrawer = (projectId) => {
    if (!projectDrawerEl) return;
    const project = appState.projects.find((p) => p.id === projectId);
    if (!project) return;

    const img = document.getElementById("projectDrawerImage");
    const title = document.getElementById("projectDrawerTitle");
    const problem = document.getElementById("projectDrawerProblem");
    const solution = document.getElementById("projectDrawerSolution");
    const details = document.getElementById("projectDrawerDetails");
    const tags = document.getElementById("projectDrawerTags");
    const live = document.getElementById("projectDrawerLive");
    const repo = document.getElementById("projectDrawerRepo");

    if (img) {
        img.src = project.image;
        img.alt = getField(project, "title");
    }
    if (title) title.textContent = getField(project, "title");
    if (problem) problem.textContent = `${t("drawerProblem")} ${getField(project, "problem")}`;
    if (solution) solution.textContent = `${t("drawerSolution")} ${getField(project, "solution")}`;
    if (details) details.textContent = `${t("drawerDetails")} ${getField(project, "details")}`;
    if (tags) {
        tags.innerHTML = (project.tags || []).map(tag => `<span>${tag}</span>`).join("");
    }
    if (live) live.href = project.live || "#";
    if (repo) {
        repo.href = project.repo || "#";
        repo.textContent = t("drawerRepo");
    }

    projectDrawerEl.classList.add("open");
    projectDrawerEl.setAttribute("aria-hidden", "false");
};

const closeProjectDrawer = () => {
    if (!projectDrawerEl) return;
    projectDrawerEl.classList.remove("open");
    projectDrawerEl.setAttribute("aria-hidden", "true");
};

document.addEventListener("click", (e) => {
    const detailsBtn = e.target.closest(".details-btn");
    if (!detailsBtn) return;

    const projectId = detailsBtn.dataset.projectId;
    if (projectId) {
        openProjectDrawer(projectId);
        return;
    }

    const card = detailsBtn.closest(".project-card");
    if (!card || !projectDrawerEl) return;

    const imgSrc = card.querySelector(".project-image img")?.getAttribute("src") || "";
    const titleText = card.querySelector(".project-copy h3")?.textContent?.trim() || "Project";
    const blurbs = card.querySelectorAll(".project-blurb");
    const problemText = blurbs[0]?.textContent?.replace(/^Problem:\s*/i, "").trim() || "";
    const solutionText = blurbs[1]?.textContent?.replace(/^Solution:\s*/i, "").trim() || "";
    const detailsText = detailsBtn.getAttribute("data-details") || "";
    const tagsText = Array.from(card.querySelectorAll(".project-tags span")).map(el => el.textContent.trim());

    const img = document.getElementById("projectDrawerImage");
    const title = document.getElementById("projectDrawerTitle");
    const problem = document.getElementById("projectDrawerProblem");
    const solution = document.getElementById("projectDrawerSolution");
    const details = document.getElementById("projectDrawerDetails");
    const tags = document.getElementById("projectDrawerTags");
    const live = document.getElementById("projectDrawerLive");
    const repo = document.getElementById("projectDrawerRepo");

    if (img) {
        img.src = imgSrc;
        img.alt = titleText;
    }
    if (title) title.textContent = titleText;
    if (problem) problem.textContent = `${t("drawerProblem")} ${problemText}`;
    if (solution) solution.textContent = `${t("drawerSolution")} ${solutionText}`;
    if (details) details.textContent = `${t("drawerDetails")} ${detailsText}`;
    if (tags) {
        tags.innerHTML = tagsText.map(tag => `<span>${tag}</span>`).join("");
    }
    if (live) live.href = card.querySelector(".live-link")?.getAttribute("href") || "#";
    if (repo) {
        repo.href = card.querySelector(".repo-link")?.getAttribute("href") || "#";
        repo.textContent = t("drawerRepo");
    }

    projectDrawerEl.classList.add("open");
    projectDrawerEl.setAttribute("aria-hidden", "false");
});

if (projectDrawerCloseEl) {
    projectDrawerCloseEl.addEventListener("click", closeProjectDrawer);
}

if (projectDrawerEl) {
    projectDrawerEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("project-drawer") || e.target.classList.contains("project-drawer-backdrop")) {
            closeProjectDrawer();
        }
    });
}

if (featuredPrevEl) {
    featuredPrevEl.addEventListener("click", () => {
        const total = getFeaturedProjects().length;
        if (!total) return;
        appState.featuredIndex = (appState.featuredIndex - 1 + total) % total;
        updateFeaturedPosition();
    });
}

if (featuredNextEl) {
    featuredNextEl.addEventListener("click", () => {
        const total = getFeaturedProjects().length;
        if (!total) return;
        appState.featuredIndex = (appState.featuredIndex + 1) % total;
        updateFeaturedPosition();
    });
}

if (projectsPrevEl && projectGridEl) {
    projectsPrevEl.addEventListener("click", () => {
        projectGridEl.scrollBy({ left: -Math.max(projectGridEl.clientWidth * 0.82, 320), behavior: "smooth" });
    });
}

if (projectsNextEl && projectGridEl) {
    projectsNextEl.addEventListener("click", () => {
        projectGridEl.scrollBy({ left: Math.max(projectGridEl.clientWidth * 0.82, 320), behavior: "smooth" });
    });
}

const renderFeaturedOrderList = () => {
    if (!featuredOrderListEl) return;
    const featured = getFeaturedProjects();
    featuredOrderListEl.innerHTML = featured.map((project) => `
      <li class="featured-order-item" draggable="true" data-project-id="${project.id}">
        <i class="fa-solid fa-grip-lines"></i>
        <span>${getField(project, "title")}</span>
      </li>
    `).join("");

    let draggingId = "";
    featuredOrderListEl.querySelectorAll(".featured-order-item").forEach((item) => {
        item.addEventListener("dragstart", () => {
            draggingId = item.dataset.projectId || "";
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();
            const targetId = item.dataset.projectId || "";
            if (!draggingId || draggingId === targetId) return;
            const sourceEl = featuredOrderListEl.querySelector(`[data-project-id='${draggingId}']`);
            const targetEl = featuredOrderListEl.querySelector(`[data-project-id='${targetId}']`);
            if (!sourceEl || !targetEl) return;
            featuredOrderListEl.insertBefore(sourceEl, targetEl);
        });
    });
};

const openFeaturedOrderPanel = () => {
    if (!featuredOrderPanelEl) return;
    renderFeaturedOrderList();
    featuredOrderPanelEl.classList.add("open");
    featuredOrderPanelEl.setAttribute("aria-hidden", "false");
};

const closeFeaturedOrderPanel = () => {
    if (!featuredOrderPanelEl) return;
    featuredOrderPanelEl.classList.remove("open");
    featuredOrderPanelEl.setAttribute("aria-hidden", "true");
};

const applyFeaturedOrderFromPanel = () => {
    if (!featuredOrderListEl) return;
    const orderMap = {};
    Array.from(featuredOrderListEl.querySelectorAll(".featured-order-item")).forEach((item, index) => {
        const id = item.dataset.projectId;
        if (id) orderMap[id] = index + 1;
    });

    appState.projects = appState.projects.map((project) => {
        if (!project.featured) return project;
        return {
            ...project,
            order: orderMap[project.id] || project.order || 9999
        };
    });

    localStorage.setItem("featuredOrderMap", JSON.stringify(orderMap));
    appState.featuredIndex = 0;
    renderFeaturedProjects();
    closeFeaturedOrderPanel();
    showNotification("Featured Order Updated", "Featured project order applied successfully.", "success", 3200);
};

const resetFeaturedOrder = () => {
    localStorage.removeItem("featuredOrderMap");
    appState.projects = appState.projects.map((project) => {
        if (!project.featured) return project;
        return {
            ...project,
            order: appState.originalFeaturedOrderMap[project.id] || project.order || 9999
        };
    });
    appState.featuredIndex = 0;
    renderFeaturedProjects();
    renderFeaturedOrderList();
};

if (quickManageFeaturedEl) {
    quickManageFeaturedEl.addEventListener("click", openFeaturedOrderPanel);
}

if (featuredOrderCloseEl) {
    featuredOrderCloseEl.addEventListener("click", closeFeaturedOrderPanel);
}

if (featuredOrderSaveEl) {
    featuredOrderSaveEl.addEventListener("click", applyFeaturedOrderFromPanel);
}

if (featuredOrderResetEl) {
    featuredOrderResetEl.addEventListener("click", resetFeaturedOrder);
}

if (featuredOrderPanelEl) {
    featuredOrderPanelEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("featured-order-backdrop")) {
            closeFeaturedOrderPanel();
        }
    });
}

if (languageToggleEl) {
    languageToggleEl.addEventListener("click", () => {
        appState.language = appState.language === "en" ? "bn" : "en";
        localStorage.setItem("portfolioLanguage", appState.language);
        setLanguageUI();
        renderProjectsFromData();
        renderFeaturedProjects();
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    setLanguageUI();

    const validateProjects = (projects) => {
        const errors = [];
        const valid = [];
        const requiredStringFields = ["id", "title", "problem", "solution", "details", "image", "live", "repo"];

        projects.forEach((project, index) => {
            const issues = [];
            if (!project || typeof project !== "object") {
                errors.push(`Entry #${index + 1}: invalid object`);
                return;
            }

            requiredStringFields.forEach((field) => {
                if (typeof project[field] !== "string" || !project[field].trim()) {
                    issues.push(`missing ${field}`);
                }
            });

            if (!Array.isArray(project.tags) || !project.tags.length) {
                issues.push("tags must be a non-empty array");
            }

            if (typeof project.featured !== "boolean") {
                issues.push("featured must be boolean");
            }

            if (project.order !== undefined && Number.isNaN(Number(project.order))) {
                issues.push("order must be a number");
            }

            if (issues.length) {
                const safeId = project.id || `entry-${index + 1}`;
                errors.push(`${safeId}: ${issues.join(", ")}`);
            } else {
                valid.push({ ...project, order: Number(project.order) || 9999 });
            }
        });

        return { valid, errors };
    };

    try {
        const response = await fetch("data/projects.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load projects.json");
        const data = await response.json();
        if (Array.isArray(data) && data.length) {
            const { valid, errors } = validateProjects(data);
            appState.projects = valid;

            appState.originalFeaturedOrderMap = {};
            appState.projects.forEach((project, idx) => {
                if (project.featured) {
                    appState.originalFeaturedOrderMap[project.id] = Number(project.order) || idx + 1;
                }
            });

            const savedOrderRaw = localStorage.getItem("featuredOrderMap");
            if (savedOrderRaw) {
                try {
                    const savedOrder = JSON.parse(savedOrderRaw);
                    appState.projects = appState.projects.map((project) => {
                        if (!project.featured) return project;
                        return {
                            ...project,
                            order: Number(savedOrder[project.id]) || project.order || 9999
                        };
                    });
                } catch (e) {
                    localStorage.removeItem("featuredOrderMap");
                }
            }

            if (errors.length) {
                const preview = errors.slice(0, 3).join(" | ");
                showNotification("Project Data Warning", `${errors.length} schema issue(s): ${preview}`, "error", 7000);
                console.warn("Project schema issues:", errors);
            }

            renderProjectsFromData();
            renderFeaturedProjects();
        }
    } catch (error) {
        console.warn("Using inline project cards fallback:", error.message);
    }
});

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
        const name = (document.getElementById("contact-name")?.value || "").trim();
        const email = (document.getElementById("contact-email")?.value || "").trim();
        const message = (document.getElementById("contact-message")?.value || "").trim();
        if (!name || !email || !message) return;

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:mdahsanurrahaman2456@gmail.com?subject=${subject}&body=${body}`;
        closeContactPopup();
    });
}

// UX functional upgrades
document.addEventListener("DOMContentLoaded", () => {
    const scrollProgressFill = document.getElementById("scrollProgressFill");
    const backToTopBtn = document.getElementById("backToTop");
    const projectSearch = document.getElementById("projectSearch");
    const projectFilters = document.getElementById("projectFilters");
    const projectCount = document.getElementById("projectCount");
    let projectCards = [];

    const quickFab = document.getElementById("quickActionsFab");
    const quickPanel = document.getElementById("quickActionsPanel");
    const quickClose = document.getElementById("quickActionsClose");
    const quickToggleTheme = document.getElementById("quickToggleTheme");
    const themeToggle = document.getElementById("themeToggle");

    let activeCategory = "all";

    const getText = (key) => {
        if (typeof t === "function") return t(key);
        return key;
    };

    const refreshProjectCards = () => {
        projectCards = Array.from(document.querySelectorAll(".projects-grid .project-card"));
    };

    const updateScrollProgress = () => {
        if (!scrollProgressFill) return;
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        scrollProgressFill.style.width = `${Math.min(progress, 100)}%`;

        if (backToTopBtn) {
            backToTopBtn.classList.toggle("visible", scrollTop > 420);
        }
    };

    const normalize = (text) => (text || "").toLowerCase().trim();

    const tokenizeTags = (card) => {
        return Array.from(card.querySelectorAll(".project-tags span"))
            .map((el) => normalize(el.textContent))
            .filter(Boolean);
    };

    const getCardCategory = (card) => normalize(card.dataset.category || "all");

    const applyProjectFilters = () => {
        if (!projectCards.length) return;
        const query = normalize(projectSearch?.value || "");
        let visibleCount = 0;

        projectCards.forEach((card) => {
            const searchable = normalize(card.innerText);
            const categoryMatch = activeCategory === "all" || getCardCategory(card) === activeCategory;
            const textMatch = !query || searchable.includes(query);
            const visible = categoryMatch && textMatch;

            card.classList.toggle("is-hidden", !visible);
            card.setAttribute("aria-hidden", visible ? "false" : "true");
            if (visible) visibleCount++;
        });

        if (projectCount) {
            const textTemplate = getText("projectsShown");
            projectCount.textContent = typeof textTemplate === "function"
                ? textTemplate(visibleCount, projectCards.length)
                : `${visibleCount} of ${projectCards.length} projects shown`;
        }
    };

    const buildProjectFilterButtons = () => {
        if (!projectFilters || !projectCards.length) return;
        const categories = [];
        const seen = new Set();

        projectCards.forEach((card) => {
            const category = getCardCategory(card);
            if (!seen.has(category)) {
                seen.add(category);
                categories.push(category);
            }
        });

        const items = ["all", ...categories];

        projectFilters.innerHTML = "";
        items.forEach((category) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `project-filter-btn${category === activeCategory ? " active" : ""}`;
            btn.dataset.filter = category;
            btn.textContent = category === "all"
                ? getText("all")
                : getCategoryLabel(category);

            btn.addEventListener("click", () => {
                activeCategory = category;
                projectFilters
                    .querySelectorAll(".project-filter-btn")
                    .forEach((el) => el.classList.toggle("active", el.dataset.filter === category));
                applyProjectFilters();
            });

            projectFilters.appendChild(btn);
        });
    };

    const openQuickPanel = () => {
        if (!quickPanel) return;
        quickPanel.classList.add("open");
        quickPanel.setAttribute("aria-hidden", "false");
    };

    const closeQuickPanel = () => {
        if (!quickPanel) return;
        quickPanel.classList.remove("open");
        quickPanel.setAttribute("aria-hidden", "true");
    };

    if (projectSearch) {
        projectSearch.addEventListener("input", applyProjectFilters);
    }

    refreshProjectCards();
    buildProjectFilterButtons();
    applyProjectFilters();

    document.addEventListener("projects:updated", () => {
        refreshProjectCards();
        buildProjectFilterButtons();
        applyProjectFilters();
    });

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (quickFab) {
        quickFab.addEventListener("click", () => {
            if (!quickPanel) return;
            const isOpen = quickPanel.classList.contains("open");
            if (isOpen) {
                closeQuickPanel();
            } else {
                openQuickPanel();
            }
        });
    }

    if (quickClose) {
        quickClose.addEventListener("click", closeQuickPanel);
    }

    if (quickToggleTheme && themeToggle) {
        quickToggleTheme.addEventListener("click", () => {
            themeToggle.click();
        });
    }

    if (quickPanel) {
        quickPanel.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeQuickPanel);
        });
    }

    document.addEventListener("click", (e) => {
        if (!quickPanel || !quickFab) return;
        if (!quickPanel.contains(e.target) && !quickFab.contains(e.target)) {
            closeQuickPanel();
        }
    });

    document.addEventListener("keydown", (e) => {
        const isQuickShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
        if (isQuickShortcut) {
            e.preventDefault();
            if (quickPanel?.classList.contains("open")) {
                closeQuickPanel();
            } else {
                openQuickPanel();
            }
        }

        if (e.key === "Escape") {
            closeQuickPanel();
            if (typeof closeFeaturedOrderPanel === "function") {
                closeFeaturedOrderPanel();
            }
        }
    });
});