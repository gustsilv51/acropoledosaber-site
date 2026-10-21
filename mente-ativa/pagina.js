(() => {
  const carousel = document.querySelector('.book-carousel');
  const spreads = [...document.querySelectorAll('.book-spread')];
  const previous = document.querySelector('.car-btn.prev');
  const next = document.querySelector('.car-btn.next');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, busy = false, paused = reduced.matches, visible = false, timer;
  function schedule() {
    clearTimeout(timer);
    if (paused || !visible || document.hidden || carousel.matches(':hover') || carousel.contains(document.activeElement) || document.querySelector('.lightbox').open) return;
    timer = setTimeout(() => turn(1), 1500);
  }
  function turn(direction) {
    if (busy) return;
    clearTimeout(timer);
    busy = true;
    const destination = (index + direction + spreads.length) % spreads.length;
    function swap() {
      spreads[index].hidden = true;
      index = destination;
      spreads[index].hidden = false;
    }
    if (reduced.matches) {
      swap(); busy = false; schedule(); return;
    }
    carousel.classList.add('turn-out');
    setTimeout(() => {
      swap();
      carousel.classList.remove('turn-out');
      carousel.classList.add('turn-in');
      setTimeout(() => {
        carousel.classList.remove('turn-in');
        busy = false;
        schedule();
      }, 420);
    }, 420);
  }
  // Hidden spreads never trigger native lazy-loading; fetch them shortly after load so page turns are not blank.
  window.addEventListener('load', () => setTimeout(() => {
    document.querySelectorAll('.book-spread[hidden] img').forEach(img => { img.loading = 'eager'; });
  }, 800));
  previous.addEventListener('click', () => turn(-1));
  next.addEventListener('click', () => turn(1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); turn(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  carousel.addEventListener('mouseenter', () => clearTimeout(timer));
  carousel.addEventListener('mouseleave', schedule);
  carousel.addEventListener('focusin', () => clearTimeout(timer));
  carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { paused = reduced.matches; schedule(); });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold:.25}).observe(carousel);
  const dialog = document.querySelector('.lightbox');
  const image = dialog.querySelector('img');
  let opener;
  document.querySelectorAll('[data-zoom]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      image.src = button.dataset.zoom;
      image.alt = button.querySelector('img').alt;
      dialog.showModal();
      clearTimeout(timer);
      document.body.classList.add('modal-open');
    });
  });
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (opener) opener.focus();
    schedule();
  });
  const bar = document.querySelector('.mobile-buy');
  const offer = document.querySelector('#oferta');
  const contents = document.querySelector('#conteudo');
  function updateBuyBar() {
    const heroButton = document.querySelector('.hero-actions .button');
    const reachedContents = heroButton ? heroButton.getBoundingClientRect().bottom < 0 : contents.getBoundingClientRect().top <= innerHeight;
    const bounds = offer.getBoundingClientRect();
    const viewingOffer = bounds.top < innerHeight && bounds.bottom > 0;
    const show = reachedContents && !viewingOffer;
    bar.hidden = !show;
    bar.classList.toggle('show', show);
  }
  window.addEventListener('scroll', updateBuyBar, {passive:true});
  window.addEventListener('resize', updateBuyBar);
  window.addEventListener('load', updateBuyBar);
  updateBuyBar();
  // Preserve campaign attribution when sending visitors to the existing checkout.
  const params = new URLSearchParams(location.search);
  const allowed = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck','fbclid'];
  document.querySelectorAll('[data-hotmart-checkout]').forEach(link => {
    const url = new URL(link.href);
    allowed.forEach(key => { if (params.has(key)) url.searchParams.set(key, params.get(key)); });
    link.href = url.href;
  });
})();
