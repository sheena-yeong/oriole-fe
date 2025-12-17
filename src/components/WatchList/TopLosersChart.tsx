import type { CoinMarket } from '../../types/watchlistData';

interface TopLosersChartProps {
  losers: CoinMarket[] | null;
}

function TopLosersChart({ losers }: TopLosersChartProps) {
  if (!losers) return null;

  return (
    <div className="flex gap-6 items-center justify-center">
      {losers.map((coin) => (
        <div key={coin.id} className="flex flex-col items-center text-center">
          <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-1 max-w-20 truncate" />
          <span className="font-semibold text-neutral-400">{coin.name}</span>
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

export default TopLosersChart;
