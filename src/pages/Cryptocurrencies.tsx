import type { Coin } from '../../types/coins';

interface CryptocurrenciesProps {
  coins: Coin[];
}

function Cryptocurrencies({ coins }: CryptocurrenciesProps) {
  return (
    <div className="p-5 overflow-x-hidden sm:overflow-x-auto w-full">
      <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl text-white">
        Cryptocurrencies
      </h3>

      <div className="mx-6 mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-700 rounded-lg bg-neutral-900 text-white">
          <thead className="bg-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Coin</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Symbol</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Market Cap</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">24h Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {coins.map((coin) => {
              const change24h = coin.change24h ?? 0;
              const isPositive = change24h >= 0;
              
              return (
                <tr
                  key={coin.id}
                  className="hover:bg-neutral-800 transition-colors"
                >
                  <td className="px-4 py-3 text-neutral-400">#{coin.rank}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={coin.image} 
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{coin.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 uppercase text-neutral-400">{coin.symbol}</td>
                  <td className="px-4 py-3">
                    ${coin.price?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? 'N/A'}
                  </td>
                  <td className="px-4 py-3">
                    ${coin.marketCap?.toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) ?? 'N/A'}
                  </td>
                  <td className={`px-4 py-3 font-semibold ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {change24h !== null && change24h !== undefined
                      ? `${isPositive ? '+' : ''}${change24h.toFixed(2)}%`
                      : 'N/A'
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cryptocurrencies;