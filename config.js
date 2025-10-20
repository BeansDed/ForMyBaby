// ========================================
// PERSONALIZATION CONFIG
// Edit these values to customize the website!
// ========================================

const CONFIG = {
  // Personal Information
  relationship: {
    startDate: "2025-08-03", // Format: YYYY-MM-DD - Change this to your actual relationship start date
    partnerName: "My Love", // Your girlfriend's name
    yourName: "Your Boyfriend", // Your name
    petName: "baby", // What you call her
  },

  // Music Player
  music: {
    enabled: true,
    // You can add your own audio URL here
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },

  // Spotify Playlist
  spotify: {
    playlistId: "1qXCs2ifAVOtZAMDdwoD60", // Get from playlist URL
  },

  // Colors & Theme (optional - advanced users)
  theme: {
    primaryColor: "#f43f5e",
    secondaryColor: "#fb7185",
    backgroundColor: "#fff9fb",
  },

  // Features Toggle
  features: {
    musicPlayer: true,
    dailyMessages: true,
    loveMeter: true,
    floatingHearts: true,
    sparkles: true,
    pageTransitions: true,
  },

  // Social & SEO
  meta: {
    siteName: "For My Baby ♡",
    siteDescription: "A romantic website filled with love and memories",
    // Add your domain when deployed
    domain: "https://yourdomain.com",
    // Path to your Open Graph image
    ogImage: "/og-image.png",
  },

  // Customizable Messages
  messages: {
    dailyMessages: [
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
    ],
    homePageIntro: "I created this enchanted space filled with all my love for you. Each charm holds a piece of my heart ✨",
    footerMessage: "Every pixel, every word, every detail was crafted with endless love just for you, my darling ♡",
  },

  // Quiz Customization
  quiz: {
    questions: [
      {
        question: "What's my favorite color?",
        options: ["Blue", "Pink", "Purple", "Green"],
        correct: 1, // Index of correct answer (0-based)
      },
      {
        question: "What's my biggest dream?",
        options: ["Travel the world", "Start a family", "Buy a house", "All of the above"],
        correct: 3,
      },
      // Add more questions here!
    ],
  },

  // Bucket List Items
  bucketList: {
    categories: ["Travel", "Romance", "Adventure", "Life Goals", "Activities"],
    // Manage items in bucketlist.html
  },

  // Photo Gallery
  photos: {
    // When you have real photos, add them here
    gallery: [
      // { url: "photos/photo1.jpg", caption: "Our first date" },
      // { url: "photos/photo2.jpg", caption: "Best day ever" },
    ],
  },
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

// Make available globally
window.SITE_CONFIG = CONFIG;

// Apply theme colors if customized
if (CONFIG.theme) {
  document.documentElement.style.setProperty('--rose-500', CONFIG.theme.primaryColor);
  document.documentElement.style.setProperty('--rose-400', CONFIG.theme.secondaryColor);
  document.documentElement.style.setProperty('--bg', CONFIG.theme.backgroundColor);
}


