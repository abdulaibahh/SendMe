# SendMe

Fresh Market Delivery to Your Doorstep.

SendMe is an Expo React Native application for grocery and market delivery in Sierra Leone. Phase 1 creates the clean Node/Expo foundation, environment examples, app identity, router entry point, and local tooling scripts. Later phases add the Supabase schema, authentication, customer ordering, rider workflow, admin operations, Firebase notifications, tests, and Google Play release documents.

## Project Layout

- `mobile_app`: Expo React Native app.
- `supabase`: Database migrations, seed data, policies, and edge functions.
- `firebase`: Firebase setup notes and configuration placeholders.
- `playstore`: Google Play listing, privacy, data safety, and release docs.
- `docs`: Architecture, setup, testing, and deployment guides.

## Phase 1 Commands

Run from `sendme/mobile_app`:

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run start:clear
```

The local scripts call project-local tools directly because the current Windows `npx` shim points to a missing global npm CLI path.
