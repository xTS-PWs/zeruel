async function loadComponent(elementId, componentPath) {
    try {
        // Handle both local development and production paths
        const basePath = location.hostname === 'localhost' ? '../components' : '/components';
        const response = await fetch(`${basePath}/${componentPath}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load components when the page loads
window.addEventListener('load', () => {
    loadComponent('header-component', 'header.html');
    loadComponent('footer-component', 'footer.html');
});
