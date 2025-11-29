'use client';

import { Activity, GaugeCircle, Layers3 } from "lucide-react";

type Props = {
  total: number;
  averageConfidence: number;
  categories: Record<string, number>;
};

export function InsightsGrid({
  total,
  averageConfidence,
  categories,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white shadow-lg shadow-black/20">
        <div className="flex items-center gap-2 text-white/70">
          <Activity className="h-4 w-4" />
          Live Events
        </div>
        <p className="mt-3 text-3xl font-semibold">{total}</p>
        <p className="text-sm text-white/70">Buffered samples</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white shadow-lg shadow-black/20">
        <div className="flex items-center gap-2 text-white/70">
          <GaugeCircle className="h-4 w-4" />
          Avg. Confidence
        </div>
        <p className="mt-3 text-3xl font-semibold">{averageConfidence}%</p>
        <p className="text-sm text-white/70">On latest feed</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white shadow-lg shadow-black/20">
        <div className="flex items-center gap-2 text-white/70">
          <Layers3 className="h-4 w-4" />
          Categories
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {Object.entries(categories).length === 0 && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/70">
              Waiting…
            </span>
          )}
          {Object.entries(categories).map(([name, count]) => (
            <span
              key={name}
              className="rounded-full bg-white/10 px-3 py-1 text-white/90"
            >
              {name} · {count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

