(function () {
  'use strict';

  const videos  = Array.from(document.querySelectorAll('.video-slide'));
  const barsEl  = document.getElementById('progressBars');
  const dotsEl  = document.getElementById('slideDots');
  const COUNT   = videos.length;
  let current   = 0;
  let rafId     = null;

  videos.forEach((_, i) => {
    const bar  = document.createElement('div');
    bar.className = 'progress-bar';
    const fill = document.createElement('div');
    fill.className = 'progress-fill' + (i === 0 ? ' active' : '');
    fill.id = 'fill' + i;
    bar.appendChild(fill);
    barsEl.appendChild(bar);

    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.dataset.idx = i;
    dot.setAttribute('aria-label', (i + 1) + '. videó');
    dotsEl.appendChild(dot);
  });

  const fills = Array.from(document.querySelectorAll('.progress-fill'));
  const dots  = Array.from(document.querySelectorAll('.dot'));

  function updateProgress() {
    const v = videos[current];
    if (!v.duration || isNaN(v.duration)) {
      rafId = requestAnimationFrame(updateProgress);
      return;
    }
    const pct = (v.currentTime / v.duration) * 100;
    fills[current].style.width = pct + '%';

    if (!v.paused && !v.ended) {
      rafId = requestAnimationFrame(updateProgress);
    }
  }

  function goTo(idx) {
    cancelAnimationFrame(rafId);

    videos[current].pause();
    videos[current].currentTime = 0;
    videos[current].classList.remove('active');

    fills[current].style.width = '0%';
    fills[current].classList.remove('active');

    dots[current].classList.remove('active');
    dots[idx].classList.add('active');

    current = idx;

    const next = videos[current];
    next.classList.add('active');
    fills[current].classList.add('active');
    fills[current].style.width = '0%';

    if (next.preload === 'none') next.preload = 'auto';

    next.play()
      .then(() => { rafId = requestAnimationFrame(updateProgress); })
      .catch(() => {});
  }

  function next() {
    goTo((current + 1) % COUNT);
  }

  videos.forEach(v => {
    v.addEventListener('ended', next);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.idx, 10);
      if (idx === current) return;
      goTo(idx);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') {
      goTo((current - 1 + COUNT) % COUNT);
    }
  });

  let touchStartX = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next();
    else goTo((current - 1 + COUNT) % COUNT);
  });

  videos[0].play()
    .then(() => { rafId = requestAnimationFrame(updateProgress); })
    .catch(() => {});

  document.addEventListener('click', function startOnInteraction() {
    if (videos[current].paused) {
      videos[current].play()
        .then(() => { rafId = requestAnimationFrame(updateProgress); })
        .catch(() => {});
    }
    document.removeEventListener('click', startOnInteraction);
  }, { once: true });

})();
