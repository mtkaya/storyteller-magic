# Storyteller Magic

Storyteller Magic is a React + TypeScript app for creating bedtime stories with AI, reading them with voice narration, and tracking child-friendly reading progress.

## Highlights

- Local-first story generation (zero-token cost by default) with optional Gemini (`gemini-1.5-flash`)
- Interactive "choose your own adventure" stories
- Expanded local story vault (~160 stories) with rotation to reduce repeats
- Expanded interactive branching (detours + extra choices per node)
- English and Turkish language support
- Premium voice narration via OpenAI TTS (`/api/tts`) with browser Speech Synthesis fallback
- Profiles, favorites, badges, streaks, and parent-oriented stats
- Daily reading limits and parental gate flow
- Mobile-ready setup with Capacitor (iOS + Android folders included)

## Trust & Operations

- [Privacy](./PRIVACY.md)
- [Security](./SECURITY.md)

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
# Optional security controls (recommended in production):
# TRUST_PROXY=false
# CORS_ALLOWED_ORIGINS=https://yourapp.com,https://www.yourapp.com
# Optional TTS tuning:
# OPENAI_TTS_MODEL=gpt-4o-mini-tts
# OPENAI_TTS_VOICE=alloy
# OPENAI_TTS_VOICE_TR=alloy
# OPENAI_TTS_VOICE_EN=alloy
# OPENAI_TTS_FORMAT=mp3
VITE_STORY_API_URL=
# Optional: story generation strategy (`local`, `hybrid`, `remote`)
# VITE_STORY_GENERATION_MODE=local
# Optional: force illustrated covers (default false)
# VITE_ILLUSTRATION_ONLY_MODE=true
# Optional: force one illustration technique globally
# VITE_ILLUSTRATION_STYLE_OVERRIDE=
```

- `GEMINI_API_KEY` is read only by the backend proxy (`server/story-api.mjs`).
- `OPENAI_API_KEY` enables premium TTS (`/api/tts`). If missing, app uses browser voices automatically.
- `TRUST_PROXY` controls whether `x-forwarded-for`/`x-real-ip` headers are trusted for rate limiting. Keep `false` unless you are behind a trusted reverse proxy.
- `CORS_ALLOWED_ORIGINS` is a comma-separated allowlist for browser origins. Set this explicitly in production.
- See [PRIVACY.md](./PRIVACY.md) and [SECURITY.md](./SECURITY.md) before public deployment.
- `VITE_STORY_API_URL` is optional. Leave empty if frontend and backend share the same domain.
- `VITE_STORY_GENERATION_MODE` controls generation path:
  - `local` (default): uses built-in story pool and local composition only
  - `hybrid`: tries Gemini first, falls back to local story pool
  - `remote`: always uses Gemini API
- For mobile builds, set `VITE_STORY_API_URL` to your deployed backend URL (for example `https://api.example.com`).
- `VITE_ILLUSTRATION_ONLY_MODE` controls cover style. Default is original story images (`false`). Set `true` for illustration-only mode.
- `VITE_ILLUSTRATION_STYLE_OVERRIDE` optionally locks one visual technique globally (`watercolor`, `gouache`, `flat-storybook`, `cut-paper`).

## Local Development

Install dependencies:

```bash
npm install
```

Single-command dev workflow:

```bash
npm run dev:all
```

This starts both:
- the API proxy at `http://localhost:8787`
- the frontend at `http://localhost:3000`

If you prefer separate terminals:

Terminal 1 (API proxy):

```bash
npm run dev:api
```

Terminal 2 (frontend):

```bash
npm run dev
```

Default frontend dev server: `http://localhost:3000`

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
- `npm run dev:all`: start both frontend + API in one terminal
- `npm run typecheck`: run TypeScript checks
- `npm run build`: build web app into `dist/`
- `npm run preview`: serve production build locally
- `npm run smoke`: run quick health checks (typecheck + build + data integrity)
- `npm run smoke:full`: run smoke + API endpoint checks (`SMOKE_API=1`)
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

By default (`VITE_STORY_GENERATION_MODE=local`), stories are produced from the built-in story pool without API calls.
In `hybrid` mode, Gemini is used when available and local generation takes over on errors/timeouts.
In `remote` mode, Gemini failures still fall back to a local emergency story so the reading flow continues.
If OpenAI TTS is unavailable or not configured, the reader falls back to browser Speech Synthesis.

## Free Background Music

Background music now works in two layers:

1. Built-in procedural ambient loops (always available, royalty-free)
2. Optional local music files under `public/audio` (if you provide them)

If a file is missing or cannot be decoded, the app automatically falls back to built-in loops.

Optional file names:

- `public/audio/lullaby-light.mp3`
- `public/audio/starlight-piano.mp3`
- `public/audio/soft-rain.mp3`
- `public/audio/forest-night.mp3`
- `public/audio/ocean-waves.mp3`
- `public/audio/warm-fireplace.mp3`
- `public/audio/gentle-wind.mp3`

Openverse sync (auto-download + attribution files):

```bash
npm run audio:sync
```

Force refresh existing local tracks:

```bash
npm run audio:sync:force
```

Optional API base override:

```bash
OPENVERSE_API_BASE_URL=https://api.openverse.engineering/v1/audio/ npm run audio:sync
```

After sync, attribution files are generated automatically:

- `public/audio/openverse-attribution.json`
- `public/audio/openverse-attribution.md`

Recommended free sources (commercial-use friendly when properly attributed/licensed):

- Pixabay Music
- FreePD
- OpenGameArt (filter by CC0 / Public Domain)

Suggested prep chain (keeps bedtime mixes soft and consistent):

```bash
ffmpeg -i input.mp3 -af "loudnorm=I=-24:LRA=7:TP=-2,highpass=f=60,lowpass=f=5200,acompressor=threshold=-21dB:ratio=2.5:attack=20:release=220" -ar 44100 -ac 2 output.mp3
```

In-app mix tips:

- Keep background music around `0.18-0.30`
- Narration should stay louder than music (`~8-10 dB` difference)
- Use tracks with sparse mids to avoid masking spoken words

## API Guardrails

- `/api/generate-story` and `/api/tts` share IP-based rate limiting (`20` requests per minute per IP).
- Story API caches identical prompt responses for `10` minutes (in memory) to reduce repeated Gemini calls.
- CORS is origin-allowlist based (`CORS_ALLOWED_ORIGINS`), and proxy IP headers are opt-in only (`TRUST_PROXY=true`).

## Art Direction

- Illustration prompt pack: `docs/illustration-prompts.md`
- Result screen now includes a ready-to-copy illustration cover prompt.
- Covers now auto-tune technique by theme and detail level by age range.

## Program Design

- Product and content flow plan: `docs/program-kurgusu-v2.md`
- Local story-vault architecture: `docs/story-vault.md`
