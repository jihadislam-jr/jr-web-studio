/* =========================================================
   JIHAD ISLAM — PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= PRELOADER ================= */

    const preloader = document.querySelector(".preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");
            document.body.classList.add("loaded");

        }, 1200);

    });


    /* ================= CUSTOM CURSOR ================= */

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (window.innerWidth > 900) {

        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });

        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, .tilt-card, .tech-card"
        );

        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("hover");
            });

        });

    }


    /* ================= NAVBAR ================= */

    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const spans = menuToggle.querySelectorAll("span");

        if (navMenu.classList.contains("open")) {

            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";

        } else {

            spans[0].style.transform = "";
            spans[1].style.opacity = "";
            spans[2].style.transform = "";

        }

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            const spans = menuToggle.querySelectorAll("span");

            spans.forEach(span => {
                span.style.transform = "";
                span.style.opacity = "";
            });

        });

    });


    /* ================= SCROLL EFFECTS ================= */

    const scrollProgress = document.querySelector(".scroll-progress");
    const backTop = document.querySelector(".back-top");

    function handleScroll() {

        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        scrollProgress.style.width = `${progress}%`;


        if (scrollTop > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }


        if (scrollTop > 600) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();


    /* ================= BACK TO TOP ================= */

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* ================= ACTIVE NAV ================= */

    const sections = document.querySelectorAll("section[id]");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ================= TYPING EFFECT ================= */

    const typingElement =
        document.querySelector(".typing-text");

    const words = [
        "WEB DEVELOPER",
        "FRONTEND DEVELOPER",
        "UI DESIGNER",
        "CREATIVE DEVELOPER"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1400);
                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

            }

        }

        setTimeout(
            typeEffect,
            deleting ? 45 : 85
        );

    }

    typeEffect();


    /* ================= COUNTERS ================= */

    const counters =
        document.querySelectorAll("[data-counter]");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                const target =
                    Number(element.dataset.counter);

                let current = 0;

                const duration = 1300;
                const startTime = performance.now();

                function updateCounter(time) {

                    const progress =
                        Math.min(
                            (time - startTime) / duration,
                            1
                        );

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    current =
                        Math.floor(target * eased);

                    element.textContent =
                        current + (target === 100 ? "%" : "+");

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }

                }

                requestAnimationFrame(updateCounter);

                counterObserver.unobserve(element);

            });

        },
        {
            threshold: .7
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* ================= SKILL BARS ================= */

    const skillBars =
        document.querySelectorAll(".skill-bar span");

    const skillObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const bar = entry.target;

                bar.style.width =
                    bar.dataset.width;

                skillObserver.unobserve(bar);

            });

        },
        {
            threshold: .5
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    /* ================= 3D TILT ================= */

    const tiltCards =
        document.querySelectorAll(".tilt-card");

    if (window.innerWidth > 850) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -4;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "";

            });

        });

    }


    /* ================= HERO PARALLAX ================= */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual && window.innerWidth > 900) {

        document.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - .5);

            const y =
                (event.clientY / window.innerHeight - .5);

            heroVisual.style.transform =
                `translate(${x * 10}px, ${y * 10}px)`;

        });

    }


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.querySelector(".contact-form");

    const formStatus =
        document.querySelector(".form-status");

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const button =
            contactForm.querySelector(".submit-btn");

        button.innerHTML =
            'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

        button.disabled = true;


        setTimeout(() => {

            formStatus.textContent =
                "Thanks! Your message has been received.";

            button.innerHTML =
                'Message Sent <i class="fa-solid fa-check"></i>';

            contactForm.reset();

            setTimeout(() => {

                button.innerHTML =
                    'Send Message <i class="fa-regular fa-paper-plane"></i>';

                button.disabled = false;

            }, 2500);

        }, 1200);

    });


    /* ================= SMOOTH ANCHORS ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});