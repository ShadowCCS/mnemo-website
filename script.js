// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const downloadButtons = document.querySelectorAll('.btn-download');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Handle navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Always close mobile menu when clicking any link
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Only prevent default and smooth scroll if it's an anchor link (starts with #)
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // For regular page links (download.html, docs.html), let the default navigation happen
    });
});

// Active navigation link highlighting (only for anchor links on the same page)
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        
        // Only handle active highlighting for anchor links (starts with #)
        if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionHeight = targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        }
    });
});

// Download functionality
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = button.getAttribute('data-platform');
        handleDownload(platform, button);
    });
});

function handleDownload(platform, button) {
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
        showNotification(`Download started for ${platform.charAt(0).toUpperCase() + platform.slice(1)}`, 'success');
        
        // In a real application, you would trigger the actual download here
        // For demo purposes, we'll just show a message
        console.log(`Download initiated for platform: ${platform}`);
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
    const animateElements = document.querySelectorAll('.feature-card, .download-card, .docs-category');
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
    
    // Navigate sections with arrow keys (when focused)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = ['#home', '#download', '#docs'];
        const currentSection = document.querySelector('.nav-link.active')?.getAttribute('href');
        const currentIndex = sections.indexOf(currentSection);
        
        if (currentIndex !== -1) {
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % sections.length;
            } else {
                nextIndex = (currentIndex - 1 + sections.length) % sections.length;
            }
            
            const targetSection = document.querySelector(sections[nextIndex]);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
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
    // Set initial active nav link based on current page
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Get current page filename
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Find and activate the corresponding navigation link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Check if this link matches the current page
        if ((currentPage === 'index.html' || currentPage === '') && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    console.log('mnemo website loaded successfully');
});

// Image Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.modal-close');

// Get all images with class 'article-image'
const images = document.querySelectorAll('.article-image');

// Add click event to all article images
images.forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = "block";
        // Add show class after a brief delay to trigger transition
        requestAnimationFrame(() => modal.classList.add('show'));
        modalImg.src = this.src;
        
        // Get caption from parent's sibling with class 'image-caption' if it exists
        const caption = this.closest('div')?.querySelector('.image-caption')?.textContent;
        captionText.textContent = caption || '';
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when clicking the × button
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the image
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
    // Wait for transition to complete before hiding
    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }, 300);
}

// Showcase Navigation
const showcaseContainer = document.querySelector('.showcase-container');
if (showcaseContainer) {
    const prevBtn = showcaseContainer.querySelector('.prev');
    const nextBtn = showcaseContainer.querySelector('.next');
    const showcaseGrid = showcaseContainer.querySelector('.showcase-grid');
    
    let currentScroll = 0;
    const scrollAmount = 300; // Adjust this value to control scroll distance
    
    prevBtn.addEventListener('click', () => {
        currentScroll = Math.max(currentScroll - scrollAmount, 0);
        showcaseGrid.scroll({
            left: currentScroll,
            behavior: 'smooth'
        });
        updateNavButtons();
    });
    
    nextBtn.addEventListener('click', () => {
        currentScroll = Math.min(currentScroll + scrollAmount, showcaseGrid.scrollWidth - showcaseGrid.clientWidth);
        showcaseGrid.scroll({
            left: currentScroll,
            behavior: 'smooth'
        });
        updateNavButtons();
    });
    
    function updateNavButtons() {
        prevBtn.style.opacity = currentScroll <= 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentScroll >= showcaseGrid.scrollWidth - showcaseGrid.clientWidth ? '0.5' : '1';
    }
    
    // Initial button state
    updateNavButtons();
    
    // Update button states on scroll
    showcaseGrid.addEventListener('scroll', () => {
        currentScroll = showcaseGrid.scrollLeft;
        updateNavButtons();
    });
}
