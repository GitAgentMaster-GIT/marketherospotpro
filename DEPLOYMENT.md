# MarketHeroSpotPro Deployment Guide

## Backend on Render
- Create `api-markethero` Web Service from repo `GitAgentMaster-GIT/marketherospotpro`.
- Build: `npm --prefix server install`; Start: `node server/index.js`.
- Health check: `/api/health`; Auto-deploy: enabled.
- Env vars:
  - NODE_ENV=production
  - PORT=10000 (Render default ok)
  - MONGODB_URI=your Atlas URI
  - JWT_SECRET=long random string
  - JWT_EXPIRE=7d
  - FRONTEND_URLS=https://marketherospotpro.ai,https://marketherospotpro.com,https://<northflank-app>.northflank.app
  - OPENAI_API_KEY=optional

## Frontend on Northflank
- Build from repo using Dockerfile (Vite) and `nginx.conf` for SPA.
- Env var: VITE_API_URL=https://<render-service>.onrender.com
- Attach domain `marketherospotpro.ai` (and `.com` later); enable SSL.

## Admin Seeding (Production)
- Render Shell: run `node server/scripts/seed-admin.js` with env set.
- Admin email: marketherospotpro@gmail.com; note generated password or set one.

## CORS & URLs
- Backend reads `FRONTEND_URLS` (comma list) and enforces CORS.
- Update with Northflank default domain, then replace with custom domains post-DNS.

## Smoke Tests
- Backend: GET /api/health; POST /api/auth/register; POST /api/auth/login; GET /api/me.
- Frontend: login/register; protected routes; create campaign; list leads; AI generation (fallback if no key).

## Troubleshooting
- 401s: confirm `VITE_API_URL` and JWT stored; check axios interceptor.
- CORS: ensure `FRONTEND_URLS` matches exact origins (scheme + host + optional port).
- DB: verify `MONGODB_URI` connectivity; check Render logs.
