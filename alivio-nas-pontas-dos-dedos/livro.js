(() => {
 "use strict";
 const book = document.querySelector('.book-carousel');
 if (!book) return;
 const spreads = [...book.querySelectorAll('.book-spread')];
 const status = book.querySelector('.book-status');
 let current = 0;
 function turn(step) {
  current = (current + step + spreads.length) % spreads.length;
  spreads.forEach((spread, index) => { spread.hidden = index !== current; });
  status.textContent = `${spreads[current].getAttribute('aria-label')} · ${current + 1} de ${spreads.length}`;
  book.classList.remove('turn-in');
  void book.offsetWidth;
  book.classList.add('turn-in');
 }
 book.querySelectorAll('[data-book-step]').forEach(button => button.addEventListener('click', () => turn(Number(button.dataset.bookStep))));
 book.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
   event.preventDefault();
   turn(event.key === 'ArrowLeft' ? -1 : 1);
  }
 });
})();
