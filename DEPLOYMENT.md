# Deployment Guide (Render + Northflank)

## Overview
- Backend API on Render (Node.js service)
- Frontend SPA on Northflank (Docker: Vite → nginx)
- Domains: MarketHeroSpotPro.ai (primary), reserve MarketHeroSpotPro.com

## Prereqs
- GitHub repo initialized and connected to both platforms
- MongoDB Atlas URI
- JWT secret
- (Optional) OpenAI API key

## Backend (Render)
1. Add `render.yaml` at repo root (already added).
2. In Render, import repo → use blueprint or create Web Service:
   - Start command: `node server/index.js`
   - Env vars:
     - `NODE_ENV=production`
     - `MONGODB_URI=<atlas-uri>`
     - `JWT_SECRET=<strong-secret>`
     - `JWT_EXPIRE=7d`
     - `FRONTEND_URLS=https://marketherospotpro.ai,https://marketherospotpro.com`
     - `OPENAI_API_KEY` (optional)
3. Deploy and verify:
   - `GET https://<api-domain>/api/health`
   - `GET https://<api-domain>/api/ready`

## Frontend (Northflank)
1. Build container using provided `Dockerfile` and `nginx.conf`.
2. Set environment variables:
   - `VITE_API_URL=https://<api-domain>/api`
3. Expose port 80 and enable SSL.
4. Map domain `MarketHeroSpotPro.ai`.

## DNS & SSL
- Add DNS records in registrar per Northflank + Render docs.
- Issue SSL certs (Let’s Encrypt) on both services.

## Admin Seeding
Run once after backend is live:
```
ADMIN_EMAIL=marketherospotpro@gmail.com ADMIN_NAME="MarketHeroSpotPro Admin" ADMIN_PASSWORD="MarketHero123!" node server/scripts/seed-admin.js
```

## CORS
Backend uses robust CORS. Configure allowed origins via:
- `FRONTEND_URL=https://marketherospotpro.ai`
- or `FRONTEND_URLS=https://marketherospotpro.ai,https://marketherospotpro.com`

## Health Checks
- `/api/health` returns service state
- `/api/ready` confirms DB connectivity

## Notes
- Keep AI fallback enabled until OpenAI key is provided.
- Add Terms/Privacy pages and link in footer.
- Confirm MongoDB Atlas backups and alerts.

---

## Quick Commands
```
# Local seed
cd server; $env:ADMIN_EMAIL="marketherospotpro@gmail.com"; $env:ADMIN_NAME="MarketHeroSpotPro Admin"; $env:ADMIN_PASSWORD="MarketHero123!"; node scripts/seed-admin.js

# Local start
cd server; node index.js
cd ..; npx vite
```
