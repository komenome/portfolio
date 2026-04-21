import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const rateLimit = checkRateLimit(request, {
      maxRequests: 10,
      windowMs: 60 * 1000, // 10 requests per minute
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      );
    }

    const body = await request.json();
    const { gameId, zoneId } = body;

    if (!gameId || !zoneId) {
      return NextResponse.json(
        { error: "Game ID and Zone ID are required" },
        { status: 400 }
      );
    }

    const MLBB_CHECKER_URL = process.env.MLBB_CHECKER_URL;
    if (!MLBB_CHECKER_URL) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const url = `${MLBB_CHECKER_URL}/nickname/ml?id=${encodeURIComponent(gameId)}&server=${encodeURIComponent(zoneId)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { valid: false, error: `Worker responded with status ${res.status}` },
        { status: 200 }
      );
    }

    const data = await res.json();

    if (!data.success || !data.name) {
      return NextResponse.json({
        valid: false,
        ign: null,
        country: null,
        available_tiers: [],
      });
    }

    return NextResponse.json({
      valid: true,
      ign: decodeURIComponent(data.name),
      country: data.country || "Unknown",
      available_tiers: data.available_tiers || [],
    });
  } catch (error) {
    console.error("[api/check-mlbb] Error:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
