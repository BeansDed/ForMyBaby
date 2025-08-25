// Typewriter helper (optional use)
function typeWriter(text, elementId, speed = 50) {
  let i = 0;
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = '';
  const interval = setInterval(() => {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// Cursor hearts (subtle)
(function () {
  const heartEmojis = ['❤','💖','💓','💞','💕'];
  let last = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - last < 35) return; // throttle
    last = now;
    const h = document.createElement('div');
    h.className = 'cursor-heart';
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = e.pageX + 'px';
    h.style.top = e.pageY + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1200);
  });
})();

// Add sparkles in hero
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const sparkles = document.createElement('div');
  sparkles.className = 'sparkles';
  sparkles.innerHTML = '<span class="sparkle">✧</span><span class="sparkle">✦</span><span class="sparkle">✧</span>';
  hero.appendChild(sparkles);
})();

// Heart confetti utility
function burstHeartsFrom(el){
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;
  const emojis = ['💗','💖','💞','💘','💕','🎀'];
  for (let i=0;i<14;i++){
    const s = document.createElement('span');
    s.className = 'confetti-heart';
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    const dx = (Math.random() * 160 - 80) + 'px';
    const dy = (-60 - Math.random()*140) + 'px';
    const rot = (Math.random() * 120 - 60) + 'deg';
    const dur = (1000 + Math.random()*800) + 'ms';
    s.style.left = cx + 'px';
    s.style.top = cy + 'px';
    s.style.setProperty('--dx', dx);
    s.style.setProperty('--dy', dy);
    s.style.setProperty('--rot', rot);
    s.style.setProperty('--dur', dur);
    s.style.fontSize = (16 + Math.random()*10) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1800);
  }
}

// Attach confetti to nav hearts
document.querySelectorAll('.heart').forEach(a => {
  a.addEventListener('mouseenter', () => burstHeartsFrom(a));
});

// Gift: surprise reveal
(function(){
  const btn = document.getElementById('surpriseBtn');
  const box = document.getElementById('surprise');
  if (!btn || !box) return;
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    box.classList.toggle('hidden');
    burstHeartsFrom(btn);
  });
})();

// Date Ideas w/ localStorage
(function(){
  const form = document.getElementById('dateForm');
  const input = document.getElementById('dateInput');
  const list = document.getElementById('dateList');
  const clearBtn = document.getElementById('clearDates');
  if (!form || !input || !list) return;

  const KEY = 'dateIdeas';
  let ideas = [];

  function save(){ localStorage.setItem(KEY, JSON.stringify(ideas)); }
  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      ideas = raw ? JSON.parse(raw) : [];
    }catch{ ideas = []; }
  }
  function render(){
    list.innerHTML = '';
    ideas.forEach((txt, idx) => {
      const li = document.createElement('li');
      li.className = 'dates-item';
      li.innerHTML = `
        <span class="txt">${txt}</span>
        <span class="actions">
          <button class="love-button small dates-edit" data-idx="${idx}">Edit</button>
          <button class="love-button small ghost dates-delete" data-idx="${idx}">Delete</button>
        </span>`;
      list.appendChild(li);
    });
  }

  // Init
  load(); render();

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const val = input.value.trim();
    if(!val) return;
    ideas.push(val);
    input.value='';
    save(); render();
    burstHeartsFrom(form.querySelector('button[type="submit"]') || form);
  });

  list.addEventListener('click', (e)=>{
    const t = e.target;
    if (t.matches('.dates-delete')){
      const i = Number(t.dataset.idx);
      ideas.splice(i,1);
      save(); render();
    } else if (t.matches('.dates-edit')){
      const i = Number(t.dataset.idx);
      const updated = prompt('Edit this idea:', ideas[i]);
      if (updated !== null){
        ideas[i] = updated.trim() || ideas[i];
        save(); render();
      }
    }
  });

  if (clearBtn){
    clearBtn.addEventListener('click', ()=>{
      if (ideas.length && confirm('Clear all ideas?')){
        ideas = [];
        save(); render();
      }
    });
  }
})();
