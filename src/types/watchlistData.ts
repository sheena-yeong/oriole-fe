export interface TrendingCoinItem {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  small: string;
  large: string;
  price_btc: number;
  score: number;
}