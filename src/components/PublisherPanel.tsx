'use client';

import { useState } from "react";
import { Send } from "lucide-react";

const categories = ["defi", "gaming", "governance", "infra", "general"];

type Props = {
  enabled: boolean;
};

export function PublisherPanel({ enabled }: Props) {
  const [label, setLabel] = useState("");
  const [payload, setPayload] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [confidence, setConfidence] = useState(85);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const disabled = !enabled;

  const submit = async () => {
    if (disabled || loading) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/streams/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label,
          payload,
          category,
          confidence,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to publish");
      }

      setStatus(`Published ${data.dataId}`);
      setLabel("");
      setPayload("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-slate-950/60 p-6 text-white shadow-[0_25px_70px_rgba(2,6,23,0.85)]">
      <div className="absolute inset-0 opacity-50">
        <div className="pointer-events-none absolute -inset-6 bg-gradient-to-br from-cyan-400/10 via-transparent to-emerald-400/10 blur-3xl" />
      </div>
      <div className="relative space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Publisher panel
            </p>
            <h3 className="text-lg font-semibold">Publish a test signal</h3>
          </div>
          {disabled ? (
            <span className="rounded-full border border-amber-200/40 bg-amber-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-amber-100">
              Wallet required
            </span>
          ) : (
            <span className="rounded-full border border-emerald-200/40 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-emerald-100">
              Live
            </span>
          )}
        </div>
        <p className="text-sm text-white/70">
          Craft a payload and send it through the Somnia Data Streams publisher API.
          This uses your configured testnet wallet.
        </p>
      </div>
      <div className="relative mt-6 space-y-4">
        <input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="Label (ex: Flash Loan Alert)"
          className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
        />
        <textarea
          value={payload}
          onChange={(event) => setPayload(event.target.value)}
          placeholder='Payload (ex: {"amount":"4.2M","asset":"sUSDC"})'
          rows={4}
          className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.4em] text-white/50">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm capitalize text-white focus:border-cyan-300/70 focus:outline-none"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-xs uppercase tracking-[0.4em] text-white/50">
            Confidence
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
              <input
                type="range"
                min={40}
                max={100}
                value={confidence}
                onChange={(event) => setConfidence(Number(event.target.value))}
                className="h-1 w-full accent-emerald-300"
              />
              <span className="text-sm text-white">{confidence}%</span>
            </span>
          </label>
        </div>
        <button
          onClick={submit}
          disabled={disabled || loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
          {loading ? "Publishing…" : "Publish sample"}
        </button>
        {status && (
          <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            {status}
          </p>
        )}
      </div>
    </section>
  );
}

