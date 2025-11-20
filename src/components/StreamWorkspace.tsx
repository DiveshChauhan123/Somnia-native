'use client';

import { useLiveStream } from "@/hooks/useLiveStream";
import { ConnectionBadge } from "@/components/ConnectionBadge";
import { LiveTicker } from "@/components/LiveTicker";
import { InsightsGrid } from "@/components/InsightsGrid";
import { EventsTable } from "@/components/EventsTable";
import { PublisherPanel } from "@/components/PublisherPanel";

type Props = {
  publisherEnabled: boolean;
};

export function StreamWorkspace({ publisherEnabled }: Props) {
  const { events, aggregates, status, lastError } = useLiveStream();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <ConnectionBadge status={status} />
        {lastError && (
          <p className="text-sm text-amber-200/80">
            {lastError}. We will retry automatically.
          </p>
        )}
        <LiveTicker events={events} />
        <InsightsGrid {...aggregates} />
      </div>
      <EventsTable events={events} />
      <PublisherPanel enabled={publisherEnabled} />
    </div>
  );
}

