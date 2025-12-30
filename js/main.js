// =====================================================
// Koina.vn - Performance First Website JavaScript
// =====================================================

// =====================================================
// 1. INITIALIZE ON DOM LOAD
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🌱 Koina.vn', 'color: #78A92E; font-size: 24px; font-weight: bold;');
    console.log('%cĐầu tư nông nghiệp bền vững', 'color: #666; font-size: 14px;');
    
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initCounterAnimations();
    initPortfolioFilters();
    initScrollToTop();
    initIntersectionObserver();
    
    console.log('%cWebsite được xây dựng với ❤️', 'color: #999; font-size: 12px;');
});

// =====================================================
// 2. NAVIGATION
// =====================================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#invest' && href !== '#investor-deck' && href !== '#contact') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// =====================================================
// 3. SCROLL EFFECTS
// =====================================================
function initScrollEffects() {
    // Fade in animations for hero elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = `fadeIn 0.8s ease-out ${index * 0.15}s forwards`;
        }, 100);
    });
}

// =====================================================
// 4. COUNTER ANIMATIONS
// =====================================================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter, .metric-value[data-target]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const animateCounter = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        const stepDuration = duration / steps;
        let current = 0;
        
        // Determine if number has decimals
        const hasDecimal = target % 1 !== 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (hasDecimal) {
                    element.textContent = current.toFixed(1);
                } else {
                    element.textContent = Math.floor(current);
                }
                setTimeout(updateCounter, stepDuration);
            } else {
                if (hasDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    element.textContent = Math.floor(target);
                }
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =====================================================
// 5. PORTFOLIO FILTERS
// =====================================================
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-logo');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const sector = item.getAttribute('data-sector');
                
                if (filter === 'all' || sector === filter) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// =====================================================
// 6. SCROLL TO TOP BUTTON
// =====================================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =====================================================
// 7. INTERSECTION OBSERVER FOR ANIMATIONS
// =====================================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.metric-card, .performance-card, .investor-card, .product-card, .why-card, .insight-card, .timeline-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = `fadeIn 0.6s ease-out forwards`;
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// =====================================================
// 8. UTILITY FUNCTIONS
// =====================================================

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format currency
function formatCurrency(num) {
    return '$' + formatNumber(num);
}

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =====================================================
// 9. PERFORMANCE MONITORING
// =====================================================
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Page load time: ${(loadTime / 1000).toFixed(2)}s`);
});

// =====================================================
// 10. ERROR HANDLING
// =====================================================
window.addEventListener('error', function(e) {
    console.error('❌ Error:', e.error);
});

// =====================================================
// 11. EXPORT FOR TESTING (if needed)
// =====================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatNumber,
        formatCurrency,
        debounce,
        throttle
    };
}