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
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-white shadow-xl shadow-black/30">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-white/60">
          <tr>
            <th className="px-4 py-3">Label</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Confidence</th>
            <th className="px-4 py-3">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {events.slice(0, 8).map((event) => (
            <tr
              key={event.id}
              className="border-t border-white/5 text-white/90 hover:bg-white/5"
            >
              <td className="px-4 py-3">{event.label}</td>
              <td className="px-4 py-3">{event.category}</td>
              <td className="px-4 py-3">{event.confidence}%</td>
              <td className="px-4 py-3">
                {new Date(event.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

