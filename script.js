// Selecting Elements
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar-links");
const revealElements = document.querySelectorAll(
    ".experience-cards, .projects-cards-detail-1, .projects-cards-detail-2"
);
const typingElement = document.querySelector(".typing");

//Smooth Scroll
navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        // Only handle internal links
        if (targetId && targetId.startsWith("#") && targetId !== "#") {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

// Active Nav Link
function setActiveNavLink() {
    let currentSection = "";
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("DOMContentLoaded", setActiveNavLink);

//Hamburger Menu
hamburger.addEventListener("click", (e) => {
    navMenu.classList.toggle("open");

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains("open")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }

    e.stopPropagation();
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
    });
});

document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
    }
});

//Scroll Animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => observer.observe(el));

// Typing Animation

const words = ["Frontend Developer", "React Developer", "JavaScript Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeEffect() {
    if (isWaiting) {
        setTimeout(typeEffect, 100);
        return;
    }

    const currentWord = words[wordIndex];

    if (!isDeleting && charIndex <= currentWord.length) {
        // Typing
        typingElement.textContent = currentWord.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentWord.length) {
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeEffect();
            }, 2000);
            return;
        }
    } else if (isDeleting && charIndex >= 0) {
        typingElement.textContent = currentWord.substring(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                typeEffect();
            }, 500);
            return;
        }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// Start the effect
setTimeout(typeEffect, 500);

//Modal Popup
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalGithub = document.getElementById("modalGithub");
const modalLive = document.getElementById("modalLive");
const modalClose = document.querySelector(".modal-close");
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("click", () => {
        modal.style.display = "flex";

        // Set with fallback values
        modalImage.src = card.dataset.image || "assets/img/placeholder.png";
        modalTitle.textContent = card.dataset.title || "Project";
        modalDescription.textContent = card.dataset.description || "No description available.";

        const githubUrl = card.dataset.github;
        const liveUrl = card.dataset.live;

        modalGithub.href = githubUrl || "#";
        modalLive.href = liveUrl || "#";

        // Disable buttons if no link
        if (!githubUrl || githubUrl === "#") {
            modalGithub.style.opacity = "0.5";
            modalGithub.style.pointerEvents = "none";
        } else {
            modalGithub.style.opacity = "1";
            modalGithub.style.pointerEvents = "auto";
        }

        if (!liveUrl || liveUrl === "#") {
            modalLive.style.opacity = "0.5";
            modalLive.style.pointerEvents = "none";
        } else {
            modalLive.style.opacity = "1";
            modalLive.style.pointerEvents = "auto";
        }
    });
});

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});

//Dark Mode
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
} else {
    body.classList.remove("dark");
    themeToggle.textContent = "🌙";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
});

//Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        preloader.style.pointerEvents = "none";
    }, 500);
});