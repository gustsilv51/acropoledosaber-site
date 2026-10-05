// Insira os links específicos deste produto quando estiverem disponíveis.
const CHECKOUTS = { completo: "https://pay.hotmart.com/Y107905503W", basico: "https://pay.hotmart.com/E107905350L" };
for (const [plano,url] of Object.entries(CHECKOUTS)) {
 if (!url) continue;
 const link=new URL(url); if(link.protocol!=="https:") continue;
 const slot=document.getElementById("checkout-"+plano),button=document.createElement("a");
 button.className="button";button.href=link.href;button.textContent=plano==="completo"?"Quero o plano completo!":"Quero o plano básico";
 slot.className="";slot.replaceChildren(button);
}
