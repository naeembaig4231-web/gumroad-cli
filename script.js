/**
 * The Storybook Shelf - Interactive JavaScript
 * Handles animations, interactions, and dynamic functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 🌟 Loading Screen
    // ========================================
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 800);
    });

    // ========================================
    // 📱 Mobile Navigation Toggle
    // ========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Toggle aria-expanded
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // ========================================
    // 🌙 Sticky Navigation on Scroll
    // ========================================
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // ✨ FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-icon').classList.remove('rotated');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                icon.classList.remove('rotated');
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.add('rotated');
            }
        });
    });

    // ========================================
    // 📧 Newsletter Form Handling
    // ========================================
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterMessage = document.querySelector('.newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterEmail.value.trim();
            
            if (!isValidEmail(email)) {
                showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            newsletterForm.classList.add('submitting');
            
            setTimeout(() => {
                newsletterForm.classList.remove('submitting');
                showNewsletterMessage('Thank you for subscribing! Welcome to The Storybook Shelf. ✨', 'success');
                newsletterEmail.value = '';
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    newsletterMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
    function showNewsletterMessage(text, type) {
        newsletterMessage.textContent = text;
        newsletterMessage.className = `newsletter-message ${type}`;
        newsletterMessage.style.display = 'block';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ========================================
    // 📬 Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contact-form');
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactSubject = document.getElementById('contact-subject');
    const contactMessage = document.getElementById('contact-message');
    const contactStatus = document.querySelector('.contact-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate fields
            if (!contactName.value.trim()) {
                showContactStatus('Please enter your name.', 'error');
                contactName.focus();
                return;
            }
            
            if (!isValidEmail(contactEmail.value.trim())) {
                showContactStatus('Please enter a valid email address.', 'error');
                contactEmail.focus();
                return;
            }
            
            if (!contactSubject.value.trim()) {
                showContactStatus('Please enter a subject.', 'error');
                contactSubject.focus();
                return;
            }
            
            if (!contactMessage.value.trim()) {
                showContactStatus('Please enter your message.', 'error');
                contactMessage.focus();
                return;
            }
            
            // Simulate form submission
            contactForm.classList.add('submitting');
            
            setTimeout(() => {
                contactForm.classList.remove('submitting');
                showContactStatus('Thank you for your message! We\'ll get back to you soon. 📚', 'success');
                contactForm.reset();
                
                // Clear status after 5 seconds
                setTimeout(() => {
                    contactStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
    function showContactStatus(text, type) {
        contactStatus.textContent = text;
        contactStatus.className = `contact-status ${type}`;
        contactStatus.style.display = 'block';
    }

    // ========================================
    // ⭐ Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or javascript links
            if (href === '#' || href.startsWith('javascript:')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 🔝 Scroll to Top Button
    // ========================================
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // 📚 Book Card Hover Effects (Enhanced)
    // ========================================
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale effect via JS for browsers that need it
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========================================
    // ✨ Parallax Effect for Hero Section
    // ========================================
    const heroSection = document.querySelector('.hero-section');
    const floatingBooks = document.querySelectorAll('.floating-book');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (scrolled < heroHeight) {
                // Parallax effect for background
                heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
                
                // Floating books movement
                floatingBooks.forEach((book, index) => {
                    const speed = 0.2 + (index * 0.1);
                    book.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
                });
            }
        }
    });

    // ========================================
    // 🌟 Animated Counter for Stats (if added later)
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    }

    // ========================================
    // 🎭 Intersection Observer for Animations
    // ========================================
    // Enhanced AOS-like animations using Intersection Observer
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aosValue = entry.target.getAttribute('data-aos');
                const aosDelay = entry.target.getAttribute('data-aos-delay') || '0';
                const aosDuration = entry.target.getAttribute('data-aos-duration') || '600';
                
                // Add delay
                entry.target.style.transitionDelay = `${aosDelay}ms`;
                entry.target.style.transitionDuration = `${aosDuration}ms`;
                
                // Add animation class based on data-aos value
                entry.target.classList.add('aos-animate');
                
                // Unobserve after animation
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // ========================================
    // 🦉 Owl Mascot Animation on Click
    // ========================================
    const owlLogo = document.querySelector('.owl-mascot');
    
    if (owlLogo) {
        owlLogo.addEventListener('click', () => {
            owlLogo.classList.add('hoot');
            setTimeout(() => {
                owlLogo.classList.remove('hoot');
            }, 1000);
        });
    }

    // ========================================
    // 📖 Dynamic Year in Footer
    // ========================================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ========================================
    // 🎨 Theme Preference Detection (Future Enhancement)
    // ========================================
    // Check for user's color scheme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.add('light-theme');
    }

    // ========================================
    // 🔍 Search Functionality Placeholder
    // ========================================
    // Can be expanded later for book search
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Search functionality coming soon! Browse our collections below. 📚');
        });
    }

    // ========================================
    // 📱 Touch Device Detection
    // ========================================
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        document.documentElement.classList.add('touch-device');
        
        // Adjust hover effects for touch devices
        bookCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.classList.remove('touch-hover');
            }, { passive: true });
        });
    }

    // ========================================
    // 🎯 Performance: Lazy Load Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ========================================
    // 🎉 Easter Egg: Konami Code
    // ========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Fun animation: Make all books float!
        document.querySelectorAll('.book-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'float 3s ease-in-out infinite';
            }, index * 100);
        });
        
        // Show a fun message
        const easterEggMessage = document.createElement('div');
        easterEggMessage.className = 'easter-egg-message';
        easterEggMessage.innerHTML = '🎉 You found the secret! Happy Reading! 📚✨';
        easterEggMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            color: #d4af37;
            padding: 2rem 3rem;
            border-radius: 15px;
            border: 2px solid #d4af37;
            font-size: 1.5rem;
            font-family: 'Playfair Display', serif;
            z-index: 9999;
            box-shadow: 0 0 50px rgba(212, 175, 55, 0.5);
            animation: fadeInOut 3s forwards;
        `;
        
        document.body.appendChild(easterEggMessage);
        
        setTimeout(() => {
            easterEggMessage.remove();
            document.querySelectorAll('.book-card').forEach(card => {
                card.style.animation = '';
            });
        }, 3000);
    }

    // Add keyframes for easter egg dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);

    console.log('📚 The Storybook Shelf is ready! Welcome to the magical library.');
});
