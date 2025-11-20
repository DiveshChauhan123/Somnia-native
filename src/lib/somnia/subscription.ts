import type { StreamDatum } from "@/types/streams";
import { schemaEncoder } from "@/lib/somnia/schema";
import { getSchemaId, getSdk } from "@/lib/somnia/sdk";

type SomniaSubscription = {
  unsubscribe: () => void;
};

export async function watchSomniaStream(
  onEvent: (datum: StreamDatum) => void,
): Promise<() => void> {
  const sdk = await getSdk();
  const schemaId = await getSchemaId();

  const subscription: SomniaSubscription = await sdk.streams.subscribe(
    schemaId,
    [],
    (event) => {
      const decoded = schemaEncoder.decodeData(event.data);
      const datum = mapDecodedResult(event.id, decoded);
      onEvent(datum);
    },
  );

  return () => subscription.unsubscribe();
}

function mapDecodedResult(
  id: `0x${string}`,
  decoded: ReturnType<typeof schemaEncoder.decodeData>,
): StreamDatum {
  const payload: Record<string, string> = {};
  decoded.forEach((item) => {
    payload[item.name] = item.value;
  });

  return {
    id,
    label: payload.label ?? "unlabeled",
    category: payload.category ?? "general",
    publisher: payload.publisher ?? "",
    payload: payload.payload ?? "",
    confidence: Number(payload.confidence ?? 0),
    timestamp: Number(payload.timestamp ?? Date.now()),
    txHash: payload.txHash,
  };
}

