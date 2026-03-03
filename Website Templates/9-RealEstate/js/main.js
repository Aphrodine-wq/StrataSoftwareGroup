// Mobile menu
(function() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.nav-links');
  if (btn && menu) {
    btn.addEventListener('click', function() {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      a.addEventListener('click', function() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    });
  }
})();

// Search/filter
const searchForm = document.getElementById('searchForm');
const propertyCards = document.querySelectorAll('.property-card');

searchForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const type = formData.get('type');
  const priceMax = formData.get('price');
  propertyCards.forEach(card => {
    const cardType = card.dataset.type || '';
    const cardPrice = parseInt(card.dataset.price) || 0;
    const typeMatch = !type || cardType === type;
    const priceMatch = !priceMax || cardPrice <= parseInt(priceMax);
    card.style.display = typeMatch && priceMatch ? 'block' : 'none';
  });
});

// Gallery carousel for property cards
document.querySelectorAll('.property-gallery').forEach(gallery => {
  const slides = gallery.querySelectorAll('.gallery-slide');
  if (slides.length <= 1) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 3000);
});

// Populate listings grid with image placeholders
const listingImages = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80'
];
const listings = [
  { price: 325000, beds: 3, type: 'house', title: 'Cozy Suburban', meta: '3 bed · 2 bath · 1,600 sqft', loc: 'Pine St' },
  { price: 210000, beds: 2, type: 'condo', title: 'Urban Loft', meta: '2 bed · 1 bath · 900 sqft', loc: 'Downtown' },
  { price: 475000, beds: 4, type: 'house', title: 'Spacious Ranch', meta: '4 bed · 3 bath · 2,800 sqft', loc: 'Oak Hills' },
  { price: 189000, beds: 1, type: 'condo', title: 'Starter Condo', meta: '1 bed · 1 bath · 650 sqft', loc: 'City View' },
  { price: 395000, beds: 3, type: 'townhouse', title: 'End Unit', meta: '3 bed · 2.5 bath · 1,750 sqft', loc: 'Willow Creek' },
  { price: 625000, beds: 5, type: 'house', title: 'Executive Home', meta: '5 bed · 4 bath · 3,500 sqft', loc: 'Summit Estates' },
  { price: 265000, beds: 2, type: 'condo', title: 'Waterfront View', meta: '2 bed · 2 bath · 1,050 sqft', loc: 'Harbor Point' },
  { price: 510000, beds: 4, type: 'house', title: 'Colonial Classic', meta: '4 bed · 3 bath · 2,600 sqft', loc: 'Heritage Lane' }
];

const grid = document.querySelector('.listings-grid');
if (grid) {
  grid.innerHTML = listings.map((p, i) => `
    <article class="property-card" data-price="${p.price}" data-beds="${p.beds}" data-type="${p.type}">
      <div class="property-gallery">
        <div class="gallery-slide active"><img src="${listingImages[i % listingImages.length]}" alt="${p.title}"></div>
      </div>
      <div class="property-info">
        <span class="price">$${p.price.toLocaleString()}</span>
        <h3>${p.title}</h3>
        <p class="meta">${p.meta}</p>
        <p class="location">${p.loc}</p>
      </div>
    </article>
  `).join('');
}

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you! An agent will contact you soon.');
  this.reset();
});
