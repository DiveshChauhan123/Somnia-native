import { randomUUID } from "crypto";
import type { StreamDatum } from "@/types/streams";

const labels = [
  "Liquidity Spike",
  "Quest Completed",
  "Vault Health Check",
  "Governance Vote",
  "Player Battle",
  "Oracle Update",
];

const categories = ["defi", "gaming", "governance", "infra", "general"];

const publishers = [
  "0x9fF2c9ec4f132B75c59c5eFbB742ed44c1d0a111",
  "0xA5362Bd7B35E45b19cba778764F6Af5c1bb2F222",
  "0x7700cc59B98dA8e21fB0d0ecdaA5A5f77b0DDD33",
];

export function createMockEvent(): StreamDatum {
  const label = sample(labels);
  const category = sample(categories);

  return {
    id: randomUUID(),
    label,
    category,
    publisher: sample(publishers),
    payload: JSON.stringify({
      metric: label,
      delta: (Math.random() * 5).toFixed(2),
      note: `Auto-generated insight for ${label}`,
    }),
    confidence: Math.round(70 + Math.random() * 30),
    timestamp: Date.now(),
    txHash: `0x${Math.floor(Math.random() * 1e16).toString(16).padStart(16, "0")}`,
  };
}

function sample<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

