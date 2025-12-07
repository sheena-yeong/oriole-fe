export interface Coin {
  rank: number;
  name: string;
  symbol: string;
  price: string;
  marketCap: string;
  change24h: string;
}

export interface CoinSymbolOnly {
  symbol: string;
}