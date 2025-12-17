import type { Coin } from '../types/coins';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import CoinDescriptionDialog from '../components/Cryptocurrencies/CoinDescriptionDialog';

interface CryptocurrenciesProps {
  coins: Coin[];
}

function Cryptocurrencies({ coins }: CryptocurrenciesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [query, setQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCoins = filteredCoins.slice(startIndex, endIndex);

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
      <div className="p-5 overflow-x-hidden sm:overflow-x-auto w-full">
        <h3 className="font-poppins ml-6 pt-5 font-semibold text-2xl text-white">
          All Cryptocurrencies
        </h3>

        <div className="relative w-full max-w-md ml-6 mt-5">
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
            className="
          w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
          transition-shadow duration-200
        "
          />
        </div>

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
          <div className="flex items-center justify-between mt-4 px-4 text-white">
            <div className="text-sm text-neutral-400">
              Showing {startIndex + 1} to {Math.min(endIndex, coins.length)} of{' '}
              {coins.length} coins
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
                Prev
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

              {/* Page numbers */}
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
      </div>

      {selectedCoin && (
        <CoinDescriptionDialog
          selectedCoin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </>
  );
}

export default Cryptocurrencies;
