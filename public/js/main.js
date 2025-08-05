// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.getElementById('property-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    try {
        // In production, this would send to your API endpoint
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Thank you for your submission! We will review your property and send you a cash offer within 48 hours.');
        
        // Reset form
        this.reset();
        
        // Optionally redirect to a thank you page
        // window.location.href = '/thank-you';
        
    } catch (error) {
        alert('There was an error submitting your form. Please try again or call us directly.');
        console.error('Form submission error:', error);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Phone number formatting
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value.length <= 3) {
            formattedValue = `(${value}`;
        } else if (value.length <= 6) {
            formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    e.target.value = formattedValue;
});

// Add sticky header behavior
let lastScroll = 0;
const header = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});