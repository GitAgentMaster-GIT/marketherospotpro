# Backend Setup Guide

## ✅ What's Been Built

Your Marketing Hero backend is now complete with:
- **Express server** with RESTful API
- **MongoDB** database integration
- **JWT authentication** (register, login, protected routes)
- **OpenAI integration** for AI campaign generation
- **4 complete modules**: Auth, Campaigns, Leads, Conversions

## 🚀 Quick Start

### Step 1: Install MongoDB (Choose One)

#### Option A: MongoDB Atlas (Recommended - Free Cloud Database)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marketing-hero
   ```

#### Option B: Local MongoDB
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. Start MongoDB service:
   ```powershell
   net start MongoDB
   ```
4. Your `.env` already has the local connection string

### Step 2: Get OpenAI API Key (Optional but Recommended)
1. Go to https://platform.openai.com/signup
2. Create an account
3. Go to API Keys: https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy the key
6. Update `.env` file:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
**Cost:** $5 minimum, ~$0.002 per campaign generation

> **Note:** The backend will work without OpenAI! It uses fallback campaign generation if no API key is provided.

### Step 3: Start the Backend Server

```powershell
cd server
npm run dev
```

You should see:
```
🚀 Marketing Hero API Server running on port 3001
📍 API URL: http://localhost:3001
✅ MongoDB Connected
```

## 🧪 Testing the API

### Test 1: Health Check
```powershell
curl http://localhost:3001/api/health
```

### Test 2: Register a User
```powershell
curl -X POST http://localhost:3001/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

You'll get back a JWT token and user info!

### Test 3: Generate AI Campaign
First, save your token from registration, then:
```powershell
curl -X POST http://localhost:3001/api/ai/generate-campaign `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_TOKEN_HERE" `
  -d '{"product":"Fitness App","niche":"Health & Wellness","targetAudience":"Busy professionals aged 25-45","budget":5000,"platforms":["facebook","google"]}'
```

## 📁 Backend Structure

```
server/
├── index.js                    # Main Express server
├── .env                        # Environment variables
├── config/
│   └── database.js            # MongoDB connection
├── models/
│   ├── User.js                # User schema with auth
│   ├── Campaign.js            # Campaign schema
│   ├── Lead.js                # Lead schema
│   └── Sequence.js            # Email/SMS sequence schema
├── routes/
│   ├── auth.js                # Register, login, me
│   ├── campaigns.js           # CRUD campaigns
│   ├── leads.js               # Manage leads
│   ├── conversions.js         # Email/SMS sequences
│   └── ai.js                  # AI generation endpoints
├── middleware/
│   └── auth.js                # JWT verification
└── services/
    └── openai.js              # OpenAI integration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/:id` - Get single campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign
- `POST /api/campaigns/:id/deploy` - Deploy campaign

### AI Generation
- `POST /api/ai/generate-campaign` - Generate campaign with AI
- `POST /api/ai/optimize` - Get optimization suggestions
- `POST /api/ai/chat` - Chat with AI assistant

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `POST /api/leads/:id/convert` - Mark as converted

### Conversion Sequences
- `GET /api/conversions/sequences` - Get all sequences
- `POST /api/conversions/sequences` - Create sequence
- `PUT /api/conversions/sequences/:id` - Update sequence

## 🔐 Authentication Flow

1. User registers → Gets JWT token
2. Store token in frontend (localStorage)
3. Include token in all API requests:
   ```
   Authorization: Bearer <token>
   ```

## ⚠️ Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```
**Fix:** MongoDB isn't running. Either:
- Use MongoDB Atlas (cloud)
- Start local MongoDB: `net start MongoDB`

### OpenAI API Error
```
OpenAI API Error: Invalid API key
```
**Fix:** Either:
- Add valid OpenAI API key to `.env`
- Or leave it empty - the app will use fallback generation

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Fix:** Kill the process using port 3001:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process
```

## 🎯 Next Steps

Now that your backend is running, you need to:

1. **Start both servers:**
   ```powershell
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd ..
   node node_modules/vite/bin/vite.js
   ```

2. **Connect Frontend to Backend** (See FRONTEND-INTEGRATION.md)

3. **Test the full flow:**
   - Register on the frontend
   - Create a campaign
   - Generate with AI
   - View your leads

---

## 🚀 Production Deployment (Render + Northflank)

### 1) Prepare environment
- Create `server/.env` using `server/.env.example` as a template.
- Ensure `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL` (or `FRONTEND_URLS`) are set.
- Optionally set `OPENAI_API_KEY` (app has fallback without it).

### 2) Deploy Backend to Render
1. Push the repo to GitHub.
2. In Render, create a new Web Service and set start command to `node server/index.js`.
3. Set environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI` (Atlas connection)
   - `JWT_SECRET`, `JWT_EXPIRE=7d`
   - `FRONTEND_URL=https://marketherospotpro.ai` (or use `FRONTEND_URLS` for both `.ai` and `.com`)
4. Note the service URL, e.g. `https://api-markethero.onrender.com`.

### 3) Deploy Frontend to Northflank
1. Create a static site or container service for the frontend.
2. Build with Vite: `npm run build` → serve `dist/`.
3. Set env var: `VITE_API_URL=https://api-markethero.onrender.com/api`.
4. Attach your domain `MarketHeroSpotPro.ai`.

### 4) DNS & SSL
- In your registrar, set `CNAME`/`A` records per Northflank and Render docs.
- Enable SSL (Let’s Encrypt) on both platforms.

### 5) CORS
- Backend uses robust CORS. Set either:
  - `FRONTEND_URL=https://marketherospotpro.ai`
  - or `FRONTEND_URLS=https://marketherospotpro.ai,https://marketherospotpro.com`

### 6) Seed Admin User
Run once (locally or Render shell):
```bash
node server/scripts/seed-admin.js
```
Optional env overrides:
```bash
ADMIN_EMAIL=marketherospotpro@gmail.com ADMIN_NAME="MarketHeroSpotPro Admin" ADMIN_PASSWORD="ChooseAStrongPassword" node server/scripts/seed-admin.js
```

### 7) Health & Ready
- `GET /api/health` → `{ ok: true }`
- `GET /api/ready` → `{ dbConnected: true }`

## 📊 Database Collections

Once you create some data, you'll have these MongoDB collections:
- `users` - User accounts
- `campaigns` - Marketing campaigns
- `leads` - Captured leads
- `sequences` - Email/SMS automation

You can view these with:
- MongoDB Compass (GUI): https://www.mongodb.com/try/download/compass
- MongoDB Atlas Dashboard (cloud)

## 🔥 Pro Tips

1. **Keep nodemon running** - It auto-restarts on code changes
2. **Use Postman** - Great for testing APIs visually
3. **Check console logs** - Server logs all requests
4. **MongoDB Compass** - View your database visually

## 💰 Cost Breakdown

**Free Tier (Perfect for Development):**
- MongoDB Atlas: FREE (512MB storage)
- Backend Hosting: FREE (during development)
- Total: $0/month

**With OpenAI:**
- OpenAI API: ~$5-20/month (pay as you go)
- Campaign generation: ~$0.002 per request
- Total: ~$5-20/month

**Production (Ready to Scale):**
- MongoDB Atlas: $9-57/month
- Server Hosting: $12-50/month (Railway, Render, DigitalOcean)
- OpenAI: $20-100/month
- Total: ~$50-200/month

---

🎉 **Your backend is production-ready!** It handles auth, campaigns, AI generation, leads, and conversions!
