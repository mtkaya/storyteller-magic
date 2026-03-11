# Privacy

Storyteller Magic is designed to keep the default experience simple and privacy-conscious.

## Core approach

- Local-first story generation is supported.
- If `VITE_STORY_GENERATION_MODE=local`, story generation can work without cloud story generation calls.
- Premium voice narration (`/api/tts`) and remote story generation require third-party APIs.

## What data may be stored locally

The app stores product state in the browser/app device local storage, including:

- child profiles
- favorites
- seen story history
- reading preferences
- reading stats and streaks
- subscription tier state used by the UI
- custom/generated stories saved locally by the app

This data is intended for on-device product behavior and personalization.

## What may be sent to third parties

Depending on configuration:

### 1) Story generation
If `hybrid` or `remote` generation is enabled, story prompts may be sent to the configured Gemini API via the backend proxy.

Typical request content may include:
- selected theme
- tone
- duration
- optional child name
- language
- interactive/non-interactive preference

### 2) Premium text-to-speech
If premium TTS is enabled and configured, narration text may be sent to OpenAI's TTS API through the backend proxy.

### 3) Local/browser fallback
If premium TTS is unavailable, the app can fall back to device/browser speech synthesis instead of cloud TTS.

## What is not intended

This project is not intended to collect sensitive personal information by default.
However, operators should avoid entering sensitive child data, medical information, passwords, or other confidential content into prompts or profiles.

## Operators / deployments

If you deploy Storyteller Magic publicly, you should:

- publish your own privacy notice
- clearly disclose which third-party APIs are enabled
- define retention/deletion behavior for any server-side logs
- configure `CORS_ALLOWED_ORIGINS` explicitly in production
- keep API keys server-side only

## Children and family products

If you commercialize or publicly distribute the app, review the legal/privacy requirements for your target market, especially for child-directed experiences.
That may include COPPA, GDPR / GDPR-K, or other local rules depending on where and how the app is offered.

## Contact / updates

This document describes the current repository behavior and may change as the product evolves.
