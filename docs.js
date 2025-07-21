// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const docsNavLinks = document.querySelectorAll('.docs-nav .nav-link');
const searchInput = document.querySelector('.search-input');
const feedbackButtons = document.querySelectorAll('.feedback-btn');

// Handle mobile navigation
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Handle navigation links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close mobile menu when clicking on a link
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Handle documentation navigation highlighting
document.querySelectorAll('.docs-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.docs-nav .nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Initialize documentation navigation
function initDocsNavigation() {
    // Get all section elements
    const sections = document.querySelectorAll('.doc-article');
    const navLinks = document.querySelectorAll('.docs-nav .nav-link');
    
    // Set Quick Start as active by default
    const quickStartLink = document.querySelector('.docs-nav .nav-link[href="#quick-start"]');
    if (quickStartLink) {
        quickStartLink.classList.add('active');
    }

    // Create an Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -75% 0px', // Considers a section "visible" when it takes up at least 25% of the viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the ID of the visible section
                const id = entry.target.querySelector('h1').getAttribute('id');
                
                // Update navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Update URL hash without scrolling
                const newUrl = `${window.location.pathname}${window.location.search}#${id}`;
                window.history.replaceState(null, '', newUrl);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => observer.observe(section));

    // Handle click navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Handle initial hash navigation
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}

// Handle OS-specific installation tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const os = button.getAttribute('data-os');
        
        // Update button states
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update content visibility
        tabContents.forEach(content => {
            if (content.getAttribute('data-os') === os) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// Handle system requirements tabs
const requirementTabButtons = document.querySelectorAll('.system-requirements .tab-button');
const requirementTabContents = document.querySelectorAll('.system-requirements .tab-content');

requirementTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        requirementTabButtons.forEach(btn => btn.classList.remove('active'));
        requirementTabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(`${targetTab}-requirements`).classList.add('active');
    });
});

// Handle search functionality
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // TODO: Implement search functionality
    });
}

// Handle feedback buttons
document.querySelectorAll('.feedback-btn').forEach(button => {
    button.addEventListener('click', function() {
        const feedbackType = this.classList.contains('positive') ? 'positive' : 'negative';
        const buttons = this.closest('.feedback-buttons');
        
        // Remove active state from all buttons
        buttons.querySelectorAll('.feedback-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active state to clicked button
        this.classList.add('active');
        
        // TODO: Send feedback to analytics
    });
});

// Documentation search functionality
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        hideSearchResults();
        return;
    }
    
    searchTimeout = setTimeout(() => {
        performSearch(query);
    }, 300);
});

function performSearch(query) {
    // In a real application, this would search through documentation content
    // For now, we'll show a simple search interface
    const searchResults = mockSearchResults(query);
    displaySearchResults(searchResults);
}

function mockSearchResults(query) {
    const allResults = [
        { title: 'Quick Start Guide', section: 'Getting Started', url: '#quick-start' },
        { title: 'Installation Instructions', section: 'Getting Started', url: '#installation' },
        { title: 'Note Organization', section: 'Features', url: '#note-organization' },
        { title: 'Study Timer & Pomodoro', section: 'Features', url: '#study-timer' },
        { title: 'Progress Analytics', section: 'Features', url: '#progress-analytics' },
        { title: 'Collaboration Tools', section: 'Features', url: '#collaboration' },
        { title: 'Troubleshooting', section: 'Support', url: '#troubleshooting' },
        { title: 'API Reference', section: 'Advanced', url: '#api' },
        { title: 'Plugin Development', section: 'Advanced', url: '#plugins' }
    ];
    
    return allResults.filter(result => 
        result.title.toLowerCase().includes(query) || 
        result.section.toLowerCase().includes(query)
    ).slice(0, 5);
}

