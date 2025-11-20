'use client';

import { WifiOff, Wifi, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  status: "idle" | "connecting" | "open" | "error";
  label?: string;
};

const statusCopy: Record<Props["status"], string> = {
  idle: "Idle",
  connecting: "Connecting",
  open: "Streaming",
  error: "Reconnecting",
};

const statusAccent: Record<Props["status"], string> = {
  idle: "from-slate-400/70 to-slate-200/50",
  connecting: "from-sky-400/80 to-cyan-200/60",
  open: "from-emerald-400/80 to-cyan-300/60",
  error: "from-amber-400/80 to-orange-300/60",
};

const statusText: Record<Props["status"], string> = {
  idle: "text-white/80",
  connecting: "text-cyan-100",
  open: "text-emerald-100",
  error: "text-amber-100",
};

export function ConnectionBadge({ status, label = "Somnia Data Stream" }: Props) {
  const icon = {
    idle: <Wifi className="h-4 w-4" />,
    connecting: <Loader2 className="h-4 w-4 animate-spin" />,
    open: <Wifi className="h-4 w-4" />,
    error: <WifiOff className="h-4 w-4" />,
  }[status];

  return (
    <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-white/10 via-transparent to-white/5 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-black/30 backdrop-blur">
      <span className="relative inline-flex items-center justify-center">
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full bg-gradient-to-r shadow-[0_0_12px_rgba(16,185,129,0.7)]",
            statusAccent[status],
          )}
        />
        <span className="absolute inset-[-8px] rounded-full bg-white/10 blur" aria-hidden />
      </span>
      <span className="flex items-center gap-2">
        <span className={statusText[status]}>{icon}</span>
        <span className="text-white/70">{label}</span>
      </span>
      <span className={cn("uppercase tracking-[0.3em]", statusText[status])}>
        {statusCopy[status]}
      </span>
    </span>
  );
}

