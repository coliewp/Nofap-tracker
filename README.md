# 90 Day Streak Tracker

A single-page streak tracker with a real backend (Vercel serverless function + Vercel KV database), so your
progress is saved across devices and browsers — not just in one browser's local storage.

## What's in this project

- `index.html` — the whole frontend (grid, form, styling). No build step needed.
- `api/streak.js` — a serverless function that reads/writes your start date to the database.
- `package.json` — declares the one dependency (`@vercel/kv`).

This is a **single-user** app: it stores one shared start date, not per-account data. That's intentional —
it's meant for you to track your own streak from any device, not for multiple people to have separate streaks.
If you ever want multi-user support (e.g. share this with others, each with their own streak), that would need
a login system added on top — happy to help with that later if you want it.

## Deploy steps

### 1. Push to GitHub
Create a new GitHub repo and push these three items (`index.html`, `api/streak.js`, `package.json`) to it.

### 2. Import into Vercel
- Go to vercel.com → **Add New Project** → import your GitHub repo.
- Framework preset: leave as **Other** (no build step required).
- Click **Deploy**. It will deploy successfully, but the API won't work yet — you still need step 3.

### 3. Add a Vercel KV database
- In your Vercel project dashboard, go to the **Storage** tab.
- Click **Create Database** → choose **KV** (Redis, powered by Upstash).
- Once created, click **Connect Project** and select this project.
- This automatically adds the required environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) to
  your project — you don't need to copy/paste anything manually.

### 4. Redeploy
- Go to the **Deployments** tab and redeploy the latest deployment (so it picks up the new environment variables).
- Vercel gives you a live URL like `your-project.vercel.app` — bookmark that.

### 5. Use it
Open your Vercel URL, fill in the form, click **Start my journey**. From now on, opening that same URL from
your phone, laptop, or any browser will show the same live progress, because it's reading from the same
database — not from that one device's storage.

## Local development (optional)
If you want to run it locally before deploying:
```bash
npm install -g vercel
npm install
vercel dev
```
`vercel dev` runs both the static file and the API route locally, and will prompt you to link a KV database
(or you can point it at your deployed one) so the API calls work.

## Costs
Vercel KV's free tier (Hobby plan) comfortably covers a single personal tracker like this — you're looking at
a handful of reads/writes a day at most.
