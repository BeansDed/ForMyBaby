// ============================================
// LIVING LOVE LETTER - Dynamic Content System
// ============================================

// --- Configuration ---
const CONFIG = {
    // Google Sheets CSV URL (published as CSV)
    GOOGLE_SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/1eAMf3tWBjxKH3UcbJWClbyaOm6s_oHdak9FfzhdYvdc/export?format=csv',
    RELATIONSHIP_START_DATE: '2025-08-03T00:00:00',
    HEARTS_TO_CATCH: 10,
    FALLBACK_MESSAGE: "I'm writing something special for you... Check back tomorrow, my love. 💕"
};

// --- State Management ---
const AppState = {
    todayContent: null,
    allMemories: [],
    isUnlocked: false,
    heartsCaught: 0,
    minigameActive: false,
    minigameInterval: null,
    currentView: 'home'
};

// --- Fallback Data ---
const fallbackMessages = [
    "You look like a dream today.",
    "I love your laugh more than anything.",
    "Every moment with you is a treasure.",
    "You are my favorite notification.",
    "My heart beats faster when you're near.",
    "You make the world a softer place.",
    "I adore the way you think.",
    "Your smile is my sunshine.",
    "Loving you is the easiest thing I've ever done.",
    "Don't forget to drink water, princess.",
    "I'm so proud of you.",
    "You are my favorite thought."
];

const bucketListItems = [
    { id: 1, text: "Bake a cake together" },
    { id: 2, text: "Travel to Paris" },
    { id: 3, text: "Have a picnic in the park" },
    { id: 4, text: "Watch the sunrise on a beach" },
    { id: 5, text: "Build a blanket fort" },
    { id: 6, text: "Go stargazing" },
    { id: 7, text: "Learn a new dance together" },
    { id: 8, text: "Write love letters to each other" },
    { id: 9, text: "Go to a drive-in movie" },
    { id: 10, text: "Visit an art museum" }
];

// ============================================
// GOOGLE SHEETS INTEGRATION
// ============================================

async function fetchGoogleSheetData() {
    try {
        const response = await fetch(CONFIG.GOOGLE_SHEET_CSV_URL);
        if (!response.ok) throw new Error('Failed to fetch sheet data');
        
        const csvText = await response.text();
        const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim()
        });
        
        return parsed.data;
    } catch (error) {
        console.error('Error fetching Google Sheet:', error);
        return null;
    }
}

function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function findTodayContent(data) {
    if (!data || !Array.isArray(data)) return null;
    
    const todayStr = getTodayDateString();
    return data.find(row => {
        // Support both column naming conventions
        const rowDate = (row.DATE || row.Date || '').trim();
        return rowDate === todayStr;
    });
}

function processMemories(data) {
    if (!data || !Array.isArray(data)) return [];
    
    // Support both column naming conventions
    return data.filter(row => {
        const imageUrl = row['IMAGE URL'] || row.MemoryImageURL || '';
        return imageUrl.trim() !== '';
    }).map(row => ({
        title: row.MemoryTitle || row.MESSAGE || 'A Special Memory',
        date: row.DATE || row.Date || '',
        imageUrl: (row['IMAGE URL'] || row.MemoryImageURL || '').trim(),
        message: row.MESSAGE || row.DailyMessage || ''
    }));
}

async function initContentFromSheet() {
    console.log('Fetching content from Google Sheets...');
    
    const data = await fetchGoogleSheetData();
    
    if (data) {
        // Find today's content
        AppState.todayContent = findTodayContent(data);
        
        // Process all memories for the gallery
        AppState.allMemories = processMemories(data);
        
        console.log('Today\'s content:', AppState.todayContent);
        console.log('Total memories:', AppState.allMemories.length);
    }
    
    // Initialize the diary with found content or fallback
    initDiaryContent();
    
    // Populate the photo gallery
    initPhotoGallery();
    
    // Set journal date
    initJournalDate();
}

function initJournalDate() {
    const dateEl = document.getElementById('journal-date');
    if (dateEl) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = today.toLocaleDateString('en-US', options);
    }
}

// ============================================
// DIARY / DAILY UNLOCK SYSTEM
// ============================================

