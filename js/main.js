/* =================================================
   STOFFGARAGE - Main JavaScript
   Modern effects with scroll animations
   ================================================= */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDropdowns();
    initSmoothScroll();
    initActiveNav();
    initScrollAnimations();
    initParallax();
});

/* === MOBILE MENU === */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* === DROPDOWN MENUS === */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        if (!toggle) return;

        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });

            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        } else {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initDropdowns();
        }, 250);
    });
}

/* === SMOOTH SCROLL === */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* === ACTIVE NAVIGATION === */
function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

/* === SCROLL ANIMATIONS === */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate cards on scroll
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate feature items on scroll
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.8s ease';
        observer.observe(title);
    });
}

/* === PARALLAX EFFECT === */
function initParallax() {
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;

                // Parallax on hero section
                const hero = document.querySelector('.hero');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }

                // Add shadow to header on scroll
                const header = document.querySelector('header');
                if (header) {
                    if (scrolled > 50) {
                        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                    } else {
                        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                    }
                }

                ticking = false;
            });

            ticking = true;
        }
    });
}

/* === 3D CARD TILT EFFECT === */
function init3DCardEffect() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}

// Initialize 3D effect after DOM loads
if (window.matchMedia('(min-width: 1024px)').matches) {
    document.addEventListener('DOMContentLoaded', init3DCardEffect);
}

/* === SCROLL TO TOP === */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* === LAZY LOADING IMAGES === */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}

/* === FORM VALIDATION === */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }

        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('error');
                isValid = false;
            }
        }
    });

    return isValid;
}

window.validateForm = validateForm;

/* === IMAGE HOVER EFFECT === */
document.addEventListener('DOMContentLoaded', function() {
    const cardImages = document.querySelectorAll('.card-image');

    cardImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
