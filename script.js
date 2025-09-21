// Ensure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Custom Cursor Animation ---
const customCursor = document.getElementById('custom-cursor');
const body = document.body; // Reference to body

if (customCursor) {
    // Add custom cursor styling to body if JS is active
    body.classList.add('cursor-none'); // Hide default cursor via Tailwind/CSS if JS loads

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Set initial opacity to 0, and then reveal with GSAP if JS is active
    gsap.set(customCursor, { opacity: 0 }); // Ensure it's hidden before positioning

    gsap.to({}, {
        duration: 0.016,
        repeat: -1,
        onRepeat: () => {
            cursorX += (mouseX - cursorX) / 8; // Adjust smoothing here
            cursorY += (mouseY - cursorY) / 8;
            gsap.set(customCursor, {
                x: cursorX,
                y: cursorY,
                opacity: 1 // Make cursor visible once it starts moving
            });
        }
    });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.querySelectorAll('a, button, .nav-link, .mobile-nav-link, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('link-hover'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('link-hover'));
    });

    document.querySelectorAll('h1, h2, h3, h4, p, label, textarea, input').forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('text-hover'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('text-hover'));
    });
} else {
    // If custom cursor element not found, ensure default cursor is visible
    body.style.cursor = 'auto';
}


// --- Header Animation (Fade In) ---
// Changed from `gsap.from` to `gsap.fromTo` to explicitly set initial hidden state
gsap.fromTo(".header-hide", 
    { y: -100, opacity: 0 }, // from state
    { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" } // to state
);

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
// FIXED: Correctly target the close menu button
const closeMenuButton = document.getElementById('close-menu-button'); 
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuButton && mobileMenuOverlay && closeMenuButton) { // Add checks for elements
    mobileMenuButton.addEventListener('click', () => {
        gsap.to(mobileMenuOverlay, {
            x: '0%',
            duration: 0.5,
            ease: 'power3.out'
        });
    });

    closeMenuButton.addEventListener('click', () => {
        gsap.to(mobileMenuOverlay, {
            x: '-100%',
            duration: 0.5,
            ease: 'power3.in'
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            gsap.to(mobileMenuOverlay, {
                x: '-100%',
                duration: 0.5,
                ease: 'power3.in'
            });
        });
    });
}


// --- Smooth Scrolling for Navigation ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        // If targetId is just "#", scroll to top
        if (targetId === '#') {
             gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power3.inOut" });
        } else {
            gsap.to(window, { duration: 1.5, scrollTo: targetId, ease: "power3.inOut" });
        }
    });
});

// --- Hero Section Animations ---
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

// Main content entrance
// Changed from `gsap.from` to `gsap.fromTo` for explicit initial state, matching content visible by default
heroTimeline.fromTo(".hero-content", 
    { opacity: 0, y: 50, scale: 0.9 }, // from state
    { opacity: 1, y: 0, scale: 1, duration: 1.5, delay: 0.8 } // to state
)
.fromTo(".hero-content h1", 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 1 }, "-=1"
) 
.fromTo(".hero-content p", 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 1 }, "-=0.7"
)
.fromTo(".hero-content a", 
    { opacity: 0, y: 20, scale: 0.8 }, 
    { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.5"
);

// Animated abstract shape
heroTimeline.fromTo("#hero-shape", 
    { scale: 0, opacity: 0, rotation: 180 }, // from state
    { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "<0.3"
);


// --- Scroll-Triggered Section Reveals ---
// All .from() animations implicitly hide the element first and then animate to its current CSS state.
// This works now that `opacity-0` and `transform` classes are removed from HTML.

// About Section
gsap.from(".about-text", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});
gsap.from(".about-image", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out"
});

// Portfolio Section Heading
gsap.from(".portfolio-heading", {
    scrollTrigger: {
        trigger: "#portfolio",
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Portfolio Items Staggered Reveal
gsap.from(".portfolio-item", {
    scrollTrigger: {
        trigger: "#portfolio",
        start: "top 70%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 80,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});

// Skills Section Heading
gsap.from(".skills-heading", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Skills Items Staggered Reveal
gsap.from(".skill-item", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top 70%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 80,
    opacity: 0,
    stagger: 0.15,
    duration: 0.7,
    ease: "power3.out"
});

// Testimonials Section Heading
gsap.from(".testimonials-heading", {
    scrollTrigger: {
        trigger: "#testimonials",
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Testimonials Items Staggered Reveal
gsap.from(".testimonial-item", {
    scrollTrigger: {
        trigger: "#testimonials",
        start: "top 70%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 80,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
});


// Contact Section Heading
gsap.from(".contact-heading", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Contact Form Container
gsap.from(".contact-form-container", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
        end: "bottom center",
        toggleActions: "play none none reset",
    },
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});


// --- Prefers Reduced Motion Accessibility Check ---
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.globalTimeline.clear(); // Clear all GSAP animations
    console.log("Animations disabled due to 'prefers-reduced-motion'.");
    
    // Ensure default cursor is shown
    document.body.style.cursor = 'auto';
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor) {
        customCursor.style.display = 'none';
        document.body.classList.remove('cursor-none'); // Ensure body class is removed
    }

    // Set animated elements to their final visible states (which is their default now)
    gsap.set('.header-hide, .hero-content, #hero-shape, .about-text, .about-image, .portfolio-heading, .portfolio-item, .skills-heading, .skill-item, .testimonials-heading, .testimonial-item, .contact-heading, .contact-form-container', {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        transform: 'none',
        // Important: Ensure display is not 'none' if any element was hidden that way
        display: 'block' 
    });
}