function initDiaryContent() {
    const messageEl = document.getElementById('daily-message');
    const titleEl = document.getElementById('memory-title');
    const hintEl = document.querySelector('.diary-hint');
    
    if (AppState.todayContent) {
        // We have content for today
        if (hintEl) {
            hintEl.textContent = 'Enter the secret code or play a game to unlock...';
        }
    } else {
        // No content for today - show fallback
        if (hintEl) {
            hintEl.textContent = 'No special message today, but here\'s something sweet...';
        }
        // Auto-unlock with fallback message
        setTimeout(() => {
            const randomMsg = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
            if (messageEl) messageEl.textContent = randomMsg;
            if (titleEl) titleEl.textContent = 'A Little Reminder';
            unlockDiary(true);
        }, 500);
    }
}

function initDiaryUnlock() {
    const unlockBtn = document.getElementById('unlock-code-btn');
    const unlockInput = document.getElementById('unlock-code-input');
    const minigameBtn = document.getElementById('start-minigame-btn');
    
    if (unlockBtn && unlockInput) {
        unlockBtn.addEventListener('click', () => attemptUnlock());
        unlockInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') attemptUnlock();
        });
    }
    
    if (minigameBtn) {
        minigameBtn.addEventListener('click', startMinigame);
    }
}

function attemptUnlock() {
    if (AppState.isUnlocked) return;
    
    const input = document.getElementById('unlock-code-input');
    const enteredCode = input ? input.value.trim().toLowerCase() : '';
    
    // Get the correct code from today's content (support both column names)
    const correctCode = (AppState.todayContent?.['UNLOCK ANSWER'] || AppState.todayContent?.UnlockCode || '').trim().toLowerCase();
    
    if (!correctCode) {
        // No code set, unlock anyway
        unlockDiary();
        return;
    }
    
    if (enteredCode === correctCode) {
        unlockDiary();
    } else {
        // Wrong code - shake animation
        const diary = document.getElementById('locked-diary');
        if (diary) {
            diary.classList.add('shake');
            setTimeout(() => diary.classList.remove('shake'), 500);
        }
        if (input) {
            input.value = '';
            input.placeholder = 'Try again, my love...';
        }
    }
}

function unlockDiary(isFallback = false) {
    if (AppState.isUnlocked) return;
    
    AppState.isUnlocked = true;
    
    const diary = document.getElementById('locked-diary');
    const diaryContent = document.getElementById('diary-content');
    const messageEl = document.getElementById('daily-message');
    const titleEl = document.getElementById('memory-title');
    
    // Set content (support both column naming conventions)
    if (!isFallback && AppState.todayContent) {
        const message = AppState.todayContent.MESSAGE || AppState.todayContent.DailyMessage || CONFIG.FALLBACK_MESSAGE;
        const title = AppState.todayContent.MemoryTitle || 'Today\'s Love Letter';
        if (messageEl) messageEl.textContent = message;
        if (titleEl) titleEl.textContent = title;
    }
    
    // Animate unlock
    if (diary) {
        diary.classList.add('unlocking');
        setTimeout(() => {
            diary.classList.add('unlocked');
            if (diaryContent) diaryContent.classList.remove('hidden');
        }, 300);
    }
    
    // Create success burst
    createSuccessBurst();
    
    // Trigger heart explosion
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingHeart(
                window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                window.innerHeight / 2
            );
        }, i * 50);
    }
}

function createSuccessBurst() {
    const burst = document.createElement('div');
    burst.className = 'success-burst';
    burst.textContent = '💝';
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);
}

// ============================================
// HEART CATCHING MINI-GAME
// ============================================

function startMinigame() {
    if (AppState.isUnlocked) return;
    
    AppState.minigameActive = true;
    AppState.heartsCaught = 0;
    
    const overlay = document.getElementById('minigame-overlay');
    const scoreEl = document.getElementById('hearts-caught');
    const closeBtn = document.getElementById('close-minigame');
    const area = document.getElementById('minigame-area');
    
    if (overlay) overlay.classList.remove('hidden');
    if (scoreEl) scoreEl.textContent = '0';
    if (area) area.innerHTML = '';
    
    // Close button
    if (closeBtn) {
        closeBtn.onclick = endMinigame;
    }
    
    // Start spawning hearts
    AppState.minigameInterval = setInterval(spawnFallingHeart, 800);
    
    // Initial hearts
    for (let i = 0; i < 3; i++) {
        setTimeout(spawnFallingHeart, i * 300);
    }
}

