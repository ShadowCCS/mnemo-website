// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const downloadButtons = document.querySelectorAll('.btn-download');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Remove emojis from release notes
function removeEmojisFromReleaseNotes() {
    const releaseNotes = document.querySelectorAll('.release-highlights li, .release-improvements li, .release-fixes li');
    releaseNotes.forEach(item => {
        // Remove any existing classes that might add emojis
        item.className = '';
        // Remove any potential emoji characters
        item.style.setProperty('--before-content', 'none', 'important');
        item.style.setProperty('list-style', 'none', 'important');
        item.style.setProperty('list-style-type', 'none', 'important');
        item.style.setProperty('padding-left', '0', 'important');
        
        // Remove any potential pseudo-elements
        const style = document.createElement('style');
        style.textContent = `
            .release-highlights li::before,
            .release-improvements li::before,
            .release-fixes li::before,
            .release-highlights li::marker,
            .release-improvements li::marker,
            .release-fixes li::marker,
            .release-highlights li *::before,
            .release-improvements li *::before,
            .release-fixes li *::before {
                display: none !important;
                content: none !important;
            }
        `;
        document.head.appendChild(style);
    });
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Handle navigation links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close mobile menu when clicking on a link
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Tab switching for system requirements
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all tab buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(`${targetTab}-requirements`).classList.add('active');
    });
});

// Download functionality
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = button.getAttribute('data-platform');
        const type = button.getAttribute('data-type');
        handleDownload(platform, type, button);
    });
});

function handleDownload(platform, type, button) {
    // Disable button and show loading state
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Preparing Download...';
    
    // Simulate download preparation
    setTimeout(() => {
        // Reset button state
        button.disabled = false;
        button.innerHTML = originalText;
        
        // Show download notification
        const downloadType = type ? ` (${type.toUpperCase()})` : '';
        showNotification(`Download started for ${platform.charAt(0).toUpperCase() + platform.slice(1)}${downloadType}`, 'success');
        
        // In a real application, you would trigger the actual download here
        console.log(`Download initiated for platform: ${platform}, type: ${type}`);
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">
                <i class="ti ti-x"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Append to body
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.download-card, .release-notes, .system-requirements, .help-card');
    animateElements.forEach(el => observer.observe(el));
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based functionality here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Remove emojis
    removeEmojisFromReleaseNotes();
    
    // Set initial active nav link based on current page
    navLinks.forEach(link => link.classList.remove('active'));
    const downloadLink = document.querySelector('a[href="download.html"]');
    if (downloadLink) {
        downloadLink.classList.add('active');
    }
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    console.log('mnemo download page loaded successfully');
});