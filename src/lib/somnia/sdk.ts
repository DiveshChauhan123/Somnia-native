import { SDK } from "@somnia-chain/streams";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { env } from "@/lib/env";
import { STREAM_SCHEMA_DEFINITION } from "@/lib/somnia/schema";

let sdkInstance: SDK | null = null;
let schemaIdCache: `0x${string}` | null = null;

/**
 * PUBLIC CLIENT (read-only client)
 */
export function getPublicClient() {
  if (!env.SOMNIA_RPC_URL) {
    throw new Error("SOMNIA_RPC_URL is not configured");
  }

  return createPublicClient({
    transport: http(env.SOMNIA_RPC_URL),
  });
}

/**
 * WALLET CLIENT (for publishing)
 */
export function getWalletClient() {
  if (!env.SOMNIA_RPC_URL || !env.SOMNIA_PRIVATE_KEY) {
    throw new Error("Publishing requires SOMNIA_RPC_URL and SOMNIA_PRIVATE_KEY");
  }

  const privateKey = env.SOMNIA_PRIVATE_KEY as `0x${string}`;

  return createWalletClient({
    transport: http(env.SOMNIA_RPC_URL),
    account: privateKeyToAccount(privateKey),
  });
}

/**
 * SOMNIA SDK SINGLETON
 */
export async function getSdk() {
  if (sdkInstance) return sdkInstance;

  if (!env.SOMNIA_RPC_URL) {
    throw new Error("SOMNIA_RPC_URL must be set to use the SDK");
  }

  sdkInstance = new SDK({
    public: getPublicClient(),
    wallet: env.SOMNIA_PRIVATE_KEY ? getWalletClient() : undefined,
  });

  return sdkInstance;
}

/**
 * COMPUTE AND CACHE SCHEMA ID
 */
export async function getSchemaId(): Promise<`0x${string}`> {
  if (schemaIdCache) return schemaIdCache;

  const sdk = await getSdk();

  const computedSchemaId = await sdk.streams.computeSchemaId(
    STREAM_SCHEMA_DEFINITION
  );

  // Type Narrowing for Vercel (prevent `null` errors)
  if (
    !computedSchemaId ||
    typeof computedSchemaId !== "string" ||
    !computedSchemaId.startsWith("0x")
  ) {
    throw new Error("Failed to compute valid schema ID");
  }

  schemaIdCache = computedSchemaId as `0x${string}`;

  return schemaIdCache;
}
