import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { PUBG_PRICES } from "@/lib/constants/pubg-prices";
import type { PriceItem } from "@/data/types";

const GAME_ORDER = ["mlbb-global", "mlbb-mysg", "magic-chess", "pubg-global"] as const;

const UNAVAILABLE_GAMES = ["mlbb-mysg", "magic-chess"];

interface MergedGamePrice {
  gameId: string;
  gameName: string;
  currency: string;
  items: PriceItem[];
  weeklyPass?: PriceItem[];
  doubleDiamond?: PriceItem[];
  unavailable?: boolean;
}

const FALLBACKS: Record<string, MergedGamePrice> = {
  "mlbb-mysg": {
    gameId: "mlbb-mysg",
    gameName: "Mobile Legends (MY/SG)",
    currency: "Diamonds",
    items: [],
    unavailable: true,
  },
  "magic-chess": {
    gameId: "magic-chess",
    gameName: "Magic Chess",
    currency: "Diamonds",
    items: [],
    unavailable: true,
  },
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

function mapRecord(r: PBRecord): MergedGamePrice {
  return {
    gameId: r.game_id,
    gameName: r.game_name,
    currency: r.currency,
    items: safeParse<PriceItem[]>(r.items) ?? [],
    weeklyPass: safeParse<PriceItem[]>(r.weekly_pass),
    doubleDiamond: safeParse<PriceItem[]>(r.double_diamond),
  };
}

export async function GET(request: Request) {
  try {
    const rateLimit = await checkRateLimit(request, {
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
    const records: MergedGamePrice[] = (data.items ?? []).map(mapRecord);

    const sorted: MergedGamePrice[] = GAME_ORDER.map((id) => {
      if (id === "pubg-global") return PUBG_PRICES as MergedGamePrice;
      const found = records.find((g) => g.gameId === id);
      if (found) return found;
      return (
        FALLBACKS[id] ?? {
          gameId: id,
          gameName: id,
          currency: "",
          items: [],
          unavailable: true,
        }
      );
    });

    sorted.forEach((g: MergedGamePrice) => {
      if (
        g.items?.length === 0 &&
        (!g.weeklyPass || g.weeklyPass.length === 0) &&
        (!g.doubleDiamond || g.doubleDiamond.length === 0)
      ) {
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
