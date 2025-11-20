'use client';

import { Activity, GaugeCircle, Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const cards = [
    {
      label: "Live events",
      value: total,
      subcopy: "Buffered samples",
      icon: Activity,
      accent: "from-cyan-400/30 to-sky-500/10",
    },
    {
      label: "Avg. confidence",
      value: `${averageConfidence}%`,
      subcopy: "On latest feed",
      icon: GaugeCircle,
      accent: "from-emerald-400/30 to-teal-500/10",
    },
    {
      label: "Categories",
      value: `${Object.keys(categories).length || "—"}`,
      subcopy: "Detected types",
      icon: Layers3,
      accent: "from-indigo-400/30 to-fuchsia-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(({ label, value, subcopy, icon: Icon, accent }, index) => (
        <div
          key={label}
          className={cn(
            "group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-white shadow-[0_20px_60px_rgba(2,6,23,0.8)] transition duration-300 hover:-translate-y-1 hover:border-white/30",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100",
              `bg-gradient-to-br ${accent}`,
            )}
          />
          <div className="relative flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white/70">
              <span className="rounded-full border border-white/15 bg-white/5 p-2 text-white/80">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </div>
            <p className="text-3xl font-semibold">{value}</p>
            <p className="text-sm text-white/60">{subcopy}</p>
            {index === 2 && (
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
                {Object.entries(categories).length === 0 && (
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Waiting
                  </span>
                )}
                {Object.entries(categories).map(([name, count]) => (
                  <span
                    key={name}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80"
                  >
                    {name} · {count}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

