// Dispara o evento InitiateCheckout do Meta Pixel quando o visitante clica
// em qualquer botão de checkout da Hotmart (identificado pelo atributo
// data-hotmart-checkout, usado nas páginas "Mente Ativa 60+", "Entenda o
// Hemograma do Seu Filho" e "Entendendo a Imunidade do Seu Filho").
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-hotmart-checkout]');
  if (!el) return;
  if (window.fbq) window.fbq('track', 'InitiateCheckout');
});
