// Slider content
const slides = [
    {
        title: "Boost Engagement & Sales",
        content: "Transform your business with a professional website that delivers measurable results. Businesses experience an average 70% increase in customer engagement and 60% boost in sales revenue. A well-designed website works 24/7 as your digital storefront, continuously converting visitors into valuable customers."
    },
    {
        title: "Expanded Reach",
        content: "Stop missing out on potential customers who are actively searching for your services right now. A strategic online presence positions your business exactly where your ideal customers are looking. With powerful Search Engine Optimization and targeted content, your website becomes the perfect tool for attracting and converting qualified leads."
    },
    {
        title: "Common Misconception",
        content: "Think social media presence alone is enough for your business? While 72% of businesses rely solely on social platforms, they're missing out on 81% of customers who specifically look for business websites before making decisions. Don't let a missing website cost you credibility and valuable sales in today's digital-first marketplace."
    },
    {
        title: "Growth Potential",
        content: "Imagine automating your most time-consuming tasks: answering common questions, booking appointments, and capturing leads—all while you focus on growing your business. A strategic website isn't just another business expense; it's a powerful investment that pays for itself by streamlining operations and driving sustainable, long-term growth."
    }
];

let currentSlide = 0;
let isAnimating = false;

// Function to scroll to next section
function scrollToNextSection() {
    const whySection = document.getElementById('why-section');
    whySection.scrollIntoView({ behavior: 'smooth' });
}

// Function to update slide content with animation
function updateSlide(direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;

    const container = document.querySelector('.slider-content-container');
    const currentSlideContent = container.querySelector('.slide-content');
    const newSlideContent = document.createElement('div');
    newSlideContent.className = 'slide-content';
    newSlideContent.innerHTML = `
        <h3>${slides[currentSlide].title}</h3>
        <p>${slides[currentSlide].content}</p>
    `;

    // Add animation classes based on direction
    currentSlideContent.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
    newSlideContent.classList.add(direction === 'next' ? 'slide-right' : 'slide-left');

    // Insert new slide
    container.appendChild(newSlideContent);

    // Trigger reflow
    newSlideContent.offsetHeight;

    // Remove animation classes to trigger transition
    newSlideContent.classList.remove(direction === 'next' ? 'slide-right' : 'slide-left');

    // Remove old slide after animation
    setTimeout(() => {
        currentSlideContent.remove();
        isAnimating = false;
    }, 500);
}

// Next slide function
function nextSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide('next');
}

// Previous slide function
function prevSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide('prev');
}

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Service card animation
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
    
    updateSlide();
    reveal();
    animateServiceCards();

    // Scroll event listener for reveal animations
    window.addEventListener('scroll', reveal);

    // Form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        
        // Disable the submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.innerHTML = '';
        
        try {
            // Replace this URL with your Google Apps Script deployment URL
            const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
                method: 'POST',
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                })
            });
            
            const result = await response.json();
            
            if (result.result === 'success') {
                formStatus.innerHTML = '<div class="success-message">Thank you! Your message has been sent.</div>';
                this.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            formStatus.innerHTML = '<div class="error-message">Sorry, there was an error sending your message. Please try again.</div>';
        } finally {
            // Re-enable the submit button and restore original text
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Force scroll to top on page load/reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}; 