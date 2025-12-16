import { loveMessages, bucketListItems, timelineEvents } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    initStartScreen();
    initMusicPlayer();
    initLoveCounter();
    initTimeline();
    initDailyNote();
    initBucketList();
    initClickEffects();
    initParallax();
});

/* --- 1. Start Screen --- */
function initStartScreen() {
    const enterBtn = document.getElementById('enter-btn');
    const startScreen = document.getElementById('start-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    enterBtn.addEventListener('click', () => {
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.classList.add('hidden');
            startScreen.classList.remove('active');
            
            mainContent.classList.remove('hidden');
            // Trigger reflow to enable transition
            void mainContent.offsetWidth; 
            mainContent.style.opacity = '1';
            
            // Try to play music
            playMusic(bgMusic);
        }, 1000);
    });
}

/* --- 2. Music Player --- */
function initMusicPlayer() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const bgMusic = document.getElementById('bg-music');
    const vinylRecord = document.querySelector('.vinyl-record');

    playPauseBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            playMusic(bgMusic);
        } else {
            bgMusic.pause();
            playPauseBtn.textContent = '▶';
            vinylRecord.classList.remove('playing');
        }
    });
}

function playMusic(audioElement) {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const vinylRecord = document.querySelector('.vinyl-record');
    
    audioElement.play().then(() => {
        playPauseBtn.textContent = '❚❚';
        vinylRecord.classList.add('playing');
    }).catch(err => {
        console.log("Auto-play prevented by browser policy. User interaction required.", err);
    });
}

/* --- 3. Love Counter --- */
function initLoveCounter() {
    const timerDisplay = document.getElementById('love-timer');
    const startDate = new Date('2025-08-03T00:00:00');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) {
            timerDisplay.textContent = "See you soon!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        // const seconds = Math.floor((diff / 1000) % 60);

        timerDisplay.innerHTML = `
            ${days} Days <br>
            ${hours} Hours <br>
            ${minutes} Minutes
        `;
    }

    updateTimer();
    setInterval(updateTimer, 60000); // Update every minute
}

/* --- 4. Journey Timeline (Intersection Observer) --- */
function initTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    
    // Inject events
    timelineEvents.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="memory-img">
            <div class="memory-date">${event.date}</div>
            <h3 class="memory-title">${event.title}</h3>
            <p class="memory-desc">${event.description}</p>
        `;
        timelineContainer.appendChild(card);
    });

    // Observer for Focus Effect
    const options = {
        root: document.querySelector('.horizontal-scroll-wrapper'), // Scroll container
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-focus');
            } else {
                entry.target.classList.remove('in-focus');
            }
        });
    }, options);

    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => observer.observe(card));
}

/* --- 5. Daily Note --- */
function initDailyNote() {
    const messageElement = document.getElementById('daily-message');
    // Simple random selection
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    messageElement.textContent = loveMessages[randomIndex];
}

/* --- 6. Secret Locket (Bucket List) --- */
function initBucketList() {
    const locketBtn = document.getElementById('locket-btn');
    const modal = document.getElementById('locket-modal');
    const closeModal = document.querySelector('.close-modal');
    const listContainer = document.getElementById('bucket-list');

    // Toggle Modal
    locketBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        renderBucketList();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Render List
    function renderBucketList() {
        listContainer.innerHTML = '';
        // Get saved state
        const savedState = JSON.parse(localStorage.getItem('bucketListState')) || {};

        bucketListItems.forEach(item => {
            const li = document.createElement('li');
            const isChecked = savedState[item.id] ? 'checked' : '';
            if (isChecked) li.classList.add('completed');

            li.innerHTML = `
                <input type="checkbox" id="item-${item.id}" ${isChecked}>
                <span>${item.text}</span>
            `;

            const checkbox = li.querySelector('input');
            checkbox.addEventListener('change', (e) => {
                savedState[item.id] = e.target.checked;
                localStorage.setItem('bucketListState', JSON.stringify(savedState));
                
                if (e.target.checked) {
                    li.classList.add('completed');
                    createExplosion(e.target);
                } else {
                    li.classList.remove('completed');
                }
            });

            listContainer.appendChild(li);
        });
    }
}

function createExplosion(element) {
    // Mini heart explosion near the checkbox
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        createFloatingHeart(rect.left + 10, rect.top + 10);
    }
}

/* --- 7. Global Interactions --- */
function initClickEffects() {
    document.addEventListener('click', (e) => {
        // Don't trigger on interactive elements to avoid clutter
        if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.memory-card')) return;
        
        createFloatingHeart(e.clientX, e.clientY);
    });
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['❤', '❣', '♥', '🎀'][Math.floor(Math.random() * 4)]; // Random symbol
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    // Randomize slight movement
    const randomX = (Math.random() - 0.5) * 50;
    heart.style.setProperty('--tx', `${randomX}px`);
    
    document.getElementById('effects-container').appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

/* --- 8. Parallax Background Helper --- */
function initParallax() {
    // CSS handle the continuous scroll, but we can add mouse movement influence if desired
    // For now, simple CSS animation is usually smoother for mobile.
}
