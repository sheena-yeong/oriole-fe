import type { Coin } from '../../types/coins';
import { useState } from 'react';

interface CryptocurrenciesProps {
  coins: Coin[];
}

function Cryptocurrencies({ coins }: CryptocurrenciesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(coins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCoins = coins.slice(startIndex, endIndex);

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
    <div className="p-5 overflow-x-hidden sm:overflow-x-auto w-full">
      <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl text-white">
        Cryptocurrencies
      </h3>

      <div className="mx-6 mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-700 rounded-lg bg-neutral-900 text-white">
          <thead className="bg-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Coin
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Symbol
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
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {currentCoins.map((coin) => {
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
                  <td className="px-4 py-3 uppercase text-neutral-400">
                    {coin.symbol}
                  </td>
                  <td className="px-4 py-3">
                    $
                    {coin.price?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? 'N/A'}
                  </td>
                  <td className="px-4 py-3">
                    $
                    {coin.marketCap?.toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) ?? 'N/A'}
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {change24h !== null && change24h !== undefined
                      ? `${isPositive ? '+' : ''}${change24h.toFixed(2)}%`
                      : 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, coins.length)} of{' '}
            {coins.length} coins
          </div>

          <div className="flex gap-2">
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            {/* First page if not visible */}
            {getPageNumbers()[0] > 1 && (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50"
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && (
                  <span className="px-2 py-1 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Page Numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last page if not visible */}
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] <
                  totalPages - 1 && (
                  <span className="px-2 py-1 text-gray-500">...</span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cryptocurrencies;
