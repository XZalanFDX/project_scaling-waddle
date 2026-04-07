/* product.js — full product detail interactions */
(function () {
  'use strict';

  /* ── Product data (valódi projektben ez API hívás lenne) ── */
  const PRODUCTS = {
    1: {
      name:      'Nike Air Max 270',
      category:  'Női cipő',
      price:     '34 990 Ft',
      priceOrig: '',
      badge:     'Új',
      badgeClass:'badge--new',
      sku:       'AH6789-100',
      desc:      'A Nike Air Max 270 a Nike egyik legikonikusabb cipője, amelynek talpában a valaha készített legnagyobb Air egység található. A kényelmes és modern dizájn mindennapi viseletre tökéletes.',
      features:  ['270° Air Max egység a sarkban', 'Könnyű Flyknit felsőrész', 'Rugalmas, könnyű talp', 'Párnázott, levehető talpbetét'],
      colors: [
        { name: 'Fehér / Ezüst',  hex: '#f0f0f0', img: 'resc/women-shoe1.jpg' },
        { name: 'Sötétkék',       hex: '#1a1a2e', img: 'resc/women-shoe1-navy.jpg' },
        { name: 'Levendula',      hex: '#c8b8d8', img: 'resc/women-shoe1-lav.jpg' },
        { name: 'Rózsaszín',      hex: '#e8a0a0', img: 'resc/women-shoe1-pink.jpg' },
        { name: 'Erdőzöld',       hex: '#2d4a22', img: 'resc/women-shoe1-grn.jpg' },
      ],
      thumbs: ['resc/women-shoe1.jpg', 'resc/women-shoe1b.jpg', 'resc/women-shoe1-detail.jpg', 'resc/women-shoe1-back.jpg'],
    },
    2: {
      name:      'Nike Pegasus 41',
      category:  'Futócipő',
      price:     '22 390 Ft',
      priceOrig: '27 990 Ft',
      badge:     '−20%',
      badgeClass:'badge--sale',
      sku:       'FD2722-601',
      desc:      'A Nike Pegasus 41 a futók egyik kedvenc cipője. Reaktív párnázással és frissített ReactX habbal rendelkezik, amely nagyobb visszapattanást biztosít minden lépésnél.',
      features:  ['ReactX hab a jobb energiavisszatérítésért', 'Lélegző Flyknit felsőrész', 'Widened ZoomX párnázás elöl', 'Nem csúszó gumi talp'],
      colors: [
        { name: 'Korall / Fehér', hex: '#ff6b6b', img: 'resc/women-shoe2.jpg' },
        { name: 'Fekete',         hex: '#2d2d2d', img: 'resc/women-shoe2-blk.jpg' },
        { name: 'Mentazöld',      hex: '#a8d8a8', img: 'resc/women-shoe2-grn.jpg' },
      ],
      thumbs: ['resc/women-shoe2.jpg', 'resc/women-shoe2b.jpg'],
    },
    3: {
      name:      'Nike Dunk Low',
      category:  'Lifestyle cipő',
      price:     '29 990 Ft',
      priceOrig: '',
      badge:     '',
      badgeClass:'',
      sku:       'DD1503-105',
      desc:      'A Nike Dunk Low az 1985-ös eredeti kosárlabdacipő modern újragondolása. Ikonikus silhouette, prémium bőr felsőrész, és végtelen stílus lehetőségek.',
      features:  ['Prémium bőr és szuede felsőrész', 'Párnázott belső része', 'Alacsony profilú talpegység', 'Ikonikus Dunk dizájn'],
      colors: [
        { name: 'Homok / Bézs',   hex: '#e8d5b7', img: 'resc/women-shoe3.jpg' },
        { name: 'Barna',          hex: '#8b4513', img: 'resc/women-shoe3-brn.jpg' },
        { name: 'Fehér',          hex: '#f5f5f5', img: 'resc/women-shoe3-wht.jpg' },
        { name: 'Sötétzöld',      hex: '#2f4f4f', img: 'resc/women-shoe3-grn.jpg' },
        { name: 'Fekete',         hex: '#111',    img: 'resc/women-shoe3-blk.jpg' },
      ],
      thumbs: ['resc/women-shoe3.jpg', 'resc/women-shoe3b.jpg', 'resc/women-shoe3-detail.jpg'],
    },
  };

  /* ── Aktuális termék betöltése URL paraméterből ─────────── */
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
    document.getElementById('pdSku').textContent          = product.sku;

    // Áthúzott ár
    const origEl = document.getElementById('pdPriceOrig');
    origEl.textContent = product.priceOrig;

    // Sale stílus
    if (product.priceOrig) document.getElementById('pdPrice').classList.add('pd-price--sale');

    // Badge
    const badge = document.getElementById('pdImgBadge');
    if (product.badge) {
      badge.textContent = product.badge;
      badge.className   = 'pd-img-badge ' + product.badgeClass;
    }

    // Feature lista
    const featEl = document.getElementById('pdFeatures');
    featEl.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');

    // Thumbnails
    const thumbsEl = document.getElementById('pdThumbs');
    thumbsEl.innerHTML = product.thumbs.map((src, i) =>
      `<button class="pd-thumb${i === 0 ? ' active' : ''}" data-img="${src}">
        <img src="${src}" alt="Kép ${i+1}" />
      </button>`
    ).join('');

    // Főkép
    document.getElementById('pdMainImg').src = product.thumbs[0];

    // Thumb click
    thumbsEl.querySelectorAll('.pd-thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        thumbsEl.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        switchMainImg(btn.dataset.img);
      });
    });

    // Szín variánsok
    const colorsEl = document.getElementById('pdColors');
    colorsEl.innerHTML = product.colors.map((c, i) =>
      `<button class="pd-color${i === 0 ? ' active' : ''}"
        style="background:${c.hex}"
        data-name="${c.name}"
        data-img="${c.img}"
        aria-label="${c.name}">
       </button>`
    ).join('');
    document.getElementById('pdColorName').textContent = product.colors[0].name;
    document.getElementById('pdSpecColor').textContent  = product.colors[0].name;

    colorsEl.querySelectorAll('.pd-color').forEach(btn => {
      btn.addEventListener('click', () => {
        colorsEl.querySelectorAll('.pd-color').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('pdColorName').textContent = btn.dataset.name;
        document.getElementById('pdSpecColor').textContent  = btn.dataset.name;
        switchMainImg(btn.dataset.img);
      });
    });
  }

  function switchMainImg(src) {
    const img = document.getElementById('pdMainImg');
    img.style.opacity = '0';
    setTimeout(() => { img.src = src; img.style.opacity = '1'; }, 200);
  }

  /* ── Méret választó ─────────────────────────────────────── */
  let selectedSize = null;
  const sizeHint  = document.getElementById('pdSizeHint');
  const addBtn    = document.getElementById('pdAddBtn');
  const addBtnTxt = document.getElementById('pdAddBtnText');

  document.getElementById('pdSizes').addEventListener('click', e => {
    const btn = e.target.closest('.pd-size');
    if (!btn || btn.disabled) return;

    document.querySelectorAll('.pd-size').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = btn.dataset.size;
    sizeHint.textContent = '';

    addBtn.disabled = false;
    addBtnTxt.textContent = 'Kosárba – ' + product.price;
  });

  /* ── Kosárba gomb ───────────────────────────────────────── */
  addBtn.addEventListener('click', () => {
    if (!selectedSize) {
      sizeHint.textContent = 'Kérjük válassz méretet!';
      return;
    }
    addBtn.classList.add('added');
    addBtnTxt.textContent = '✓ Hozzáadva a kosárhoz';
    setTimeout(() => {
      addBtn.classList.remove('added');
      addBtnTxt.textContent = 'Kosárba – ' + product.price;
    }, 2200);
  });

  /* ── Kedvencek gomb ─────────────────────────────────────── */
  document.getElementById('pdWish').addEventListener('click', function () {
    this.classList.toggle('active');
  });
  document.querySelector('.pd-wish-btn').addEventListener('click', function () {
    document.getElementById('pdWish').classList.toggle('active');
    this.querySelector('svg').style.fill = document.getElementById('pdWish').classList.contains('active') ? '#e30' : 'none';
    this.querySelector('svg').style.stroke = document.getElementById('pdWish').classList.contains('active') ? '#e30' : 'currentColor';
  });

  /* ── Accordion ──────────────────────────────────────────── */
  [['pdAccordion1','pdAccordionBody1'], ['pdAccordion2','pdAccordionBody2']].forEach(([btnId, bodyId]) => {
    const btn  = document.getElementById(btnId);
    const body = document.getElementById(bodyId);
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !open);
      body.classList.toggle('pd-accordion__body--closed', open);
    });
  });

  /* ── Lightbox ───────────────────────────────────────────── */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const zoomBtn     = document.getElementById('pdZoomBtn');

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('pdMainImg').addEventListener('click', () => {
    openLightbox(document.getElementById('pdMainImg').src);
  });
  zoomBtn.addEventListener('click', () => {
    openLightbox(document.getElementById('pdMainImg').src);
  });
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* ── Init ───────────────────────────────────────────────── */
  loadProduct();

})();
