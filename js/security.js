// Security utility functions
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Prevent XSS in forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.value = sanitizeInput(input.value);
            });
        });
    });
});

// Disable right-click on sensitive content
document.addEventListener('contextmenu', (e) => {
    if (e.target.matches('.sensitive-content')) {
        e.preventDefault();
    }
});

// Add CSRF token to forms
function addCSRFToken() {
    const token = Math.random().toString(36).substring(2);
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'csrf_token';
        input.value = token;
        form.appendChild(input);
    });
    sessionStorage.setItem('csrf_token', token);
}

// Set secure cookies
function setSecureCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; secure; samesite=strict`;
}

// Initialize security measures
window.addEventListener('load', () => {
    addCSRFToken();
    // Set session cookie
    setSecureCookie('session_security', '1', 1);
});

// Detect and prevent common XSS attempts
window.addEventListener('input', (e) => {
    if (e.target.matches('input, textarea')) {
        const value = e.target.value;
        if (value.includes('<script>') || value.includes('javascript:')) {
            e.target.value = sanitizeInput(value);
            console.warn('Potentially malicious input detected and sanitized');
        }
    }
});
