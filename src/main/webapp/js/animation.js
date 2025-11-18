
/* animation.js - enhanced 3D folding heart + interaction that shows "I MISS U" on click/touch */
(function() {
  const bg = document.getElementById('bg-hearts');
  const sparkles = document.getElementById('sparkles');
  const bigHeart = document.getElementById('big-heart');
  const missu = document.getElementById('missu');
  const stage = document.getElementById('stage');

  // create background hearts
  const HEART_COUNT = 36;
  for (let i = 0; i < HEART_COUNT; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    const size = Math.floor(Math.random() * 32) + 12;
    h.style.width = size + 'px';
    h.style.height = (size - 2) + 'px';
    const left = Math.random() * 120 - 10;
    h.style.left = left + 'vw';
    h.style.top = (70 + Math.random() * 40) + 'vh';
    const dur = (7 + Math.random() * 14).toFixed(2) + 's';
    h.style.animationDuration = dur;
    h.style.animationDelay = (-Math.random() * 24).toFixed(2) + 's';
    const hue = 330 + Math.floor(Math.random() * 24) - 12;
    h.style.background = 'linear-gradient(180deg, hsl(' + hue + ' 100% 86%) 0%, hsl(' + hue + ' 100% 52%) 100%)';
    bg.appendChild(h);
  }

  // tiny sparkles
  const SPARKLE_COUNT = 48;
  for (let i = 0; i < SPARKLE_COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (Math.random() * 100) + '%';
    s.style.top = (Math.random() * 100) + '%';
    s.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
    s.style.animationDuration = (2 + Math.random() * 4).toFixed(2) + 's';
    s.style.opacity = (0.2 + Math.random() * 0.9).toFixed(2);
    sparkles.appendChild(s);
  }

  // big heart visual initial fold animation (once)
  function startFold() {
    bigHeart.style.transition = 'transform 900ms cubic-bezier(.2,.9,.3,1)';
    bigHeart.style.transform = 'rotateY(12deg) rotateX(6deg) rotate(-45deg) translateZ(6px)';
    setTimeout(()=>{
      bigHeart.style.transform = 'rotate(-45deg)';
      bigHeart.style.transition = '';
    }, 900);
  }
  setTimeout(startFold, 200);

  // click/touch shows "I MISS U"
  function showMissU() {
    if (!missu) return;
    missu.classList.add('show');
    // play a quick pulse on big heart
    bigHeart.animate([
      { transform: 'scale(1) rotate(-45deg)' },
      { transform: 'scale(1.08) rotate(-45deg)' },
      { transform: 'scale(1) rotate(-45deg)' }
    ], { duration: 520, easing: 'cubic-bezier(.2,.9,.3,1)' });
    // hide after 2.3s
    clearTimeout(bigHeart._missuTimeout);
    bigHeart._missuTimeout = setTimeout(()=> missu.classList.remove('show'), 2300);
  }

  bigHeart.addEventListener('click', showMissU);
  bigHeart.addEventListener('touchstart', function(e){ e.preventDefault(); showMissU(); }, {passive:false});

  // subtle interactive tilt based on pointer movement around big heart
  (function addTilt(){
    let rect, cx, cy;
    function onMove(e){
      if (!rect) { rect = bigHeart.getBoundingClientRect(); cx = rect.left + rect.width/2; cy = rect.top + rect.height/2; }
      const x = (e.clientX - cx) / rect.width;
      const y = (e.clientY - cy) / rect.height;
      const rx = (y * 8);
      const ry = (-x * 12);
      // apply to layers for more depth
      bigHeart.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg) rotate(-45deg)`;
      // add pulsing fold when close to center
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < rect.width * 0.6) {
        bigHeart.style.animation = 'none';
      } else {
        bigHeart.style.animation = 'breathe 6s ease-in-out infinite';
      }
    }
    function onLeave(){ bigHeart.style.transform = 'rotate(-45deg)'; bigHeart.style.animation = 'breathe 6s ease-in-out infinite'; rect = null; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', function(ev){ if(ev.touches && ev.touches[0]) onMove(ev.touches[0]); }, {passive:true});
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onLeave);
  })();

  // accessibility: reduce motion if user prefers reduced motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq && mq.matches) {
    document.querySelectorAll('.bg-hearts .heart, .sparkles .sparkle').forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = '0.85';
    });
    bigHeart.style.animation = 'none';
  }

  // basic FPS guard to hide some background hearts on low fps
  let frames = 0, last = performance.now();
  function fpsTick(){
    frames++;
    const now = performance.now();
    if (now - last >= 1000) {
      const fps = frames * 1000 / (now - last);
      frames = 0; last = now;
      if (fps < 25) {
        const hearts = document.querySelectorAll('.bg-hearts .heart');
        for (let i = 0; i < hearts.length/3; i++) hearts[i].style.display = 'none';
      }
    }
    requestAnimationFrame(fpsTick);
  }
  requestAnimationFrame(fpsTick);

})();
