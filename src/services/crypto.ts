import axios from 'axios';

export const getCoins = async () => {
  interface CoinGeckoData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: {
      times: number;
      currency: string;
      percentage: number;
    } | null;
    last_updated: string;
  }

  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
        },
      }
    );

    const data = res.data.map((coin: CoinGeckoData) => ({
      rank: coin.market_cap_rank,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: `$${coin.current_price.toLocaleString()}`,
      marketCap: `$${coin.market_cap.toLocaleString()}`,
      change24h: `${coin.price_change_percentage_24h.toFixed(2)}%`,
    }));

    return data;
  } catch (err) {
    console.error(err);
  }
};
