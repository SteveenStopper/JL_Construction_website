document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });
    
    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let slideInterval;
    
    // Show slide function
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        showSlide(currentIndex);
    }
    
    // Start auto slide
    function startSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Stop auto slide
    function stopSlide() {
        clearInterval(slideInterval);
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopSlide(); // Stop auto sliding when user interacts
        startSlide(); // Restart auto sliding after interaction
    });
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopSlide(); // Stop auto sliding when user interacts
        startSlide(); // Restart auto sliding after interaction
    });
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentIndex = index;
            showSlide(currentIndex);
            stopSlide(); // Stop auto sliding when user interacts
            startSlide(); // Restart auto sliding after interaction
        });
    });
    
    // Initialize carousel
    showSlide(currentIndex);
    startSlide();
    
    // Add animation to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.service-card, .feature, .about-text, .about-image, .mission, .vision, .safety-text, .safety-image, .carousel-container, .location-info, .location-map').forEach(el => {
        observer.observe(el);
    });
});