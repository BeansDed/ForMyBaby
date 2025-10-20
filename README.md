# 💕 For My Baby - Romantic Love Website

A beautiful, feature-rich romantic website crafted with love to express your feelings to someone special.

## ✨ Features

### 🎨 Core Features
- **Beautiful Coquette Design** - Elegant pink/rose theme with romantic aesthetics
- **Fully Responsive** - Perfect on mobile, tablet, and desktop
- **Dark Mode** - Toggle between light and dark themes
- **Progressive Web App (PWA)** - Install on phone/desktop for offline access
- **Smooth Animations** - Floating hearts, sparkles, and delightful transitions
- **Music Player** - Background romantic music
- **Daily Love Messages** - New sweet messages each day
- **Love Meter** - Animated love percentage (spoiler: it's infinite!)
- **Visit Counter** - Tracks visits and last visit time

### 📱 Pages Included

1. **Home (index.html)** - Main landing page with navigation cards
2. **Reasons I Love You** - Heartfelt list of reasons
3. **Love Letter** - A romantic letter from your heart
4. **Our Memories** - Photo gallery of your moments together
5. **Sweet Notes** - Short love notes and messages
6. **Our Future** - Dreams and plans for your future together
7. **Special Gift** - Interactive gift box with a surprise message
8. **Monthsary Counter** - Live countdown of time together
9. **Daily Compliments** - Random compliment generator
10. **Our Playlist** - Embedded Spotify playlist
11. **Love Quotes** - Beautiful romantic quotes
12. **Love Timeline** - Visual timeline of your relationship
13. **Love Quiz** - Interactive quiz to test how well you know each other
14. **Bucket List** - Things you want to do together (with checkboxes!)

## 🚀 Quick Start

### Option 1: Simple Setup (No server needed)
1. Download all files to a folder
2. Open `index.html` in your web browser
3. That's it! Everything works locally

### Option 2: Web Server (Recommended for PWA features)
```bash
# Using Python 3
cd forbaby
python -m http.server 8000

# Using Node.js
npx http-server

# Then open http://localhost:8000 in your browser
```

## 🎨 Customization Guide

### Easy Personalization with config.js

Open `config.js` and edit these values:

```javascript
const CONFIG = {
  relationship: {
    startDate: "2025-08-03",  // Your special date
    partnerName: "My Baby",    // What you call them
    yourName: "Your Love",     // Your name
  },
  spotify: {
    playlistId: "YOUR_PLAYLIST_ID",  // Your Spotify playlist
  },
  // ... and more!
};
```

### Customizing Content

#### 1. Add Your Photos
Replace placeholder images in `memories.html`:
```html
<img src="photos/your-photo.jpg" alt="Description">
```

#### 2. Edit Love Letter
Open `letter.html` and write your own heartfelt message.

#### 3. Customize Reasons
Edit the list in `reasons.html` with your own reasons.

#### 4. Add Quiz Questions
Edit the quiz questions in `quiz.html`:
```javascript
{
  question: "What's my favorite...?",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  correct: 2  // Index of correct answer (0-3)
}
```

#### 5. Update Bucket List
Add/edit items in `bucketlist.html` - items save their state!

#### 6. Change Spotify Playlist
1. Get your playlist URL from Spotify
2. Extract the playlist ID (after `/playlist/`)
3. Update in `config.js` or directly in `playlist.html`

### Styling Customization

Edit CSS variables in `style.css`:
```css
:root {
  --rose-500: #f43f5e;  /* Main pink color */
  --bg: #fff9fb;         /* Background color */
  /* ... customize more colors */
}
```

## 🌐 Deployment

### GitHub Pages (Free!)
1. Create a GitHub account
2. Create a new repository
3. Upload all files
4. Go to Settings → Pages
5. Select main branch
6. Your site will be live at `https://yourusername.github.io/reponame`

### Netlify (Free, Super Easy!)
1. Create account at netlify.com
2. Drag & drop the `forbaby` folder
3. Done! You get a live URL instantly

### Vercel (Free!)
1. Create account at vercel.com
2. Connect your GitHub repo
3. Deploy automatically

## 📱 PWA Installation

Once deployed:
1. Open the website on mobile
2. Look for "Add to Home Screen" prompt
3. Install like a native app!
4. Works offline after first visit

## ✨ Advanced Features

### Service Worker
- Caches all pages for offline access
- Updates automatically when you make changes

### Local Storage
- Saves theme preference (light/dark)
- Remembers love count
- Tracks visit numbers
- Saves bucket list checkboxes

### Accessibility
- Proper ARIA labels
- Keyboard navigation
- Screen reader friendly
- Good color contrast

## 🎯 Tips & Tricks

### Adding More Pages
1. Copy an existing HTML file
2. Customize the content
3. Add a link to it on `index.html`
4. Add it to `sw.js` for offline support

### Custom Domain
Most hosting services let you add a custom domain:
- Buy domain from Namecheap, GoDaddy, etc.
- Configure DNS settings
- Point to your hosting service

### Adding Videos
```html
<video controls>
  <source src="videos/your-video.mp4" type="video/mp4">
</video>
```

### Password Protection
For privacy, you can add simple password protection:
1. Use Netlify's built-in password protection
2. Or add JavaScript password prompt
3. Or use `.htaccess` if using Apache server

## 🐛 Troubleshooting

**Music doesn't play**
- Some browsers block autoplay
- User must interact with page first
- Try clicking the music button manually

**PWA not installing**
- Requires HTTPS (works on localhost or deployed sites)
- Check browser console for errors
- Make sure manifest.json is accessible

**Images not showing**
- Check file paths are correct
- Make sure images are in the right folder
- Check file names match exactly (case-sensitive)

**Dark mode not saving**
- Clear browser cache
- Check localStorage is enabled
- Try in different browser

## 📝 File Structure

```
forbaby/
├── index.html              # Home page
├── style.css              # Main styles
├── script.js              # Main JavaScript
├── config.js              # Configuration file
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker
├── favicon.svg            # Site icon
├── reasons.html           # All other pages
├── letter.html
├── memories.html
├── notes.html
├── future.html
├── gift.html
├── monthsary.html
├── compliments.html
├── playlist.html
├── love-quotes.html
├── timeline.html
├── quiz.html
├── bucketlist.html
└── README.md             # This file!
```

## 💡 Ideas for Enhancement

- Add voice messages recording
- Create a guestbook for visitors
- Add countdown to special events
- Create an anniversary calculator
- Add weather-based greetings
- Integrate with Google Photos
- Add birthday countdown
- Create a shared journal
- Add location-based messages
- Integrate calendar for important dates

## 🎁 License

This is a labor of love! Feel free to use, modify, and share.
If you create something beautiful with this, I'd love to know! 💕

## ❤️ Credits

Made with endless love and:
- HTML5, CSS3, JavaScript
- Google Fonts (Dancing Script, Playfair Display, Inter)
- Lots of coffee and romantic music ☕🎵

## 💌 Final Words

Remember: The most important thing isn't the code or design—it's the love and thought you put into personalizing this for your special someone. Take your time, make it truly yours, and watch their face light up! ✨

---

**Pro Tip**: Before showing this to your loved one, make sure to:
- [ ] Update the start date in config.js
- [ ] Replace placeholder photos with real ones
- [ ] Customize the love letter
- [ ] Add personal reasons in the reasons list
- [ ] Update the Spotify playlist
- [ ] Review all pages for personal touches
- [ ] Test on mobile device
- [ ] Make sure music works

Enjoy and happy loving! 💕



