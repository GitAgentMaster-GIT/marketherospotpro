# Marketing Hero Server

## Environment Variables
- `PORT`: default `10000` (Render assigns dynamically; app uses `process.env.PORT`).
- `NODE_ENV`: `production` for production builds.
- `MONGODB_URI`: MongoDB Atlas connection string.
- `JWT_SECRET`: long random string.
- `JWT_EXPIRE`: token lifetime, e.g. `7d`.
- `FRONTEND_URLS`: comma-separated allowed origins for CORS (scheme + host + optional port).
- `OPENAI_API_KEY` (optional): enables AI features.

See `.env.example` for a template.

## Health & Readiness
- `GET /api/health`  service up.
- `GET /api/ready`  dependencies ready (DB, config).

## Admin Seeding
Run once in production to create/update admin:
```bash
node server/scripts/seed-admin.js
```
Ensure `MONGODB_URI` and `JWT_SECRET` are set.

## Local Development
```bash
npm --prefix server install
node server/index.js
```
Default backend: `http://localhost:10000`.

## Smoke Test Script
Use `scripts/smoke-test.js` to verify health endpoints:
```bash
node server/scripts/smoke-test.js --url=https://<render-service>.onrender.com
```
