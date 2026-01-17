// BhulboNa Landing Page - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollAnimations();
    initParallaxEffect();
    initDownloadTracking();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe priority cards
    document.querySelectorAll('.priority-card').forEach(card => {
        observer.observe(card);
    });

    // Observe sections
    document.querySelectorAll('.features, .priorities, .cta').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Subtle parallax effect for floating shapes
 */
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // Respect user's motion preferences
    }

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.02;
                    const yPos = scrollY * speed;
                    shape.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Track download button clicks (for analytics)
 */
function initDownloadTracking() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add ripple effect
            createRipple(e, btn);
            
            // Log download (could be sent to analytics)
            console.log('BhulboNa APK download initiated');
            
            // Show feedback
            showDownloadFeedback();
        });
    });
}

/**
 * Create ripple effect on button click
 */
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/**
 * Show download feedback toast
 */
function showDownloadFeedback() {
    // Check if toast already exists
    if (document.querySelector('.download-toast')) return;
    
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span>Download started! Check your downloads folder.</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove toast after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .download-toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        z-index: 1000;
        transition: transform 0.3s ease;
    }
    
    .download-toast.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .download-toast svg {
        flex-shrink: 0;
    }
    
    @media (max-width: 480px) {
        .download-toast {
            left: 16px;
            right: 16px;
            transform: translateX(0) translateY(100px);
            justify-content: center;
        }
        
        .download-toast.show {
            transform: translateX(0) translateY(0);
        }
    }
`;
document.head.appendChild(style);