function spawnFallingHeart() {
    if (!AppState.minigameActive) return;
    
    const area = document.getElementById('minigame-area');
    if (!area) return;
    
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = ['❤', '💕', '💗', '💖', '💝'][Math.floor(Math.random() * 5)];
    
    const areaWidth = area.offsetWidth;
    const startX = Math.random() * (areaWidth - 50);
    const duration = 3 + Math.random() * 2; // 3-5 seconds
    const rotation = (Math.random() - 0.5) * 30;
    
    heart.style.left = `${startX}px`;
    heart.style.setProperty('--heart-rotate', `${rotation}deg`);
    heart.style.animationDuration = `${duration}s`;
    
    // Touch/click to catch
    const catchHeart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (heart.classList.contains('caught')) return;
        
        heart.classList.add('caught');
        AppState.heartsCaught++;
        
        const scoreEl = document.getElementById('hearts-caught');
        if (scoreEl) scoreEl.textContent = AppState.heartsCaught;
        
        // Check win condition
        if (AppState.heartsCaught >= CONFIG.HEARTS_TO_CATCH) {
            endMinigame(true);
        }
        
        setTimeout(() => heart.remove(), 300);
    };
    
    heart.addEventListener('click', catchHeart);
    heart.addEventListener('touchstart', catchHeart, { passive: false });
    
    area.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => {
        if (heart.parentElement) heart.remove();
    }, duration * 1000);
}

function endMinigame(won = false) {
    AppState.minigameActive = false;
    
    if (AppState.minigameInterval) {
        clearInterval(AppState.minigameInterval);
        AppState.minigameInterval = null;
    }
    
    const overlay = document.getElementById('minigame-overlay');
    if (overlay) overlay.classList.add('hidden');
    
    if (won) {
        setTimeout(() => unlockDiary(), 300);
    }
}

// ============================================
// NAVIGATION SYSTEM
// ============================================

function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.dataset.view;
            if (targetView === AppState.currentView) return;
            
            // Update nav buttons
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update views
            views.forEach(view => {
                view.classList.remove('active');
            });
            
            const targetSection = document.getElementById(`view-${targetView}`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            AppState.currentView = targetView;
            
            // Trigger heart effect on nav click
            const rect = btn.getBoundingClientRect();
            createFloatingHeart(rect.left + rect.width / 2, rect.top);
        });
    });
}

function navigateTo(viewName) {
    const btn = document.querySelector(`.nav-btn[data-view="${viewName}"]`);
    if (btn) btn.click();
}

// ============================================
// PHOTO GALLERY
// ============================================

function initPhotoGallery() {
    const gallery = document.getElementById('photo-gallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    if (AppState.allMemories.length === 0) {
        gallery.innerHTML = `
            <div class="gallery-empty">
                <div class="gallery-empty-icon">📷</div>
                <p>Our memories will appear here...</p>
                <p style="font-size: 0.8rem; margin-top: 0.5rem;">Add photos in the Google Sheet!</p>
            </div>
        `;
        return;
    }
    
    AppState.allMemories.forEach((memory, index) => {
        const card = createPhotoCard(memory, index);
        gallery.appendChild(card);
    });
}

function createPhotoCard(memory, index) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    
    // Random slight rotation
    const rotation = (Math.random() - 0.5) * 6;
    card.style.setProperty('--rotation', `${rotation}deg`);
    
    card.innerHTML = `
        <img src="${memory.imageUrl}" alt="${memory.title}" loading="lazy">
        <div class="photo-card-caption">
            <div class="photo-card-title">${memory.title}</div>
            <div class="photo-card-date">${formatDate(memory.date)}</div>
        </div>
    `;
    
    // Add click effect
    card.addEventListener('click', () => {
        const rect = card.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    rect.left + rect.width / 2 + (Math.random() - 0.5) * 50,
                    rect.top + rect.height / 2
                );
            }, i * 100);
        }
    });
    
    return card;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

// ============================================
// UI & EFFECTS
// ============================================

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['❤', '❣', '♥', '💕', '💗'][Math.floor(Math.random() * 5)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    const randomX = (Math.random() - 0.5) * 60;
    heart.style.setProperty('--tx', `${randomX}px`);
    
    const container = document.getElementById('effects-container');
    if (container) {
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }
}

