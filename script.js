// Wait for the entire page to load before running our scripts
document.addEventListener('DOMContentLoaded', function() {

    // 1. MOBILE NAVIGATION
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navigation = document.querySelector('.navigation');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navigation.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navigation.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking on the overlay
    overlay.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        navigation.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 2. FORM VALIDATION AND SUBMISSION
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formMessage = document.getElementById('form-message');

        contactForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                event.preventDefault();
                alert('Please fill in all required fields before submitting.');
            } else {
                event.preventDefault(); // Prevent actual form submission for demo
                
                // Show success message
                formMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    formMessage.classList.remove('show');
                }, 5000);
            }
        });
    }

    // 3. SCROLL-TRIGGERED ANIMATIONS
    const animatedElements = document.querySelectorAll(
        'section, table, .solution-card, #contact-form, #contact-form button, .footer, .hero-section, .team-member, .value-card, .achievement, .solution-content, .process-step, .impact-number-card, .comparison-table, .progress-item, .case-study, .goal-card, .contact-info-card, .faq-item, .map-container'
    );

    // Throttle helper
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

    // Visibility check
    function checkIfInView() {
        const triggerBottom = window.innerHeight * 0.8;

        animatedElements.forEach(element => {
            if (element.getAttribute('data-animated') === 'true') {
                return;
            }

            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
                element.setAttribute('data-animated', 'true');
                
                // Animate progress bars
                if (element.classList.contains('progress-item')) {
                    const progressFill = element.querySelector('.progress-fill');
                    if (progressFill) {
                        const width = progressFill.style.width;
                        progressFill.style.width = '0';
                        setTimeout(() => {
                            progressFill.style.width = width;
                        }, 100);
                    }
                }
            }
        });
    }

    // Run checks at different stages
    checkIfInView(); // Initial check on DOM ready
    window.addEventListener('load', checkIfInView); // Extra check after full load
    window.addEventListener('scroll', throttle(checkIfInView, 100));
    window.addEventListener('resize', throttle(checkIfInView, 100));

    // 4. SMOOTH SCROLLING
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});