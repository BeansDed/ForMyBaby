// ====== Enhanced script.js with optional MongoDB API integration ======
const API_BASE = localStorage.getItem("api_base") || "http://localhost:4000";

async function api(path, opts={}){
  try{
    const res = await fetch(API_BASE + path, { headers: { "Content-Type":"application/json" }, ...opts });
    if(!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  }catch(e){
    return null;
  }
}

// Try to detect API
let API_OK = false;
(async ()=>{
  const h = await api("/api/health");
  API_OK = !!(h && h.ok);
})();

// ===== Coquette Interactive — JS (unchanged effects) =====
document.addEventListener("mousemove", function createCursorHeart(e) {
  if (Math.random() > 0.85) {
    const heart = document.createElement("div")
    heart.className = "cursor-heart"
    heart.innerHTML = "♡"
    heart.style.left = e.clientX + "px"
    heart.style.top = e.clientY + "px"
    heart.style.color = `hsl(${330 + Math.random() * 30}, 70%, 60%)`
    heart.style.fontSize = 12 + Math.random() * 8 + "px"
    document.body.appendChild(heart)
    setTimeout(() => heart.remove(), 1200)
  }
})

function createSparkles(element) {
  const sparkles = ["✨", "⭐", "✧", "⋆", "✦"]
  const rect = element.getBoundingClientRect()
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const s = document.createElement("div")
      s.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)]
      s.style.position = "fixed"
      s.style.left = rect.left + Math.random() * rect.width + "px"
      s.style.top = rect.top + Math.random() * rect.height + "px"
      s.style.color = "#f472b6"
      s.style.fontSize = "1rem"
      s.style.pointerEvents = "none"
      s.style.zIndex = "1000"
      s.style.animation = "sparkleFloat 1s ease-out forwards"
      document.body.appendChild(s)
      setTimeout(() => s.remove(), 1000)
    }, i * 100)
  }
}

function createCelebration() {
  const emojis = ["🎉", "✨", "💕", "🎊", "⭐"]
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div")
      emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]
      emoji.style.position = "fixed"
      emoji.style.left = Math.random() * window.innerWidth + "px"
      emoji.style.top = "-20px"
      emoji.style.fontSize = 20 + Math.random() * 20 + "px"
      emoji.style.pointerEvents = "none"
      emoji.style.zIndex = "9999"
      emoji.style.animation = "fall 3s linear forwards"
      document.body.appendChild(emoji)
      setTimeout(() => emoji.remove(), 3000)
    }, i * 100)
  }
}

function openGift() {
  const lid = document.querySelector(".gift-lid")
  const msg = document.querySelector(".gift-message")
  if (lid && msg) {
    lid.classList.add("open")
    setTimeout(() => msg.classList.add("show"), 500)
    createCelebration()
  }
}
window.openGift = openGift

// ===== Dynamic data helpers =====
const fallbackDailyMessages = [
  "You make every day feel like a fairytale ✨",
  "Your smile is the sunshine that brightens my world 🌞",
  "I fall in love with you more every single day 💕",
  "You're the sweetest dream that came true 🌙",
  "My heart skips a beat every time I think of you 💓",
  "You're my favorite hello and hardest goodbye 🥰",
  "With you, every moment is a beautiful memory 📸",
  "You're the missing piece that completes my heart 🧩",
  "Your love is the melody that plays in my soul 🎵",
  "You're not just my love, you're my best friend too 👫",
];

async function loadDailyMessage(){
  const el = document.querySelector(".daily-text");
  if(!el) return;
  const res = await api("/api/daily-message");
  if(res && res.message){ el.textContent = res.message; }
  else {
    const today = new Date().getDate()
    el.textContent = fallbackDailyMessages[today % fallbackDailyMessages.length]
  }
}

function animateLoveMeter() {
  const loveFill = document.getElementById("love-fill")
  if (loveFill) setTimeout(() => { loveFill.style.width = "100%" }, 1000)
}

let isPlaying = false
function toggleMusic() {
  const musicBtn = document.getElementById("music-toggle")
  const audio = document.getElementById("background-music")
  if (isPlaying) { audio.pause(); musicBtn.textContent = "🎵"; musicBtn.classList.remove("playing"); isPlaying = false; }
  else { audio.play().catch(()=>{}); musicBtn.textContent = "🎶"; musicBtn.classList.add("playing"); isPlaying = true; }
}

async function refreshLoveCountUI(v){
  const el = document.getElementById("love-count");
  if(el){
    el.textContent = String(v);
    el.style.animation = "none";
    setTimeout(()=> el.style.animation = "countGlow 1s ease", 10);
  }
}

async function sendLove() {
  // Prefer API; fallback to localStorage
  const res = await api("/api/love", { method: "POST" });
  if(res && typeof res.count === "number"){
    refreshLoveCountUI(res.count);
  } else {
    let c = Number.parseInt(localStorage.getItem("loveCount") || "0") + 1;
    localStorage.setItem("loveCount", String(c));
    refreshLoveCountUI(c);
  }
  createLoveExplosion();
}
window.sendLove = sendLove;

