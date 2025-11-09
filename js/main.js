// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize page-specific scripts
function initializePageScripts() {
    // Generate floating circles in hero
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
        heroBg.innerHTML = ''; // Clear existing
        for (let i = 0; i < 30; i++) {
            const circle = document.createElement('div');
            circle.className = 'float-circle';
            circle.style.width = (Math.random() * 80 + 40) + 'px';
            circle.style.height = circle.style.width;
            circle.style.left = (Math.random() * 100) + '%';
            circle.style.top = (Math.random() * 100) + '%';
            circle.style.animationDelay = (Math.random() * 5) + 's';
            circle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heroBg.appendChild(circle);
        }
    }

    // Generate floating circles in CTA
    const ctaBg = document.getElementById('ctaBg');
    if (ctaBg) {
        ctaBg.innerHTML = ''; // Clear existing
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'float-circle';
            circle.style.width = (Math.random() * 60 + 30) + 'px';
            circle.style.height = circle.style.width;
            circle.style.left = (Math.random() * 100) + '%';
            circle.style.top = (Math.random() * 100) + '%';
            circle.style.animationDelay = (Math.random() * 3) + 's';
            circle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            ctaBg.appendChild(circle);
        }
    }

    // Reinitialize smooth scroll
    initializeSmoothScroll();
}

// Navigation handler
function handleNavigation() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-page]')) {
            e.preventDefault();
            const pageName = e.target.getAttribute('data-page');
            loadPage(pageName);
        }
    });
}

// Initialize navigation handling
document.addEventListener('DOMContentLoaded', handleNavigation);