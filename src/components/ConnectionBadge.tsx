'use client';

import { WifiOff, Wifi, Loader2 } from "lucide-react";

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

export function ConnectionBadge({ status, label = "Somnia Data Stream" }: Props) {
  const icon = {
    idle: <Wifi className="h-4 w-4" />,
    connecting: <Loader2 className="h-4 w-4 animate-spin" />,
    open: <Wifi className="h-4 w-4" />,
    error: <WifiOff className="h-4 w-4" />,
  }[status];

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium text-white backdrop-blur">
      {icon}
      {label} · {statusCopy[status]}
    </span>
  );
}

