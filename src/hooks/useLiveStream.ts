'use client';

import { useEffect, useMemo, useState } from "react";
import type { StreamDatum } from "@/types/streams";

type ConnectionState = "idle" | "connecting" | "open" | "error";

export function useLiveStream(
  feedUrl = "/api/streams/live",
  bufferSize = 24,
) {
  const [events, setEvents] = useState<StreamDatum[]>([]);
  const [status, setStatus] = useState<ConnectionState>("connecting");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const source = new EventSource(feedUrl);

    source.onopen = () => {
      setStatus("open");
    };

    source.onerror = () => {
      setStatus("error");
      source.close();
      setTimeout(() => {
        setStatus("connecting");
        setAttempt((value) => value + 1);
      }, 1500);
    };

    source.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as StreamDatum;
        setEvents((prev) =>
          [payload, ...prev].slice(0, bufferSize),
        );
      } catch (error) {
        console.error("Failed to parse stream event", error);
      }
    };

    return () => {
      source.close();
    };
  }, [feedUrl, bufferSize, attempt]);

  const aggregates = useMemo(() => {
    const total = events.length;
    const averageConfidence =
      total === 0
        ? 0
        : Math.round(
            events.reduce((sum, event) => sum + event.confidence, 0) / total,
          );

    const categories = events.reduce<Record<string, number>>((acc, event) => {
      acc[event.category] = (acc[event.category] ?? 0) + 1;
      return acc;
    }, {});

    return {
      total,
      averageConfidence,
      categories,
    };
  }, [events]);

  return {
    events,
    status,
    aggregates,
    lastError: status === "error" ? "Lost connection to stream" : null,
  };
}

