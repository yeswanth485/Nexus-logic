# Nexus Logix — Split Architecture

A full-stack logistics intelligence platform split into:

| Folder | Purpose | Deploy Target |
|--------|---------|--------------|
| `frontend/` | React + Vite + Tailwind SPA | **Vercel** |
| `backend/` | Express + CORS REST API | **Render** |
| `database/` | Firestore schema & security rules | Firebase Console |

---

## Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev            # starts on http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:3000
npm run dev            # starts on http://localhost:5173
```

---

## Deployment

### Backend → Render
1. Push `backend/` to a GitHub repo.
2. Create a new **Web Service** on Render.
3. **Build Command:** `npm install && npm run build`
4. **Start Command:** `npm start`
5. Add environment variables from `backend/.env.example`.

### Frontend → Vercel
1. Push `frontend/` to a GitHub repo.
2. Import project on Vercel.
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Add `VITE_API_URL` = your Render backend URL.

---

## Environment Variables Summary

| Variable | Where | Description |
|----------|-------|-------------|
| `PORT` | Render | Auto-set by Render |
| `FRONTEND_URL` | Render | Your Vercel URL (for CORS) |
| `GEMINI_API_KEY` | Both | Gemini AI API key |
| `FIREBASE_*` | Render | Firebase Admin credentials |
| `VITE_API_URL` | Vercel | Your Render backend URL |
| `VITE_FIREBASE_*` | Vercel | Firebase client config |
