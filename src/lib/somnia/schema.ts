import { SchemaEncoder } from "@somnia-chain/streams";
import { env } from "@/lib/env";

export const STREAM_SCHEMA_DEFINITION = env.SOMNIA_DEFAULT_SCHEMA;

export const schemaEncoder = new SchemaEncoder(STREAM_SCHEMA_DEFINITION);

export async function encodePayload(input: Record<string, unknown>) {
  return schemaEncoder.encodeData(
    Object.entries(input).map(([name, value]) => {
      return {
        name,
        value: `${value ?? ""}`,
        type: inferType(value),
      };
    }),
  );
}

const inferType = (value: unknown) => {
  if (typeof value === "number") return Number.isInteger(value) ? "uint64" : "int256";
  if (typeof value === "string" && value.startsWith("0x") && value.length === 42) {
    return "address";
  }
  if (typeof value === "string") return "string";
  return "string";
};

