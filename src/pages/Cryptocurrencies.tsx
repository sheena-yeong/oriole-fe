import { useEffect, useState } from 'react';
import { getCoins } from '../services/crypto';

interface Coin {
  rank: number;
  name: string;
  symbol: string;
  price: string;
  marketCap: string;
  change24h: string;
}

function Cryptocurrencies() {
  const [cryptos, setCryptos] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getCoins();
        setCryptos(data);
        console.log('Fetched coins', data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCoins();
  }, []);

  return (
    <>
    <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl">Cryptocurrencies</h3>
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
          {cryptos.map((crypto) => (
            <tr
            key={crypto.rank}
            className="hover:bg-neutral-800 transition-colors"
            >
              <td className="px-4 py-2">{crypto.rank}</td>
              <td className="px-4 py-2">{crypto.name}</td>
              <td className="px-4 py-2">{crypto.symbol}</td>
              <td className="px-4 py-2">{crypto.price}</td>
              <td className="px-4 py-2">{crypto.marketCap}</td>
              <td
                className={`px-4 py-2 ${
                  parseFloat(crypto.change24h) >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
                }`}
                >
                {crypto.change24h}
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
