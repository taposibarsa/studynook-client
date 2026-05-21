# StudyNook

**StudyNook** is a library study room booking platform. Browse quiet study spaces, book hourly slots, and list your own room to earn.

**Live site:** _Add your Vercel URL here after deployment_

## Features

- Browse and search study rooms with amenity filters and hourly rate ranges
- Book rooms by date and time with automatic conflict detection and live cost calculation
- List, edit, and delete your own study rooms from a personal dashboard
- Secure JWT authentication with HTTP-only cookies and Google sign-in
- Dark and light theme with a responsive layout for mobile, tablet, and desktop

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Express API backend ([studynook-server](https://github.com/taposibarsa/studynook-server))

## Local development

1. Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to your API (default `http://localhost:5000`).
2. Start the [server](../studynook-server) with MongoDB configured.
3. Install and run the client:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

- **Client (frontend):** Vercel — set `NEXT_PUBLIC_API_URL` to your deployed API URL (e.g. `https://studynook-server-kappa.vercel.app`). The client proxies `/api/backend/*` to the server; auth runs entirely on the server.
- **Server (API + auth):** Vercel/Render — set `CLIENT_URL` to your Vercel client URL, `MONGODB_URI`, `JWT_SECRET`, and Google OAuth vars. Set `GOOGLE_CALLBACK_URL` to `{CLIENT_URL}/api/backend/auth/google/callback` (this is the default if `GOOGLE_CALLBACK_URL` is omitted).

After deploying, update the live site URL at the top of this README.
