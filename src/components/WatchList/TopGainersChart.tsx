import type { CoinMarket } from '../../types/watchlistData';

interface TopGainersChartProps {
  gainers: CoinMarket[] | null;
}

function TopGainersChart({ gainers }: TopGainersChartProps) {
  if (!gainers) return null;

  return (
    <div className="flex gap-6 items-center">
      {gainers.map((coin) => (
        <div key={coin.id} className="flex flex-col items-center text-center">
          <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-1 max-w-20 truncate" />
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
