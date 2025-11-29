import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { publishToSomnia } from "@/lib/somnia/publisher";

export const runtime = "nodejs";

const payloadSchema = z.object({
  label: z.string().min(3),
  payload: z.string().min(3),
  confidence: z.number().min(0).max(100).optional(),
  category: z.string().optional(),
});

export async function POST(req: NextRequest) {
  if (!env.isPublisherConfigured) {
    return NextResponse.json(
      { error: "Set SOMNIA_RPC_URL and SOMNIA_PRIVATE_KEY to publish data." },
      { status: 503 },
    );
  }

  const body = await req.json();
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  return publishToSomnia(parsed.data);
}