function displaySearchResults(results) {
    // Remove existing search results
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    if (results.length === 0) {
        showNoResults();
        return;
    }
    
    // Create search results container
    const searchContainer = document.querySelector('.search-container');
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    
    resultsContainer.innerHTML = `
        <div class="search-results-header">
            <span>Search Results (${results.length})</span>
            <button class="close-search">
                <i class="ti ti-x"></i>
            </button>
        </div>
        <div class="search-results-list">
            ${results.map(result => `
                <a href="${result.url}" class="search-result-item">
                    <div class="result-title">${result.title}</div>
                    <div class="result-section">${result.section}</div>
                </a>
            `).join('')}
        </div>
    `;
    
    // Add styles for search results
    resultsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
    `;
    
    searchContainer.appendChild(resultsContainer);
    
    // Add close functionality
    const closeButton = resultsContainer.querySelector('.close-search');
    closeButton.addEventListener('click', hideSearchResults);
    
    // Add click handlers for results
    const resultItems = resultsContainer.querySelectorAll('.search-result-item');
    resultItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            hideSearchResults();
            // Handle navigation to result
            const url = item.getAttribute('href');
            console.log('Navigate to:', url);
        });
    });
}

function showNoResults() {
    const searchContainer = document.querySelector('.search-container');
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    
    resultsContainer.innerHTML = `
        <div class="search-results-header">
            <span>No Results Found</span>
            <button class="close-search">
                <i class="ti ti-x"></i>
            </button>
        </div>
        <div class="search-no-results">
            <p>Try adjusting your search terms or browse the categories below.</p>
        </div>
    `;
    
    resultsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
    `;
    
    searchContainer.appendChild(resultsContainer);
    
    const closeButton = resultsContainer.querySelector('.close-search');
    closeButton.addEventListener('click', hideSearchResults);
}

function hideSearchResults() {
    const resultsContainer = document.querySelector('.search-results');
    if (resultsContainer) {
        resultsContainer.remove();
    }
}

// Feedback functionality
feedbackButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const isPositive = button.classList.contains('positive');
        handleFeedback(isPositive);
    });
});

