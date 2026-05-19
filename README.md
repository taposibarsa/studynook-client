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

- **Client:** Vercel — set `NEXT_PUBLIC_API_URL` to your deployed API URL.
- **Server:** Render (or similar) — set `CLIENT_URL` to your Vercel URL and configure MongoDB, JWT, and Google OAuth env vars.

After deploying, update the live site URL at the top of this README.
