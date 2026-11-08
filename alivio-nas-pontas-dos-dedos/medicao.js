(() => {
 "use strict";
 const config = window.OFERTA_ALIVIO || {};
 const production = location.protocol === 'https:' && ['acropoledosaber.com.br','www.acropoledosaber.com.br'].includes(location.hostname);
 const allowed = new Set(['CtaClick','InitiateCheckout','ViewContent','OfferView','InterestContactClick']);
 let enabled = false;
 window.medicaoAlivio = Object.freeze({event(name) {
  if (!enabled || !allowed.has(name)) return;
  if (['InitiateCheckout','ViewContent'].includes(name)) window.fbq('track',name);
  else window.fbq('trackCustom',name);
 }});
 if (!production || !config.ativarPixel || !/^\d{10,20}$/.test(config.pixelId || '') || navigator.globalPrivacyControl) return;
 if (!window.fbq) {
  const fbq = function(){fbq.callMethod ? fbq.callMethod.apply(fbq,arguments) : fbq.queue.push(arguments);};
  fbq.queue=[];fbq.loaded=true;fbq.version='2.0';window.fbq=fbq;
  // Sem correspondência avançada ou dados pessoais enviados pelo site.
  fbq('set','autoConfig',false,config.pixelId);
  fbq('init',config.pixelId);
  const script=document.createElement('script');script.async=true;script.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(script);
 } else window.fbq('init',config.pixelId);
 enabled=true;
 window.fbq('track','PageView');
})();
