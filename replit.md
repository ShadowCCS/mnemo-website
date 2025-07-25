# mnemo - Study Application

## Overview

mnemo is a modern web-based study application designed to enhance the learning experience for students. The project is a frontend-only static multi-page website built with vanilla HTML, CSS, and JavaScript, featuring a sleek dark theme and responsive design. The application consists of a home page showcasing the product features, a dedicated download page with detailed platform options, and a comprehensive documentation page with organized content structure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Vanilla HTML5, CSS3, and JavaScript
- **Design Approach**: Multi-page static website with shared navigation and styling
- **Page Structure**: 
  - `index.html` - Home page with hero section, features, and documentation links
  - `download.html` - Dedicated download page with platform-specific options and release notes
  - `docs.html` - Documentation page with sidebar navigation and comprehensive content
- **Styling Strategy**: CSS custom properties for consistent theming and responsive design
- **Layout System**: Flexbox and CSS Grid for modern, responsive layouts
- **Font Integration**: Google Fonts (Inter) and Font Awesome icons for visual consistency

### Design System
- **Color Scheme**: Dark theme with purple gradient accents (`#6366f1` to `#8b5cf6`)
- **Typography**: Inter font family with multiple weights (300-700)
- **Component Structure**: Modular CSS with BEM-like naming conventions
- **Responsive Strategy**: Mobile-first approach with hamburger menu for smaller screens

## Key Components

### Navigation System
- Fixed header navigation with smooth scrolling
- Mobile-responsive hamburger menu
- Active link highlighting based on scroll position
- Logo with brain icon representing the study application theme

### Page Components

#### Home Page (index.html)
- **Hero Section**: Main branding area with gradient text and call-to-action buttons
- **Feature Grid**: Four feature cards showcasing key application capabilities
- **Documentation Links**: Organized categories linking to the documentation page

#### Download Page (download.html)
- **Download Header**: Page introduction with product branding
- **Platform Cards**: Windows, macOS, and Linux download options with multiple formats
- **Featured Badge**: Recommended platform highlighting for Windows
- **Release Notes**: Version 2.0.1 changelog with new features, improvements, and bug fixes
- **System Requirements**: Tabbed interface showing platform-specific requirements
- **Installation Help**: Links to documentation and support resources

#### Documentation Page (docs.html)
- **Documentation Header**: Page introduction with search functionality
- **Sidebar Navigation**: Organized sections for Getting Started, Core Features, Advanced, and Support
- **Main Content**: Quick Start Guide with detailed instructions and examples
- **Search Interface**: Real-time search functionality with results display
- **Article Navigation**: Previous/next links and feedback system

### Interactive Features
- **Cross-page Navigation**: Consistent navigation bar linking between all pages
- **Mobile Navigation**: Hamburger menu with toggle functionality across all pages
- **Download Interactions**: Platform-specific download buttons with loading states and notifications
- **Documentation Search**: Real-time search with results display and keyboard shortcuts (Ctrl+K)
- **Tabbed Interface**: System requirements tabs on download page
- **Feedback System**: Article feedback buttons on documentation page
- **Smooth Animations**: Scroll-triggered animations and hover effects throughout

## Data Flow

Currently, the application operates as a static website with no backend data flow:

1. **User Interaction**: Navigation clicks trigger smooth scrolling
2. **State Management**: JavaScript handles UI state for mobile menu and active links
3. **Event Handling**: Scroll events update navigation highlighting
4. **Responsive Behavior**: CSS media queries and JavaScript handle mobile interactions

## External Dependencies

### CDN Resources
- **Google Fonts**: Inter font family for typography
- **Font Awesome 6.0.0**: Icon library for visual elements
- **No JavaScript Frameworks**: Pure vanilla JavaScript implementation

### Development Dependencies
- No build tools or package managers currently implemented
- No CSS preprocessors (using vanilla CSS with custom properties)
- No bundling or minification processes

## Deployment Strategy

### Current State
- **Hosting**: Designed for static hosting (GitHub Pages, Netlify, Vercel compatible)
- **Build Process**: No build step required - direct file serving
- **Asset Management**: Direct linking to external CDNs for fonts and icons

### Scalability Considerations
The current architecture supports easy migration to:
- Modern bundling tools (Vite, Webpack, Parcel)
- CSS preprocessors (Sass, Less)
- JavaScript frameworks (React, Vue, Svelte)
- Backend integration for dynamic content

### Performance Optimizations
- CSS custom properties for efficient theming
- Minimal JavaScript footprint
- CDN-hosted external resources
- Optimized for fast loading and smooth interactions

## Future Architecture Considerations

The current static implementation provides a solid foundation for expanding into a full-featured study application with potential additions of:
- User authentication system
- Database integration for study materials
- Progress tracking functionality
- Note-taking and organization features
- Study session analytics