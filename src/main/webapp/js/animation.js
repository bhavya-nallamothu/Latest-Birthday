
(function(){
  const bg = document.getElementById("bg-hearts");
  const big = document.getElementById("big-heart");
  const missu = document.getElementById("missu");

  /* Create dark green PERFECT heart shapes */
  for(let i=0;i<45;i++){
    const h=document.createElement("div");
    h.className="gheart";
    h.style.left=(Math.random()*100)+"vw";
    h.style.top=(100+Math.random()*40)+"vh";
    h.style.animationDuration=(6+Math.random()*10)+"s";
    bg.appendChild(h);
  }

  function show(){
    missu.classList.add("show");
    clearTimeout(big._t);
    big._t=setTimeout(()=>missu.classList.remove("show"),2500);
  }

  big.onclick=show;
  big.ontouchstart=function(e){e.preventDefault();show();}
})();
