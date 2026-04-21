export type PriceItem = {
  amount: string;
  bonus: string | null;
  price: string;
  popular?: boolean;
};

export type GamePrice = {
  gameId: string;
  gameName: string;
  currency: string;
  items: PriceItem[];
  weeklyPass?: PriceItem[];
  doubleDiamond?: PriceItem[];
  unavailable?: boolean;
};