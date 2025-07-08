document.addEventListener('DOMContentLoaded', function() {
    // Create floating elements
    createFloatingElements();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Smooth scrolling for navigation
    initSmoothScrolling();
    
    // Form handling
    initFormHandling();
    
    // Header scroll effect
    initHeaderScrollEffect();
    
    // Initialize carousel
    initCarousel();
    
    // Initialize donation form
    initDonationForm();
});

// Create floating background elements
function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    if (!floatingContainer) return;
    
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random size between 20px and 80px
        const size = Math.random() * 60 + 20;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        
        // Random position
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        // Random opacity
        element.style.opacity = Math.random() * 0.5 + 0.1;
        
        floatingContainer.appendChild(element);
    }
}

// Initialize scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements that should animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .team-member, .stat-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize statistics counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize form handling
function initFormHandling() {
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reportForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success notification
            showNotification('Emergency report submitted successfully! We will contact you immediately.', 'success');
            
            // Reset form
            reportForm.reset();
            
            // Add visual feedback to submit button
            const submitBtn = reportForm.querySelector('.submit-btn');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '✓ Report Submitted';
                submitBtn.style.background = 'linear-gradient(45deg, #059669, #10b981)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                }, 3000);
            }
        });
    }
}

// Initialize header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(15, 15, 35, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    const colorMap = {
        success: 'linear-gradient(45deg, #059669, #10b981)',
        error: 'linear-gradient(45deg, #dc2626, #ef4444)',
        warning: 'linear-gradient(45deg, #d97706, #f59e0b)',
        info: 'linear-gradient(45deg, #2563eb, #3b82f6)'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${iconMap[type] || iconMap.info}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colorMap[type] || colorMap.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Style notification content
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-message {
            flex: 1;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        
        .notification-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
    
    function closeNotification(notif) {
        notif.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notif.parentNode) {
                notif.remove();
            }
        }, 300);
    }
}

// Enhanced hover effects for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 20px 40px rgba(78, 205, 196, 0.2), 0 0 0 1px rgba(78, 205, 196, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// Enhanced team member hover effects
document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const memberImage = this.querySelector('.member-image');
            if (memberImage) {
                memberImage.style.transform = 'scale(1.1)';
                memberImage.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.5)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const memberImage = this.querySelector('.member-image');
            if (memberImage) {
                memberImage.style.transform = 'scale(1)';
                memberImage.style.boxShadow = '';
            }
        });
    });
});

// Emergency number click handling with enhanced feedback
document.addEventListener('DOMContentLoaded', function() {
    const emergencyNumbers = document.querySelectorAll('.emergency-number');
    
    emergencyNumbers.forEach(number => {
        number.addEventListener('click', function(e) {
            // For desktop users, show copy notification
            if (window.innerWidth > 768 && navigator.clipboard) {
                e.preventDefault();
                const phoneNumber = this.textContent.replace(/[^\d-]/g, '');
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    showNotification('Emergency number copied to clipboard!', 'success');
                });
            }
            
            // Add pulse effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
        });
    });
});

// Add pulse animation for emergency elements
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Performance optimization: Lazy loading for non-critical animations
function initLazyAnimations() {
    const lazyElements = document.querySelectorAll('.service-card, .team-member, .stat-card');
    
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyElements.forEach(el => {
            lazyObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        lazyElements.forEach(el => {
            el.classList.add('loaded');
        });
    }
}

// Initialize lazy animations
document.addEventListener('DOMContentLoaded', initLazyAnimations);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.querySelector('.notification-close').click();
        });
    }
});

// Enhanced form validation with real-time feedback
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#reportForm input, #reportForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear validation styles on input
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            this.style.boxShadow = '';
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && value === '') {
            field.style.borderColor = '#ff6b6b';
            field.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
            return false;
        } else if (value !== '') {
            field.style.borderColor = '#4ecdc4';
            field.style.boxShadow = '0 0 10px rgba(78, 205, 196, 0.3)';
            return true;
        }
        
        return true;
    }
});

// Success Stories Carousel
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.story-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto-play carousel
    let autoPlayInterval;
    
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Move track
        track.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000); // Restart auto-play after 10 seconds
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000);
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000);
        });
    });
    
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const difference = startX - endX;
        
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000);
        }
    });
    
    // Start auto-play
    startAutoPlay();
    
    // Initialize first slide
    showSlide(0);
}

// Donation Form Functionality
function initDonationForm() {
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmount = document.querySelector('.custom-amount');
    const donateBtn = document.querySelector('.donate-submit-btn');
    const donateForm = document.getElementById('donateForm');
    
    let selectedAmount = 80; // Default amount
    
    // Amount button selection
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            amountBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update selected amount
            selectedAmount = parseInt(this.getAttribute('data-amount'));
            
            // Clear custom amount
            if (customAmount) {
                customAmount.value = '';
            }
            
            // Update donate button text
            updateDonateButtonText();
        });
    });
    
    // Custom amount input
    if (customAmount) {
        customAmount.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value && value > 0) {
                // Remove active class from amount buttons
                amountBtns.forEach(btn => btn.classList.remove('active'));
                
                // Update selected amount
                selectedAmount = value;
                updateDonateButtonText();
            }
        });
    }
    
    function updateDonateButtonText() {
        if (donateBtn) {
            donateBtn.textContent = `💝 Donate £${selectedAmount}`;
        }
    }
    
    // Form submission
    if (donateForm) {
        donateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(donateForm);
            const donationType = formData.get('donation-type') || 'one-time';
            const email = formData.get('email');
            const name = formData.get('name');
            const taxReceipt = document.getElementById('taxReceipt').checked;
            
            // Validate required fields
            if (!donationType || !email || !name) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate donation processing
            donateBtn.textContent = 'Processing...';
            donateBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                const message = taxReceipt ? 
                    `Thank you for your £${selectedAmount} donation! A tax receipt will be sent to ${email}.` :
                    `Thank you for your £${selectedAmount} donation! Your support helps us bring more pets home safely.`;
                
                showNotification(message, 'success');
                
                // Reset form
                donateForm.reset();
                
                // Reset button
                donateBtn.textContent = `💝 Donate £${selectedAmount}`;
                donateBtn.disabled = false;
                
                // Reset amount selection
                amountBtns.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-amount="80"]').classList.add('active');
                selectedAmount = 80;
                updateDonateButtonText();
                
            }, 2000);
        });
    }
    
    // Initialize donate button text
    updateDonateButtonText();
}

// Enhanced donation button animations
document.addEventListener('DOMContentLoaded', function() {
    const donateButtons = document.querySelectorAll('.donate-btn, .donate-submit-btn');
    
    donateButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
        });
    });
});