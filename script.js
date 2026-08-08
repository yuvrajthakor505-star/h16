/**
 * LA FEMME — BRIDAL STUDIO • HAIR • MAKEUP • SKIN • BEAUTY
 * Modern Vanilla JavaScript Interactions (Since 1968)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeritagePopup();
  initHeaderNavigation();
  initScrollProgress();
  initScrollReveal();
  initHorizontalSliders();
  initLightbox();
  initFloatingActions();
  initCustomCursor();
  initImageFallbackHandler();
  initSmoothScroll();
});

/* ==========================================================================
   1. HERITAGE POPUP (SINCE 1968)
   ========================================================================== */
function initHeritagePopup() {
  const popupOverlay = document.getElementById('heritage-popup');
  const enterBtn = document.getElementById('popup-enter-btn');
  const legacyLink = document.getElementById('popup-legacy-link');
  const closeBtn = document.getElementById('popup-close-btn');

  if (!popupOverlay) return;

  // Check localStorage for dismissal
  const isDismissed = localStorage.getItem('lafemme_heritage_popup_seen');

  if (!isDismissed) {
    setTimeout(() => {
      popupOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock scroll while popup is active
    }, 700);
  }

  function closePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
    localStorage.setItem('lafemme_heritage_popup_seen', 'true');
  }

  if (enterBtn) enterBtn.addEventListener('click', closePopup);
  if (closeBtn) closeBtn.addEventListener('click', closePopup);
  if (legacyLink) {
    legacyLink.addEventListener('click', (e) => {
      closePopup();
      const legacySec = document.getElementById('legacy');
      if (legacySec) {
        setTimeout(() => {
          legacySec.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
  }

  // Close popup if background backdrop is clicked
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });
}

/* ==========================================================================
   2. HEADER NAVIGATION & MOBILE MENU
   ========================================================================== */
function initHeaderNavigation() {
  const headerNav = document.getElementById('header-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerNav?.classList.add('scrolled');
    } else {
      headerNav?.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Menu Toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   3. SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });
}

/* ==========================================================================
   4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // Reveal once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. HORIZONTAL SLIDERS (AVANTGARDE)
   ========================================================================== */
function initHorizontalSliders() {
  const slider = document.getElementById('avantgarde-slider');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');

  if (!slider) return;

  const scrollAmount = 380;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   6. PREMIUM LIGHTBOX GALLERY
   ========================================================================== */
let lightboxGallery = [];
let currentLightboxIndex = 0;

function initLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!lightboxModal || !lightboxImg) return;

  // Delegate click for gallery triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox-trigger]');
    if (trigger) {
      e.preventDefault();
      const galleryGroup = trigger.getAttribute('data-gallery-group') || 'default';
      const triggers = Array.from(document.querySelectorAll(`[data-gallery-group="${galleryGroup}"]`));
      
      lightboxGallery = triggers.map(item => ({
        src: item.getAttribute('data-src') || item.getAttribute('src') || item.querySelector('img')?.src,
        title: item.getAttribute('data-title') || item.querySelector('img')?.alt || 'La Femme Studio'
      }));

      currentLightboxIndex = triggers.indexOf(trigger);
      if (currentLightboxIndex < 0) currentLightboxIndex = 0;

      updateLightboxContent();
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  function updateLightboxContent() {
    if (!lightboxGallery.length) return;
    const item = lightboxGallery[currentLightboxIndex];
    lightboxImg.src = item.src;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxGallery.length}`;
    lightboxCaption.textContent = item.title;
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxGallery.length) % lightboxGallery.length;
    updateLightboxContent();
  }

  function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxGallery.length;
    updateLightboxContent();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  // Close lightbox on clicking dark backdrop
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-main-container')) {
      closeLightbox();
    }
  });

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

/* ==========================================================================
   7. FLOATING ACTIONS & BACK TO TOP
   ========================================================================== */
function initFloatingActions() {
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   8. CUSTOM LUXURY CURSOR (DESKTOP)
   ========================================================================== */
function initCustomCursor() {
  // Only activate cursor on devices with fine pointer
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on clickable elements
  const hoverElements = document.querySelectorAll('a, button, [data-lightbox-trigger], .slider-card, .press-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover-target'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover-target'));
  });
}

/* ==========================================================================
   9. IMAGE FALLBACK SAFEGUARD
   ========================================================================== */
function initImageFallbackHandler() {
  // Fallback SVG data URI for elegant champagne-gold placeholder
  const fallbackSVG = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='100%25' height='100%25' fill='%23121110'/%3E%3Crect x='10%25' y='10%25' width='80%25' height='80%25' fill='none' stroke='%23C5A059' stroke-width='1' stroke-opacity='0.4'/%3E%3Ctext x='50%25' y='48%25' font-family='Cormorant Garamond, serif' font-size='38' fill='%23C5A059' text-anchor='middle' letter-spacing='6'%3ELA FEMME%3C/text%3E%3Ctext x='50%25' y='54%25' font-family='Montserrat, sans-serif' font-size='14' fill='%23FAF8F5' text-anchor='middle' letter-spacing='4'%3ESINCE 1968%3C/text%3E%3C/svg%3E";

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.onerror = null;
      this.src = fallbackSVG;
    });
  });
}

/* ==========================================================================
   10. SMOOTH SCROLL FOR ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
