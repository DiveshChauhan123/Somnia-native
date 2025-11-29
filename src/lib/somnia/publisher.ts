import { NextResponse } from "next/server";
import { zeroBytes32 } from "@somnia-chain/streams";
import { toHex } from "viem";
import { env } from "@/lib/env";
import { schemaEncoder } from "@/lib/somnia/schema";
import { getSchemaId, getSdk } from "@/lib/somnia/sdk";

type PublishInput = {
  label: string;
  payload: string;
  confidence?: number;
  category?: string;
};

export async function publishToSomnia(input: PublishInput) {
  if (!env.isPublisherConfigured) {
    return NextResponse.json(
      { error: "Publisher wallet is not configured" },
      { status: 503 },
    );
  }

  const sdk = await getSdk();
  const schemaId = await getSchemaId();

  const encoded = schemaEncoder.encodeData([
    { name: "timestamp", value: `${Date.now()}`, type: "uint64" },
    {
      name: "publisher",
      value: env.SOMNIA_PUBLISHER ?? zeroBytes32,
      type: "address",
    },
    { name: "label", value: input.label, type: "string" },
    { name: "payload", value: input.payload, type: "string" },
    {
      name: "confidence",
      value: `${input.confidence ?? 80}`,
      type: "uint32",
    },
    {
      name: "category",
      value: input.category ?? "general",
      type: "string",
    },
  ]);

  const dataId = toHex(`somnia-${Date.now()}`, { size: 32 });

  const receipt = await sdk.streams.set([
    {
      id: dataId,
      schemaId,
      data: encoded,
    },
  ]);

  return NextResponse.json(
    {
      success: true,
      dataId,
      transactionHash: receipt.transactionHash,
    },
    { status: 200 },
  );
}

