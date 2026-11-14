"use strict";
/* Synchronise les quatre faits essentiels des fiches avec aspirateurs.json.
   Le texte détaillé reste une analyse éditoriale datée et sourcée. */
(async function(){
  const id=document.body.getAttribute("data-model");
  if(!id)return;
  try{
    const res=await fetch("./aspirateurs.json",{cache:"no-store"});
    if(!res.ok)throw new Error("HTTP "+res.status);
    const payload=await res.json();
    const p=payload.models.find(model=>model.id===id);
    if(!p)throw new Error("Modèle absent du référentiel");
    // Photo authentique du modèle, dans le bloc auparavant illustré par un SVG.
    if(p.image?.src){
      const headline=document.querySelector(".headline");
      if(headline){
        let frame=headline.querySelector(".device");
        if(!frame){
          frame=document.createElement("div");
          frame.className="device";
          headline.appendChild(frame);
        }
        frame.classList.add("product-photo-device");
        frame.removeAttribute("role");
        frame.removeAttribute("aria-label");
        frame.replaceChildren();
        const img=document.createElement("img");
        img.src=p.image.src;
        img.alt="Photo du "+p.brand+" "+p.model;
        img.loading="eager";
        img.decoding="async";
        img.addEventListener("error",()=>{frame.style.display="none";});
        frame.appendChild(img);
        if(!document.getElementById("real-product-photo-style")){
          const styles=document.createElement("style");
          styles.id="real-product-photo-style";
          styles.textContent='.device.product-photo-device{background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:7px;flex:0 0 176px;width:176px;height:210px}.product-photo-device img{display:block;width:100%;height:100%;object-fit:contain}@media(max-width:620px){.headline{flex-direction:column-reverse;align-items:stretch}.device.product-photo-device{display:flex;width:100%;height:210px;flex:none;padding:8px;margin-bottom:10px}}';
          document.head.appendChild(styles);
        }
      }
    }

    const readableStatus=status=>/^(Disponible au relevé|En stock au relevé)$/i.test(String(status||"").trim())?"":String(status||"").trim();
    const euro=new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:2}).format(p.price.amount);
    const facts=[
      {label:"Prix et disponibilité",value:euro,note:p.price.merchant+(readableStatus(p.price.status)?" · "+readableStatus(p.price.status):"")+" · relevé du "+p.price.date.split("-").reverse().join("/")},
      {label:"Poids prêt à aspirer",value:p.weight.floor.value,note:p.weight.floor.kind+" · "+p.weight.floor.note},
      {label:"Aspiration maximale",value:p.suction.max+" AW",note:p.suction.note+" · "+p.suction.modes},
      {label:"Autonomie · "+p.autonomy.mode,value:p.autonomy.display,note:p.autonomy.kind+" · "+p.autonomy.note}
    ];
    const cards=[...document.querySelectorAll(".grid4 .stat")].slice(0,4);
    if(cards.length!==4)return;
    cards.forEach((card,i)=>{
      const f=facts[i],label=card.querySelector(".label"),value=card.querySelector("strong"),note=card.querySelector("small");
      if(label)label.textContent=f.label;
      if(value)value.textContent=f.value;
      if(note)note.textContent=f.note;
    });

    // Les prix et remises sont relus depuis le même JSON que le tableau d'accueil.
    const costSection=document.querySelector("#cout");
    if(costSection && p.offers && p.offers.length===5 && !document.getElementById("prix-offres")){
      const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
      const money=n=>new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:2}).format(n);
      const labels={fabricant:"Fabricant",amazon:"Amazon",boulanger:"Boulanger",fnac:"Fnac",darty:"Darty"};
      const markup=p.offers.map(o=>{
        const percent=o.price!==null&&o.was!==null&&o.was>o.price?Math.round(100*(1-o.price/o.was)):null;
        const priced=o.price!==null?'<strong class="merchant-value">'+esc(money(o.price))+'</strong>':'<strong class="merchant-unknown">Non vérifié</strong>';
        const discount=percent===null?"":'<span class="merchant-discount"><s>'+esc(money(o.was))+'</s> −'+percent+' % · économie '+esc(money(o.was-o.price))+'</span>';
        const state=o.source==="third_party"?"Relevé indirect du "+o.date.split("-").reverse().join("/"):readableStatus(o.status);
        const href=o.url?'<a href="'+esc(o.url)+'" target="_blank" rel="noopener noreferrer">'+(o.source==="third_party"?"Voir le relevé tiers ↗":o.store==="amazon"&&o.source==="unverified"?"Rechercher sur Amazon ↗":"Voir l'offre ↗")+'</a>':"";
        return '<article class="merchant-card"><h3>'+esc(labels[o.store])+'</h3>'+priced+discount
          +'<span class="merchant-state">'+esc(state)+'</span>'
          +(o.note?'<p>'+esc(o.note)+'</p>':"")+href+'</article>';
      }).join("");
      const section=document.createElement("section");
      section.id="prix-offres";
      section.setAttribute("aria-labelledby","prix-offres-title");
      section.innerHTML='<div class="section-head"><h2 id="prix-offres-title">Prix par enseigne</h2><span class="section-note">Relevé du 14 novembre 2026</span></div>'
        +'<p class="offres-explain">Cinq enseignes recherchées pour cette référence : les remises sont calculées par rapport au prix barré du même vendeur. Les relevés tiers Amazon sont anciens et les offres sans prix ne sont pas considérées comme disponibles.</p>'
        +'<div class="merchants-grid">'+markup+'</div>'
        +'<p class="offres-explain"><a href="./#prix-'+esc(p.id)+'">Voir également le tableau des 9 modèles ↗</a> · Les prix peuvent évoluer et ne sont pas actualisés en continu.</p>';
      costSection.before(section);
      if(!document.getElementById("style-prix-offres")){
        const style=document.createElement("style");
        style.id="style-prix-offres";
        style.textContent='.offres-explain{color:#475f64;font-size:13px;line-height:1.65;margin:8px 0 14px}'
          +'.merchants-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}'
          +'.merchant-card{background:#fff;border:1px solid #dce7e2;border-radius:14px;padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:7px;min-width:0}'
          +'.merchant-card h3{font-size:14px;color:#234d51;margin:0 0 2px}'
          +'.merchant-card .merchant-value{font-size:23px;color:#163e42;letter-spacing:-.04em}'
          +'.merchant-unknown{font-size:14px;color:#556e70}'
          +'.merchant-discount{font-size:12px;font-weight:700;color:#28675d;line-height:1.5}'
          +'.merchant-discount s{color:#63787a;font-weight:400}'
          +'.merchant-state{font-size:12px;color:#4b6669}'
          +'.merchant-card p{font-size:12px;color:#51696d;line-height:1.5;margin:0}'
          +'.merchant-card a{font-size:12px;font-weight:750;text-decoration:underline;text-underline-offset:3px;margin-top:auto}'
          +'@media(max-width:850px){.merchants-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}'
          +'@media(max-width:520px){.merchants-grid{grid-template-columns:1fr}}';
        document.head.appendChild(style);
      }
    }

    const priceSection=document.querySelector("#cout .panel");
    if(priceSection && !priceSection.querySelector(".releve-factuel")){
      const note=document.createElement("p");
      note.className="releve-factuel";
      const intro=document.createElement("strong");
      intro.textContent="Relevé de prix commun au comparatif : ";
      note.appendChild(intro);
      note.appendChild(document.createTextNode(euro+" · "+p.price.merchant+(readableStatus(p.price.status)?" · "+readableStatus(p.price.status):"")+" (au "+p.price.date.split("-").reverse().join("/")+") · "));
      const source=document.createElement("a");
      source.href=p.price.url;
      source.target="_blank";
      source.rel="noopener noreferrer";
      source.textContent="Vérifier ce prix sur le site marchand";
      note.appendChild(source);
      priceSection.prepend(note);
    }
  }catch(error){console.warn("Données communes indisponibles ; valeurs éditoriales conservées",error);}
})();
