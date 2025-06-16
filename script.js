// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-out');
        observer.observe(section);
    });

    // Observe other elements for animation
    const animatedElements = document.querySelectorAll('.problem-item, .structure-item, .result-item, .case-item, .maintenance-item, .layer-item');
    animatedElements.forEach(element => {
        element.classList.add('fade-out');
        observer.observe(element);
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });

    // CTA button click tracking
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
            
            // You can add analytics tracking here
            console.log('CTA button clicked:', this.textContent);
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Counter animation for statistics (if needed)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Form submission handling (basic example)
    const consultationForms = document.querySelectorAll('form[data-consultation]');
    consultationForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = '送信中...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('カウンセリングのご予約を承りました。担当者より48時間以内にご連絡いたします。');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                this.reset();
            }, 1500);
        });
    });

    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    // Wait for DOM and jQuery to be ready
    $(document).ready(function(){
        // Initialize Slick slider for case studies
        if ($('.cases-slider').length > 0) {
            $('.cases-slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                dots: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">‹</button>',
                nextArrow: '<button type="button" class="slick-next">›</button>',
                pauseOnHover: true,
                fade: true,
                cssEase: 'ease-in-out',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            autoplaySpeed: 3000
                        }
                    }
                ]
            });
        }
    });
});

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .header.hidden {
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }
    
    .header {
        transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    }
    
    .cta-button.clicked {
        transform: scale(0.95);
        transition: transform 0.1s ease;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, var(--accent-color), rgba(204, 125, 177, 0.8));
        z-index: 9999;
        transition: width 0.1s ease;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    @media (max-width: 768px) {
        .fade-out {
            transform: translateY(20px);
        }
    }
`;

document.head.appendChild(style);