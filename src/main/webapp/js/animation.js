
/* Simple static animation and click handler. No servlet usage at runtime. */
(function(){
  const big = document.getElementById('big-heart');
  const missu = document.getElementById('missu');
  // simple click/touch handler to show message
  function show(){
    missu.classList.add('show');
    clearTimeout(big._t);
    big._t = setTimeout(()=>missu.classList.remove('show'),2300);
    // small pulse
    big.animate([{transform:'scale(1) rotate(-45deg)'},{transform:'scale(1.08) rotate(-45deg)'},{transform:'scale(1) rotate(-45deg)'}],{duration:520,easing:'ease-out'});
  }
  big.addEventListener('click', show);
  big.addEventListener('touchstart', function(e){ e.preventDefault(); show(); }, {passive:false});
})();
