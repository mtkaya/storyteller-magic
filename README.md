# Storyteller Magic

Storyteller Magic is a React + TypeScript app for creating bedtime stories with AI, reading them with voice narration, and tracking child-friendly reading progress.

## Highlights

- AI story generation with Gemini (`gemini-1.5-flash`)
- Interactive "choose your own adventure" stories
- English and Turkish language support
- Built-in voice narration using browser Speech Synthesis
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
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Note: this is a client-side Vite variable. For production, prefer routing AI requests through a backend to avoid exposing provider keys in the client.

## Local Development

```bash
npm install
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

Run directly on a connected device/emulator:

```bash
npm run cap:run:ios
npm run cap:run:android
```

## npm Scripts

- `npm run dev`: start Vite dev server
- `npm run build`: build web app into `dist/`
- `npm run preview`: serve production build locally
- `npm run cap:sync`: sync web build/plugins into native projects
- `npm run build:mobile`: build + sync for mobile
- `npm run cap:open:ios`: open iOS project in Xcode
- `npm run cap:open:android`: open Android project in Android Studio
- `npm run cap:run:ios`: run app on iOS simulator/device
- `npm run cap:run:android`: run app on Android emulator/device

## Project Structure

```text
.
|- components/      # reusable UI pieces
|- context/         # app-wide state and localization
|- data/            # static story collections
|- pages/           # screen-level pages
|- services/        # AI generation, audio, notifications
|- android/         # Capacitor Android native project
|- ios/             # Capacitor iOS native project
|- App.tsx          # app shell + navigation flow
|- capacitor.config.ts
|- package.json
```

## Fallback Behavior

If Gemini is unavailable or times out, the app automatically shows a locally generated fallback story so the reading flow continues.
