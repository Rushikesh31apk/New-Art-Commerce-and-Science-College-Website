// Load HTML components
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// Load all components
async function loadAllComponents() {
    await loadComponent('topbar-container', 'includes/topbar.html');
    await loadComponent('ticker-container', 'includes/ticker.html');
    await loadComponent('navbar-container', 'includes/navbar.html');
    await loadComponent('footer-container', 'includes/footer.html');
    
    // Load home page by default
    loadPage('home');
}

// Load specific page
async function loadPage(pageName) {
    await loadComponent('main-content', `pages/${pageName}.html`);
    
    // Reinitialize any scripts needed for the page
    initializePageScripts();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadAllComponents);