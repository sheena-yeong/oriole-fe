import { useEffect, useState } from 'react';
import Wallet from '../components/Nest/Wallet';
import { fetchUserPortfolio } from '../services/portfolio';
import { useAuth } from '../hooks/useAuth';
import type { PortfolioItem } from '../types/portfolioData';

function Nest() {
  const { tokens } = useAuth();
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const getPortfolioData = async () => {
      if (!tokens.access) return;
      try {
        const result = await fetchUserPortfolio(tokens.access);

        console.log('result', result);

        setPortfolioData(result);
        return;
      } catch (err) {
        console.log(err);
      }
    };

    getPortfolioData();
  }, [tokens.access]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(portfolioData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPortfolioData = portfolioData.slice(startIndex, endIndex);

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
      <Wallet />

      <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl text-white">
        Portfolio
      </h3>

      <div className="overflow-x-auto m-6">
        <table className="min-w-[400px] w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white">
              <th className="pb-2 text-left">Asset</th>
              <th className="pb-2 text-left">Holdings</th>
              <th className="pb-2 text-left">Avg Buy</th>
              <th className="pb-2 text-left">Price</th>
              <th className="pb-2 text-left">Value</th>
              <th className="pb-2 text-left">P/L</th>
            </tr>
          </thead>
          <tbody>
            {currentPortfolioData.map((item) => {
              const quantity = Number(item.quantity);
              const avgBuy = Number(item.buyPrice);
              const price = item.marketData.price;

              const totalCost = quantity * avgBuy;
              const value = quantity * price;
              const pnl = value - totalCost;
              const pnlPercent = (pnl / totalCost) * 100;

              return (
                <tr
                  key={item.marketData.id}
                  className="border-b border-gray-800"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.marketData.image}
                        alt={item.marketData.name}
                        className="w-8 h-8"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {item.marketData.name}
                        </span>
                        <span className="text-sm text-gray-400 uppercase">
                          {item.marketData.symbol}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 text-left">{quantity.toFixed(4)}</td>
                  <td className="py-3 text-left">${avgBuy.toFixed(2)}</td>
                  <td className="py-3 text-left">${price.toFixed(2)}</td>
                  <td className="py-3 text-left font-medium">
                    ${value.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 text-left font-medium ${
                      pnl >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} (
                    {pnlPercent.toFixed(2)}%)
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4 ml-5 text-white">
          <div className="text-sm text-neutral-400">
            Showing {startIndex + 1} to{' '}
            {Math.min(endIndex, currentPortfolioData.length)} of{' '}
            {currentPortfolioData.length} coins
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
    </>
  );
}

export default Nest;
