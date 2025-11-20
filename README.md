# Somnia Stream Agent

A hackathon-ready Somnia Data Streams (SDS) reference that turns on-chain data into a live, reactive dashboard. It highlights how to subscribe to SDS schemas, surface real-time UX, and publish structured payloads back to Somnia Testnet.

## Why It Matters
- **Technical excellence** – TypeScript + Next.js App Router, Tailwind, SDS SDK, SSE bridge, publisher API, schema visualizer.
- **Real-time UX** – Client hook maintains an EventSource buffer, renders live ticker + analytics cards + table.
- **Somnia-native** – Targets `dream-rpc.somnia.network`, encodes schemas with `SchemaEncoder`, optional publisher wallet for `streams.set`.
- **Impact potential** – Acts as a boilerplate for real-time DeFi monitors, gaming HUDs, governance command centers, etc.

## Stack
- Next.js 15 (App Router, RSC, TypeScript)
- Tailwind CSS with custom gradient system
- Somnia SDK `@somnia-chain/streams` + `viem`
- Server-Sent Events (SSE) for live updates with mock fallback
- Zustand-free lightweight React state via custom hooks

## Getting Started
1. **Install deps**
   ```bash
   npm install
   ```
2. **Configure environment**
   ```bash
   cp .env.example .env.local
   # fill with your Somnia RPC + funded testnet wallet
   ```
   Required keys:
   - `SOMNIA_RPC_URL` – usually `https://dream-rpc.somnia.network`
   - `SOMNIA_CHAIN_ID` – Somnia Testnet (update when official id changes)
   - `SOMNIA_PRIVATE_KEY` – publisher wallet (kept server-side only)
   - `SOMNIA_PUBLISHER` – wallet address for attribution
   - `SOMNIA_DEFAULT_SCHEMA` – comma-separated schema definition; defaults to timestamp + publisher + label + payload + confidence.
   - `NEXT_PUBLIC_ENABLE_MOCK_STREAM` – set to `false` to require a real RPC connection.
3. **Run locally**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to watch the mock SDS feed. Once env vars are set, the SSE bridge auto-switches to real Somnia data.
4. **Production build**
   ```bash
   npm run build && npm run start
   ```

## Architecture
- `app/api/streams/live` – Node runtime route that opens an SDS subscription (or mocked generator) and streams JSON payloads over SSE.
- `app/api/streams/publish` – Validates input with Zod, encodes schema data, and invokes `sdk.streams.set` when a publisher wallet is configured.
- `hooks/useLiveStream` – Client hook that connects to the SSE endpoint, maintains a bounded buffer, aggregates stats, and surfaces connection state.
- UI blocks (`ConnectionBadge`, `LiveTicker`, `InsightsGrid`, `EventsTable`, `PublisherPanel`, `SchemaCard`) compose the UX inside `StreamWorkspace`.
- `lib/somnia/*` – SDK bootstrap, schema helpers, publisher utilities, and subscription mapping logic.
- `lib/mock/events` – Deterministic fallback generator so the UI remains demonstrable without private keys.

## Shipping Checklist
- Update `.env.local` with your schema + Somnia credentials.
- Optional: adjust `STREAM_SCHEMA_DEFINITION` or extend `PublisherPanel` to capture extra fields.
- Deploy via Vercel, Somnia-aligned infra, or any Node 18 host.
- Share screenshots + demo video to highlight the reactive user journey.

## Testing & Next Steps
- `npm run lint` to keep the project tidy (ESLint + Next defaults).
- Extend SSE route with filters (`?category=defi`).
- Add persistence (e.g., Supabase) to snapshot historical stream data.
- Connect multiple schemas to showcase composability.

Happy building – see you on the Somnia Data Streams leaderboard! 🚀
