// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple reveal animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section-container, .hero-content').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Eye Tracking Animation
document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.eye');
    
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const x = (rect.left + rect.width / 2);
        const y = (rect.top + rect.height / 2);
        
        const rad = Math.atan2(e.pageX - x, e.pageY - y);
        const rot = (rad * (180 / Math.PI) * -1) + 180;
        
        const pupil = eye.querySelector('.pupil');
        
        // Calculate distance to limit pupil movement within the eye
        const angle = Math.atan2(e.clientY - y, e.clientX - x);
        const distance = Math.min(10, Math.hypot(e.clientX - x, e.clientY - y) / 10); // Limit movement radius
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        
        pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Show loading state
        formStatus.style.display = 'block';
        formStatus.style.color = '#000';
        formStatus.textContent = 'Sending message...';
        
        // Submit to Formspree (or your configured service)
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formStatus.style.color = '#4BB543';
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            formStatus.style.color = '#FF4D9E';
            formStatus.textContent = '✗ Oops! Something went wrong. Please try emailing me directly.';
        });
    });
}

console.log("Portfolio Loaded. Welcome to the chaos.");