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
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Publish a test signal</h3>
        {disabled && (
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs uppercase tracking-wide text-amber-200">
            wallet required
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-white/70">
        Craft a payload and send it through the Somnia Data Streams publisher
        API. This uses your configured testnet wallet.
      </p>
      <div className="mt-4 space-y-3">
        <input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="Label (ex: Flash Loan Alert)"
          className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-300/60 focus:outline-none"
        />
        <textarea
          value={payload}
          onChange={(event) => setPayload(event.target.value)}
          placeholder='Payload (ex: {"amount":"4.2M","asset":"sUSDC"})'
          rows={4}
          className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-300/60 focus:outline-none"
        />
        <div className="flex flex-wrap gap-3 text-sm">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="flex-1 rounded-2xl border border-white/20 bg-white/5 px-4 py-3"
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label className="flex flex-1 flex-col gap-1 text-white/80">
            Confidence: {confidence}%
            <input
              type="range"
              min={40}
              max={100}
              value={confidence}
              onChange={(event) => setConfidence(Number(event.target.value))}
            />
          </label>
        </div>
        <button
          onClick={submit}
          disabled={disabled || loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 py-3 text-sm font-semibold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
          {loading ? "Publishing…" : "Publish sample"}
        </button>
        {status && (
          <p className="text-xs text-white/70">
            {status}
          </p>
        )}
      </div>
    </section>
  );
}

