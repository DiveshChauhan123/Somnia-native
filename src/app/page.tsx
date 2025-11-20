import Link from "next/link";
import { SchemaCard } from "@/components/SchemaCard";
import { StreamWorkspace } from "@/components/StreamWorkspace";
import { env } from "@/lib/env";

const heroStats = [
  { label: "Stream latency", value: "< 400ms" },
  { label: "Schemas hot-swapped", value: "100% type-safe" },
  { label: "Publisher mode", value: "Wallet gated" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob aurora-blob--cyan -left-20 top-0" />
        <div className="aurora-blob aurora-blob--violet right-0 top-40" />
      </div>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-8 py-12 shadow-[var(--shadow-neon)]">
          <div className="celestial-noise" aria-hidden />
          <div className="absolute inset-0 opacity-60 blur-3xl">
            <div className="pointer-events-none absolute inset-10 rounded-[28px] border border-white/10" />
          </div>
          <div className="relative flex flex-col gap-10">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.5em] text-white/70">
              <span className="rounded-full border border-white/20 px-3 py-1 text-white/80">
                Somnia Data Streams
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-white/80">
                App Router
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-white/80">
                Live SDK
              </span>
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/70">
                Reactive, Somnia-native dashboards
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                Stream every on-chain insight into a cinematic cockpit
              </h1>
              <p className="text-lg text-white/80 md:max-w-3xl">
                The Somnia Stream Agent pairs a Node-native SSE bridge with a
                glassmorphic control room. Switch between mock data and your own
                RPC, publish structured payloads, and showcase analytics that
                pulse with every event.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/70 shadow-lg shadow-black/40"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#workspace"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_15px_40px_rgba(45,212,191,0.35)] transition hover:opacity-90"
              >
                Launch workspace
                <span aria-hidden="true">↗</span>
              </Link>
              <a
                href="https://docs.somnia.build/streams"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                View SDS docs
              </a>
            </div>
          </div>
        </section>

        <section id="workspace" className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-cyan-400/10 via-transparent to-emerald-400/10 blur-3xl" />
          <StreamWorkspace publisherEnabled={env.isPublisherConfigured} />
        </section>

        <SchemaCard schema={env.SOMNIA_DEFAULT_SCHEMA} />

        <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-slate-900/40 to-black/40 p-8 text-white shadow-[var(--shadow-neon)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Ship it</h2>
              <p className="text-white/70">
                Ready for hackathons, demo days, or live ops dashboards.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-emerald-200/80">
              <span className="rounded-full border border-emerald-200/40 px-3 py-1">
                Node 18+
              </span>
              <span className="rounded-full border border-emerald-200/40 px-3 py-1">
                Testnet wallet
              </span>
            </div>
          </div>
          <ul className="mt-6 space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-emerald-300">01</span>
              <p>
                Update `.env.local` with your Somnia RPC endpoint, publisher
                wallet, and schema definition. Keep secrets server-side.
              </p>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-emerald-300">02</span>
              <p>
                Run `npm run dev` for local dashboards or `npm run build && npm
                run start` to serve production bundles.
              </p>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-emerald-300">03</span>
              <p>
                Use the publisher panel to push structured events and verify
                them on the Somnia explorer.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

