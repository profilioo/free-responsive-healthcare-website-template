// Profilioo Healthcare - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollProgress();
    initSmoothScrolling();
    initAnimations();
    initDropdowns();
    initButtonInteractions();
    
    console.log('Profilioo Healthcare website loaded successfully!');
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = 'auto';
                isMenuOpen = false;
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                document.body.style.overflow = 'auto';
                isMenuOpen = false;
            }
        });
    }
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollProgress + '%';
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationDelay = `${index * 0.1}s`;
                            card.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
                
                // Add animation for department cards
                if (entry.target.classList.contains('department-card')) {
                    const cards = document.querySelectorAll('.department-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationDelay = `${index * 0.05}s`;
                            card.classList.add('fade-in-up');
                        }, index * 50);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .department-card, .stat-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Dropdown Menu Functionality
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
        });
    });
}

// Button Interactions and Analytics
function initButtonInteractions() {
    // Get Templates buttons
    const getTemplatesBtns = document.querySelectorAll('button:contains("Get Templates"), button[class*="template"]');
    getTemplatesBtns.forEach(btn => {
        if (btn.textContent.includes('Get Templates') || btn.textContent.includes('template')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleGetTemplates();
            });
        }
    });

    // Book Appointment buttons
    const appointmentBtns = document.querySelectorAll('button:contains("Book Appointment"), button:contains("Schedule Appointment")');
    appointmentBtns.forEach(btn => {
        if (btn.textContent.includes('Appointment')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleBookAppointment();
            });
        }
    });

    // Emergency call button
    const emergencyBtns = document.querySelectorAll('span:contains("Emergency")');
    emergencyBtns.forEach(btn => {
        if (btn.textContent.includes('Emergency')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleEmergencyCall();
            });
        }
    });
}

// Handle Get Templates Action
function handleGetTemplates() {
    // Create modal for template download
    showModal('Healthcare Templates', `
        <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-download text-green-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Download Healthcare Templates</h3>
            <p class="text-gray-600 mb-6">Get access to professional healthcare website templates from Profilioo.</p>
            <div class="space-y-3">
                <a href="https://profilioo.com" rel="dofollow" target="_blank" class="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                    <i class="fas fa-external-link-alt mr-2"></i>Visit Profilioo.com
                </a>
                <button onclick="downloadTemplate('healthcare')" class="block w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
                    <i class="fas fa-download mr-2"></i>Download Healthcare Template
                </button>
            </div>
        </div>
    `);
    
    // Track download event
    console.log('Template download requested');
}

// Handle Book Appointment Action
function handleBookAppointment() {
    showModal('Book Appointment', `
        <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-calendar-check text-blue-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Schedule Your Appointment</h3>
            <p class="text-gray-600 mb-6">Contact our healthcare team to book your appointment.</p>
            <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">Phone:</span>
                    <a href="tel:+1-800-PROFILIOO" class="text-blue-600 font-semibold">+1-800-PROFILIOO</a>
                </div>
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">Email:</span>
                    <a href="mailto:appointments@profilioo.com" class="text-blue-600 font-semibold">appointments@profilioo.com</a>
                </div>
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">Emergency:</span>
                    <a href="tel:+1-800-MEDICAL" class="text-red-600 font-semibold">+1-800-MEDICAL</a>
                </div>
            </div>
        </div>
    `);
}

// Handle Emergency Call
function handleEmergencyCall() {
    if (confirm('This will call our emergency hotline. Continue?')) {
        window.location.href = 'tel:+1-800-MEDICAL';
    }
}

// Modal System
function showModal(title, content) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-2xl max-w-md w-full p-6 relative';
    
    modalContent.innerHTML = `
        <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-300" onclick="closeModal()">
            <i class="fas fa-times text-xl"></i>
        </button>
        <div class="pr-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">${title}</h2>
            ${content}
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Store modal reference
    window.currentModal = modalOverlay;
    
    // Add escape key listener
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Click outside to close
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Close Modal
function closeModal() {
    if (window.currentModal) {
        window.currentModal.remove();
        window.currentModal = null;
    }
}

// Download Template Function
function downloadTemplate(templateType) {
    console.log(`Downloading ${templateType} template...`);
    
    // In a real implementation, this would trigger an actual download
    // For demo purposes, we'll show a success message
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-spinner';
    
    // Replace modal content with loading
    const modalContent = document.querySelector('.fixed.inset-0 .bg-white');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="text-center p-8">
                <div class="loading-spinner mx-auto mb-4"></div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Preparing Download...</h3>
                <p class="text-gray-600">Your healthcare template will be ready shortly.</p>
            </div>
        `;
        
        // Simulate download completion
        setTimeout(() => {
            modalContent.innerHTML = `
                <div class="text-center p-8">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Download Complete!</h3>
                    <p class="text-gray-600 mb-4">Your healthcare template has been prepared.</p>
                    <div class="space-y-2">
                        <button onclick="closeModal()" class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                            Close
                        </button>
                        <a href="https://profilioo.com" rel="dofollow" target="_blank" class="block w-full text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300 text-center">
                            Visit Profilioo.com for More Templates
                        </a>
                    </div>
                </div>
            `;
        }, 2000);
    }
}

// Utility Functions
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

// Add scroll-based navbar background
function initNavbarScroll() {
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 10));
}

// Initialize navbar scroll effect
initNavbarScroll();

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Track Core Web Vitals if supported
        if ('web-vital' in window) {
            // This would integrate with actual web vitals measurement
            console.log('Web Vitals tracking enabled');
        }
    });
}

initPerformanceMonitoring();

// Accessibility improvements
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
    document.body.prepend(skipLink);
    
    // Keyboard navigation for dropdowns
    const dropdownTriggers = document.querySelectorAll('.dropdown > a');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                if (dropdown) {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.transform = 'translateY(0)';
                }
            }
        });
    });
}

initAccessibility();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, this would send error reports to a logging service
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}