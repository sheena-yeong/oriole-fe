import type { Coin } from '../../types/coins';

interface CryptocurrenciesProps {
  coins: Coin[];
}

function Cryptocurrencies({ coins }: CryptocurrenciesProps) {
  return (
    <>
      <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl">
        Cryptocurrencies
      </h3>
      <div className="p-5 overflow-x-hidden sm:overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-700 rounded-lg bg-neutral-900 text-white">
          <thead className="bg-neutral-800">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Symbol</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Market Cap</th>
              <th className="px-4 py-2 text-left">24h Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {coins.map((coin) => (
              <tr
                key={coin.rank}
                className="hover:bg-neutral-800 transition-colors"
              >
                <td className="px-4 py-2">{coin.rank}</td>
                <td className="px-4 py-2">{coin.name}</td>
                <td className="px-4 py-2">{coin.symbol}</td>
                <td className="px-4 py-2">{coin.price}</td>
                <td className="px-4 py-2">{coin.marketCap}</td>
                <td
                  className={`px-4 py-2 ${
                    parseFloat(coin.change24h) >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {coin.change24h}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cryptocurrencies;
