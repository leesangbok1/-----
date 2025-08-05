document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    const counters = document.querySelectorAll('.counter');

    // --- Functions ---

    // 1. Sticky header on scroll
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };
    
    // 2. Mobile menu toggle
    const toggleMobileMenu = () => {
        navbar.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };
    
    // 3. Close mobile menu when a link is clicked
    navbar.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && navbar.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // 4. Animation on Scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of the element is visible
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // 5. Counter Animation
    const animateCounters = () => {
        counters.forEach(counter => {
            // Prevent re-animating
            if (counter.classList.contains('animated')) return;
            counter.classList.add('animated');

            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            
            let current = 0;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                
                current = Math.min(Math.ceil(progress / duration * target), target);
                counter.innerText = current.toLocaleString();

                if (current < target) {
                    window.requestAnimationFrame(step);
                }
            };
            let start;
            window.requestAnimationFrame(step);
        });
    };
    
    // Use Intersection Observer to trigger counter animation only when visible
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.8
    });
    
    const statsBar = document.querySelector('.hero-stats-bar');
    if (statsBar) {
        counterObserver.observe(statsBar);
    }


    // --- Event Listeners ---
    window.addEventListener('scroll', handleScroll);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

});
