// ===== Coquette Interactive — JS =====

// Cursor Hearts
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

// Hover Sparkles on cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".heart-card, .celebration-card")
  cards.forEach((card) => card.addEventListener("mouseenter", () => createSparkles(card)))
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

// Celebration emoji rain
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

// Gift box interaction (exposed for inline onclick)
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

// Monthsary Counter — Together since 8/3/2025 → TODAY
;(function monthsaryCounter() {
  // JS months are 0-indexed → 7 = August
  const START_DATE = new Date(2025, 7, 3, 0, 0, 0) // Aug 3, 2025

  function fmt(d) {
    return d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
  }

  function tick() {
    const section = document.querySelector(".countdown-section")
    if (!section) return

    const now = new Date()
    const diff = Math.max(0, now - START_DATE)

    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)

    const daysEl = document.getElementById("days")
    const hoursEl = document.getElementById("hours")
    const minutesEl = document.getElementById("minutes")
    const secondsEl = document.getElementById("seconds")

    if (daysEl) daysEl.textContent = days
    if (hoursEl) hoursEl.textContent = hours
    if (minutesEl) minutesEl.textContent = minutes
    if (secondsEl) secondsEl.textContent = seconds

    const dateLine = document.getElementById("date-range")
    if (dateLine) dateLine.textContent = `Together since ${fmt(START_DATE)} — Today: ${fmt(now)}`
  }

  // Run if the section exists (works across pages too)
  if (document.querySelector(".countdown-section")) {
    tick()
    setInterval(tick, 1000)
  }
})()

// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href")
    if (!href || href === "#") return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  })
})

// Soft fade-in on load
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"
  requestAnimationFrame(() => {
    // next paint
    setTimeout(() => {
      document.body.style.opacity = "1"
    }, 100)
  })
})

const dailyMessages = [
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
]

function updateDailyMessage() {
  const messageEl = document.getElementById("daily-message")
  const textEl = document.querySelector(".daily-text")
  if (textEl) {
    const today = new Date().getDate()
    const message = dailyMessages[today % dailyMessages.length]
    textEl.textContent = message
  }
}

// Time-based greeting and share
function updateGreeting() {
  const el = document.getElementById('greeting');
  if (!el) return;
  const h = new Date().getHours();
  const part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  el.textContent = `${part}, My Love! 💕`;
}

async function sharePage() {
  const text = 'I made this little love website for you 💖';
  const url = window.location.origin;
  try {
    if (navigator.share) {
      await navigator.share({ title: 'For You ♡', text, url });
    } else {
      await navigator.clipboard.writeText(url);
      const btn = document.getElementById('share-btn');
      if (btn) {
        const prev = btn.textContent; btn.textContent = 'Link Copied ✅';
        setTimeout(() => (btn.textContent = prev), 1500);
      }
    }
  } catch {}
}

function animateLoveMeter() {
  const loveFill = document.getElementById("love-fill")
  if (loveFill) {
    setTimeout(() => {
      loveFill.style.width = "100%"
    }, 1000)
  }
}

let isPlaying = false
function toggleMusic() {
  const musicBtn = document.getElementById("music-toggle")
  const audio = document.getElementById("background-music")

  if (isPlaying) {
    audio.pause()
    musicBtn.textContent = "🎵"
    musicBtn.classList.remove("playing")
    isPlaying = false
  } else {
    audio.play().catch(() => {
      // Fallback if audio doesn't load
      console.log("Audio not available")
    })
    musicBtn.textContent = "🎶"
    musicBtn.classList.add("playing")
    isPlaying = true
  }
}

let loveCount = Number.parseInt(localStorage.getItem("loveCount") || "0")
function sendLove() {
  loveCount++
  localStorage.setItem("loveCount", loveCount.toString())
  document.getElementById("love-count").textContent = loveCount
  document.getElementById("love-count").style.animation = "none"
  setTimeout(() => {
    document.getElementById("love-count").style.animation = "countGlow 1s ease"
  }, 10)

  // Create love explosion
  createLoveExplosion()

  // Milestone confetti
  if ([10, 25, 50, 100].includes(loveCount)) {
    createConfetti()
  }
}

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
    0% {
      transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-100px) scale(0.5);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Quote animation function
function showQuoteAnimation(card) {
  card.classList.add('clicked');
  setTimeout(() => card.classList.remove('clicked'), 600);
  createSparkles(card);
  
  // Create floating hearts around the quote
  const hearts = ['💕', '💖', '💗', '💝'];
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = 'fixed';
      heart.style.left = card.getBoundingClientRect().left + Math.random() * card.offsetWidth + 'px';
      heart.style.top = card.getBoundingClientRect().top + 'px';
      heart.style.fontSize = '20px';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      heart.style.animation = 'floatUp 2s ease-out forwards';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }, i * 100);
  }
}

// Page transition effects
function initPageTransitions() {
  document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.includes('.html')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

// Enhanced localStorage management
const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

// Visit counter
function trackVisit() {
  const visits = Storage.get('visits', 0) + 1;
  Storage.set('visits', visits);
  Storage.set('lastVisit', new Date().toISOString());
  return visits;
}

// Confetti effect
function createConfetti() {
  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-20px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('💕 ServiceWorker registered:', registration.scope);

        // PWA update prompt
        function showUpdateToast() {
          const toast = document.createElement('div');
          toast.textContent = 'New version available — Refresh';
          toast.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#ecfeff;color:#0e7490;padding:10px 14px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.12);z-index:10000;cursor:pointer;';
          document.body.appendChild(toast);
          toast.onclick = () => location.reload();
          setTimeout(() => toast.remove(), 6000);
        }

        if (registration.waiting) {
          showUpdateToast();
        }
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateToast();
            }
          });
        });
      })
      .catch(err => {
        console.log('ServiceWorker registration failed:', err);
      });
  });
}

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // You can show a custom install button here if desired
  console.log('💕 PWA Install available');
});

// Dark Mode Toggle
function initDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Add celebration effect
      createSparkles(themeToggle);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
}

// Make functions globally available
window.showQuoteAnimation = showQuoteAnimation;
window.createConfetti = createConfetti;
window.initDarkMode = initDarkMode;

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode()
  updateDailyMessage()
  updateGreeting()
  animateLoveMeter()
  initSweetTooltips()
  createFloatingHearts()
  initPageTransitions()

  // Track visit
  const visitCount = trackVisit();
  console.log(`💕 Visit #${visitCount}`);

  // Update love count display
  const loveCountEl = document.getElementById("love-count");
  if (loveCountEl) {
    loveCountEl.textContent = loveCount;
  }

  // Add music toggle event
  const musicToggle = document.getElementById("music-toggle");
  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
  }

  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) shareBtn.addEventListener('click', sharePage);

  // Make sendLove globally available
  window.sendLove = sendLove

  const cards = document.querySelectorAll(".heart-card, .celebration-card")
  cards.forEach((card) => card.addEventListener("mouseenter", () => createSparkles(card)))
})

// Offline banner
window.addEventListener('online', () => {
  const b = document.getElementById('offline-banner');
  if (b) b.style.display = 'none';
});
window.addEventListener('offline', () => {
  const b = document.getElementById('offline-banner');
  if (b) b.style.display = 'block';
});
