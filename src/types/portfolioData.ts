export type PortfolioItem = {
  id: number;
  userId: number;
  coinId: string;
  quantity: string;
  buyPrice: string;
  createdAt: string;
  updatedAt: string;
  marketData: {
    id: string;
    rank: number;
    name: string;
    symbol: string;
    price: number;
    marketCap: number;
    change24h: number;
    image: string;
  };
};
