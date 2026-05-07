document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('cursor');

    document.addEventListener('mousemove', (e) => {
        if(cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // Swiper Initialization
    const swiper = new Swiper('.swiper', {
        loop: true,
        speed: 1000,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Animation
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.8
    });

    // Parallax Text
    gsap.utils.toArray('.parallax-text').forEach(text => {
        gsap.to(text, {
            xPercent: -20,
            scrollTrigger: {
                trigger: text,
                scrub: 1
            }
        });
    });

    // Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Vitals Scale Animations
    const vitalsSection = document.querySelector('#vitals');
    if (vitalsSection) {
        const vitalsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate Bars
                    const bars = entry.target.querySelectorAll('.vital-bar-fill');
                    bars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });

                    // Animate Dots
                    const dotContainers = entry.target.querySelectorAll('.vital-dots');
                    dotContainers.forEach(container => {
                        const score = parseInt(container.getAttribute('data-score'));
                        const dots = container.querySelectorAll('.vital-dot');
                        dots.forEach((dot, index) => {
                            if (index < score) {
                                setTimeout(() => {
                                    dot.classList.add('active');
                                }, index * 100); // Stagger dot animation
                            }
                        });
                    });
                    
                    vitalsObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.5 });

        vitalsObserver.observe(vitalsSection);
    }

    // Review Cards Pinned Stagger Animation
    const reviewsSection = document.querySelector('#reviews');
    const reviewCards = gsap.utils.toArray('.review-card');
    
    if (reviewCards.length > 0 && reviewsSection) {
        ScrollTrigger.create({
            trigger: '#reviews',
            start: 'top top',
            end: '+=1500', // Pin for 1500px of scrolling
            pin: true,
            animation: gsap.to(reviewCards, {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                ease: 'power2.out'
            }),
            scrub: 1
        });
    }
});
