import { z } from "zod";

const serverEnvSchema = z.object({
  SOMNIA_RPC_URL: z.string().url().optional(),
  SOMNIA_CHAIN_ID: z.coerce.number().optional(),
  SOMNIA_PRIVATE_KEY: z
    .string()
    .regex(/^0x[a-fA-F0-9]+$/, { message: "Private key must be hex prefixed" })
    .optional(),
  SOMNIA_PUBLISHER: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, { message: "Publisher must be EVM address" })
    .optional(),
  SOMNIA_DEFAULT_SCHEMA: z
    .string()
    .default(
      "uint64 timestamp, address publisher, string label, string payload, uint32 confidence",
    ),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_ENABLE_MOCK_STREAM: z
    .enum(["true", "false"])
    .default("true"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Somnia Stream Agent"),
});

const serverEnv = serverEnvSchema.parse({
  SOMNIA_RPC_URL: process.env.SOMNIA_RPC_URL,
  SOMNIA_CHAIN_ID: process.env.SOMNIA_CHAIN_ID,
  SOMNIA_PRIVATE_KEY: process.env.SOMNIA_PRIVATE_KEY,
  SOMNIA_PUBLISHER: process.env.SOMNIA_PUBLISHER,
  SOMNIA_DEFAULT_SCHEMA: process.env.SOMNIA_DEFAULT_SCHEMA,
});

const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_ENABLE_MOCK_STREAM: process.env.NEXT_PUBLIC_ENABLE_MOCK_STREAM,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
});

export const env = {
  ...serverEnv,
  ...clientEnv,
  isPublisherConfigured: Boolean(
    serverEnv.SOMNIA_RPC_URL && serverEnv.SOMNIA_PRIVATE_KEY,
  ),
  isSdkReadable: Boolean(serverEnv.SOMNIA_RPC_URL),
};

export type ServerEnv = typeof serverEnv;
export type ClientEnv = typeof clientEnv;

