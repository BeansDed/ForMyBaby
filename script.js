// Persistent love counter + small heart burst + scroll reveal + optional share + typewriter
let count = 0;

function updateCounterText() {
  const counter = document.getElementById('counter');
  if (!counter) return;
  counter.textContent = count + (count === 1 ? ' Love' : ' Loves');
}

function saveCount() {
  try { localStorage.setItem('loveCount', String(count)); } catch {}
}

function loadCount() {
  try {
    const stored = localStorage.getItem('loveCount');
    count = stored ? parseInt(stored, 10) : 0;
  } catch {
    count = 0;
  }
  updateCounterText();
}

function burstHearts(anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.textContent = '💖';
    span.style.position = 'fixed';
    span.style.left = (rect.left + rect.width/2 + (Math.random()-0.5)*80) + 'px';
    span.style.top = (rect.top + rect.height/2 + (Math.random()-0.5)*40) + 'px';
    span.style.fontSize = (14 + Math.random()*14) + 'px';
    span.style.opacity = '1';
    span.style.transition = 'transform .8s ease, opacity .9s ease';
    span.style.transform = 'translateY(0)';
    document.body.appendChild(span);
    requestAnimationFrame(() => {
      span.style.transform = `translateY(-${50 + Math.random()*60}px)`;
      span.style.opacity = '0';
    });
    setTimeout(() => span.remove(), 950);
  }
}

function incrementLove() {
  count++;
  updateCounterText();
  saveCount();
  const heart = document.getElementById('heartBtn') || document.querySelector('.heart');
  if (heart) {
    heart.classList.add('clicked');
    burstHearts(heart);
    setTimeout(() => heart.classList.remove('clicked'), 180);
  }
}

function setupHeart() {
  const heart = document.getElementById('heartBtn') || document.querySelector('.heart');
  if (!heart) return;
  heart.addEventListener('click', incrementLove);
  heart.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); incrementLove(); }
  });
}

function setupReveal() {
  const els = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

function setupShare() {
  const btn = document.getElementById('shareBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A little something for you 💌',
          text: 'Open this—made just for you.',
          url: location.href
        });
      } catch {}
    } else {
      alert('Copy this link and send it to her: ' + location.href);
    }
  });
}

// Lightbox for memories page
function setupLightbox() {
  const imgs = document.querySelectorAll('.gallery img');
  const lightbox = document.querySelector('.lightbox');
  const lbImg = lightbox ? lightbox.querySelector('img') : null;
  if (!imgs.length || !lightbox || !lbImg) return;

  imgs.forEach(img => img.addEventListener('click', () => {
    lbImg.src = img.src;
    lightbox.classList.add('open');
  }));
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
  });
}

// Typewriter (letter page)
function typewriter(el, speed = 22) {
  if (!el) return;
  const full = el.textContent;
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '│';
  el.appendChild(cursor);

  let i = 0;
  function tick() {
    if (i < full.length) {
      cursor.insertAdjacentText('beforebegin', full[i]);
      i++;
      setTimeout(tick, full[i-1] === '\n' ? speed*6 : speed);
    } else {
      cursor.remove();
    }
  }
  tick();
}

function setupTypewriter() {
  const tw = document.querySelector('.typewrap[data-typer="true"]');
  if (tw) typewriter(tw, 22);
}

document.addEventListener('DOMContentLoaded', () => {
  loadCount();
  setupHeart();
  setupReveal();
  setupShare();
  setupLightbox();
  setupTypewriter();
});
