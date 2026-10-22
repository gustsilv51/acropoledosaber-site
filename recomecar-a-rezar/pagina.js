(() => {
  'use strict';
  const config = window.RECOMECAR_CONFIG || {};
  const formattedPrice = new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(config.price || 19.90);
  document.querySelectorAll('[data-price]').forEach(el => { el.textContent = formattedPrice; });
  // Urgência só é exibida no dia real de encerramento em São Paulo.
  function updateOfferLabels(){
    const end=new Date(config.offerEndsAt || '');
    const today=new Date();
    const currentDate=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'2-digit',year:'numeric'}).format(today);
    const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'});
    const lastDay=Number.isFinite(end.getTime()) && today<end && day.format(today)===day.format(end);
    document.querySelector('[data-offer-top]').textContent=lastDay?'⚡ OFERTA ESPECIAL DISPONÍVEL APENAS HOJE':`⚡ OFERTA DE HOJE · ${currentDate}`;
    document.querySelector('[data-offer-label]').textContent=lastDay?'⏰ Última chance — oferta termina hoje':`✦ Oferta de hoje · ${currentDate}`;
  }
  updateOfferLabels();setInterval(updateOfferLabels,60000);
  let checkout;
  try {
    const candidate = new URL(config.hotmartCheckoutUrl);
    if(candidate.protocol === 'https:' && (candidate.hostname === 'pay.hotmart.com' || candidate.hostname === 'checkout.hotmart.com')) checkout = candidate;
  } catch { /* Compra permanece indisponível até receber uma URL válida. */ }
  if(checkout) document.querySelectorAll('[data-direct-checkout]').forEach(link=>link.setAttribute('data-hotmart-checkout',''));
  document.querySelectorAll('[data-hotmart-checkout]').forEach(link => {
    if(!checkout) { link.addEventListener('click', e => e.preventDefault()); return; }
    const url = new URL(checkout);
    const params = new URLSearchParams(location.search);
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck','fbclid'].forEach(key => { if(params.has(key)) url.searchParams.set(key,params.get(key)); });
    link.href = url.href; link.removeAttribute('aria-disabled');
    if(!link.hasAttribute('data-direct-checkout')) link.textContent = 'Quero recomeçar a rezar →';
    if(link.closest('.mobile-offer')) link.querySelector('b').textContent='Comprar agora →';
  });
  if(checkout) document.querySelectorAll('[data-checkout-status]').forEach(el => { el.textContent = 'Você será direcionado ao checkout da Hotmart.'; });

  // Sem oferta indexável enquanto as vendas não estiverem abertas.
  if(checkout){
    const schemaElement=document.querySelector('#product-schema');
    const data=JSON.parse(schemaElement.textContent);
    data['@graph'][0].offers={'@type':'Offer',url:checkout.href,priceCurrency:'BRL',price:Number(config.price || 19.90).toFixed(2),availability:'https://schema.org/InStock'};
    schemaElement.textContent=JSON.stringify(data);
  }
  const samples = {
    devocional: {image:'assets/amostra-devocional.webp', thumb:'assets/amostra-devocional-sm.webp', alt:'Página real do Encontro 1: O primeiro passo pode ser um pedido', caption:'O primeiro passo pode ser um pedido — Lucas 11,1–4.'},
    caderno: {image:'assets/amostra-caderno.webp', thumb:'assets/amostra-caderno-sm.webp', alt:'Página do Caderno de Oração: Meu ponto de partida', caption:'Meu ponto de partida — um espaço para registrar seu recomeço.'},
    oracoes: {image:'assets/amostra-oracoes.webp', thumb:'assets/amostra-oracoes-sm.webp', alt:'Oração: Quando o cansaço pesa', caption:'Quando o cansaço pesa — uma das 15 orações do livreto.'}
  };
  const book=document.querySelector('.prayer-book');
  const spreads=[...book.querySelectorAll('[data-spread]')];
  const turning=book.querySelector('.turning-leaf');
  const pause=book.querySelector('.book-pause');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let current=0, paused=reduced.matches, busy=false, visible=false;
  function updatePause(){pause.textContent=paused?'Retomar livro':'Pausar livro';pause.setAttribute('aria-pressed',String(paused));}
  function showSpread(next){
    if(busy)return;
    const old=current;current=(next+spreads.length)%spreads.length;
    if(old===current)return;
    const commit=()=>{spreads.forEach((s,i)=>s.hidden=i!==current);book.querySelector('.book-count').textContent=`Encontros ${current*2+1}–${current*2+2} de 6`;};
    if(reduced.matches){commit();return;}
    busy=true;
    turning.querySelector('img').src=spreads[old].querySelector('button:last-child img').src;
    turning.classList.add('is-turning');
    setTimeout(commit,340);
    setTimeout(()=>{turning.classList.remove('is-turning');busy=false;},760);
  }
  book.querySelector('.book-prev').addEventListener('click',()=>{paused=true;updatePause();showSpread(current-1);});
  book.querySelector('.book-next').addEventListener('click',()=>{paused=true;updatePause();showSpread(current+1);});
  pause.addEventListener('click',()=>{paused=!paused;updatePause();});
  book.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();paused=true;updatePause();showSpread(current+(e.key==='ArrowRight'?1:-1));}});
  reduced.addEventListener('change',e=>{paused=e.matches;updatePause();});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:0.15}).observe(book);
  setInterval(()=>{if(!paused&&visible&&!document.hidden&&!document.querySelector('.lightbox').open)showSpread(current+1);},8000);
  updatePause();
  const dialog=document.querySelector('.lightbox');
  let opener;
  function openImage(src,alt,origin) {
    opener=origin;dialog.querySelector('img').src=src;dialog.querySelector('img').alt=alt;
    dialog.showModal();document.body.classList.add('modal-open');
  }
  document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>openImage(button.dataset.page,button.dataset.pageAlt,button)));
  document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click',() => {const s=samples[button.dataset.preview];openImage(s.image,s.alt,button);}));
  dialog.querySelector('.dialog-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',e => { if(e.target===dialog) dialog.close(); });
  dialog.addEventListener('close',() => {document.body.classList.remove('modal-open');opener?.focus();});
  // Publica apenas depoimentos reais cadastrados no arquivo de configuração.
  const testimonials=(config.testimonials || []).filter(item=>typeof item.name==='string' && item.name.trim() && typeof item.text==='string' && item.text.trim());
  if(testimonials.length){
    const list=document.querySelector('#testimonials-list');
    testimonials.forEach(item=>{
      const card=document.createElement('figure');card.className='testimonial-card';
      const quote=document.createElement('blockquote');quote.textContent=item.text;
      const author=document.createElement('figcaption');author.textContent=item.name;
      const stars=document.createElement('div');stars.className='testimonial-stars';stars.setAttribute('role','img');stars.setAttribute('aria-label','5 de 5 estrelas');stars.textContent='★★★★★';
      card.append(stars,quote,author);list.append(card);
    });
    document.querySelector('#depoimentos').hidden=false;
  }
  const bar=document.querySelector('.mobile-offer');
  const offer=document.querySelector('#oferta');
  const hero=document.querySelector('.hero');
  function updateBar() {
    const r=offer.getBoundingClientRect();
    bar.hidden=!(hero.getBoundingClientRect().bottom<0 && !(r.top<innerHeight && r.bottom>0));
  }
  addEventListener('scroll',updateBar,{passive:true});addEventListener('resize',updateBar);addEventListener('load',updateBar);
  updateBar();
})();
