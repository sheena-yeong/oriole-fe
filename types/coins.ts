export interface Coin {
  rank: number;
  name: string;
  symbol: string;
  price: string;
  marketCap: string;
  change24h: string;
}

export type watchListCoin = Omit<Coin, 'rank' | 'marketCap' | 'change24h' | 'price' | 'name'>;
