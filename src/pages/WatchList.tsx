import empty_nest from '../assets/empty_nest.png';
import AddCoinDialog from '../components/WatchList/AddCoinDialog.tsx';
import CoinDetailsDialog from '../components/WatchList/CoinDetailsDialog';
import FearGreedSemicircle from '../components/WatchList/FearGreedSemicircle';
import TrendingCoinsChart from '../components/WatchList/TrendingCoinsChart.tsx';
import TopGainersChart from '../components/WatchList/TopGainersChart.tsx';
import type { Coin } from '../types/coins';
import type { TrendingCoinItem } from '../types/watchlistData.ts';
import type { CoinMarket } from '../types/watchlistData.ts';
import { MdDelete } from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';
import { getFearGreedLatest } from '../services/crypto';
import { getTrendingSearches } from '../services/crypto';
import { getTopGainers } from '../services/crypto';
import { useState, useEffect } from 'react';
import { deleteWatchListCoins } from '../services/crypto.ts';

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
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [fgIndex, setFgIndex] = useState<number | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinItem[] | null>(
    null
  );
  const [gainers, setGainers] = useState<CoinMarket[] | null>(null)

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

  useEffect(() => {
    async function getFG() {
      try {
        const res = await getFearGreedLatest(tokens.access);
        setFgIndex(res.data.actual_value);
      } catch (err) {
        console.error(err);
      }
    }

    async function getTrending() {
      try {
        const res = await getTrendingSearches(tokens.access);
        const coinsArray = res.data.coins.map(({ item }) => item);
        setTrendingCoins(coinsArray);
      } catch (err) {
        console.error(err);
      }
    }

    async function getGainers() {
      try {
        const res = await getTopGainers(tokens.access);
        console.log('gainers', res);
        setGainers(res.data)
      } catch (err) {
        console.error(err);
      }
    }

    getFG();
    getTrending();
    getGainers();
  }, [tokens.access]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(watchListCoins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCoins = watchListCoins.slice(startIndex, endIndex);

  // Generate page numbers to display
  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  function goToPage(page: number) {
    setCurrentPage(page);
  }

  return (
    <>
      {/* If list has coins, show table */}
      {hasCoins ? (
        <div className="p-5 overflow-x-hidden sm:overflow-x-auto w-full">
          {error && (
            <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-md mx-6">
              {error}
            </div>
          )}
          <div className="flex gap-5 m-6">
            <div className="bg-neutral-800 dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 w-64 h-45">
              <h3 className="font-semibold text-lg text-center text-white dark:text-white">
                Fear and Greed Index
              </h3>
              {fgIndex !== null && <FearGreedSemicircle fgIndex={fgIndex} />}
            </div>

            <div className="bg-neutral-800 dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 w-75 h-45">
              <h3 className="font-semibold text-lg text-center text-white dark:text-white">
                Trending Coins
              </h3>
              {trendingCoins !== null && (
                <TrendingCoinsChart trendingCoins={trendingCoins} />
              )}
            </div>

            <div className="bg-neutral-800 dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 w-75 h-45">
              <h3 className="font-semibold text-lg text-center text-white dark:text-white">
                Top Gainers
              </h3>
              {trendingCoins !== null && (
                <TopGainersChart gainers={gainers} />
              )}
            </div>
          </div>

          <div className="mx-6 mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-700 rounded-lg bg-neutral-900 text-white">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Coin
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Symbol
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Market Cap
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    24h Change
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-700">
                {currentCoins.map((coin) => (
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
                        <button
                          className="hover:underline hover:cursor-pointer font-medium"
                          onClick={() => setSelectedCoin(coin)}
                        >
                          {coin.name}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 uppercase text-neutral-400">
                      {coin.symbol}
                    </td>
                    <td className="px-4 py-3 text-neutral-400">#{coin.rank}</td>
                    <td className="px-4 py-3">
                      $
                      {coin.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3">
                      $
                      {coin.marketCap.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {coin.change24h !== null &&
                      coin.change24h !== undefined ? (
                        <>
                          {coin.change24h >= 0 ? '+' : ''}
                          {coin.change24h.toFixed(2)}%
                        </>
                      ) : (
                        <span className="text-neutral-400">N/A</span>
                      )}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4 ml-5 text-white">
          <div className="text-sm text-neutral-400">
            Showing {startIndex + 1} to{' '}
            {Math.min(endIndex, watchListCoins.length)} of{' '}
            {watchListCoins.length} coins
          </div>

          <div className="flex gap-2">
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                  : 'bg-[#fe5914] text-white hover:bg-[#ff6b2a]'
              }`}
            >
              Previous
            </button>

            {/* First page */}
            {getPageNumbers()[0] > 1 && (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className="px-3 py-1 rounded font-medium bg-neutral-800 text-white hover:bg-[#fe5914] transition-colors"
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && (
                  <span className="px-2 py-1 text-neutral-500">...</span>
                )}
              </>
            )}

            {/* Pages */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-[#fe5914] text-white'
                    : 'bg-neutral-800 text-white hover:bg-[#ff6b2a]'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last page */}
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] <
                  totalPages - 1 && (
                  <span className="px-2 py-1 text-neutral-500">...</span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className="px-3 py-1 rounded font-medium bg-neutral-800 text-white hover:bg-[#fe5914] transition-colors"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                  : 'bg-[#fe5914] text-white hover:bg-[#ff6b2a]'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <AddCoinDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        coins={coins}
        fetchWatchListCoins={fetchWatchListCoins}
        watchListCoins={watchListCoins}
      />

      {selectedCoin && (
        <CoinDetailsDialog
          selectedCoin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </>
  );
}

export default WatchList;
