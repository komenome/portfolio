import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

const GAME_ORDER = ["mlbb-global", "mlbb-mysg", "magic-chess", "pubg-global"];

const UNAVAILABLE_GAMES = ["mlbb-mysg", "magic-chess"];

const PUBG_PRICES = {
  gameId: "pubg-global",
  gameName: "PUBG Mobile",
  currency: "UC",
  items: [
    { amount: "60", bonus: null, price: "3,900 Ks" },
    { amount: "325", bonus: null, price: "19,500 Ks" },
    { amount: "660", bonus: null, price: "39,000 Ks" },
    { amount: "1800", bonus: null, price: "97,500 Ks" },
    { amount: "3850", bonus: null, price: "195,000 Ks" },
    { amount: "8100", bonus: null, price: "390,000 Ks" },
  ],
  unavailable: false,
};

const FALLBACKS: Record<string, object> = {
  "mlbb-mysg": { gameId: "mlbb-mysg", gameName: "Mobile Legends (MY/SG)", currency: "Diamonds", items: [], unavailable: true },
  "magic-chess": { gameId: "magic-chess", gameName: "Magic Chess", currency: "Diamonds", items: [], unavailable: true },
};

type PBRecord = {
  game_id: string;
  game_name: string;
  currency: string;
  items: string | unknown[];
  weekly_pass?: string | unknown[];
  double_diamond?: string | unknown[];
};

function safeParse<T>(val: unknown): T | undefined {
  if (val === null || val === undefined) return undefined;
  if (Array.isArray(val)) return val as T;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return undefined;
    try {
      return JSON.parse(trimmed) as T;
    } catch {
      return undefined;
    }
  }
  return val as T;
}

function mapRecord(r: PBRecord) {
  return {
    gameId: r.game_id,
    gameName: r.game_name,
    currency: r.currency,
    items: safeParse(r.items) ?? [],
    weeklyPass: safeParse(r.weekly_pass),
    doubleDiamond: safeParse(r.double_diamond),
  };
}

export async function GET(request: Request) {
  try {
    const rateLimit = checkRateLimit(request, {
      maxRequests: 30,
      windowMs: 60 * 1000, // 30 requests per minute
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      );
    }

    const PB_URL = process.env.PB_URL;
    if (!PB_URL) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch(`${PB_URL}/api/collections/prices/records?perPage=50`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 });
    }

    const data = await res.json();
    const records: ReturnType<typeof mapRecord>[] = (data.items ?? []).map(mapRecord);

    const sorted = GAME_ORDER.map((id) => {
      if (id === "pubg-global") return PUBG_PRICES;
      const found = records.find((g) => g.gameId === id);
      if (found) return found;
      return FALLBACKS[id] ?? { gameId: id, gameName: id, currency: "", items: [], unavailable: true };
    });

    sorted.forEach((g: any) => {
      if (g.items?.length === 0 && !g.weeklyPass?.length && !g.doubleDiamond?.length) {
        g.unavailable = true;
      }
      if (UNAVAILABLE_GAMES.includes(g.gameId)) {
        g.unavailable = true;
        g.items = [];
        g.weeklyPass = undefined;
        g.doubleDiamond = undefined;
      }
    });

    return NextResponse.json(sorted);
  } catch (error) {
    console.error("[api/prices] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
