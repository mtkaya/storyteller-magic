# Security

Thanks for helping improve Storyteller Magic.

## Supported scope

This repository includes:

- React/Vite frontend
- local/mobile app behavior via Capacitor
- backend proxy in `server/story-api.mjs`
- integrations for Gemini story generation and OpenAI TTS

## Security expectations

When deploying or operating this project:

- keep API keys out of the client bundle
- store secrets only in server-side env files / deployment secrets
- configure `CORS_ALLOWED_ORIGINS` explicitly in production
- leave `TRUST_PROXY=false` unless you are behind a trusted reverse proxy
- review rate limits before exposing public endpoints
- avoid logging sensitive prompt content unnecessarily

## Reporting vulnerabilities

If you find a security issue, please do not open a public exploit issue with secrets or reproduction data that could harm users.

Preferred approach:

1. Describe the issue clearly
2. Include affected files / routes
3. Include impact and realistic attack scenario
4. Include reproduction steps if safe
5. If needed, share sensitive details privately with the maintainer

## Areas worth reviewing

- `server/story-api.mjs`
- CORS handling
- rate limiting behavior
- prompt / input validation
- TTS and story generation proxy endpoints
- local storage usage for user/profile data
- mobile deployment configuration

## Third-party integrations

This project can depend on external AI providers. Security posture also depends on:

- provider key handling
- deployment environment
- reverse proxy / hosting setup
- mobile app packaging and distribution choices

## Hardening suggestions

Before production use, consider:

- structured server logging without sensitive payload dumps
- explicit origin allowlists
- secret rotation process
- monitoring for API abuse
- usage quotas / auth for public deployments
- privacy review for child-directed usage

## Disclosure philosophy

Please report responsibly and allow time for remediation before public disclosure.
