export type StreamCategory =
  | "defi"
  | "gaming"
  | "governance"
  | "infra"
  | "general";

export interface StreamDatum {
  id: string;
  label: string;
  category: StreamCategory | string;
  publisher: string;
  payload: string;
  confidence: number;
  timestamp: number;
  txHash?: string;
  blockNumber?: number;
}

