# Storyteller Magic

Storyteller Magic is a React + TypeScript app for creating bedtime stories with AI, reading them with voice narration, and tracking child-friendly reading progress.

## Highlights

- AI story generation with Gemini (`gemini-1.5-flash`)
- Interactive "choose your own adventure" stories
- English and Turkish language support
- Premium voice narration via OpenAI TTS (`/api/tts`) with browser Speech Synthesis fallback
- Profiles, favorites, badges, streaks, and parent-oriented stats
- Daily reading limits and parental gate flow
- Mobile-ready setup with Capacitor (iOS + Android folders included)

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Capacitor 8 (`@capacitor/ios`, `@capacitor/android`)

## Prerequisites

- Node.js 20+
- npm 10+

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
# Optional TTS tuning:
# OPENAI_TTS_MODEL=gpt-4o-mini-tts
# OPENAI_TTS_VOICE=alloy
# OPENAI_TTS_FORMAT=mp3
VITE_STORY_API_URL=
# Optional: force illustrated covers (default true)
# VITE_ILLUSTRATION_ONLY_MODE=true
```

- `GEMINI_API_KEY` is read only by the backend proxy (`server/story-api.mjs`).
- `OPENAI_API_KEY` enables premium TTS (`/api/tts`). If missing, app uses browser voices automatically.
- `VITE_STORY_API_URL` is optional. Leave empty if frontend and backend share the same domain.
- For mobile builds, set `VITE_STORY_API_URL` to your deployed backend URL (for example `https://api.example.com`).
- `VITE_ILLUSTRATION_ONLY_MODE` controls cover style. Default is illustration-first (`true`) to avoid photo-real covers.

## Local Development

Install dependencies:

```bash
npm install
```

Terminal 1 (API proxy):

```bash
npm run dev:api
```

Terminal 2 (frontend):

```bash
npm run dev
```

Default dev server: `http://localhost:3000`

## Build

```bash
npm run build
npm run preview
```

## Mobile (Capacitor)

Build web assets and sync native projects:

```bash
npm run build:mobile
```

Open native IDE projects:

```bash
npm run cap:open:ios
npm run cap:open:android
```

One command for iOS build + sync + open Xcode:

```bash
npm run ios:ready
```

Run directly on a connected device/emulator:

```bash
npm run cap:run:ios
npm run cap:run:android
```

## npm Scripts

- `npm run dev`: start Vite dev server
- `npm run dev:api`: run Node backend proxy at `http://localhost:8787`
- `npm run build`: build web app into `dist/`
- `npm run preview`: serve production build locally
- `npm run cap:sync`: sync web build/plugins into native projects
- `npm run build:mobile`: build + sync for mobile
- `npm run cap:open:ios`: open iOS project in Xcode
- `npm run cap:open:android`: open Android project in Android Studio
- `npm run cap:run:ios`: run app on iOS simulator/device
- `npm run cap:run:android`: run app on Android emulator/device
- `npm run ios:ready`: build web app, sync Capacitor, and open iOS project

## Project Structure

```text
.
|- components/      # reusable UI pieces
|- context/         # app-wide state and localization
|- data/            # static story collections
|- pages/           # screen-level pages
|- services/        # AI generation, audio, notifications
|- server/          # backend proxy for Gemini story + OpenAI TTS APIs
|- android/         # Capacitor Android native project
|- ios/             # Capacitor iOS native project
|- App.tsx          # app shell + navigation flow
|- capacitor.config.ts
|- package.json
```

## Fallback Behavior

If Gemini is unavailable or times out, the app automatically shows a locally generated fallback story so the reading flow continues.
If OpenAI TTS is unavailable or not configured, the reader falls back to browser Speech Synthesis.

## API Guardrails

- `/api/generate-story` and `/api/tts` share IP-based rate limiting (`20` requests per minute per IP).
- Story API caches identical prompt responses for `10` minutes (in memory) to reduce repeated Gemini calls.

## Art Direction

- Illustration prompt pack: `docs/illustration-prompts.md`
- Result screen now includes a ready-to-copy illustration cover prompt.
