import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createMockEvent } from "@/lib/mock/events";
import { watchSomniaStream } from "@/lib/somnia/subscription";
import type { StreamDatum } from "@/types/streams";

export const runtime = "nodejs";

const encoder = new TextEncoder();

export async function GET() {
  if (!env.isSdkReadable && env.NEXT_PUBLIC_ENABLE_MOCK_STREAM === "false") {
    return NextResponse.json(
      { error: "Somnia RPC is not configured" },
      { status: 500 },
    );
  }

  let closeSubscription: (() => void) | undefined;
  const useMock =
    !env.isSdkReadable || env.NEXT_PUBLIC_ENABLE_MOCK_STREAM === "true";

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode("event: ready\ndata: {}\n\n"));

      const pushEvent = (event: StreamDatum) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
        );
      };

      if (useMock) {
        const interval = setInterval(() => {
          pushEvent(createMockEvent());
        }, 2000);

        closeSubscription = () => clearInterval(interval);
      } else {
        closeSubscription = await watchSomniaStream(pushEvent);
      }
    },
    cancel() {
      closeSubscription?.();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

