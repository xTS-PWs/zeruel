async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load components when the page loads
window.addEventListener('load', () => {
    loadComponent('header-component', '../components/header.html');
    loadComponent('footer-component', '../components/footer.html');
});
