export interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change24h: number;
  image: string;
}

export interface CoinIdOnly {
  id: string;
}

export interface CoinData {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change24h: number;
  image: string;
}