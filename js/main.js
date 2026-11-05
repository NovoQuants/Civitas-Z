/* =====================================================
   CIVITAS-X | MAIN.JS
   Main website functionality
   ===================================================== */

import { initMarket } from "./market.js";
import { initPortfolio } from "./portfolio.js";
import { initSimulations } from "./simulations.js";

// NAVIGATION

function initNavigation() {
    const nav = document.querySelector(".nav-links");
    const toggle = document.querySelector(".menu-toggle");

    if (toggle && nav) {

        toggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            toggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            toggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });
    }

    // Highlight active navigation section

    const sections = [
        ...document.querySelectorAll("section[id]")
    ];

    const links = [
        ...document.querySelectorAll(
            '.nav-links a[href^="#"]'
        )
    ];

    if (
        "IntersectionObserver" in window &&
        sections.length &&
        links.length
    ) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    links.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        );

                    });

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// SCROLL ANIMATIONS

function initRevealAnimations() {

    const elements = document.querySelectorAll(
        ".card, .model-card, .panel, .dashboard-card, .section-heading"
    );

    elements.forEach(element => {
        element.classList.add("reveal");
    });

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    currentObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });
}

// FOOTER YEAR

function initFooterYear() {

    const targets = document.querySelectorAll(
        "[data-current-year], #currentYear"
    );

    targets.forEach(target => {

        target.textContent =
            new Date().getFullYear();

    });
}

// CURRENT DATE

function initCurrentDate() {

    const targets = document.querySelectorAll(
        "[data-current-date]"
    );

    const date = new Intl.DateTimeFormat(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).format(new Date());

    targets.forEach(target => {
        target.textContent = date;
    });
}

// INITIALIZE CIVITASX

function init() {

    console.log("Initializing CivitasX...");

    initNavigation();

    initRevealAnimations();

    initFooterYear();

    initCurrentDate();

    // Initialize individual modules

    initMarket();

    initPortfolio();

    initSimulations();

    console.log("CivitasX initialized successfully.");

}

// WAIT FOR HTML TO LOAD

document.addEventListener(
    "DOMContentLoaded",
    init
);
