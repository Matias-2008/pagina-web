// ===== Navbar: change on scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// ===== Typing effect for hero role =====
const roles = [
    'Estudiante de Ingeniería de Sistemas',
    'Desarrollador Web en formación',
    'Apasionado por la tecnología'
];

const typedRole = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    if (!typedRole) return;
    const current = roles[roleIndex];

    if (!deleting) {
        typedRole.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
        setTimeout(type, 80);
    } else {
        typedRole.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(type, 45);
    }
}

type();

// ===== Reveal on scroll =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Animated skill bars =====
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.dataset.level + '%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-fill').forEach(fill => skillObserver.observe(fill));