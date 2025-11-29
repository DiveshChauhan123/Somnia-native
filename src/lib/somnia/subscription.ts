import type { StreamDatum } from "@/types/streams";
import { schemaEncoder } from "@/lib/somnia/schema";
import { getSdk } from "@/lib/somnia/sdk";

type SomniaDecodedEvent = {
  id: `0x${string}`;
  result: {
    topics: string[];
    data: `0x${string}`;
    simulationResults: string[];
  };
};

export async function watchSomniaStream(
  onEvent: (datum: StreamDatum) => void
): Promise<() => void> {
  const sdk = await getSdk();

  // ⭐ Correct required fields for SubscriptionInitParams
  const sub = await sdk.streams.subscribe({
    ethCalls: [],               // required
    onlyPushChanges: false,     // required
    onData: (event: SomniaDecodedEvent) => {
      const decoded = schemaEncoder.decodeData(event.result.data);
      const datum = mapDecodedResult(event.result.topics[0] as `0x${string}`, decoded);
      onEvent(datum);
    },
    onError: (err) => {
      console.error("Somnia stream error:", err);
    }
  });

  if (sub instanceof Error) {
    throw new Error("Failed to subscribe: " + sub.message);
  }

  return () => sub.unsubscribe();
}

function mapDecodedResult(
  id: `0x${string}`,
  decoded: ReturnType<typeof schemaEncoder.decodeData>
): StreamDatum {
  const payload: Record<string, string> = {};

  decoded.forEach((item) => {
    payload[item.name] = String(item.value);
  });

  return {
    id,
    label: payload.label ?? "unlabeled",
    category: payload.category ?? "general",
    publisher: payload.publisher ?? "",
    payload: payload.payload ?? "",
    confidence: Number(payload.confidence ?? 0),
    timestamp: Number(payload.timestamp ?? Date.now()),
    txHash: payload.txHash ?? "",
  };
}
