// ParcelVest Main JavaScript - WCAG 2.1 AA Compliant

// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const faqItems = document.querySelectorAll('.faq-item');
const landForm = document.getElementById('land-form');

// Header Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.contains('active');
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.style.overflow = !isOpen ? 'hidden' : '';
        mobileMenuToggle.setAttribute('aria-expanded', !isOpen);
    });
}

// Close mobile menu when overlay is clicked
if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close mobile menu when a link is clicked
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion with ARIA
faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Set IDs for ARIA
    question.id = `faq-question-${index + 1}`;
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            const q = faq.querySelector('.faq-question');
            const a = faq.querySelector('.faq-answer');
            faq.classList.remove('active');
            q.setAttribute('aria-expanded', 'false');
            a.setAttribute('hidden', '');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            answer.removeAttribute('hidden');
        }
    });
    
    // Keyboard navigation
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Form Handling
if (landForm) {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    formattedValue = value;
                } else if (value.length <= 6) {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Form validation
    const validateField = (field) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.id === 'propertyZip' && field.value) {
            if (!/^\d{5}$/.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a 5-digit ZIP code';
            }
        }
        
        if (errorElement) {
            errorElement.textContent = errorMessage;
            field.setAttribute('aria-invalid', !isValid);
        }
        
        return isValid;
    };
    
    // Add blur validation
    landForm.querySelectorAll('.form-input').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });
    
    // SHA256 hashing function
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    
    // Form submission
    landForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check honeypot
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value) {
            console.log('Spam detected');
            return;
        }
        
        // Validate all fields
        const fields = landForm.querySelectorAll('.form-input[required]');
        let isFormValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            const firstError = landForm.querySelector('[aria-invalid="true"]');
            if (firstError) firstError.focus();
            return;
        }
        
        const submitButton = landForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        
        // Collect form data
        const formData = new FormData(landForm);
        const data = Object.fromEntries(formData);
        
        // Add timestamp and additional metadata
        data.timestamp = new Date().toISOString();
        document.getElementById('timestamp').value = data.timestamp;
        
        // Hash email and phone for privacy
        if (data.email) {
            data.email_hash = await sha256(data.email.toLowerCase());
            document.getElementById('email_hash').value = data.email_hash;
        }
        if (data.phone) {
            const cleanPhone = data.phone.replace(/\D/g, '');
            data.phone_hash = await sha256(cleanPhone);
            document.getElementById('phone_hash').value = data.phone_hash;
        }
        
        data.user_agent = navigator.userAgent;
        data.referrer = document.referrer || 'direct';
        
        try {
            // Submit to webhook endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Success - redirect to thank you page or show success message
                showSuccessMessage();
                landForm.reset();
                
                // Track conversion event (placeholder)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'conversion', {
                        'send_to': 'GA_CONVERSION_ID',
                        'value': 1.0,
                        'currency': 'USD'
                    });
                }
                
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead');
                }
            } else {
                throw new Error('Submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('We apologize, but there was an error submitting your information. Please try again or call us directly at 1-800-LAND-SELL.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.setAttribute('aria-busy', 'false');
        }
    });
}

// Show success message after form submission
function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    const successHTML = `
        <div class="success-message" style="text-align: center; padding: 3rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
            <h3 style="color: var(--forest-green); margin-bottom: 1rem;">Thank You!</h3>
            <p style="font-size: 1.125rem; margin-bottom: 2rem;">
                We've received your information and will send you a cash offer within 48 hours.
            </p>
            <p style="margin-bottom: 2rem;">
                One of our land specialists will contact you shortly to discuss your property.
            </p>
            <a href="#home" class="btn btn-primary">Back to Home</a>
        </div>
    `;
    
    formContainer.innerHTML = successHTML;
    
    // Scroll to show the success message
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards and testimonials
document.querySelectorAll('.feature-card, .testimonial-card, .process-step').forEach(el => {
    observer.observe(el);
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('ParcelVest website initialized');
    
    // Check for direct link to contact form
    if (window.location.hash === '#contact') {
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
});

// Future Integration Placeholders

// Claude AI Chat Integration
window.initializeChatWidget = function(config) {
    console.log('Chat widget initialization placeholder', config);
    // Future implementation for Claude AI chat
};

// Supabase Integration
window.connectToSupabase = function(supabaseUrl, supabaseKey) {
    console.log('Supabase connection placeholder');
    // Future implementation for Supabase backend
};

// Lead Scoring Integration
window.scoreLeadIntent = function(formData) {
    // Placeholder for AI-based lead scoring
    const score = {
        urgency: formData.propertyDescription?.includes('quickly') ? 'high' : 'medium',
        motivation: formData.propertyDescription?.includes('tax') ? 'high' : 'medium',
        readiness: 'medium'
    };
    return score;
};