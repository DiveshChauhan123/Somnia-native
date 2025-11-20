'use client';

import type { StreamDatum } from "@/types/streams";

type Props = {
  events: StreamDatum[];
};

export function EventsTable({ events }: Props) {
  if (!events.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Waiting for stream events…
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-slate-950/60 text-white shadow-[0_30px_90px_rgba(2,6,23,0.9)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <table className="min-w-full text-sm">
        <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.4em] text-white/60">
          <tr>
            <th className="px-5 py-4">Label</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Confidence</th>
            <th className="px-5 py-4">Timestamp</th>
          </tr>
        </thead>
        <tbody className="text-white/90">
          {events.slice(0, 8).map((event, index) => (
            <tr
              key={event.id}
              className="group border-t border-white/5 bg-transparent transition hover:bg-white/5"
            >
              <td className="relative px-5 py-4">
                <span className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-cyan-400/60 to-emerald-300/60 opacity-0 transition group-hover:opacity-100" />
                <div>
                  <p className="font-medium">{event.label}</p>
                  <p className="text-xs text-white/60">#{index + 1}</p>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                  {event.category}
                </span>
              </td>
              <td className="px-5 py-4 text-emerald-200">{event.confidence}%</td>
              <td className="px-5 py-4">
                {new Date(event.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

