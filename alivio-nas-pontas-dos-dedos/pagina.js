(() => {
  "use strict";
  const offer = window.OFERTA_ALIVIO || {};
  let checkout;
  try {
    const candidate = new URL(offer.hotmartUrl);
    if (candidate.protocol === "https:" && !candidate.username && !candidate.password &&
        (candidate.hostname === "hotmart.com" || candidate.hostname.endsWith(".hotmart.com"))) checkout = candidate;
  } catch { /* Oferta não cadastrada: preservar o estado de vendas em breve. */ }
  if (checkout) {
    // Preserve parâmetros de atribuição permitidos sem encaminhar dados arbitrários da URL.
    const query = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src", "sck"]) {
      const value = query.get(key);
      if (value && !checkout.searchParams.has(key)) checkout.searchParams.set(key, value.slice(0, 500));
    }
    const link = document.createElement("a");
    link.className = "button checkout-button";
    link.href = checkout.href;
    link.dataset.hotmartCheckout = "";
    link.textContent = "Quero meu ebook e os bônus ↗";
    link.addEventListener("click", () => {
      window.medicaoAlivio?.event("InitiateCheckout");
    });
    document.querySelector("[data-checkout-slot]").replaceChildren(link);
    document.querySelector("[data-availability]").textContent = "Ebook + 2 bônus";
    document.querySelector("[data-checkout-note]").textContent = "Checkout seguro · Acesso digital pela Hotmart";
    if ([7,15,21,30].includes(offer.garantiaDias)) {
      const guarantee = document.querySelector("[data-guarantee]");
      guarantee.textContent = `Garantia de ${offer.garantiaDias} dias`;
      guarantee.hidden = false;
    }
    if (typeof offer.precoEmReais === "number" && Number.isFinite(offer.precoEmReais) && offer.precoEmReais > 0) {
      const price = document.querySelector("[data-price]");
      price.textContent = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(offer.precoEmReais);
      price.hidden = false;
      document.querySelectorAll("[data-hero-price]").forEach(item => { item.textContent = price.textContent; });
    }
  }

  document.querySelectorAll('a[href="#oferta"]').forEach(link => link.addEventListener("click", () => window.medicaoAlivio?.event("CtaClick")));
  document.querySelector("[data-interest-link]")?.addEventListener("click", () => window.medicaoAlivio?.event("InterestContactClick"));

  const samples = [{"src": "assets/pagina-16-grande.webp", "title": "Página 16 · Yintang", "alt": "Página ampliada do ebook: Yintang, com instruções e cuidados."}, {"src": "assets/pagina-17-grande.webp", "title": "Página 17 · Relaxamento e sono", "alt": "Página ampliada do ebook: Relaxamento e sono, com instruções e cuidados."}, {"src": "assets/pagina-18-grande.webp", "title": "Página 18 · Cansaço e disposição", "alt": "Página ampliada do ebook: Cansaço e disposição, com instruções e cuidados."}, {"src": "assets/pagina-19-grande.webp", "title": "Página 19 · Hegu", "alt": "Página ampliada do ebook: Hegu, com instruções e cuidados."}, {"src": "assets/pagina-43-grande.webp", "title": "Página 43 · Mapa de Sanyinjiao", "alt": "Página ampliada do ebook: Mapa de Sanyinjiao, com instruções e cuidados."}, {"src": "assets/pagina-44-grande.webp", "title": "Página 44 · Mapa de Zusanli", "alt": "Página ampliada do ebook: Mapa de Zusanli, com instruções e cuidados."}];
  const dialog = document.querySelector(".lightbox");
  let selected = 0;
  let opener;
  function renderSample(index) {
    selected = Math.max(0, Math.min(samples.length - 1, index));
    const sample = samples[selected];
    const img = dialog.querySelector("img");
    img.src = sample.src;
    img.alt = sample.alt;
    document.getElementById("preview-title").textContent = sample.title;
    dialog.querySelector("[data-preview-count]").textContent = `${selected + 1} de ${samples.length}`;
    dialog.querySelector('[data-direction="-1"]').disabled = selected === 0;
    dialog.querySelector('[data-direction="1"]').disabled = selected === samples.length - 1;
    dialog.querySelector(".lightbox-scroll").scrollTop = 0;
  }
  document.querySelectorAll("[data-sample]").forEach(button => button.addEventListener("click", () => {
    window.medicaoAlivio?.event("ViewContent");
    opener = button;
    renderSample(Number(button.dataset.sample));
    dialog.showModal();
    document.body.classList.add("dialog-open");
  }));
  dialog.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    opener?.focus({ preventScroll: true });
  });
  dialog.querySelectorAll("[data-direction]").forEach(button => button.addEventListener("click", () => renderSample(selected + Number(button.dataset.direction))));
  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      renderSample(selected + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  // Evita que o botão fixo duplique ou cubra a oferta quando ela está visível.
  if ("IntersectionObserver" in window) {
    const mobileBuy = document.querySelector(".mobile-buy");
    let offerSeen = false;
    new IntersectionObserver(entries => {
      mobileBuy.hidden = entries[0].isIntersecting;
      if (entries[0].isIntersecting && !offerSeen) { window.medicaoAlivio?.event("OfferView"); offerSeen = true; }
    }, { threshold: 0.08 }).observe(document.getElementById("oferta"));
  }
})();