function createLoveExplosion() {
  const hearts = ["💕", "💖", "💗", "💓", "💝"]
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const heart = document.createElement("div")
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)]
      heart.style.position = "fixed"
      heart.style.left = "50%"
      heart.style.top = "50%"
      heart.style.transform = "translate(-50%, -50%)"
      heart.style.fontSize = "24px"
      heart.style.pointerEvents = "none"
      heart.style.zIndex = "9999"
      heart.style.animation = `loveExplosion 2s ease-out forwards`
      heart.style.setProperty("--angle", Math.random() * 360 + "deg")
      document.body.appendChild(heart)
      setTimeout(() => heart.remove(), 2000)
    }, i * 50)
  }
}

function initSweetTooltips() {
  const tooltip = document.getElementById("sweet-tooltip")
  const cards = document.querySelectorAll("[data-sweet-message]")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", (e) => {
      const message = card.getAttribute("data-sweet-message")
      tooltip.textContent = message
      tooltip.classList.add("show")
    })
    card.addEventListener("mousemove", (e) => {
      tooltip.style.left = e.clientX + 10 + "px"
      tooltip.style.top = e.clientY - 30 + "px"
    })
    card.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show")
    })
  })
}

function createFloatingHearts() {
  const container = document.querySelector(".floating-hearts")
  if (!container) return
  setInterval(() => {
    if (Math.random() > 0.7) {
      const heart = document.createElement("div")
      heart.className = "floating-heart"
      heart.innerHTML = ["♡", "♥", "💕", "💖"][Math.floor(Math.random() * 4)]
      heart.style.left = Math.random() * 100 + "%"
      heart.style.animationDuration = 8 + Math.random() * 4 + "s"
      heart.style.fontSize = 16 + Math.random() * 8 + "px"
      container.appendChild(heart)
      setTimeout(() => heart.remove(), 12000)
    }
  }, 3000)
}

const style = document.createElement("style")
style.textContent = `
  @keyframes loveExplosion {
    0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-100px) scale(0.5); opacity: 0; }
  }`
document.head.appendChild(style)

async function initLoveCount(){
  const res = await api("/api/love");
  if(res && typeof res.count === "number"){
    refreshLoveCountUI(res.count);
  } else {
    const c = Number.parseInt(localStorage.getItem("loveCount") || "0");
    refreshLoveCountUI(c);
  }
}

async function loadPlaylistIntoIframe(){
  const embedEl = document.getElementById("embed");
  const input = document.getElementById("playlistUrl");
  const useBtn = document.getElementById("usePlaylist");
  if(!embedEl) return;
  function setEmbedById(id){
    const src = `https://open.spotify.com/embed/playlist/${id}?utm_source=generator`;
    embedEl.innerHTML = `<iframe allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src="${src}"></iframe>`;
  }
  // Try API for saved playlist
  const s = await api("/api/settings/playlistId");
  const id = s && s.value ? s.value : "1qXCs2ifAVOtZAMDdwoD60";
  setEmbedById(id);

  function playlistIdFromUrl(u){
    try{
      const url=new URL(u);
      const p=url.pathname.split("/").filter(Boolean);
      const i=p.indexOf("playlist");
      return i>=0? p[i+1] : null;
    }catch{ return null; }
  }
  if(useBtn && input){
    useBtn.addEventListener("click", async ()=>{
      const pid = playlistIdFromUrl(input.value.trim());
      if(!pid){ alert("Please paste a valid Spotify playlist link."); return; }
      setEmbedById(pid);
      await api("/api/settings/playlistId", { method:"PUT", body: JSON.stringify({ value: pid }) });
    });
  }
}

// Monthsary counter pulls start date from API when available
async function initMonthsary(){
  const section = document.querySelector(".countdown-section");
  if(!section) return;
  let start = "2025-08-03";
  const r = await api("/api/start-date");
  if(r && r.startDate) start = r.startDate;
  const START_DATE = new Date(start + "T00:00:00");

  function fmt(d){ return d.toLocaleDateString("en-US",{ month:"numeric", day:"numeric", year:"numeric" }) }
  function tick(){
    const now = new Date();
    const diff = Math.max(0, now - START_DATE);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const set = (id,v)=>{ const el = document.getElementById(id); if(el) el.textContent = v; }
    set("days",days); set("hours",hours); set("minutes",minutes); set("seconds",seconds);
    const dateLine = document.getElementById("date-range");
    if(dateLine) dateLine.textContent = `Together since ${fmt(START_DATE)} — Today: ${fmt(now)}`;
  }
  tick(); setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  // hover sparkles on cards
  document.querySelectorAll(".heart-card, .celebration-card")
    .forEach((card) => card.addEventListener("mouseenter", () => createSparkles(card)));

  await loadDailyMessage();
  animateLoveMeter();
  initSweetTooltips();
  createFloatingHearts();
  document.getElementById("music-toggle")?.addEventListener("click", toggleMusic);

  await initLoveCount();
  await initMonthsary();
  await loadPlaylistIntoIframe();
});
