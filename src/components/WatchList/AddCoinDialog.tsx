import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWatchListCoins } from '../../services/crypto';
import type { Coin, CoinIdOnly } from '../../types/coins';

interface AddWatchCoinDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  coins: Coin[];
  fetchWatchListCoins: () => Promise<void>;
  watchListCoins: Coin[];
}

function AddWatchCoinDialog({
  openDialog,
  setOpenDialog,
  coins,
  fetchWatchListCoins,
  watchListCoins,
}: AddWatchCoinDialogProps) {
  const navigate = useNavigate();
  const { tokens } = useAuth();
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoins, setSelectedCoins] = useState<Set<string>>(new Set());
  const existingIds = new Set(watchListCoins.map((coin) => coin.id));

  async function handleSubmit(): Promise<void> {
    const selectedCoinsObj: CoinIdOnly[] = coins
      .filter((coin) => selectedCoins.has(coin.id))
      .map((coin) => ({ id: coin.id }));

    console.log('selectedCoinsObj', selectedCoinsObj);

    const result = await addWatchListCoins(tokens.access, selectedCoinsObj);

    if (result.success) {
      setOpenDialog(false);
      setSelectedCoins(new Set());
      await fetchWatchListCoins();
      navigate('/watchlist');
    } else {
      setError('Failed to add coins. Please try again');
      console.error('Error details:', result.error);
    }
  }

  const toggleCoin = (coinId: string) => {
    if (existingIds.has(coinId)) return;

    setSelectedCoins((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(coinId)) {
        newSet.delete(coinId);
      } else {
        newSet.add(coinId);
      }
      return newSet;
    });
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DialogPrimitive.Root
      open={openDialog}
      onOpenChange={(state) => {
        setOpenDialog(state);
        setSelectedCoins(new Set());
        setError('');
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

        <DialogPrimitive.Content
          className="
            fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900 z-50 max-h-[80vh] flex flex-col
          "
        >
          <DialogPrimitive.Close asChild>
            <button
              className="
                absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white
                rounded-full p-1
              "
              aria-label="Close"
            >
              ✕
            </button>
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="text-2xl font-bold text-black dark:text-white mb-4">
            Add Coin
          </DialogPrimitive.Title>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="search"
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-black w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            {/* Scrollable Coin List */}
            <div className="flex-1 overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-md mb-4 min-h-[300px] max-h-[400px]">
              {filteredCoins.length === 0 ? (
                <div className="flex items-center justify-center h-full text-neutral-500">
                  No coins found
                </div>
              ) : (
                <div className="p-2">
                  {filteredCoins.map((coin) => {
                    const isInWatchlist = existingIds.has(coin.id);
                    const isSelected = selectedCoins.has(coin.id);

                    return (
                      <div
                        key={coin.id}
                        onClick={() => toggleCoin(coin.id)}
                        className={`
                          flex items-center gap-3 p-3 rounded-md transition-colors mb-2
                          ${
                            isInWatchlist
                              ? 'bg-neutral-200 dark:bg-neutral-800 cursor-not-allowed opacity-60'
                              : isSelected
                              ? 'bg-orange-100 dark:bg-orange-900/30 border-2 border-[#fe5914] cursor-pointer'
                              : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 border-2 border-transparent cursor-pointer'
                          }
                        `}
                      >
                        <img 
                          src={coin.image} 
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-black dark:text-white">
                            {coin.name}
                          </div>
                          <div className="text-sm text-neutral-500 uppercase">
                            {coin.symbol}
                          </div>
                        </div>
                        {isInWatchlist ? (
                          <div className="text-neutral-500 text-sm font-medium">
                            Already added
                          </div>
                        ) : isSelected ? (
                          <div className="text-[#fe5914] font-bold text-xl">
                            ✓
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selected Count */}
            {selectedCoins.size > 0 && (
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {selectedCoins.size} coin{selectedCoins.size !== 1 ? 's' : ''}{' '}
                selected
              </div>
            )}

            {/* Error and Submit */}
            <div className="flex flex-col gap-2">
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={selectedCoins.size === 0}
                  className="rounded-md bg-[#fe5914] px-4 py-2 text-sm font-medium text-white 
                    hover:bg-[#ff7a3c] transition-colors duration-200 ease-in-out
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add {selectedCoins.size > 0 ? `${selectedCoins.size} ` : ''}
                  Coin
                  {selectedCoins.size !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default AddWatchCoinDialog;