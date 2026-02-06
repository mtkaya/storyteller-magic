# CLAUDE.md - Storyteller Magic

## Project Overview

Storyteller Magic is an AI-powered children's storytelling web app. It lets kids browse a story library, create AI-generated stories (via Gemini API), read/listen to them, earn achievement badges, and has parental controls. The UI is a mobile-first dark-themed SPA designed for a max width of 430px.

## Tech Stack

- **Language**: TypeScript 5.8
- **Framework**: React 19 (functional components, hooks only)
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS 3 (loaded via CDN in `index.html`, not PostCSS)
- **Icons**: Material Symbols Outlined (Google Fonts CDN)
- **Fonts**: Plus Jakarta Sans (body), Manrope (display), Noto Serif (serif)
- **AI Backend**: Gemini API via `GEMINI_API_KEY` environment variable

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build via Vite
npm run preview   # Preview production build locally
```

## Project Structure

```
/
├── index.html          # HTML shell with Tailwind config and CDN imports
├── index.tsx           # React DOM entry point (StrictMode)
├── App.tsx             # Main router/controller, manages screen state
├── types.ts            # All TypeScript interfaces and enums
├── data.ts             # Static data: images, stories, badges, plans, languages
├── vite.config.ts      # Vite config (port 3000, Gemini env, @ alias)
├── tsconfig.json       # TS config (ES2022, bundler resolution, react-jsx)
├── components/
│   ├── BottomNav.tsx   # Tab bar for main sections
│   └── ParentalGate.tsx # Math-challenge modal to access parental settings
├── pages/
│   ├── Home.tsx        # Landing page with hero and recent stories
│   ├── CreateStory.tsx # Multi-step story wizard (theme → tone → generate → result)
│   ├── Reader.tsx      # Story reader with audio-style controls
│   ├── Library.tsx     # Searchable story grid
│   ├── Achievements.tsx # Badge/achievement display
│   ├── Settings.tsx    # Parental settings and preferences
│   └── Subscription.tsx # Subscription tier selection
└── package.json
```

## Architecture & Patterns

### Navigation
- No router library. Navigation is state-driven via `ScreenName` union type in `App.tsx`.
- `App.tsx` holds `currentScreen` state and passes `onNavigate` callbacks to pages.
- Bottom nav appears only on: `home`, `library`, `achievements`.

### State Management
- React `useState` hooks only. No Redux, Zustand, or Context API.
- All state is lifted to `App.tsx` or local to page components.

### Component Conventions
- All components are `React.FC<Props>` with typed prop interfaces.
- Pages live in `pages/`, reusable UI in `components/`.
- Props use `onBack`, `onNavigate`, `onComplete` naming for callbacks.

### Styling
- Tailwind utility classes exclusively. No CSS modules or styled-components.
- Custom theme colors defined in `index.html` Tailwind config:
  - `primary` (#ee8c2b) - orange accent
  - `secondary` (#7f13ec) - purple accent
  - `bg-dark` (#111121) - main background
  - `bg-card` (#1a1625) - card background
  - `accent-peach` (#ffb38a), `accent-lavender` (#9d9ade)
- Glassmorphism patterns: `bg-white/10`, `backdrop-blur`, `border-white/10`.
- Animations: `animate-pulse-slow`, `animate-spin-slow`.

### Data
- All static data (stories, badges, plans, languages, image URLs) in `data.ts`.
- Image assets are external URLs hosted on `lh3.googleusercontent.com`.
- Types for data models in `types.ts`: `Story`, `Badge`, `SubscriptionPlan`, `Language`, `ScreenName`, `CreateStep`.

## Environment Variables

Set `GEMINI_API_KEY` in `.env.local` for AI story generation. Vite exposes it as `process.env.GEMINI_API_KEY` and `process.env.API_KEY` via `define` in `vite.config.ts`.

## Key Conventions

- **No testing framework** is configured. No test files exist.
- **No linter/formatter** is configured (no ESLint, Prettier).
- **No CI/CD** pipelines. App deploys via Google AI Studio.
- **Path alias**: `@/*` maps to project root (configured in both `tsconfig.json` and `vite.config.ts`).
- **Module system**: ESM (`"type": "module"` in package.json).
- **HTML lang**: `tr` (Turkish) with `dark` class for Tailwind dark mode.
- **Mobile-first**: Container is `max-w-[430px] mx-auto` in `App.tsx`.

## Important Notes for AI Assistants

1. Tailwind config is in `index.html` via CDN `<script>` tag, not in a `tailwind.config.js` file. To add custom theme values, edit the inline config in `index.html`.
2. The `ParentalGate` component uses a simple math challenge (not a real auth system).
3. The `CreateStory` wizard currently simulates generation with a progress bar timer rather than making real API calls to Gemini.
4. All image URLs are hardcoded external links in `data.ts`. There are no local image assets.
5. The import map in `index.html` maps `react` and `react-dom` to `esm.sh` CDN, but Vite handles imports during development/build.
