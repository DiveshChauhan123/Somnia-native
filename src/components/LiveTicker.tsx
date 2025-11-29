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
            "rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-4 text-sm text-white shadow-lg shadow-black/20",
          )}
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/70">
            <span>{event.category}</span>
            <time>{new Date(event.timestamp).toLocaleTimeString()}</time>
          </div>
          <h3 className="mt-2 text-lg font-semibold">{event.label}</h3>
          <p className="text-white/80">{truncate(event.payload, 160)}</p>
          <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-wide text-emerald-300/90">
            <span>Confidence {event.confidence}%</span>
            {event.txHash && (
              <a
                href={`https://explorer.somnia.network/tx/${event.txHash}`}
                target="_blank"
                className="text-cyan-200 hover:underline"
              >
                View tx
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

const truncate = (value: string, max = 120) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}…`;
};

