import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { Coin } from '../../types/coins';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { purchaseCrypto } from '../../services/wallet';
import BuyCryptoSuccess from './BuyCryptoSuccess.tsx';

interface BuyCryptoDialogProps {
  selectedCoin: Coin | null;
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  walletBalance: number;
}

function BuyCryptoDialog({
  selectedCoin,
  open,
  onClose,
  onBack,
  walletBalance,
}: BuyCryptoDialogProps) {
  const { tokens } = useAuth();
  const price = selectedCoin?.price ?? 0;
  const [coinAmount, setCoinAmount] = useState('');
  const [fiatAmount, setFiatAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [purchasedAmount, setPurchasedAmount] = useState(0);

  if (!selectedCoin) return null;

  console.log('selectedCoin', selectedCoin);

  const handleCoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoinAmount(value);

    const numeric = parseFloat(value);
    if (!isNaN(numeric)) {
      setFiatAmount((numeric * price).toFixed(2));
    } else {
      setFiatAmount('');
    }
    setError(null);
  };

  const handleFiatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFiatAmount(value);

    const numeric = parseFloat(value);
    if (!isNaN(numeric) && price !== 0) {
      setCoinAmount((numeric / price).toFixed(8));
    } else {
      setCoinAmount('');
    }
    setError(null);
  };

  const handleBuy = async () => {
    const totalCost = parseFloat(fiatAmount);
    const quantity = parseFloat(coinAmount);

    if (!totalCost || totalCost <= 0 || !quantity || quantity <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (totalCost > walletBalance) {
      setError(
        `Insufficient balance. You have $${walletBalance.toFixed(2)} available.`
      );
      return;
    }

    setLoading(true);
    setError(null);

    console.log('Purchasing:', {
      coinSymbol: selectedCoin.symbol,
      quantity: quantity,
      buyPrice: selectedCoin.price,
      totalCost: totalCost,
    });

    try {
      await purchaseCrypto(tokens.access, {
        coinSymbol: selectedCoin.symbol,
        quantity: quantity,
        buyPrice: selectedCoin.price,
        totalCost: totalCost,
      });
      setPurchasedAmount(quantity);
      setShowSuccess(true);
    } catch (err) {
      console.error('Error purchasing crypto:', err);
      setError('Failed to complete purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setCoinAmount('');
    setFiatAmount('');
    setError(null);
    onClose();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setCoinAmount('');
    setFiatAmount('');
    setError(null);
    onClose();
  };

  return (
    <>
      <DialogPrimitive.Root
        open={open}
        onOpenChange={(o) => !o && handleDialogClose()}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-200 p-6 shadow-lg dark:bg-neutral-900 z-50 max-h-[80vh] flex flex-col overflow-y-auto">
            <DialogPrimitive.Close asChild>
              <button
                className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white rounded-full p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </DialogPrimitive.Close>

            <DialogPrimitive.Title className="text-2xl font-bold text-black dark:text-white mb-4 justify-center flex">
              <button className="absolute left-5" onClick={onBack}>
                <IoIosArrowRoundBack size={35} />
              </button>
              Buy {selectedCoin?.name}
            </DialogPrimitive.Title>

            <div className="bg-neutral-900/90 dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col gap-4 max-w-2xl m-3">
              <h3 className="italic text-lg text-white dark:text-white">
                I want
              </h3>

              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2 w-36">
                  <img
                    src={selectedCoin?.image}
                    alt={selectedCoin?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white text-2xl">
                    {selectedCoin?.symbol}
                  </span>
                </div>

                <div className="flex flex-col items-end w-40">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-transparent text-right text-xl text-white outline-none"
                    value={coinAmount}
                    onChange={handleCoinChange}
                  />

                  <div className="w-full h-px bg-white my-1" />

                  <div className="flex items-center gap-1 w-full">
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-transparent text-right text-sm text-white outline-none"
                      value={fiatAmount}
                      onChange={handleFiatChange}
                    />
                    <span className="text-sm text-white">USD</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-neutral-400 mt-2">
                <span>Available Balance:</span>
                <span className="text-white font-semibold">
                  ${walletBalance.toFixed(2)}
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mx-3 mt-2">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              className="mt-6 mx-3 bg-[#fe5914] hover:bg-[#ff6b2a] disabled:bg-neutral-600 disabled:cursor-not-allowed shadow-lg text-white font-semibold px-4 py-3 rounded-3xl"
              onClick={handleBuy}
              disabled={!fiatAmount || parseFloat(fiatAmount) <= 0 || loading}
            >
              {loading ? 'Processing...' : `Buy ${selectedCoin.symbol}`}
            </button>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <BuyCryptoSuccess
        open={showSuccess}
        onClose={handleSuccessClose}
        coinName={selectedCoin.symbol}
        amount={purchasedAmount}
      />
    </>
  );
}

export default BuyCryptoDialog;
