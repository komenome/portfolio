import type { PriceItem } from "@/data/types";

export const PUBG_PRICES = {
  gameId: "pubg-global",
  gameName: "PUBG Mobile",
  currency: "UC",
  items: [
    { amount: "60", bonus: null, price: "3,900 Ks" } as PriceItem,
    { amount: "325", bonus: null, price: "19,500 Ks" } as PriceItem,
    { amount: "660", bonus: null, price: "39,000 Ks" } as PriceItem,
    { amount: "1800", bonus: null, price: "97,500 Ks" } as PriceItem,
    { amount: "3850", bonus: null, price: "195,000 Ks" } as PriceItem,
    { amount: "8100", bonus: null, price: "390,000 Ks" } as PriceItem,
  ],
  unavailable: false,
};
