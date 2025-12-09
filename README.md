# 💕 For My Baby - Full-Stack Romantic Website

A beautiful, feature-rich romantic website with **Node.js backend**, **MongoDB database**, **admin panel**, and **user submission system** to express your love!

## ✨ What's New - Full Stack Edition!

### 🎉 Major Upgrades

- ✅ **Node.js + Express Backend** - Professional server infrastructure
- ✅ **MongoDB Database** - Store all memories, notes, and submissions
- ✅ **Admin Panel** - Full control over user submissions
- ✅ **User Submission System** - Let users contribute content
- ✅ **Authentication** - Secure JWT-based admin login
- ✅ **RESTful API** - Complete API for all features
- ✅ **Visit Tracking** - Analytics and user insights
- ✅ **Synchronized Love Counter** - Shared across all users
- ✅ **Approval Workflow** - Admin can approve/reject submissions

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas) - [Get MongoDB](https://www.mongodb.com/)
- **Git** - [Download](https://git-scm.com/)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/forbaby.git
cd forbaby

# 2. Install dependencies
npm install

# 3. Configure environment (see .env.example)
cp .env.example .env
# Edit .env with your settings

# 4. Seed database (optional)
npm run seed

# 5. Start server
npm run dev

# 6. Open browser
# Frontend: http://localhost:3000
# Admin: http://localhost:3000/admin-login.html
```

---

## 📁 Project Structure

```
forbaby/
├── server.js                    # Express server
├── package.json                 # Dependencies
├── .env                         # Environment config
├── models/                      # MongoDB schemas
│   ├── Admin.js                # Admin authentication
│   ├── Memory.js               # User memories
│   ├── Note.js                 # Sweet notes
│   ├── BucketListItem.js       # Bucket list
│   ├── OpenWhenLetter.js       # Letters
│   ├── LoveCount.js            # Love counter
│   └── Visit.js                # Analytics
├── routes/                      # API endpoints
│   ├── auth.js                 # Login/logout
│   ├── memories.js             # Memory CRUD
│   ├── notes.js                # Notes CRUD
│   ├── bucketList.js           # Bucket list CRUD
│   ├── openWhen.js             # Letters CRUD
│   ├── loveCount.js            # Love counter API
│   ├── visits.js               # Visit tracking
│   └── admin.js                # Admin dashboard API
├── middleware/
│   └── auth.js                 # JWT authentication
├── forbaby/                     # Frontend
│   ├── index.html              # Homepage
│   ├── admin-login.html        # Admin login page
│   ├── admin-dashboard.html    # Admin panel
│   ├── admin-dashboard.js      # Dashboard logic
│   ├── user-submit.html        # User submission form
│   ├── api-helper.js           # API wrapper
│   ├── style.css               # Styles
│   ├── script.js               # Main JS
│   ├── config.js               # Configuration
│   └── ...                     # All other pages
├── seed.js                      # Database seeder
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
├── BACKEND_SETUP.md             # Backend documentation
└── README.md                    # This file
```

---

## 🎨 Features

### 🌐 Frontend Features

#### Core Pages (16 Pages Total)
1. **Home** - Beautiful landing page with navigation
2. **Reasons I Love You** - 100+ reasons
3. **Love Letter** - Heartfelt letter
4. **Our Memories** - Photo gallery
5. **Sweet Notes** - Short love messages
6. **Our Future** - Dreams together
7. **Special Gift** - Interactive gift box
8. **Monthsary Counter** - Live countdown
9. **Daily Compliments** - Random compliments
10. **Our Playlist** - Spotify integration
11. **Love Quotes** - Romantic quotes
12. **Love Timeline** - Relationship journey
13. **Love Quiz** - Interactive quiz
14. **Bucket List** - Shared dreams
15. **Open When Letters** - Special occasion letters
16. **Gallery Manager** - Photo upload tool
17. **User Submit** - 🆕 Submit content
18. **Admin Login** - 🆕 Admin access
19. **Admin Dashboard** - 🆕 Content management

#### Interactive Features
- 🌙 **Dark Mode** - Toggle light/dark theme
- 💕 **Love Counter** - Synchronized across users
- 🎵 **Music Player** - Background music
- ✨ **Animations** - Floating hearts, sparkles, confetti
- 📱 **PWA** - Install as mobile/desktop app
- 💾 **Offline Mode** - Works without internet
- 🎯 **Visit Tracking** - Analytics integration

### 🔧 Backend Features

#### 🗄️ Database Management
- **MongoDB Integration** - Store all data persistently
- **Mongoose ODM** - Schema validation
- **Data Models** - 8 different content types
- **Indexing** - Optimized queries

#### 🔐 Authentication & Security
- **JWT Tokens** - Secure authentication
- **Password Hashing** - Bcrypt encryption
- **Session Management** - Express sessions
- **CORS Protection** - Secure cross-origin requests
- **Rate Limiting** - Prevent abuse
- **Helmet.js** - Security headers

#### 📊 Admin Panel
- **Dashboard** - Real-time statistics
- **Content Management** - Approve/reject/delete
- **User Submissions** - Review all submissions
- **Analytics** - Visit tracking and insights
- **Bulk Actions** - Manage multiple items
- **Search & Filter** - Find content easily

#### 👥 User Features
- **Submit Memories** - Share special moments
- **Add Notes** - Send sweet messages
- **Suggest Bucket Items** - Add dreams
- **Write Letters** - Create "Open When" letters
- **No Login Required** - Easy submissions
- **Approval Workflow** - Admin reviews before publishing

#### 🌐 API Endpoints
- RESTful API design
- JSON responses
- Error handling
- Validation
- Documentation included

---

## ⚙️ Configuration

### Environment Variables (`.env`)

```env
# Server
PORT=3000
NODE_ENV=development

# Database (Choose one)
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/forbaby
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/forbaby

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123

# Security (Generate random strings)
JWT_SECRET=your-super-secret-jwt-key-change-this
SESSION_SECRET=your-session-secret-change-this

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration (`forbaby/config.js`)

```javascript
const CONFIG = {
  relationship: {
    startDate: "2025-08-03",
    partnerName: "My Baby",
    yourName: "Your Love",
  },
  spotify: {
    playlistId: "YOUR_PLAYLIST_ID",
  },
  // ... more customization
};
```

---

## 🔐 Admin Panel

### Access Admin

1. Navigate to: `http://localhost:3000/admin-login.html`
2. Login with credentials from `.env`:
   - Username: `admin`
   - Password: `changeme123`
3. Access dashboard to:
   - View statistics
   - Approve/reject submissions
   - Delete content
   - Track visits
   - Manage all content

### Admin Features

#### Dashboard Statistics
- 📊 Total memories, notes, bucket items, letters
- ⏳ Pending approvals count
- ✅ Completed items
- 👥 Unique visitors
- 💖 Total love count
- 📈 Visit trends (last 7 days)

#### Content Management
- ✅ Approve user submissions
- ❌ Reject/delete inappropriate content
- 📝 Edit existing content
- 🔄 Bulk actions
- 🔍 Search and filter

---

## 👤 User Submissions

### How Users Can Contribute

1. Visit: `http://localhost:3000/user-submit.html`
2. Choose what to submit:
   - **Memory** - Share a special moment
   - **Note** - Send a sweet message
   - **Bucket List Item** - Suggest a dream
   - **Open When Letter** - Write a letter
3. Fill out the form
4. Submit (no login required!)
5. Wait for admin approval
6. Content appears on site after approval

### Submission Workflow

```
User Submits → Saved to Database (pending)
                      ↓
              Admin Reviews
                      ↓
         ┌────────────┴────────────┐
         ↓                         ↓
     Approve                   Reject
         ↓                         ↓
  Published on Site          Deleted
```

---

## 🗄️ Database Schema

### Collections

1. **admins** - Admin users
2. **memories** - Photo memories
3. **notes** - Sweet notes
4. **bucketlistitems** - Bucket list
5. **openwhenletters** - Letters
6. **lovecounts** - Love counter data
7. **visits** - Analytics data
8. **users** - User sessions (optional)

### Example Memory Document

```json
{
  "_id": "...",
  "title": "Our First Date",
  "description": "The day everything changed...",
  "date": "2025-08-03T00:00:00.000Z",
  "imageUrl": "https://...",
  "tags": ["romantic", "first date"],
  "userId": "session-id",
  "approved": true,
  "createdAt": "2025-10-20T..."
}
```

---

## 🌐 API Documentation

### Base URL
- Local: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

### Endpoints Overview

#### Public Endpoints (No Auth)
- `GET /api/memories` - Get approved memories
- `POST /api/memories` - Submit memory
- `GET /api/notes` - Get approved notes
- `POST /api/notes` - Submit note
- `GET /api/bucketlist` - Get approved items
- `POST /api/bucketlist` - Submit item
- `GET /api/openwhen` - Get approved letters
- `POST /api/openwhen` - Submit letter
- `GET /api/lovecount` - Get love count
- `POST /api/lovecount/increment` - Increment count
- `POST /api/visits` - Track visit

#### Admin Endpoints (Auth Required)
- `POST /api/auth/admin/login` - Login
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/memories/all` - Get all memories
- `PATCH /api/memories/:id/approve` - Approve memory
- `DELETE /api/memories/:id` - Delete memory
- *(Similar for notes, bucket list, letters)*

See `BACKEND_SETUP.md` for complete API documentation.

---

## 🚀 Deployment

### Option 1: Local Development

```bash
npm run dev
```

### Option 2: Free Cloud Deployment

#### Frontend: GitHub Pages
1. Push code to GitHub
2. Enable GitHub Pages
3. Select `forbaby` folder

#### Backend: Render (Free Tier)
1. Create Render account
2. New Web Service
3. Connect GitHub repo
4. Add environment variables
5. Deploy automatically

#### Database: MongoDB Atlas (Free Tier)
1. Create MongoDB Atlas account
2. Create free M0 cluster (512MB)
3. Get connection string
4. Update environment variables

**Total Cost: $0/month** 🎉

### Option 3: Production (Paid)

- **Backend**: Render ($7/month) or Railway ($5/month)
- **Database**: MongoDB M2 ($9/month)
- **Total**: ~$15/month for always-on service

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📚 Documentation

- **README.md** - This file (overview)
- **DEPLOYMENT_GUIDE.md** - Complete deployment instructions
- **BACKEND_SETUP.md** - Backend technical documentation
- **SETUP_GUIDE.md** - Frontend setup guide
- **IMPROVEMENTS_SUMMARY.md** - Feature changelog

---

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

This starts `nodemon` for auto-restart on file changes.

### Seed Database

```bash
npm run seed
```

Creates sample data for testing.

### Test API

```bash
# Health check
curl http://localhost:3000/api/health

# Test login
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"changeme123"}'
```

---

## 🧪 Testing Checklist

### Frontend
- [ ] All pages load correctly
- [ ] Dark mode toggle works
- [ ] Animations play smoothly
- [ ] Forms submit successfully
- [ ] PWA installs properly

### Backend
- [ ] Server starts without errors
- [ ] MongoDB connection succeeds
- [ ] API endpoints respond
- [ ] Admin login works
- [ ] User submissions save
- [ ] Admin can approve/delete

### Integration
- [ ] Love counter syncs
- [ ] Visit tracking works
- [ ] Submissions appear in admin
- [ ] Approved content shows on site
- [ ] CORS configured correctly

---

## 🔧 Customization

### Change Admin Credentials

Edit `.env`:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=SecurePassword123!
```

Restart server and reseed database.

### Customize Website Content

Edit `forbaby/config.js`:
```javascript
const CONFIG = {
  relationship: {
    startDate: "YOUR-DATE",
    partnerName: "Their Name",
    yourName: "Your Name",
  },
  // ... more settings
};
```

### Add New Pages

1. Create HTML file in `forbaby/`
2. Add link to `index.html`
3. Optionally add to API if dynamic content needed

---

## 📊 Analytics

### Built-in Tracking

The backend tracks:
- Page visits
- Unique users
- Love button clicks
- Content submissions
- Admin actions

### View Analytics

Access admin dashboard:
- Total visits
- Unique visitors
- Popular pages
- Recent activity
- Visit trends (7 days)

---

## 🔒 Security Best Practices

### Implemented
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens with expiry
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Helmet.js security headers
- ✅ Input validation
- ✅ SQL injection prevention (NoSQL)

### Recommendations
- 🔐 Change default credentials
- 🔐 Use strong passwords
- 🔐 Generate random secrets
- 🔐 Enable HTTPS in production
- 🔐 Restrict MongoDB access
- 🔐 Regular backups

---

## 🐛 Troubleshooting

### Server Won't Start

**Error**: Port already in use
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

### MongoDB Connection Failed

**Solutions**:
- Check MongoDB is running: `mongod`
- Verify URI in `.env`
- Check MongoDB Atlas network access
- Verify credentials

### CORS Errors

**Solution**: Update `FRONTEND_URL` in `.env` to match your frontend URL.

### Admin Can't Login

**Solutions**:
- Check credentials in `.env`
- Check browser console for errors
- Verify backend is running
- Try resetting: Delete admin from database, reseed

### Submissions Not Saving

**Check**:
- Backend logs for errors
- MongoDB connection
- CORS configuration
- Network tab in browser DevTools

---

## 💰 Cost Breakdown

### Free Tier (Everything Free!)
- Frontend: GitHub Pages
- Backend: Render Free Tier
- Database: MongoDB Atlas M0 (512MB)
- **Total: $0/month** ✨

**Limitations**:
- Backend sleeps after 15 min inactivity
- First request takes ~30 seconds
- 512MB storage limit

### Production Tier
- Frontend: GitHub Pages (free)
- Backend: Render ($7/month)
- Database: MongoDB M2 ($9/month)
- **Total: ~$16/month**

**Benefits**:
- Always-on backend
- 2GB storage + backups
- Better performance
- No cold starts

---

## 🎯 Roadmap

### Planned Features
- [ ] Email notifications for admin
- [ ] Image upload to cloud (Cloudinary/S3)
- [ ] Real-time updates (Socket.io)
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Social sharing
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

This is a personal romantic project, but feel free to:
- Fork for your own use
- Suggest improvements
- Report bugs
- Share your love story!

---

## 📜 License

MIT License - Feel free to use for personal projects!

---

## ❤️ Credits

**Made with endless love using:**
- Node.js & Express
- MongoDB & Mongoose
- HTML5, CSS3, JavaScript
- JWT, Bcrypt
- Google Fonts
- Lots of coffee ☕
- And a ton of romantic music 🎵

---

## 💌 Final Words

This isn't just a website—it's a **digital love letter** that keeps growing. With the backend, you can:

- 💕 Store unlimited memories
- 📝 Let your partner contribute
- 👑 Control everything as admin
- 📊 Track your love story
- 🌍 Share with the world (or keep it private!)

**The possibilities are endless when love meets technology!** ✨

---

## 📞 Need Help?

1. Check documentation files
2. Review error logs
3. Test API endpoints manually
4. Verify environment variables
5. Check MongoDB connection

---

## 🎉 You're All Set!

Your romantic website is now a **full-stack application** with:

✅ Beautiful frontend (16+ pages)
✅ Powerful backend (Node.js + Express)
✅ Persistent database (MongoDB)
✅ Admin control panel
✅ User submissions
✅ Analytics and tracking
✅ Secure authentication
✅ RESTful API
✅ PWA capabilities
✅ And endless love! 💕

**Now go share your love with the world!** 🌍💖

---

**Default Credentials**
- Username: `admin`
- Password: `changeme123`

**⚠️ IMPORTANT: Change the default password in `.env` file!**

---

**Made with 💕 for spreading love online!**

*Star ⭐ this project if it helped you express your love!*





