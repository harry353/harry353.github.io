// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.glass-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 11, 20, 0.95)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(5, 11, 20, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
};

document.addEventListener('DOMContentLoaded', animateOnScroll);

// --- Star Particle Background ---
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}

// Realistic star colors (O, B, A, F, G, K, M spectral classes)
const STAR_COLORS = [
    '155, 176, 255', // Blue
    '170, 191, 255', // Light Blue
    '255, 255, 255', // White
    '255, 244, 234', // Yellow-White
    '255, 221, 180', // Light Yellow
    '255, 189, 111'  // Orange-Red
];

class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5;
        // Make stars drift very slowly
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random();
        this.fadeDir = Math.random() > 0.5 ? 1 : -1;
        this.fadeSpeed = Math.random() * 0.005 + 0.001;
        // Pick a random color from the spectrum
        this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    }

    draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Twinkle effect
        this.opacity += this.fadeDir * this.fadeSpeed;
        if (this.opacity >= 1) {
            this.opacity = 1;
            this.fadeDir = -1;
        } else if (this.opacity <= 0.1) {
            this.opacity = 0.1;
            this.fadeDir = 1;
        }

        // Screen wrap
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }
}

function initStars() {
    stars = [];
    // Number of stars depends on screen size
    const numStars = Math.floor((width * height) / 4000);
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resize);
resize();
animateStars();

// --- Animations Toggle ---
const animationToggle = document.getElementById('animation-toggle');
if (animationToggle) {
    animationToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.remove('animations-disabled');
        } else {
            document.body.classList.add('animations-disabled');
        }
    });
}

// --- Dynamic CV Download Name ---
const cvDownloadBtn = document.getElementById('cv-download-btn');
if (cvDownloadBtn) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    cvDownloadBtn.download = `katsikogiannis_cv_${yyyy}_${mm}_${dd}.pdf`;
}
