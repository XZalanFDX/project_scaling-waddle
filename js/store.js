(function () {
  'use strict';

const btn = document.getElementById("sikersztori");
  const modal = document.getElementById("myModal");
  const closeBtn = document.getElementById("closeModalBtn");

  btn.onclick = function() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  closeBtn.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

   const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = '/subpages/kosar_basket/kosar.html';
    });
  }

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  const hamburger      = document.getElementById('hamburger');
  const mobileDrawer   = document.getElementById('mobileDrawer');
  const drawerClose    = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  const track   = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cards   = track.querySelectorAll('.shoe-card');
  let current   = 0;

  function visibleCount() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 1;
    return 3;
  }

  function updateSlider() {
    const v   = visibleCount();
    const max = Math.max(0, cards.length - v);
    current   = Math.max(0, Math.min(current, max));
    const pct = (100 / v) * current;
    track.style.transform = `translateX(-${pct}%)`;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= max;
  }

  prevBtn.addEventListener('click', () => { current--; updateSlider(); });
  nextBtn.addEventListener('click', () => { current++; updateSlider(); });

  window.addEventListener('resize', () => { current = 0; updateSlider(); }, { passive: true });
  updateSlider();

  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) { current++; } else { current--; }
    updateSlider();
  });

  const revealEls = document.querySelectorAll(
    '.shoe-card, .promo-card, .section-title, .section-header'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 60}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

})();