function handleFeedback(isPositive) {
    // Disable all feedback buttons
    feedbackButtons.forEach(btn => btn.disabled = true);
    
    // Show thank you message
    const feedbackContainer = document.querySelector('.article-feedback');
    const thankYouMessage = document.createElement('div');
    thankYouMessage.className = 'feedback-thank-you';
    thankYouMessage.innerHTML = `
        <i class="ti ti-check"></i>
        <span>Thank you for your feedback!</span>
    `;
    
    thankYouMessage.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--accent-primary);
        font-weight: 500;
        margin-top: 1rem;
    `;
    
    feedbackContainer.appendChild(thankYouMessage);
    
    // Log feedback (in real app, this would send to analytics)
    console.log(`Feedback received: ${isPositive ? 'positive' : 'negative'}`);
}

// Add search results styles
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-container {
        position: relative;
        max-width: 500px;
        margin: 0 auto;
    }
    
    .search-container input {
        width: 100%;
        padding: 1rem 1rem 1rem 3rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        color: var(--text-primary);
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .search-container input:focus {
        outline: none;
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .search-container i {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-secondary);
        z-index: 1;
    }
    
    .search-results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border-color);
        font-weight: 500;
        color: var(--text-primary);
    }
    
    .close-search {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: var(--transition);
    }
    
    .close-search:hover {
        color: var(--text-primary);
        background: var(--hover-bg);
    }
    
    .search-result-item {
        display: block;
        padding: 0.75rem 1rem;
        text-decoration: none;
        color: var(--text-secondary);
        border-bottom: 1px solid var(--border-color);
        transition: var(--transition);
    }
    
    .search-result-item:hover {
        background: var(--hover-bg);
        color: var(--text-primary);
    }
    
    .search-result-item:last-child {
        border-bottom: none;
    }
    
    .result-title {
        font-weight: 500;
        margin-bottom: 0.25rem;
    }
    
    .result-section {
        font-size: 0.875rem;
        color: var(--text-muted);
    }
    
    .search-no-results {
        padding: 1rem;
        text-align: center;
        color: var(--text-secondary);
    }
    
    .docs-layout {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 3rem;
        align-items: start;
    }
    
    .docs-sidebar {
        position: sticky;
        top: 100px;
        background: var(--bg-secondary);
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        height: fit-content;
    }
    
    .docs-nav .nav-section {
        margin-bottom: 2rem;
    }
    
    .docs-nav .nav-section:last-child {
        margin-bottom: 0;
    }
    
    .docs-nav h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .docs-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .docs-nav li {
        margin-bottom: 0.5rem;
    }
    
    .docs-nav .nav-link {
        display: block;
        padding: 0.5rem 0.75rem;
        color: var(--text-secondary);
        text-decoration: none;
        border-radius: 6px;
        transition: var(--transition);
        font-size: 0.9rem;
    }
    
    .docs-nav .nav-link:hover,
    .docs-nav .nav-link.active {
        color: var(--text-primary);
        background: var(--hover-bg);
    }
    
    .docs-nav .nav-link.active {
        background: rgba(99, 102, 241, 0.1);
    }
    
    .docs-main {
        max-width: none;
    }
    
    .doc-article {
        background: var(--bg-secondary);
        padding: 3rem;
        border-radius: 12px;
        border: 1px solid var(--border-color);
    }
    
    .article-header {
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 2rem;
        margin-bottom: 3rem;
    }
    
    .article-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .article-meta {
        display: flex;
        gap: 2rem;
        color: var(--text-muted);
        font-size: 0.9rem;
    }
    
    .article-content {
        line-height: 1.7;
        color: var(--text-secondary);
    }
    
    .article-content h2 {
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 2.5rem 0 1rem;
    }
    
    .article-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 2rem 0 0.75rem;
    }
    
    .article-content p {
        margin-bottom: 1.5rem;
    }
    
    .article-content .lead {
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 2rem;
    }
    
    .article-content ul,
    .article-content ol {
        margin-bottom: 1.5rem;
        padding-left: 2rem;
    }
    
    .article-content li {
        margin-bottom: 0.5rem;
    }
    
    .article-content a {
        color: var(--accent-primary);
        text-decoration: none;
        transition: var(--transition);
    }
    
    .article-content a:hover {
        text-decoration: underline;
    }
    
    .info-box,
    .tip-box {
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
        border-radius: 8px;
        margin: 2rem 0;
        border-left: 4px solid var(--accent-primary);
    }
    
    .info-box {
        background: rgba(99, 102, 241, 0.1);
    }
    
    .tip-box {
        background: rgba(16, 185, 129, 0.1);
        border-left-color: #10b981;
    }
    
    .info-box i,
    .tip-box i {
        color: var(--accent-primary);
        font-size: 1.25rem;
        margin-top: 0.25rem;
        flex-shrink: 0;
    }
    
    .tip-box i {
        color: #10b981;
    }
    
    .article-footer {
        border-top: 1px solid var(--border-color);
        padding-top: 2rem;
        margin-top: 3rem;
    }
    
    .article-navigation {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
    }
    
    .nav-previous,
    .nav-next {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .nav-previous span,
    .nav-next span {
        font-size: 0.875rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .nav-previous a,
    .nav-next a {
        color: var(--accent-primary);
        text-decoration: none;
        font-weight: 500;
        transition: var(--transition);
    }
    
    .nav-previous a:hover,
    .nav-next a:hover {
        text-decoration: underline;
    }
    
    .article-feedback {
        text-align: center;
    }
    
    .article-feedback p {
        margin-bottom: 1rem;
        color: var(--text-secondary);
    }
    
    .feedback-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .feedback-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        color: var(--text-secondary);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .feedback-btn:hover {
        background: var(--hover-bg);
        color: var(--text-primary);
        border-color: var(--accent-primary);
    }
    
    .feedback-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
        .docs-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .docs-sidebar {
            position: static;
            order: 2;
        }
        
        .doc-article {
            padding: 2rem;
        }
        
        .article-header h1 {
            font-size: 2rem;
        }
        
        .article-navigation {
            flex-direction: column;
            gap: 1rem;
        }
        
        .feedback-buttons {
            flex-direction: column;
        }
        
        .next-steps-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(searchStyles);

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const searchContainer = document.querySelector('.search-container');
    const searchResults = document.querySelector('.search-results');
    
    if (searchResults && !searchContainer.contains(e.target)) {
        hideSearchResults();
    }
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
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Also close search results
        hideSearchResults();
    }
    
    // Focus search with Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link based on current page
    navLinks.forEach(link => link.classList.remove('active'));
    const docsLink = document.querySelector('a[href="docs.html"]');
    if (docsLink) {
        docsLink.classList.add('active');
    }
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    // Initialize documentation navigation
    initDocsNavigation();

    console.log('mnemo documentation page loaded successfully');
});