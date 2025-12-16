import type { TrendingCoinItem } from '../../types/watchlistData';

interface TrendingCoinsChartProps {
  trendingCoins: TrendingCoinItem[] | null;
}

function TrendingCoinsChart({ trendingCoins }: TrendingCoinsChartProps) {
  if (!trendingCoins) return null;

  const top3 = trendingCoins.slice(0, 3);

  return (
    <div className="flex gap-4 items-center m-1">
      {top3.map((coin) => (
        <div key={coin.id} className="flex flex-col items-center">
          <img src={coin.thumb} alt={coin.name} className="w-12 h-12 mb-2" />
          <span className="font-semibold">{coin.name}</span>
        </div>
      ))}
    </div>
  );
}

export default TrendingCoinsChart;
