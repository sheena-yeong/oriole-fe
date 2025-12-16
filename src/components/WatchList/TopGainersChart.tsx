import type { CoinMarket } from '../../types/watchlistData';

interface TopGainersChartProps {
  gainers: CoinMarket[] | null;
}

function TopGainersChart({ gainers }: TopGainersChartProps) {
  if (!gainers) return null;

  const top3 = gainers.slice(0, 3);

  return (
    <div className="flex gap-6 items-center">
      {top3.map((coin) => (
        <div key={coin.id} className="flex flex-col items-center">
          <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-1" />
          <span className="font-semibold">{coin.name}</span>
          <span
            className={`text-sm font-medium ${
              (coin.price_change_percentage_24h || 0) >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {(coin.price_change_percentage_24h || 0).toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default TopGainersChart;
