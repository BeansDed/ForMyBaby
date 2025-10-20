# 🚀 Quick Setup Guide - For My Baby Website

## ⚡ 5-Minute Quick Start

### Step 1: Personalize config.js
Open `config.js` and update these lines:

```javascript
relationship: {
  startDate: "2025-08-03",  // ← Change to YOUR date!
  partnerName: "My Baby",   // ← Their nickname
  yourName: "Your Love",    // ← Your name
},
```

### Step 2: Update the Love Letter
Open `letter.html` and write your own heartfelt message (starting around line 29).

### Step 3: Add Your Reasons
Open `reasons.html` and replace the reasons with your own (starting around line 28).

### Step 4: Add Photos
1. Create a folder named `photos` in the `forbaby` directory
2. Add your photos there
3. Use `gallery-manager.html` to generate the HTML code
4. Paste the code into `memories.html` (replace lines 28-38)

### Step 5: Update Spotify Playlist
1. Go to your Spotify playlist
2. Click Share → Copy Link
3. Extract the ID from the URL (the part after `/playlist/`)
4. Update in `config.js`:
   ```javascript
   spotify: {
     playlistId: "YOUR_ID_HERE",
   },
   ```

### Step 6: Test It!
Open `index.html` in your browser and explore!

---

## 🎨 Detailed Customization

### Personalizing Each Page

#### Love Letter (letter.html)
- Replace paragraph content (lines 31-47)
- Update signature (line 45)

#### Reasons (reasons.html)
- Edit list items (lines 29-49)
- Add more reasons by copying a `<li>` element

#### Sweet Notes (notes.html)
- Update notes (lines 29-45)
- Add more with additional `<li>` elements

#### Our Future (future.html)
- Edit dream descriptions (lines 29-64)
- Change icons by updating emoji in `dream-icon` divs

#### Monthsary Counter (monthsary.html)
- Date is pulled from `config.js`
- No changes needed if you updated Step 1!

#### Timeline (timeline.html)
- Edit dates, titles, and descriptions (lines 102-154)
- Add more timeline items by copying a `timeline-item` div

#### Quiz (quiz.html)
- Edit questions in the JavaScript section (lines 164-179)
- Add more questions by copying the question object format

#### Bucket List (bucketlist.html)
- Edit items (lines 71-195)
- Add more by copying a `bucket-item` div

#### Open When Letters (openwhen.html)
- Edit letter content in JavaScript (lines 258-411)
- Update signatures (change "Your Love" to your name)

---

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended for Beginners)

1. **Create GitHub Account**: Go to github.com and sign up

2. **Create New Repository**:
   - Click "New repository"
   - Name it anything (e.g., "for-my-baby")
   - Make it public or private
   - Click "Create repository"

3. **Upload Files**:
   - Click "uploading an existing file"
   - Drag all files from `forbaby` folder
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Easiest!)

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Deploy manually"
4. Drag the entire `forbaby` folder
5. Done! You get a live URL instantly
6. You can customize the URL in settings

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"
6. Your site goes live in 1 minute!

---

## 📱 Making it PWA (Progressive Web App)

Once deployed, your site can be installed like an app!

**On Mobile**:
1. Open the site in Safari (iOS) or Chrome (Android)
2. Look for "Add to Home Screen" prompt
3. Tap "Add"
4. Icon appears on your home screen!

**On Desktop**:
1. Open in Chrome/Edge
2. Look for install icon in address bar
3. Click "Install"
4. It opens like a desktop app!

---

## 🎨 Color Customization

Want different colors? Edit `config.js`:

```javascript
theme: {
  primaryColor: "#f43f5e",    // Main pink
  secondaryColor: "#fb7185",  // Lighter pink
  backgroundColor: "#fff9fb", // Background
},
```

Or edit CSS variables in `style.css` (lines 2-22).

---

## 💡 Pro Tips

### Adding More Pages

1. Copy an existing page (e.g., copy `notes.html` to `journal.html`)
2. Edit the content
3. Add a card to `index.html`:
   ```html
   <a href="journal.html" class="heart-card" data-sweet-message="Your message">
     <div class="heart-icon">📔</div>
     <span class="heart-label">Our Journal</span>
     <div class="heart-shimmer"></div>
   </a>
   ```
4. Add to service worker (`sw.js`, line 4) for offline support

### Password Protection

For privacy, use Netlify's built-in password protection:
1. In Netlify dashboard, go to Site settings
2. Find "Visitor access"
3. Enable password protection
4. Set a password
5. Share password only with your loved one!

### Custom Domain

Want `mylove.com` instead of `username.github.io`?

1. Buy domain from Namecheap/GoDaddy (~$10/year)
2. In hosting settings, add custom domain
3. Update DNS records (they'll provide instructions)
4. Done! Your custom URL is live

---

## 🐛 Common Issues

**"Photos aren't showing"**
- Check file paths match exactly (case-sensitive!)
- Make sure photos are in the `photos` folder
- Try using `gallery-manager.html` to generate correct code

**"Music won't play"**
- Some browsers block autoplay
- User must click music button first
- This is normal browser behavior

**"Dark mode not saving"**
- Clear browser cache
- Try different browser
- Check if localStorage is enabled

**"PWA won't install"**
- Needs HTTPS (only works when deployed, not local files)
- Works on localhost or hosted sites
- Check browser console for errors

**"Service worker errors"**
- Update file paths in `sw.js` if you added/removed pages
- Clear browser cache and hard refresh (Ctrl+Shift+R)

---

## ✅ Final Checklist Before Sharing

- [ ] Updated start date in `config.js`
- [ ] Personalized love letter
- [ ] Added your own reasons
- [ ] Uploaded real photos
- [ ] Updated Spotify playlist
- [ ] Edited sweet notes
- [ ] Customized quiz questions
- [ ] Updated "Open When" letters with your name
- [ ] Tested on mobile
- [ ] Tested music player
- [ ] Checked all pages load correctly
- [ ] Reviewed for any placeholder text
- [ ] Added personal touches throughout

---

## 🎁 Extra Ideas

**Voice Messages**: Record yourself and embed:
```html
<audio controls>
  <source src="audio/message.mp3" type="audio/mpeg">
</audio>
```

**Video Message**: Add to gift.html:
```html
<video controls width="100%">
  <source src="videos/message.mp4" type="video/mp4">
</video>
```

**Countdown to Event**: Use the monthsary counter code and change the date!

---

## 💌 You're Ready!

That's it! You've created something truly special. The technical part is done—now it's just about filling it with your love and personality.

Take your time, make it uniquely yours, and watch the magic happen when they see it! 💕

**Need Help?** Check `README.md` for more detailed documentation.

Good luck, and happy loving! ✨



