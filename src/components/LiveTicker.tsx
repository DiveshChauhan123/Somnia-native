'use client';

import type { StreamDatum } from "@/types/streams";
import { cn } from "@/lib/utils";

type Props = {
  events: StreamDatum[];
};

export function LiveTicker({ events }: Props) {
  if (!events.length) {
    return (
      <div className="h-32 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
        Waiting for first on-chain signal…
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.slice(0, 5).map((event) => (
        <article
          key={event.id}
          className={cn(
            "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-transparent p-5 text-sm text-white shadow-[0_25px_70px_rgba(2,6,23,0.9)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40",
          )}
        >
          <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-emerald-300/20 blur-2xl" />
          </div>
          <div className="absolute inset-px rounded-[26px] border border-white/5 opacity-60" aria-hidden />
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/70">
            <span className="rounded-full border border-white/15 px-2 py-1 text-[10px] tracking-[0.4em] text-white/60">
              {event.category}
            </span>
            <time className="text-cyan-100">
              {new Date(event.timestamp).toLocaleTimeString()}
            </time>
          </div>
          <h3 className="mt-2 text-lg font-semibold">{event.label}</h3>
          <p className="text-white/80">{truncate(event.payload, 160)}</p>
          <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.4em] text-emerald-200/90">
            <span>Confidence {event.confidence}%</span>
            {event.txHash && (
              <a
                href={`https://explorer.somnia.network/tx/${event.txHash}`}
                target="_blank"
                className="text-cyan-200 underline-offset-4 transition hover:text-white"
              >
                View tx
              </a>
            )}
          </div>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40" />
        </article>
      ))}
    </div>
  );
}

const truncate = (value: string, max = 120) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}…`;
};

