// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Mobile menu toggle
const toggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Fade-in on scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.style.opacity = '1';
  });
}, observerOptions);
document.querySelectorAll('.project-card, .skill-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s';
  observer.observe(el);
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const cards = document.querySelectorAll('.project-card');
const thumbUrls = [
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80'
];
let currentIndex = 0;
const lightboxImageEl = lightbox.querySelector('.lightbox-image');
// Use img inside lightbox for project images
let lbImg = lightboxImageEl.querySelector('img');
if (!lbImg) {
  lbImg = document.createElement('img');
  lbImg.setAttribute('alt', 'Project');
  lightboxImageEl.appendChild(lbImg);
}

function openLightbox(index) {
  currentIndex = index;
  lightbox.classList.add('active');
  lbImg.src = thumbUrls[index];
  lbImg.style.display = 'block';
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function navLightbox(dir) {
  currentIndex = (currentIndex + dir + thumbUrls.length) % thumbUrls.length;
  lbImg.src = thumbUrls[currentIndex];
}

cards.forEach((card, i) => card.addEventListener('click', () => openLightbox(i)));
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navLightbox(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => navLightbox(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

// Form validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    alert('Please enter a valid email.');
    return;
  }
  alert('Thanks for reaching out! I\'ll get back to you soon.');
  this.reset();
});
