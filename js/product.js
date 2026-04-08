/* product.js — product detail interactions */
(function () {
  'use strict';

  /* ── Termék adatok ──────────────────────────────────────── */
  const PRODUCTS = {
    1: {
      name:      'Nike Free Metcon 7',
      category:  'Női cipő',
      price:     '129.99 €',
      priceOrig: '',
      badge:     'Új',
      badgeClass:'badge--new',
      desc:      'A Nike Air Max 270 a Nike egyik legikonikusabb cipője, amelynek talpában a valaha készített legnagyobb Air egység található. A kényelmes és modern dizájn mindennapi viseletre tökéletes.',
      features:  ['270° Air Max egység a sarkban', 'Könnyű Flyknit felsőrész', 'Rugalmas, könnyű talp', 'Párnázott, levehető talpbetét'],
      thumbs: [
        '../../resc/women-shoe1.jpg',
        '../../resc/women-shoe1b.jpg',
        '../../resc/women-shoe1-detail.jpg',
        '../../resc/women-shoe1-back.jpg',
      ],
    },
    2: {
      name:      'Nike Shox Z SE',
      category:  'Futócipő',
      price:     '109.99 €',
      priceOrig: '139.99 €',
      badge:     '−20%',
      badgeClass:'badge--sale',
      desc:      'A Nike Pegasus 41 a futók egyik kedvenc cipője. Reaktív párnázással és frissített ReactX habbal rendelkezik, amely nagyobb visszapattanást biztosít minden lépésnél.',
      features:  ['ReactX hab a jobb energiavisszatérítésért', 'Lélegző Flyknit felsőrész', 'Widened ZoomX párnázás elöl', 'Nem csúszó gumi talp'],
      thumbs: [
        '../../resc/women-shoe2.jpg',
        '../../resc/women-shoe2b.jpg',
        '../../resc/women-shoe2-detail.jpg',
        '../../resc/women-shoe2-back.jpg',
      ],
    },
  };


  const params  = new URLSearchParams(window.location.search);
  const id      = parseInt(params.get('id'), 10) || 1;
  const product = PRODUCTS[id] || PRODUCTS[1];

  function loadProduct() {
    document.title = product.name + ' – Nike Store';
    document.getElementById('breadcrumbName').textContent = product.name;
    document.getElementById('pdName').textContent         = product.name;
    document.getElementById('pdCategory').textContent     = product.category;
    document.getElementById('pdPrice').textContent        = product.price;
    document.getElementById('pdDesc').textContent         = product.desc;

    const origEl = document.getElementById('pdPriceOrig');
    origEl.textContent = product.priceOrig;
    if (product.priceOrig) document.getElementById('pdPrice').classList.add('pd-price--sale');

    const badge = document.getElementById('pdImgBadge');
    if (product.badge) {
      badge.textContent = product.badge;
      badge.className   = 'pd-img-badge ' + product.badgeClass;
    }

    document.getElementById('pdFeatures').innerHTML =
      product.features.map(f => `<li>${f}</li>`).join('');

    const thumbsEl = document.getElementById('pdThumbs');
    thumbsEl.innerHTML = product.thumbs.map((src, i) =>
      `<button class="pd-thumb${i === 0 ? ' active' : ''}" data-img="${src}">
        <img src="${src}" alt="Kép ${i + 1}" />
      </button>`
    ).join('');

    document.getElementById('pdMainImg').src = product.thumbs[0];

    thumbsEl.querySelectorAll('.pd-thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        thumbsEl.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        switchMainImg(btn.dataset.img);
      });
    });
  }

  function switchMainImg(src) {
    const img = document.getElementById('pdMainImg');
    img.style.opacity = '0';
    setTimeout(() => { img.src = src; img.style.opacity = '1'; }, 200);
  }

  const acc1  = document.getElementById('pdAccordion1');
  const body1 = document.getElementById('pdAccordionBody1');
  acc1.addEventListener('click', () => {
    const open = acc1.getAttribute('aria-expanded') === 'true';
    acc1.setAttribute('aria-expanded', !open);
    body1.classList.toggle('pd-accordion__body--closed', open);
  });

  loadProduct();

})();
