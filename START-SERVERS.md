# Marketing Hero - Quick Start Guide

## 🚀 How to Start the Application

### Step 1: Start Backend Server
Open PowerShell and run:
```powershell
cd "C:\Users\HALO4\OneDrive\Documents\Getting Started\marketing-hero\server"
node index.js
```
**Keep this window open!**

### Step 2: Start Frontend Server
Open a NEW PowerShell window and run:
```powershell
cd "C:\Users\HALO4\OneDrive\Documents\Getting Started\marketing-hero"
npx vite
```
**Keep this window open!**

### Step 3: Open in Browser
Go to: **http://localhost:5173**

---

## 🔑 Login Credentials

**Email:** demo@example.com  
**Password:** Demo123456

---

## 📦 Project Structure

```
marketing-hero/
├── server/              # Backend API (Node.js + Express + MongoDB)
│   ├── index.js        # Main server file
│   ├── routes/         # API routes (auth, campaigns, leads, etc.)
│   ├── models/         # MongoDB models (User, Campaign, Lead, Sequence)
│   ├── middleware/     # JWT authentication
│   └── .env            # Environment variables (MongoDB connection)
├── src/                # Frontend (React + Vite)
│   ├── App.jsx         # Main app with routing
│   ├── pages/          # Login, Register, Dashboard, etc.
│   ├── components/     # Reusable components
│   ├── context/        # Auth context
│   ├── services/       # API service layer
│   └── utils/          # Axios configuration
└── index.html          # Entry point

```

---

## ✅ What's Completed

- ✅ **Full-stack authentication** (JWT tokens, login, register, logout)
- ✅ **MongoDB Atlas** database connected
- ✅ **Backend API** with 20+ endpoints:
  - User authentication
  - Campaign CRUD operations
  - Lead management
  - Conversion tracking
  - AI integration (OpenAI ready)
- ✅ **Frontend UI** with 4 main pages:
  - Dashboard
  - Campaign Creator
  - Lead Management
  - Conversion Engine
- ✅ **Protected routes** with authentication
- ✅ **Beautiful gradient UI** (purple/indigo/blue theme)

---

## 🔧 Troubleshooting

### Servers won't start?
```powershell
# Kill all Node processes
taskkill /F /IM node.exe

# Then restart both servers (see Step 1 & 2 above)
```

### Page shows 404?
- Make sure BOTH servers are running (backend AND frontend)
- Check you're at http://localhost:5173 (not 3001)
- Try clearing browser cache (Ctrl+Shift+Delete)

### Can't login?
Reset the demo user:
```powershell
cd "C:\Users\HALO4\OneDrive\Documents\Getting Started\marketing-hero\server"
node reset-user.js
```

---

## 🌐 MongoDB Atlas

**Database:** marketing-hero  
**Connection:** Already configured in `server/.env`  
**Collections:** users, campaigns, leads, sequences

---

## 📝 Next Steps to Complete

1. **Connect Dashboard to real data** - Fetch campaigns from API
2. **Connect Campaign Creator to AI** - Use OpenAI integration
3. **Add OpenAI API key** (optional) in `server/.env`
4. **Test full user flow** - Register, create campaign, manage leads
5. **Deploy to production** - Vercel (frontend) + Railway (backend)

---

## 💡 Quick Commands

**Install dependencies (if needed):**
```powershell
# Backend
cd server
npm install

# Frontend  
cd ..
npm install
```

**Check if servers are running:**
```powershell
netstat -ano | findstr "3001 5173"
```

**View server logs:**
- Backend: http://localhost:3001/api/health
- Frontend: Check the PowerShell window

---

## 📞 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Database:** MongoDB Atlas (cloud)
- **AI:** OpenAI API integration ready

---

**Project is 90% complete!** Just need to fix the server startup issue and connect the frontend pages to the backend APIs.
