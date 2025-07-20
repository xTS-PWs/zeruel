async function loadComponent(elementId, componentPath) {
    try {
        // Handle both local development and production paths
        const basePath = location.hostname === 'localhost' ? '../components' : '/components';
        const response = await fetch(`${basePath}/${componentPath}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        // If loading the header, re-attach hamburger logic
        if (elementId === 'header-component') {
            attachHamburgerMenu();
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load components when the page loads
window.addEventListener('load', () => {
    loadComponent('header-component', 'header.html');
    loadComponent('footer-component', 'footer.html');
});

function attachHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('nav-open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}
