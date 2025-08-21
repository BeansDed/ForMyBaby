// Heart counter on index
const heart = document.getElementById('heart');
const counter = document.getElementById('counter');
if (heart && counter) {
  let count = 0;
  heart.addEventListener('click', () => {
    count++;
    heart.classList.add('clicked');
    setTimeout(() => heart.classList.remove('clicked'), 180);
    counter.textContent = `${count} ${count === 1 ? 'tap' : 'taps'}`;
  });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal-on-scroll');
function onScroll() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', onScroll);
onScroll();

// Letter typewriter
const typewrap = document.getElementById('typewrap');
if (typewrap) {
  const text = `Hi love,

I made this small corner of the internet just for you.
When days feel heavy, I want you to open this and remember:
you are cherished, you are seen, and you are more than enough.

Always,
me`;
  const holder = document.getElementById('typeText');
  let i = 0;
  (function typeit(){
    if (i <= text.length) {
      holder.textContent = text.slice(0, i++);
      setTimeout(typeit, 28);
    }
  })();
}

// Memories lightbox
const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
if (gallery && lightbox && lightboxImg) {
  gallery.addEventListener('click', (e) => {
    const t = e.target;
    if (t.tagName === 'IMG') {
      lightboxImg.src = t.src;
      lightbox.classList.add('open');
    }
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
}

// === Dates (dynamic, saved in localStorage) ===
(() => {
  const KEY = 'dateIdeas.v1';
  const form = document.getElementById('dateForm');
  const input = document.getElementById('dateInput');
  const list = document.getElementById('dateList');
  const clearBtn = document.getElementById('clearDates');
  if (!form || !input || !list) return;

  const defaults = [
    { id: Date.now()-4, text: 'Sunset picnic + playlist', done: false },
    { id: Date.now()-3, text: 'Coffee + bookshop stroll', done: false },
    { id: Date.now()-2, text: 'DIY pizza night', done: false },
    { id: Date.now()-1, text: 'Night walk + ice cream', done: false }
  ];

  function loadIdeas(){
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        localStorage.setItem(KEY, JSON.stringify(defaults));
        return [...defaults];
      }
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) throw new Error('not array');
      return arr;
    } catch(e){
      console.warn('Resetting saved ideas due to parse error:', e);
      localStorage.setItem(KEY, JSON.stringify(defaults));
      return [...defaults];
    }
  }
  function saveIdeas(items){ localStorage.setItem(KEY, JSON.stringify(items)); }

  let ideas = loadIdeas();

  function escapeHtml(str){
    return str.replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[c]);
  }

  function render(){
    list.innerHTML = '';
    if (ideas.length === 0){
      const li = document.createElement('li');
      li.className = 'dates-empty';
      li.textContent = 'No ideas yet—add your first one above!';
      list.appendChild(li);
      return;
    }
    ideas.forEach(item => {
      const li = document.createElement('li');
      li.className = 'dates-item' + (item.done ? ' done' : '');
      li.innerHTML = `
        <label class="dates-left">
          <input type="checkbox" class="dates-check" ${item.done ? 'checked' : ''} data-id="${item.id}" />
          <span class="dates-text">${escapeHtml(item.text)}</span>
        </label>
        <div class="dates-right">
          <button class="dates-edit" data-id="${item.id}" aria-label="Edit">✎</button>
          <button class="dates-delete" data-id="${item.id}" aria-label="Delete">✕</button>
        </div>
      `;
      list.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    ideas.unshift({ id: Date.now(), text, done: false });
    saveIdeas(ideas);
    input.value = '';
    render();
  });

  list.addEventListener('click', (e) => {
    const del = e.target.closest('.dates-delete');
    const edit = e.target.closest('.dates-edit');
    const checkbox = e.target.closest('.dates-check');

    if (del){
      const id = +del.dataset.id;
      ideas = ideas.filter(i => i.id !== id);
      saveIdeas(ideas); render(); return;
    }
    if (edit){
      const id = +edit.dataset.id;
      const item = ideas.find(i => i.id === id);
      if (!item) return;
      const next = prompt('Edit this idea:', item.text);
      if (next !== null){
        const txt = next.trim();
        if (txt){ item.text = txt; saveIdeas(ideas); render(); }
      }
      return;
    }
    if (checkbox){
      const id = +checkbox.dataset.id;
      const item = ideas.find(i => i.id === id);
      if (!item) return;
      item.done = checkbox.checked;
      saveIdeas(ideas); render(); return;
    }
  });

  if (clearBtn){
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all saved date ideas?')){
        ideas = []; saveIdeas(ideas); render();
      }
    });
  }

  render();
})();
