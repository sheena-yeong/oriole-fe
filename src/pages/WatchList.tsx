import empty_nest from '../assets/empty_nest.png';
import AddCoinDialog from '../components/WatchList/AddCoinDialog.tsx';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import type { Coin } from '../../types/coins.ts';

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
  const hasCoins = watchListCoins && watchListCoins.length > 0;

  console.log('coins from watchlist', coins);

  return (
    <>
      {/* If list has coins, show table */}
      {hasCoins ? (
        <div className="p-5 overflow-x-hidden sm:overflow-x-auto w-full">
          <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl">
            Your Watchlist
          </h3>

          <table className="min-w-full divide-y divide-neutral-700 rounded-lg bg-neutral-900 text-white mt-4">
            <thead className="bg-neutral-800">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Symbol</th>
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Market Cap</th>
                <th className="px-4 py-2 text-left">24h Change</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-700">
              {watchListCoins.map((coin) => (
                <tr
                  key={coin.symbol}
                  className="hover:bg-neutral-800 transition-colors"
                >
                  <td className="px-4 py-2">{coin.name}</td>
                  <td className="px-4 py-2">{coin.symbol}</td>
                  <td className="px-4 py-2">{coin.rank}</td>
                  <td className="px-4 py-2">
                    {Number(coin.price).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-2">
                    {Number(coin.marketCap).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-2">{coin.change24h}</td>
                  <td className="py-2">
                    <MdDelete />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="mt-4 bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-2 rounded-md transition-colors w-30"
            onClick={() => setOpenDialog(true)}
          >
            Add More
          </button>
        </div>
      ) : (
        /* Otherwise, show empty state */
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={empty_nest} className="h-25 mt-50" />
          <p>No coins to show.</p>
          <p className="font-poppins text-md font-semibold text-center">
            Keep track of coins you’re interested in.
          </p>
          <button
            className="bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-2 rounded-md transition-colors w-30"
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
      />
    </>
  );
}

export default WatchList;
