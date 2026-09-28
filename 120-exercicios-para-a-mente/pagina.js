(() => {
  function updateDate() {
    const today=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'2-digit'}).format(new Date());
    document.querySelector('[data-offer-day]').textContent='⚡ OFERTA ESPECIAL DISPONÍVEL APENAS HOJE · '+today;
    document.querySelector('[data-offer-validity]').textContent='Valor promocional válido somente hoje, '+today+'.';
  }
  updateDate();setInterval(updateDate,60000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateDate();});
  const config = window.EBOOK_OFFER || {};
  const local = ['localhost','127.0.0.1',''].includes(location.hostname);
  if (!local && config.pixelId) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', config.pixelId); fbq('track','PageView');
  }
  for (const name of ['completo','basico']) {
    const offer = config[name] || {}, price = document.querySelector(`[data-price="${name}"]`), button = document.querySelector(`[data-plan="${name}"]`);
    let url; try { url = new URL(offer.checkout); } catch (_) {}
    if (Number.isFinite(offer.price) && offer.price > 0) {
      price.classList.remove('pending'); price.innerHTML = '<small>R$</small> ' + offer.price.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
    }
    if (!url || url.protocol !== 'https:' || !Number.isFinite(offer.price) || offer.price <= 0) continue;
    button.href = url.href; button.removeAttribute('aria-disabled'); button.dataset.hotmartCheckout = ''; button.textContent = `Quero o plano ${name === 'completo' ? 'completo' : 'básico'}`;
    button.addEventListener('click', () => { if (window.fbq) fbq('track','InitiateCheckout',{content_name:'+100 Exercícios para a Mente',content_ids:['120-exercicios-'+name],currency:'BRL',value:offer.price}); });
  }
  const track=document.querySelector('.track'),prev=document.querySelector('.prev'),next=document.querySelector('.next');
  function sync(){prev.disabled=track.scrollLeft<=4;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-4;}
  [prev,next].forEach(button=>button.addEventListener('click',()=>track.scrollBy({left:(track.querySelector('.page').offsetWidth+18)*(button===next?1:-1),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})));
  track.addEventListener('scroll',sync,{passive:true});addEventListener('resize',sync);sync();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches, hovered=false, inView=false;
  reduced.addEventListener('change',e=>{paused=e.matches;});
  let resumeAt=0;
  function pauseBriefly(){resumeAt=performance.now()+3500;}
  track.addEventListener('mouseenter',()=>{hovered=true;});track.addEventListener('mouseleave',()=>{hovered=false;});
  track.addEventListener('pointerdown',pauseBriefly);
  [prev,next].forEach(b=>b.addEventListener('click',pauseBriefly));
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;},{threshold:.35}).observe(track);
  const originals=[...track.querySelectorAll('.page')];
  const clones=originals.map(page=>{const copy=page.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.querySelectorAll('button').forEach(b=>b.tabIndex=-1);track.appendChild(copy);return copy;});
  let previous=0,fraction=0;
  function animate(now){
    const dt=previous?Math.min(now-previous,50):0;previous=now;
    if(now>=resumeAt&&!paused&&!hovered&&inView&&!document.hidden&&!document.querySelector('.lightbox').open&&!track.contains(document.activeElement)){
      fraction+=dt*.035;const step=Math.floor(fraction);fraction-=step;
      const loop=clones[0].offsetLeft-originals[0].offsetLeft;
      if(loop>0){const position=track.scrollLeft+step;track.scrollLeft=position>=loop?position-loop:position;}
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  const dialog=document.querySelector('.lightbox'), image=dialog.querySelector('img');let opener;
  document.addEventListener('click',event=>{const zoom=event.target.closest('[data-zoom]');if(zoom){opener=zoom;image.src=zoom.dataset.zoom;image.alt=zoom.querySelector('img').alt;dialog.showModal();}else if(event.target===dialog||event.target.closest('.lightbox .close'))dialog.close();});
  dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
  const bar=document.querySelector('.mobile-buy'), content=document.getElementById('conteudo'), offer=document.getElementById('oferta');
  function barState(){const rect=offer.getBoundingClientRect();bar.classList.toggle('show',content.getBoundingClientRect().top<innerHeight&&!(rect.top<innerHeight&&rect.bottom>0));}
  addEventListener('scroll',barState,{passive:true});addEventListener('resize',barState);barState();
})();
