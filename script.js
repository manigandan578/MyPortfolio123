// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Navbar Background on Scroll with Animation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("aL31_o6qhGSGRBL93"); // Replace with your EmailJS Public Key
})();

// Contact Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const submitBtn = this.querySelector('.submit-btn');
        
        // Validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Prepare email parameters
        const emailParams = {
            to_email: email,  // Send to the user's email address
            name: name,
            email: email,
            message: message
        };
        
        // Send email using EmailJS
        emailjs.send(
            'service_sospxp8',      // Replace with your EmailJS Service ID
            'template_dwkh5oe',     // Replace with your EmailJS Template ID
            emailParams
        )
        .then(function(response) {
            console.log('SUCCESS', response);
            
            // Show success message
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#48bb78';
            submitBtn.classList.add('animate-pulse');
            
            // Reset form
            contactForm.reset();
            
            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                submitBtn.classList.remove('animate-pulse');
            }, 3000);
        })
        .catch(function(error) {
            console.log('FAILED', error);
            alert('Failed to send message. Please try again later.');
            
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        });
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.style.animationPlayState = 'running';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
    el.style.animationPlayState = 'paused';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Add CTA button hover animation
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    ctaBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Add project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateX(5deg)';
        this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.25)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
        this.style.boxShadow = 'var(--shadow-sm)';
    });
    this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
});

// Add skill category hover effects
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
    });
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-sm)';
    });
    this.style.transition = 'all 0.3s ease';
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const heroShape = document.querySelector('.hero-shape');
    if (heroShape) {
        heroShape.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Add active state to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// Add stat counter animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target.querySelector('h3');
            if (stat && !stat.dataset.animated) {
                const targetValue = parseInt(stat.textContent);
                animateCounter(stat, targetValue);
                stat.dataset.animated = 'true';
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== LIVE TEXT ANIMATIONS =====

// Typewriter effect for hero title
function typeWriterEffect(element, speed = 50) {
    if (!element) return;
    const text = element.textContent;
    element.textContent = '';
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    type();
}

// Character reveal animation for project titles
function characterRevealAnimation(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.display = 'flex';
    element.style.flexWrap = 'wrap';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animation = `textReveal 0.05s ease forwards`;
        span.style.animationDelay = `${index * 0.05}s`;
        element.appendChild(span);
    });
}

// Word fade-in animation
function wordFadeInAnimation(element) {
    const text = element.textContent;
    const words = text.split(' ');
    element.textContent = '';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.animation = `fadeIn 0.6s ease forwards`;
        span.style.animationDelay = `${index * 0.1}s`;
        span.style.opacity = '0';
        element.appendChild(span);
    });
}

// Letter spacing pulse animation
function letterPulseAnimation(element) {
    element.style.animation = 'none';
    element.style.letterSpacing = '0px';
    setTimeout(() => {
        element.style.animation = 'letterPulse 1s ease infinite';
    }, 10);
}

// Add keyframe animation for letter pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes letterPulse {
        0%, 100% { letter-spacing: 0px; }
        50% { letter-spacing: 2px; }
    }
`;
document.head.appendChild(style);

// Apply typewriter effect to hero title
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    
    if (heroTitle) {
        typeWriterEffect(heroTitle, 60);
    }
    
    // Add typing effect to subtitle with delay
    if (heroSubtitle) {
        setTimeout(() => {
            typeWriterEffect(heroSubtitle, 40);
        }, 2500); // Delay until title finishes typing
    }
});

// Apply character reveal to project titles on scroll
const projectTitleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            characterRevealAnimation(entry.target.querySelector('h3'));
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.project-card').forEach(card => {
    projectTitleObserver.observe(card);
});

// Apply word fade-in to about text
const aboutTexts = document.querySelectorAll('.about-text p');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            wordFadeInAnimation(entry.target);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

aboutTexts.forEach(text => aboutObserver.observe(text));

// Apply letter pulse to section titles
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', function() {
        letterPulseAnimation(this);
    });
    title.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
        this.style.letterSpacing = '0px';
    });
});

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

console.log('Portfolio animations loaded successfully!');
