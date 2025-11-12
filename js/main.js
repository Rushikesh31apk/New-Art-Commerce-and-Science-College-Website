// Navbar scroll effect - SINGLE IMPLEMENTATION
function initNavbarScrollEffect() {
    const navbar = document.getElementById('mainNav');
    
    if (!navbar) {
        console.warn('Navbar not found, retrying in 200ms...');
        setTimeout(initNavbarScrollEffect, 200);
        return;
    }
    
    console.log('Navbar scroll effect initialized');
    
    // Remove any existing scroll listeners to avoid duplicates
    const oldHandler = window.navbarScrollHandler;
    if (oldHandler) {
        window.removeEventListener('scroll', oldHandler);
    }
    
    // Create new scroll handler
    const scrollHandler = function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Store handler reference for cleanup
    window.navbarScrollHandler = scrollHandler;
    
    // Add scroll listener
    window.addEventListener('scroll', scrollHandler);
    
    // Initial check
    scrollHandler();
}

// Scroll to top button
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;
    
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
        // Remove old listeners
        const newAnchor = anchor.cloneNode(true);
        anchor.parentNode.replaceChild(newAnchor, anchor);
        
        // Add new listener
        newAnchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
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
    console.log('Initializing page scripts...');
    
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

    // Initialize gallery controls if present
    if (typeof initGalleryControls === 'function') {
        initGalleryControls();
    }

    // Reinitialize smooth scroll
    initializeSmoothScroll();
}

// Initialize scroll to top on page load
window.addEventListener('load', () => {
    initScrollToTop();
    console.log('Page fully loaded');
});

// Gallery controls (if gallery page is loaded)
function initGalleryControls() {
    const gallery = document.getElementById('gallery3d');
    if (!gallery) return;
    
    let isPlaying = true;
    let currentRotation = 0;
    
    window.pauseGallery = function() {
        const icon = document.getElementById('playPauseIcon');
        if (!icon) return;
        
        if (isPlaying) {
            gallery.classList.add('paused');
            icon.className = 'fas fa-play';
        } else {
            gallery.classList.remove('paused');
            icon.className = 'fas fa-pause';
        }
        isPlaying = !isPlaying;
    };
    
    window.prevImage = function() {
        currentRotation += 24;
        gallery.style.transform = `rotateY(${currentRotation}deg)`;
    };
    
    window.nextImage = function() {
        currentRotation -= 24;
        gallery.style.transform = `rotateY(${currentRotation}deg)`;
    };
    
    // Pause on hover
    gallery.addEventListener('mouseenter', () => {
        if (isPlaying) {
            gallery.classList.add('paused');
        }
    });
    
    gallery.addEventListener('mouseleave', () => {
        if (isPlaying) {
            gallery.classList.remove('paused');
        }
    });
}

// Alumni form submission (if alumni page is loaded)
window.submitAlumniForm = function(event) {
    event.preventDefault();
    
    const form = document.getElementById('alumniForm');
    if (!form) return;
    
    const formData = new FormData(form);
    
    let emailBody = 'Alumni Registration Form Submission\n\n';
    
    for (let [key, value] of formData.entries()) {
        const input = form.querySelector(`[name="${key}"]`);
        const label = input?.previousElementSibling?.textContent || 
                     input?.closest('.mb-3')?.querySelector('label')?.textContent || 
                     key;
        emailBody += `${label}: ${value}\n\n`;
    }
    
    const mailtoLink = `mailto:nacscp@gmail.com?subject=Alumni Registration Form&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    alert('Thank you for your submission! Your email client will open to send the form.');
};

console.log('Main.js loaded');