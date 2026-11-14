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
    const euro=new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:2,maximumFractionDigits:2}).format(p.price.amount);
    const facts=[
      {label:"Prix et disponibilité",value:euro,note:p.price.merchant+" · "+p.price.status+" · relevé du "+p.price.date.split("-").reverse().join("/")},
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
    const priceSection=document.querySelector("#cout .panel");
    if(priceSection && !priceSection.querySelector(".releve-factuel")){
      const note=document.createElement("p");
      note.className="releve-factuel";
      const intro=document.createElement("strong");
      intro.textContent="Relevé de prix commun au comparatif : ";
      note.appendChild(intro);
      note.appendChild(document.createTextNode(euro+" · "+p.price.merchant+" · "+p.price.status+" (au "+p.price.date.split("-").reverse().join("/")+") · "));
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
