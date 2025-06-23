// Slider content
const slides = [
    {
        title: "Content Drives Results",
        content: "Businesses that publish regular blogs generate up to 70% more engagement, and content like newsletters is a proven driver of customer retention and repeat business. Quality content builds trust, boosts SEO, and keeps your audience coming back for more."
    },
    {
        title: "Boost Engagement & Trust",
        content: "Businesses that publish regular blogs generate up to 70% more engagement, and content like newsletters is a proven driver of customer retention and repeat business."
    },
    {
        title: "Expand Your Audience",
        content: "Stop missing out on potential customers who are searching for valuable information. Strategic blog posts and newsletters position your business as an authority, attracting new leads and nurturing loyal clients."
    },
    {
        title: "Content vs. Social Media",
        content: "Think social media alone is enough? 72% of businesses rely only on social, but 81% of customers look for in-depth content like blogs and newsletters before making decisions. Don't let a lack of content cost you credibility and sales."
    },
    {
        title: "Start Simple, Grow Smart",
        content: "Imagine automating your outreach: answering FAQs, sharing updates, and building relationships—all while you focus on your business. If you don't have a website yet, I can set up a simple site to host your content as an add-on."
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

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            formStatus.innerHTML = '';
            
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value
            };
            
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbw8YiN_MBG56uKqr7B7heMMffsoVq1feDPTKIQ9kzCB1gH6u9wKWiLKqkxO8jBphHaoFQ/exec', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.result === 'success') {
                    formStatus.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Message sent successfully!</div>';
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send message');
                }
            } catch (error) {
                formStatus.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.</div>';
                console.error('Form submission error:', error);
            }
            
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        });
    }
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