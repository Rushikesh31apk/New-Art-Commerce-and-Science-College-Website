// Load HTML components
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        console.log(`Loaded: ${filePath}`);
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// Load all components
async function loadAllComponents() {
    try {
        // Load components in sequence
        await loadComponent('topbar-container', 'includes/topbar.html');
        await loadComponent('ticker-container', 'includes/ticker.html');
        await loadComponent('navbar-container', 'includes/navbar.html');
        await loadComponent('footer-container', 'includes/footer.html');

        console.log('All components loaded');

        // Wait a bit for DOM to settle, then initialize
        setTimeout(() => {
            initNavbarScrollEffect();
            initializeNavigation();
            console.log('Navbar initialized');
        }, 100);

        // Load home page by default
        await loadPage('home');

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Load specific page
async function loadPage(pageName) {
    try {
        // Scroll to top when loading new page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        await loadComponent('main-content', `pages/${pageName}.html`);
        console.log(`Loaded page: ${pageName}`);

        // Reinitialize any scripts needed for the page
        setTimeout(() => {
            initializePageScripts();
        }, 100);

        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }

    } catch (error) {
        console.error(`Error loading page ${pageName}:`, error);
    }
}

// Initialize navigation handling
function initializeNavigation() {
    console.log('Initializing navigation...');

    // Use event delegation on document for all navigation links
    document.addEventListener('click', function (e) {
        // Check if clicked element or its parent has data-page attribute
        const target = e.target.closest('[data-page]');
        if (target) {
            e.preventDefault();
            const pageName = target.getAttribute('data-page');
            console.log(`Navigation clicked: ${pageName}`);
            loadPage(pageName);
        }
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}   