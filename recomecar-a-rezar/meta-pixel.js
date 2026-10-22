// Visualização do conteúdo, sem parâmetros pessoais ou depoimentos.
if (typeof window.fbq === 'function') window.fbq('track', 'ViewContent');
// Mesmo evento do Mente Ativa, limitado a um checkout ativo e válido.
document.addEventListener('click', function (event) {
  var link = event.target.closest && event.target.closest('[data-hotmart-checkout]');
  if (!link || event.defaultPrevented || link.getAttribute('aria-disabled') === 'true') return;
  try {
    var checkout = new URL(link.href);
    if (checkout.protocol !== 'https:' || !['pay.hotmart.com', 'checkout.hotmart.com'].includes(checkout.hostname)) return;
  } catch (_) { return; }
  if (typeof window.fbq === 'function') window.fbq('track', 'InitiateCheckout');
});