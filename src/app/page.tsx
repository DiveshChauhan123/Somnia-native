import { SchemaCard } from "@/components/SchemaCard";
import { StreamWorkspace } from "@/components/StreamWorkspace";
import { env } from "@/lib/env";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#04192c] to-[#030712] text-white">
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/20 via-emerald-400/10 to-transparent p-10 shadow-2xl shadow-black/40">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Somnia Data Streams · Hackathon
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Build reactive apps with the Somnia Stream Agent
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/80">
            This reference implementation wires the Somnia Data Streams SDK into
            a responsive dashboard. Subscribe to live schema data, publish test
            payloads, and ship experiences that react on-chain in milliseconds.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/25 px-3 py-1 text-white/80">
              Real-time UX
            </span>
            <span className="rounded-full border border-white/25 px-3 py-1 text-white/80">
              SDK + Somnia Testnet
            </span>
            <span className="rounded-full border border-white/25 px-3 py-1 text-white/80">
              Reactive prototype
            </span>
          </div>
        </section>

        <StreamWorkspace publisherEnabled={env.isPublisherConfigured} />

        <SchemaCard schema={env.SOMNIA_DEFAULT_SCHEMA} />

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80 shadow-2xl shadow-black/30">
          <h2 className="text-2xl font-semibold text-white">Ship it</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
            <li>
              Update `.env.local` with your Somnia RPC endpoint, publisher wallet
              and schema definition.
            </li>
            <li>
              Run `npm run dev` for local dashboards or `npm run build && npm run
              start` for deployment.
            </li>
            <li>
              Use the publisher panel to push structured events and verify them
              on the Somnia explorer.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

