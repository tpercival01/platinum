# Project Onyx - Xbox Achievement Tracker (Frontend)

Live site: https://onyx.thomaspercival.dev/

Frontend Repo: https://github.com/tpercival01/Project-Onyx-API

Onyx is a sleek, dark-themed web application that brings the PlayStation "Platinum Trophy" experience to Xbox Live. It allows users to search their Gamertag, view their entire game library, and earn Bronze, Silver, Gold, and "Onyx" (100% completion) coins based on their achievement progress.

This repository contains the **Frontend** presentation layer. It operates on a read-heavy, cache-first architecture, querying a Neon Serverless PostgreSQL database to render the UI instantly, while offloading external API communication to a decoupled Python microservice.

## 🚀 Tech Stack
* **Framework:** Next.js 15 (App Router, Server Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Custom "Sith/Mystic" Dark Mode Aesthetic)
* **ORM:** Drizzle ORM
* **Deployment:** Vercel

## 🏗️ Architectural Decisions
1. **Decoupled Backend for Frontend (BFF):** To bypass strict external rate limits from the Xbox API, this Next.js app does *not* talk to Xbox directly. Instead, it signals a Python/Celery backend to fetch data in the background, and polls the PostgreSQL database for UI updates.
2. **Server Components:** Heavy database queries (using Drizzle) are executed entirely on the server, shipping zero JavaScript to the client for the main game grid.
3. **Idempotent UI:** The frontend aggregates raw Gamerscore and achievement data on the fly to calculate Coin distribution (Bronze < 40G, Silver 40-79G, Gold 80G+, Onyx = 100% Completion).

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```text
# Your Neon Serverless Postgres Connection String
DATABASE_URL=postgresql://[user]:[password]@[host]/[dbname]?sslmode=require

# The URL of your FastAPI Sync Engine
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Database Schema
Ensure your database is up to date with the Drizzle schema:
```bash
npx drizzle-kit push
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
