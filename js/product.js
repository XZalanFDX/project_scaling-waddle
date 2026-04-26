
(function () {
  'use strict';

  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = '/subpages/kosar_basket/kosar.html';
    });
  }

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
