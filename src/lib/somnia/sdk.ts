import { SDK } from "@somnia-chain/streams";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { env } from "@/lib/env";
import { STREAM_SCHEMA_DEFINITION } from "@/lib/somnia/schema";

let sdkInstance: SDK | null = null;
let schemaIdCache: `0x${string}` | null = null;

export function getPublicClient() {
  if (!env.SOMNIA_RPC_URL) {
    throw new Error("SOMNIA_RPC_URL is not configured");
  }

  return createPublicClient({
    transport: http(env.SOMNIA_RPC_URL),
  });
}

export function getWalletClient() {
  if (!env.SOMNIA_RPC_URL || !env.SOMNIA_PRIVATE_KEY) {
    throw new Error("Publishing requires SOMNIA_RPC_URL and SOMNIA_PRIVATE_KEY");
  }

  return createWalletClient({
    transport: http(env.SOMNIA_RPC_URL),
    account: privateKeyToAccount(env.SOMNIA_PRIVATE_KEY as `0x${string}`),
  });
}

export async function getSdk() {
  if (sdkInstance) return sdkInstance;

  if (!env.SOMNIA_RPC_URL) {
    throw new Error("SOMNIA_RPC_URL must be set to use the SDK");
  }

  sdkInstance = new SDK({
    public: getPublicClient(),
    ...(env.SOMNIA_PRIVATE_KEY ? { wallet: getWalletClient() } : {}),
  });

  return sdkInstance;
}

export async function getSchemaId(): Promise<`0x${string}`> {
  if (schemaIdCache) return schemaIdCache;

  const sdk = await getSdk();
  const computedSchemaId = await sdk.streams.computeSchemaId(STREAM_SCHEMA_DEFINITION);
  
  if (!computedSchemaId) {
    throw new Error("Failed to compute schema ID");
  }
  
  schemaIdCache = computedSchemaId;
  return schemaIdCache;
}