import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { Coin } from '../../../types/coins';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';

interface BuyCryptoDialogProps {
  selectedCoin: Coin | null;
  open: boolean;
  onClose: () => void;
}

function BuyCryptoDialog({
  selectedCoin,
  open,
  onClose,
}: BuyCryptoDialogProps) {
  // const open = !!selectedCoin;

  const price = selectedCoin?.price ?? 0;

  const [coinAmount, setCoinAmount] = useState('');
  const [fiatAmount, setFiatAmount] = useState('');

  const handleCoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoinAmount(value);

    const numeric = parseFloat(value);
    if (!isNaN(numeric)) {
      setFiatAmount((numeric * price).toFixed(2));
    } else {
      setFiatAmount('');
    }
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
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-200 p-6 shadow-lg dark:bg-neutral-900 z-50 max-h-[80vh] flex flex-col">
          <DialogPrimitive.Close asChild>
            <button
              className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white rounded-full p-1"
              aria-label="Close"
            >
              ✕
            </button>
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="text-2xl font-bold text-black dark:text-white mb-4 justify-center flex">
            <button className="absolute left-5">
              <IoIosArrowRoundBack size={35} />
            </button>
            Buy {selectedCoin?.name}
          </DialogPrimitive.Title>

          <div className="bg-neutral-900/90 dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col gap-4 max-w-2xl m-3">
            <h3 className="italic text-lg text-white dark:text-white">
              I want
            </h3>

            {/* Row: coin info + coin input */}
            <div className="flex justify-between items-center gap-4">
              {/* Left side: coin info aligned with coin input */}
              <div className="flex items-center gap-2 w-36">
                <img
                  src={selectedCoin?.image}
                  alt={selectedCoin?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-2xl">{selectedCoin?.symbol}</span>
              </div>

              {/* Right side: coin input */}
              <div className="flex flex-col items-end w-40">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-transparent text-right text-xl text-white outline-none"
                  value={coinAmount}
                  onChange={handleCoinChange}
                />

                {/* Thin white line under coin input */}
                <div className="w-full h-px bg-white my-1" />

                {/* Fiat input with USD */}
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
          </div>

          <div className="bg-neutral-900/90 dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col gap-4 max-w-2xl m-3">
            <h3 className="text-lg text-white dark:text-white">Pay with</h3>
          </div>

          <button className="mt-6 bg-[#fe5914] hover:bg-[#ff6b2a] shadow-lg text-white font-semibold px-4 py-3 rounded-3xl">
            Confirm
          </button>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default BuyCryptoDialog;
