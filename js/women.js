
(function () {
  'use strict';


  const cards = document.querySelectorAll('.product-card');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i * 80) + 'ms';
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => io.observe(c));


  document.querySelectorAll('.product-card__variants').forEach(group => {
    const card = group.closest('.product-card');
    const imgMain  = card.querySelector('.product-card__img--main');
    const imgHover = card.querySelector('.product-card__img--hover');

    group.querySelectorAll('.variant-dot').forEach(dot => {
      dot.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();

        group.querySelectorAll('.variant-dot').forEach(d => d.classList.remove('variant-dot--active'));
        dot.classList.add('variant-dot--active');

        if (dot.dataset.imgMain)  imgMain.src  = dot.dataset.imgMain;
        if (dot.dataset.imgHover) imgHover.src = dot.dataset.imgHover;
      });
    });
  });

const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = '/subpages/kosar_basket/kosar.html';
    });
  }

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
    });
  });


  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');
    });
  });

})();