import empty_nest from '../assets/empty_nest.png';
import AddCoinDialog from '../components/WatchList/AddCoinDialog.tsx';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import type { Coin } from '../../types/coins.ts';
import { deleteWatchListCoins } from '../services/crypto.ts';
import { useAuth } from '../../hooks/useAuth.ts';

interface WatchListProps {
  coins: Coin[];
  watchListCoins: Coin[];
  fetchWatchListCoins: () => Promise<void>;
}

function WatchList({
  coins,
  watchListCoins,
  fetchWatchListCoins,
}: WatchListProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const hasCoins = watchListCoins && watchListCoins.length > 0;
  const { tokens } = useAuth();

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError('');
    const result = await deleteWatchListCoins(tokens.access, id);

    if (result.success) {
      await fetchWatchListCoins();
    } else {
      console.log('Failed to delete coin', result.error);
      setError('Failed to delete coin. Please try again.');
    }
    setDeletingId(null);
  }

  return (
    <>
      {/* If list has coins, show table */}
      {hasCoins ? (
        <div className="p-5 overflow-x-hidden sm:overflow-x-auto w-full">
          <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl text-white">
            Your Watchlist
          </h3>

          {error && (
            <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-md mx-6">
              {error}
            </div>
          )}

          <div className="mx-6 mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-700 rounded-lg bg-neutral-900 text-white">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Coin</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Symbol</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Market Cap</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">24h Change</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-700">
                {watchListCoins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="hover:bg-neutral-800 transition-colors"
                  >
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
                    <td className="px-4 py-3 text-neutral-400">#{coin.rank}</td>
                    <td className="px-4 py-3">
                      ${coin.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3">
                      ${coin.marketCap.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className={`px-4 py-3 font-semibold ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(coin.id)}
                        disabled={deletingId === coin.id}
                        className="text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-2 rounded hover:bg-neutral-700"
                        aria-label="Delete coin"
                      >
                        {deletingId === coin.id ? (
                          <span className="animate-spin inline-block">⏳</span>
                        ) : (
                          <MdDelete size={20} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="mt-6 ml-6 bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-6 py-3 rounded-md transition-colors"
            onClick={() => setOpenDialog(true)}
          >
            Add More Coins
          </button>
        </div>
      ) : (
        /* Otherwise, show empty state */
        <div className="flex flex-col items-center justify-center gap-4 h-full mt-50">
          <img src={empty_nest} className="h-25" alt="Empty watchlist" />
          <p className="text-neutral-400 text-lg">No coins to show.</p>
          <p className="font-poppins text-md font-semibold text-center text-neutral-300">
            Keep track of coins you're interested in.
          </p>
          <button
            className="bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-6 py-3 rounded-md transition-colors"
            onClick={() => setOpenDialog(true)}
          >
            Add Coin
          </button>
        </div>
      )}

      <AddCoinDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        coins={coins}
        fetchWatchListCoins={fetchWatchListCoins}
        watchListCoins={watchListCoins}
      />
    </>
  );
}

export default WatchList;