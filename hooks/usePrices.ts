"use client";

import { useState, useEffect } from "react";
import type { GamePrice } from "@/data/types";

export function usePrices() {
  const [games, setGames] = useState<GamePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/prices", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      const data: GamePrice[] = await res.json();
      setGames(data);
    } catch (e) {
      console.error("[usePrices] Fetch error:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return { games, loading, error, refetch: fetchPrices };
}