function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particles = ['✨', '💫', '⭐', '🌟', '💕'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
        particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 200}px`);
        particle.style.setProperty('--duration', `${15 + Math.random() * 20}s`);
        particle.style.setProperty('--delay', `${Math.random() * 10}s`);
        particle.style.setProperty('--size', `${0.8 + Math.random() * 1.2}rem`);
        
        container.appendChild(particle);
    }
}

function initGlobalEffects() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('input') || 
            e.target.closest('.locket-fab') || e.target.closest('.minigame-area')) return;
        createFloatingHeart(e.clientX, e.clientY);
    });
    
    initParticles();
}

function initTimer() {
    const timerDisplay = document.getElementById('love-timer');
    if (!timerDisplay) return;

    const startDate = new Date(CONFIG.RELATIONSHIP_START_DATE);

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) {
            timerDisplay.innerHTML = `<p>Counting down to our beginning...</p>`;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        timerDisplay.innerHTML = `
            <div class="timer-unit">
                <span class="timer-value">${days}</span>
                <span class="timer-label">Days</span>
            </div>
            <div class="timer-unit">
                <span class="timer-value">${hours}</span>
                <span class="timer-label">Hours</span>
            </div>
            <div class="timer-unit">
                <span class="timer-value">${minutes}</span>
                <span class="timer-label">Minutes</span>
            </div>
        `;
    }

    updateTimer();
    setInterval(updateTimer, 60000);
}

// ============================================
// BUCKET LIST
// ============================================

function initBucketList() {
    const listContainer = document.getElementById('bucket-list');
    if (!listContainer) return;
    
    // Render bucket list directly in the Future view
    renderBucketList(listContainer);
}

function renderBucketList(container) {
    container.innerHTML = '';
    const savedState = JSON.parse(localStorage.getItem('bucketListState')) || {};

    bucketListItems.forEach(item => {
        const li = document.createElement('li');
        const isChecked = savedState[item.id] ? 'checked' : '';
        if (isChecked) li.classList.add('completed');

        li.innerHTML = `
            <input type="checkbox" id="item-${item.id}" ${isChecked}>
            <label for="item-${item.id}">${item.text}</label>
        `;

        const checkbox = li.querySelector('input');
        checkbox.addEventListener('change', (e) => {
            savedState[item.id] = e.target.checked;
            localStorage.setItem('bucketListState', JSON.stringify(savedState));
            
            if (e.target.checked) {
                li.classList.add('completed');
                const rect = checkbox.getBoundingClientRect();
                for(let i = 0; i < 5; i++) {
                    createFloatingHeart(rect.left + 10, rect.top + 10);
                }
            } else {
                li.classList.remove('completed');
            }
        });

        container.appendChild(li);
    });
}

// ============================================
// MUSIC PLAYER
// ============================================

function initMusicPlayer() {
    const musicWidget = document.querySelector('.music-player-widget');
    const bgMusic = document.getElementById('bg-music');

    if (musicWidget && bgMusic) {
        musicWidget.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicWidget.classList.add('playing');
                }).catch(e => console.log("Audio play failed:", e));
            } else {
                bgMusic.pause();
                musicWidget.classList.remove('playing');
            }
        });
    }
}

// ============================================
// START SCREEN
// ============================================

function initStartScreen() {
    const enterBtn = document.getElementById('enter-btn');
    const startScreen = document.getElementById('start-screen');
    const navDock = document.getElementById('nav-dock');
    
    // Hide nav dock initially
    if (navDock) {
        navDock.style.opacity = '0';
        navDock.style.transform = 'translateX(-50%) translateY(100px)';
        navDock.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    if (enterBtn && startScreen) {
        enterBtn.addEventListener('click', () => {
            startScreen.classList.add('fade-out');
            
            setTimeout(() => {
                startScreen.classList.add('hidden');
                
                // Show nav dock with animation
                if (navDock) {
                    navDock.style.opacity = '1';
                    navDock.style.transform = 'translateX(-50%) translateY(0)';
                }
            }, 1500);

            // Attempt to play music
            const bgMusic = document.getElementById('bg-music');
            const musicWidget = document.querySelector('.music-player-widget');
            if (bgMusic) {
                bgMusic.play().then(() => {
                    if (musicWidget) musicWidget.classList.add('playing');
                }).catch(e => console.log("Audio play failed:", e));
            }
        });
    }
}

// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log("💕 Living Love Letter Initialized");
    
    // Initialize UI first
    initStartScreen();
    initNavigation();
    initTimer();
    initBucketList();
    initMusicPlayer();
    initGlobalEffects();
    initDiaryUnlock();
    
    // Fetch content from Google Sheets
    await initContentFromSheet();
    
    console.log("✨ All systems ready!");
});
